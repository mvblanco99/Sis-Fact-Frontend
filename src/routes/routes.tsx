import { useNavigate } from "react-router-dom";
import Main from "../components/Main";
import Facturas from "../components/modules/facturas";
import CreateUsers from "../components/modules/users/CreateUsers";
import DeleteUsers from "../components/modules/users/DeleteUsers";
import ModifyUsers from "../components/modules/users/ModifyUsers";
import ViewsUsers from "../components/modules/users/ViewsUsers";
import { nameCookieSessionApp } from "../config";
import LoginPage from "../pages/LoginPage";
import { getCookie } from "../utils/cookies";
import TemplateUser from "../components/modules/users";

export const routes = [
    {
        loader: () => {
            if(getCookie(nameCookieSessionApp) === undefined){
                throw {statusText: "Unauthenticated",  status: 401 };
            }
        },
        path:'/',
        element:<Main/>,
        errorElement:"Ha ocurrido un error",
        children:[
            {
                path:'users/',
                element:<TemplateUser/>,
                children:[
                    {
                        path:'create', 
                        element:<CreateUsers/>,
                    },
                    {
                        path:'modify', 
                        element:<ModifyUsers/>,
                        
                    },
                    {
                        path:'delete', 
                        element:<DeleteUsers/>,
                    },
                    {
                        path:'view', 
                        element:<ViewsUsers/>,
                    },

                ]
            },
            {
                path:'facturas',
                element:<Facturas/>
            }
        ]
    },
    {
        path:'login',
        element: <LoginPage/>,
    }
]