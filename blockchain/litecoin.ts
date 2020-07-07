import axios from 'axios';

export const broadcastLtc = async (txData: string): Promise<{ txId: string }> => {
    return (await axios.post(`https://api.tatum.io/v3/litecoin/broadcast`,
        {txData},
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};