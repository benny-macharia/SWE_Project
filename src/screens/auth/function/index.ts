import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { hideModal } from "../../../store/slices/modal";

type passwordValidationProps = {
  password: string;
  confirmPassword: string;
};
export const passwordValid = (props: passwordValidationProps) => {
  const { password, confirmPassword } = props;
  const condition1 = password.trim() === confirmPassword.trim();
  const condition2 = password.trim() !== "" && password.trim() !== "";
  const condition3 = password.trim().length >= 6;
  if (condition1 && condition2 && condition3) {
    return true;
  }
  return false;
};

export const emailValid = (email: string) => {
  const regex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/);
  return regex.test(email);
};

type resetFieldsType = {
  setEmail: Function;
  setName: Function;
  setPassword: Function;
  setConfirmPassword: Function;
};
export const resetFields = (props: resetFieldsType) => {
  const { setConfirmPassword, setEmail, setName, setPassword } = props;
  setEmail("");
  setName("");
  setPassword("");
  setConfirmPassword("");
};

type loginResetFieldsType = {
  setEmail: Function;
  setPassword: Function;
};
export const loginResetFields = (props: loginResetFieldsType) => {
  const { setEmail, setPassword } = props;
  setEmail("");
  setPassword("");
};

export const notempty = (
  mode: string,
  email: string,
  password: string,
  confirmPassword?: string,
  name?: string
) => {
  if (mode === "login") {
    return email.trim() && password.trim();
  }
  return (
    email.trim() && name?.trim() && password.trim() && confirmPassword?.trim()
  );
};

type handleRegisterProps = {
  dispatch: Function;
  showModal: Function;
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  navigation: any;
};
export const handleRegister = (props: handleRegisterProps) => {
  const { showModal, email, password, confirmPassword, name, dispatch, navigation } = props;
  const auth = getAuth();
  if (!notempty("register", email, password, confirmPassword, name)) {
    dispatch(
      showModal({ type: "error", messages: ["Please fill out every section"] })
    );
    return;
  }
  const passwordValidation = passwordValid({ password, confirmPassword });
  const emailValidation = emailValid(email);
  if (passwordValidation && emailValidation) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        dispatch(
          showModal({
            type: "success",
            messages: ["User successfully created"],
          })
        );

        setTimeout(() => dispatch(hideModal()), 3000);
        navigation.navigate("Home");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        dispatch(showModal({ type: "error", messages: [errorMessage] }));
        // ..
      });
  } else {
    if (!passwordValidation && !emailValidation) {
      dispatch(
        showModal({
          type: "error",
          messages: [
            "Please make sure your email address is in a valid format",
            "Please make sure your password is atleast 6 characters long and the confirmation password matches your password",
          ],
        })
      );
      return;
    }

    if (!emailValidation) {
      dispatch(
        showModal({
          type: "error",
          messages: [
            "Please make sure your email address is in a valid format",
          ],
        })
      );
      return;
    }
    if (!passwordValidation) {
      dispatch(
        showModal({
          type: "error",
          messages: [
            "Please make sure your confirmation password matches your password",
          ],
        })
      );
      return;
    }
  }
};

type handleLoginProps = {
  dispatch: Function;
  service: string;
  password: string;
  email: string;
  showModal: Function;
  navigation: any;
};
export const handleLogin = (props: handleLoginProps) => {
  const { service, showModal, email, password, dispatch, navigation } = props;
  if (!notempty("login", email, password)) {
    dispatch(
      showModal({
        type: "error",
        messages: ["Please fill out every section"],
      })
    );
    return;
  }
  if (service != "google" && !emailValid(email)) {
    dispatch(
      showModal({
        type: "error",
        messages: ["Please make sure your email address is in a valid format"],
      })
    );
    return;
  }
  if (service === "google") {
    // Using Google to login
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user; // To the db
        dispatch(
          showModal({
            type: "success",
            messages: ["User successfully signed in"],
          })
        );
        setTimeout(() => dispatch(hideModal()), 3000);

        // User is logged in at this point, redirect to the main page
        navigation.navigate("Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        dispatch(showModal({ type: "error", messages: [errorMessage] }));
      });
  } else {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        dispatch(
          showModal({
            type: "success",
            messages: ["User successfully signed in"],
          })
        );
        setTimeout(() => dispatch(hideModal()), 3000);
        navigation.navigate("Home");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        dispatch(showModal({ type: "error", messages: [errorMessage] }));
      });
  }
};
