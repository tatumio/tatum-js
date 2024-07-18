/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ActionSimplePreview } from './ActionSimplePreview';
import type { AuctionBidAction } from './AuctionBidAction';
import type { ContractDeployAction } from './ContractDeployAction';
import type { DepositStakeAction } from './DepositStakeAction';
import type { DomainRenewAction } from './DomainRenewAction';
import type { ElectionsDepositStakeAction } from './ElectionsDepositStakeAction';
import type { ElectionsRecoverStakeAction } from './ElectionsRecoverStakeAction';
import type { InscriptionMintAction } from './InscriptionMintAction';
import type { InscriptionTransferAction } from './InscriptionTransferAction';
import type { JettonBurnAction } from './JettonBurnAction';
import type { JettonMintAction } from './JettonMintAction';
import type { JettonSwapAction } from './JettonSwapAction';
import type { JettonTransferAction } from './JettonTransferAction';
import type { NftItemTransferAction } from './NftItemTransferAction';
import type { NftPurchaseAction } from './NftPurchaseAction';
import type { SmartContractAction } from './SmartContractAction';
import type { SubscriptionAction } from './SubscriptionAction';
import type { TonTransferAction } from './TonTransferAction';
import type { UnSubscriptionAction } from './UnSubscriptionAction';
import type { WithdrawStakeAction } from './WithdrawStakeAction';
import type { WithdrawStakeRequestAction } from './WithdrawStakeRequestAction';

export type Action = {
    type: 'TonTransfer' | 'JettonTransfer' | 'JettonBurn' | 'JettonMint' | 'NftItemTransfer' | 'ContractDeploy' | 'Subscribe' | 'UnSubscribe' | 'AuctionBid' | 'NftPurchase' | 'DepositStake' | 'WithdrawStake' | 'WithdrawStakeRequest' | 'JettonSwap' | 'SmartContractExec' | 'ElectionsRecoverStake' | 'ElectionsDepositStake' | 'DomainRenew' | 'InscriptionTransfer' | 'InscriptionMint' | 'Unknown';
    status: 'ok' | 'failed';
    TonTransfer?: TonTransferAction;
    ContractDeploy?: ContractDeployAction;
    JettonTransfer?: JettonTransferAction;
    JettonBurn?: JettonBurnAction;
    JettonMint?: JettonMintAction;
    NftItemTransfer?: NftItemTransferAction;
    Subscribe?: SubscriptionAction;
    UnSubscribe?: UnSubscriptionAction;
    AuctionBid?: AuctionBidAction;
    NftPurchase?: NftPurchaseAction;
    DepositStake?: DepositStakeAction;
    WithdrawStake?: WithdrawStakeAction;
    WithdrawStakeRequest?: WithdrawStakeRequestAction;
    ElectionsDepositStake?: ElectionsDepositStakeAction;
    ElectionsRecoverStake?: ElectionsRecoverStakeAction;
    JettonSwap?: JettonSwapAction;
    SmartContractExec?: SmartContractAction;
    DomainRenew?: DomainRenewAction;
    InscriptionTransfer?: InscriptionTransferAction;
    InscriptionMint?: InscriptionMintAction;
    simple_preview: ActionSimplePreview;
    base_transactions: Array<string>;
};
