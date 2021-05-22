import React, { Component } from "react";
import { Root, Toast } from "native-base";
import { Notifications } from "expo";
// import * as Notifications from 'expo-notifications'
import StorageManager from "./helpers/storageManager"; 
import { createAppContainer } from "react-navigation";
import { NavigationContainer } from '@react-navigation/native';
// import createStackNavigator from "react-navigation-stack";
import {createStackNavigator} from "@react-navigation/stack";
import {createDrawerNavigator} from "@react-navigation/drawer";
import Drawers from "../Drawers";
import WelcomePage from "./screens/welcomePage";
import SettingPage from "./screens/settingPage";
import SideBar from "./screens/sidebar";
import Search from "./screens/search";
import LoginPage from './screens/loginPage';
import SignupPage from './screens/signupPage';
import EditProfilePage from './screens/editProfilePage';
import GoDrivePage from './screens/goDrivePage';
import MessagePage from './screens/messagePage';
import ResetPasswordPage from './screens/resetPasswordPage';
import Navigation from './navigation'
import CarShare from "./contracts/CarShare.json";
import Web3 from "web3";
import '../global.js'
//import {Buffer} from "buffer";
//import {Drizzle, generateStore} from "@drizzle/store";

const options = {
  contracts: [CarShare]
};
//const drizzleStore = generateStore(options);
//const drizzle = new Drizzle(options, drizzleStore);

const storageManager = StorageManager.getInstance();
    // {
    //   Search: { screen: Search },
    //   GoDrivePage: { screen: GoDrivePage },
    //   MessagePage: { screen: MessagePage},
    //   SettingPage: { screen: SettingPage },
    // },
    // {
    //   initialRouteName: "Search",
    //   contentOptions: {
    //     activeTintColor: "#e91e63"
    //   },
    //   contentComponent: props => <SideBar {...props} />
    // }
  
  
  // const stackPages = {
  //   Drawer: { screen: Drawers },
  //   LoginPage: { screen: LoginPage },
  //   SignupPage: { screen: SignupPage },
  //   WelcomePage: { screen: WelcomePage },
  //   ResetPasswordPage: { screen: ResetPasswordPage },
  //   EditProfilePage: { screen: EditProfilePage },
  // };
const HDWalletProvider = require("@truffle/hdwallet-provider");
const privateKey = "72a1c12117e1b0c457d8fd778fe071b066d81d280344f82b37762e763ba08d09";
const provider = new HDWalletProvider(privateKey,"https://rinkeby.infura.io/v3/f726b471fe794806a3fe057d2352d33b");

  export default class App extends Component {
  
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
  
  //     const user = storageManager.get('user');
  //     console.log(user)
  //     const Stack = createStackNavigator();
  //     function MyStack(){
  //       return (
  //         <NavigationContainer>
  //           <Stack.Navigator initialRouteName = {user ? "Drawers" : "WelcomePage"}>
  //             <Stack.Screen name="Drawers" component={Drawers} />
  //             <Stack.Screen name="LoginPage" component={LoginPage} />
  //             <Stack.Screen name="SignupPage" component={SignupPage} />
  //             <Stack.Screen name="WelcomePage" component={WelcomePage} />
  //             <Stack.Screen name="ResetPasswordPage" component={ResetPasswordPage} />
  //             <Stack.Screen name="EditProfilePage" component={EditProfilePage} />
  //           </Stack.Navigator>
  //         </NavigationContainer>
  //       )
  //     }  
  
      
    // }
    
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
      //await this.state.carshare.methods.addUser("Hello","rishabh@sah.com","1234554321","mho4gr1234").send({from : '0x4a9472f6eA48929195a6b312B375033b5249fb08'})
      //verifying written data
      
      //const index = await carshare.methods.userCount().call()
      //console.log(await carshare.methods.users(index).call())
    }
    async componentDidMount() {
    
      // Handle notifications that are received or selected while the app
      // is open. If the app was closed and then opened by tapping the
      // notification (rather than just tapping the app icon to open it),
      // this function will fire on the next tick after the app starts
      // with the notification data.
      this._notificationSubscription = Notifications.addListener(this.handleNotification);
    }
  
    handleNotification = function (notification) {
      Toast.show({
        text: notification.data.message,
        textStyle: { textAlign: 'center' },
        type: "success",
        position: "top",
        duration: 5000,
      });
    };
  
    render() {
  
      return (
        <Root>
          <Navigation />
        </Root>
      )
    }
  }
  