import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Authorized from "../../components/authrized";
import BottomNav from "../../components/bottom-nav";
import Button from "../../components/button";
import { global } from "../../constants/global";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";

const TrackTimeScreen = (props: { navigation: any }) => {
  const { navigation } = props;
  const data = [
    {
      id: 1,
      title: "Studies",
      startTime: "8:16 AM",
      endTime: "10:16 AM",
      totalTime: "2 hours",
    },
    {
      id: 2,
      title: "Work",
      startTime: "12:15 AM",
      endTime: "1:15 PM",
      totalTime: "1 hours",
    },
    {
      id: 3,
      title: "Project",
      startTime: "3:15 PM",
      endTime: "5:15 PM",
      totalTime: "2 hours",
    },
  ];
  const handleButtonPress = () => {};

  const RenderItem = ({ item }) => {
    return (
      <View style={{ marginVertical: 10 }}>
        <Text style={styles.text}>{item.title}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text style={{ marginRight: 10, color: "grey", ...styles.text }}>
              {item.startTime}
            </Text>
            {item.endTime && (
              <>
                <Ionicons
                  name="arrow-forward"
                  size={28}
                  style={{marginRight: 10}}
                  color={colors.primary}
                />
                <Text style={{ ...styles.text, color: "grey" }}>
                  {item.endTime}
                </Text>
              </>
            )}
          </View>
        </View>
      </View>
    );
  };
  return (
    <>
      <Authorized navigation={navigation}>
        <View style={{ width: "100%" }}>
          <Text style={global.styles.mainPageText}>Track Time</Text>
          <View style={styles.countDown}>
            <Text style={styles.bigText}>00:00:00</Text>
            <TouchableOpacity
              style={{
                backgroundColor: colors.primary,
                marginTop: 25,
                padding: 10,
                borderRadius: 15,
                width: 100,
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 18,
                  color: "white",
                  textAlign: "center",
                }}
              >
                Start
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.card}>
            <Text style={styles.textTitle}>Last 30 days</Text>
          </View>
          <View>
            <View style={global.styles.container}>
              <View
                style={{ flexDirection: "row", alignItems: "center" }}
              ></View>
              {data.map((item, index) => {
                return <RenderItem key={index} item={item} />;
              })}
            </View>
          </View>
        </View>
      </Authorized>
      <BottomNav navigation={navigation} />
      <Button
        icon={<MaterialCommunityIcons name="history" size={24} color="black" />}
        type="custom"
        onPress={handleButtonPress}
      />
    </>
  );
};

const styles = StyleSheet.create({
  countDown: {
    height: 300,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  bigText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 32,
    color: colors.primary,
  },
  card: {
    padding: 10,
    borderColor: "#ddd",
    borderBottomWidth: 1,
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

export default TrackTimeScreen;
