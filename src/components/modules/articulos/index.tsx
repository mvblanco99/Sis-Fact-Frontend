import React from 'react'
import { Outlet } from 'react-router-dom'

const TemplateArticulos = () => {
  return (
    <>
        <div className='w-full h-full'>
            <Outlet/>
        </div>
   </>
  )
}

export default TemplateArticulos