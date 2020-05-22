import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
} from 'react-native';

import R from 'res/R';

class GenreDetailComponent extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.paragraph}>{this.props.route.params.genreDescription}</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.secondary,
  },
  paragraph: {
    ...R.palette.text,
    color: R.colors.text,
  },
});

export default GenreDetailComponent;
