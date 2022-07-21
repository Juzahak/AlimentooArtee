import styles from "../../public/styles/Order.module.css";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import {useRouter} from "next/router";
import useSwr from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

const Order = ({ orderId }) => {

  const {data: order} = useSwr(`/api/orders/${orderId}`, fetcher)
  console.log(order);

  const status = order?.status;
 
  

  const router = useRouter();
 
  
  useEffect(() => {
    
  if(status === 3) {
    let data = localStorage.removeItem('produto');
    console.log(data)
   
    return;
  }
  }, []);
  
 
 
    
  




const checked = () => {
  if(order?.metodo == 1) {
   
    return (<div className={styles.totalTextTitle}>MÉTODO: Cartão de Créd./Deb.</div>)
  }else{
    return (<div className={styles.totalTextTitle}>MÉTODO: Dinheiro</div>)
  }
}


  const statusClass = (index) => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.undone;
  };
  return (
    
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.row}>
          <table className={styles.table}>
            <thead>
            <tr className={styles.trTitle}>
              <th>CLIENTE</th>
              <th>PRODUTOS</th>
              <th>PRATOS</th>
              <th>ACOMPAN.</th>
              <th>VALORES</th>
              <th>TOTAL</th>
            </tr>
            </thead>
            <tbody>
            <tr className={styles.tr}>
              <td className={styles.address3}>
                <span className={styles.id}>{order?.customer}</span>
              </td>
              </tr>
              
              
             
              {order?.produto.map((produto) =>
              <tr className={styles.tr} key={produto?._id}>
              <td>
                <div className={styles.imgContainer}>
                  <Image
                    src={produto?.img}
                    alt="oi"
                    width="100%"
                    height="100%"
                  />
                </div>
              </td>
              <td className={styles.name}>
                <span className={styles.name}>{produto?.title} </span>
                {produto.size == 1 && (
  
                  <span className={styles.name}> COM SALADA!</span>
                )}
              </td>
              <td>
                <span className={styles.extras}>
                  <span></span>
                  {produto?.extras.map((extra) => 
                    <span key={extra}>{extra}, </span>
                    )}
                  {produto?.refri && <></>}
                </span>
              </td>
              <td>
                
                <span className={styles.extras}>
                <span></span>
  
                  {produto?.extras2.map((extra2) => 
                    <span key={extra2}>{extra2}, </span>
                    )}
                  {produto?.refri && <></>}
                </span>
              </td>
              <td className={styles.carttd}>
                <span className={styles.price}>R${produto?.price}.00  </span>
                <div className={styles.quantity}>QTD: {produto?.quantity}</div>
              </td>
              <td className={styles.cartdt}>
                <span className={styles.price}>R${produto?.price}.00</span>
              </td>
              <td className={styles.cartdt}>
                <span className={styles.quantity}>{produto?.quantity}</span>
              </td>
              <td>
                <span className={styles.total}>R${produto?.price * produto?.quantity}.00</span>
              </td>
            </tr>
              )}
              <tr className={styles.tr}>

              <td className={styles.address3}>
                <span className={styles.id3}>{order?.address}</span>
              </td>
              <td className={styles.address3}>
                
                <span className={styles.id2}>{order?.obs}</span>
              </td>
              </tr>
              </tbody>
          </table>
        </div>
        <div className={styles.row}>
          <div className={statusClass(0)}>
            <Image src="/img/paid.png" width={30} height={30} alt="" />
            <span>Recebido</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/img/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          <div className={statusClass(1)}>
            <Image src="/img/bake.png" width={30} height={30} alt="" />
            <span>Preparando</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/img/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          <div className={statusClass(2)}>
            <Image src="/img/bike.png" width={30} height={30} alt="" />
            <span>A caminho</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/img/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          <div className={statusClass(3)}>
            <Image src="/img/delivered.png" width={30} height={30} alt="" />
            <span>Entregue</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/img/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CESTA TOTAL</h2>
          <div className={styles.totalText}>
            
            {checked()}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>SUBTOTAL:</b>R${order?.total}.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>ENTREGA:</b>R${order?.price}.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>TROCO PARA:</b>R${order?.troco}.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>TOTAL:</b>R${order?.total + order?.price}.00
          </div>
          <button disabled className={styles.button}>
            PEDIDO RECEBIDO!
          </button>
        </div>
      </div>
    </div>
      
  );
};

export const getServerSideProps = async ({ params }) => {
  
  return {
    props: {orderId: params.id},
  };
};

export default Order;
