import React, { useEffect, useState } from 'react'
import client from '../../../../api/client';
import { toaster } from '../../../../utils/toaster';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Alert from '../../../common/Alert/Alert';
import { regexName_lastname } from '../../../../utils/validators';

type Inputs = {
  name:string,
  username:string,
  departamento:number,
  password:string,
}

type Departamento = {
  id:number,
  descripcion:string
}

const CreateUsers = () => {
  const [errorP,setErrorP] = useState<string | undefined>();
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const apiClient = client();
  const {ToastContainer, messageToast} = toaster();
  const navigate = useNavigate();

  const { 
    register, 
    handleSubmit,
    reset, 
    formState: { errors,} 
  } =  useForm<Inputs>();

  const onSubmit = handleSubmit( async (data) => {
    
   const formData = new FormData();
   formData.append('name', data.name);
   formData.append('username', data.username);
   formData.append('departamento', `${data.departamento}`);
   formData.append('password', data.password);
  
   try {
    const res = await apiClient.post('/api/users/store',formData); 
    console.log(res)
    if(res.status === 201) {
      reset()
      messageToast({
        message:res.data.message,
        position:'bottom-right',
        theme:'colored',
        type:'success'
      });
      setErrorP('')
    }
   } catch (err) {
     console.log(err)
     const message = err?.response.data.message;
     setErrorP(message)
     //Redireccionamos por no estar autenticado
     if(err?.response?.data.statusCode === 401){
      navigate('/login');
    }
   }
 });

 const fetchDepartamentos = async () => {
  try {
    const res = await apiClient.get('/api/departamento');
    if(res.status === 200){
      setDepartamentos(res?.data.departamentos)
    }
    
  } catch (error) {
    //Redireccionamos por no estar autenticado
    if(error?.response?.data.statusCode === 401){
      navigate('/login');
    }
  }
 }

 useEffect(() => {
  const fetch = async() => {
    await fetchDepartamentos();
  };

  fetch();
 },[])

  return (
    // Container
    <>
      {errorP && <Alert message={errorP} type={'error'}/>}

      <div className='w-full h-full p-4'>
      {/* Formulario */}
      <form action="" onSubmit={onSubmit} className='border-2 border-gray-300 rounded-md p-4 bg-gray-50 h-full overflow-hidden'>
        
        {/* Container datos personales */}
        <div className='w-full flex flex-col gap-y-3 '>
          <div>
            <h2 className='text-xl font-semibold text-gray-900s'>Datos Personales:</h2>
          </div>

          <div className='flex flex-wrap  gap-x-2 gap-y-4 sm:flex-col lg:flex-row'>
           
            {/* username */}
            <div className='sm:w-full lg:w-[45%]'>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu nombre de usuario:</label>
              <input 
                type="text"
                placeholder='mvblanco'    
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                { ...register("username",{
                  required:{
                    value: true,
                    message: "El username es requerido",
                  }, 
                  pattern: {
                    value: regexName_lastname,
                    message: "El username no cumple con el formato requerido.",
                  }
                })}
                />
                {errors?.username && <span className=' w-full text-red-500 text-sm'>{errors.username?.message}</span>}
            </div>
            {/* password */}
            <div className='sm:w-full lg:w-[45%]'>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu Contraseña:</label>
              <input 
                type="password"
                placeholder='********' 
                { ...register("password",{
                  required:{
                    value: true,
                    message: "La contraseña es requerida",
                  }, 
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                    message: "El contraseña no cumple con el formato requerido.",
                  },
                  min:8
                })}  
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              />
              {errors?.password && <span className=' w-full text-red-500 text-sm'>{errors.password?.message}</span>}
            </div>
             {/* name */}
            <div className='sm:w-full lg:w-[30%]'>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu nombre:</label>
              <input 
                type="text"
                placeholder='Manuel'    
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                { ...register("name",{
                  required:{
                    value: true,
                    message: "El nombre es requerido",
                  }, 
                  pattern: {
                    value: regexName_lastname,
                    message: "El nombre no cumple con el formato requerido.",
                  }
                })}
                />
                {errors?.name && <span className=' w-full text-red-500 text-sm'>{errors.name?.message}</span>}
            </div>
            {/* departamento */}
            <div className='sm:w-full lg:w-[45%]'>
              <label htmlFor="tipoSangre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Departamento:</label>
              <select 
                { ...register("departamento",{
                  required:{
                    value: true,
                    message: "El departamento es requerida",
                  }, 
                  pattern: {
                    value: /^[0-9]$/,
                    message: "El departamento no cumple con el formato requerido.",
                  }
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              >
                <option value="">Seleccione un departamento</option>
                {
                  departamentos.length > 0 &&
                    departamentos.map(t => {
                      return <option key={t.id} value={t.id}>{t.descripcion}</option>
                    })
                }
              </select>
              {errors?.departamento && <span className=' w-full text-red-500 text-sm'>{errors.departamento?.message}</span>}
            </div>
          </div>
        </div>
                          
        {/* Container Button */}
        <div className='w-full flex justify-center mt-6'>
          <button type="submit" className="w-[25%] text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Guardar</button>
        </div>

      </form>
     <ToastContainer/>
     </div>
    </>
  )
}

export default CreateUsers