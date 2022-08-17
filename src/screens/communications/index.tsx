import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Authorized from "../../components/authrized";
import BottomNav from "../../components/bottom-nav";
import { colors } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { global } from "../../constants/global";
import Button from "../../components/button";
import AddCommunication from "./components/AddCommunication";
import { useState } from "react";
import { useSelector } from "react-redux";

const CommunicationsScreen = (props: { navigation: any }) => {
  const { navigation } = props;
  const { communication } = useSelector((state) => state.communication);
  const [state, setState] = useState(false);
  const data = [...communication];
  const handleButtonPress = () => {
    setState((curr) => !curr);
  };
  const RenderItem = ({ item }) => {
    return (
      <View style={global.styles.container}>
        <View style={{ flex: 1 }}>
          <Ionicons
            name="bookmark-outline"
            style={{ marginTop: 10 }}
            size={28}
            color={colors.primary}
          />
          <Text style={styles.textTitle}>{item.subject}</Text>
        </View>

        <Text style={styles.text}>{item.title}</Text>
        <Text style={{ color: "grey", marginTop: 10 }}>{item.date}</Text>
        <View
          style={{
            flexDirection: "row",
            marginTop: 15,
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={styles.touch}>
            <Ionicons
              style={{ marginRight: 10, flex: 1 }}
              name="share-outline"
              size={28}
              color="grey"
            />
            <Text style={{ fontFamily: "Poppins_400Regular", flex: 2 }}>
              Share
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touch}>
            <FontAwesome
              style={{ marginRight: 10, flex: 1 }}
              name="edit"
              size={28}
              color="grey"
            />
            <Text style={{ fontFamily: "Poppins_400Regular", flex: 2 }}>
              Edit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <>
      {state && (
        <AddCommunication
          navigation={navigation}
          backPress={handleButtonPress}
        />
      )}
      <Authorized navigation={navigation}>
        <View style={{ width: "100%" }}>
          <Text style={global.styles.mainPageText}>Communications</Text>
          {data.map((item, index) => {
            return <RenderItem key={index} item={item} />;
          })}
        </View>
      </Authorized>
      <BottomNav navigation={navigation} />
      <Button type="plus" onPress={handleButtonPress} />
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
  },
  touch: {
    borderColor: "#ddd",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    width: 115,
    marginRight: 10,
    borderRadius: 15,
  },
});

export default CommunicationsScreen;
