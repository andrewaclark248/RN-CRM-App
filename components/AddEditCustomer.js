import { View, Text } from 'react-native';
import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import { useState } from 'react'

export default function AddEditCustomer(props) {
    //state vars
    const [firstName, setFirstName] = useState("First Name");
    const [lastName, setLastName] = useState("Last Name");
    //const [status, setStatus] = useState("Status");
    //const [region, setRegion] = useState("Region");

    //drop down options
    const data = [
        { label: 'South', value: 'South' },
        { label: 'North', value: 'North' },
        { label: 'East', value: 'East' },
        { label: 'West', value: 'West' },
    ];
    console.log("last name === " + firstName)

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
        </SafeAreaView>
      </View>
    );
  }


  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });
  