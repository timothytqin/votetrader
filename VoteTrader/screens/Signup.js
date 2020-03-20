import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import { globalStyles, images } from "../styles/global";
import Button from "../components/Button";
import { constants } from "../shared/constants";

const SignupSchema = Yup.object({
  email: Yup.string()
    .email()
    .required(),
  username: Yup.string()
    .required()
    .min(3),
  password: Yup.string()
    .required()
    .min(6),
  passwordRepeat: Yup.string()
    .required()
    .when("password", {
      is: val => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Both password need to be the same"
      )
    })
});

export default function Signup({ signup }) {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ ...globalStyles.container, ...styles.form }}>
        <Image style={styles.logo} source={images.corona} />
        <Formik
          initialValues={{
            email: "",
            username: "",
            password: "",
            passwordRepeat: ""
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, actions) => {
            actions.resetForm();
            signup(values);
          }}
        >
          {props => (
            <View>
              <TextInput
                style={globalStyles.input}
                placeholder="Email Address"
                onChangeText={props.handleChange("email")}
                value={props.values.email}
              />
              <Text style={globalStyles.errorText}>
                {props.touched.email && props.errors.email}
              </Text>
              <TextInput
                style={globalStyles.input}
                placeholder="Username"
                onChangeText={props.handleChange("username")}
                value={props.values.username}
              />
              <Text style={globalStyles.errorText}>
                {props.touched.username && props.errors.username}
              </Text>
              <TextInput
                style={globalStyles.input}
                placeholder="Password"
                onChangeText={props.handleChange("password")}
                value={props.values.password}
                secureTextEntry={true}
              />
              <Text style={globalStyles.errorText}>
                {props.touched.password && props.errors.password}
              </Text>
              <TextInput
                style={globalStyles.input}
                placeholder="Repeat Password"
                onChangeText={props.handleChange("passwordRepeat")}
                value={props.values.passwordRepeat}
                secureTextEntry={true}
              />
              <Text style={globalStyles.errorText}>
                {props.touched.passwordRepeat && props.errors.passwordRepeat}
              </Text>
              <Button text="submit" onPress={props.handleSubmit} />
              <Text style={styles.centerText}>OR</Text>
              <Button text="Sign up with Google" onPress={signup} />
            </View>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  form: { justifyContent: "center" },
  logo: {
    height: 90,
    width: 340
  },
  centerText: {
    textAlign: "center",
    marginVertical: 30,
    fontSize: 20
  }
});
