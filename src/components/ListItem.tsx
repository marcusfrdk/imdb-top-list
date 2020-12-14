import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';

const ListItem = ({movieData}: Props) => {
  return (
    <View>
      <ImageBackground
        source={{uri: movieData.posterUrl}}
        style={[styles.container, {height: 182, width: '100%'}]}
        blurRadius={100}>
        <View style={styles.left}>
          <Image
            style={{height: 150, width: 150 / 1.49}}
            source={{uri: movieData.posterUrl}}
          />
        </View>
        <View style={styles.right}>
          <View>
            <Text style={styles.title}>{movieData.title}</Text>
          </View>
          <View>
            <Text style={styles.released}>{movieData.released}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.director}>{movieData.director}</Text>
            <Text style={styles.rating}>{movieData.rating}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
  },
  left: {},
  right: {
    flex: Dimensions.get('screen').width - 150 * 1.49 - 32,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#FFF',
  },
  released: {
    fontSize: 16,
    marginBottom: 4,
    color: '#FFF',
  },
  rating: {
    marginRight: 4,
    color: '#CCC',
  },
  director: {
    color: '#FFF',
    marginRight: 8,
    fontSize: 16,
  },
});

interface Props {
  movieData: Movie;
}

interface Movie {
  title: string;
  rating: string;
  posterUrl: string;
  director: string;
  released: string;
}

{
  /* <Image
  source={{uri: movieData.posterUrl}}
  style={{height: 250, width: 150}}
/>
<Text>Title: {movieData.title}</Text>
<Text>Rating: {movieData.rating}</Text>
<Text>Relase date: {movieData.year}</Text> */
}

export default ListItem;
