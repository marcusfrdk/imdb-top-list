import React from 'react';
import {View, Text, Image} from 'react-native';

const EasterEgg = () => {
  return (
    <View
      style={{
        height: 300,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={{
          uri: 'https://media.giphy.com/media/3ornkdtVzQfIRpwfug/giphy.gif',
        }}
        style={{
          height: 100,
          width: 150,
          marginBottom: 16,
          borderRadius: 8,
        }}
      />
      <Image
        source={{
          uri: 'https://media.giphy.com/media/2wgWdnnajgQIyjvnNy/giphy.gif',
        }}
        style={{
          height: 100,
          width: 150,
          marginBottom: 16,
          borderRadius: 8,
          position: 'absolute',
          top: 76,
          left: 50,
        }}
      />
      <Image
        source={{
          uri: 'https://media.giphy.com/media/pHYaWbspekVsTKRFQT/giphy.gif',
        }}
        style={{
          height: 100,
          width: 150,
          marginBottom: 16,
          borderRadius: 8,
          position: 'absolute',
          top: 76,
          right: 50,
        }}
      />
      <Image
        source={{
          uri: 'https://media.giphy.com/media/l3vRlT2k2L35Cnn5C/giphy.gif',
        }}
        style={{
          height: 100,
          width: 150,
          marginBottom: 16,
          borderRadius: 8,
        }}
      />
      <Text style={{fontSize: 18}}>Grattis i efterskott Oscar!</Text>
    </View>
  );
};

export default EasterEgg;
