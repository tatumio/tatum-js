import CardanoWasm from '@emurgo/cardano-serialization-lib-nodejs';
import {get} from '../connector/tatum';
import {AdaUTxo, TransferAda} from '../model';

/**
 * Prepare a signed ADA transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @param body content of the transaction to prepare.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const prepareADATransaction = async (body: TransferAda) => {
  const fromAddress = CardanoWasm.Address.from_bech32(body.from);
  const toAddress = CardanoWasm.Address.from_bech32(body.to);

  const utxos : AdaUTxo[] = await get(`/v3/cardano/${body.from}/utxos`);
  let fromQuantity = 0;
  for (const utxo of utxos) {
    fromQuantity += parseInt(utxo.value);
  }

  const prvKey = CardanoWasm.Bip32PrivateKey.from_128_xprv(
      Buffer.from(body.privateKey, 'hex')
    ).to_raw_key();

  const txBuilder = CardanoWasm.TransactionBuilder.new(
    CardanoWasm.LinearFee.new(
      CardanoWasm.BigNum.from_str('44'),
      CardanoWasm.BigNum.from_str('155381'),
    ),
    CardanoWasm.BigNum.from_str('1000000'),
    CardanoWasm.BigNum.from_str('500000000'),
    CardanoWasm.BigNum.from_str('2000000'),
  );
  const { tip : { slotNo } } = await get('/v3/cardano/info');
  txBuilder.set_ttl(slotNo + 200);

  let total = 0;
  for (const utxo of utxos) {
    let amount = parseInt(utxo.value);
    if (total + amount > body.amount) {
      amount = body.amount - total;
    }
    txBuilder.add_key_input(
      prvKey.to_public().hash(),
      CardanoWasm.TransactionInput.new(
        CardanoWasm.TransactionHash.from_bytes(Buffer.from(utxo.txHash, 'hex')),
        utxo.index
      ),
      CardanoWasm.Value.new(CardanoWasm.BigNum.from_str(String(amount))),
    )
    total += amount;
    if (total === body.amount) break;
  }

  txBuilder.add_output(
    CardanoWasm.TransactionOutput.new(
      toAddress,
      CardanoWasm.Value.new(CardanoWasm.BigNum.from_str(String(body.amount))),
    ),
  );
  const tmpOutput = CardanoWasm.TransactionOutput.new(
    fromAddress,
    CardanoWasm.Value.new(CardanoWasm.BigNum.from_str(String('1000000'))),
  );
  const fee = parseInt(txBuilder.min_fee().to_str()) + parseInt(txBuilder.fee_for_output(tmpOutput).to_str());
  txBuilder.add_output(CardanoWasm.TransactionOutput.new(
    fromAddress,
    CardanoWasm.Value.new(CardanoWasm.BigNum.from_str(String(fromQuantity - body.amount - fee))),
  ));
  txBuilder.set_fee(CardanoWasm.BigNum.from_str(String(fee)));

  const txBody = txBuilder.build();
  const txHash = CardanoWasm.hash_transaction(txBody);

  const vkeyWitnesses = CardanoWasm.Vkeywitnesses.new();
  vkeyWitnesses.add(CardanoWasm.make_vkey_witness(txHash, prvKey));
  const witnesses = CardanoWasm.TransactionWitnessSet.new();
  witnesses.set_vkeys(vkeyWitnesses);

  return Buffer.from(
    CardanoWasm.Transaction.new(txBody, witnesses).to_bytes(),
  ).toString('hex')
};
