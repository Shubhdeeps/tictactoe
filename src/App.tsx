import { RouterProvider } from "react-router-dom";
import { routes } from "./Routes";
import { useEffect } from "react";
import { auth } from "./firebase/firebaseConfig";

function App() {
  useEffect(() => {
    (async () => {
      await auth.signInAnonymously();
      console.log("new user joined!!", auth.currentUser?.uid);
    })();
  }, []);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
