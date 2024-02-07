import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing'
import { Tree, readProjectConfiguration } from '@nrwl/devkit'

import generator from './generator'
import { BlockchainEvmGeneratorSchema } from './schema'

describe('blockchain-evm generator', () => {
  let appTree: Tree
  const options: BlockchainEvmGeneratorSchema = { name: 'test', currency: 'eth', blockchain: 'eth' }

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace()
  })

  it('should run successfully', async () => {
    await generator(appTree, options)
    const config = readProjectConfiguration(appTree, 'test')
    expect(config).toBeDefined()
  })
})
