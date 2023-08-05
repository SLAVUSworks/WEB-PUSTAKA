const modalWrapper = document.querySelector(".modal-wrapper");

//modal Add

const addModal = document.querySelector(".add-modal");

const addModalForm = document.querySelector(".add-modal .form");

//modal edit

const editModal = document.querySelector(".edit-modal");

const editModalForm = document.querySelector(".edit-modal .form");

const btnAdd = document.querySelector(".btn-add");

const tableUsers = document.querySelector(".table-users");

let id;

const renderUser = (doc) => {
  const tr = `
      <tr data-id=${doc.id}>
        <td>${doc.data().firstName}</td>
        <td>${doc.data().lastName}</td>
        <td>${doc.data().phone}</td>
        <td>${doc.data().email}</td>
      </tr>  
    `;
  tableUsers.insertAdjacentHTML("beforeend", tr);
};

btnAdd.addEventListener("click", () => {
  addModal.classList.add("modal-show");

  addModalForm.firstName.value = "";
  addModalForm.lastName.value = "";
  addModalForm.phone.value = "";
  addModalForm.email.value = "";
});

window.addEventListener("click", (e) => {
  if (e.target === addModal) {
    addModal.classList.remove("modal-show");
  }

  if (e.target === editModal) {
    editModal.classList.remove("modal-show");
  }
});

const firebaseConfig = {
  apiKey: "AIzaSyAVMYqXtIy0cpCibv9BPkT3fU8lcErf2eA",
  authDomain: "pustaka-digital-3575e.firebaseapp.com",
  databaseURL: "https://pustaka-digital-3575e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pustaka-digital-3575e",
  storageBucket: "pustaka-digital-3575e.appspot.com",
  messagingSenderId: "616121602719",
  appId: "1:616121602719:web:64e2cacc56e171121388aa"
};


firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

// //Get all users
// db.collection("users")
//   .get()
//   .then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       renderUser(doc);
//     });
//   });

//Real time listener
db.collection("users").onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      renderUser(change.doc);
    }
  });
});

addModalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("users").add({
    firstName: addModalForm.firstName.value,
    lastName: addModalForm.lastName.value,
    phone: addModalForm.phone.value,
    email: addModalForm.email.value,
  });
  modalWrapper.classList.remove("modal-show");
});
