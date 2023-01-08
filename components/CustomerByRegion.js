import { View, Text } from 'react-native';
import { connect } from "react-redux";


function CustomerByRegion(props) {
  console.log("customer region props ===", props.region)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Customer By Region!</Text>
      </View>
    );
  }
  

  export default connect((state) => ({
    region: state.regionReducer.region
  }), null)(CustomerByRegion);