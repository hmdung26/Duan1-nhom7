import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BottomTabNavigation from './navigation/BottomTabNavigation';
import Navigation from './navigation/nav';


export default function App() {
  return(
    <Navigation></Navigation>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
