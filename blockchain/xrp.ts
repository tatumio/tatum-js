import axios from 'axios';

export const getXrpFee = async (): Promise<{ drops: { base_fee: number } }> => {
    return (await axios.get('https://api.tatum.io/v3/xrp/fee', {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const getXrpAccountInfo = async (account: string): Promise<{ ledger_current_index: number, account_data: { Sequence: number } }> => {
    return (await axios.get(`https://api.tatum.io/v3/xrp/account/${account}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const broadcastXrp = async (txData: string): Promise<{ txId: string }> => {
    return (await axios.post(`https://api.tatum.io/v3/xrp/broadcast`,
        {txData},
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};