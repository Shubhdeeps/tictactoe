import { useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { Outlet } from "react-router-dom";
import Loader from "../component/Loader";

export const ProtectedRoutes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any | null>(null);
  useEffect(() => {
    setIsLoading(true);

    auth.onAuthStateChanged((user) => {
      // console.log("USER: ", user);
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }

      setIsLoading(false);
    });
  }, [auth]);

  if (isLoading) {
    return <Loader text="Please wait..." />;
  }

  return (
    <>
      {!!user && user !== null ? <Outlet /> : <Loader text="Please wait..." />}
    </>
  );
};
