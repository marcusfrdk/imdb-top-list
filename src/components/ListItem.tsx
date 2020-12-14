import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import axios from 'axios';

const ListItem = ({movieData}: Props) => {
  console.log(movieData.posterUrl);

  return (
    <View style={styles.container}>
      <Image
        source={{uri: movieData.posterUrl}}
        style={{height: 250, width: 150}}
      />
      <Text>Title: {movieData.title}</Text>
      <Text>Rating: {movieData.rating}</Text>
      <Text>Relase date: {movieData.year}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 64,
  },
});

interface Props {
  movieData: Movie;
}

interface Movie {
  title: string;
  rating: string;
  posterUrl: string;
  year: number;
}

export default ListItem;
