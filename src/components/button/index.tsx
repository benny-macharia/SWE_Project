import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-navigation";
import * as Device from "expo-device";

type buttonProps = {
  onPress: any;
  name?: string;
  type: "plus" | "remove" | "custom";
  icon?: any;
};
const Button = (props: buttonProps) => {
  const { onPress, type, name, icon } = props;
  const setIcon = (type: "plus" | "remove" | "custom") => {
    switch (type) {
      case "plus":
        return <AntDesign name="plus" size={24} color="black" />;
      case "remove":
        return <Ionicons name="ios-exit-outline" size={24} color="black" />;
      case "custom":
        return icon;
    }
  };
  return (
    <SafeAreaView style={styles.button}>
      <TouchableOpacity onPress={onPress}>{setIcon(type)}</TouchableOpacity>
      {name && <Text>{name}</Text>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: Device.osName !== "Android" ? 125 : 75,
    right: 25,
    padding: 15,
    zIndex: 999999999,
    borderRadius: 100,
    backgroundColor: "#ddd",
    shadowColor: "#aaa",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    flexDirection: "row",
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
});

export default Button;
