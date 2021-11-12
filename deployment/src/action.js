import * as exec from '@actions/exec';
import * as glob from '@actions/glob';
import fs from 'fs-extra';
import fetch from 'node-fetch';
import semver from 'semver';

async function run() {
    const globber = await glob.create('**/packages/tatum-*/package.json')

    const packages = {published: [], unpublished: []}
    for await (const file of globber.globGenerator()) {
        await publishPackage(file, packages)
    }
    console.log(packages)
}

const publishPackage = async (file, packages) => {
    try {
        console.log(`Scanning ${file}.`)
        const localPackage = fs.readJsonSync(file)
        const remotePackage = await fetchRegistry(localPackage.name);
        console.log(remotePackage);
        const directory = file.substring(0, file.lastIndexOf('/'));
        if (remotePackage === 'Not Found') {
            console.log(`Package ${localPackage.name} is not yet published at NPM. Publishing version ${localPackage.version}.`);
            await runYarnCommands(directory)
            return packages.published.push({name: localPackage.name, version: localPackage.version})
        }
        if (directory && localPackage && remotePackage) {
            // compare to local version
            if (semver.lt(remotePackage.version, localPackage.version)) {
                console.log(`Remote version ${remotePackage.version} on npm package ${localPackage.name} is older than current version ${localPackage.version}.`)
                await runYarnCommands(directory)
                packages.published.push({name: localPackage.name, version: localPackage.version})
            } else {
                console.log(`Remote version ${remotePackage.version} on npm package ${remotePackage.name} is same or newer than current version ${localPackage.version}.`)
                packages.unpublished.push({name: remotePackage.name, version: remotePackage.version})
            }
        }
    } catch (e) {
        console.log(`Failed to publish ${file}.`)
    }
}

const runYarnCommands = async (directory) => {
    await exec.getExecOutput(`yarn --cwd ${directory} cache clean`);
    await exec.getExecOutput(`yarn --cwd ${directory}`);
    await exec.getExecOutput(`yarn --cwd ${directory} lint`);
    await exec.getExecOutput(`yarn --cwd ${directory} build`);
    // await exec.getExecOutput(`yarn --cwd ${directory} publish --access public`);
}

const fetchRegistry = async (packageName) => {
    console.log(`Fetching package https://registry.npmjs.com/${packageName}/latest`);
    const response = await fetch(`https://registry.npmjs.com/${packageName}/latest`);
    return await response.json();
}

run();