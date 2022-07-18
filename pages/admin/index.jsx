import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../../public/styles/Admin.module.css";
import * as React from 'react';
import Finalizado from "../../components/Finalizado";
import Finalizados from "../../components/Finalizados";
import Edit from "../../components/Edit";
import Editar from "../../components/Editar";
import Print from "../../components/Print";
import Printss from "../../components/Printss";
import PizzaList from "../../components/PizzaList";




const Index = ({ orders, products }) => {
  const [pizzaList, setPizzaList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const [close, setClose] = useState(true);
  const [close2, setClose2] = useState(true);
  const [close3, setClose3] = useState(true);
  const [Ide, setIde] = useState("");


  const status = ["Preparando", "A Caminho!", "Entregue!"];
 

 

 
  
  const getServerSide = async (ctx) => {
  
  
    const orderRes = await axios.get("http://localhost:3000/api/orders");
    var pedidos = orderRes.data;
    
    
    if(pedidos.length !== orderList.length){
      location.reload()
    }else{
      return
    }
    };

    setInterval(function() {
      getServerSide()
      
    }, 5000);


  const handleDelete = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(
        "http://localhost:3000/api/products/" + id
      );
      setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;

    try {
      const res = await axios.put("http://localhost:3000/api/orders/" + id, {
        status: currentStatus + 1,
      });
      setOrderList([
        res.data,
        ...orderList.filter((order) => order._id !== id),
      ]);
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <div className={styles.container}>
      
      
      <div className={styles.item}>
        <div className={styles.alinhado}>
          <h1 className={styles.title}>PEDIDOS</h1>
          {<Finalizados setClose={setClose} />}

          {!close && <Finalizado setClose={setClose} orders={orderList} />}
        </div>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.title}>
              <th>CLIENTE</th>
              <th>PRODUTOS</th>
              <th>PRATOS</th>
              <th>ACOMP.</th>
              <th>TOTAL</th>
              <th>MÉTODO/TROCO</th>
              <th>STATUS</th>
              <th>AÇÃO</th>
            </tr>
          </tbody>

          {orderList.map((order, Index) => (
            order.status == 3 ?
              <tfoot key={Index}></tfoot>


              :


              <tbody key={Index} className={styles.tbTitle}>

                <tr className={styles.trTitle}>
                  <td className={styles.tdtTitle}>{order.customer},
                    <div className={styles.tdt2Title}>{order.select}</div>
                  </td>
                  <td className={styles.tdTitle}>
                    {order.produto.map((sla, Index) =>
                      <div key={Index}>
                        <div className={styles.spanTitle}>{sla.title}
                        {sla.size == 1 && (

                          <div className={styles.name}>COM SALADA!</div>
                        )}
                        </div>
                      </div>
                    )}



                  </td>

                  <td className={styles.td2Title}>
                    {order.produto.map((sla, Index) =>
                      <div className={styles.span3Title} key={Index}>
                        {sla.extras.map((sla2, Index) =>
                          <span key={Index}>{sla2}, </span>
                        )}
                        {sla.refri && '*************'}

                      </div>
                    )}


                  </td>

                  <td className={styles.td2Title}>
                    {order.produto.map((sla, Index) =>
                      <div className={styles.span2Title} key={Index}>
                        {sla.extras2.map((sla2, Index) =>
                          <span key={Index}>{sla2}, </span>
                        )}
                        {sla.refri && '*************'}

                      </div>
                    )}

                  </td>



                  <td className={styles.totalTitle}>R${order.total + order.price}.00</td>
                  <td className={styles.metodoTitle}>
                    {order.metodo === 0 ? <span>--Dinheiro-- ({order.troco}R$)</span> : <span>--Cartão--</span>}
                  </td>
                  <td className={styles.tdTitle}>
                    <div className={styles.statinho}>{status[order.status]}</div>
                    <button className={styles.proximo} onClick={() => handleStatus(order._id)}>
                      Próximo Passo
                    </button>
                  </td>
                  <td className={styles.tdTitle}>
                  <button onClick={() => setIde(order._id)} className={styles.impressao2}>
                {<Print setClose3={setClose3} />}

                  {!close3 && <Printss className={styles.impressao} setClose3={setClose3} order={orderList} orderId={Ide}/>}
                  </button>

                  </td>
                </tr>
              </tbody>

          ))}
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>PRODUTOS</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.title}>
              <th>IMAGEM</th>
              <th>TITULO</th>
              <th>PREÇO</th>
              <th>EDITAR</th>
              <th>EXCLUIR</th>
            </tr>
          </tbody>
          {pizzaList.map((product, Index) => (
            <tbody key={Index}>
              <tr className={styles.trTitle}>
                <td className={styles.tdTitle}>
                  <Image
                    src={product.img}
                    width={50}
                    height={50}
                    objectFit="cover"
                    alt=""
                  />
                </td>
                <td className={styles.tdTitle}>{product.title}</td>
                <td className={styles.tdTitle}>R${product.prices[0]}.00</td>
                <td className={styles.tdTitle} >
                  <button onClick={() => setIde(product._id)}>
                {<Edit setClose2={setClose2} />}

                  {!close2 && <Editar setClose2={setClose2} pizzaList={pizzaList} extras={product.extraOptions} extras2={product.extraOptions2} products={products} pizzaId={Ide}/>}
                  </button>
                  </td>
                  <td>
                  <button
                    className={styles.button}
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      
    </div>
        
  );
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  const productRes = await axios.get("http://localhost:3000/api/products");
  const orderRes = await axios.get("http://localhost:3000/api/orders");
  
  return {
    props: {
      orders: orderRes.data,
      products: productRes.data,
    },
  };
};

export default Index;
