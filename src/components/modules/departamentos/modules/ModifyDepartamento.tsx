import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import Alert from '../../../common/Alert/Alert'
import client from '../../../../api/client';
import { toaster } from '../../../../utils/toaster';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { regexName_lastname } from '../../../../utils/validators';

type Departamento = {
  descripcion : string,
  id:number
}
const ModifyDepartamento = () => {
  
  const [errorP,setErrorP] = useState<string | undefined>();
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const apiClient = client();
  const {ToastContainer, messageToast} = toaster();
  const navigate = useNavigate();
  const params = useParams();

  const { 
      register, 
      handleSubmit,
      reset, 
      setValue,
      formState: { errors,} 
  } =  useForm<Departamento>();
  
  const onSubmit = handleSubmit( async (data) => {
  
    const formData = new FormData();
    formData.append('descripcion', data.descripcion);
    
    try {
      const res = await apiClient.put(`/api/departamento/${params.depId}`,formData); 
      console.log(res)
      if(res.status === 200) {
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
  })


  const fetchDepartamento = async () => {
    try {
      const res = await apiClient.get(`/api/departamento/${params.depId}`);
      console.log(res)
      if(res.status === 200){
        const dataDep = res.data.departamento;
        setValue('id', dataDep.id);
        setValue('descripcion', dataDep.descripcion);
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

    const fetch = async () => {
      await fetchDepartamento();
    }

    fetch();

  },[])
  
  // Container
  return (
  <>
  {errorP && <Alert message={errorP} type={'error'}/>}

  <div className='w-full h-full p-4'>
  {/* Formulario */}
  <form action="" onSubmit={onSubmit} className='border-2 border-gray-300 rounded-md p-4 bg-gray-50 h-full overflow-hidden'>
    
    {/* Container datos personales */}
    <div className='w-full flex flex-col gap-y-3 '>
      <div>
        <h2 className='text-xl font-semibold text-gray-900s'>Datos del departamento:</h2>
      </div>

      <div className='flex flex-wrap  gap-x-2 gap-y-4 sm:flex-col lg:flex-row'>
       
        {/* username */}
        <div className='sm:w-full lg:w-[45%]'>
          <label htmlFor="descripcion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu nombre de usuario:</label>
          <input 
            type="text"
            placeholder='Sistemas'    
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            { ...register("descripcion",{
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
            {errors?.descripcion && <span className=' w-full text-red-500 text-sm'>{errors.descripcion?.message}</span>}
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

export default ModifyDepartamento