---
name: Add RPC chain support
about: Add RPC chain support
title: "✨ [Feature] Add RPC Support for [NETWORK] ✨ "
labels: ''
assignees: ''

---

### :bookmark_tabs: Overview
We're thrilled to announce that the Tatum JS SDK now includes support for additional network: **Ethereum** :tada:.
Users can now make RPC calls to this network directly from the SDK.

### :wrench: Changes
- :heavy_plus_sign: Added RPC methods for Ethereum network

### :computer: How to Use
To make RPC calls to this new network, you'll need to specify the network type when initializing your Tatum SDK instance. Here's an example based on your provided code:
```typescript
import { TatumSDK, Network, Ethereum } from '@tatumio/tatum'

const tatum = await TatumSDK.init<Ethereum>({ network: Network.ETHEREUM })

const { result } = await tatum.rpc.getBalance('your-address-here')
console.log(`Balance: ${result}`)

// Destroy Tatum SDK - needed for stopping background jobs
tatum.destroy()
```

### :loudspeaker: Feedback
Your input is crucial as we continue to develop and refine this feature. If you encounter any issues or have suggestions for improvement, please leave a comment on this issue or open a new one. :speech_balloon:
