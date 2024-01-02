/*eslint-disable*/
import Router from "./components/Router";
import {app} from "firebaseApp"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {useEffect, useState, useContext} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "./components/Loader";
import {ThemeContext} from "./context/ThemeContext";




function App() {
  const context = useContext(ThemeContext);
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
      <div className={context.theme === "light" ? "white" : "dark"}>
        <ToastContainer/>
        {init ? <Router isAuthenticated={isAuthenticated}  /> : <Loader/>}
      </div>
    </>
  );
}

export default App;
