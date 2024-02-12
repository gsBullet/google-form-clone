import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [checkAuth, setcheckAuth] = useState(false);
  const checkUser =async()=>{
  let req =  await fetch(`http://localhost:5000/check-user`,{
    headers:{
      Authorization: 'myworld '+window.localStorage.getItem('gsmToken')
    }
  })
  let res = await req.json();
  console.log(res);
  let status = await req.status;
  if(status===200){
    setcheckAuth({
      isAuth: true,
      gsmToken: window.localStorage.getItem('gsmToken'),
    });

  }else{
    setcheckAuth(false)
  }
}

  useEffect(() => {
    checkUser() 

  }, []);

  const logout = () => {
    setcheckAuth(false);
    window.localStorage.removeItem("gsmToken");
  };

  const value = { checkAuth, setcheckAuth, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
