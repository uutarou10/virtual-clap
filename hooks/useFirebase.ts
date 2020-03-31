import React from "react";
import { FirebaseContext } from "../pages/_app";

export default () => {
  return React.useContext(FirebaseContext);
};
