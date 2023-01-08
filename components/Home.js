import { View, Text, Alert } from 'react-native';
import { useState } from 'react'

export default function Home(props) {
  if (props?.route?.params?.showCreateCustomerAlert != null && props?.route?.params?.showCreateCustomerAlert != undefined) {
    Alert.alert(
      "Customer Created",
      "A Customer Was Created.",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  }

  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
  }
  