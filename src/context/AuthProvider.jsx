import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';


const googleProvider= new GoogleAuthProvider();

const AuthProvider = ({children}) => {

    const [user, setUser]=useState(null);
   

    // on auth state change
    useEffect(()=>{
       const unsubscribe= onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser);
        });
        return ()=>{
            unsubscribe();
        };
    },[])

    // sign in  with email and password
    const signInUser=(email, password)=>{
        return signInWithEmailAndPassword(auth, email, password);
    }

    // sign in with google
    const signInUserWithGoogle=()=>{
        return signInWithPopup(auth, googleProvider);
    }

    // create with email and password
    const createUser=(email, password)=>{
        return createUserWithEmailAndPassword(auth, email, password);
    }
    

    // update user
    const updateUser=(name, photo)=>{
        return updateProfile(auth.currentUser, {
displayName: name, 
photoURL: photo
        })
    }

    // signOut user
    const signOutUser=()=>{
        return signOut(auth);
    }


    const authinfo={
        user,
signInUser,
createUser,
updateUser,
signInUserWithGoogle,
signOutUser
    }
    return (
       <AuthContext value={authinfo}>
        {
            children
        }
       </AuthContext>
    );
};

export default AuthProvider;