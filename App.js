import React, {createContext, useReducer} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import Home from './screens/Home';
import CreateEmployee from './screens/CreateEmployee';
import Profile from './screens/Profile';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//implementing redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer, initState } from './reducers/reducer';

//central store
//const store = createStore(reducer)
//end redux implementation

//using context API
export const MyContext = createContext()


const Stack = createStackNavigator();

const myoptions = {
  title: "My Home",
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: "#006aff"
  },

}

function App() {
  return (
    <View style={styles.container}>

      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={myoptions}
        />
        <Stack.Screen
          name="Create"
          component={CreateEmployee}
          options={{ ...myoptions, title: "Create Employee" }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ ...myoptions, title: "Profile" }}
        />
      </Stack.Navigator>
    </View>
  );
}

export default () => {
  
  //returns state and method to update state
  const [state,dispatch] = useReducer(reducer, initState)

  return (
    //using redux wrapping everything 
    //everthing in reducer js file in data , we can access from home, profile..
    // <Provider store={store}>
    //   <NavigationContainer>
    //     <App />
    //   </NavigationContainer>
    // </Provider>

    //using context api
    //lets use {state,dispatch} object on all the components
    <MyContext.Provider value={
      {state,dispatch}
    }>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </MyContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    marginTop: Constants.statusBarHeight,

  },
});
