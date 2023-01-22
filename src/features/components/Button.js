import { View, Text, Alert, StyleSheet, Pressable } from 'react-native';

export default function Button(props) {
    console.log(props.homePage)

    return (
        <Pressable style={styles.button} onPress={() => {
                if (props.homePage) {
                    props.onPress()
                }
                if (props.selectRegion) {
                    props.onPress()
                }
            }}>
            {props.children}
        </Pressable>
    )
}



const styles = StyleSheet.create({

    button: {
      marginTop: 5,
      padding: 8,
      borderRadius: 4,
      borderWidth: 1,
      backgroundColor: 'black',
      height: 35,
      alignItems: 'center'
    }
  });