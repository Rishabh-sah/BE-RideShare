import React, { Component } from "react";
import StorageManager from "./helpers/storageManager"; 

import { NavigationContainer } from '@react-navigation/native';
// import createStackNavigator from "react-navigation-stack";
import {createStackNavigator} from "@react-navigation/stack"
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

const HDWalletProvider=require("@truffle/hdwallet-provider");
const privateKey = "72a1c12117e1b0c457d8fd778fe071b066d81d280344f82b37762e763ba08d09";
const provider = new HDWalletProvider(privateKey,"https://ropsten.infura.io/v3/f726b471fe794806a3fe057d2352d33b");

const storageManager = StorageManager.getInstance();
const user = storageManager.get('user');
     

const Stack = createStackNavigator();
export default function Navigation(){
        return (
          <NavigationContainer>
            <Stack.Navigator 
            screenOptions={{
              headerShown: false
            }}
            initialRouteName = {user ? "Drawers" : "WelcomePage"}>
              <Stack.Screen name="Drawers" component={Drawers} />
              <Stack.Screen name="LoginPage" component={LoginPage} />
              <Stack.Screen name="SignupPage" component={SignupPage} />
              <Stack.Screen name="WelcomePage" component={WelcomePage} />
              <Stack.Screen name="ResetPasswordPage" component={ResetPasswordPage} />
              <Stack.Screen name="EditProfilePage" component={EditProfilePage} />
            </Stack.Navigator>
          </NavigationContainer>
        )
      }  
  