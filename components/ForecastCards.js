import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { weatherImages } from "../constants/ImageConstants";

const deviceHeight = Dimensions.get("window").height;

ForecastCards = (props) => {
  let calendarImgSize = 24;

  if (deviceHeight < 570) {
    calendarImgSize = 20;
  }

  return (
    <View>
      <View style={styles.dailyForecastContainer}>
        <AntDesign name="calendar" size={calendarImgSize} color="white" />
        <Text style={styles.dailyForecastText}>Daily Forecast</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.dailyForecastCardsContainer}>
          {props.location?.forecast?.forecastday?.map((item, index) => {
            let date = new Date(item.date);
            let options = { weekday: "long" };
            let dayName = date.toLocaleDateString("en-US", options);
            dayName = dayName.split(",")[0];
            return (
              <View style={styles.dailyForecastCard} key={index}>
                <Image
                  source={weatherImages[item?.day?.condition?.text]}
                  style={styles.dailyForecastCardImage}
                />
                <Text style={styles.dailyForecastCardDay}>{dayName}</Text>
                <Text style={styles.dailyForecastCardDegree}>
                  {item?.day?.avgtemp_c}&#176;C
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default ForecastCards;

const styles = StyleSheet.create({
  dailyForecastContainer: {
    marginTop: deviceHeight < 570 ? 10 : 15,
    flexDirection: "row",
    padding: deviceHeight < 570 ? 7 : 10,
    marginHorizontal: 5,
    alignItems: "center",
  },

  dailyForecastText: {
    color: "white",
    marginLeft: 10,
  },

  dailyForecastCardsContainer: {
    flexDirection: "row",
  },

  dailyForecastCard: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: deviceHeight < 570 ? 5 : 10,
    minWidth: deviceHeight < 570 ? 75 : 100,
  },

  dailyForecastCardImage: {
    width: deviceHeight < 570 ? 40 : 60,
    height: deviceHeight < 570 ? 40 : 60,
  },

  dailyForecastCardDay: {
    color: "white",
    fontSize: deviceHeight < 570 ? 10 : 14,
  },

  dailyForecastCardDegree: {
    color: "white",
  },
});
