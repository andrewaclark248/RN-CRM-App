import { View, Text, Button } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import React, { useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { UPDATE_REGION } from '../store/actions/updateRegion'
import { connect } from "react-redux";

function SelectRegion(props) {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const data = [
    { label: 'South', value: 'South' },
    { label: 'North', value: 'North' },
    { label: 'East', value: 'East' },
    { label: 'West', value: 'West' },
  ];

    return (
      <View style={styles.flexStyle}>
        <View style={styles.fleItemStyle}>
          <Text style={styles.textStyle} >Select Region!</Text>
        </View>

        <View style={styles.fleItemStyle}>
          <Dropdown
            style={[styles.dropdown, isFocus]}
            data={data}
            labelField="label"
            valueField="value"
            onChange={(item) => setValue(item.value)}
            onChangeText={() => console.log("some log")}
            placeholder={ value == null ? "Regions" : value}
          />
        </View>
        <View style={styles.fleItemStyle}>
          <Pressable style={styles.button} onPress={() => navigateToCustomerByRegion(props, value)}>
            <Text style={styles.text}>See Customer In Region</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  async function navigateToCustomerByRegion(props, region) {
    if (region == undefined || region == "") {
      return
    } else {
      //save to redux and async storage
      props.dispatch({type: UPDATE_REGION, payload: {region: region}})
      //change page
      props.navigation.navigate('CustomerByRegion', {region: region})
    }
  }

  export default connect(null, null)(SelectRegion);
  

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
    container: {
      backgroundColor: 'white',
      padding: 16,
    },
    dropdown: {
      width: 150,
      height: 40,
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