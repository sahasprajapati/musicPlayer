import React from 'react';
import {View, TouchableOpacity, Image, Text, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';
import R from 'res/R';
const pad = (n, width, z = 0) => {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

const minutesAndSeconds = (position) => [
  pad(Math.floor(position / 60), 2),
  pad(position % 60, 2),
];

const Seekbar = ({trackLength, currentPosition, onSeek, OnSlidingStart}) => {
  const elapsed = minutesAndSeconds(currentPosition);
  const remaining = minutesAndSeconds(trackLength - currentPosition);

  return (
    <View style={styles.container}>
      <View style={styles.timer}>
        <Text style={styles.timeElapsed}>
          {elapsed[0] + ':' + elapsed[1] + ' '}
        </Text>
        <Text style={styles.remainingTime}>
          {remaining[0] + ':' + remaining[1]}
        </Text>
      </View>
      <Slider
        maximumValue={Math.max(trackLength, 1, currentPosition + 1)}
        OnSlidingStart={OnSlidingStart}
        onSlidingComplete={onSeek}
        value={currentPosition}
        style={styles.slider}
        maximumTrackTintColor={R.colors.primary}
        minimumTrackTintColor={R.colors.accent}
        thumbStyle={styles.thumb}
        trackStyle={styles.track}
        thunbTintColor={R.colors.accent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.secondary,
  },
  slider: {
    flex: 1,
    marginBottom: 10,
  },
  timer: {
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 10,
    flex: 1,
    flexDirection: 'row',
  },
  remainingTime: {
    flex: 1,
    ...R.palette.text,
    justifyContent: 'flex-end',
    textAlign: 'right'
  },
  timeElapsed: {
    flex: 1,
    ...R.palette.text,
    textAlign: 'left',
  },
  thumb: {
  },
  track: {
  }
});

export default Seekbar;
