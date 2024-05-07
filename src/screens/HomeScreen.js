import {ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data: ', error);
      setError('Failed to fetch data from API.');
      setLoading(false)
      const cachedData = await AsyncStorage.getItem('universities');
      if (cachedData) {
        setUniversities(JSON.parse(cachedData));
      } else {
        setError('No data available');
      }
    }
  };

  useEffect(() => {
    fetchUniversities();
  }, []);

  const onRefresh = () => {
    setLoading(true)
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
        <View>
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
      {loading ?(

      <ActivityIndicator style={styles.containerError} size='large' color={'black'}/>) :
      error ? (
        <SafeAreaView style={styles.containerError}>
          <Text>{error}</Text>
        </SafeAreaView>
      ) : (
        <View style={{padding:10}}>
          <Text style={styles.heading}>UAE's best Universities</Text>
          <FlatList
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
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'center',
  },
  cardItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding:10
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
});
