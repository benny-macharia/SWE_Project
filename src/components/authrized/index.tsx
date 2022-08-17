import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import * as Device from "expo-device";

export const Authorized = (props: { children: any; navigation: any }) => {
  const { children, navigation } = props;
  const auth = getAuth();

  return (
    <>
      {Device.osName !== "Android" ? (
        <SafeAreaView>
          <ScrollView contentContainerStyle={styles.container}>
            {children}
          </ScrollView>
        </SafeAreaView>
      ) : (
        <SafeAreaView>
          <ScrollView contentContainerStyle={styles.containerAndroid}>
            {children}
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 25,
    paddingBottom: 100,
  },
  containerAndroid: {
    paddingTop: 50,
    width: "100%",
    paddingBottom: 100,
    paddingHorizontal: 25,
  },
});

export default Authorized;
