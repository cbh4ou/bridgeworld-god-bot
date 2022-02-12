import { web3 } from "./Web3";
const { SECRET_KEY } = process.env;


module.exports = {
    signTransaction: async function({to, method, address}){
        // define CONTRACT_ADDRESS
            const options = {
                to: to,
                data: method.encodeABI(),
                gas: await method.estimateGas({from: address}),
                gasPrice: await web3.eth.getGasPrice() // or use some predefined value
            };
    
            const signed  = await web3.eth.accounts.signTransaction(options, SECRET_KEY);
            const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);
            return receipt;
        }
}