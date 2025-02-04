import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsScreen from './DetailsScreen'
import DataList from './DataList'
import { HeaderBackButton } from '@react-navigation/elements';
const Stack = createNativeStackNavigator();

export default function AboutScreen({ route }) {
  // props children, props.route

  return (
    <Stack.Navigator initialRouteName="DataList" screenOptions={{ headerShown: true }}>
      <Stack.Screen name="DataList" component={DataList}/>
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
    </Stack.Navigator>
  );
}