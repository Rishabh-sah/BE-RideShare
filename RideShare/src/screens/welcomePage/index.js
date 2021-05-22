import "../../../shims"
import React, { Component } from "react";
import { ImageBackground, View, StatusBar } from "react-native";
import { Container, Button, H2, Text } from "native-base";

import styles from "./styles";
import CarShare from "../../contracts/CarShare.json";
import Web3 from "web3";
//import Instance from "../../Instance.js";
import detectEthereumProvider from '@metamask/detect-provider';
//import {Drizzle} from "@drizzle/store";
import ReadString from "./test.js";

const options = {
  contracts: [CarShare]
};


const HDWalletProvider=require("@truffle/hdwallet-provider");
const privateKey = "72a1c12117e1b0c457d8fd778fe071b066d81d280344f82b37762e763ba08d09";
const provider = new HDWalletProvider(privateKey,"https://rinkeby.infura.io/v3/f726b471fe794806a3fe057d2352d33b");
const backgroundImage = require("../../../assets/backgroundImage.jpg");
const launchscreenLogo = require("../../../assets/logo.png");
const slogan = require("../../../assets/slogan.png");
var cardata;
var data;

class WelcomePage extends Component {
  
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
    //console.log("hello");
    await this.loadWeb3();
    await this.loadBlockchainData();
    await this.readWrite();
  }
  async loadWeb3(){
    
    //setting up web3
    const web3 =  await new Web3(provider);
    this.setState({web3});
  }
  
  async loadBlockchainData(){
    //fetching smart contract
    const networkId =await this.state.web3.eth.net.getId();
    const networkData = CarShare.networks[networkId]
    const carshare =await new web3.eth.Contract(CarShare.abi,networkData.address);
    this.setState({carshare});
  }
  async readWrite(){
    //trying to read data
    const data =await this.state.carshare.methods.getData().call();
    this.setState({data})

    //trying to write data
    await this.state.carshare.methods.addUser("Rishabh","rishabh@sah.com","1234554321","mho4gr1234").send({from : '0x4a9472f6eA48929195a6b312B375033b5249fb08'})
    //verifying written data
    //window.alert('here');
    const index = await this.state.carshare.methods.userCount().call()
    console.log(await this.state.carshare.methods.users(index).call());
    //console.log({index});
  }

  render() {  
    return (
      <Container>
        <StatusBar barStyle="light-content" />
      
        <ImageBackground source={backgroundImage} style={styles.imageContainer}>
          <View style={styles.logoContainer}>
            <ImageBackground source={launchscreenLogo} style={styles.logo} />
            
          </View>

          <View style={styles.contentContainer}>

            <View style={styles.titleContainer}>
              <ImageBackground source={slogan} style={styles.slogan} />
            </View>
            
            <View style={styles.buttonGroup} >
              <Button
                style={styles.leftButton}
                onPress={() => this.props.navigation.navigate('LoginPage')}
              >
                <Text>Login</Text>
              </Button>
              <Button
                style={styles.rightButton}
                onPress={() => this.props.navigation.navigate('SignupPage')}
              >
                <Text>
                  {this.state.data}
                </Text>
              </Button>
            </View>

          </View>
        </ImageBackground>
      </Container>
    );
  }
}

export default WelcomePage;
