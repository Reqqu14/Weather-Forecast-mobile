import { StyleSheet, Text, View, Image } from "react-native";

ForecastAdditionalInformations = (props) => {
  return (
    <View style={styles.additionalInformationsContainer}>
      <View style={styles.additionalInformation}>
        <Image
          source={require("../assets/icons/wind.png")}
          style={styles.additionalInformationsImage}
        />
        <Text style={styles.additionalInformationsText}>{props.location?.current?.wind_kph}km</Text>
      </View>
      <View style={styles.additionalInformation}>
        <Image
          source={require("../assets/icons/drop.png")}
          style={styles.additionalInformationsImage}
        />
        <Text style={styles.additionalInformationsText}>{props.location?.current?.humidity}%</Text>
      </View>
      <View style={styles.additionalInformation}>
        <Image
          source={require("../assets/icons/sun.png")}
          style={styles.additionalInformationsImage}
        />
        <Text style={styles.additionalInformationsText}>{props.location?.forecast?.forecastday[0]?.astro?.sunrise}</Text>
      </View>
    </View>
  );
};

export default ForecastAdditionalInformations;

const styles = StyleSheet.create({
  additionalInformationsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    marginTop: 30,
    width: "100%",
  },

  additionalInformation: {
    flexDirection: "row",
  },

  additionalInformationsImage: {
    width: 25,
    height: 25,
  },

  additionalInformationsText: {
    color: "white",
    marginHorizontal: 5,
  },
});
