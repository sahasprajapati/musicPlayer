import React, {Component} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import {loadTracks} from '../redux/actions/tracksActions';
import MusicPlayer from './MusicPlayer';
import FastImage from 'react-native-fast-image';
import R from 'res/R';
class TracksComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      offset: 0,
      limit: 20,
      playlistId: this.props.route.params.playlistId,
    };
  }
  componentDidMount() {
    this.props.loadTracks(
      this.state.limit,
      this.state.offset,
      this.state.playlistId,
      true,
    );
  }
  
  renderHeader() {
    return <Text>Title</Text>;
  }
  renderFooter() {
    return <Text>Footer</Text>;
  }
  renderSeperator() {
    return (
      <View
        style={styles.seperator}
      />
    );
  }
  handleLoadMore = () => {
    //console.log('Loadmore');
    this.setState(
      {
        offset: this.state.offset + 20,
      },
      () =>
        this.props.loadTracks(
          this.state.limit,
          this.state.offset,
          this.state.playlistId,
          this.state.refreshing,
        ),
    );
  };
  handleRefreshData = () => {
    this.setState(
      {
        offset: 0,
        refreshing: true,
      },
      () =>
        this.props.loadTracks(
          this.state.limit,
          this.state.offset,
          this.state.playlistId,
          this.state.refreshing,
        ),
    );
  };
  renderItem = ({item}) => (<RenderItem item={item} navigation={this.props.navigation} />);
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          numColumns={2}
          keyExtractor={(item) => item.id}
          data={this.props.tracks}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeperator}
          // ListHeaderComponent={this.renderHeader}
          // ListFooterComponent={this.renderFooter}
          refreshing={this.props.loading}
          onRefresh={this.handleRefreshData}
          removeClippedSubviews={true}
          getItemLayout={(data, index) => ({length: 200, offset: 200 * index, index})}
          initialNumToRender={0}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 10,
    backgroundColor: R.colors.secondary,
  },
  track: {
    flex: 1,
  },
  trackCard: {
    backgroundColor: '#00000022',
    flex: 1,
    margin: 10,
    position: 'relative',
    top: 0,
    left: 0,
    height: 150,
    width: '80%',
    alignItems: 'center',
    elevation: 1,
    borderRadius: 20,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  trackCardItem: {
    width: '100%',
    backgroundColor: '#00000022',
    height: '100%',
    position: 'absolute',
  },
  trackCardItemText: {
    ...R.palette.text,
    padding: 10,
    textShadowColor: 'black',
    textShadowOffset: {width: 0,height: 0},
    textShadowRadius: 10,
    elevation: 10,
  },
  trackImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  seperator: {
    backgroundColor: R.colors.accent,
    height: 1,
    width: '90%',
    alignSelf: 'center',
    margin: 20,
  },
});
const mapStateToProps = (state) => ({
  loading: state.tracks.loading,
  error: state.tracks.error,
  tracks: state.tracks.tracks,
});

const mapDispatchToProps = (dispatch) => ({
  loadTracks: (limit, offset, playlistId, refresh = false) =>
    dispatch(loadTracks(limit, offset, playlistId, refresh)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TracksComponent);

class RenderItem extends React.PureComponent {

  handleOnPress = (imageUri, audioUri, trackName, albumName, artistName, genreIds, navigation) => {
    navigation.navigate('MusicPlayer', {
      trackImageUri: imageUri,
      trackAudioUri: audioUri,
      trackName: trackName,
      albumName: albumName,
      trackArtist: artistName,
      genres: genreIds,
    });
  };
  render() {
    const {
      albumId,
      previewURL,
      name,
      albumName,
      artistName,
      links,
    } = this.props.item;
    const albumImageUri =
      'http://direct.rhapsody.com/imageserver/v2/albums/' +
      albumId +
      '/images/300x300.jpg';

    return (
      <TouchableOpacity
        style={styles.trackCard}
        onPress={() =>
          this.handleOnPress(
            albumImageUri,
            previewURL,
            name,
            albumName,
            artistName,
            links.genres.ids,
            this.props.navigation,
          )
        }>
        <FastImage
          source={{
            uri: albumImageUri,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.center}
          style={[styles.trackImage]}
        />

        <Text style={styles.trackCardItemText}>{name}</Text>
      </TouchableOpacity>
    );
  }
}
