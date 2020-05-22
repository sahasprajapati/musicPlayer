import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

import {Provider} from 'react-redux';
import {store} from './redux/store';

import {enableScreens} from 'react-native-screens';
import R from 'res/R';

import DrawerScreen from './screens/DrawerScreen';

enableScreens();

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar hidden={true} backgrounColor={R.colors.primary} translucent={true} barStyle="dark-content"/> 
      <NavigationContainer>
        <DrawerScreen />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
