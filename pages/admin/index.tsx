import React from "react";
import firestore from "../../firestore";
import useFirebase from "../../hooks/useFirebase";
import { Room } from "../../models/Room";
import Link from "next/link";

export default () => {
  const fbApp = useFirebase();
  const [rooms, setRooms] = React.useState<Room[] | null>(null);

  React.useEffect(() => {
    (async () => {
      if (fbApp) {
        setRooms(await firestore.getRooms(fbApp));
      }
    })();
  }, [fbApp]);

  return (
    <>
      <h2>部屋一覧</h2>
      {rooms ? (
        <ul>
          {rooms.map((room) => (
            <li key={room.id}>
              <div>{room.name}</div>
              <Link href="/admin/player/[id]" as={`/admin/player/${room.id}`}>
                <a>拍手の音が出る画面</a>
              </Link>
              <Link href="/room/[id]" as={`/room/${room.id}`}>
                <a>拍手する画面</a>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
