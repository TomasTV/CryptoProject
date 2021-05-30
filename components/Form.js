import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

const Form = ({
  currency,
  cryptocurrency,
  setCurrency,
  setCryptocurrency,
  setConsultAPI,
}) => {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    const consultAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const result = await axios.get(url);
      setCryptos(result.data.Data);
    };
    consultAPI();
  }, []);

  const obtainCurrency = (currency) => {
    setCurrency(currency);
  };
  const obtainCurrencies = (cripto) => {
    setCryptocurrency(cripto);
  };

  const quotePrice = () => {
    if (currency.trim() === "" || cryptocurrency.trim() === "") {
      showAlert();
      return;
    }
    setConsultAPI(true);
  };

  const showAlert = () => {
    Alert.alert("Error...", "Both fields are required", [{ text: "OK" }]);
  };

  return (
    <View>
      <Text style={styles.label}>Currency</Text>
      <Picker
        selectedValue={currency}
        onValueChange={(currency) => obtainCurrency(currency)}
        itemStyle={{ height: 120 }}
      >
        <Picker.Item label="- Seleccione -" value="" />
        <Picker.Item label="United States Dollar" value="USD" />
        <Picker.Item label="Argentine Peso" value="ARS" />
        <Picker.Item label="Euro" value="EUR" />
        <Picker.Item label="Pound Sterling" value="GBP" />
      </Picker>

      <Text style={styles.label}>Cryptocurrency</Text>
      <Picker
        selectedValue={cryptocurrency}
        onValueChange={(cryptos) => obtainCurrencies(cryptos)}
        itemStyle={{ height: 120 }}
      >
        <Picker.Item label="- Seleccione -" value="" />
        {cryptos.map((cripto) => (
          <Picker.Item
            key={cripto.CoinInfo.Id}
            label={cripto.CoinInfo.FullName}
            value={cripto.CoinInfo.Name}
          />
        ))}
      </Picker>
      <TouchableHighlight style={styles.btnQuote} onPress={() => quotePrice()}>
        <Text style={styles.textQuote}>Quote</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: "Lato-Black",
    textTransform: "uppercase",
    fontSize: 22,
    marginVertical: 20,
  },
  btnQuote: {
    backgroundColor: "#5E49E2",
    padding: 10,
    marginTop: 20,
  },
  textQuote: {
    color: "#FFF",
    fontSize: 18,
    fontFamily: "Lato-Black",
    textTransform: "uppercase",
    textAlign: "center",
  },
});

export default Form;
