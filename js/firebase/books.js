const modalWrapper = document.querySelector(".modal-wrapper");

//modal Add

const addModal = document.querySelector(".add-modal");

const addModalForm = document.querySelector(".add-modal .form");

const btnAdd = document.querySelector(".btn-add");

const cardUsers = document.querySelector(".card-users");

let id;

const renderUser = (doc) => {
  const tr = `
      <div  data-id=${doc.id} class="card h-100">
      <!-- Sale badge-->
      <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">${doc.data().Kategori}</div>
      <!-- Product image-->
      <img class="card-img-top" src="${doc.data().Cover}" alt="..." />
      <!-- Product details-->
      <div class="card-body p-4">
          <div class="text-center">
              <!-- Product name-->
              <h5 class="fw-bolder">${doc.data().judulBuku}</h5>
              <!-- Product price-->
              <span class="text-muted text-decoration-line-through"></span>
              ${doc.data().pengarangBuku}
          </div>
      </div>
      <!-- Product actions-->
      <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="${doc.data().Document}" Target=_blank>Download</a></div>
      </div>
  </div>
    `;
  cardUsers.insertAdjacentHTML("beforeend", tr);
};

window.addEventListener("click", (e) => {
  if (e.target === addModal) {
    addModal.classList.remove("modal-show");
  }

  if (e.target === editModal) {
    editModal.classList.remove("modal-show");
  }
});

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

