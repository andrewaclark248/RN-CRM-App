import { View, Text } from 'react-native';
import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';

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
        <Text>Add Edit Customer!</Text>
        <SafeAreaView>
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
        </SafeAreaView>
      </View>
    );
  }


  const styles = StyleSheet.create({
    input: {
      width: 150,
      height: 40,
      borderWidth: 1,
      padding: 10,
      marginBottom: 20
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
  });
  