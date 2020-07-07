import axios from 'axios';

export const getXlmAccountInfo = async (account: string): Promise<{ sequence: string }> => {
    return (await axios.get(`https://api.tatum.io/v3/xlm/account/${account}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const broadcastXlm = async (txData: string): Promise<{ txId: string }> => {
    return (await axios.post(`https://api.tatum.io/v3/xlm/broadcast`,
        {txData},
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};