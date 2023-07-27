import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
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

const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  forecastContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: deviceHeight < 570 ? 25 : 50,
  },

  forecastTown: {
    color: "white",
    fontSize: deviceHeight < 570 ? 16 : 20,
  },

  forecastCountry: {
    fontSize: deviceHeight < 570 ? 12 : 14,
  },

  forecastImage: {
    marginTop: deviceHeight < 570 ? 35 : 50,
    width: deviceHeight < 570 ? 100 : 200,
    height: deviceHeight < 570 ? 100 : 200,
  },

  degreeContainer: {
    marginTop: deviceHeight < 570 ? 15 : 25,
  },

  degree: {
    fontSize: deviceHeight < 570 ? 32 : 48,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },

  degreeDescription: {
    color: "white",
    marginTop: 10,
    textAlign: "center",
    letterSpacing: 1,
  },
});
