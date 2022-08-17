import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import HomeScreen from "./home";
import AuthScreen from "./auth";
import TimetableScreen from "./timetable";
import CommunicationsScreen from "./communications";
import TrackTimeScreen from "./track-time";

const screens = {
  Auth: {
    screen: AuthScreen,
    navigationOptions: {
      header: null,
    },
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
    },
  },
  Timetable: {
    screen: TimetableScreen,
    navigationOptions: {
      header: null,
    },
  },
  Communications: {
    screen: CommunicationsScreen,
    navigationOptions: {
      header: null,
    },
  },
  TrackTime: {
    screen: TrackTimeScreen,
    navigationOptions: {
      header: null,
    },
  },
};

const SignedInStack = createStackNavigator(screens);

export default createAppContainer(SignedInStack);
