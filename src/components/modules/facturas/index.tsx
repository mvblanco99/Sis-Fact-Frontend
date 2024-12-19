import React from 'react'
import { Outlet } from 'react-router-dom'

const TemplateFacturas = () => {
  return (
    <>
      <div className='w-full h-full'>
          <Outlet/>
      </div>
    </>
  )
}

export default TemplateFacturas