import React from "react";
import { AppProps } from "next/app";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export const FirebaseContext = React.createContext<firebase.app.App | null>(
  null
);

export default ({ Component, pageProps }: AppProps) => {
  const [fbApp, setFbApp] = React.useState<firebase.app.App | null>(null);
  React.useEffect(() => {
    const app = firebase.initializeApp({
      apiKey: "AIzaSyCpMgSWIsPXqGpvurNfL2c0cu18iuOkA6U",
      authDomain: "virtual-clap.firebaseapp.com",
      databaseURL: "https://virtual-clap.firebaseio.com",
      projectId: "virtual-clap",
      storageBucket: "virtual-clap.appspot.com",
      messagingSenderId: "232690720473",
      appId: "1:232690720473:web:ecf1c631e38ada0655a8c8",
    });

    setFbApp(app);
  }, []);

  return (
    <FirebaseContext.Provider value={fbApp}>
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
};
