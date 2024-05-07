import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import React from 'react';

const DetailsScreen = ({route, navigation}) => {
  const {university, onRefresh, cached} = route.params;

  const handleRefresh = () => {
    onRefresh();
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.padding}>
        <TouchableOpacity onPress={handleRefresh} style={styles.refresh}>
          <View style={styles.center}>
            <Text style={styles.heading}>University Details</Text>
          </View>
          <Image
            style={{height: 30, width: 30}}
            source={require('../icons/refresh.png')}
          />
        </TouchableOpacity>
        <Text style={styles.name}>{university.name}</Text>

        <View style={styles.detailsContainer}>
          <View style={{justifyContent: 'center'}}>
            {university['state-province'] !== null ? (
              <Text style={styles.text}>{university['state-province']}</Text>
            ) : (
              <Text style={styles.text}>Data unavailable</Text>
            )}
            <Text style={styles.text}>{university.country}</Text>
            <Text style={styles.text}>{university.web_pages[0]}</Text>
          </View>
          <View>
            <Text style={{fontWeight: '800', color: 'black'}}>
              {university.alpha_two_code}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailsContainer: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
    marginBottom: 5,
  },
  text: {
    fontWeight: '500',
    marginBottom: 5,
  },
  refresh: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 15,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  padding: {
    padding: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});
