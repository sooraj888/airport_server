const express = require("express");

var { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  getDocs,
} = require("firebase/firestore/lite");
const {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} = require("firebase/storage");
const multer = require("multer");

const firebaseConfig = {
  apiKey: "AIzaSyDDtL9r1gbI43ZPEdANRqWxhoAqLQ60m9U",
  authDomain: "airport-8c441.firebaseapp.com",
  projectId: "airport-8c441",
  storageBucket: "airport-8c441.appspot.com",
  messagingSenderId: "95623185686",
  appId: "1:95623185686:web:2d16fa37cff2e8cf2f3c37",
  measurementId: "G-Y4T61R0N95",
};

const app2 = initializeApp(firebaseConfig);
const db = getFirestore(app2);

const upload = multer({ storage: multer.memoryStorage() });

async function getCities(db) {
  const citiesCol = collection(db, "cities");
  const citySnapshot = await getDocs(citiesCol);

  const cityList = citySnapshot.docs.map((doc) => doc.data());
  console.log(cityList);
  return cityList;
}

const a = getCities(db);

const storage = getStorage();

const { Login } = require("../db/schema/loginschema");

let route = express.Router();

route.post("/", upload.single("filename"), async (req, res) => {
  // const allDogs = await Login.findOne({ loginId: "sooraj" });
  try {
    const storageRef = ref(storage, "files/file102");

    const metadata = {
      contentType: req.file.mimetype,
    };

    const snapshot = await uploadBytesResumable(
      storageRef,
      req.file.buffer,
      metadata
    );

    const downloadUrl = await getDownloadURL(snapshot.ref);

    return res.status(200).json({ downloadUrl: downloadUrl });
  } catch (e) {}
});

module.exports = route;
