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
import { dispatchTimetableData } from "../../../store/slices/timetable";
import { hideModal, showModal } from "../../../store/slices/modal";
import * as Device from "expo-device";

const AddToTimetable = (props: { navigation: any; backPress: any }) => {
  const { navigation, backPress } = props;
  const dispatch = useDispatch();
  const [settingStartTime, setStartingTime] = useState(false);
  const [settingStopTime, setStopTime] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);

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

  // === day ===
  const [openDay, setOpenDay] = useState(false);
  const [valueDay, setValueDay] = useState("");
  const [itemsDay, setItemsDay] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Saturday",
    "Sunday",
  ]);

  const handleDate = (mode: string, val: any) => {
    if (mode === "start") {
      setStartTime(val.nativeEvent.timestamp);
    } else {
      setEndTime(val.nativeEvent.timestamp);
    }
  };
  const handleSubmit = () => {
    const data = {
      subject: value,
      day: valueDay,
      startTime,
      endTime,
    };
    dispatch(dispatchTimetableData(data));
    dispatch(
      showModal({
        type: "success",
        messages: ["Succesfully item to timetable"],
      })
    );
    setTimeout(() => dispatch(hideModal()), 3000);
    backPress();
  };

  return (
    <>
      <SubPage
        backPress={backPress}
        name="Add To Timetable"
        navigation={navigation}
      >
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
            onPress={() => setOpenDay(true)}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Text style={{ ...styles.textTitle, flex: 10 }}>
              {valueDay ? valueDay : "Select day"}
            </Text>

            <Ionicons
              style={{ marginLeft: 10, flex: 1 }}
              name="chevron-down-outline"
              size={24}
              color={colors.primary}
            />
          </TouchableOpacity>
          {openDay && (
            <View>
              {itemsDay.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setValueDay(item);
                      setOpenDay(false);
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
            onPress={() => setStartingTime((curr) => !curr)}
          >
            <Ionicons
              style={{ marginRight: 10 }}
              name="time-outline"
              size={28}
              color={colors.primary}
            />
            <Text style={styles.textTitle}>Set start time</Text>
          </TouchableOpacity>
          {settingStartTime && (
            <DateTimePicker
              mode="time"
              value={new Date()}
              minimumDate={new Date()}
              onChange={(val) => handleDate("start", val)}
            />
          )}
        </View>

        <View style={styles.card}>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => setStopTime((curr) => !curr)}
          >
            <Ionicons
              style={{ marginRight: 10 }}
              name="time-outline"
              size={28}
              color={colors.primary}
            />
            <Text style={styles.textTitle}>Set end time</Text>
          </TouchableOpacity>
          {settingStopTime && (
            <DateTimePicker
              mode="time"
              value={new Date()}
              minimumDate={new Date()}
              onChange={(val) => handleDate("end", val)}
            />
          )}
        </View>
        {Device.osName !== "Android" && (
          <TouchableOpacity style={styles.doneBtnIOS} onPress={handleSubmit}>
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
  text: {
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
  doneBtnIOS: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    bottom: -100,
    right: 25,
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 15,
    zIndex: 99999999999999999999999999,
  },
});

export default AddToTimetable;
