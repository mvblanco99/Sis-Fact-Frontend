import { Outlet, useLocation } from 'react-router-dom'
import ViewsUsers from './ViewsUsers'

const TemplateUser = () => {

const location = useLocation();

    console.log(location.pathname)

  return (
    <>
        {
            location.pathname.includes('create') ||
            location.pathname.includes('modify') ||
            location.pathname.includes('delete')
            ?   
                <Outlet/>
            :
            <   ViewsUsers/> 
       }
    </>
  )
}

export default TemplateUser