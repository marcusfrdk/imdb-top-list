import React from 'react';
import {SafeAreaView, View, StyleSheet, Text} from 'react-native';

const Offline = ({isOffline}: Props) => {
  if (isOffline) {
    return (
      <SafeAreaView>
        <View style={styles.offline}>
          <Text style={styles.offlineText}>You are offline.</Text>
        </View>
      </SafeAreaView>
    );
  } else return null;
};

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

interface Props {
  isOffline: boolean;
}

export default Offline;
