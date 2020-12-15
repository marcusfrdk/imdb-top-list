import React from 'react';
import {View, Text, Button} from 'react-native';

const Loading = ({
  idsDownloaded,
  updateMovies,
  moviesDownloaded,
  numberOfMovies,
}: Props) => {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      {!idsDownloaded ? (
        <View>
          <Text style={{fontSize: 18, marginBottom: 32}}>
            Indexing movies...
          </Text>
          <Button title="Force" color="red" onPress={updateMovies} />
        </View>
      ) : null}
      {moviesDownloaded !== numberOfMovies && idsDownloaded ? (
        <Text style={{fontSize: 18, marginBottom: 32}}>
          Downloaded {moviesDownloaded}/{numberOfMovies}{' '}
          {moviesDownloaded == 1 ? 'movie' : 'movies'}...
        </Text>
      ) : null}
    </View>
  );
};

interface Props {
  idsDownloaded: boolean;
  updateMovies: any;
  moviesDownloaded: number;
  numberOfMovies: number;
}

export default Loading;
