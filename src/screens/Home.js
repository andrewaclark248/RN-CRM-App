import { View, Text, Alert, StyleSheet, Pressable } from 'react-native';
import { connect } from "react-redux";
import { OFF_ASYNC_STORAGE, ON_ASYNC_STORAGE }  from '../store/actions/toggleAsyncStorage'
import { SHOW_CREATED_CUSTOMER_ALERT }  from '../store/actions/showAlertAction.js'

import { getData, clearAll } from './../features/services/AsyncData.js'
import { STORE_CUSTOMER } from './../features/services/index.js'

import { ASYNC_LOAD_CUSTOMERS, CLEAR_CUSTOMERS } from './../store/actions/addCustomer.js'

import { useEffect } from 'react';

import { loadAsyncStorageData } from './../features/services/utils.js'


import Button from './../features/components/Button.js'

function Home(props) {
  useEffect(() => {
    loadAsyncStorageData(props)
  },[])




  return (
      <View style={styles.flexStyle}>
        <View style={styles.fleItemStyle}>
          <Text style={styles.textStyle}>Clear Async Storage</Text>
        </View>
        <View style={styles.fleItemStyle}>
          <Button homePage={true} onPress={() => {clearAsyncStorage(props)}}>
            <Text style={styles.text}>Clear Async Storage</Text>

          </Button>
        </View>

      </View>
    );
  }
 

  async function clearAsyncStorage(props) {
    await clearAll()
    props.dispatch({type: CLEAR_CUSTOMERS})
  }
  
  export default connect((state) => ({
    asyncStorageToggle: state.asyncStorageReducer.asyncStorageToggle,
    showCreatedCustomerAlert: state.showAlertReducer.showCreatedCustomerAlert,
    customers: state.customerReducer.customers
  }), null)(Home);


  

  
  const styles = StyleSheet.create({
    textStyle: {
      paddingBottom: 20, 
      fontWeight: "bold", 
      fontSize: "15"
    },
    flexStyle: {
      justifyContent: 'center', 
      alignItems: 'center', 
      flexDirection: "column", paddingTop: 100
    },
    fleItemStyle: {
      flex: 1,
      paddingBottom: 60,
    },
    button: {
      marginTop: 5,
      padding: 8,
      borderRadius: 4,
      borderWidth: 1,
      backgroundColor: 'black',
      height: 35,
      alignItems: 'center'
    },
    text: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center'
    }
  });