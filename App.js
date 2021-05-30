import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import Header from "./components/Header";
import Form from "./components/Form";
import Quote from "./components/Quote";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

const fetchFonts = () => {
  return Font.loadAsync({
    "Lato-Black": require("./assets/fonts/Lato-Black.ttf"),
    "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
  });
};

const App = () => {
  const [currency, setCurrency] = useState("");
  const [cryptocurrency, setCryptocurrency] = useState("");
  const [consultAPI, setConsultAPI] = useState(false);
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const quoteCryptocurrency = async () => {
      if (consultAPI) {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptocurrency}&tsyms=${currency}`;
        const result = await axios.get(url);
        setLoading(true);
        setTimeout(() => {
          setResult(result.data.DISPLAY[cryptocurrency][currency]);
          setConsultAPI(false);
          setLoading(false);
        }, 1500);
      }
    };
    quoteCryptocurrency();
  }, [consultAPI]);

  const component = loading ? (
    <ActivityIndicator size="large" color="#5E49E2" />
  ) : (
    <Quote result={result} />
  );
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <>
      <ScrollView>
        <Header />
        <Image
          style={styles.image}
          source={require("./assets/img/crypto.png")}
        />
        <View style={styles.content}>
          <Form
            currency={currency}
            cryptocurrency={cryptocurrency}
            setCurrency={setCurrency}
            setCryptocurrency={setCryptocurrency}
            setConsultAPI={setConsultAPI}
          />
        </View>
        <View style={{ marginTop: 40 }}>{component}</View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 150,
    marginHorizontal: "2.5%",
  },
  content: {
    marginHorizontal: "2.5%",
  },
});

export default App;
