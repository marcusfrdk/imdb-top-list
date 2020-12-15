import React from 'react';
import {View, Text, Button, SafeAreaView, Image, Alert} from 'react-native';

const Loading = ({numberOfMovies, isOffline, updateMovies}: Props) => {
  return (
    <SafeAreaView>
      <View
        style={{
          padding: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: 40,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={require('./imdb-logo.png')}
            style={{height: '60%', width: 50, marginRight: 8}}
          />
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            Top {numberOfMovies} Movies
          </Text>
        </View>
        {!isOffline ? (
          <Button
            title="Redownload"
            onPress={() =>
              Alert.alert(
                'Redownload List',
                'You are about to redownload all the movies, this can take a while.',
                [
                  {
                    text: 'Redownload',
                    onPress: updateMovies,
                    style: 'destructive',
                  },
                  {text: 'Cancel', style: 'cancel'},
                ],
              )
            }
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
};

interface Props {
  updateMovies: any;
  numberOfMovies: number;
  isOffline: boolean;
}

export default Loading;
