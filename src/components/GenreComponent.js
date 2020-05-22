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
import {connect} from 'react-redux';
import {loadGenre} from '../redux/actions/genreActions';
import R from 'res/R';


class GenreComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      limit: 20,
      offset: 0,
    };
  }

  componentDidMount() {
    this.props.loadGenre(this.state.offset, true);
  }

  renderItem = (item, index)  => (<RenderItem item={item} navigation={this.props.navigation} />)
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
        this.props.loadgenre(this.state.offset, false, this.state.limit);
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
        this.props.loadgenre(this.state.offset, this.state.refreshing, this.state.limit);
      },
    );
  };
  
  render() {
    //console.log(this.props.loading);
    //this.props.genres.map(x => console.log(x));
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.genre}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          data={this.props.genres}
          renderItem={({item, index}) => this.renderItem(item, index)}
          ItemSeparatorComponent={this.renderSeperator}
          // ListHeaderComponent={this.renderHeader}
          // ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.props.loading}
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
  genre: {
    flex: 1,
  },
  genreCard: {
    flex: 1,
    position: 'relative',
    top: 0,
    left: 0,
    height: 150,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    borderRadius: 20,
    alignSelf: 'center',
    overflow: 'hidden',
    backgroundColor: '#00000022',
  },
  genreCardItem: {
    width: '100%',
    backgroundColor: '#00000022',
    height: '100%',
    position: 'absolute',
  },
  genreCardItemText: {
    ...R.palette.text,
    padding: 10,
    textShadowColor: 'black',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  genreImage: {
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
  loadGenre: (offset, refresh = false, limit = 20) =>
    dispatch(loadGenre(offset, refresh, limit)),
});

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    genres: state.genre.genres,
    loading: state.genre.loading,
    error: state.genre.error,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GenreComponent);

class RenderItem extends React.PureComponent {

  handleOnPress = (name, description, navigation) => {
    //console.log(name);
    this.props.navigation.navigate('Genre Details', {
      genreName: name,
      genreDescription: description,
    });
  };
  render() {
    const {name, description} = this.props.item;
  
    return (
      <TouchableOpacity
        style={styles.genreCard}
        onPress={() =>
          this.handleOnPress(
            name,
            description,
            this.props.navigation,
          )
        }>
        <Text style={styles.genreCardItemText}>{name}</Text>
      </TouchableOpacity>
    );
  }
}
