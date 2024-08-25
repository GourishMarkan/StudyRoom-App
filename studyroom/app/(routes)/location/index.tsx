import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';

const locations = [
  { id: '1', name: 'Location 1', latitude: 37.78825, longitude: -122.4324 },
  { id: '2', name: 'Location 2', latitude: 37.75825, longitude: -122.4624 },
  { id: '3', name: 'Location 3', latitude: 37.76825, longitude: -122.4824 },
  // Add more locations as needed
];

const LocationsScreen = ({ navigation }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationSelect = async (location) => {
    // Handle location selection
    console.log('Selected location:', location);
    setSelectedLocation(location);

    // Save the selected location to AsyncStorage
    try {
      await AsyncStorage.setItem('selectedLocation', location.name);
    } catch (error) {
      console.error('Failed to save location to AsyncStorage', error);
    }

    // Navigate back or to another screen if needed
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Select a location</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {locations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title={location.name}
            onPress={() => handleLocationSelect(location)}
          />
        ))}
      </MapView>
      <FlatList
        data={locations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleLocationSelect(item)}>
            <Text style={styles.locationItem}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  map: {
    width: '100%',
    height: '50%',
  },
  locationItem: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default LocationsScreen;