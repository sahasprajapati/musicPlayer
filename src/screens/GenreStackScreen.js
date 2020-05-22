import React from 'react';
import {
  Button,
  Text,
  StyleSheet
} from 'react-native';
import Animated from 'react-native-reanimated';
import {createStackNavigator} from '@react-navigation/stack';
import GenreComponent from '../components/GenreComponent';
import GenreDetailComponent from '../components/GenreDetailComponent';
import R from 'res/R';
const Stack = createStackNavigator();

const GenreStackScreen = ({navigation, style}) => (
  <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
    <Stack.Navigator
      initialRouteName="Playlist"
      screenOptions={{
        headerStyle: {
          backgroundColor: R.colors.primary,
        },
        headerTintColor: R.colors.white,
        headerTintStyle: {
          fontWeight: 'bold',
        },
        headerLeft: () => (
          <Button title="Menu" color={R.colors.accent}  onPress={() => navigation.openDrawer()} />
        ),
      }}>
      <Stack.Screen name="Genre" component={GenreComponent} />
      <Stack.Screen name="Genre Details" component={GenreDetailComponent} />
    </Stack.Navigator>
  </Animated.View>
);

const styles = StyleSheet.create({
  stack: {
    flex: 1,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
    // overflow: 'scroll',
    // borderWidth: 1,
  },
});
export default GenreStackScreen;
