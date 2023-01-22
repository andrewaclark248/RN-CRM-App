import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import Home from './src/screens/Home.js';
import SelectRegion from './src/screens/SelectRegion';
import CustomerByRegion from './src/screens/CustomerByRegion';
import AddEditCustomer from './src/screens/AddEditCustomer';
const Tab = createBottomTabNavigator();

import { Provider } from 'react-redux';
import store from './src/store/store.js';

import { getData } from './src/features/services/AsyncData.js'
import { STORE_CUSTOMER } from './src/features/services/index.js'

export default function App() {
  getSomeStuff();
  return (
      <Provider store={store}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="SelectRegion" component={SelectRegion} />
            <Tab.Screen name="CustomerByRegion" component={CustomerByRegion} />
            <Tab.Screen name="Add Customer" component={AddEditCustomer} />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>

  );
}

async function getSomeStuff() {
  var result = await getData(STORE_CUSTOMER)
  console.log(result)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


