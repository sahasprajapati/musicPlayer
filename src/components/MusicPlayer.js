import React, {PureComponent} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Image,
  Button,
  StatusBar,
} from 'react-native';
import {connect} from 'react-redux';
import Video from 'react-native-video';
import Seekbar from './Seekbar';
import R from 'res/R';

class MusicPlayer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      videoComponentKey: 0,
      paused: false,
      repeat: false,
      muted: false,
      timeElapsed: 0,
      totalDuration: 0,
      error: '',
    };
  }
  player;

  forward = () => {
    let {timeElapsed, totalDuration} = this.state;
    let forwardBy = 5;
    this.pause();
    // causes ui bug so removed
    //this.props.forward(forwardBy);
    console.log(timeElapsed);
    totalDuration - timeElapsed > forwardBy
      ? this.player && this.player.seek(timeElapsed + forwardBy)
      : null;
    this.play();
  };
  backward = () => {
    let {timeElapsed} = this.state;
    let forwardBy = 5;
    this.pause();
    //causes ui bug so removed
    //this.props.backward(forwardBy);
    timeElapsed > forwardBy
      ? this.player && this.player.seek(timeElapsed - forwardBy)
      : null;
    this.play();
  };
  seek(time) {
    time = Math.round(time);
    this.setState({timeElapsed: time});
    this.player && this.player.seek(time);
    this.play();
  }
  setDuration(data) {
    //console.log('DUration', data.duration);
    this.setState({totalDuration: Math.floor(data.duration)});
  }
  setTime(data) {
    //console.log('Time:', data.currentTime);
    this.setState({timeElapsed: Math.round(data.currentTime)});
    if (
      !this.state.repeat &&
      data.currentTime > this.state.totalDuration - 0.2
    ) {
      this.pause();
    }
  }
  handleError = (error) => {
    console.log(error);
    this.setState({error: 'Error Occured'});
    this.pause();
  };
  handlePausePlay = () => {
    this.state.paused ? this.play() : this.pause();
  };
  play = () => {
    this.setState({paused: false});
  };
  pause = () => {
    this.setState({paused: true});
  };
  muteToggle = () => {
    this.setState({muted: !this.state.muted});
  };
  repeatToggle = () => {
    this.setState({repeat: !this.state.repeat});
  };
  render() {
    //console.log(this.props);
    const {
      trackName,
      trackArtist,
      albumName,
      trackImageUri,
      trackAudioUri,
      genreIds,
    } = this.props.route.params;
    return (
      <SafeAreaView style={styles.container}>
         {this.state.error ? <Text>{this.state.error}</Text> : null}
        <Video
          source={{
            uri: trackAudioUri,
          }}
          paused={this.state.paused}
          key={this.state.videoComponentKey}
          ref={(ref) => (this.player = ref)}
          onError={this.handleError.bind(this)}
          poster={''}
          audioOnly={true}
          playInBackground={true}
          muted={this.state.muted}
          onProgress={this.setTime.bind(this)}
          onLoad={this.setDuration.bind(this)}
          repeat={true}
          onAudioBecomingNoisy={this.pause}
        />
        <Image
          source={{
            uri: trackImageUri,
          }}
          style={styles.musicImage}
        />
        <View style={styles.detail}>
          <Text style={[styles.detailText, styles.detailArtistName]}>{trackArtist}</Text>
          <Text style={[styles.detailText, styles.detailTrackName]}>{trackName}</Text>
          <Text style={[styles.detailText, styles.detailAlbumName]}>{albumName}</Text>
        </View>
        <Seekbar
          trackLength={this.state.totalDuration}
          currentPosition={this.state.timeElapsed}
          onSeek={this.seek.bind(this)}
          onSlidingStart={this.state.pause}
        />
        <View style={styles.controller}>
         <Button
            color={R.colors.accent}
            title={this.state.repeat ? "Repeat(ON)" : "Repeat(OFF)"}
            onPress={this.repeatToggle}
            style={styles.controllerItem}
          />

          <View style={styles.playbackController}>
            <Button color={R.colors.accent} title="<<" onPress={this.backward} style={styles.controllerItem}/>
            <Button
              color={R.colors.accent}
              title={this.state.paused ? 'Play' : 'Pause'}
              onPress={this.handlePausePlay}
              style={styles.controllerItem}
            />
            <Button color={R.colors.accent} title=">>" onPress={this.forward} style={styles.controllerItem}/>
          </View>

          <Button
            color={R.colors.accent}
            title={this.state.muted ? "Mute(ON)" : "Mute(OFF)"}
            onPress={this.muteToggle}
            style={styles.controllerItem}
          />
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.secondary,
  },
  musicImage: {
    flex: 5,
    alignSelf: 'center',
    width: '90%',
    marginTop: 20,
  },
  detail: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailText: {
    ...R.palette.text,
  },
  detailAlbumName: {
    fontSize: 12,
  },
  detailArtistName: {
  },
  detailTrackName: {
    fontSize: 28,
    color: R.colors.text,
  },
  controller: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: R.colors.secondary,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playbackController: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    margin: 10,
    padding: 10,
 //   backgroundColor: 'red',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controllerItem: {
    flex: 1,
    margin: 20,
    padding: 10,
    alignSelf: 'center',
  },
  error: {
  backgroundColor: 'rgba(1,0,0,0.9)',
  }
});

export default MusicPlayer;
