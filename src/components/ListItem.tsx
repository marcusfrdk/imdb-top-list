import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  ActivityIndicator,
  ImageBackground,
  Platform,
} from 'react-native';

const ListItem = ({movieData, index}: Props) => {
  return (
    <View>
      <View
        style={[
          styles.index,
          {
            backgroundColor:
              index == 0 ? 'gold' : index == 1 ? 'silver' : 'brown',
          },
        ]}>
        <Text
          style={{
            color: '#FFF',
            fontWeight: 'bold',
          }}>
          {index + 1}
        </Text>
      </View>
      <ImageBackground
        source={{uri: movieData.posterUrl}}
        style={[styles.container, {height: 182, width: '100%'}]}
        blurRadius={64}>
        <View style={styles.left}>
          <Image style={styles.image} source={{uri: movieData.posterUrl}} />
        </View>
        <View style={styles.right}>
          <View>
            <Text style={styles.title}>{movieData.title}</Text>
          </View>
          <View>
            <Text style={styles.released}>{movieData.released}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <Text style={styles.director}>
              {movieData.director.includes(',')
                ? movieData.director.split(',')[0]
                : movieData.director}
            </Text>
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
  image: {
    height: 150,
    width: 150 / 1.49,
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
    color: '#FFF',
    fontWeight: 'bold',
  },
  director: {
    color: '#FFF',
    marginRight: 8,
    fontSize: 16,
  },
  index: {
    position: 'absolute',
    borderRadius: 100,
    paddingLeft: 4,
    paddingRight: 4,
    zIndex: 2,
    minWidth: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    top: 16,
    right: 16,
  },
});

interface Props {
  movieData: Movie;
  index: number;
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
