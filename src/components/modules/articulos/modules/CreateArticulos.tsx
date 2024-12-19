import React, { useEffect, useState } from 'react'
import Alert from '../../../common/Alert/Alert'
import client from '../../../../api/client'
import { toaster } from '../../../../utils/toaster'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { regexNameAll } from '../../../../utils/validators'

type Categorias = {
    id: number,
    descripcion: string
}

type Inputs = {
    categoria: number,
    descripcion:string
}

const CreateArticulos = () => {
    const [errorP,setErrorP] = useState<string | undefined>();
    const [categorias, setCategorias] = useState<Categorias[]>([]);
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
     formData.append('descripcion', data.descripcion);
     formData.append('categoria_id', `${data.categoria}`);
    
     try {
      const res = await apiClient.post('/api/articulo/store',formData); 
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
       if(err?.response?.status === 401){
        navigate('/login');
      }
     }
   });
  
   const fetchCategorias = async () => {
    try {
      const res = await apiClient.get('/api/categoria');
      if(res.status === 200){
        setCategorias(res?.data.categorias)
      }
      
    } catch (error) {
      //Redireccionamos por no estar autenticado
      if(error?.response?.status === 401){
        navigate('/login');
      }
    }
   }
  
   useEffect(() => {
    const fetch = async() => {
      await fetchCategorias();
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
           <h2 className='text-xl font-semibold text-gray-900s'>Datos del articulo:</h2>
         </div>

         <div className='flex flex-wrap  gap-x-2 gap-y-4 sm:flex-col lg:flex-row'>
          
           {/* username */}
           <div className='sm:w-full lg:w-[45%]'>
             <label htmlFor="descripcion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción:</label>
             <input 
               type="text"
               placeholder='Monitores'    
               className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
               { ...register("descripcion",{
                 required:{
                   value: true,
                   message: "La descripcion del articulo es requerido",
                 }, 
                 pattern: {
                   value: regexNameAll,
                   message: "La descripcion del articulo no cumple con el formato requerido.",
                 }
               })}
               />
               {errors?.descripcion && <span className=' w-full text-red-500 text-sm'>{errors.descripcion?.message}</span>}
           </div>

           {/* articulos */}
           <div className='sm:w-full lg:w-[45%]'>
              <label htmlFor="categoria" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categoría:</label>
              <select 
                { ...register("categoria",{
                  required:{
                    value: true,
                    message: "La categoria es requerida",
                  }, 
                  pattern: {
                    value: /^[0-9]$/,
                    message: "La categoria no cumple con el formato requerido.",
                  }
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              >
                <option value="">Seleccione un departamento</option>
                {
                  categorias.length > 0 &&
                    categorias.map(t => {
                      return <option key={t.id} value={t.id}>{t.descripcion}</option>
                    })
                }
              </select>
              {errors?.categoria && <span className=' w-full text-red-500 text-sm'>{errors.categoria?.message}</span>}
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

export default CreateArticulos