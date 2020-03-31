import React from "react";
import useFirebase from "../../../hooks/useFirebase";
import { useRouter } from "next/router";
import firestore from "../../../firestore";
import { Howl, Howler } from "howler";

export default () => {
  const router = useRouter();
  const fbApp = useFirebase();
  const roomId = router.query.id as string;
  const howlRef = React.useRef<Howl>();

  React.useEffect(() => {
    howlRef.current = new Howl({ src: "/fes_clapping.mp3", preload: true });
    (async () => {
      if (fbApp) {
        firestore.subscribeClaps(fbApp, roomId, () => {
          howlRef.current?.play();
        });
      }
    })();
  }, [fbApp, roomId]);

  return (
    <div>
      <div>音が出る画面だよ！</div>
      <div>このページを閉じれば音が止まります</div>
    </div>
  );
};
