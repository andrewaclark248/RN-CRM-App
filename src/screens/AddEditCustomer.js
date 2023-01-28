import { View, Text, Pressable, Keyboard, Alert } from 'react-native';
import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import { useState, useEffect } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { ADD_CUSTOMER, UPDATE_CUSTOMER }  from '../store/actions/addCustomer'
import { SHOW_CREATED_CUSTOMER_ALERT }  from '../store/actions/showAlertAction.js'
const uuidv4 = require("uuid/v4")
import { connect } from "react-redux";
import * as Notifications from "expo-notifications";
import { CURRENT_CUSTOMER } from './../store/actions/currentCustomer.js'
import { storeData, getData } from './../features/services/AsyncData.js'
import { STORE_CUSTOMER } from './../features/services/index.js'

import { handleReminder, resetForm, handleNotification, loadCurrentCustomer, storeDataInAsyncStorage } from './../features/services/utils.js'


function AddEditCustomer(props) {
    
    useEffect(() => {
      const listener = Notifications.addNotificationReceivedListener(handleNotification);
      return () => listener.remove();
    }, []);



    var action = ADD_CUSTOMER;
    var customer = null;
    //state vars
    const [firstName, setFirstName] = useState("First");
    const [lastName, setLastName] = useState("Last");
    const [status, setStatus] = useState(null);
    const [region, setRegion] = useState(null);
    const [customerId, setCustomerId] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    action = loadCurrentCustomer(firstName, lastName, status, region, customerId, props, action, setFirstName, setLastName, setStatus, setRegion, setCustomerId)

    props.navigation.addListener('blur',() => {
      resetForm(setFirstName, setLastName, setStatus, setRegion, setCustomerId)
    })

    //drop down options
    const listOfRegions = [
        { label: 'South', value: 'South' },
        { label: 'North', value: 'North' },
        { label: 'East', value: 'East' },
        { label: 'West', value: 'West' },
    ];
    const listOfStatuses = [
        { label: 'Active', value: 'Active' },
        { label: 'Inactive', value: 'Inactive' },
    ];

    return (
      <View style={styles.flexStyle}>
          <View style={styles.fleItemStyle}>
            <Text style={styles.textStyle} >Add/Edit Customer!</Text>
          </View>
          <View style={styles.fleItemStyle}>
            <TextInput
                  style={styles.input}
                  onChangeText={(e) => setFirstName(e)}
                  value={firstName}
              />
          </View>
          <View style={styles.fleItemStyle}>
            <TextInput
                  style={styles.input}
                  onChangeText={(e) => setLastName(e)}
                  value={lastName}
            />
          </View>
          <View style={styles.fleItemStyle}>
            <Dropdown
                style={[styles.dropdown, isFocus]}
                data={listOfStatuses}
                labelField="label"
                valueField="value"
                value={status}
                onChange={(item) => setStatus(item.value)}
                onChangeText={() => {}}
                placeholder={ status == null ? "Status" : status}
            />
          </View>
          <View style={styles.fleItemStyle}>
            <Dropdown
                  style={[styles.dropdown, isFocus]}
                  data={listOfRegions}
                  labelField="label"
                  valueField="value"
                  value={region}
                  onChange={(item) => setRegion(item.value)}
                  onChangeText={() => {}}
                  placeholder={ region == null ? "Region" : region}
              />
          </View>
          <View style={styles.fleItemStyle}>
            <Pressable style={styles.button} onPress={() => {addCustomer(props, firstName, lastName, status, region, customerId, action, setFirstName, setLastName, setStatus, setRegion, setCustomerId); }}>
                <Text style={styles.text}>Add Customer</Text>
            </Pressable>

          </View>
      </View>
    );
  }
  //resetForm(setFirstName, setLastName, setStatus, setRegion)

  async function addCustomer(props, firstName, lastName, status, region, id, action, setFirstName, setLastName, setStatus, setRegion, setCustomerId) {
    var action = ADD_CUSTOMER;
    var customerId = null
    if (id == undefined) {
      customerId = uuidv4();
    } else {
      customerId = id; 
      action = UPDATE_CUSTOMER;
    }

    let customer = {
        id: customerId,
        firstName: firstName,
        lastName: lastName,
        status: status,
        region: region
    }
    //save to redux and async storage
    props.dispatch({type: action, payload: {customer: customer, saveToAsyncStorage: props.asyncStorageToggle}})
    
    //show alert
    props.dispatch({type: SHOW_CREATED_CUSTOMER_ALERT })

    //store in aysnc storage
    //await storeDataInAsyncStorage(customer)
     
    var allCustomers = {}
    var result = await getData(STORE_CUSTOMER)
    result != undefined ? allCustomers = JSON.parse(result) : null

    allCustomers[customer.id] = customer
    //allCustomers = JSON.parse(reuslt)
    await storeData(STORE_CUSTOMER, JSON.stringify(allCustomers))
    
    //props.navigation.navigate('Home', {showCreateCustomerAlert: true})
    resetForm(setFirstName, setLastName, setStatus, setRegion, setCustomerId)

    showCreatedCustomerAlert()
    handleReminder()
  }

  function showCreatedCustomerAlert() {
    Alert.alert(
      "Customer Created",
      "A Customer Was Created.",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  }






  export default connect((state) => ({
    customers: state.customerReducer.customers,
    asyncStorageToggle: state.asyncStorageReducer.asyncStorageToggle,
    currentCustomer: state.currentCustomerReducer.currentCustomer
  }), null)(AddEditCustomer);

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
    input: {
      width: 150,
      height: 40,
      borderWidth: 1,
      padding: 10,
      marginBottom: 20,
    },
    dropdown: {
        width: 150,
        height: 50,
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 20,
        borderColor: 'gray' 
      },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
        height: 40
      },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
  });
  