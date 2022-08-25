
import { NavigationContainer } from '@react-navigation/native';
import {
  StyleSheet
} from "react-native";
import StackNavigator from './components/StackNavigator';
import ShoppingListContextProvider from './contexts/ShoppingListProvider';




export default function App() {
 
  
  return (
  <ShoppingListContextProvider> 
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
  </ShoppingListContextProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
  
  },
  
});

