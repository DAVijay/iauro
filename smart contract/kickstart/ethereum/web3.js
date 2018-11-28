import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    // We are in the browser and metamask is running.
    web3 = new Web3(window.web3.currentProvider);
} else {
    // We are on the browser OR the user is not running Metamask
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/e7e88c8887e3427aa3518cffc1c445a1'
    );
    web3 = new Web3(provider);
}

export default web3;