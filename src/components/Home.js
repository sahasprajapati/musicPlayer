import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';


import {connect} from 'react-redux';
import {loadItemList, refreshItemList} from '../redux/actions/homeActions';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      limit: 20,
      offset: 10,
    };
  }

  componentDidMount() {
    this.props.loadItemList(this.state.limit, this.state.offset);
  }

  renderItem(item, index) {
    return (
      <TouchableHighlight>
        <View>
          <Image
            source={{uri: item.images[0].url}}
            style={{height: 100, width: 100, borderRadius: 20}}
          />
          <Text>
            {item.name + item.favoriteCount + ' ' +item.id}
          </Text>
          <Text>
            {index}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
  renderSeperator() {
    return (
      <View style={{height:1, width:'100%', backgroundColor:'red'}} />
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
        offset: this.state.offset + 10,
      },
      () => {
        this.props.loadItemList(this.state.limit, this.state.offset);
      },
    );
  };
  handleRefresh = () => {
    this.setState(
      {
        limit: 20,
        offset: 10,
      },
      () => {
        this.props.refreshItemList(this.state.limit, this.state.offset);
      },
    );
  };
  render() {
    console.log(this.props.loading);
    return (
      <View>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={this.props.items}
          renderItem={({item, index}) => this.renderItem(item, index)}
          ItemSeparatorComponent={this.renderSeperator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.props.loading}
          onEndReached={this.handleLoadMore}
          onEndThreshold={0.5}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  seperator: {
    backgroundColor: 'red',
    height: 100,
    width: 100,
  },
});

const mapDispatchToProps = (dispatch) => ({
  loadItemList: (limit, offset) => dispatch(loadItemList(limit, offset)),
  refreshItemList: (limit, offset) => dispatch(refreshItemList(limit, offset)),
});

const mapStateToProps = (state) => {
 // console.log(state);
  return {
    items: state.home.items,
    loading: state.home.loading,
    error: state.home.error,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
