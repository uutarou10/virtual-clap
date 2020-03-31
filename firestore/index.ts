import firebase from "firebase/app";
import { Room } from "../models/Room";

export default {
  async getRoom(app: firebase.app.App, id: string): Promise<Room | null> {
    const querySnapshot = await app
      .firestore()
      .collection("rooms")
      .doc(id)
      .get();
    if (querySnapshot.exists) {
      return {
        id: querySnapshot.id,
        name: querySnapshot.data()!.name,
      };
    } else {
      return null;
    }
  },
  async getRooms(app: firebase.app.App): Promise<Room[]> {
    const querySnapshot = await app.firestore().collection("rooms").get();
    return querySnapshot.docs.map((querySnapshot) => {
      const data = querySnapshot.data();
      return {
        id: querySnapshot.id,
        name: data.name,
      };
    });
  },
  async addClap(app: firebase.app.App, roomId: string): Promise<void> {
    const collectionRef = app
      .firestore()
      .collection("rooms")
      .doc(roomId)
      .collection("claps");
    await collectionRef.add({
      timestamp: firebase.firestore.Timestamp.now(),
    });
  },
  subscribeClaps(
    app: firebase.app.App,
    roomId: string,
    onAddedClap: () => void
  ) {
    return app
      .firestore()
      .collection("rooms")
      .doc(roomId)
      .collection("claps")
      .onSnapshot(onAddedClap);
  },
};
