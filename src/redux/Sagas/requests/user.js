import app from "../../../configs/Firebase";
import { eventChannel } from "redux-saga";
const departmentsRef = app.firestore().collection("departments");

export function requestGetUser(departmentIds) {
  return eventChannel((emiter) => {

    departmentIds.forEach((departmentId) => {
      departmentsRef
        .doc(departmentId)
        .collection("chats")
        .onSnapshot({ includeMetadataChanges: true }, (snapshot) => {
          const cases = snapshot.docChanges().map((change) => ({
            id: change.doc.id,
            title: change.doc.data(),
          }));

          if (snapshot.docChanges().length !== 0) {
            console.log(snapshot.docChanges()[0].type);
            emiter({
              data: cases,
              departmentId,
              changeType: snapshot.docChanges()[0].type,
            });
          }
        });
    });

    return () => departmentsRef;
  });
}
