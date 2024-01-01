/*eslint-disable*/
import Router from "./components/Router";
import { app } from "firebaseApp"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {useEffect, useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "./components/Loader";





function App() {

  const auth = getAuth(app);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!auth?.currentUser);
  const [init, setInit] = useState<boolean>(false);


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setInit(true);
    });
  }, [auth]);

  return (
    <>
      <ToastContainer/>
      {init ? <Router isAuthenticated={isAuthenticated}  /> : <Loader/>}

    </>
  );
}

export default App;
