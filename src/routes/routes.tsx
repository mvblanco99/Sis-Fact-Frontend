import ProtectedRoute from "./ProtectedRoute";
import ProtectedLogin from "./ProtectedLogin";

import CreateUsers from "../components/modules/users/modules/CreateUsers";

import ViewsUsers from "../components/modules/users/modules/ViewsUsers";
import TemplateUser from "../components/modules/users";
import Main from "../components/Main";
import Login from "../components/Login";
import TemplateDepartamentos from "../components/modules/departamentos";
import CreateDepartamento from "../components/modules/departamentos/modules/CreateDepartamento";
import ModifyDepartamento from "../components/modules/departamentos/modules/ModifyDepartamento";
import ViewDepartamentos from "../components/modules/departamentos/modules/ViewDepartamentos";
import ModifyUser from "../components/modules/users/modules/ModifyUser";
import TemplateCategoria from "../components/modules/categorias";
import ViewCategory from "../components/modules/categorias/modules/ViewCategory";
import ModifyCategory from "../components/modules/categorias/modules/ModifyCategory";
import CreateCategoria from "../components/modules/categorias/modules/CreateCategoria";
import TemplateArticulos from "../components/modules/articulos";
import CreateArticulos from "../components/modules/articulos/modules/CreateArticulos";
import ModifyArticulos from "../components/modules/articulos/modules/ModifyArticulos";
import ViewArticulos from "../components/modules/articulos/modules/ViewArticulos";
import TemplateFacturas from "../components/modules/facturas";
import CreateFacturas from "../components/modules/facturas/modules/CreateFacturas";
import ModifyFacturas from "../components/modules/facturas/modules/ModifyFacturas";
import ViewFacturas from "../components/modules/facturas/modules/ViewFacturas";

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
            element:<ModifyUser/>
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
      {
        path:'/categorias/',
        element:<TemplateCategoria/>,
        children:[
          {
            path:"crear_categoria", 
            element:<CreateCategoria/>
          },
          {
            path:"modificar_categoria/:catId", 
            element:<ModifyCategory/>
          },
          {
            path:"ver_categorias",
            element:<ViewCategory/>
          },
          
        ],
      },
      {
        path:'/articulos/',
        element:<TemplateArticulos/>,
        children:[
          {
            path:"crear_articulo", 
            element:<CreateArticulos/>
          },
          {
            path:"modificar_articulo/:artId", 
            element:<ModifyArticulos/>
          },
          {
            path:"ver_articulos",
            element:<ViewArticulos/>
          },
        ],
      },
      {
        path:'/facturas/',
        element:<TemplateFacturas/>,
        children:[
          {
            path:"crear_factura", 
            element:<CreateFacturas/>
          },
          {
            path:"modificar_factura/:facId", 
            element:<ModifyFacturas/>
          },
          {
            path:"ver_facturas",
            element:<ViewFacturas/>
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