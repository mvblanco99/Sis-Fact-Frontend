import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import client from '../../api/client'
import { useNavigate } from 'react-router-dom'
import { setCookie } from '../../utils/cookies'
import { nameCookieSessionApp } from '../../config'
import Alert from '../common/Alert/Alert'

type Inputs = {
  username: string
  password: string,
  remember:boolean
}

const Login = () => {

  const [errorP,setErrorP] = useState<string | undefined>();
  const apiClient = client();
  const navigate = useNavigate();

  const { 
    register, 
    handleSubmit, 
    formState: { errors, } 
  } =  useForm<Inputs>();

  const onSubmit = handleSubmit( async (data) => {
     console.log(data.username, data.password)

    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('password', data.password);
   
    try {
      const res = await apiClient.post('/api/auth/login',formData);
      //Guardamos la cookie del usuario

      const propsToken = {
        accessToken: res.data.token,
        username:res.data.user.username,
        name:res.data.user.name,
        departamento_id:res.data.user.departamento_id,
        id:res.data.user.id
    }

      setCookie(nameCookieSessionApp,JSON.stringify(propsToken),10000);
     
      setErrorP('')
      navigate('/')
      
    } catch (error) {
      console.log(error)
      const message = error?.response.data.message;
      setErrorP(message)
    }

  });

  return (
    <>
      <div className='w-full h-screen'>
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                  <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
                  Sis Fact Frontend   
              </a>
              {errorP && <Alert message={errorP} type={'error'}/>}
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                  <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Inicia sesión en tu cuenta
                      </h1>
                      <form  className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
                          <div>
                              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu correo electrónico</label>
                              <input 
                                type="text"
                                {...register("username",{
                                    required:{
                                        value:true,
                                        message:"El username es requerido"
                                    },
                                    min:{
                                      value:5,
                                      message:"El username debe tener minimo 5 caracteres"
                                    }
                                })} 
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                />
                                {errors.username && <span className='text-red-500 text-sm'>{errors.username.message}</span>}
                          </div>
                          <div>
                              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                              <input 
                                type="password"
                                {...register("password",{
                                    required:{
                                      value:true,
                                      message:"La contraseña es requerida"
                                    },
                                    min:{
                                      value:8,
                                      message:"La contaseña debe tener minimo 5 caracteres"
                                    },
                                    pattern:{
                                      value:/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                                      message:"La contraseña no cumple con el formato requerido"
                                    }
                                })}  
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                               />
                               {errors.password && <span className='text-red-500 text-sm'>{errors.password.message}</span>}
                          </div>
                          <div className="flex items-center justify-between">
                              <div className="flex items-start">
                                  <div className="flex items-center h-5">
                                    <input 
                                      type="checkbox" 
                                      {...register("remember",{})}
                                      aria-describedby="remember" 
                                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" 
                                    />
                                  </div>
                                  <div className="ml-3 text-sm">
                                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                  </div>
                              </div>
                          </div>
                          <button  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                      </form>
                  </div>
              </div>
            </div>
          </section>
      </div>
    </>
  )
}

export default Login