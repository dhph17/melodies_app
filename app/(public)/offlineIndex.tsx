import React from "react";
import { StyleSheet, View, Text } from "react-native";

const OfflineIndex = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>You are offline. Please check your internet connection.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  text: {
    fontSize: 18,
    color: "#333",
  },
});

export default OfflineIndex;
