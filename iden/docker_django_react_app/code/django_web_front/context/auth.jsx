import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import Loading from "../components/Loading";

const AuthContext = createContext();

export {AuthContext}

const AuthProvider = (props) => {
  const { children } = props;
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
