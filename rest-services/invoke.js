'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

var invoke = async function (channelID, chaincode, functionName, functionArgs) {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', 'rest-generate-user','connection-org1.json');

        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

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
        const network = await gateway.getNetwork(channelID);

        // Get the contract from the network.
        const contract = network.getContract(chaincode);

        // Submit the specified transaction.
        let response;
        if (functionName == "RecordEmission") {
            response = await contract.submitTransaction(functionName, functionArgs.productID, functionArgs.productName,functionArgs.companyName, functionArgs.sectorType,functionArgs.financialYear,functionArgs.CO2, functionArgs.CH4, functionArgs.N20, functionArgs.HFC, functionArgs.SF6, functionArgs.PFC, functionArgs.Nf3, functionArgs.Bill, functionArgs.Electricity, functionArgs.Emission, functionArgs.Activity,functionArgs.Scope3Emission,"reliance.com","reliance.com",functionArgs.cts,functionArgs.uts,"");
        }

        else {
            response = await contract.submitTransaction(functionName, functionArgs);
        }

        console.log('Transaction has been submitted', response.toString());

        // Disconnect from the gateway.
        await gateway.disconnect();

        return response.toString()

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return error
    }
}

module.exports = {
    invokeSDK: invoke

}