import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../../../constants/colors";
import { useState } from "react";
import { handleRegister, resetFields } from "../../function";
import { hideModal, showModal } from "../../../../store/slices/modal";

const RegisterJSX = (props: { setHasAnAccount: Function; navigation: any }) => {
  const { setHasAnAccount, navigation } = props;
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegisterPress = () => {
    handleRegister({
      dispatch,
      showModal,
      email,
      password,
      confirmPassword,
      name,
      navigation,
    });
  };

  return (
    <View style={{ width: "100%" }}>
      <Text style={styles.titleText}>Sign up</Text>
      <View>
        <View style={styles.inputContainer}>
          <AntDesign
            style={styles.icon}
            name="mail"
            size={24}
            color={colors.primary}
          />
          <TextInput
            style={styles.textInput}
            value={email}
            placeholder="e.g johndoe@email.com"
            autoCapitalize={"none"}
            onChange={(e) => setEmail(e.nativeEvent.text)}
          ></TextInput>
        </View>
        <View style={styles.inputContainer}>
          <AntDesign
            style={styles.icon}
            name="user"
            size={24}
            color={colors.primary}
          />
          <TextInput
            style={styles.textInput}
            value={name}
            placeholder="e.g John Doe"
            onChange={(e) => setName(e.nativeEvent.text)}
            secureTextEntry={false}
          ></TextInput>
        </View>

        <View style={styles.inputContainer}>
          <AntDesign
            style={styles.icon}
            name="lock"
            size={24}
            color={colors.primary}
          />
          <TextInput
            style={styles.textInput}
            onChange={(e) => setPassword(e.nativeEvent.text)}
            value={password}
            placeholder="Password"
            secureTextEntry={true}
          ></TextInput>
        </View>

        <View style={styles.inputContainer}>
          <AntDesign
            style={styles.icon}
            name="lock"
            size={24}
            color={colors.primary}
          />
          <TextInput
            style={styles.textInput}
            onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
            value={confirmPassword}
            placeholder="Confirm Password"
            secureTextEntry={true}
          ></TextInput>
        </View>
      </View>
      <Text style={styles.greyText}>
        By signing up you agree to our terms and conditions and privacy policy
      </Text>
      <TouchableOpacity style={styles.blueBtn} onPress={handleRegisterPress}>
        <View style={{ flexDirection: "row" }}>
          <AntDesign
            style={styles.icon}
            name="login"
            size={24}
            color={"white"}
          />
          <Text
            style={{
              color: "white",
              fontFamily: "Poppins_600SemiBold",
              textAlign: "center",
              fontSize: 16,
            }}
          >
            Continue
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setHasAnAccount();
          dispatch(hideModal());
          resetFields({ setEmail, setName, setPassword, setConfirmPassword });
        }}
      >
        <Text style={{ ...styles.accountText, color: colors.primary }}>
          Already have an account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "lightgrey",
    alignItems: "center",
    marginVertical: 10,
  },
  imgContainer: {
    width: "100%",
    alignItems: "center",
  },
  img: {
    width: 250,
    height: 250,
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    padding: 10,
    fontSize: 16,
    flex: 1,
    fontFamily: "Poppins_400Regular",
    flexDirection: "row",
    alignItems: "center",
  },
  blueBtn: {
    padding: 12.5,
    backgroundColor: colors.primary,
    borderRadius: 15,
    marginVertical: 5,
    alignItems: "center",
  },
  greyBtn: {
    padding: 12.5,
    backgroundColor: colors.secondary,
    borderRadius: 15,
    marginVertical: 5,
    alignItems: "center",
  },
  titleText: {
    fontSize: 36,
    fontFamily: "Poppins_600SemiBold",
    marginVertical: 15,
    textAlign: "left",
    color: colors.primary,
  },
  greyText: {
    color: "grey",
    marginVertical: 15,
    textAlign: "left",
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  accountText: {
    textAlign: "center",
    marginVertical: 15,
    color: colors.primary,
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
  },
});

export default RegisterJSX;
