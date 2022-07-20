import { useState } from "react";
import styles from "../public/styles/Finalizado.module.css";
import axios from "axios";
import { useRouter } from "next/router";


const Finalizado = ({ setClose, orders }) => {
  const [orderList, setOrderList] = useState(orders);

  

  const handleDelete = async (id) => {
    
    try {
      const res = await axios.delete(
        "/api/orders/" + id
      );
      setOrderList(orderList.filter((pizza) => pizza._id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  

  

  
 

  return (
    <div className={styles.container}>
        <span onClick={() => setClose(true)} className={styles.close}>
          X
        </span>
      <div className={styles.wrapper}>
        <table className={styles.table}>
        <tbody>
            <tr>
              <th>CLIENTE</th>
              <th>PRODUTOS</th>              
              <th>TOTAL</th>
              <th>MÉTODO/TROCO</th>
              <th>DATA</th>
              
            </tr>
          </tbody>
          
          {orders.map((order, Index) => (
            order.status == 3 ?
            

              
              <tbody key={Index} className={styles.tbTitle}>
                
                <tr className={styles.trTitle}>
                  <td className={styles.tdTitle}>{order.customer}</td>
                  <td className={styles.tdTitle}>
                    {order.produto.map((sla, Index) =>
                      
                        <span className={styles.spanTitle} key={Index}>{sla.title}, </span>
                        
                      
                    )}



                  </td>




                  <td className={styles.tdTitle}>R${order.total + order.price}.00</td>
                  <td className={styles.tdTitle}>
                    {order.method === 0 ? <span>Dinheiro, ({order.troco}R$)</span> : <span>Cartão</span>}
                  </td>
                  
                  <td className={styles.tdTitle}>
                   {order.createdAt.slice(0,19)}
                  </td>
                  <td>
                  <button className={styles.delete} onClick={() => handleDelete(order._id)}>Deletar</button>

                  </td>
                </tr>
              
              </tbody>
             
            
                      :
                      <tfoot key={Index}></tfoot>
          ))}
          
        </table>
        </div>
    </div>
  )

  };

  

export default Finalizado