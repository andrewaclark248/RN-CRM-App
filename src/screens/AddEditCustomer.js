import { View, Text, Pressable, Keyboard } from 'react-native';
import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import { useState, useEffect } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { storeData } from '../async_storage_data/AsyncData';
import { ADD_CUSTOMER, UPDATE_CUSTOMER }  from '../redux/actions/addCustomer'
import { SHOW_CREATED_CUSTOMER_ALERT }  from '../redux/actions/showAlertAction.js'
const uuidv4 = require("uuid/v4")
import { connect } from "react-redux";
import * as Notifications from "expo-notifications";


function AddEditCustomer(props) {
    useEffect(() => {
      const listener = Notifications.addNotificationReceivedListener(handleNotification);
      return () => listener.remove();
    }, []);


    let editCustomer = false;
    let action = ADD_CUSTOMER;
    let customer = null;
    if (props?.route?.params?.customerId != undefined) {
      editCustomer = true;
      action = UPDATE_CUSTOMER;
      customer = props.customers.filter((customer) => {
        return customer.id = props.route.params.customerId;
      })[0]
    }

    //state vars
    const [firstName, setFirstName] = useState(editCustomer ? customer.firstName : "First");
    const [lastName, setLastName] = useState(editCustomer ? customer.lastName :"Last");
    const [status, setStatus] = useState(editCustomer ? customer.status : null);
    const [region, setRegion] = useState(editCustomer ? customer.region : null);
    const [isFocus, setIsFocus] = useState(false);

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
            <Pressable style={styles.button} onPress={() => {addCustomer(props, firstName, lastName, status, region, customer?.id, action); resetForm(setFirstName, setLastName, setStatus, setRegion)}}>
                <Text style={styles.text}>Add Customer</Text>
            </Pressable>

          </View>
      </View>
    );
  }

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
    asyncStorageToggle: state.asyncStorageReducer.asyncStorageToggle
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
  