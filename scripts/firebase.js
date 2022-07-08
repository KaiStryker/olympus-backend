const { initializeApp } = require("firebase/app");

const {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  query,
  where,
} = require("firebase/firestore");

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "PROJECT_ID.firebaseapp.com",
  // The value of `databaseURL` depends on the location of the database
  databaseURL: "https://DATABASE_NAME.firebaseio.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// add data
const addLocation = async (
  claimed,
  gps,
  health,
  locationId,
  locationName,
  color
) => {
  try {
    const docRef = await addDoc(collection(db, "Locations"), {
      Claimed: claimed,
      GPS: gps,
      Health: health,
      Location_ID: locationId,
      Name: locationName,
      Pin_Color: color,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// query data
const getLocationData = async (location) => {
  const q = query(collection(db, "Locations"), where("Name", "==", location));
  const querySnapshot = await getDoc(q);
  return querySnapshot;
};

// update data
const upgradeLocation = async (location) => {
  const locData = await getLocationData(location);
  const ref = doc(db, "Locations", `${locData.id}`);

  const oldHealth = locData.data().health;

  await updateDoc(ref, {
    health: oldHealth + 1,
  });
};

const vandalizeLocation = async (location) => {
  const locData = await getLocationData(location);
  const ref = doc(db, "Locations", `${locData.id}`);

  const oldHealth = locData.data().health;

  await updateDoc(ref, {
    health: oldHealth - 1,
  });
};

const tokenBalanceOfLocation = async (location) => {
  const locData = await getLocationData(location);
  const balance = locData.data().tokenBalance;
  return balance;
};

module.exports = {
  addLocation,
  upgradeLocation,
  vandalizeLocation,
  tokenBalanceOfLocation,
};
