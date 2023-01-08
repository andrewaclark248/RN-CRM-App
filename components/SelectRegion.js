import { View, Text, Button } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import React, { useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORE_REGION } from '../async_storage_names/index.js'


export default function SelectRegion(props) {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const data = [
    { label: 'South', value: 'South' },
    { label: 'North', value: 'North' },
    { label: 'East', value: 'East' },
    { label: 'West', value: 'West' },
  ];

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Select Region!</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          data={data}
          labelField="label"
          valueField="value"
          onChange={(item) => setValue(item.value)}
          onChangeText={() => console.log("some log")}
          placeholder={ value == null ? "Regions" : value}
        />
        <Pressable style={styles.button} onPress={() => navigateToCustomerByRegion(props, value)}>
          <Text style={styles.text}>See Customer In Region</Text>
        </Pressable>
      </View>
    );
  }

  async function navigateToCustomerByRegion(props, region) {
    if (region == undefined || region == "") {
      return
    } else {
      await storeData(region);  //async storage
      props.navigation.navigate('CustomerByRegion', {region: region})
    }
  }

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem(STORE_REGION, value)
    } catch (e) {
      console.log("async storage error")
    }
  }
  

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 16,
    },
    dropdown: {
      width: 150,
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      marginBottom: 40
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
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