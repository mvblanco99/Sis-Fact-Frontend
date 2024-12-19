import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser } from "react-icons/hi"
import { IoMdCreate } from "react-icons/io";
import { AiFillBank } from "react-icons/ai";
import { BiSolidCategory } from "react-icons/bi";
import { PiComputerTowerBold } from "react-icons/pi";
import { LiaFileInvoiceSolid } from "react-icons/lia";

export const urlsAdministrator = [ 
  {
    icon: HiUser,
    name:"Usuarios",
    urls:[
        {url:"usuarios/ver_usuarios",name:"Ver Doctores"},
    ]
  },
  {
    icon: AiFillBank,
    name:"Departamentos",
    urls:[
        {url:"departamentos/ver_departamentos",name:"Ver Doctores"},
    ]
  },
  {
    icon: BiSolidCategory,
    name:"Categorias",
    urls:[
        {url:"categorias/ver_categorias",name:"Ver Doctores"},
    ]
  },
  {
    icon: PiComputerTowerBold,
    name:"Articulos",
    urls:[
        {url:"articulos/ver_articulos",name:"Ver Doctores"},
    ]
  },
  {
    icon: LiaFileInvoiceSolid,
    name:"Facturas",
    urls:[
        {url:"facturas/ver_facturas",name:"Ver Doctores"},
    ]
  },
]

export const nameCookieSessionApp = 'cookie_sis_fact_backend'

