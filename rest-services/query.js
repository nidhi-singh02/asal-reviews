'use strict';

var Fabric_Client = require('fabric-client');
var path = require('path');
var util = require('util');
var fs = require('fs');
const appLogger = require('./services/appLogger');



exports.querySDK = async function (channelID, chaincodeID, peerIPAddress, fnName, request, reply) {
    var queryRequest;
    var queryString;
    var query_responses;
    var func_name = fnName;
    appLogger.info("Function Name Rcvd:" + func_name);
    var port7051 = "7051"

    var options = {
        wallet_path: path.join(__dirname, 'wallet/admin'),
        user_id: 'admin',
        channel_id: channelID,
        chaincode_id: chaincodeID,
    };
    appLogger.info("DLT options", options);


    var fabric_client = new Fabric_Client();

    var channel = fabric_client.newChannel(options.channel_id);
    let serverCert = fs.readFileSync('./crypto-config/peerOrganizations/tlsca.Manufacturer.scm.com-cert.pem');

    var certName;

    if (peerIPAddress == "10.160.217.5") {
        certName = "peer0.Manufacturer.scm.com";
    }


    var peer = fabric_client.newPeer('grpcs://' + peerIPAddress + ':' + port7051, {
        'pem': Buffer.from(serverCert).toString(),
        'ssl-target-name-override': certName
    });

    channel.addPeer(peer);
    var member_user = null;
    var store_path = options.wallet_path;
    appLogger.info('Store path:' + store_path);
    //var tx_id = null;

    var state_store = await Fabric_Client.newDefaultKeyValueStore({
        path: store_path
    });

    fabric_client.setStateStore(state_store);
    var crypto_suite = Fabric_Client.newCryptoSuite();
    var crypto_store = Fabric_Client.newCryptoKeyStore({
        path: store_path
    });
    crypto_suite.setCryptoKeyStore(crypto_store);
    fabric_client.setCryptoSuite(crypto_suite);

    var user_from_store = await fabric_client.getUserContext(options.user_id, true);

    if (user_from_store && user_from_store.isEnrolled()) {
        appLogger.info('Successfully loaded admin from persistence');
        member_user = user_from_store;
    } else {
        throw new Error('Failed to get user1.... run registerUser.js');
    }

    if (func_name == "queryPackage") {
        var args = request;
        queryRequest = {
            chaincodeId: options.chaincode_id,
            fcn: func_name,
            args: [args.productId]
        };
        appLogger.info("Calling queryPackage");

    }

    if (func_name == "getAllPackages") {
        var args = request;
        queryRequest = {
            chaincodeId: options.chaincode_id,
            fcn: func_name,
            args: []
        };
        appLogger.info("Calling queryAllPackage");

    }

    if (func_name == "PackageQueryWithPagination") {
        var args = request;
        var bookmark = "";
        var pageSize = args.Size || 20;
        queryString = `{"\selector\":{\"$and\":[{"\Manufacturer\":{"\$eq\":"${args.Manufacturer}"}},{\"UpdatedDate\":{"\$ne\":""}}]},\"sort\": [{\"UpdatedDate\": \"desc\"},{\"Manufacturer\": \"desc\"}], \"use_index\":[\"_design/indexUdateDoc\", \"indexUdate\"]}`

        queryRequest = {
            chaincodeId: options.chaincode_id,
            fcn: func_name,
            args: [queryString, pageSize, bookmark]
        };
        appLogger.info("Calling PackageQueryWithPagination");


    }

    if (func_name == "QueryShipments") {
        var args = request;
        var bookmark = "";
        var pageSize = args.Size || 20;
        queryString = `{"\selector\":{\"$and\":[{"\Seller\":{"\$eq\":"${args.Seller}"}},{\"UpdatedDate\":{"\$ne\":""}}]},\"sort\": [{\"UpdatedDate\": \"desc\"},{\"Seller\": \"desc\"}], \"use_index\":[\"_design/indexUdateSellerDoc\", \"indexUdateSeller\"]}`

        queryRequest = {
            chaincodeId: options.chaincode_id,
            fcn: "PackageQueryWithPagination",
            args: [queryString, pageSize, bookmark]
        };
        appLogger.info("Calling PackageQueryWithPagination");


    }

    if (func_name == "QueryDeliveredShipments") {
        var args = request;
        var bookmark = "";
        var pageSize = args.Size || 20;
        queryString = `{"\selector\":{\"$and\":[{"\Buyer\":{"\$eq\":"${args.Buyer}"}},{\"UpdatedDate\":{"\$ne\":""}}]},\"sort\": [{\"UpdatedDate\": \"desc\"},{\"Buyer\": \"desc\"}], \"use_index\":[\"_design/indexUdateBuyerDoc\", \"indexUdateBuyer\"]}`

        queryRequest = {
            chaincodeId: options.chaincode_id,
            fcn: "PackageQueryWithPagination",
            args: [queryString, pageSize, bookmark]
        };
        appLogger.info("Calling PackageQueryWithPagination");


    }



    appLogger.info("query request......", queryRequest);
    appLogger.info("---DLT Query Request for " + func_name + "---", queryRequest);

    // query_responses could have more than one  results if there multiple peers were used as targets
    var query_responses = await channel.queryByChaincode(queryRequest);

    appLogger.info("query_responses ......", query_responses);
    if (query_responses && query_responses.length == 1) {
        if (query_responses[0] instanceof Error) {

            appLogger.error("---DLT Query Err for " + func_name + "---", query_responses[0]);
            return ("error:" + query_responses[0]);

        } else {
            appLogger.info("The Response is " + query_responses[0].toString());
            appLogger.info("---DLT Query Response for " + func_name + "---", util.format(query_responses[0].toString('utf8')));
            appLogger.info((util.format(query_responses[0].toString('utf8'))));

            // reply.send(util.format(query_responses[0].toString('utf8')));
            return (util.format(query_responses[0].toString('utf8')));

        }
    } else {
        appLogger.info("No payloads were returned from query");
        appLogger.info("---DLT Query Err for " + func_name + "---", "No payloads were returned from query");
    }

}
