const modalWrapper = document.querySelector(".modal-wrapper");

//modal Add

const addModal = document.querySelector(".add-modal");

const addModalForm = document.querySelector(".add-modal .form");

//modal edit

const editModal = document.querySelector(".edit-modal");

const editModalForm = document.querySelector(".edit-modal .form");

const btnAdd = document.querySelector(".btn-add");

const tableBooks = document.querySelector(".table-books");

let id;

const renderBook = (doc) => {
  const tr = `
      <tr data-id=${doc.id}>
        <td>${doc.data().Cover}</td>
        <td>${doc.data().judulBuku}</td>
        <td>${doc.data().pengarangBuku}</td>
        <td>${doc.data().Kategori}</td>
        <td>${doc.data().Document}</td>
        <td>
          <button class="btn btn-edit">Edit</button>
          <button class="btn btn-delete">Delete</button>
        </td>
      </tr>  
    `;
    tableBooks.insertAdjacentHTML("beforeend", tr);
};
  //Edit book

const btnEdit = document.querySelector(`[data-id= '${doc.id}'] .btn-edit`);

  btnEdit.addEventListener("click", () => {
    editModal.classList.add("modal-show");

    id = doc.id;

    editModalForm.Cover.value = doc.data().Cover;
    editModalForm.judulBuku.value = doc.data().judulBuku;
    editModalForm.pengarangBuku.value = doc.data().pengarangBuku;
    editModalForm.Kategori.value = doc.data().Kategori;
    editModalForm.Document.value = doc.data().Kategori;
  });

  //Delete book
  const btnDelete = document.querySelector(
    `[data-id= '${doc.id}'] .btn-delete`
  );
  btnDelete.addEventListener("click", () => {
    const confirm = window.confirm("Do you really want to remove the selected book?");

    if (confirm) {
      db.collection("books")
        .doc(`${doc.id}`)
        .delete()
        .then(() => {
          // console.log("Document successfully");
        })
        .catch((error) => console.log("Error removing document ", error));
    }
  });


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
    apiKey: "AIzaSyCgRxH27CaXwLYkvOdnMD94Xs6Xh7yFHcQ",
    authDomain: "pustaka-digital-130e7.firebaseapp.com",
    projectId: "pustaka-digital-130e7",
    storageBucket: "pustaka-digital-130e7.appspot.com",
    messagingSenderId: "86349896886",
    appId: "1:86349896886:web:93de19df26e5b64f9b5a17"
  };


firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

// //Get all books
// db.collection("books")
//   .get()
//   .then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       renderBook(doc);
//     });
//   });

//Real time listener
db.collection("books").onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      renderBook(change.doc);
    }

    if (change.type === "removed") {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableBooks.removeChild(tbody);
    }

    if (change.type === "modified") {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableBooks.removeChild(tbody);
      renderBook(change.doc);
    }
  });
});

addModalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("books").add({
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
  db.collection("books").doc(id).update({
    Cover: editModalForm.Cover.value,
    judulBuku: editModalForm.judulBuku.value,
    pengarangBuku: editModalForm.pengarangBuku.value,
    Kategori: editModalForm.Kategori.value,
    Document: editModalForm.Document.value,
  });
  editModal.classList.remove("modal-show");
});
