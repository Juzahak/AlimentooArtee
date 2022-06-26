import styles from "../styles/Cart.module.css";
import Image from "next/image";
import {useDispatch, useSelector} from "react-redux"
import { useState } from "react";
import {useRouter} from "next/router";
import {reset} from "../redux/cartSlice";
import OrderDetail from "../components/OrderDetail";
import axios from "axios";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  
  console.log(cart.products)
  
  const createOrder = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/orders", data);
      if (res.status === 201) {
        dispatch(reset());
        router.push(`/orders/${res.data._id}`);
      }
    }catch(err){
      console.log(err);
    }
  }

  
  

  return (
    <div className={styles.container}> 
      <div className={styles.left}>
        <table className={styles.table}>
          <tbody>
            
          <tr className={styles.trTitle}>
            <th>Product</th>
            <th>Name</th>
            <th>Pratos</th>
            <th>Acompanhamentos</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
          </tbody>
          <tbody>

          {cart.products.map((product) => (
            
            <tr className={styles.tr} key={product._id}>
            <td>
              <div className={styles.imgContainer}>
                <Image
                  src={product.img}
                  layout="fill"
                  objectFit="cover"
                  alt=""
                />
              </div>
            </td>
            <td>
              <span className={styles.name}>{product.title}</span>
            </td>
            <td>
              <span className={styles.extras}>
                {product.extras.map((extra) => 
                  <span key={extra._id}>{extra}, </span>
                  )}
                
              </span>
            </td>
            <td>
              <span className={styles.extras}>
                {product.extras2.map((extra2) => 
                  <span key={extra2._id}>{extra2}, </span>
                  )}
                
              </span>
            </td>
            <td>
              <span className={styles.price}>${product.price}</span>
            </td>
            <td>
              <span className={styles.quantity}>{product.quantity}</span>
            </td>
            <td>
              <span className={styles.total}>${product.price * product.quantity}</span>
            </td>
          </tr>
          ))}
          </tbody>
          
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>Cesta de Compras</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>${cart.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>${cart.total}
          </div>
          {open ? (
            <div className={styles.paymentMethods}>
              <button className={styles.payButton} onClick={() => setCash(true)}>CARTÃO DÉBITO OU CRÉDITO</button>
            <button className={styles.payButton} onClick={() => setCash(true)}>DINHEIRO</button>
            </div>
          ) : (
            
            <button onClick ={()=> setOpen(true)} className={styles.button}>MÉTODO DE PAGAMENTO!</button>
            )}
        </div>
      </div>
      
      {cash && <OrderDetail total={cart.total} produto={cart.products} createOrder={createOrder}/>}
    </div>
  );
};

export default Cart;
