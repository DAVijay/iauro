const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json')

const provider = new HDWalletProvider(
    'winner alcohol uniform family minor rescue boost phrase sun neck record resource',
    'https://rinkeby.infura.io/v3/e7e88c8887e3427aa3518cffc1c445a1'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account ', accounts[0]);

    const result = await new web3.eth.Contract(
        JSON.parse(compiledFactory.interface))
        .deploy({data: compiledFactory.bytecode })
        .send({gas: '1000000', from: accounts[0]});

    
    console.log('Contract deployed to ', result.options.address);
};
deploy();