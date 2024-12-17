import React from 'react'
import { MdError } from 'react-icons/md'

type PropsAlert = {
    message: string,
    type: 'success' | 'error' | 'info' | 'warning'
}

const types = {
    success: 'success',
    error: 'error',
    warning: 'warning',
    info: 'info'
}

const Alert = ({
    type='success',
    message=''
}:PropsAlert) => {
    
    const styles = {
        success: 'border-2 border-green-400 bg-green-300   text-green-900',
        error: 'border-2 border-red-400 bg-red-300 font-medium  text-red-900',
        warning:'border-2 border-yellow-400 bg-yellow-300 font-medium  text-yellow-900',
        info:'border-2 border-blue-400 bg-blue-300 font-medium  text-blue-900'
    }

    const filter = (t:string) => {
        if(t == types.success) return styles.success
        if(t == types.info) return styles.info
        if(t == types.warning) return styles.warning
        if(t == types.error) return styles.error
    }




  return (
    <div className={`flex items-center min-w-sm w-fit max-w-md mx-auto gap-x-1 py-4 px-6 mt-4 mb-4 text-base font-medium rounded-md ${filter(type)}`}>
        <MdError /> {message}
    </div>
  )
}

export default Alert