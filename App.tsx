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

const App = () => {
  const fakeMovie = {
    title: 'The Shawshank Redemption',
    released: '1996 Nov 1',
    director: 'Marcus Fredriksson',
    posterUrl:
      'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
    rating: '9.2',
  };
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
  }, [movies]);

  if (loaded) {
    return (
      <>
        <StatusBar
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
          backgroundColor="#000"
        />
        <SafeAreaView>
          <Text>You are {isOffline ? 'offline' : 'online'}.</Text>
        </SafeAreaView>
        <ScrollView>
          {movies.map((data: any, index: number) => {
            return <ListItem key={index} movieData={data} />;
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

const styles = StyleSheet.create({});

export default App;
