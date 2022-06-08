import React from "react";
import { View } from "react-native-web";
import { useSelector } from "react-redux";
import Login from "../components/Login";
import Nav from "../components/nav/Nav";

const HomeLogin = () => {
  const userExist = useSelector((state) => state.userData);
  if (userExist.loginSuccess) return <Nav />;
  return <Login />;
};

export default HomeLogin;
