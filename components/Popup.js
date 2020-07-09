import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Dimensions,
  Animated,
  Easing,
} from "react-native";

let screenHeight = Dimensions.get("window").height;

function Popup({ onReTry, userWon }) {
  const top = useState(new Animated.Value(screenHeight))[0]
  const AnimatedView = Animated.createAnimatedComponent(View);

  const startAnimation = () => {
    Animated.timing(top, {toValue: -50,useNativeDriver: false, easing: Easing.out(Easing.ease), duration:1000}).start();
  }

  useEffect(() => {
    startAnimation();
  }, []);
 
  

  return (
    <View style={styles.container}>
        <AnimatedView style={[{marginTop: top}, styles.modalView]}>
        
      <Text style={styles.title}>{userWon ? "You won" : "You lose"}</Text>
      <Button title="Try Again" onPress={onReTry} />
        </AnimatedView>
    </View>
  );
}

export default Popup;

const styles = StyleSheet.create({
  
  container: {
    position: "absolute",
  },
  modalView: {
    width: 200,
    alignItems: "center",
    backgroundColor: '#fff',

    shadowColor: "#000",
    paddingVertical:20,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    marginVertical: 20,
    fontSize: 30,
    fontWeight: "bold",
  },
});
