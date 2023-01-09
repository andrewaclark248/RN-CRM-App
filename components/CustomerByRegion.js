import { View, Text, StyleSheet } from 'react-native';
import { connect } from "react-redux";
import { DataTable } from 'react-native-paper';


function CustomerByRegion(props) {
    let customersInRegion = props.customers.filter((customer) => {
      return customer.region == props.region
    })
    console.log(props.region)
    console.log("customers in region === ", customersInRegion)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Customer By Region!</Text>
        <DataTable style={styles.container}>
          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title>First Name</DataTable.Title>
            <DataTable.Title>Last Name</DataTable.Title>
            <DataTable.Title>Region</DataTable.Title>
            <DataTable.Title>Status</DataTable.Title>
          </DataTable.Header>
            {customersInRegion.map((customer, index) => {
              {return(
                <DataTable.Row key={index}>
                  <DataTable.Cell>{ customer.firstName }</DataTable.Cell>
                  <DataTable.Cell>{ customer.lastName }</DataTable.Cell>
                  <DataTable.Cell>{ customer.region }</DataTable.Cell>
                  <DataTable.Cell>{ customer.status }</DataTable.Cell>
                </DataTable.Row>
              )}

            })
            }
          

        </DataTable> 
      </View>
    );
  }
  

  export default connect((state) => ({
    region: state.regionReducer.region,
    customers: state.customerReducer.customers
  }), null)(CustomerByRegion);

  const styles = StyleSheet.create({
    container: {
      padding: 15,
    },
    tableHeader: {
      backgroundColor: '#DCDCDC',
    },
  });