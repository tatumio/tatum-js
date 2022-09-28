import { Currency } from "../../request";
import { WithdrawalResponseData } from "../offchain/WithdrawalResponse";
import { Signature } from "./Signature";

export class TransactionKMS {
  public id: string;

  public chain: Currency;

  public serializedTransaction: string;

  public hashes: string[];

  public txId?: string;

  public withdrawalId?: string;

  public index?: number;

  public withdrawalResponses?: WithdrawalResponseData[];

  public signatures?: Signature[];
}
