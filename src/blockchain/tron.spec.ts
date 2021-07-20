import { tronBroadcast } from './tron'

process.env.TATUM_API_KEY = '4966d428-9507-45cb-9f90-02cca00674bd';
process.env.TRON_PRO_API_KEY = 'b35409b4-7d11-491e-8760-32d2506a90b5';


describe('TRON test', () => {
  it('should test tronBroadcast success', async () => {
    const txData =JSON.stringify({
      "visible": false,
      "txID": "1d2f4995ebcca935febbecc6d9e2e73a441b8388436bc96d55ffd34ef9f56178",
      "raw_data": {
        "contract": [{
          "parameter": {
            "value": {
              "amount": 45,
              "owner_address": "41e892258a931f589f4d58fc82d16cd7fb63b4dff8",
              "to_address": "4148243677a984504bc56e4503500204595a8b092d"
            },
            "type_url": "type.googleapis.com/protocol.TransferContract"
          },
          "type": "TransferContract"
        }],
        "ref_block_bytes": "f94e",
        "ref_block_hash": "96e5e73719c68126",
        "expiration": Date.now() + 100,
        "timestamp": Date.now()
      },
      "raw_data_hex": "0a02f94e220896e5e73719c6812640d88ad9ccab2f5a65080112610a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412300a1541e892258a931f589f4d58fc82d16cd7fb63b4dff812154148243677a984504bc56e4503500204595a8b092d182d70a3bcd5ccab2f",
      "signature": [
        "aad95bca1d060ee387e002b85dd80b97dfdfbb715988cfd72643d46c1abbb60ee443e3ff0518c693c6f6203e14a72b357c23de484f9ec580e702d4990b5ac02f00"
      ]
    });
    const tx = await tronBroadcast(txData);
    console.log(tx)
  });

  it('should test tronBroadcast fail', async () => {
    const txData =JSON.stringify({
      "visible": false,
      "txID": "1d2f4995ebcca935febbecc6d9e2e73a441b8388436bc96d55ffd34ef9f56178",
      "raw_data": {
        "contract": [{
          "parameter": {
            "value": {
              "amount": 45,
              "owner_address": "41e892258a931f589f4d58fc82d16cd7fb63b4dff8",
              "to_address": "4148243677a984504bc56e4503500204595a8b092d"
            },
            "type_url": "type.googleapis.com/protocol.TransferContract"
          },
          "type": "TransferContract"
        }],
        "ref_block_bytes": "f94e",
        "ref_block_hash": "96e5e73719c68126",
        "expiration": Date.now() - 100,
        "timestamp": Date.now()
      },
      "raw_data_hex": "0a02f94e220896e5e73719c6812640d88ad9ccab2f5a65080112610a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412300a1541e892258a931f589f4d58fc82d16cd7fb63b4dff812154148243677a984504bc56e4503500204595a8b092d182d70a3bcd5ccab2f",
      "signature": [
        "aad95bca1d060ee387e002b85dd80b97dfdfbb715988cfd72643d46c1abbb60ee443e3ff0518c693c6f6203e14a72b357c23de484f9ec580e702d4990b5ac02f00"
      ]
    });
    try {
      const tx = await tronBroadcast(txData);
      console.log(tx)
      fail('Validation did not pass.');
    } catch (e) {
        console.error(e);
    }
  });

  it('should not test tronBroadcast success', async () => {
    const txData = JSON.stringify({
      "visible": false,
      "txID": "1d2f4995ebcca935febbecc6d9e2e73a441b8388436bc96d55ffd34ef9f56178",
      "raw_data": {
        "contract": [{
          "parameter": {
            "value": {
              "amount": 45,
              "owner_address": "41e892258a931f589f4d58fc82d16cd7fb63b4dff8",
              "to_address": "4148243677a984504bc56e4503500204595a8b092d"
            },
            "type_url": "type.googleapis.com/protocol.TransferContract"
          },
          "type": "TransferContract"
        }],
        "ref_block_bytes": "f94e",
        "ref_block_hash": "96e5e73719c68126",
        "expiration": Date.now() - 100,
        "timestamp": Date.now()
      },
      "raw_data_hex": "0a02f94e220896e5e73719c6812640d88ad9ccab2f5a65080112610a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412300a1541e892258a931f589f4d58fc82d16cd7fb63b4dff812154148243677a984504bc56e4503500204595a8b092d182d70a3bcd5ccab2f",
      "signature": [
        "aad95bca1d060ee387e002b85dd80b97dfdfbb715988cfd72643d46c1abbb60ee443e3ff0518c693c6f6203e14a72b357c23de484f9ec580e702d4990b5ac02f00"
      ]
    });
    try {
      const tx = await tronBroadcast(txData);
      console.log(tx)
      fail('Validation did not pass.');
    } catch (e) {
    //     console.error(e);
    }
  });
});