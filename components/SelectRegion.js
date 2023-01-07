import { View, Text } from 'react-native';
//import { Dropdown } from 'react-native-material-dropdown';


export default function SelectRegion() {
    let data = [{
        value: 'Banana',
      }, {
        value: 'Mango',
      }, {
        value: 'Pear',
      }];
   
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Select Region!</Text>

      </View>
    );
  }
  /***
   *         <Dropdown
            label='Select Region'
            data={data}
        />
   */