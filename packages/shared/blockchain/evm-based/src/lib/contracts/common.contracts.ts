type SolidityDataType =
  | 'bool'
  | 'string'
  | 'uint8'
  | 'uint256'
  | 'address'
  | 'bytes'
  | 'tuple'
  | 'bytes4'
  | 'bytes32'
  | 'string[]'
  | 'uint256[]'
  | 'address[]'
  | 'address[][]'
  | 'uint256[][]'
  | 'enum MarketplaceListing.State'
  | 'struct MarketplaceListing.Listing'
  | 'struct NftAuction.Auction'

export type Abi = {
  type: 'event' | 'constructor' | 'function' | 'receive'
  name?: string
  anonymous?: boolean
  inputs?: InputOutput[]
  outputs?:
    | InputOutput[]
    | {
        internalType: SolidityDataType
        name: string
        type: SolidityDataType
        components: InputOutput[]
      }[]
  stateMutability?: string
  payable?: boolean
  constant?: boolean
}

export type InputOutput = {
  type: SolidityDataType
  name?: string
  indexed?: boolean
  internalType?: SolidityDataType
}

export type ContractAbi = {
  abi: Abi[]
  bytecode: string
}
