import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
}  from 'react-native';
import {
  DrawerItem,
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import FastImage from 'react-native-fast-image';
import Animated from 'react-native-reanimated';

import Home from '../components/Home';
import PlaylistStackScreen from './PlaylistStackScreen';
import GenreStackScreen from './GenreStackScreen';

import R from 'res/R';
const Drawer = createDrawerNavigator();
const DrawerScreen = () => {
  const [progress, setProgress] = React.useState(new Animated.Value(0));
  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 16],
  });
  const animatedStyle = { borderRadius: borderRadius, transform: [{scale}]};
  return (
    <Drawer.Navigator
      initialRouteName="PlayList"
      drawerType="front"
      overlayColor="transparent"
      drawerStyle={styles.drawerStyles}
      sceneContainerStyle={{flex: 1, backgroundColor: R.colors.primary}}
      drawerContent={(props) => {
        setProgress(props.progress);
        return <DrawerContent {...props} />;
      }}>
      <Drawer.Screen name="PlayList" style={{backgroundColor: 'red'}}>
        {(props) => <PlaylistStackScreen {...props} style={animatedStyle} />}
      </Drawer.Screen>
      <Drawer.Screen name="Genre" style={{backgroundColor: 'red'}}>
        {(props) => <GenreStackScreen {...props} style={animatedStyle} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerStyles: {
    flex: 1,
    width: '50%',
    backgroundColor: R.colors.secondary,
  },
  drawerItem: {
    alignItems: 'flex-start',
    marginVertical: 0,
  },
  drawerLabel: {
    color: 'white',
    textAlign: 'center',
  },
  avatar: {
    borderRadius: 60,
    marginBottom: 16,
    borderColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
  },
});

export default DrawerScreen;

const DrawerContent = (props) => {
  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled={false}
      contentContainerStyle={{flex: 1}}>
      <View>
        <FastImage
          source={{
            uri: 'https://i.picsum.photos/id/190/200/200.jpg',
            priority: FastImage.priority.normal,
          }}
          style={{width: '100%', height: 120, top: -5}}
          resizeMode={FastImage.resizeMode.center}
        />
        <Text style={{...R.palette.text, textAlign: 'center', color: R.colors.text}}>Music Player</Text>
      </View>

      <View>
        <DrawerItem
          label="Playlist"
          labelStyle={{color: 'white'}}
          onPress={() => props.navigation.navigate('Playlist')}
          icon={() => (
            <FastImage
              source={{
                uri: 'https://i.picsum.photos/id/400/50/50.jpg',
                priority: FastImage.priority.normal,
              }}
              style={{height: 20, width: 20}}
              resizeMode={FastImage.resizeMode.center}
            />
          )}
        />
        <DrawerItem
          label="Genre"
          labelStyle={{color: 'white'}}
          onPress={() => props.navigation.navigate('Genre')}
          icon={() => (
            <FastImage
              source={{
                uri: 'https://i.picsum.photos/id/289/50/50.jpg',
                priority: FastImage.priority.normal,
              }}
              style={{height: 20, width: 20}}
              resizeMode={FastImage.resizeMode.center}
            />
          )}
        />
      </View>

      <View>
        <DrawerItem
          label="Logout"
          labelStyle={{color: 'white'}}
          icon={() => <FastImage
              source={{
                uri: 'https://i.picsum.photos/id/409/50/50.jpg',
                priority: FastImage.priority.normal,
              }}
              style={{height: 20, width: 20}}
              resizeMode={FastImage.resizeMode.center}
            />
          }
          onPress={() => alert('Are your sure to logout?')}
        />
      </View>
    </DrawerContentScrollView>
  );
};
