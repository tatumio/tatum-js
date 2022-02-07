# How to release changes?

## 1. Create release branch

`git checkout -b release`

## 2. Update version of root package.json

### You have multiple options

#### Alpha version update (2.0.1-alpha.224 -> 2.0.1-alpha.225)

`yarn version:alpha`

#### Patch version update (2.0.1 -> 2.0.2)

`yarn version:patch`

#### Minor version update (2.0.1 -> 2.1.0)

`yarn version:minor`

#### Manually update root package.json

## 3. Push changes and create PR

## 4. Wait for action and merge PR to master
