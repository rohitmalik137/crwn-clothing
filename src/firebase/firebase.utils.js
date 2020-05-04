import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyASaJk6UDiyhRY2kREWG4Xow8LOMzK4FBs",
    authDomain: "crwn-db-ae8ba.firebaseapp.com",
    databaseURL: "https://crwn-db-ae8ba.firebaseio.com",
    projectId: "crwn-db-ae8ba",
    storageBucket: "crwn-db-ae8ba.appspot.com",
    messagingSenderId: "564340389596",
    appId: "1:564340389596:web:7271fec621857ef310e619",
    measurementId: "G-WRDDZP2SNS"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch(error){
            console.log('Error creating User', error.message);
        }
    }
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;