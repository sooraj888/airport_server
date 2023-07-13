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

// async function getCities(db) {
//   const citiesCol = collection(db, "cities");
//   const citySnapshot = await getDocs(citiesCol);

//   const cityList = citySnapshot.docs.map((doc) => doc.data());
//   console.log(cityList);
//   return cityList;
// }

// const a = getCities(db);

const storage = getStorage();

const { Login } = require("../db/schema/loginschema");

let route = express.Router();

// const upload = multer({ storage: multer.memoryStorage() });
// route.post("/", upload.single("filename"), async (req, res) => {
//   // const allDogs = await Login.findOne({ loginId: "sooraj" });
//   try {
//     const storageRef = ref(storage, "files/file102");

//     const metadata = {
//       contentType: req.file.mimetype,
//     };

//     const snapshot = await uploadBytesResumable(
//       storageRef,
//       req.file.buffer,
//       metadata
//     );

//     const downloadUrl = await getDownloadURL(snapshot.ref);

//     return res.status(200).json({ downloadUrl: downloadUrl });
//   } catch (e) {}
// });

//multiple file uploading
// const upload = multer({ storage: multer.memoryStorage() });
const upload = multer({ storage: multer.memoryStorage() });
const cpUpload = upload.fields([
  { name: "filename", maxCount: 1 },
  { name: "gallery", maxCount: 1 },
]);

route.post("/", cpUpload, async (req, res) => {
  console.log(req.files?.["filename"]?.[0]);
  // const allDogs = await Login.findOne({ loginId: "sooraj" });
  if (req.files?.["filename"]?.[0]) {
    // console.log(String(req.files?.["gallery"]?.[0].mimetype)?.split("/")?.[0]);
    if (req.files?.["gallery"]?.[0]) {
      if (
        String(req.files?.["gallery"]?.[0].mimetype)?.split("/")?.[0] ==
          "image" &&
        String(req.files?.["filename"]?.[0].mimetype)?.split("/")?.[0] ==
          "image"
      ) {
      } else {
        res.status(400).send("only images can be uploaded");
      }
      try {
        const storageRef1 = ref(
          storage,
          "files/" +
            String(req.files?.["filename"]?.[0].originalname).split()?.[0] +
            Date.now
        );
        const metadata1 = {
          contentType: req.files["filename"][0].mimetype,
        };
        const snapshot1 = await uploadBytesResumable(
          storageRef1,
          req.files["filename"][0].buffer,
          metadata1
        );
        const downloadUrl1 = await getDownloadURL(snapshot1.ref);
        const storageRef2 = ref(
          storage,
          "files/" +
            String(req.files?.["gallery"]?.[0].originalname).split()?.[0] +
            Date.now
        );
        const metadata2 = {
          contentType: req.files["gallery"][0].mimetype,
        };
        const snapshot2 = await uploadBytesResumable(
          storageRef2,
          req.files["gallery"][0].buffer,
          metadata2
        );
        const downloadUrl2 = await getDownloadURL(snapshot2.ref);
        let allDogs;
        const data = { loginId: downloadUrl1, password: downloadUrl2 };
        try {
          allDogs = await Login.create(data, function (data) {
            res.status(200);
            console.log(" record was created");
          });
        } catch (e) {
          res.status(500);
        }
        return res
          .status(200)
          .json({ downloadUrl1: downloadUrl1, downloadUrl2: downloadUrl2 });
      } catch (e) {
        res.status(500);
      }
    } else {
      res.status(400).send("bade request please send gallery");
    }
  } else {
    res.status(400).send("bade request please send filename");
  }
});

module.exports = route;
