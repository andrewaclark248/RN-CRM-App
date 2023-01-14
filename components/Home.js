import { View, Text, Alert, StyleSheet, Pressable } from 'react-native';
import { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { OFF_ASYNC_STORAGE, ON_ASYNC_STORAGE }  from '../redux/actions/toggleAsyncStorage'
import { SHOW_CREATED_CUSTOMER_ALERT }  from '../redux/actions/showAlertAction.js'


function Home(props) {
  var asyncToggle = props.asyncStorageToggle ? "Turn OFF" : "Turn ON"

  console.log("showCreatedCustomerAlert = " + props.showCreatedCustomerAlert)

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
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View>
          <Text style={{ paddingBottom: 20 }}>Toggle Async Storage</Text>
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
    showCreatedCustomerAlert: state.showAlertReducer.showCreatedCustomerAlert
  }), null)(Home);

  //asyncStorageReducer
  //asyncStorageToggle
  
  const styles = StyleSheet.create({

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