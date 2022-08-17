// @ts-nocheck
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { StrictMode, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import AppLoading from "expo-app-loading";

import IntroSlides from "./src/screens/auth/components/intro-slides";
import Modal from "./src/components/modal";
import { Provider, useSelector } from "react-redux";
import configureStore from "./src/store/index";
import Navigator from "./src/screens";
import * as Device from "expo-device";

const firebaseConfig = {
  apiKey: "AIzaSyCf7QxlLuG4mTgoMs3PTaZThQF2pb4-pMY",
  authDomain: "isproject-67a64.firebaseapp.com",
  projectId: "isproject-67a64",
  storageBucket: "isproject-67a64.appspot.com",
  messagingSenderId: "881095727128",
  appId: "1:881095727128:web:e2be54da46220bb2f8cb6d",
  measurementId: "G-Z8MCBSB2QV",
};
initializeApp(firebaseConfig);

const App = () => {
  return (
    <Provider store={configureStore}>
      <AppChild />
    </Provider>
  );
};

const AppChild = () => {
  const { modal } = useSelector((state) => state.modal);
  const auth = getAuth();
  const [renderApp, setRenderApp] = useState<boolean>(false);
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  const handleAuthSet = () => {
    setRenderApp(true);
  };

  useEffect(() => {
    if (Device.osName === "Android") {
      NavigationBar.setBackgroundColorAsync("#f0f0f0");
    }
    onAuthStateChanged(auth, (user) => {
      if (user) {
        handleAuthSet();
      }
    });
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      {modal.messages.length !== 0 && (
        <Modal type={modal.type} messages={modal.messages} />
      )}
      {!renderApp && <IntroSlides onDone={handleAuthSet} />}

      {renderApp && <Navigator />}
      <StatusBar style="auto" />
    </>
  );
};

export default App;
