import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Dimensions } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useAssets } from "expo-asset";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get("window");

const Header = ({ color }: any) => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const [assets, error] = useAssets([
    require("../assets/icons/headerlogo.svg"),
    require("../assets/icons/Headerwhite.png"),
    require("../assets/icons/Ekaant.svg"),
    require("../assets/icons/Headerloc.svg"),
  ]);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const location = await AsyncStorage.getItem('selectedLocation');
        if (location) {
          setSelectedLocation(location);
        }
      } catch (error) {
        console.error('Failed to fetch location from AsyncStorage', error);
      }
    };

    fetchLocation();
  }, []);

  return (
    <View style={styles.header}>
      <View style={styles.citySelector}>
        <View style={styles.label}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              lineHeight: 24,
              textAlign: "center",
              color: color,
            }}
          >
            Location
          </Text>

          <Ionicons name="chevron-down-outline" size={20} color={color} />
        </View>

        <View style={styles.selectedCity}>
          {color === "white" ? (
            <Ionicons name="location-outline" size={20} color={color} />
          ) : (
            assets &&
            assets[3] && (
              <Image
                source={assets[3]}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            )
          )}
          <Text style={styles.selectedCityText}>
            {selectedLocation ? `${selectedLocation}, IN` : 'No location'}
          </Text>
        </View>
      </View>

      <View style={styles.logoContainer}>
        {color === "white" && (
          <View>
            {assets && assets[1] && (
              <Image
                source={assets[1]}
                style={{
                  width: 40,
                  height: 40,
                  tintColor: color,
                }}
              />
            )}

            <Text
              style={{
                fontSize: 10,
                fontWeight: "bold",
                color: color,
              }}
            >
              EKAANT
            </Text>
          </View>
        )}

        {color === "black" && assets && assets[0] && (
          <Image
            source={assets[0]}
            style={{
              width: 50,
              height: 50,
              tintColor: color,
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: height * 0.085,
    width: "100%",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: "50%",
    height: "100%",
  },
  citySelector: {
    flex: 1,
    marginLeft: 10,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "bold",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    marginTop: 5,
  },
  selectedCity: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectedCityText: {
    fontSize: 16,
    fontWeight: "semibold",
    marginLeft: 5,
  },
});

export default Header;