import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Platform,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import getMovies from './src/functions/getMovies';
import ListItem from './src/components/ListItem';

const App = () => {
  const [numberOfMovies] = useState(100);
  const [isOffline, setIsOffline] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getIds = async () => {
      let res: any = await getMovies(numberOfMovies);
      setMovies(res);
    };

    getIds();

    // Get ids of top 100 movies
    // if (!isOffline) {
    //   axios
    //     .get(url)
    //     .then((res) => {
    //       const html = res.data;
    //       const regex = /(\/title\/w{0,9})\w+/g;
    //       let m;
    //       let movie_ids = [];

    //       do {
    //         m = regex.exec(html);
    //         if (m) {
    //           movie_ids.push(m[0].replace('/title/', ''));
    //         }
    //       } while (m);

    //       setMovieIds(movie_ids);
    //     })
    //     .catch((err) => console.log(err));
    // }

    const unsubscribe = NetInfo.addEventListener((state) => {
      !state.isConnected ? setIsOffline(true) : setIsOffline(false);
    });

    return () => unsubscribe();
  }, [NetInfo, isOffline]);

  useEffect(() => {
    if (movies.length == numberOfMovies) {
      setLoaded(true);
    }
  }, [movies.length]);

  if (loaded) {
    return (
      <>
        <StatusBar
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
          backgroundColor="#000"
        />
        <SafeAreaView>
          <Text>You are {isOffline ? 'offline' : 'online'}.</Text>
          <ListItem movieData={movies[0]} />
        </SafeAreaView>
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

const styles = StyleSheet.create({});

export default App;
