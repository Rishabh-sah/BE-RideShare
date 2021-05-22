import { Component } from "react";
import Web3 from "web3";
import CarShare from "./contracts/CarShare.json";
const options = {
  contracts: [CarShare]
};
const HDWalletProvider=require("@truffle/hdwallet-provider");
const privateKey = "72a1c12117e1b0c457d8fd778fe071b066d81d280344f82b37762e763ba08d09";
const provider = new HDWalletProvider(privateKey,"https://ropsten.infura.io/v3/f726b471fe794806a3fe057d2352d33b");

class Instance extends Component {
constructor(props){
  
  super(props);
  this.state={
    web3Provider:null,
    contracts:{},
    account:'',
    data:'Signup',
    index:'Login',
    web3:null,
    carshare:null,
  }
}
async UNSAFE_componentWillMount() {
  await this.loadWeb3();
  await this.loadBlockchainData();
}
async loadWeb3(){
  
  //setting up web3
  web3 =  await new Web3(provider);
  this.setState({web3});
}

async loadBlockchainData(){
  //fetching smart contract
  const networkId =await this.state.web3.eth.net.getId();
  const networkData = CarShare.networks[networkId]
  const carshare =await new web3.eth.Contract(CarShare.abi,networkData.address);
  this.setState({carshare});
  await carshare.methods.addUser("Rishabh","rishabh@sah.com","1234554321","mho4gr1234").send({from : '0x4a9472f6eA48929195a6b312B375033b5249fb08'})
    //verifying written data
    const index = await carshare.methods.userCount().call()
    console.log(await carshare.methods.users(index).call())
}
  
}

export default Instance;