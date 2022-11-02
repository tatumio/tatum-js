import dedent from 'dedent-js'
import { FLOW_MAINNET_ADDRESSES, FLOW_TESTNET_ADDRESSES } from './flow.tx'

export const flowTxTemplates = () => {
  return {
    deployNftTokenTypeWithMinterTxTemplate: (testnet: boolean) => dedent`
import TatumMultiNFT from ${
      testnet ? FLOW_TESTNET_ADDRESSES.TatumMultiNFT : FLOW_MAINNET_ADDRESSES.TatumMultiNFT
    }
transaction(type: String) {
    // local variable for storing the minter reference
    let minter: &TatumMultiNFT.AdminMinter
    let newMinter: AuthAccount;
    prepare(adminMinter: AuthAccount, newMinter: AuthAccount) {
        // borrow a reference to the NFTMinter resource in storage
        self.minter = adminMinter.borrow<&TatumMultiNFT.AdminMinter>(from: TatumMultiNFT.AdminMinterStoragePath)
            ?? panic("Could not borrow a reference to the NFT minter")
        self.newMinter = newMinter;
    }
    execute {
        // add new minter for specific token type
        self.minter.addMinter(minterAccount: self.newMinter, type: type)
    }
}
`,
    metadataNftTokenScript: (testnet: boolean) => dedent`
import TatumMultiNFT from ${
      testnet ? FLOW_TESTNET_ADDRESSES.TatumMultiNFT : FLOW_MAINNET_ADDRESSES.TatumMultiNFT
    }
pub fun main(account: Address, id: UInt64, type: String): String {
    let collectionRef = getAccount(account)
        .getCapability(TatumMultiNFT.CollectionPublicPath)
        .borrow<&TatumMultiNFT.Collection>()
        ?? panic("Could not borrow capability from public collection")
    let ref = collectionRef.borrowTatumNFT(id: id, type: type)
    if ref != nil {
      return ref.metadata
    } else {
      return panic("No such token");
    }
}`,
    tokenByAddressNftTokenScript: (testnet: boolean) => dedent`
import TatumMultiNFT from ${
      testnet ? FLOW_TESTNET_ADDRESSES.TatumMultiNFT : FLOW_MAINNET_ADDRESSES.TatumMultiNFT
    }
pub fun main(address: Address, type: String): [UInt64] {
    let collectionRef = getAccount(address)
        .getCapability(TatumMultiNFT.CollectionPublicPath)
        .borrow<&TatumMultiNFT.Collection>()
        ?? panic("Could not borrow capability from public collection")
    return collectionRef.getIDsByType(type: type)
}`,
    mintNftTokenTxTemplate: (testnet: boolean) => dedent`
import TatumMultiNFT from ${
      testnet ? FLOW_TESTNET_ADDRESSES.TatumMultiNFT : FLOW_MAINNET_ADDRESSES.TatumMultiNFT
    }
transaction(recipient: Address, url: String, type: String) {
    // local variable for storing the minter reference
    let minter: &TatumMultiNFT.NFTMinter
    prepare(signer: AuthAccount) {
        // borrow a reference to the NFTMinter resource in storage
        self.minter = signer.borrow<&TatumMultiNFT.NFTMinter>(from: TatumMultiNFT.MinterStoragePath)
            ?? panic("Could not borrow a reference to the NFT minter")
    }
    execute {
        // get the public account object for the recipient
        let recipientAccount = getAccount(recipient)
        // borrow the recipient's public NFT collection reference
        let receiver = recipientAccount
            .getCapability(TatumMultiNFT.CollectionPublicPath)
            .borrow<&TatumMultiNFT.Collection>()
            ?? panic("Could not get receiver reference to the NFT Collection")
        // mint the NFT and deposit it to the recipient's collection
        self.minter.mintNFT(recipient: receiver, type: type, url: url, address: recipient)
    }
}`,
    mintMultipleNftTokenTxTemplate: (testnet: boolean) => dedent`
import TatumMultiNFT from ${
      testnet ? FLOW_TESTNET_ADDRESSES.TatumMultiNFT : FLOW_MAINNET_ADDRESSES.TatumMultiNFT
    }
transaction(recipient: [Address], url: [String], type: String) {
    // local variable for storing the minter reference
    let minter: &TatumMultiNFT.NFTMinter
    prepare(signer: AuthAccount) {
        // borrow a reference to the NFTMinter resource in storage
        self.minter = signer.borrow<&TatumMultiNFT.NFTMinter>(from: TatumMultiNFT.MinterStoragePath)
            ?? panic("Could not borrow a reference to the NFT minter")
    }
    execute {
        var a = 0;
        while a < url.length {
        // get the public account object for the recipient
        let recipientAccount = getAccount(recipient[a])
        // borrow the recipient's public NFT collection reference
        let receiver = recipientAccount
            .getCapability(TatumMultiNFT.CollectionPublicPath)
            .borrow<&TatumMultiNFT.Collection>()
            ?? panic("Could not get receiver reference to the NFT Collection")
        // mint the NFT and deposit it to the recipient's collection
            self.minter.mintNFT(recipient: receiver, type: type, url: url[a], address: recipient[a])
            a = a + 1
        }
    }
}`,
    burnNftTokenTxTemplate: (testnet: boolean) => dedent`
import TatumMultiNFT from ${
      testnet ? FLOW_TESTNET_ADDRESSES.TatumMultiNFT : FLOW_MAINNET_ADDRESSES.TatumMultiNFT
    }
transaction(withdrawID: UInt64, type: String) {
    // local variable for storing the minter reference
    let senderCollection: &TatumMultiNFT.Collection
    prepare(signer: AuthAccount) {
        // borrow a reference to the signer's NFT collection
        self.senderCollection = signer.borrow<&TatumMultiNFT.Collection>(from: TatumMultiNFT.CollectionStoragePath)
            ?? panic("Could not borrow a reference to the owner's collection")
        // check if token has correct type
        self.senderCollection.borrowTatumNFT(id: withdrawID, type: type)
    }
    execute {
        // withdraw the NFT from the owner's collection
        let nft <- self.senderCollection.withdraw(withdrawID: withdrawID)
        // Destroy the nft
        destroy nft
    }
}`,
    transferNftTokenTxTemplate: (testnet: boolean) => dedent`
import TatumMultiNFT from ${
      testnet ? FLOW_TESTNET_ADDRESSES.TatumMultiNFT : FLOW_MAINNET_ADDRESSES.TatumMultiNFT
    }
transaction(recipient: Address, withdrawID: UInt64) {
    // local variable for storing the minter reference
    let senderCollection: &TatumMultiNFT.Collection
    prepare(signer: AuthAccount) {
        // borrow a reference to the signer's NFT collection
        self.senderCollection = signer.borrow<&TatumMultiNFT.Collection>(from: TatumMultiNFT.CollectionStoragePath)
            ?? panic("Could not borrow a reference to the owner's collection")
    }
    execute {
        // get the recipients public account object
        let recipient = getAccount(recipient)
        // borrow a public reference to the receivers collection
        let depositRef = recipient.getCapability(TatumMultiNFT.CollectionPublicPath).borrow<&TatumMultiNFT.Collection>()!
        // withdraw the NFT from the owner's collection
        let nft <- self.senderCollection.withdraw(withdrawID: withdrawID)
        // Deposit the NFT in the recipient's collection
        depositRef.deposit(token: <-nft)
    }
}`,
    prepareAddPublicKeyToAccountTxTemplate: () =>
      dedent`transaction(publicKey: String) {
prepare(signer: AuthAccount) {
signer.addPublicKey(publicKey.decodeHex())
}
}`,
    prepareTransferTxTemplate: (
      testnet: boolean,
      tokenAddress: string,
      tokenName: string,
      tokenStorage: string,
    ) =>
      dedent`import FungibleToken from ${
        testnet ? FLOW_TESTNET_ADDRESSES.FungibleToken : FLOW_MAINNET_ADDRESSES.FungibleToken
      }
  import ${tokenName} from ${tokenAddress}
transaction(amount: UFix64, recipient: Address) {
  let sentVault: @FungibleToken.Vault
  prepare(signer: AuthAccount) {
    let vaultRef = signer.borrow<&${tokenName}.Vault>(from: /storage/${tokenStorage}Vault)
      ?? panic("failed to borrow reference to sender vault")
    self.sentVault <- vaultRef.withdraw(amount: amount)
  }
  execute {
    let receiverRef =  getAccount(recipient)
      .getCapability(/public/${tokenStorage}Receiver)
      .borrow<&{FungibleToken.Receiver}>()
        ?? panic("failed to borrow reference to recipient vault")
    receiverRef.deposit(from: <-self.sentVault)
  }
}`,
    prepareCreateAccountWithFUSDFromPublicKeyTxTemplate: (testnet: boolean) =>
      dedent`import FungibleToken from ${
        testnet ? FLOW_TESTNET_ADDRESSES.FungibleToken : FLOW_MAINNET_ADDRESSES.FungibleToken
      }
  import FUSD from ${testnet ? FLOW_TESTNET_ADDRESSES.FUSD : FLOW_MAINNET_ADDRESSES.FUSD}
  import TatumMultiNFT from ${
    testnet ? FLOW_TESTNET_ADDRESSES.TatumMultiNFT : FLOW_MAINNET_ADDRESSES.TatumMultiNFT
  }
  transaction(publicKey: String) {
    let account: AuthAccount
    prepare(signer: AuthAccount) {
      self.account = AuthAccount(payer: signer)
    }
    execute {
      self.account.addPublicKey(publicKey.decodeHex())
      if self.account.borrow<&TatumMultiNFT.Collection>(from: TatumMultiNFT.CollectionStoragePath) == nil {
            // create a new empty collection
            let collection <- TatumMultiNFT.createEmptyCollection()
            // save it to the account
            self.account.save(<-collection, to: TatumMultiNFT.CollectionStoragePath)
            // create a public capability for the collection
            self.account.link<&TatumMultiNFT.Collection>(TatumMultiNFT.CollectionPublicPath, target: TatumMultiNFT.CollectionStoragePath)
        }
      // Add FUSD vault
      self.account.save(<-FUSD.createEmptyVault(), to: /storage/fusdVault)
      self.account.link<&FUSD.Vault{FungibleToken.Receiver}>(
          /public/fusdReceiver,
          target: /storage/fusdVault
      )
      self.account.link<&FUSD.Vault{FungibleToken.Balance}>(
          /public/fusdBalance,
          target: /storage/fusdVault
      )
    }
  }
  `,
  }
}
