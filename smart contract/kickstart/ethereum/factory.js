import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xe54EF43b5Daf2195B891F3a6A3c8761E8a36CD3E'
);

export default instance;