import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Platform,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import getMovies from './src/functions/getMovies';
import ListItem from './src/components/ListItem';
import AsyncStorage from '@react-native-community/async-storage';

const App = () => {
  const fakeMovie = {
    title: 'The Shawshank Redemption',
    released: '1996 Nov 1',
    director: 'Marcus Fredriksson',
    posterUrl:
      'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
    rating: '9.2',
  };
  const [numberOfMovies] = useState(100); // Max 250
  const [isOffline, setIsOffline] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMoviesList = async () => {
      const moviesAreDownloaded = await AsyncStorage.getItem('@movies');

      let movies: any;

      if (moviesAreDownloaded != null) {
        console.log('Using local storage.');
        movies = await AsyncStorage.getItem('@movies');
        movies = await JSON.parse(movies);
        setMovies(movies);
      } else {
        console.log('Downloading movies...');
        movies = await getMovies(numberOfMovies);
        setMovies(movies);
        await AsyncStorage.setItem('@movies', JSON.stringify(movies));
      }
    };

    getMoviesList();

    const unsubscribe = NetInfo.addEventListener((state) => {
      !state.isConnected ? setIsOffline(true) : setIsOffline(false);
    });

    return () => unsubscribe();
  }, [NetInfo, isOffline]);

  useEffect(() => {
    if (movies.length == numberOfMovies) {
      setLoaded(true);
    }
  }, [movies]);

  if (loaded) {
    return (
      <>
        <StatusBar
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
          backgroundColor="#000"
        />
        {isOffline ? (
          <SafeAreaView>
            <View style={styles.offline}>
              <Text style={styles.offlineText}>You are offline.</Text>
            </View>
          </SafeAreaView>
        ) : null}

        <ScrollView>
          <SafeAreaView>
            <View style={{padding: 16}}>
              <Text style={{fontSize: 24, fontWeight: 'bold'}}>
                IMDB Top {numberOfMovies} Movies
              </Text>
            </View>
          </SafeAreaView>

          {movies.map((data: any, index: number) => {
            return <ListItem key={index} movieData={data} index={index} />;
          })}
        </ScrollView>
      </>
    );
  } else {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Text style={{fontSize: 18, marginBottom: 16}}>Retrieving list...</Text>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }
};

{
  // <ListItem id={movies[0]} />
  /* <FlatList
  data={movieIds}
  renderItem={({item, index}: any) => <ListItem key={index} id={item} />}
/>; */
}

const styles = StyleSheet.create({
  offline: {
    padding: 8,
    backgroundColor: 'red',
    alignItems: 'center',
  },
  offlineText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '500',
  },
});

export default App;
