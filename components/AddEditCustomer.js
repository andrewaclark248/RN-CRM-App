import { View, Text, Pressable } from 'react-native';
import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { storeData } from '../async_storage_data/AsyncData';
import { ADD_CUSTOMER, UPDATE_CUSTOMER }  from '../redux/actions/addCustomer'
const uuidv4 = require("uuid/v4")
import { connect } from "react-redux";


function AddEditCustomer(props) {
    let editCustomer = false;
    let action = ADD_CUSTOMER;
    let customer = null;
    if (props?.route?.params?.customerId != undefined) {
      editCustomer = true;
      action = UPDATE_CUSTOMER;
      customer = props.customers.filter((customer) => {
        return customer.id = props.route.params.customerId;
      })[0]
      console.log()
    }

    //state vars
    const [firstName, setFirstName] = useState(editCustomer ? customer.firstName :"First Name");
    const [lastName, setLastName] = useState(editCustomer ? customer.lastName :"First Name");
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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{paddingBottom: 20}} >Add/Edit Customer!</Text>
            <TextInput
                style={styles.input}
                onChangeText={(e) => setFirstName(e)}
                value={firstName}
            />
            <TextInput
                style={styles.input}
                onChangeText={(e) => setLastName(e)}
                value={lastName}
            />
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                data={listOfStatuses}
                labelField="label"
                valueField="value"
                value={status}
                onChange={(item) => setStatus(item.value)}
                onChangeText={() => console.log(" log")}
                placeholder={ status == null ? "Status" : status}
            />
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                data={listOfRegions}
                labelField="label"
                valueField="value"
                value={status}
                onChange={(item) => setRegion(item.value)}
                onChangeText={() => console.log("some log")}
                placeholder={ region == null ? "Region" : region}
            />
            <Pressable style={styles.button} onPress={() => addCustomer(props, firstName, lastName, status, region, customer?.id, action)}>
                <Text style={styles.text}>Add Customer</Text>
            </Pressable>
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
    props.dispatch({type: action, payload: {customer: customer}})
    //await storeData(STORE_CUSTOMER, customer)
    props.navigation.navigate('Home', {showCreateCustomerAlert: true})

  }

  export default connect((state) => ({
    customers: state.customerReducer.customers
  }), null)(AddEditCustomer);

  const styles = StyleSheet.create({
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
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 20
      },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
      },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
  });
  