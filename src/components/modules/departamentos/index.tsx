import { Outlet } from 'react-router-dom'

const TemplateDepartamentos = () => {

return (
  <>
   <div className='w-full h-full'>
      <Outlet/>
   </div>
  </>
)
}

export default TemplateDepartamentos