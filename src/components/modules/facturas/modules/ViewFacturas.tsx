import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import client from '../../../../api/client';
import { toaster } from '../../../../utils/toaster';
import { Table } from 'flowbite-react';
import MyModal from '../../../common/Alert/Modal';

type Facturas = {
    id:number,
    nota_entrega:string,
    cantidad:number,
    empresa:string,
    total_factura:number,
    fec_emis:string,
    fec_vcto:string
}


const ViewFacturas = () => {
   // States
   const [facturas, setFacturas] = useState<Facturas[]>([]);
   const [filteredFactura, setFilteredFactura] = useState<Facturas[]>([]);
   const [openModal, setOpenModal] = useState(false);
   const [facturaABorrar, setFacturaABorrar] = useState<number>()
  
   const navigate = useNavigate();
   const apiClient = client();
   const {ToastContainer, messageToast} = toaster();
 
   const filterFactura = (e) => {
     const param = e.target.value;
 
     let filter = facturas.filter((fac) => {
       const doc = `${fac.nota_entrega} `;
       return doc
        .toLowerCase()
        .split(' ')
        .join('')
        .includes(
            param
            .toLowerCase()
            .split(' ')
            .join('')
        )
     });
 
     if(e.target.value === "") filter = [];
     
     setFilteredFactura(filter)
   }
 
   const redirecToCreateAFactura = () => navigate('/facturas/crear_factura')
   
   const modalOpen = (e) => {
     //Seteamos la factura a borrar
     setFacturaABorrar(e);
     //Abrimos el modal
     setOpenModal(true)
   };
 
   const closeModal = () => {
     //Limpiamos el estado de la factura a borrar
     setFacturaABorrar(undefined)
     //Cerramos el modal
     setOpenModal(false)
   };
 
   const fetchFacturas = async () => {
     try {
       const res = await apiClient.get('/api/factura');
       console.log(res)
       if(res.status === 200){
         setFacturas(res?.data.facturas)
       }
       
     } catch (error) {
       //Redireccionamos por no estar autenticado
       if(error?.response?.status === 401){
         navigate('/login');
       }
     }
   };
   
   const deleteFacturas = async() => {
     try {
       const res = await apiClient.del(`/api/factura/${facturaABorrar}`);
       console.log(res)
       if(res.status === 200){
         messageToast({
           message:res.data.message,
           position:'bottom-right',
           theme:'colored',
           type:'success'
         });
 
         //Eliminamos la factura borrado del estado
         const d = facturas.filter(e => e.id !== facturaABorrar);
         setFacturas(d)
         //Limpiamos el estado de la factura a borrar
         setFacturaABorrar(undefined)
         closeModal();
       }
       
     } catch (error) {
       //Redireccionamos por no estar autenticado
       if(error?.response?.status === 401){
         navigate('/login');
       }
     }
   };


  useEffect(() => {
    const fetch = async () => {
      await fetchFacturas();
    }

    fetch();
  },[])
  return (
    <div className='w-full h-full flex flex-col gap-y-4 p-4'>
      
    {/* Contenedor Button y buscador */}
    <div className='w-full flex justify-between items-center gap-x-4 border-2 border-gray-300 rounded-md p-2 bg-gray-50'>
      
      {/* Button */}
      <button type="button" onClick={redirecToCreateAFactura} className="flex text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Registrar Factura</button>
      
      {/* Buscador */}
      <div className='sm:w-full lg:w-[30%]'>
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
        <input 
          type="text"
          onChange={filterFactura}
          placeholder='Ingresa número de entrega'    
          className="bg-gray-100 border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"    
        />         
      </div>
    </div>

    {/* Contendor table */}
    <div className="overflow-x-auto w-full max-h-full flex flex-grow justify-center  border-2 bg-gray-50 border-gray-300 rounded-md py-2">
      <Table hoverable className=''>
        
        <Table.Head className='w-full'>
          <Table.HeadCell>Número de entrega</Table.HeadCell>
          <Table.HeadCell>Empresa</Table.HeadCell>
          <Table.HeadCell>Fecha de emisión</Table.HeadCell>
          <Table.HeadCell>Fecha de vencimiento</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
    
        <Table.Body className="divide-y">
          {
            filteredFactura.length > 0
              ?
                filteredFactura.map(e => {
                  return <Table.Row key={e.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {e.nota_entrega}
                    </Table.Cell>
                    <Table.HeadCell>{e.empresa}</Table.HeadCell>
                    <Table.HeadCell>{e.fec_emis}</Table.HeadCell>
                    <Table.HeadCell>{e.fec_vcto}</Table.HeadCell>
                    <Table.Cell className='flex gap-x-2'>
                      <Link to={`/facturas/modificar_factura/${e.id}`}><button type="button" className="w-20  text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Editar</button></Link>
                      <button 
                        type="button"
                        onClick={() => {
                          modalOpen(e.id) 
                        }}
                        className="w-24  text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                          Eliminar
                      </button>
                    </Table.Cell>
                  </Table.Row>
                })
              :
                facturas.map(e => {
                  return <Table.Row key={e.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {e.nota_entrega}
                    </Table.Cell>
                    <Table.HeadCell>{e.empresa}</Table.HeadCell>
                    <Table.HeadCell>{e.fec_emis}</Table.HeadCell>
                    <Table.HeadCell>{e.fec_vcto}</Table.HeadCell>
                    <Table.Cell className='flex gap-x-2'>
                      <Link to={`/facturas/modificar_factura/${e.id}`}><button type="button" className="w-20  text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Editar</button></Link>
                      <button 
                        type="button"
                        onClick={() => {
                          modalOpen(e.id) 
                        }}
                        className="w-24  text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                          Eliminar
                      </button>
                    </Table.Cell>
                  </Table.Row>
                })
          }
        </Table.Body>
      </Table>
      <MyModal 
        closeModal={closeModal} 
        deleteUser={deleteFacturas} 
        openModal={openModal} 
        title='¿Está seguro de eliminar la factura?' 
        textButton='Eliminar'
      />
    </div>
    <ToastContainer/>
  </div>
  )
}

export default ViewFacturas