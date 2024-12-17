import { Navigate, useLocation } from "react-router-dom";
import { getCookie } from "../utils/cookies";
import { nameCookieSessionApp } from "../config";
import { ReactNode } from "react";

type PropsProtectedRouteLogin = { children: ReactNode }
// Componente que verifica el rol del usuario
const ProtectedLogin = ({ children }:PropsProtectedRouteLogin) => {

  const location = useLocation();
  const token = getCookie(nameCookieSessionApp);
  
  if(token !== undefined){
    //Si tiene sesion activa e intenta redirigir al login redireccionamos al home de su respectivo modulo
    if(location.pathname.includes('/login')){
      return <Navigate to={'/'}/>;
    }
  }
  
  return children;
};

export default ProtectedLogin