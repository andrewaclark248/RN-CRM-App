import { View, Text, Pressable, Keyboard } from 'react-native';
import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import { useState, useEffect } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { ADD_CUSTOMER, UPDATE_CUSTOMER }  from '../store/actions/addCustomer'
import { SHOW_CREATED_CUSTOMER_ALERT }  from '../store/actions/showAlertAction.js'
const uuidv4 = require("uuid/v4")
import { connect } from "react-redux";
import * as Notifications from "expo-notifications";
import { CURRENT_CUSTOMER } from './../store/actions/currentCustomer.js'


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
    const [isFocus, setIsFocus] = useState(false);

    if (props.currentCustomer) {
      firstName != props.currentCustomer.firstName ? setFirstName(props.currentCustomer.firstName) : null
      lastName != props.currentCustomer.lastName ? setLastName(props.currentCustomer.lastName) : null
      status != props.currentCustomer.status ? setStatus(props.currentCustomer.status) : null
      region != props.currentCustomer.region ? setRegion(props.currentCustomer.region) : null
      setTimeout(() => {
        props.dispatch({type: CURRENT_CUSTOMER, payload: {customer: customer}})

      }, 1000)


    }

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
            <Pressable style={styles.button} onPress={() => {addCustomer(props, firstName, lastName, status, region, customer?.id, action); }}>
                <Text style={styles.text}>Add Customer</Text>
            </Pressable>

          </View>
      </View>
    );
  }
  //resetForm(setFirstName, setLastName, setStatus, setRegion)

  async function addCustomer(props, firstName, lastName, status, region, id, action) {
    let customerId = (action == UPDATE_CUSTOMER ? id : uuidv4())
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
    
    //await storeData(STORE_CUSTOMER, customer)
    props.navigation.navigate('Home', {showCreateCustomerAlert: true})

    handleReminder()
  }

  function resetForm(setFirstName, setLastName, setStatus, setRegion) {
    setFirstName("First")
    setLastName("Last")
    setStatus(null)
    setRegion(null)

  }

  const handleReminder = () => {
    askNotification();
    Keyboard.dismiss();
    const schedulingOptions = {
      content: {
        title: `Reminder!`,
        body: `Call customer new customer you just created`,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        color: "blue",
      },
      trigger: {
        seconds: 5,
      },
    };
    // Notifications show only when app is not active.
    // (ie. another app being used or device's screen is locked)
    Notifications.scheduleNotificationAsync(schedulingOptions);
  };

// request permession to notify the user
const askNotification = async () => {
  // We need to ask for Notification permissions for ios devices
  const { status } = await Notifications.requestPermissionsAsync();
  if (status === "granted") {
    console.log("Notification permissions granted.");
  }
};
  
  const handleNotification = () => {
    console.warn("Your notification ran, but won`t show up in the app!");
  };




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
  