import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser } from "react-icons/hi"

export const routes = [
    {
        icon: HiUser,
        name:"User",
        urls:[
            {url:"users/create",name:"Crear Usuario"}, 
            {url:"users/modify",name:"Modificar Usuario"},
            {url:"users/delete",name:"Eliminar Usuario"},
            {url:"users/view",name:"Ver Usuarios"},
        ]
    },
    {
        icon:HiShoppingBag,
        name:"Facturas",
        urls:[
            {url:"facturas",name:"Crear Factura"}
        ]
    }
]

export const nameCookieSessionApp = 'cookie_clinica_backend'