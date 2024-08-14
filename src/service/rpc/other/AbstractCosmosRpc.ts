import { AbstractCardanoRpc } from './AbstractCardanoRpc'
import { QueryParams } from '../../../dto'
import { Utils } from '../../../util'
import { PostI } from '../../../dto/PostI'
import {
  BroadcastTxRequest,
  BroadcastTxResponse,
  CosmosRpcSuite,
  GetAccountDetailsRequest,
  GetAccountDetailsResponse,
  GetAccountsResponse,
  GetAllBalancesRequest,
  GetAllBalancesResponse,
  GetAllEvidenceResponse,
  GetAllowanceRequest,
  GetAllowanceResponse,
  GetAllParamsResponse,
  GetAllProposalsRequest,
  GetAllProposalsResponse,
  GetAnnualProvisionsResponse,
  GetAppliedPlanRequest,
  GetAppliedPlanResponse,
  GetBankParamsResponse,
  GetBlockByHeightRequest,
  GetBlockByHeightResponse,
  GetCommunityPoolResponse,
  GetCurrentPlanResponse,
  GetDelegationRewardsRequest,
  GetDelegationRewardsResponse,
  GetDelegationsRequest,
  GetDelegationsResponse,
  GetDelegationTotalRewardsRequest,
  GetDelegationTotalRewardsResponse,
  GetDelegatorValidatorsRequest,
  GetDelegatorValidatorsResponse,
  GetDelegatorWithdrawAddressRequest,
  GetDelegatorWithdrawAddressResponse,
  GetDenomMetadataRequest,
  GetDenomMetadataResponse,
  GetDenomsMetadataResponse,
  GetDepositsRequest, GetDepositsResponse,
  GetDistributionParamsResponse,
  GetGovernanceParamsRequest,
  GetGovernanceParamsResponse,
  GetGrantsForAddressRequest,
  GetGrantsForAddressResponse,
  GetGrantsRequest,
  GetGrantsResponse,
  GetHistoricalInfoRequest,
  GetHistoricalInfoResponse,
  GetInflationResponse,
  GetLatestBlockResponse,
  GetLatestValidatorSetResponse,
  GetMintingParamsResponse,
  GetModuleVersionsResponse,
  GetNodeInfoResponse,
  GetPoolInfoResponse,
  GetProposalDetailsRequest,
  GetProposalDetailsResponse,
  GetRedelegationsRequest,
  GetRedelegationsResponse,
  GetSigningInfoByConsAddressRequest,
  GetSigningInfoByConsAddressResponse,
  GetSigningInfosResponse,
  GetSlashingParamsResponse,
  GetSpecificParamRequest,
  GetSpecificParamResponse,
  GetStakingParamsResponse,
  GetSupplyOfCoinRequest,
  GetSupplyOfCoinResponse,
  GetSyncingResponse, GetTallyResultRequest, GetTallyResultResponse,
  GetTotalSupplyResponse,
  GetUnbondingDelegationRequest,
  GetUnbondingDelegationResponse,
  GetUnbondingDelegationsRequest,
  GetUpgradedConsensusStateResponse,
  GetValidatorCommissionRequest,
  GetValidatorCommissionResponse,
  GetValidatorInfoRequest,
  GetValidatorInfoResponse,
  GetValidatorOutstandingRewardsRequest,
  GetValidatorOutstandingRewardsResponse,
  GetValidatorSetByHeightRequest,
  GetValidatorSetByHeightResponse,
  GetValidatorSlashesRequest,
  GetValidatorSlashesResponse,
  GetValidatorsRequest,
  GetValidatorsResponse, GetVoteRequest, GetVoteResponse, GetVotesRequest, GetVotesResponse,
  PaginationRequest,
  SimulateRequest,
  SimulateResponse,
  TxResponse,
  TxsByEventRequest,
  TxsByEventResponse,
  UnbondingDelegationResponse,
} from '../../../dto/rpc/CosmosRpcSuite'


export abstract class AbstractCosmosRpc extends AbstractCardanoRpc implements CosmosRpcSuite {
  protected abstract get<T>(post: PostI): Promise<T>
  private async sendGet<T>({
                             path,
                             queryParams,
                           }: {
    path: string
    queryParams?: QueryParams
  }): Promise<T> {
    return this.get({
      path: Utils.addQueryParams({
        basePath: path,
        queryParams: queryParams,
      })
    })
  }

  getAccounts(params: PaginationRequest): Promise<GetAccountsResponse> {
    return this.sendGet({
      path: '/api/cosmos/auth/v1beta1/accounts',
      queryParams: params as QueryParams
    })
  }

  getAccountDetails(params: GetAccountDetailsRequest): Promise<GetAccountDetailsResponse> {
    const { address } = params;
    return this.sendGet({
      path: `/api/cosmos/auth/v1beta1/accounts/${address}`,
    });
  }

  getAllParams(): Promise<GetAllParamsResponse> {
    return this.sendGet({
      path: '/api/cosmos/auth/v1beta1/params',
    });
  }

  getAllBalances(params: GetAllBalancesRequest): Promise<GetAllBalancesResponse> {
    const { address, ...paginationParams } = params;
    return this.sendGet({
      path: `/api/cosmos/bank/v1beta1/balances/${address}`,
      queryParams: paginationParams
    });
  }

  getDenomsMetadata(params: PaginationRequest): Promise<GetDenomsMetadataResponse> {
    return this.sendGet({
      path: '/api/cosmos/bank/v1beta1/denoms_metadata',
      queryParams: params as QueryParams
    });
  }

  getDenomMetadata(params: GetDenomMetadataRequest): Promise<GetDenomMetadataResponse> {
    const { denom } = params;
    return this.sendGet({
      path: `/api/cosmos/bank/v1beta1/denoms_metadata/${denom}`,
    });
  }

  getBankParams(): Promise<GetBankParamsResponse> {
    return this.sendGet({
      path: '/api/cosmos/bank/v1beta1/params',
    });
  }

  getTotalSupply(params: PaginationRequest): Promise<GetTotalSupplyResponse> {
    return this.sendGet({
      path: '/api/cosmos/bank/v1beta1/supply',
      queryParams: params as unknown as QueryParams
    });
  }

  getSupplyOfCoin(params: GetSupplyOfCoinRequest): Promise<GetSupplyOfCoinResponse> {
    const { denom } = params;
    return this.sendGet({
      path: `/api/cosmos/bank/v1beta1/supply/${denom}`,
    });
  }

  getLatestBlock(): Promise<GetLatestBlockResponse> {
    return this.sendGet({
      path: '/api/cosmos/base/tendermint/v1beta1/blocks/latest',
    });
  }

  getBlockByHeight(params: GetBlockByHeightRequest): Promise<GetBlockByHeightResponse> {
    const { height } = params;
    return this.sendGet({
      path: `/api/cosmos/base/tendermint/v1beta1/blocks/${height}`,
    });
  }

  getNodeInfo(): Promise<GetNodeInfoResponse> {
    return this.sendGet({
      path: '/api/cosmos/base/tendermint/v1beta1/node_info',
    });
  }

  getSyncing(): Promise<GetSyncingResponse> {
    return this.sendGet({
      path: '/api/cosmos/base/tendermint/v1beta1/syncing',
    });
  }

  getLatestValidatorSet(params: PaginationRequest): Promise<GetLatestValidatorSetResponse> {
    return this.sendGet({
      path: '/api/cosmos/base/tendermint/v1beta1/validatorsets/latest',
      queryParams: params as unknown as QueryParams
    });
  }

  getValidatorSetByHeight(params: GetValidatorSetByHeightRequest): Promise<GetValidatorSetByHeightResponse> {
    const { height, ...paginationParams } = params;
    return this.sendGet({
      path: `/api/cosmos/base/tendermint/v1beta1/validatorsets/${height}`,
      queryParams: paginationParams
    });
  }

  getCommunityPool(): Promise<GetCommunityPoolResponse> {
    return this.sendGet({
      path: '/api/cosmos/distribution/v1beta1/community_pool',
    });
  }

  getDelegationTotalRewards(params: GetDelegationTotalRewardsRequest): Promise<GetDelegationTotalRewardsResponse> {
    const { delegator_address } = params;
    return this.sendGet({
      path: `/api/cosmos/distribution/v1beta1/delegators/${delegator_address}/rewards`,
    });
  }

  getDelegationRewards(params: GetDelegationRewardsRequest): Promise<GetDelegationRewardsResponse> {
    const { delegator_address, validator_address } = params;
    return this.sendGet({
      path: `/api/cosmos/distribution/v1beta1/delegators/${delegator_address}/rewards/${validator_address}`,
    });
  }

  getDelegatorValidators(params: GetDelegatorValidatorsRequest): Promise<GetDelegatorValidatorsResponse> {
    const { delegator_address } = params;
    return this.sendGet({
      path: `/api/cosmos/distribution/v1beta1/delegators/${delegator_address}/validators`,
    });
  }

  getDelegatorWithdrawAddress(params: GetDelegatorWithdrawAddressRequest): Promise<GetDelegatorWithdrawAddressResponse> {
    const { delegator_address } = params;
    return this.sendGet({
      path: `/api/cosmos/distribution/v1beta1/delegators/${delegator_address}/withdraw_address`,
    });
  }

  getDistributionParams(): Promise<GetDistributionParamsResponse> {
    return this.sendGet({
      path: '/api/cosmos/distribution/v1beta1/params',
    });
  }

  getValidatorCommission(params: GetValidatorCommissionRequest): Promise<GetValidatorCommissionResponse> {
    const { validator_address } = params;
    return this.sendGet({
      path: `/api/cosmos/distribution/v1beta1/validators/${validator_address}/commission`,
    });
  }

  getValidatorOutstandingRewards(params: GetValidatorOutstandingRewardsRequest): Promise<GetValidatorOutstandingRewardsResponse> {
    const { validator_address } = params;
    return this.sendGet({
      path: `/api/cosmos/distribution/v1beta1/validators/${validator_address}/outstanding_rewards`,
    });
  }

  getValidatorSlashes(params: GetValidatorSlashesRequest): Promise<GetValidatorSlashesResponse> {
    const { validator_address, ...paginationParams } = params;
    return this.sendGet({
      path: `/api/cosmos/distribution/v1beta1/validators/${validator_address}/slashes`,
      queryParams: paginationParams
    });
  }

  getAllEvidence(params: PaginationRequest): Promise<GetAllEvidenceResponse> {
    return this.sendGet({
      path: '/api/cosmos/evidence/v1beta1/evidence',
      queryParams: params as unknown as QueryParams
    });
  }

  getGovernanceParams(params: GetGovernanceParamsRequest): Promise<GetGovernanceParamsResponse> {
    const { params_type } = params;
    return this.sendGet({
      path: `/api/cosmos/gov/v1beta1/params/${params_type}`,
    });
  }

  getAllProposals(params: GetAllProposalsRequest): Promise<GetAllProposalsResponse> {
    return this.sendGet({
      path: '/api/cosmos/gov/v1beta1/proposals',
      queryParams: params as unknown as QueryParams
    });
  }

  getProposalDetails(params: GetProposalDetailsRequest): Promise<GetProposalDetailsResponse> {
    const { proposal_id } = params;
    return this.sendGet({
      path: `/api/cosmos/gov/v1beta1/proposals/${proposal_id}`,
    });
  }

  getDeposits(params: GetDepositsRequest): Promise<GetDepositsResponse> {
    const { proposal_id } = params;
    return this.sendGet({
      path: `/api/cosmos/gov/v1beta1/proposals/${proposal_id}/deposits`,
    });
  }

  getTallyResult(params: GetTallyResultRequest): Promise<GetTallyResultResponse> {
    const { proposal_id } = params;
    return this.sendGet({
      path: `/api/cosmos/gov/v1beta1/proposals/${proposal_id}/tally`,
    });
  }

  getVotes(params: GetVotesRequest): Promise<GetVotesResponse> {
    const { proposal_id, ...paginationParams } = params;
    return this.sendGet({
      path: `/api/cosmos/gov/v1beta1/proposals/${proposal_id}/votes`,
      queryParams: paginationParams as QueryParams
    });
  }

  getVote(params: GetVoteRequest): Promise<GetVoteResponse> {
    const { proposal_id, voter } = params;
    return this.sendGet({
      path: `/api/cosmos/gov/v1beta1/proposals/${proposal_id}/votes/${voter}`,
    });
  }

  getAnnualProvisions(): Promise<GetAnnualProvisionsResponse> {
    return this.sendGet({
      path: '/api/cosmos/mint/v1beta1/annual_provisions',
    });
  }

  getInflation(): Promise<GetInflationResponse> {
    return this.sendGet({
      path: '/api/cosmos/mint/v1beta1/inflation',
    });
  }

  getMintingParams(): Promise<GetMintingParamsResponse> {
    return this.sendGet({
      path: '/api/cosmos/mint/v1beta1/params',
    });
  }

  getSpecificParam(params: GetSpecificParamRequest): Promise<GetSpecificParamResponse> {
    const { subspace, key } = params;
    return this.sendGet({
      path: '/api/cosmos/params/v1beta1/params',
      queryParams: { subspace, key }
    });
  }

  getSlashingParams(): Promise<GetSlashingParamsResponse> {
    return this.sendGet({
      path: '/api/cosmos/slashing/v1beta1/params',
    });
  }

  getSigningInfos(): Promise<GetSigningInfosResponse> {
    return this.sendGet({
      path: '/api/cosmos/slashing/v1beta1/signing_infos',
    });
  }

  getSingingInfoByConsAddress(params: GetSigningInfoByConsAddressRequest): Promise<GetSigningInfoByConsAddressResponse> {
    const { cons_address } = params;
    return this.sendGet({
      path: `/api/cosmos/slashing/v1beta1/signing_infos/${cons_address}`,
    });
  }

  getDelegations(params: GetDelegationsRequest): Promise<GetDelegationsResponse> {
    const { delegator_address, ...paginationParams } = params;
    return this.sendGet({
      path: `/api/cosmos/staking/v1beta1/delegations/${delegator_address}`,
      queryParams: paginationParams
    });
  }

  getRedelegations(params: GetRedelegationsRequest): Promise<GetRedelegationsResponse> {
    const { delegator_addr, ...queryParams } = params;
    return this.sendGet({
      path: `/api/cosmos/staking/v1beta1/delegators/${delegator_addr}/redelegations`,
      queryParams: queryParams
    });
  }

  getUnbondingDelegations(params: GetUnbondingDelegationsRequest): Promise<UnbondingDelegationResponse> {
    const { delegator_addr, ...paginationParams } = params;
    return this.sendGet({
      path: `/api/cosmos/staking/v1beta1/delegators/${delegator_addr}/unbonding_delegations`,
      queryParams: paginationParams
    });
  }

  getValidators(params: GetValidatorsRequest): Promise<GetValidatorsResponse> {
    const { delegator_addr, ...paginationParams } = params;
    return this.sendGet({
      path: `/api/cosmos/staking/v1beta1/delegators/${delegator_addr}/validators`,
      queryParams: paginationParams
    });
  }

  getValidatorInfo(params: GetValidatorInfoRequest): Promise<GetValidatorInfoResponse> {
    const { delegator_addr, validator_addr } = params;
    return this.sendGet({
      path: `/api/cosmos/staking/v1beta1/delegators/${delegator_addr}/validators/${validator_addr}`,
    });
  }

  getHistoricalInfo(params: GetHistoricalInfoRequest): Promise<GetHistoricalInfoResponse> {
    const { height } = params;
    return this.sendGet({
      path: `/api/cosmos/staking/v1beta1/historical_info/${height}`,
    });
  }

  getStakingParams(): Promise<GetStakingParamsResponse> {
    return this.sendGet({
      path: `/api/cosmos/staking/v1beta1/params`,
    });
  }

  getPoolInfo(): Promise<GetPoolInfoResponse> {
    return this.sendGet({
      path: `/api/cosmos/staking/v1beta1/pool`,
    });
  }

  getValidatorsForGivenStatus(params: GetValidatorsRequest): Promise<GetValidatorsResponse> {
    return this.sendGet({
      path: `/api/cosmos/staking/v1beta1/validators`,
      queryParams: params as unknown as QueryParams
    });
  }

  getValidatorInfoForAddress(params: GetValidatorInfoRequest): Promise<GetValidatorInfoResponse> {
    const { validator_addr } = params;
    return this.sendGet({
      path: `/api/cosmos/staking/v1beta1/validators/${validator_addr}`,
    });
  }

  getDelegationsForValidator(params: GetDelegationsRequest): Promise<GetDelegationsResponse> {
    const { validator_addr, ...paginationParams } = params;
    return this.sendGet({
      path: `/api/cosmos/staking/v1beta1/validators/${validator_addr}/delegations`,
      queryParams: paginationParams
    });
  }

  getUnbondingDelegation(params: GetUnbondingDelegationRequest): Promise<GetUnbondingDelegationResponse> {
    const { validator_addr, delegator_addr } = params;
    return this.sendGet({
      path: `/api/cosmos/staking/v1beta1/validators/${validator_addr}/delegations/${delegator_addr}/unbonding_delegation`,
    });
  }

  getAppliedPlan(params: GetAppliedPlanRequest): Promise<GetAppliedPlanResponse> {
    const { name } = params;
    return this.sendGet({
      path: `/api/cosmos/upgrade/v1beta1/applied_plan/${name}`,
    });
  }

  getCurrentPlan(): Promise<GetCurrentPlanResponse> {
    return this.sendGet({
      path: `/api/cosmos/upgrade/v1beta1/current_plan`,
    });
  }

  getModuleVersions(): Promise<GetModuleVersionsResponse> {
    return this.sendGet({
      path: `/api/cosmos/upgrade/v1beta1/module_versions`,
    });
  }

  getUpgradedConsensusState(lastHeight: number): Promise<GetUpgradedConsensusStateResponse> {
    return this.sendGet({
      path: `/api/cosmos/upgrade/v1beta1/upgraded_consensus_state/${lastHeight}`,
    });
  }

  getGrants(params: GetGrantsRequest): Promise<GetGrantsResponse> {
    return this.sendGet({
      path: `/api/cosmos/authz/v1beta1/grants`,
      queryParams: params as unknown as QueryParams,
    });
  }

  getAllowance(params: GetAllowanceRequest): Promise<GetAllowanceResponse> {
    const { granter, grantee } = params;
    return this.sendGet({
      path: `/api/cosmos/feegrant/v1beta1/allowance/${granter}/${grantee}`,
    });
  }

  getAllowanceForAddress(params: GetGrantsForAddressRequest): Promise<GetGrantsForAddressResponse> {
    const { grantee } = params;
    return this.sendGet({
      path: `/api/cosmos/feegrant/v1beta1/allowances/${grantee}`,
    });
  }

  simulate(params: SimulateRequest): Promise<SimulateResponse> {
    return this.sendPost({
      path: '/api/cosmos/tx/v1beta1/simulates',
      body: params,
    })
  }

  getTxsByEvent(params: TxsByEventRequest): Promise<TxsByEventResponse> {
    return this.sendGet({
      path: '/api/cosmos/tx/v1beta1/txs',
      queryParams: params as unknown as QueryParams,
    })
  }

  broadcastTx(params: BroadcastTxRequest): Promise<BroadcastTxResponse> {
    return this.sendPost({
      path: '/api/cosmos/tx/v1beta1/txs',
      body: params,
    })
  }

  getTxByHash(hash: string): Promise<TxResponse> {
    return this.sendGet({
      path: `/api/cosmos/tx/v1beta1/txs/${hash}`,
    })
  }
}
