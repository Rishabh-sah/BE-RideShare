import React, { Component } from "react";
import {
  Container, Header, Title, Content, Text, Button,
  Icon, Left, Right, Body, Separator, ListItem, Toast
} from "native-base";
import { StackActions } from 'react-navigation';
// import navigation from '../../helpers/navigation'; 

import styles from "./styles";
import StorageManager from "../../helpers/storageManager";

const storageManager = StorageManager.getInstance();

class SettingPage extends Component {

  constructor(props){
    super(props);

    this.onLogout = this.onLogout.bind(this);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon type="MaterialIcons" name="menu" />
            </Button>
          </Left>
          <Body>
            <Title style={{color:'white'}}>Settings</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <Separator bordered>
            <Text>Account Management</Text>
          </Separator>
          <ListItem onPress={() => this.props.navigation.navigate('EditProfilePage')}>
            <Text>Edit Profile</Text>
          </ListItem>
          <Separator bordered>
            <Text>App Setting</Text>
          </Separator>
          <ListItem onPress={this.onLogout}>
            <Text>Logout</Text>
          </ListItem>
          
        </Content>

      </Container>
    );
  }

  onLogout(){
    storageManager.remove('user');
    storageManager.remove('jwt');
    
    Toast.show({
      text: "Logout Successful.",
      textStyle: { textAlign: 'center' },
      type: "success",
      position: "top"
    });

    this.props.navigation.dispatch({
      ...StackActions.replace('WelcomePage'),
    target:this.props.navigation.dangerouslyGetState().key, 
    }); // reset navigation to welcomepage
    
  }
}
export default SettingPage;
