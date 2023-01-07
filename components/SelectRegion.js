import { View, Text } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import React, { useState } from 'react';


export default function SelectRegion() {
    const [selected, setSelected] = useState("");
  
    const data = [
        {key:'1', value:'Mobiles', disabled:true},
        {key:'2', value:'Appliances'},
        {key:'3', value:'Cameras'},
        {key:'4', value:'Computers', disabled:true},
        {key:'5', value:'Vegetables'},
        {key:'6', value:'Diary Products'},
        {key:'7', value:'Drinks'},
    ]
  
    return (
        
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Select Region!</Text>
        <SelectList 
            setSelected={(val) => setSelected(val)} 
            data={data} 
            save="value"
        />
      </View>
    );
  }
  /***
   *         <Dropdown
            label='Select Region'
            data={data}
        />
   */