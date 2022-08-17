import { View, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { colors } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { navigate } from "../../store/slices/bottom-nav";

const BottomNav = (props: any) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const state = useSelector((state) => state.nav.nav);
  const icons = {
    Home: { active: "home" as string, default: "home-outline" as string },
    Timetable: { active: "grid" as string, default: "grid-outline" as string },
    Communications: {
      active: "albums" as string,
      default: "albums-outline" as string,
    },
    TrackTime: {
      active: "timer" as string,
      default: "timer-outline" as string,
    },
  };

  const setIcon = (name: string) => {
    return state === name ? icons[name].active : icons[name].default;
  };

  const handleNavigation = (route: string) => {
    dispatch(navigate(route));
    navigation.navigate(route);
  };
  return (
    <SafeAreaView style={styles.safeViewContainer}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => handleNavigation("Home")}
          style={styles.button}
        >
          <Ionicons name={setIcon("Home")} size={28} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleNavigation("Timetable")}
          style={styles.button}
        >
          <Ionicons
            name={setIcon("Timetable")}
            size={28}
            color={colors.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleNavigation("Communications")}
          style={styles.button}
        >
          <Ionicons
            name={setIcon("Communications")}
            size={28}
            color={colors.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleNavigation("TrackTime")}
          style={styles.button}
        >
          <Ionicons
            name={setIcon("TrackTime")}
            size={28}
            color={colors.primary}
          />
        </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 15
  },
  safeViewContainer: {
    width: "100%",
    display: "flex",
    position: "absolute",
    backgroundColor: "#f0f0f0",
    bottom: 0,
    zIndex: 0,
    borderTopColor: "#ddd",
    borderTopWidth: 1,
  },

  button: {
    alignItems: "center",
    flex: 1,
  },
});

export default BottomNav;
