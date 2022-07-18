import React from 'react';
import Home from './screens/Home';
import MovieDetails from './screens/MovieDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}
        />
        <Stack.Screen name="Detail Screen" component={MovieDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
