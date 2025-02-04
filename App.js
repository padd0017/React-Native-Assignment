import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MainDetailsScreen from './screens/mainDetailsScreen'



import Home from './screens/Home'
import DataList from './screens/DataList'
import Details from './screens/DetailsScreen'

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='Home'
        
        options={{
          tabBarLabelPosition: 'below-icon',
          tabBarLabelStyle: {
            fontSize: 16,
          },
        }}
        screenOptions={{
          
        }}
      >
      <Tab.Screen 
      name="Home"
      component={Home}
      options={{
        headerShown:false,
        tabBarIcon: ({ focused, color, size }) => {
          return <MaterialIcons name="home" size={size} color={color} focused={focused} />;
        },
      }}
      />
      <Tab.Screen 
      name="List"
      component={MainDetailsScreen}
      
      options={{
        headerShown:false,
        tabBarIcon: ({ focused, color, size }) => {
          return <MaterialIcons name="list" size={size} color={color} focused={focused} />;
        },
      }}
      />
      </Tab.Navigator>
    </NavigationContainer>
  );
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
