import { getData } from './AsyncData.js'
import { Keyboard } from 'react-native';
import * as Notifications from "expo-notifications";
import { STORE_CUSTOMER } from './index.js'
import { ASYNC_LOAD_CUSTOMERS } from './../../store/actions/addCustomer.js'


export async function loadAsyncStorageData(props) {
    var result = await getData(STORE_CUSTOMER)
    var customers = JSON.parse(result)
    var allCustomers = [];
    var convertedConsutomers = Object.keys(customers).map((key) => {
      
      allCustomers.push(customers[key])
    })
    console.log(allCustomers)

    props.dispatch({type: ASYNC_LOAD_CUSTOMERS, payload: {asyncCustomers: allCustomers}})
  
  }
  


export const handleReminder = () => {
    askNotification();
    Keyboard.dismiss();
    const schedulingOptions = {
      content: {
        title: `Reminder!`,
        body: `Call customer new customer you just created`,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        color: "blue",
      },
      trigger: {
        seconds: 5,
      },
    };
    // Notifications show only when app is not active.
    // (ie. another app being used or device's screen is locked)
    Notifications.scheduleNotificationAsync(schedulingOptions);
  };

// request permession to notify the user
export const askNotification = async () => {
  // We need to ask for Notification permissions for ios devices
  const { status } = await Notifications.requestPermissionsAsync();
  if (status === "granted") {
    console.log("Notification permissions granted.");
  }
};
  
export const handleNotification = () => {
    console.warn("Your notification ran, but won`t show up in the app!");
};


export function resetForm(setFirstName, setLastName, setStatus, setRegion, setCustomerId) {
    setFirstName("First")
    setLastName("Last")
    setStatus(null)
    setRegion(null)
    setCustomerId(null)
}