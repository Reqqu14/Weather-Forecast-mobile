import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { weatherImages } from "../constants/ImageConstants";
ForecastCards = (props) => {


  return (
    <View>
      <View style={styles.dailyForecastContainer}>
        <AntDesign name="calendar" size={24} color="white" />
        <Text style={styles.dailyForecastText}>Daily Forecast</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.dailyForecastCardsContainer}>
          {
            props.location?.forecast?.forecastday?.map((item, index) => {
              let date = new Date(item.date);
              let options = {weekday: 'long'};
              let dayName = date.toLocaleDateString('en-US', options);
              dayName = dayName.split(',')[0];
              return (
                <View style={styles.dailyForecastCard} key={index}>
                <Image
                  source={weatherImages[item?.day?.condition?.text]}
                  style={styles.dailyForecastCardImage}
                />
                  <Text style={styles.dailyForecastCardDay}>{dayName}</Text>
                  <Text style={styles.dailyForecastCardDegree}>{item?.day?.avgtemp_c}&#176;C</Text>
                </View>
              )
            })
          }
        </View>
      </ScrollView>
    </View>
  );
};

export default ForecastCards;

const styles = StyleSheet.create({
  dailyForecastContainer: {
    marginTop: 15,
    flexDirection: "row",
    padding: 10,
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
    marginHorizontal: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    minWidth: 100
  },

  dailyForecastCardImage: {
    width: 60,
    height: 60,
  },

  dailyForecastCardDay: {
    color: "white",
    fontSize: 14,
  },

  dailyForecastCardDegree: {
    color: "white",
  },
});
