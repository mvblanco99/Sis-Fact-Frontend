import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getCookie } from "../utils/cookies";
import { nameCookieSessionApp } from "../config";
import { PropsToken } from "../types";

type PropsProtectedRoute = { children: ReactNode }

// Componente que verifica el rol del usuario
const ProtectedRoute = ({ children } : PropsProtectedRoute) => {

  const location = useLocation();
  const token:PropsToken = getCookie(nameCookieSessionApp);

  //Verificamos si tiene token de acceso
  if(token === undefined){
    if(!location.pathname.includes('/login')) return <Navigate to={"/login"}/> 
  }

  //Si tiene sesion activa e intenta redirigir al login redireccionamos al home de su respectivo modulo
  if(location.pathname.includes('/login')){
    return <Navigate to={'/'}/>;
  }

  return children;
};

export default ProtectedRoute;
