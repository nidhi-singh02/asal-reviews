# asal-reviews

Our Online Review Creation/Management solution using Blockchain named **"AsalReviews"**

We have three folders for three different layers

### Network
This folder contains all Hyperledger Fabric related cryptographic material, channel artifacts, genesis block,chaincode and docker-compose YAML files.

### asal-reviews-api
This folder is a Web server based on Node.js and Express.js framework. It facilitates following things -

- Acts like a Web server that wraps all the Fabric interaction logic as REST API (GET, POST endpoints).<br />
- Acts as client for Fabric network by using Fabric-Client NODE SDK <br />
- Bridge between an user interface layer and fabric network layer.

### asal-reviews-ui
This  folder is Customer's interface developed using Angular 6. This consumes REST API to contact with Web server.


## Demo video

[![Watch the video]()]
(https://www.youtube.com/watch?v=wRdv_qaQAjQ&ab_channel=NidhiSingh)

# Prerequisites:
- **Node.js version 8.9.0+ (but not higher than 9.0)**
- **Docker and Docker Compose (latest)**
- **Golang (latest) with $GOPATH set**
- **Chaincode installed to $GOPATH/src/github.com/chaincode**

# HyperLedger Fabric Composition

#### Members and Components
Network consortium consists of:

Orderer organization - Used **RAFT ordering mechanism with one orderer node**

**Two Organization each consisting of two peer nodes each**.<br />
Peer organization 1 - Asalreviews.com <br />
Peer organization 2 - Seller.com <br />

World State Database - CouchDB <br />
External Database    - MongoDB <br />

## Bringing up the network.

Make sure you are in the Network directory.

``` bash
cd network/fabric-network
```

``` bash
./network.sh up createChannel -c review -ca -s couchdb

./network.sh deployCC -ccn review -ccp ../chaincode/ -ccl go -c review -ccv 1.0 -ccs 1

```
couchDB is running on port 7984 and 8984

# Node-Express-SDK
## Starting the node app + SDK
Make sure you are in the WebServer directory
``` bash
cd ../asal-reviews-api
```
### Install the node modules
**Note: I am using node version 8.17.0 with npm version 6.13.4** 

**You cannot use a node version above 9.0!!!**
``` bash
npm install
```

### Starting the node app server
``` bash
nodemon app.js
```
**The server will started on port 9084 (localhost:5000)**

**This uses a module called 'nodemon' to restart the server whenever a change is made**


# Front-end
**Start the Angular app**
Make sure you are in the FrontEnd directory
``` bash
cd ../asal-reviews-ui
```
### Install the node modules
``` bash
npm install
```

``` bash
ng serve
```
**The server will started on port 4200 (localhost:4200)**

**Login as "customer" or as "guest" (no login needed)**
