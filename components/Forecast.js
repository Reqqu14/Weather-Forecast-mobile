import { StyleSheet, Text, View, Image } from "react-native";
import { weatherImages } from "../constants/ImageConstants";

Forecast = (params) => {
  return (
    <View style={styles.forecastContainer}>
      <Text style={styles.forecastTown}>
        {params.location?.location?.name},
        <Text style={styles.forecastCountry}>
          {" " + params.location?.location?.country}
        </Text>
      </Text>
      <View>
        <Image
          source={weatherImages[params.location?.current?.condition?.text]}
          style={styles.forecastImage}
        />
      </View>
      <View style={styles.degreeContainer}>
        <Text style={styles.degree}>
          {params.location?.current?.temp_c}&#176;C
        </Text>
        <Text style={styles.degreeDescription}>
          {params.location?.current?.condition?.text}
        </Text>
      </View>
    </View>
  );
};

export default Forecast;

const styles = StyleSheet.create({
  forecastContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 50,
  },

  forecastTown: {
    color: "white",
    fontSize: 20,
  },

  forecastCountry: {
    fontSize: 14,
  },

  forecastImage: {
    marginTop: 50,
    width: 200,
    height: 200,
  },

  degreeContainer: {
    marginTop: 25,
  },

  degree: {
    fontSize: 48,
    color: "white",
    textAlign: "center",
    fontWeight: "bold"
  },

  degreeDescription: {
    color: "white",
    marginTop: 10,
    textAlign: "center",
    letterSpacing: 1,
  },
});
