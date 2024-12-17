import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { nameCookieSessionApp } from "../../../config";
import { getCookie, deleteCookie } from "../../../utils/cookies";
import { PropsToken } from "../../../types";
import { useNavigate } from "react-router-dom";
import client from "../../../api/client";

function Header() {
  const navigate = useNavigate();
  const apiClient = client();
  const token:PropsToken = getCookie(nameCookieSessionApp);

  const logout = async () => {

    console.log('logoutt')
    try {
      const res = await apiClient.get('/api/auth/logout'); 
      console.log(res)
      if(res.status === 204) {
        //Eliminamos la cookie
        deleteCookie(nameCookieSessionApp);
        //Redireccionamos al login
        navigate('/login');
      }
     } catch (err) {
       console.log(err)
       //Redireccionamos por no estar autenticado
       if(err?.response?.data.statusCode === 401){
        navigate('/login');
      }
     }
  }

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="https://flowbite-react.com">
        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>         
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Sis Fact Frontend</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{token?.name}</span>
            <span className="block truncate text-xs font-medium">{token?.username}</span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={logout}>Cerrar Sesión</Dropdown.Item>
        </Dropdown>
        {/* <Navbar.Toggle /> */}
      </div>
      {/* <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse> */}
    </Navbar>
  );
}

export default Header
