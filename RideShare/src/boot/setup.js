import { AppLoading, NotificationsIOS } from "expo";
// import Permissions from "expo-permissions";
import * as Permissions from 'expo-permissions';
import React, { Component } from "react";
import { StyleProvider } from "native-base";
import App from "../App";
import getTheme from "../theme/components";
import variables from "../theme/variables/commonColor";
import StorageManager from "../helpers/storageManager";


export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }

  componentWillMount = async() => {
    this.prepare();
  //   // if(Platform.OS === 'ios'){
  //   //   Expo.Notifications.setBadgeNumberAsync(0);
  //   // }
 }
  
    async prepare() {
  
      let checkList = [];

  
      let storageManager = StorageManager.getInstance();
      let storageStatus = await storageManager.loadAllDataFromPersistence();
      checkList.push(storageStatus);
  
      let locationPermissionStatus = await Permissions.askAsync(Permissions.LOCATION);
      checkList.push(locationPermissionStatus);
  
  
      let pushNotificationStatus = await this.askForPushNotificationsPermissionAsync();
      checkList.push(pushNotificationStatus);
      allCheckingPass = checkList.every( (b) => !!b );
      this.setState({ isReady: allCheckingPass });
    }
  
    askForPushNotificationsPermissionAsync = async() => {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
    
      // only ask if permissions have not already been determined, because
      // iOS won't necessarily prompt the user a second time.
      if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
    
      // Stop here if the user did not grant permissions
      if (finalStatus !== 'granted') {
        return false;
      }
    
      return true;
      
    }
  
    render() {
      if (!this.state.isReady) {
        // Gets the app going by putting up the loading screen
        return <AppLoading />;
      }
      return (
        <StyleProvider style={getTheme(variables)}>
          <App />
        </StyleProvider>
      );
    }
  }
  