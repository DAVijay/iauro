const hdwalletprovider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface , bytecode } = require('./compile');

const provider = new hdwalletprovider(
    'sample knife assist ladder update caution black pupil hub sudden carry little',
    'https://rinkeby.infura.io/v3/858218d6f49c43c0824b8a503e55936d'
)

const web3 = new Web3(provider);

const deploy = async () =>{
   const accounts = await web3.eth.getAccounts();

   console.log('Attempting to deploy from account',accounts[0]);

   const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data : bytecode, arguments : ['Hi there!']})
        .send({ gas : '1000000', from : accounts[0]});

    console.log('Contract deploy to :',result.options.address);        
};

deploy();   