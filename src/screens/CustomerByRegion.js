import { View, Text, StyleSheet, Pressable } from 'react-native';
import { connect } from "react-redux";
import { DataTable } from 'react-native-paper';
import { CURRENT_CUSTOMER } from './../store/actions/currentCustomer.js'
import Button from './../features/components/Button.js'


function CustomerByRegion(props) {
    let customersInRegion = props.customers.filter((customer) => {
      return customer.region == props.region
    })
    console.log(props.customers)
    return (
      <View style={styles.flexStyle}>
        <View style={styles.fleItemStyle}>
          <Text style={styles.textStyle}>Customer By Region!</Text>
        </View>
        <View style={styles.fleItemStyle}>
          <DataTable style={styles.container}>
            <DataTable.Header style={styles.tableHeader}>
              <DataTable.Title>First Name</DataTable.Title>
              <DataTable.Title>Last Name</DataTable.Title>
              <DataTable.Title>Region</DataTable.Title>
              <DataTable.Title>Status</DataTable.Title>
              <DataTable.Title></DataTable.Title>

            </DataTable.Header>
              {customersInRegion.map((customer, index) => {
                {return(
                  <DataTable.Row key={index} style={styles.rowHeight}>
                    <DataTable.Cell>{ customer.firstName }</DataTable.Cell>
                    <DataTable.Cell>{ customer.lastName }</DataTable.Cell>
                    <DataTable.Cell>{ customer.region }</DataTable.Cell>
                    <DataTable.Cell>{ customer.status }</DataTable.Cell>
                    <DataTable.Cell>
                      <View>
                      <Pressable style={styles.button} onPress={() => editCustomer(props, customer)}>
                          <Text style={styles.text}>Edit</Text>
                      </Pressable>
                      </View>
                    </DataTable.Cell>
                  </DataTable.Row>
                )}

              })
              }
            

          </DataTable> 
        </View>

      </View>
    );
  }
  
  function editCustomer(props, customer) {
    props.dispatch({type: CURRENT_CUSTOMER, payload: {customer: customer}})
    props.navigation.navigate("Add Customer")
  }
  

  export default connect((state) => ({
    region: state.regionReducer.region,
    customers: state.customerReducer.customers
  }), null)(CustomerByRegion);

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
      padding: 15,
      width: 350
    },
    tableHeader: {
      backgroundColor: '#DCDCDC',
    },

    button: {
      marginTop: 5,
      padding: 8,
      borderRadius: 4,
      borderWidth: 1,
      backgroundColor: 'black',
      height: 35,
      alignItems: 'center'
  },
  text: {
      fontSize: 14,
      color: 'white',
      textAlign: 'center'
  },
  rowHeight: {
    height: 50
  }
  });