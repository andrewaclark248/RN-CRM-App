import { View, Text } from 'react-native';
import { getData } from '../async_storage_data/AsyncData';
import { GET_CUSTOMER } from '../async_storage_data/index';
import { useEffect } from 'react';

export default function CustomerByRegion(props) {
  let region = props?.route?.params?.region
  //getData(GET_CUSTOMER).then((data) => {
  //  console.log(data)
  //}).catch(() => console.log("error"))
  let customersInRegion = null;
  useEffect(() => {
      getData(GET_CUSTOMER).then((data) => {
        console.log(JSON.parse(data).length)
        let allCustomers = JSON.parse(data)

        //let customersInRegion = Object.keys(allCustomers).filter((key) => {
        //  console.log(allCustomers[key])
        //})
        console.log("I was able to hit this code")

      })
    }, []);

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Customer By Region!</Text>
      </View>
    );
  }
  

