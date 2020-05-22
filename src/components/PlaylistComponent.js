import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Button,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import {loadPlaylist} from '../redux/actions/playlistActions';
import R from 'res/R';

class PlaylistComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      limit: 20,
      offset: 0,
      
    };
  }

  componentDidMount() {
    this.props.loadPlaylist(this.state.offset, true);
  }

  renderItem = (item, index) => (<RenderItem item={item} navigation={this.props.navigation}/>);

  renderSeperator() {
    return (
      <View style={styles.seperator} />
    );
  }
  renderHeader() {
    return <Text>Music</Text>;
  }
  renderFooter() {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  handleLoadMore = () => {
    this.setState(
      {
        offset: this.state.offset + 20,
      },
      () => {
        this.props.loadPlaylist(this.state.offset, false, this.state.limit);
      },
    );
  };
  handleRefresh = () => {
    this.setState(
      {
        ...this.state,
        limit: 20,
        offset: 0,
        refreshing: true,
      },
      () => {
        this.props.loadPlaylist(this.state.offset, this.state.refreshing, this.state.limit);
      },
    );
  };
  
  render() {
    //console.log(this.props.loading);
    //this.props.playlists.map(x => console.log(x));
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.playlist}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          data={this.props.playlists}
          renderItem={({item, index}) => this.renderItem(item, index)}
          ItemSeparatorComponent={this.renderSeperator}
          //  ListHeaderComponent={this.renderHeader}
          // ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.props.loading}

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
  playlist: {
    flex: 1,
  },
  playlistCard: {

    backgroundColor: '#00000022',
    flex: 1,
    position: 'relative',
    top: 0,
    left: 0,
    height: 150,
    margin: 10,
    alignItems: 'center',
    elevation: 1,
    borderRadius: 20,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  playlistCardItem: {
    width: '100%',
    backgroundColor: '#00000022',
    height: '100%',
    position: 'absolute',
  },
  playlistCardItemText: {
    ...R.palette.text,
    padding: 10,
    textShadowColor: 'black',
    textShadowOffset: {width: 0,height: 0},
    textShadowRadius: 10,
    elevation: 10,
  },
  playlistImage: {
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

const mapDispatchToProps = (dispatch) => ({
  loadPlaylist: (offset, refresh = false, limit = 20) =>
    dispatch(loadPlaylist(offset, refresh, limit)),
});

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    playlists: state.playlist.playlists,
    loading: state.playlist.loading,
    error: state.playlist.error,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistComponent);


class RenderItem extends React.PureComponent {

  handleOnPress = (id, navigation) => {
    //console.log(id);
    navigation.navigate('Tracks', {
      playlistId: id,
    });
  };
  render() {
    const {id, images, name} = this.props.item;
    const albumImageUri =
      'http://direct.rhapsody.com/imageserver/v2/albums/' +
      id +
      '/images/300x300.jpg';

    return (
      <TouchableOpacity
        style={styles.playlistCard}
        onPress={() =>
          this.handleOnPress(
            id,
            this.props.navigation,
          )
        }>
        <FastImage
          source={{
            uri: images[0].url,
            priority: FastImage.priority.normal,
          }}
          style={[styles.playlistImage]}
          resizeMode={FastImage.resizeMode.center}
        />
        <Text style={styles.playlistCardItemText}>{name}</Text>
      </TouchableOpacity>
    );
  }
}
