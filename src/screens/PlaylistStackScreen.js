import React from 'react';
import {
  StyleSheet,
  Button,
  Text,
} from 'react-native';
import Animated from 'react-native-reanimated';
import {createStackNavigator} from '@react-navigation/stack';
import PlaylistComponent from '../components/PlaylistComponent';
import TracksComponent from '../components/TracksComponent';
import MusicPlayer from '../components/MusicPlayer';
import R from 'res/R';

const Stack = createStackNavigator();

const PlaylistStackScreen = ({navigation, style}) => {
  return (
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
            <Button title="Menu" color={R.colors.accent} onPress={() => navigation.openDrawer()} />
          ),
        }}>
        <Stack.Screen
          name="Playlist"
          component={PlaylistComponent}
        />
        <Stack.Screen
          options={{
          }}
          name="Tracks"
          component={TracksComponent} />
        <Stack.Screen name="MusicPlayer" component={MusicPlayer} />
      </Stack.Navigator>
    </Animated.View>
  );
};
/*
class NavigationDrawerStructure extends Component {
  //Structure for the navigatin Drawer
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          {/*Donute Button Image }
          <Image
            source={require('./image/drawer.png')}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
*/
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
export default PlaylistStackScreen;
