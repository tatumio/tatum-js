export const tx1 = {
  hex: '0200000001be829223456ef71e0a5f2953b0147bf54e91ff2c249c26a5b9adfd4c4de4f9c2010000006441dbfab0bc5eb7540f2d6419347f8dcf869e2220079048c5851f44e6e2066746157a92ad12ea0cc6666a8d80f8856c2680d6f3023d493fe0fc68c51956571f153241210316f66bbc017bc50df20efb0e6bf86fa6dd2c812d0c2da120f69bc0e99f28229bffffffff0240420f00000000001976a914e831bb079ba85eb9013773b7023ee8c482a62f8f88ace0673500000000001976a914ada119a49237d2915c053935a7e00f74e486652a88ac00000000',
  txid: '3c5c04ce94d1573b63f0d94fd2a2bc8d59e21ac7ae14e49e227ad2e3e2f71ed5',
  size: 219,
  version: 2,
  locktime: 0,
  vin: [
    {
      txid: 'c2f9e44d4cfdad1235269c242cff914ef57b14b053295f0a1ef76e85339282be',
      vout: 1,
      scriptSig: {
        asm: 'dbfab0bc5eb7540f2d6419347f8dcf869e2220079048c5851f44e6e2066746157a92ad12ea0cc6666a8d80f8856c2680d6f3023d493fe0fc68c51956571f153241 0316f66bbc017bc50df20efb0e6bf86fa6dd2c812d0c2da120f69bc0e99f28229b',
        hex: '41dbfab0bc5eb7540f2d6419347f8dcf869e2220079048c5851f44e6e2066746157a92ad12ea0cc6666a8d80f8856c2680d6f3023d493fe0fc68c51956571f153241210316f66bbc017bc50df20efb0e6bf86fa6dd2c812d0c2da120f69bc0e99f28229b',
      },
      sequence: 4294967295,
    },
  ],
  vout: [
    {
      value: 0.01,
      n: 0,
      scriptPubKey: {
        asm: 'OP_DUP OP_HASH160 e831bb079ba85eb9013773b7023ee8c482a62f8f OP_EQUALVERIFY OP_CHECKSIG',
        hex: '76a914e831bb079ba85eb9013773b7023ee8c482a62f8f88ac',
        reqSigs: 1,
        type: 'pubkeyhash',
        addresses: ['qr5rrwc8nw59awgpxaemwq37arzg9f303u9fp2ws65'],
      },
    },
    {
      value: 0.035,
      n: 1,
      scriptPubKey: {
        asm: 'OP_DUP OP_HASH160 ada119a49237d2915c053935a7e00f74e486652a OP_EQUALVERIFY OP_CHECKSIG',
        hex: '76a914ada119a49237d2915c053935a7e00f74e486652a88ac',
        reqSigs: 1,
        type: 'pubkeyhash',
        addresses: ['qzk6zxdyjgma9y2uq5untflqpa6wfpn99gxh5sdrtl'],
      },
    },
  ],
  blockhash: '0000000008056815cde178647c723234bf33738ee9be483e22fbb5788e38771b',
  confirmations: 6,
  time: 1666781723,
  blocktime: 1666781723,
}
