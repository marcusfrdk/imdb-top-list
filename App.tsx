import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Platform,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';

const App = () => {
  const [isOffline, setIsOffline] = useState(false);
  const [movieIds, setMovieIds] = useState<any>([]);
  const [data, setData] = useState<any>(null);
  const url = 'https://www.imdb.com/chart/top/';

  useEffect(() => {
    // Get ids of top 100 movies
    if (!isOffline) {
      axios
        .get(url)
        .then((res) => {
          const html = res.data;
          const regex = /(\/title\/w{0,9})\w+/g;
          let m;
          let movie_ids = [];

          do {
            m = regex.exec(html);
            if (m) {
              movie_ids.push(m[0]);
            }
          } while (m);

          setMovieIds(movie_ids);
        })
        .catch((err) => console.log(err));
    }

    const unsubscribe = NetInfo.addEventListener((state) => {
      !state.isConnected ? setIsOffline(true) : setIsOffline(false);
    });

    return () => unsubscribe();
  }, [NetInfo, movieIds, isOffline]);

  return (
    <>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        backgroundColor="#000"
      />
      <SafeAreaView>
        <Text>You are {isOffline ? 'offline' : 'online'}.</Text>

        {movieIds.map((data: any) => {
          return <Text>{data}</Text>;
        })}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
