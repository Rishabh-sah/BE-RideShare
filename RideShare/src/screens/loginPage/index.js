import React, { Component } from "react";
import { Keyboard } from 'react-native'
import {
  Container, Header, Title, Content, Button, Item, Label,
  Input, Body, Left, Right, Icon, Form, Text, Toast
} from "native-base";
import { Notifications } from "expo";
import { StackActions,NavigationActions } from '@react-navigation/native';

import styles from "./styles";
import config from "../../../config";
import networkClient from "../../helpers/networkClient";
import StorageManager from "../../helpers/storageManager";

const storageManager = StorageManager.getInstance();

class LoginPage extends Component {

  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  render() {
    const { email, password } = this.state;

    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon type="MaterialIcons" name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{color:'white'}}>Login</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <Form>
            <Item floatingLabel>
              <Label style={styles.label}>Email</Label>
              <Input 
                value={email} 
                onChangeText={(email) => this.setState({email})}/>
            </Item>
            <Item floatingLabel last>
              <Label style={styles.label}>Password</Label>
              <Input
                secureTextEntry 
                value={password} 
                onChangeText={(password) => this.setState({password})}
              />
            </Item>
          </Form>

          <Button block style={styles.loginButton} onPress={this.onFormSubmit}>
            <Text>Log In</Text>
          </Button>

          <Button block style={styles.loginButton} onPress={() => this.props.navigation.navigate('ResetPasswordPage')}>
            <Text>Forgot Password</Text>
          </Button>

        </Content>
      </Container>
    );

  };

  onFormSubmit = () => {

    const { email, password } = this.state;

    // check if form input valid
    let errorMessage = null;
    if(email.length==0){
      errorMessage = "Please enter your email.";
    }
    if(password.length==0){
      errorMessage = "Please enter your password.";
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
    
    // send request to backend
    const url = config.serverURL + '/auth/login';
    const body ={
        email: email.toLowerCase(),
        password,
    };
    networkClient.POST(url, body, (response)=>{
      // check return value from backend
      
      const successMessage = "Login successful!";
      const failMessage = 'something go wrong, please try again later!';
      if(response.jwt && response.user){
        // login successful
        storageManager.set('user', response.user);
        storageManager.set('jwt', response.jwt);

        Toast.show({
          text: successMessage,
          textStyle: { textAlign: 'center' },
          type: 'success',
          position: "top",
        });
        
        this.registerForPushNotification();
        

        Keyboard.dismiss();
        
        this.props.navigation.dispatch({
            
          ...StackActions.replace('Drawers'),
        target:this.props.navigation.dangerouslyGetState().key, 
        });

      }else if(response.message){
        // login fails
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
    });

  } // end of onFormSubmit

  registerForPushNotification = async () => {
    // Get the token that uniquely identifies this device
    const user = storageManager.get('user');
    let token = await Notifications.getExpoPushTokenAsync();
    let body = {
      pushToken: token,
      user: {
        email: user.email
      }
    };
    networkClient.POSTWithJWT(config.serverURL + '/api/user/push-token', body, ()=>{});
  }

}

export default LoginPage;
