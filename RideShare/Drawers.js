import GoDrivePage from './src/screens/goDrivePage';
import MessagePage from './src/screens/messagePage';
import SettingPage from "./src/screens/settingPage";
import SideBar from "./src/screens/sidebar";
import Search from "./src/screens/search";
import React from 'react'
import {createDrawerNavigator} from "@react-navigation/drawer";

export default function Drawers() {
    const Drawers = createDrawerNavigator();
    return (
        <Drawers.Navigator initialRouteName="Search" drawerContent={props => <SideBar {...props} /> }>
            <Drawers.Screen
                name="Search"
                component={Search}
                options={{ drawerLabel: 'Search' }} />
            <Drawers.Screen
                name="GoDrivePage"
                component={GoDrivePage}
                options={{ drawerLabel: 'GoDrivePage' }} />
            <Drawers.Screen
                name="MessagePage"
                component={MessagePage}
                options={{ drawerLabel: 'MessagePage' }} />
            <Drawers.Screen
                name="SettingPage"
                component={SettingPage}
                options={{ drawerLabel: 'SettingPage' }} />
        </Drawers.Navigator>
    );
}
