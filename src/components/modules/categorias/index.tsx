import React from 'react'
import { Outlet } from 'react-router-dom'

const TemplateCategoria = () => {
  return (
    <>
        <div className='w-full h-full'>
            <Outlet/>
        </div>
    </>
  )
}

export default TemplateCategoria