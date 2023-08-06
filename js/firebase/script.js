const modalWrapper = document.querySelector(".modal-wrapper");

//modal Add

const addModal = document.querySelector(".add-modal");

const addModalForm = document.querySelector(".add-modal .form");

const btnAdd = document.querySelector(".btn-add");

const tableUsers = document.querySelector(".table-users");

let id;

const renderUser = (doc) => {
  const tr = `
      <tr data-id=${doc.id}>
        <td>${doc.data().firstName}</td>
        <td>${doc.data().lastName}</td>
        <td>${doc.data().phone}</td>
      </tr>  
    `;
  tableUsers.insertAdjacentHTML("beforeend", tr);
};

btnAdd.addEventListener("click", () => {
  addModal.classList.add("modal-show");

  addModalForm.firstName.value = "";
  addModalForm.lastName.value = "";
  addModalForm.phone.value = "";
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
  apiKey: "AIzaSyCgRxH27CaXwLYkvOdnMD94Xs6Xh7yFHcQ",
  authDomain: "pustaka-digital-130e7.firebaseapp.com",
  projectId: "pustaka-digital-130e7",
  storageBucket: "pustaka-digital-130e7.appspot.com",
  messagingSenderId: "86349896886",
  appId: "1:86349896886:web:93de19df26e5b64f9b5a17"
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
  });
  modalWrapper.classList.remove("modal-show");
});

window.setTimeout (function(){
  var oRows = document.getElementById('table').getElementsByTagName('tr');
  var iRowCount = oRows.length;
  

  document.getElementById("jumlahtamu").innerHTML = iRowCount + " " + '<i class="fa-solid fa-person"></i>' ;

  console.log(oRows, iRowCount)
}, 2000
)

