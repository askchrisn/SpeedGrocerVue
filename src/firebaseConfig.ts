import { ref, onValue, set, push, update, get} from 'firebase/database';
import { db } from "src/boot/firebase"; 

export function attachEvent(key: string, handler: (a: any) => void) {
  var dbRef = ref(db, key);
  return onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
          handler(snapshot.val());
      }
  });
}

export async function getDb(key: string) {
  var dbRef = ref(db, key);
  const snapshot = await get(dbRef);

  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return null;
  }
}

export function pushDb(refUrl: string, obj: any) {
  const dbRef = push(ref(db, refUrl)); // reference to push to
  set(dbRef, obj);                     // push to database
}

export function updateDb(key: string, obj: any) {
  var dbRef = ref(db, key);
  update(dbRef, obj)
}

export function setDb(key: string, obj: any) {
  var dbRef = ref(db, key);
  set(dbRef, obj)
}