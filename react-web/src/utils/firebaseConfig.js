// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { showSuccessToast, showErrorToast } from "./toastUtil";
import { googleSignup } from "../actions/loginAction";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID
};
// console.log("Firebase Config:", firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// console.log("Firebase App Initialized:", app);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// console.log("Firebase Auth Initialized:", auth);

// Initialize Google Auth Provider
const GoogleProvider = new GoogleAuthProvider();

// Function to handle Google Sign-In
export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, GoogleProvider)
        // console.log("Google Sign-In Result:", result);

        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // console.log("Google Credential:", credential);

        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;

        // Call the register API with the user data
        await googleSignup({
            name: user.displayName,
            email: user.email,
            idToken: token,
        });

        // showSuccessToast("Logged in successfully with Google");
        return { user, token };

    } catch (error) {
        const errorMessage = error.message;
        // const email = error.customData.email;
        // const credential = GoogleAuthProvider.credentialFromError(error);

        showErrorToast(errorMessage);
        throw new Error(errorMessage);
    }
};

export { db, auth };