/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BlockQuery,
  EvmBeaconResponse,
  EvmBeaconV1Interface,
  QueryParams,
  StateCommitteesQuery,
  StateQuery,
  StateSyncCommitteesQuery,
  ValidatorBalancesQuery,
  ValidatorQuery,
  ValidatorsQuery,
} from '../../../dto'
import { GetI } from '../../../dto/GetI'
import { Constant, Utils } from '../../../util'

export abstract class AbstractBeaconV1EvmRpc implements EvmBeaconV1Interface {
  protected abstract get<T>(get: GetI): Promise<T>

  private sendGet<T>(path: string, params: QueryParams): Promise<T> {
    const fullPath = Utils.addQueryParams(`${Constant.BEACON_PREFIX}/${path}`, Utils.camelToSnakeCase, params)
    return this.get({ path: fullPath })
  }

  getBlockAttestations({ blockId, ...rest }: BlockQuery): Promise<EvmBeaconResponse<any>> {
    return this.sendGet(`blocks/${blockId}/attestations`, rest)
  }

  getBlockHeader({ blockId, ...rest }: BlockQuery): Promise<EvmBeaconResponse<any>> {
    return this.sendGet(`blocks/${blockId}/header`, rest)
  }

  getBlockHeaders({ slot, parentRoot, ...rest }: { slot?: string; parentRoot?: string } = {}): Promise<
    EvmBeaconResponse<any>
  > {
    const queryParams = {
      ...(slot ? { slot } : {}),
      ...(parentRoot ? { parentRoot } : {}),
      ...rest,
    }
    return this.sendGet(`headers`, queryParams)
  }

  getBlockRoot({ blockId, ...rest }: BlockQuery): Promise<EvmBeaconResponse<any>> {
    return this.sendGet(`blocks/${blockId}/root`, rest)
  }

  getGenesis(): Promise<EvmBeaconResponse<any>> {
    return this.sendGet('genesis', {})
  }

  getStateCommittees({ stateId, ...rest }: StateCommitteesQuery): Promise<EvmBeaconResponse<any>> {
    return this.sendGet(`states/${stateId}/committees`, rest)
  }

  getStateFinalityCheckpoints({ stateId, ...rest }: StateQuery): Promise<EvmBeaconResponse<any>> {
    return this.sendGet(`states/${stateId}/finality_checkpoints`, rest)
  }

  getStateFork({ stateId, ...rest }: StateQuery): Promise<EvmBeaconResponse<any>> {
    return this.sendGet(`states/${stateId}/fork`, rest)
  }

  getStateRoot({ stateId, ...rest }: StateQuery): Promise<EvmBeaconResponse<any>> {
    return this.sendGet(`states/${stateId}/root`, rest)
  }

  getStateSyncCommittees({ stateId, ...rest }: StateSyncCommitteesQuery): Promise<EvmBeaconResponse<any>> {
    return this.sendGet(`states/${stateId}/sync_committees`, rest)
  }

  getStateValidator({ stateId, validatorId, ...rest }: ValidatorQuery): Promise<EvmBeaconResponse<any>> {
    return this.sendGet(`states/${stateId}/validators/${validatorId}`, rest)
  }

  getStateValidatorBalances({ stateId, ...rest }: ValidatorBalancesQuery): Promise<EvmBeaconResponse<any>> {
    return this.sendGet(`states/${stateId}/validator_balances`, rest)
  }

  getStateValidators({ stateId, ...rest }: ValidatorsQuery): Promise<EvmBeaconResponse<any>> {
    return this.sendGet(`states/${stateId}/validators`, rest)
  }
}
