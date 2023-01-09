import { View, Text } from 'react-native';
import { connect } from "react-redux";


function CustomerByRegion(props) {
    var customersInRegion = props.customers.filter((customer) => {
      return customer.region == props.region
    })
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Customer By Region!</Text>
      </View>
    );
  }
  

  export default connect((state) => ({
    region: state.regionReducer.region,
    customers: state.customerReducer.customers
  }), null)(CustomerByRegion);