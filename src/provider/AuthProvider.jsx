import { createContext, useEffect, useState } from "react"
import propTypes from 'prop-types';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import useAxiosPublic from "@/Hooks/useAxiosPublic";

export const authContext = createContext();

const AuthProvider = ({children}) => {

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  const googleProvider = new GoogleAuthProvider();

  //sign in by google
  const signInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  }

  //sign Up with email and password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  //sign In with email and password
  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  //logout user
  const logOut = async () => {
    setLoading(true);
    await axiosPublic('/jwt', {withCredentials : true});
    return signOut(auth);
  }

  //update Profile
  const profileUpdate = (name, image) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL : image
    })
  }

  //get token
  const getToken = async(email) => {
    const {data} = await axiosPublic.post('/jwt', {email}, {withCredentials : true});

    return data;
  }

  //save user in DB
  const saveUser = async user => {
    const userInfo =  {
      name : user?.displayName,
      email : user?.email,
      role : 'User'
    }
    console.log(userInfo);
    await axiosPublic.post('/users', userInfo)
  }

  //track user information
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      if(currentUser){
        getToken(currentUser?.email);
        saveUser(currentUser);
      }
      setLoading(false);
    })

    return () => unSubscribe();
  }, [])


    const authInfo = {
      user,
      loading,
      signInGoogle,
      createUser,
      logIn,
      profileUpdate,
      logOut
    }

  return (
    <authContext.Provider value={authInfo}>
      {children}
    </authContext.Provider>
  )
}

AuthProvider.propTypes = {
    children: propTypes.node.isRequired,
}

export default AuthProvider
