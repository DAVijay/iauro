const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);                         // delete build folder

const campaignPath = path.resolve(__dirname,'contracts','Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');
const output = solc.compile(source,1).contracts;        // compiling 

fs.ensureDirSync(buildPath);                      // create build folder                    

for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':','') + '.json'),        // storing in file 
        output[contract]
    );
}