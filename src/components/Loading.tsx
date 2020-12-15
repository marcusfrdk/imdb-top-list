import React from 'react';
import {View, Text, Button, Dimensions} from 'react-native';

const Loading = ({
  idsDownloaded,
  moviesDownloaded,
  numberOfMovies,
  isOffline,
}: Props) => {
  if (isOffline) {
    return <Display>Cannot get movies.</Display>;
  } else {
    if (!idsDownloaded) {
      return <Display>Indexing movies...</Display>;
    } else {
      return (
        <Display>
          Downloaded {moviesDownloaded}/{numberOfMovies}{' '}
          {moviesDownloaded == 1 ? 'movie' : 'movies'}...
        </Display>
      );
    }
  }
};

const Display = ({children}: any) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}>
      <Text
        style={{
          fontSize: 18,
          marginBottom: 32,
          maxWidth: Dimensions.get('screen').width * 0.8,
          textAlign: 'center',
        }}>
        {children}
      </Text>
    </View>
  );
};

interface Props {
  idsDownloaded: boolean;
  updateMovies: any;
  moviesDownloaded: number;
  numberOfMovies: number;
  isOffline: boolean;
}

export default Loading;
