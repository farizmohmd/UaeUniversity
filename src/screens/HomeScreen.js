import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../constants/ApiConstants';

const HomeScreen = ({navigation}) => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUniversities = async () => {
    try {
      const response = await axios.get(BASE_URL);
      setUniversities(response.data);
      await AsyncStorage.setItem('Universities', JSON.stringify(response.data));
      setError('');
    } catch (error) {
      console.error(
        'Error fetching data from API - please check the internet connection: ',
        error,
      );
      const cachedData = await AsyncStorage.getItem('Universities');
      if (cachedData) {
        setUniversities(JSON.parse(cachedData));
        setError('');
      } else {
        setError(
          'Failed fetching data from api and there is no cached data available',
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUniversities();
  }, []);

  const onRefresh = () => {
    setLoading(true);
    setUniversities([]);
    setError('');
    fetchUniversities();
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Details', {university: item, onRefresh})
      }
      style={styles.card}>
      <View style={styles.cardItems}>
        <View style={{width: '80%'}}>
          <Text style={styles.name}>{item.name}</Text>
          {item['state-province'] !== null ? (
            <Text style={styles.province}>{item['state-province']}</Text>
          ) : (
            <Text style={styles.province}>Data unavailable</Text>
          )}
        </View>

        <View style={styles.iconContainer}>
          <Text style={styles.arrow}>{'>'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator
          style={styles.containerError}
          size="large"
          color={'black'}
        />
      ) : error ? (
        <SafeAreaView style={styles.containerError}>
          <Text>{error}</Text>
        </SafeAreaView>
      ) : (
        <View style={styles.paddingBottom}>
          <Text style={styles.heading}>UAE's best Universities</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={universities}
            renderItem={renderItem}
            keyExtractor={item => item.name}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerError: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  card: {
    padding: 10,
    paddingRight: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'center',
  },
  cardItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  iconContainer: {
    height: 30,
    width: 30,
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 13,
  },
  arrow: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
    marginBottom: 5,
  },
  province: {
    fontWeight: '300',
    color: 'black',
  },
  paddingBottom: {
    paddingBottom: 70,
  },
});
