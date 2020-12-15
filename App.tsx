import React, {useEffect, useState} from 'react';
import {StatusBar, Platform, ScrollView} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import getMovies from './src/functions/getMovies';
import ListItem from './src/components/ListItem';
import AsyncStorage from '@react-native-community/async-storage';
import Loading from './src/components/Loading';
import Header from './src/components/Header';
import EasterEgg from './src/components/EasterEgg';
import Offline from './src/components/Offline';

const App = () => {
  const [numberOfMovies] = useState(100); // Max 250
  const [isOffline, setIsOffline] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [movies, setMovies] = useState([]);
  const [purgeMovies, setPurgeMovies] = useState(false);
  const [idsDownloaded, setIdsDownloaded] = useState<boolean>(false);
  const [moviesDownloaded, setMoviesDownloaded] = useState<number>(0);

  const updateMovies = async () => {
    await AsyncStorage.removeItem('@movies');
    setPurgeMovies(true);
    setLoaded(false);
  };

  useEffect(() => {
    const getMoviesList = async () => {
      const moviesAreDownloaded = await AsyncStorage.getItem('@movies');

      let movies: any;

      setIdsDownloaded(false);
      setMoviesDownloaded(0);

      if (moviesAreDownloaded != null) {
        console.log('Using local storage.');
        movies = await AsyncStorage.getItem('@movies');
        movies = await JSON.parse(movies);
      } else {
        console.log('Downloading movies...');
        movies = await getMovies(
          numberOfMovies,
          setIdsDownloaded,
          setMoviesDownloaded,
        );
        await AsyncStorage.setItem('@movies', JSON.stringify(movies));
      }

      setMovies(movies);
      setPurgeMovies(false);
    };

    getMoviesList();

    const unsubscribe = NetInfo.addEventListener((state) => {
      !state.isConnected ? setIsOffline(true) : setIsOffline(false);
    });

    return () => unsubscribe();
  }, [NetInfo, isOffline, purgeMovies]);

  useEffect(() => {
    if (movies.length == numberOfMovies) {
      setLoaded(true);
    }
  }, [movies]);

  if (loaded) {
    return (
      <>
        <ScrollView>
          <Header
            isOffline={isOffline}
            numberOfMovies={numberOfMovies}
            updateMovies={updateMovies}
          />

          {movies.map((data: any, index: number) => {
            return <ListItem key={index} movieData={data} index={index} />;
          })}

          <EasterEgg />
        </ScrollView>
      </>
    );
  } else {
    return (
      <>
        <Header
          isOffline={isOffline}
          numberOfMovies={numberOfMovies}
          updateMovies={updateMovies}
        />

        <Loading
          idsDownloaded={idsDownloaded}
          numberOfMovies={numberOfMovies}
          moviesDownloaded={moviesDownloaded}
          updateMovies={updateMovies}
        />
      </>
    );
  }
};

export default App;
