import { View, Text, Alert, StyleSheet, Pressable } from 'react-native';
import { connect } from "react-redux";
import { OFF_ASYNC_STORAGE, ON_ASYNC_STORAGE }  from '../store/actions/toggleAsyncStorage'
import { SHOW_CREATED_CUSTOMER_ALERT }  from '../store/actions/showAlertAction.js'

import { getData } from './../features/services/AsyncData.js'
import { STORE_CUSTOMER } from './../features/services/index.js'

import { ASYNC_LOAD_CUSTOMERS } from './../store/actions/addCustomer.js'

import { useEffect } from 'react';

function Home(props) {
  var asyncToggle = props.asyncStorageToggle ? "Turn OFF" : "Turn ON"

  if (props?.showCreatedCustomerAlert) {
    Alert.alert(
      "Customer Created",
      "A Customer Was Created.",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

    setTimeout(() => {
      //show alert
      props.dispatch({type: SHOW_CREATED_CUSTOMER_ALERT })
    }, "1000")


  }

  useEffect(() => {
    if (props.asyncStorageToggle) {
      console.log("load async storage")
      loadAsyncStorageData(props)
    }
  },[props.asyncStorageToggle])




  return (
      <View style={styles.flexStyle}>
        <View style={styles.fleItemStyle}>
          <Text style={styles.textStyle}>Toggle Async Storage</Text>
          <Text style={styles.textStyle}>Status: {props.asyncStorageToggle ? "On" : "Off"}</Text>
        </View>
        <View style={styles.fleItemStyle}>
          <Pressable style={styles.button} onPress={() => {updateAsyncReduxState(props, props.asyncStorageToggle)}}>
              <Text style={styles.text}>{asyncToggle}</Text>
          </Pressable>
        </View>

      </View>
    );
  }
 

  function updateAsyncReduxState(props, asyncStorageToggle) {
    let action = asyncStorageToggle ? OFF_ASYNC_STORAGE : ON_ASYNC_STORAGE
    props.dispatch({type: action})
  }
  
  export default connect((state) => ({
    asyncStorageToggle: state.asyncStorageReducer.asyncStorageToggle,
    showCreatedCustomerAlert: state.showAlertReducer.showCreatedCustomerAlert,
    customers: state.customerReducer.customers
  }), null)(Home);


  async function getSomeStuff() {
    var result = await getData(STORE_CUSTOMER)
    console.log(result)
  }
  
  async function loadAsyncStorageData(props) {
    var result = await getData(STORE_CUSTOMER)
    var customers = JSON.parse(result)
    var allCustomers = [];
    var convertedConsutomers = Object.keys(customers).map((key) => {
      
      allCustomers.push(customers[key])
    })
    console.log(allCustomers)

    props.dispatch({type: ASYNC_LOAD_CUSTOMERS, payload: {asyncCustomers: allCustomers}})
  
  }
  
  
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