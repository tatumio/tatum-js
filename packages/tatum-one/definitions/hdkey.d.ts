declare module 'hdkey' {
  class HDNode {
    public static fromMasterSeed(seed: Buffer, versions?: { private: number; public: number }): HDNode

    public publicKey: Buffer
    public privateKey: Buffer
    public chainCode: Buffer

    constructor(versions?: { private: number; public: number })

    public derive(path: string): HDNode

    public toJSON(): { xpriv: string; xpub: string }

    public static fromJSON(obj: { xpriv: string; xpub: string }): HDNode

    public static fromExtendedKey(xpriv: string, versions?: { private: number; public: number }): HDNode

    public sign(hash: Buffer): Buffer

    public verify(hash: Buffer, signature: Buffer): boolean

    public wipePrivateData(): HDNode

    public privateExtendedKey: string
    public publicExtendedKey: string
  }

  export = HDNode
}
