import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import Home from './components/Home.js';
import SelectRegion from './components/SelectRegion';
import CustomerByRegion from './components/CustomerByRegion';
import AddEditCustomer from './components/AddEditCustomer';
const Tab = createBottomTabNavigator();


export default function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="SelectRegion" component={SelectRegion} />
          <Tab.Screen name="CustomerByRegion" component={CustomerByRegion} />
          <Tab.Screen name="Add Customer" component={AddEditCustomer} />
        </Tab.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
