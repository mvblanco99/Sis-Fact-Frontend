import { Outlet } from 'react-router-dom'

const TemplateUser = () => {

return (
    <>
      <div className='w-full h-full'>
          <Outlet/>
      </div>
    </>
  )
}

export default TemplateUser