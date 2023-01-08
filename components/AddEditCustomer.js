import { View, Text, Pressable } from 'react-native';
import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { storeData } from '../async_storage_data/AsyncData';
import { STORE_CUSTOMER } from '../async_storage_data/index';
const uuidv4 = require("uuid/v4")


export default function AddEditCustomer(props) {
    //state vars
    const [firstName, setFirstName] = useState("First Name");
    const [lastName, setLastName] = useState("Last Name");
    const [status, setStatus] = useState(null);
    const [region, setRegion] = useState(null);
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
                onChange={(item) => setStatus(item.value)}
                onChangeText={() => console.log(" log")}
                placeholder={ status == null ? "Status" : status}
            />
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                data={listOfRegions}
                labelField="label"
                valueField="value"
                onChange={(item) => setRegion(item.value)}
                onChangeText={() => console.log("some log")}
                placeholder={ region == null ? "Region" : region}
            />
            <Pressable style={styles.button} onPress={() => addCustomer(props, firstName, lastName, status, region)}>
                <Text style={styles.text}>Add Customer</Text>
            </Pressable>
      </View>
    );
  }

  async function addCustomer(props, firstName, lastName, status, region) {
      let customer = {
          id: uuidv4(),
          firstName: firstName,
          lastName: lastName,
          status: status,
          region: region
      }
    
    await storeData(STORE_CUSTOMER, customer)
  }


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
  