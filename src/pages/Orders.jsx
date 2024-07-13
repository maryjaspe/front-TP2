import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import Cookies from 'js-cookie';
import Button from '../components/Button';
import { basePath } from '../constants/basepath';

const formatDate = (fechaIn) => {
  const fecha = new Date(fechaIn);
  const dia = fecha.getDate().toString().padStart(2, '0');
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
  const año = fecha.getFullYear();

  return `${dia}/${mes}/${año}`;
}

const Orders = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const jwt = Cookies.get('pupysSS');

    fetch(`${basePath}/pedidos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${jwt}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los pedidos');
        }
        return response.json();
      })
      .then((object) => {
        const { data } = object;
        setOrders(() => data);
        setIsLoading(() => false);
      })
      .catch((error) => {
        console.error('Error al obtener los pedidos:', error.message);
        setIsLoading(() => false);
      });
  }, []);

  console.log('Orders', orders);
  return (<div>
    <Menu />
    <div className='flex w-full gap-[24px] p-8 fle'>
      {isLoading ? <div>Cargando...</div> :
        orders.length === 0 ? <div>Aún no tienes órdenes creadas.</div> :
          orders.map((order) => {
            return <div key={order.id} className='flex flex-col w-[200px] gap-[12px] shadow-md p-4'>
              <div className={`px-2 py-1 rounded-full text-center text-white font-semibold text-sm ${order.estado === 'Pendiente' ? 'bg-yellow-500' : order.estado === 'Entregado' ? 'bg-green-500' : 'bg-red-500'}`}>
                {order.estado}
              </div>
              <div>{formatDate(order.fecha_pedido)}</div>
              <div>$ {order.total}</div>
              <Button onClick={() => { }} isDisabled={true}>Detalles</Button>
            </div>
          })
      }
    </div>
  </div>)
}

export default Orders;