import { useState } from "react";
import { Image, View, StyleSheet, ScrollView } from "react-native";
import LoginJSX from "./components/login";
import icon from "../../assets/imgs/icon.png";
import RegisterJSX from "./components/register";

const AuthScreen = (props: {navigation: any}) => {
  const {navigation } = props;
  const [hasAnAccount, setHasAnAccount] = useState(false);
  const render = () => {
    if (!hasAnAccount) {
      return (
        <RegisterJSX navigation={navigation} setHasAnAccount={() => setHasAnAccount((curr) => !curr)} />
      );
    }
    return (
      <LoginJSX navigation={navigation} setHasAnAccount={() => setHasAnAccount((curr) => !curr)} />
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ width: "100%" }}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={icon} />
        </View>
        {render()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 25,
    paddingVertical: 50,
    zIndex: -1
  },
  imgContainer: {
    width: "100%",
    alignItems: "center",
  },
  img: {
    width: 250,
    height: 250,
  },
});

export default AuthScreen;
