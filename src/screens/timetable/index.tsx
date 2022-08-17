import { View, StyleSheet, Text } from "react-native";
import Authorized from "../../components/authrized";
import BottomNav from "../../components/bottom-nav";
import { global } from "../../constants/global";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import Button from "../../components/button";
import { useState } from "react";
import AddToTimetable from "./components/AddToTimetable";
import { useSelector } from "react-redux";

const TimetableScreen = (props: { navigation: any }) => {
  const { navigation } = props;
  const { timetable } = useSelector((state) => state.timetable);
  const [state, setState] = useState(false);
  const data = [...timetable];
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
        <AddToTimetable navigation={navigation} backPress={handleButtonPress} />
      )}
      <Authorized navigation={navigation}>
        <View style={{ width: "100%" }}>
          <Text style={global.styles.mainPageText}>Timetable</Text>

          <View style={global.styles.container}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="book-outline" size={28} color={colors.primary} />
              <Text style={styles.textTitle}>Monday</Text>
            </View>
            {data.map((item, index) => {
              if (item.day === "Monday") {
                return <RenderItem key={index} item={item} />;
              }
            })}
          </View>

          <View style={global.styles.container}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="book-outline" size={28} color={colors.primary} />
              <Text style={styles.textTitle}>Tuesday</Text>
            </View>
            {data.map((item, index) => {
              if (item.day === "Tuesday") {
                return <RenderItem key={index} item={item} />;
              }
            })}
          </View>

          <View style={global.styles.container}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="book-outline" size={28} color={colors.primary} />
              <Text style={styles.textTitle}>Wednesday</Text>
            </View>
            {data.map((item, index) => {
              if (item.day === "Wednesday") {
                return <RenderItem key={index} item={item} />;
              }
            })}
          </View>

          <View style={global.styles.container}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="book-outline" size={28} color={colors.primary} />
              <Text style={styles.textTitle}>Thursday</Text>
            </View>
            {data.map((item, index) => {
              if (item.day === "Thursday") {
                return <RenderItem key={index} item={item} />;
              }
            })}
          </View>

          <View style={global.styles.container}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="book-outline" size={28} color={colors.primary} />
              <Text style={styles.textTitle}>Friday</Text>
            </View>
            {data.map((item, index) => {
              if (item.day === "Friday") {
                return <RenderItem key={index} item={item} />;
              }
            })}
          </View>

          <View style={global.styles.container}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="book-outline" size={28} color={colors.primary} />
              <Text style={styles.textTitle}>Saturday</Text>
            </View>
            {data.map((item, index) => {
              if (item.day === "Saturday") {
                return <RenderItem key={index} item={item} />;
              }
            })}
          </View>

          <View style={global.styles.container}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="book-outline" size={28} color={colors.primary} />
              <Text style={styles.textTitle}>Sunday</Text>
            </View>
            {data.map((item, index) => {
              if (item.day === "Sunday") {
                return <RenderItem key={index} item={item} />;
              }
            })}
          </View>
        </View>
      </Authorized>
      <Button type="plus" onPress={handleButtonPress} />
      <BottomNav navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
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

export default TimetableScreen;
