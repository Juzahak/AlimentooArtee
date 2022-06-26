import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../../styles/Admin.module.css";

const Index = ({ orders, products }) => {
  const [pizzaList, setPizzaList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  
  
  const status = ["Preparando", "A Caminho!", "Entregue!"];

  /* const rows = array.reduce(function (rows, key, index) { 
    return (index % 2 == 0 ? rows.push([key]) 
      : rows[rows.length-1].push(key)) && rows;
  }, []); */



  


  console.log( );
  
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
        <h1 className={styles.title}>PEDIDOS</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>CLIENTE</th>
              <th>PEDIDO</th>
              <th>PRATOS</th>
              <th>ACOMP.</th>
              <th>TOTAL</th>
              <th>MÉTODO/TROCO</th>
              <th>ESTÁGIO</th>
            </tr>
          </tbody>
          {orderList.map((order) => (
           order.status == 3 ? 
            <head></head>
            :
            <tbody key={order._id}>
              <tr className={styles.trTitle}>
                <td className={styles.tdTitle}>{order.customer}</td>
                <td className={styles.tdTitle}> 
                  {order.producto.map((sla) => 
                  <div>
                  <div>{sla}</div>
                  <div className={styles.div2Title}></div>
                  </div>
                  )}
                  
                 
              
                  </td>

            <td className={styles.td2Title}>
            {order.extra1.map((sla) => 
                  <div className={styles.spanTitle}>
                {sla.map((sla2) => 
                  <span >{sla2}, </span>
                )}
                    <div className={styles.divTitle}></div>
                  </div>
                  )}
              
                
                </td>
                
                <td className={styles.tdTitle}>
                {order.extra2.map((sla) => 
                  <div >
                {sla.map((sla2) => 
                  <span>{sla2}, </span>
                )}
                   <div className={styles.div2Title}></div>
                  </div>
                  )}
                
                </td>
               
               

                <td className={styles.tdTitle}>R${order.total}</td>
                <td className={styles.tdTitle}>
                  {order.method === 0 ? <span>Dinheiro ({order.troco}R$)</span> : <span>Cartão</span>}
                </td>
                <td className={styles.tdTitle}>{status[order.status]}</td>
                <td className={styles.tdTitle}>
                  <button onClick={() => handleStatus(order._id)}>
                    Próximo Passo
                  </button>
                </td>
              </tr>
            </tbody>
          
          ))}
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tbody>
          {pizzaList.map((product) => (
            <tbody key={product._id}>
              <tr className={styles.trTitle}>
                <td>
                  <Image
                    src={product.img}
                    width={50}
                    height={50}
                    objectFit="cover"
                    alt=""
                  />
                </td>
                <td>{product._id.slice(0, 5)}...</td>
                <td>{product.title}</td>
                <td>${product.prices[0]}</td>
                <td>
                  <button className={styles.button}>Edit</button>
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
