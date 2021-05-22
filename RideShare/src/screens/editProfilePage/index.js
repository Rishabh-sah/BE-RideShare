import React, { Component } from "react";
import { Keyboard } from 'react-native';
import { View } from "react-native";
import {
  Container, Header, Title, Content, Button, Item, 
  Label, Input, Body, Left, Right, Icon, Form, Text, Toast
} from "native-base";
import * as ImagePicker from 'expo-image-picker';

import { Avatar } from 'react-native-elements';
import { Switch } from 'react-native'

import styles from "./styles";
import config from "../../../config";
import networkClient from "../../helpers/networkClient";
import StorageManager from '../../helpers/storageManager';
import MyView from './MyView';
import navigation from '../../helpers/navigation';

const storageManager = StorageManager.getInstance();

class EditProfilePage extends Component {

  constructor(props){
    super(props);
    const user = storageManager.get('user');
    this.state = {
      avatarSource: user.avatarSource,
      email: user.email,
      nickname: user.nickname,
      password: '',
      newPassword: '',
      confirmPassword: '',
      isDriver: user.isDriver,
      carplate: user.carplate,
      contact: user.contact,
    };
    
  }

  render() {
    const { avatarSource, email, nickname, password, newPassword, confirmPassword,isDriver,carplate,contact } = this.state;
    // const user = storageManager.get('user');
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => {
                                  this.props.navigation.goBack();
                                }}>
              <Icon type="MaterialIcons" name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{color:'white'}}>Edit Profile</Title>
          </Body>
          <Right />
        </Header>

        <Content>
        <View style={styles.avatarGroup}>
        { avatarSource ?
            <Avatar
              xlarge
              rounded
              block
              source={{uri: 'data:image/png;base64,'+avatarSource}}
              activeOpacity={0.7}
              onPress={this._pickImage}
            />
            :
            <Avatar
              xlarge
              rounded
              block
              source={{uri: "data:image/jpeg;base64,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"}}
              activeOpacity={0.7}
              onPress={this._pickImage}
            />
          }
          <Text>Click icon to select an image from device</Text>
        </View>
          
          
          <Form>
            <Item floatingLabel>
              <Label style={styles.label}>Email</Label>
              <Input 
                value={email} 
                onChangeText={(email) => this.setState({email})}/>
            </Item>
                    
            <Item floatingLabel>
              <Label style={styles.label}>Nickname</Label>
              <Input 
                value={nickname} 
                onChangeText={(nickname) => this.setState({nickname})}/>
            </Item>
            
            
            <View style={styles.switch}>
               <Text style={{color: 'grey',fontSize: 17}}>I am also a driver</Text>
              <Switch  
              value = {isDriver}
              onValueChange = {this.onIsDriverClick}/>
            </View>
            
           
            <MyView hide={!this.state.isDriver}>
              <Item floatingLabel>
                <Label style={styles.label}>Car Plate</Label>
                <Input 
                  value={carplate} 
                  onChangeText={(carplate) => this.setState({carplate})}
                />
              </Item>
            </MyView>
            
            <Item floatingLabel>
              <Label style={styles.label}>Contact Number</Label>
              <Input 
                value={contact} 
                onChangeText={(contact) => this.setState({contact})}
              />
            </Item>

            <Item floatingLabel>
              <Label style={styles.label}>Current Password</Label>
              <Input 
                secureTextEntry 
                value={password} 
                onChangeText={(password) => this.setState({password})}
              />
            </Item>
            <Item floatingLabel>
              <Label style={styles.label}>New Password</Label>
              <Input 
                secureTextEntry 
                value={newPassword} 
                onChangeText={(newPassword) => this.setState({newPassword})}
              />
            </Item>
            <Item floatingLabel last>
              <Label style={styles.label}>Confirm New Password</Label>
              <Input 
                secureTextEntry 
                value={confirmPassword} 
                onChangeText={(confirmPassword) => this.setState({confirmPassword})}
              />
            </Item>
          </Form>
                   

          <Button block 
            style={styles.submitButton}
            onPress={this.onFormSubmit}>
            <Text>Submit</Text>
          </Button>
        </Content>
      </Container>
    );

  }; // end of render

  _pickImage = async () => {
    let profilePicResult = await Expo.ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });
    let profilePicResult64=profilePicResult.base64;
    //let avatarSource=profilePicResult64;
    if (!profilePicResult64.cancelled) {
      this.setState({ avatarSource: profilePicResult64 });
    }
  };

  onIsDriverClick = (isDriver) => {
    if(isDriver){
      this.setState({
        isDriver
      })
    }else{
      this.setState({
        isDriver,
        carplate: ''
      })
    }
    
  }

  onFormSubmit = () => {
    const { email, nickname, password, newPassword, confirmPassword, isDriver, carplate } = this.state;
    let errorMessage = null;
    if(email.length === 0){
      errorMessage = "Please enter your email.";
    }
    if(nickname.length === 0){
      errorMessage = "Please enter your nickname.";
    }

    if(isDriver && !carplate){
      errorMessage = "Please enter your carplate.";
    }

    let body = {};

    if(password.length === 0 && newPassword.length === 0 && confirmPassword.length === 0){
      // not update password

      if(errorMessage){
        Toast.show({
          text: errorMessage,
          textStyle: { textAlign: 'center' },
          type: "warning",
          position: "top"
        });
        return;
      }

      // prepare the request body
      for(const k in this.state){
        if(this.state[k] !== null  && this.state[k] !== '' && this.state[k] !==undefined) body[k] = this.state[k];
      }
      delete body['password'];
      delete body['newPassword'];
      delete body['confirmPassword'];
      
      storageManager.update('user', body);
      
      /*
      post body format: {
        email: string,
        nickname: string
      }
      */

      // send request to backend
      networkClient.POSTWithJWT(
        config.serverURL + '/api/user/edit-profile', 
        body,
        (data)=>{ this.handleResponse(data) }
      );
      
    }else{
      // update password
      if(password.length === 0){
        errorMessage = "Please enter your current password.";
      }
      if(newPassword.length === 0){
        errorMessage = "Please enter your new password.";
      }
      if(confirmPassword.length === 0){
        errorMessage = "Please enter the password again.";
      }
      if(newPassword !== confirmPassword){
        errorMessage = "Two new passwords do not match, please confirm.";
      }

      if(errorMessage){
        Toast.show({
          text: errorMessage,
          textStyle: { textAlign: 'center' },
          type: "warning",
          position: "top"
        });
        return;
      }

      // prepare the request body
      for(const k in this.state){
        if(this.state[k]) body[k] = this.state[k];
      }
      delete body['confirmPassword'];
      /*
      post body format: {
        email: string,
        nickname: string,
        password: string,
        newPassword: string
      }
      */

      networkClient.POSTWithJWT(
        config.serverURL + '/api/user/edit-profile-with-password', 
        body,
        (data)=>{ this.handleResponse(data) }
      );
    
    }

  } // end of onFormSubmit

  handleResponse = (response) => {
    // check return value from backend
    
    const successMessage = "Profile Update successful!";
    const failMessage = 'something go wrong, please try again later!';
    if(response.success){
      // profile update success

      Toast.show({
        text: successMessage,
        textStyle: { textAlign: 'center' },
        type: "success",
        position: "top",
      });

      Keyboard.dismiss();

      this.props.navigation.dispatch(navigation.resetToDrawer);

    }else if(response.message){
      // profile update fail
      Toast.show({
        text: response.message,
        textStyle: { textAlign: 'center' },
        type: "danger",
        position: "top",
      });
    }else{
      // server error
      Toast.show({
        text: failMessage,
        textStyle: { textAlign: 'center' },
        type: "danger",
        position: "top",
      });
    }
  }

}

export default EditProfilePage;
