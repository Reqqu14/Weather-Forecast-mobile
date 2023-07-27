import {
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import { useCallback, useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { debounce, pick } from "lodash";
import { fetchLocations, fetchWeatherForecast } from "../api/WeatherApi";
import { storeData } from "../utils/asyncStorage";
import { getData } from "../utils/asyncStorage";

SearchBar = (props) => {
  const [showSearch, setShowSearch] = useState(false);
  const [locations, setLocations] = useState([]);

  const handleLocations = (loc) => {
    setLocations([]);
    setShowSearch(false);
    props.setLoading(true);
    fetchWeatherForecast({
      cityName: loc.name,
    }).then((data) => {
      props.pickLocation(data);
      storeData("city", loc.name);
      props.setLoading(false);
    });
  };

  const handleSearch = (value) => {
    if (value.length > 2) {
      fetchLocations({ cityName: value }).then((data) => {
        setLocations(data);
      });
    }
  };

  useEffect(() => {
    fetchDefaultWeatherData();
  }, []);

  const fetchDefaultWeatherData = async () => {
    let pickedCity = await getData("city");
    let cityName = "Warsaw";
    if (pickedCity) {
      cityName = pickedCity;
    }
    fetchWeatherForecast({
      cityName: cityName,
    }).then((data) => {
      props.pickLocation(data);
      props.setLoading(false);
    });
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <SafeAreaView>
      <View
        style={[
          styles.searchContainer,
          {
            backgroundColor: showSearch
              ? "rgba(255, 255, 255, 0.2)"
              : "transparent",
            display: props.visible ? "none" : "flex",
          },
        ]}
      >
        {showSearch ? (
          <TextInput
            placeholder="Search city"
            style={styles.searchInput}
            onChangeText={(text) => handleTextDebounce(text)}
          />
        ) : null}

        <TouchableOpacity
          style={styles.searchInputContainer}
          onPress={() => setShowSearch(!showSearch)}
        >
          <AntDesign name="search1" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {showSearch && locations.length > 0 ? (
        <View style={styles.searchResultsContainer}>
          {locations.map((loc, index) => {
            let showBorder = index + 1 != locations.length;
            return (
              <TouchableOpacity
                onPress={() => handleLocations(loc)}
                key={index}
                style={[
                  styles.locationsContainer,
                  showBorder && {
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                  },
                ]}
              >
                <FontAwesome name="map-marker" size={24} color="gray" />
                <Text style={styles.locationText}>
                  {loc.name}, {loc.country}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default SearchBar;

const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: deviceHeight < 570 ? 30 : 50,
    borderRadius: 20,
    paddingHorizontal: deviceHeight < 570 ? 10 : 20,
    marginHorizontal: 20,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    height: deviceHeight < 570 ? 40 : 50,
  },

  searchInput: {
    color: "white",
    width: "90%",
  },

  searchInputContainer: {
    padding: deviceHeight < 570 ? 8 : 11,
    borderRadius: 80,
    position: "absolute",
    right: 1,
    backgroundColor: "rgba(255, 255, 255, 0.35)",
  },

  searchResultsContainer: {
    backgroundColor: "lightgray",
    borderRadius: 30,
    marginHorizontal: 20,
    marginTop: 5,
  },

  locationsContainer: {
    flexDirection: "row",
    padding: deviceHeight < 570 ? 10 : 15,
  },

  locationText: {
    color: "black",
    fontSize: deviceHeight < 570 ? 16 : 18,
    marginLeft: 5,
  },
});
