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
        <td><img src="${doc.data().Cover}"></td>
        <td>${doc.data().judulBuku}</td>
        <td>${doc.data().pengarangBuku}</td>
        <td>${doc.data().Kategori}</td>
        <td><a href="${doc.data().Document}">Download</a></td>
        <td>
          <button class="btn btn-edit">Edit</button>
          <button class="btn btn-delete">Delete</button>
        </td>
      </tr>  
    `;
    tableUsers.insertAdjacentHTML("beforeend", tr);
    console.log()

  //Edit book

const btnEdit = document.querySelector(`[data-id= '${doc.id}'] .btn-edit`);

  btnEdit.addEventListener("click", () => {
    editModal.classList.add("modal-show");

    id = doc.id;

    editModalForm.Cover.value = doc.data().Cover;
    editModalForm.judulBuku.value = doc.data().judulBuku;
    editModalForm.pengarangBuku.value = doc.data().pengarangBuku;
    editModalForm.Kategori.value = doc.data().Kategori;
    editModalForm.Document.value = doc.data().Document;
  });

  //Delete book
  const btnDelete = document.querySelector(
    `[data-id= '${doc.id}'] .btn-delete`
  );
  btnDelete.addEventListener("click", () => {
    const confirm = window.confirm("Do you really want to remove the selected book?");

    if (confirm) {
      db.collection("users")
        .doc(`${doc.id}`)
        .delete()
        .then(() => {
          // console.log("Document successfully");
        })
        .catch((error) => console.log("Error removing document ", error));
    }
  });
}

btnAdd.addEventListener("click", () => {
  addModal.classList.add("modal-show");

  addModalForm.Cover.value = "";
  addModalForm.judulBuku.value = "";
  addModalForm.pengarangBuku.value = "";
  addModalForm.Kategori.value = "";
  addModalForm.Document.value = "";
});

window.addEventListener("click", (e) => {
  if (e.target === addModal) {
    addModal.classList.remove("modal-show");
  }

  if (e.target === editModal) {
    editModal.classList.remove("modal-show");
  }
});

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCo7EG8H3qkGEYgPyOflOyxCAYS-nwtS-c",
  authDomain: "databasebuku-122eb.firebaseapp.com",
  projectId: "databasebuku-122eb",
  storageBucket: "databasebuku-122eb.appspot.com",
  messagingSenderId: "381449457182",
  appId: "1:381449457182:web:253fe9f1252312652ea80f"
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

    if (change.type === "removed") {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableUsers.removeChild(tbody);
    }

    if (change.type === "modified") {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableUsers.removeChild(tbody);
      renderUser(change.doc);
    }
  });
});

addModalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("users").add({
    Cover: addModalForm.Cover.value,
    judulBuku: addModalForm.judulBuku.value,
    pengarangBuku: addModalForm.pengarangBuku.value,
    Kategori: addModalForm.Kategori.value,
    Document: addModalForm.Document.value,
  });
  modalWrapper.classList.remove("modal-show");
});

editModalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("users").doc(id).update({
    Cover: editModalForm.Cover.value,
    judulBuku: editModalForm.judulBuku.value,
    pengarangBuku: editModalForm.pengarangBuku.value,
    Kategori: editModalForm.Kategori.value,
    Document: editModalForm.Document.value,
  });
  editModal.classList.remove("modal-show");
});
