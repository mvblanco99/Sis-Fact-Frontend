import ProtectedRoute from "./ProtectedRoute";
import ProtectedLogin from "./ProtectedLogin";

import CreateUsers from "../components/modules/users/modules/CreateUsers";
import ModifyUsers from "../components/modules/users/modules/ModifyUsers";
import ViewsUsers from "../components/modules/users/modules/ViewsUsers";
import TemplateUser from "../components/modules/users";
import Main from "../components/Main";
import Login from "../components/Login";
import TemplateDepartamentos from "../components/modules/departamentos";
import CreateDepartamento from "../components/modules/departamentos/modules/CreateDepartamento";
import ModifyDepartamento from "../components/modules/departamentos/modules/ModifyDepartamento";
import ViewDepartamentos from "../components/modules/departamentos/modules/ViewDepartamentos";

const routes = [
  {   
    path: "/",
    element:(<ProtectedRoute><Main/></ProtectedRoute>),
    errorElement:"Ha ocurrido un error",
    children:[
      {
        path:'/usuarios/',
        element:<TemplateUser/>,
        children:[
          {
            path:"crear_usuario", 
            element:<CreateUsers/>
          },
          {
            path:"modificar_usuario/:userId",
            element:<ModifyUsers/>
          },
          {
            path:"ver_usuarios",
            element:<ViewsUsers/>
          },
        ],
      },
      {
        path:'/departamentos/',
        element:<TemplateDepartamentos/>,
        children:[
          {
            path:"crear_departamento", 
            element:<CreateDepartamento/>
          },
          {
            path:"modificar_departamento/:depId",
            element:<ModifyDepartamento/>
          },
          {
            path:"ver_departamentos",
            element:<ViewDepartamentos/>
          },
        ],
      },

    ]
  },
  {
    path:'/login',
    element:(
      <ProtectedLogin><Login/></ProtectedLogin>
    )
  },
]

export default routes