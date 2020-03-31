import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import useFirebase from "../../hooks/useFirebase";
import firestore from "../../firestore";
import { Room } from "../../models/Room";

export default () => {
  const router = useRouter();
  const fbApp = useFirebase();
  const roomId = router.query.id as string;
  const [room, setRoom] = React.useState<null | Room>(null);
  const [isTouching, setIsTouching] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      if (fbApp) {
        setRoom(await firestore.getRoom(fbApp, roomId));
      }
    })();
  }, [fbApp, roomId]);

  const onClap = React.useCallback(async () => {
    if (fbApp && room) {
      await firestore.addClap(fbApp, room.id);
      console.log("👏Clapped!");
    }
  }, [room, fbApp]);

  const touchEventHandler = (e: any) => {
    switch (e.type) {
      case "mousedown":
      case "touchstart": {
        setIsTouching(true);
        return;
      }

      case "mouseup":
      case "touchcancel":
      case "touchend": {
        setIsTouching(false);
        return;
      }
    }
  };

  return (
    <>
      <Head>
        <title>バーチャル拍手(beta)</title>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
        />
      </Head>
      <div className="container">
        <div className="circle-container">
          <div
            className="circle-container-inner"
            onClick={onClap}
            onTouchStart={touchEventHandler}
            onTouchEnd={touchEventHandler}
            onTouchCancel={touchEventHandler}
            onMouseDown={touchEventHandler}
            onMouseUp={touchEventHandler}
          >
            <img
              className="clap-image"
              src={isTouching ? "/clap_clapping.svg" : "/clap_normal.svg"}
              alt="clap button"
            />
          </div>
        </div>
      </div>
      <style jsx global>{`
        body {
          margin: 0;
          background-color: #01dc50;
        }

        * {
          user-select: none;
          touch-action: manipulation;
        }
      `}</style>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          overflow: hidden;
        }

        .circle-container {
          background-color: #74f7a3;
          border-radius: 50%;
        }

        .circle-container-inner {
          transition: margin 0.3s;
          background-color: white;
          border-radius: 50%;
          margin: ${isTouching ? "65px" : "45px"};
        }

        .clap-image {
          width: 280px;
          height: 280px;
          margin: 50px;
        }
      `}</style>
    </>
  );
};
