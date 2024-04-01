import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCvcEfE-K6lreOjoig9CuYtUVO43bGLfiU",
  authDomain: "pharma-list-react-firebase.firebaseapp.com",
  projectId: "pharma-list-react-firebase",
  storageBucket: "pharma-list-react-firebase.appspot.com",
  messagingSenderId: "464728363641",
  appId: "1:464728363641:web:f9e9d679eadb23e9d63aa8",
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// Initialize Services
const projectFirestore = firebase.firestore()

export { projectFirestore }
