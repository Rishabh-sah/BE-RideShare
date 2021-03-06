import React, { Component } from "react";
import { Keyboard } from 'react-native'
import {
  Container, Header, Title, Content, Button, Item, 
  Label, Input, Body, Left, Right, Icon, Form, Text, Toast
} from "native-base";

import styles from "./styles";
import config from "../../../config";
import networkClient from "../../helpers/networkClient";
import navigation from '../../helpers/navigation';

class SignupPage extends Component {

  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      nickname: '',
      contact: '',
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  render() {
    const { email, password, confirmPassword, nickname, contact } = this.state;

    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon type="MaterialIcons" name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{color:'white'}}>Signup</Title>
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
            <Item floatingLabel>
              <Label style={styles.label}>Nickname</Label>
              <Input 
                value={nickname} 
                onChangeText={(nickname) => this.setState({nickname})}/>
            </Item>
            <Item floatingLabel>
              <Label style={styles.label}>Contact Number</Label>
              <Input 
                value={contact} 
                onChangeText={(contact) => this.setState({contact})}/>
            </Item>
            <Item floatingLabel>
              <Label style={styles.label}>Password</Label>
              <Input 
                secureTextEntry 
                value={password} 
                onChangeText={(password) => this.setState({password})}
              />
            </Item>
            <Item floatingLabel last>
              <Label style={styles.label}>Confirm Password</Label>
              <Input 
                secureTextEntry 
                value={confirmPassword} 
                onChangeText={(confirmPassword) => this.setState({confirmPassword})}
              />
            </Item>
          </Form>

          <Button 
            block 
            style={styles.signupButton}
            onPress={this.onFormSubmit}>
            <Text>Sign Up</Text>
          </Button>
        </Content>
      </Container>
    );

  };

  onFormSubmit = () => {
    const { email, nickname, contact, password, confirmPassword  } = this.state;
    
    // check if form input valid
    let errorMessage = null;
    if(email.length === 0){
      errorMessage = "Please enter your email.";
    }
    if(nickname.length === 0){
      errorMessage = "Please enter your nickname.";
    }
    if(contact.length === 0){
      errorMessage = "Please enter your contact number.";
    }
    if(password.length === 0){
      errorMessage = "Please enter your password.";
    }
    if(confirmPassword.length === 0){
      errorMessage = "Please enter your password again.";
    }
    if(password !== confirmPassword){
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
    
  
    // send request to backend
    const url = config.serverURL + '/auth/signup';
    const body ={
        email: email.toLowerCase(),
        nickname,
        password,
        contact
    };
    
    networkClient.POST(url, body, (response)=>{
      

      
      // check return value from backend
      const successMessage = "Signup successful, please check your email for activate link";
      const failMessage = 'something go wrong, please try again later!';
      if(response.success){
        // signup successful

        Toast.show({
          text: successMessage,
          textStyle: { textAlign: 'center' },
          type: "success",
          position: "top",
          duration: 5000
        });

        Keyboard.dismiss();
        
        this.props.navigation.dispatch({
          ...StackActions.replace('WelcomePage'),
        target:this.props.navigation.dangerouslyGetState().key, 
        }); // reset navigation to welcomepage

      }else if(response.message){
        // signup fails
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

}

export default SignupPage;
