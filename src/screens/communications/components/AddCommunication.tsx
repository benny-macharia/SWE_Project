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
import { dispatchCommunicationData } from "../../../store/slices/communications";
import { hideModal, showModal } from "../../../store/slices/modal";
import * as Device from "expo-device";

const AddCommunication = (props: { navigation: any; backPress: any }) => {
  const { navigation, backPress } = props;
  const dispatch = useDispatch();
  const [settingStartTime, setStartTime] = useState(false);

  const [date, setDate] = useState<number>(0);
  const [textInput, setTextInput] = useState<string>("");

  // === subject ===
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [items, setItems] = useState([
    "Web Applications",
    "Software Engineering",
    "IS Project",
    "Data Structures",
    "Marketing",
    "Computer Networks",
    "OOP",
    "Statistics",
  ]);
  const handleDate = (val: any) => {
    setDate(val.nativeEvent.timestamp);
  };
  const handleSubmit = () => {
    const data = {
      title: textInput,
      subject: value,
      date,
    };
    dispatch(dispatchCommunicationData(data));
    dispatch(
      showModal({
        type: "success",
        messages: ["Succesfully added communication"],
      })
    );
    setTimeout(() => dispatch(hideModal()), 3000);
    backPress();
  };

  return (
    <>
      <SubPage
        backPress={backPress}
        name="New Communication"
        navigation={navigation}
      >
        <View style={styles.card}>
          <Text style={styles.textTitle}>Describe your communication</Text>
          <TextInput
            multiline
            onChangeText={(text) => setTextInput(text)}
            style={styles.textInput}
            placeholder="e.g. Do group discussion on the next Software engineering class"
          />
        </View>

        <View style={styles.card}>
          <TouchableOpacity
            onPress={() => setOpen(true)}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Text style={{ ...styles.textTitle, flex: 10 }}>
              {value ? value : "Select subject"}
            </Text>
            <Ionicons
              style={{ marginLeft: 10, flex: 1 }}
              name="chevron-down-outline"
              size={24}
              color={colors.primary}
            />
          </TouchableOpacity>
          {open && (
            <View>
              {items.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setValue(item);
                      setOpen(false);
                    }}
                    key={index}
                    style={styles.card}
                  >
                    <Text key={index} style={styles.text}>
                      {index + 1}. {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>

        <View style={styles.card}>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => setStartTime((curr) => !curr)}
          >
            <Ionicons
              style={{ marginRight: 10 }}
              name="time-outline"
              size={28}
              color={colors.primary}
            />
            <Text style={styles.textTitle}>Set date</Text>
          </TouchableOpacity>
          {settingStartTime && (
            <DateTimePicker
              mode="time"
              value={new Date()}
              minimumDate={new Date()}
              onChange={handleDate}
            />
          )}
          {Device.osName !== "Android" && (
            <TouchableOpacity style={{...styles.doneBtn, bottom: -100}} onPress={handleSubmit}>
              <Text
                style={{ fontFamily: "Poppins_400Regular", color: "white" }}
              >
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
        </View>
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
  text: {
    fontFamily: "Poppins_400Regular",
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

export default AddCommunication;
