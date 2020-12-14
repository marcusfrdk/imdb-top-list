import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const ListItem = ({title, id, year, rating, imageUrl}: Props) => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {},
});

interface Props {
  title: string;
  id: number;
  year: number;
  rating: number;
  imageUrl: string;
}

export default ListItem;
