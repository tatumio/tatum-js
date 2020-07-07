import axios from 'axios';

export const broadcastBtc = async (txData: string): Promise<{ txId: string }> => {
    return (await axios.post(`https://api.tatum.io/v3/bitcoin/broadcast`,
        {txData},
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};