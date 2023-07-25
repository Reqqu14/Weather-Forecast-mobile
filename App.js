import { StyleSheet, View, ImageBackground, Text } from "react-native";
import SearchBar from "./components/SearchBar";
import ForecastCards from "./components/ForecastCards";
import ForecastAdditionalInformations from "./components/ForecastAdditionalInformations";
import Forecast from "./components/Forecast";
import { useState } from "react";
import * as Progress from 'react-native-progress';

export default function App() {
  const [pickedLocation, setLocation] = useState({});
  const [isLoading, setLoading] = useState(true);

  handlePickedLocation = (location) => {   
    setLocation(location);
  };

  return (
    <ImageBackground
      source={require("./assets/images/bg.png")}
      style={styles.imgBackground}
      blurRadius={60}
    >
      <SearchBar pickLocation={handlePickedLocation} visible={isLoading} setLoading={setLoading}/>
      {
        isLoading ? 
        (
            <View style={styles.loadingBar}>
              <Progress.Circle size={250} indeterminate={true} borderWidth={5} thickness={50} />
            </View>
        ) :
        (
        <View style={styles.container}>
          <Forecast location={pickedLocation} />
          <ForecastAdditionalInformations location={pickedLocation} />
          <ForecastCards location={pickedLocation} />
        </View>
        )
      }
    
    
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgBackground: {
    flex: 1,
  },

  loadingBar: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
