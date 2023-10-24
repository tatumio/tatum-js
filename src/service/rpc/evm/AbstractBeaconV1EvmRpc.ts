/* eslint-disable @typescript-eslint/no-explicit-any */
import { Service } from 'typedi'
import {
  BlockQuery,
  EvmBeaconV1Interface,
  EvmBeaconResponse,
  StateCommitteesQuery,
  StateQuery,
  StateSyncCommitteesQuery, ValidatorBalancesQuery, ValidatorQuery, ValidatorsQuery,
} from '../../../dto'
import { GetI } from '../../../dto/GetI'
import { Constant, Utils } from '../../../util'

@Service()
export abstract class AbstractBeaconV1EvmRpc implements EvmBeaconV1Interface {
  protected abstract get<T>(get: GetI): Promise<T>

  getBlockAttestations({ blockId, ...rest }: BlockQuery): Promise<EvmBeaconResponse<any>> {
    const path = Utils.addQueryParams(`${Constant.BEACON_PREFIX}/blocks/${blockId}/attestations`, rest);
    return this.get({ path });
  }

  getBlockHeader({ blockId, ...rest }: BlockQuery): Promise<EvmBeaconResponse<any>> {
    const path = Utils.addQueryParams(`${Constant.BEACON_PREFIX}/blocks/${blockId}/header`, rest);
    return this.get({ path });
  }
  getBlockHeaders({ slot, parentRoot, ...rest }: { slot?: string; parentRoot?: string } = {}): Promise<EvmBeaconResponse<any>> {
    const queryParams = {
      ...(slot ? { slot } : {}),
      ...(parentRoot ? { parentRoot } : {}),
      ...rest
    };
    const path = Utils.addQueryParams(`${Constant.BEACON_PREFIX}/headers`, queryParams);
    return this.get({ path });
  }

  getBlockRoot({ blockId, ...rest }: BlockQuery): Promise<EvmBeaconResponse<any>> {
    const path = Utils.addQueryParams(`${Constant.BEACON_PREFIX}/blocks/${blockId}/root`, rest);
    return this.get({ path });
  }

  getGenesis(): Promise<EvmBeaconResponse<any>> {
    const path = Utils.addQueryParams(`${Constant.BEACON_PREFIX}/genesis`);
    return this.get({ path });
  }

  getStateCommittees({ stateId, ...rest }: StateCommitteesQuery): Promise<EvmBeaconResponse<any>> {
    const path = Utils.addQueryParams(`${Constant.BEACON_PREFIX}/states/${stateId}/committees`, rest);
    return this.get({ path });
  }

  getStateFinalityCheckpoints({ stateId, ...rest }: StateQuery): Promise<EvmBeaconResponse<any>> {
    const path = Utils.addQueryParams(`${Constant.BEACON_PREFIX}/states/${stateId}/finality_checkpoints`, rest);
    return this.get({ path });
  }

  getStateFork({ stateId, ...rest }: StateQuery): Promise<EvmBeaconResponse<any>> {
    const path = Utils.addQueryParams(`${Constant.BEACON_PREFIX}/states/${stateId}/fork`, rest);
    return this.get({ path });
  }

  getStateRoot({ stateId, ...rest }: StateQuery): Promise<EvmBeaconResponse<any>> {
    const path = Utils.addQueryParams(`${Constant.BEACON_PREFIX}/states/${stateId}/root`, rest);
    return this.get({ path });
  }

  getStateSyncCommittees({ stateId, ...rest }: StateSyncCommitteesQuery): Promise<EvmBeaconResponse<any>> {
    const path = Utils.addQueryParams(`${Constant.BEACON_PREFIX}/states/${stateId}/sync_committees`, rest);
    return this.get({ path });
  }

  getStateValidator({ stateId, validatorId, ...rest }: ValidatorQuery): Promise<EvmBeaconResponse<any>> {
    const path = Utils.addQueryParams(`${Constant.BEACON_PREFIX}/states/${stateId}/validators/${validatorId}`, rest);
    return this.get({ path });
  }

  getStateValidatorBalances({ stateId, ...rest }: ValidatorBalancesQuery): Promise<EvmBeaconResponse<any>> {
    const path = Utils.addQueryParams(`${Constant.BEACON_PREFIX}/states/${stateId}/validator_balances`, rest);
    return this.get({ path });
  }

  getStateValidators({ stateId, ...rest }: ValidatorsQuery): Promise<EvmBeaconResponse<any>> {
    const path = Utils.addQueryParams(`${Constant.BEACON_PREFIX}/states/${stateId}/validators`, rest);
    return this.get({ path });
  }
}
