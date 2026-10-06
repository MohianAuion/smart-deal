import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';


const googleProvider= new GoogleAuthProvider();

const AuthProvider = ({children}) => {

    const [user, setUser]=useState(null);
    const[loading, setLoading]=useState(true);
    const[authLoading, setAuthLoading]=useState(false);
   

    // on auth state change
    // useEffect(()=>{
    //    const unsubscribe= onAuthStateChanged(auth, currentUser=>{
    //         setUser(currentUser);
    //     });
    //     return ()=>{
    //         unsubscribe();
    //     };
    // },[])

    // generate token by myself(onAuthStateChange)
    useEffect(()=>{
       const unsubscribe= onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser);
            setLoading(false);
            if(currentUser){

                const loggedUser={email : currentUser.email};

                fetch("http://localhost:3000/getToken",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                    },
                    body: JSON.stringify(loggedUser)
                })
                .then(res=>res.json())
                .then(data=>{
                    console.log("after generate the token", data);
                    localStorage.setItem("token", data.token)
                })
            }
        });
        return ()=>{
            unsubscribe();
        };
    },[])


    // sign in  with email and password
    const signInUser=(email, password)=>{
        setAuthLoading(true);
        return signInWithEmailAndPassword(auth, email, password).finally(()=>authLoading(false));
    }

    // sign in with google
    const signInUserWithGoogle=()=>{
        setAuthLoading(true);
        return signInWithPopup(auth, googleProvider).finally(()=>setAuthLoading(false))
    }

    // create with email and password
    const createUser=(email, password)=>{
        authLoading(true);
        return createUserWithEmailAndPassword(auth, email, password).finally(()=>authLoading(false));
    }
    

    // update user
    const updateUser=(name, photo)=>{
        return updateProfile(auth.currentUser, {
displayName: name, 
photoURL: photo
        })
    }

    // sendPasswordResetEmail
    const resetPassword=(email)=>{
        return sendPasswordResetEmail(auth, email);
    }

    // signOut user
    const signOutUser=()=>{
        authLoading(true);
        return signOut(auth).finally(()=>authLoading(false));
    }


    const authinfo={
        user,
        loading,
        authLoading,
signInUser,
createUser,
updateUser,
resetPassword,
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