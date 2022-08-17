import { View, StyleSheet, Text } from "react-native";
import Authorized from "../../components/authrized";
import BottomNav from "../../components/bottom-nav";
import { global } from "../../constants/global";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { navigate } from "../../store/slices/bottom-nav";
import { Feather } from "@expo/vector-icons";
import Button from "../../components/button";
import { useState } from "react";
import AddEvent from "./components/AddEvent";

const HomeScreen = (props: { navigation: any }) => {
  const { navigation } = props;
  const { home } = useSelector((state) => state.home);
  const state_ = useSelector((state) => state);

  const { timetable } = useSelector((state) => state.timetable);
  const dispatch = useDispatch();
  const [state, setState] = useState(false);

  const data = [...timetable];

  const handlePress = () => {
    dispatch(navigate("TrackTime"));
    navigation.navigate("TrackTime");
  };

  const handleButtonPress = () => {
    setState((curr) => !curr);
  };

  const RenderItem = ({ item }) => {
    return (
      <View style={{ marginVertical: 10 }}>
        <Text style={styles.text}>{item.subject}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text style={{ marginRight: 10, color: "grey", ...styles.text }}>
              {item.startTime}
            </Text>
            <Ionicons name="arrow-forward" size={28} color={colors.primary} />
            <Text style={{ ...styles.text, marginLeft: 10, color: "grey" }}>
              {item.endTime}
            </Text>
          </View>
          <TouchableOpacity style={{ alignSelf: "flex-end", marginTop: -20 }}>
            <Feather name="edit-2" size={24} color="grey" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <>
      {state && (
        <AddEvent navigation={navigation} backPress={handleButtonPress} />
      )}
      <Authorized navigation={navigation}>
        <View style={{ width: "100%" }}>
          <Text style={global.styles.mainPageText}>Home</Text>
          <View style={global.styles.container}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="book-outline" size={28} color={colors.primary} />
              <Text style={styles.textTitle}>Today's schedule</Text>
            </View>
            {data.map((item, index) => {
              return <RenderItem key={index} item={item} />;
            })}
          </View>
          <TouchableOpacity style={styles.track} onPress={handlePress}>
            <Ionicons name="timer-outline" size={28} color="white" />
            <Text style={{ ...styles.text, color: "white" }}>
              Track your time
            </Text>
          </TouchableOpacity>
        </View>
      </Authorized>
      <Button type="plus" onPress={handleButtonPress} />
      <BottomNav navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  track: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    borderRadius: 15,
    marginVertical: 15,
    padding: 15,
  },
  text: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    marginVertical: 5,
  },
  textTitle: {
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold",
    marginVertical: 10,
    marginLeft: 10,
  },
});

export default HomeScreen;
