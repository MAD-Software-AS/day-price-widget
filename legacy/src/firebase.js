export const initFirebaseServices = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyArCDE83F6fnSapepCsGIk8uJ8UQNANS0c",
    authDomain: "fohn-demo.firebaseapp.com",
    projectId: "fohn-demo",
    storageBucket: "fohn-demo.appspot.com",
    messagingSenderId: "141055045592",
    appId: "1:141055045592:web:e325237a8e9352d2714cad",
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  return { db };
};

export const getDataById = async ({db, collectionName, id}) => {
  const doc = await db.collection(collectionName).doc(id).get();

  return doc.data();
};
