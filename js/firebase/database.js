// Initialize Cloud Firestore and get a reference to the service
import { getFirestore, doc, collection, getDocs, onSnapshot  } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

if (!window.PUSTAKA) window.PUSTAKA = {};
if (!window.PUSTAKA.firebase) window.PUSTAKA.firebase = {};

const db = getFirestore(window.PUSTAKA.firebase.app);

window.PUSTAKA.firebase.firestore = db;

const unsub = onSnapshot(collection(db, "database", "users", "lists"), (snap) => {
    snap.docs?.map((doc) => {
        const data = doc.data();

        console.log("Current data: ", data);
    })
});