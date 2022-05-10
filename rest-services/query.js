'use strict';

const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');


var query = async function (channel, chaincode, functionName, functionArgs) {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', 'rest-generate-user','connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(channel);

        // Get the contract from the network.
        const contract = network.getContract(chaincode);

        // Evaluate the specified transaction.
        console.log("functionArgs", functionArgs)
        const result = await contract.evaluateTransaction(functionName, functionArgs);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

        // Disconnect from the gateway.
        await gateway.disconnect();
        if (result != "") {
            return JSON.parse(result)
        }
        return result

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        return error
    }
}

module.exports = {
    querySDK: query,

}
