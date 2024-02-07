import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  Tree,
} from '@nrwl/devkit'
import * as path from 'path'
import { BlockchainEvmGeneratorSchema } from './schema'

interface NormalizedSchema extends BlockchainEvmGeneratorSchema {
  projectName: string
  projectRoot: string
  projectDirectory: string
  parsedTags: string[]
  firstLetterUpperCaseName: string
}

function normalizeOptions(tree: Tree, options: BlockchainEvmGeneratorSchema): NormalizedSchema {
  const name = names(options.name).fileName
  const projectDirectory = options.directory ? `${names(options.directory).fileName}/${name}` : name
  const projectName = projectDirectory.split('/').pop()
  const projectRoot = `${getWorkspaceLayout(tree).libsDir}/${projectDirectory}`
  const parsedTags = options.tags ? options.tags.split(',').map((s) => s.trim()) : []
  const firstLetterUpperCaseName = name.charAt(0).toUpperCase() + name.slice(1)
  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
    firstLetterUpperCaseName,
  }
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
  }
  generateFiles(tree, path.join(__dirname, 'files'), options.projectRoot, templateOptions)
}

export default async function (tree: Tree, options: BlockchainEvmGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options)
  addProjectConfiguration(tree, normalizedOptions.projectName, {
    root: normalizedOptions.projectRoot,
    projectType: 'library',
    sourceRoot: `${normalizedOptions.projectRoot}/src`,
    targets: {
      build: {
        executor: '@tatumio/automation:build',
      },
    },
    tags: normalizedOptions.parsedTags,
  })
  addFiles(tree, normalizedOptions)
  await formatFiles(tree)
}
