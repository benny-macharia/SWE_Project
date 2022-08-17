import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import SubPage from "../../../components/sub-page";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../constants/colors";
import { useDispatch } from "react-redux";
import { dispatchHomeData } from "../../../store/slices/home";
import { hideModal, showModal } from "../../../store/slices/modal";
import * as Device from "expo-device";

const AddEvent = (props: { navigation: any; backPress: any; data?: any }) => {
  const { navigation, backPress, data } = props;
  const dispatch = useDispatch();
  const [settingReminder, setSettingReminder] = useState(false);

  const [textInput, setTextInput] = useState<string>("");
  const [date, setDate] = useState<number>(0);

  const handleDate = (val: any) => {
    setDate(val.nativeEvent.timestamp);
  };
  const handleSubmit = () => {
    const data = {
      title: textInput,
      date: date,
    };
    dispatch(dispatchHomeData(data));
    dispatch(
      showModal({
        type: "success",
        messages: ["Succesfully added reminder"],
      })
    );
    setTimeout(() => dispatch(hideModal()), 3000);
    backPress();
  };
  return (
    <>
      <SubPage
        backPress={backPress}
        name="Add Reminder"
        navigation={navigation}
      >
        <View style={styles.card}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.textTitle}>Title</Text>
          </View>
          <TextInput
            multiline
            onChangeText={(text) => setTextInput(text)}
            style={styles.textInput}
            placeholder="e.g. Computer networks cat"
          />
        </View>

        <View style={styles.card}>
          <TouchableOpacity onPress={() => setSettingReminder((curr) => !curr)}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                style={{ marginRight: 10 }}
                name="time-outline"
                size={28}
                color={colors.primary}
              />
              <Text style={styles.textTitle}>Set reminder</Text>
            </View>
          </TouchableOpacity>
          {settingReminder && (
            <DateTimePicker
              value={new Date()}
              minimumDate={new Date()}
              onChange={handleDate}
            />
          )}
        </View>
        {Device.osName !== "Android" && (
          <TouchableOpacity
            style={{ ...styles.doneBtn, bottom: -100 }}
            onPress={handleSubmit}
          >
            <Text style={{ fontFamily: "Poppins_400Regular", color: "white" }}>
              Done
            </Text>
            <Ionicons
              style={{ marginLeft: 10 }}
              name="arrow-forward"
              size={24}
              color="white"
            />
          </TouchableOpacity>
        )}
      </SubPage>
      {Device.osName === "Android" && (
        <TouchableOpacity style={styles.doneBtn} onPress={handleSubmit}>
          <Text style={{ fontFamily: "Poppins_400Regular", color: "white" }}>
            Done
          </Text>
          <Ionicons
            style={{ marginLeft: 10 }}
            name="arrow-forward"
            size={24}
            color="white"
          />
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    padding: 10,
  },
  textTitle: {
    fontSize: 20,
    fontFamily: "Poppins_400Regular",
    marginVertical: 10,
  },
  textInput: {
    fontFamily: "Poppins_400Regular",
  },
  doneBtn: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    bottom: 25,
    right: 25,
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 15,
    zIndex: 99999999999999999999999999,
  },
});

export default AddEvent;
