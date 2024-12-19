import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import client from '../../../../api/client';
import { toaster } from '../../../../utils/toaster';
import MyModal from '../../../common/Alert/Modal';
import { Table } from 'flowbite-react';

type Articulos = {
    id: number,
    descripcion: string
}

const ViewArticulos = () => {
    // States
    const [articulos, setArticulos] = useState<Articulos[]>([]);
    const [filteredArticulos, setFilteredArticulos] = useState<Articulos[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [articulosABorrar, setArticulosABorrar] = useState<number>()
   
    const navigate = useNavigate();
    const apiClient = client();
    const {ToastContainer, messageToast} = toaster();
  
    const filterArticulos = (e) => {
      const param = e.target.value;
  
      let filter = articulos.filter((art) => {
        const doc = `${art.descripcion} `;
        return doc.
          toLowerCase()
          .split(' ')
          .join('')
          .includes(param.toLowerCase().split(' ').join(''))
      });
  
      if(e.target.value === "") filter = [];
      
      setFilteredArticulos(filter)
    }
  
    const redirecToCreateAArticulos = () => navigate('/articulos/crear_articulo')
    
    const modalOpen = (e) => {
      //Seteamos la categoria a borrar
      setArticulosABorrar(e);
      //Abrimos el modal
      setOpenModal(true)
    };
  
    const closeModal = () => {
      //Limpiamos el estado de la categoria a borrar
      setArticulosABorrar(undefined)
      //Cerramos el modal
      setOpenModal(false)
    };
  
    const fetchArticulos = async () => {
      try {
        const res = await apiClient.get('/api/articulo');
        console.log(res)
        if(res.status === 200){
          setArticulos(res?.data.articulos)
        }
        
      } catch (error) {
        //Redireccionamos por no estar autenticado
        if(error?.response?.status === 401){
          navigate('/login');
        }
      }
    };
    
    const deleteArticulos = async() => {
      try {
        const res = await apiClient.del(`/api/articulo/${articulosABorrar}`);
        console.log(res)
        if(res.status === 200){
          messageToast({
            message:res.data.message,
            position:'bottom-right',
            theme:'colored',
            type:'success'
          });
  
          //Eliminamos la categoria borrado del estado
          const d = articulos.filter(e => e.id !== articulosABorrar);
          setArticulos(d)
          //Limpiamos el estado del doctor a borrar
          setArticulosABorrar(undefined)
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
       await fetchArticulos();
     }
 
     fetch();
   },[])

  return (
    <div className='w-full h-full flex flex-col gap-y-4 p-4'>
      
    {/* Contenedor Button y buscador */}
    <div className='w-full flex justify-between items-center gap-x-4 border-2 border-gray-300 rounded-md p-2 bg-gray-50'>
      
      {/* Button */}
      <button type="button" onClick={redirecToCreateAArticulos} className="flex text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Registrar Articulo</button>
      
      {/* Buscador */}
      <div className='sm:w-full lg:w-[30%]'>
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
        <input 
          type="text"
          onChange={filterArticulos}
          placeholder='Ingresa un articulo'    
          className="bg-gray-100 border border-gray-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"    
        />         
      </div>
    </div>

    {/* Contendor table */}
    <div className="overflow-x-auto w-full max-h-full flex flex-grow  border-2 bg-gray-50 border-gray-300 rounded-md py-2">
      <Table hoverable className=''>
        
        <Table.Head className='w-full'>
          <Table.HeadCell>Descripción</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
    
        <Table.Body className="divide-y">
          {
            filteredArticulos.length > 0
              ?
                filteredArticulos.map(e => {
                  return <Table.Row key={e.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {e.descripcion}
                    </Table.Cell>
                    <Table.Cell className='flex gap-x-2'>
                      <Link to={`/categoria/modificar_categoria/${e.id}`}><button type="button" className="w-20  text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Editar</button></Link>
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
                articulos.map(e => {
                  return <Table.Row key={e.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {e.descripcion}
                    </Table.Cell>
                    <Table.Cell className='flex gap-x-2'>
                      <Link to={`/categoria/modificar_categoria/${e.id}`}><button type="button" className="w-20  text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Editar</button></Link>
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
        deleteUser={deleteArticulos} 
        openModal={openModal} 
        title='¿Está seguro de eliminar el articulo?' 
        textButton='Eliminar'
      />
    </div>
    <ToastContainer/>
  </div>
  )
}

export default ViewArticulos