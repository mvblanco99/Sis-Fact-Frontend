import React, { useState } from 'react'
import client from '../../../../api/client';
import { toaster } from '../../../../utils/toaster';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Alert from '../../../common/Alert/Alert';
import { regexNameAll } from '../../../../utils/validators';


type Inputs = {
    nota_entrega:string,
    empresa:string,
    total_factura:number,
    fec_emis:string,
    fec_vcto:string
}

const CreateFacturas = () => {

    const [errorP,setErrorP] = useState<string | undefined>();
    const apiClient = client();
    const {ToastContainer, messageToast} = toaster();
    const navigate = useNavigate();
  
    const { 
        register, 
        handleSubmit,
        reset, 
        formState: { errors,} 
    } =  useForm <Inputs>();
  
    const onSubmit = handleSubmit( async (data) => {
    
      const formData = new FormData();
      formData.append('nota_entrega', data.nota_entrega);
      formData.append('empresa', data.empresa);
      formData.append('total_factura', `${data.total_factura}`);
      formData.append('fec_emis', data.fec_emis);
      formData.append('fec_vcto', data.fec_vcto);
      
      try {
        const res = await apiClient.post(`/api/factura/store`,formData); 
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
    })
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
           <h2 className='text-xl font-semibold text-gray-900s'>Datos de la factura:</h2>
         </div>

         <div className='flex flex-wrap  gap-x-2 gap-y-4 sm:flex-col lg:flex-row'>
          
           {/* numero de entrega */}
           <div className='sm:w-full lg:w-[45%]'>
             <label htmlFor="nota_entrega" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nota de entrega:</label>
             <input 
               type="text"
               placeholder='9419419'    
               className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
               { ...register("nota_entrega",{
                 required:{
                   value: true,
                   message: "La nota de entrega es requerido",
                 }, 
                 pattern: {
                   value:  regexNameAll,
                   message: "El username no cumple con el formato requerido.",
                 }
               })}
               />
               {errors?.nota_entrega && <span className=' w-full text-red-500 text-sm'>{errors.nota_entrega?.message}</span>}
           </div>

           {/* empresa */}
           <div className='sm:w-full lg:w-[45%]'>
             <label htmlFor="empresa" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Empresa:</label>
             <input 
               type="text"
               placeholder='Tecno Segura C.A'    
               className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
               { ...register("empresa",{
                 required:{
                   value: true,
                   message: "La empresa es requerido",
                 }, 
                 pattern: {
                   value:  regexNameAll,
                   message: "La empresa no cumple con el formato requerido.",
                 }
               })}
               />
               {errors?.empresa && <span className=' w-full text-red-500 text-sm'>{errors.empresa?.message}</span>}
           </div>

           {/* fecha de emision */}
           <div className='sm:w-full lg:w-[45%]'>
             <label htmlFor="fec_emis" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de emisión:</label>
             <input 
               type="datetime-local"
               placeholder=''    
               className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
               { ...register("fec_emis",{
                 required:{
                   value: true,
                   message: "La fecha de emisión es requerido",
                 }, 
               })}
               />
               {errors?.fec_emis && <span className=' w-full text-red-500 text-sm'>{errors.fec_emis?.message}</span>}
           </div>

           {/* fecha de vencimiento */}
           <div className='sm:w-full lg:w-[45%]'>
             <label htmlFor="fec_vcto" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de vencimiento:</label>
             <input 
               type="datetime-local"
               placeholder=''    
               className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
               { ...register("fec_vcto",{
                 required:{
                   value: true,
                   message: "La fecha de vencimiento es requerido",
                 }, 
               })}
               />
               {errors?.fec_vcto && <span className=' w-full text-red-500 text-sm'>{errors.fec_vcto?.message}</span>}
           </div>

           
            {/* Total factura */}
           <div className='sm:w-full lg:w-[45%]'>
             <label htmlFor="total_factura" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total de factura:</label>
             <input 
               type="number"
               placeholder='1000,00'    
               className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
               { ...register("total_factura",{
                 required:{
                   value: true,
                   message: "Total de factura es requerido",
                 }, 
                 
               })}
               />
               {errors?.total_factura && <span className=' w-full text-red-500 text-sm'>{errors.total_factura?.message}</span>}
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

export default CreateFacturas