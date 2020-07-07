import axios from 'axios';

export const broadcastBcash = async (txData: string): Promise<{ txId: string }> => {
    return (await axios.post(`https://api.tatum.io/v3/bcash/broadcast`,
        {txData},
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};