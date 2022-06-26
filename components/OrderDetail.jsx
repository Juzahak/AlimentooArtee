import { useState } from "react";
import styles from "../styles/OrderDetail.module.css";
import {useDispatch} from 'react-redux';


const OrderDetail = ({ total, createOrder, produto }) => {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  const [troco, setTroco] = useState("");
  const [producto, setProducto] = useState([]);
  const [quantidade, setQuantidade] = useState([]);
  const [extra1, setExtra1] = useState([]);
  const [extra2, setExtra2] = useState([]);
   
  console.log(producto)
  console.log(quantidade)
  console.log(extra1)
  console.log(extra2)
 

  const selProd = (e, NomeProduto, quantidade, extra1, extra2) => {
    const checked = e.target.checked;

    if(checked) {
      setProducto((prev) => [...prev, NomeProduto]);
      setQuantidade((prev) => [...prev, quantidade]);
      setExtra1((prev) => [...prev, extra1]);
     setExtra2((prev) => [...prev, extra2]);
    }else{
      setProducto(producto.filter(NomeProduto => NomeProduto._ide !== NomeProduto._id));
      setQuantidade(producto.filter(quantidade => quantidade._ide !== quantidade._id));
      setExtra1(producto.filter(extra1 => extra1._ide !== extra1._id));
      setExtra2(producto.filter(extra2 => extra2._ide !== extra2._id));
      
    }

    
  };

  const handleClick = () => {
    

    createOrder({ customer, troco, address, total, producto, quantidade, extra1, extra2, method: 0 });
   /* produto.title, produto.extraoptions, produto.extraoptions2, produto.quantity */
  };



  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>You will pay $12 after delivery.</h1>
        <div className={styles.item}>
          <label className={styles.label}>Name Surname</label>
          <input
            placeholder="John Doe"
            type="text"
            className={styles.input}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Phone Number</label>
          <input
            type="text"
            placeholder="+1 234 567 89"
            className={styles.input}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Precisa de troco?</label>
          <input
            type="text"
            placeholder="TROCO PARA 50, 100, ..."
            className={styles.input}
            onChange={(e) => setTroco(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Address</label>
          <textarea
            rows={5}
            placeholder="Elton St. 505 NY"
            type="text"
            className={styles.textarea}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        

       

        {produto.map((nomeProd) => (


        
   <div>
    
<div>
<span >PRODUTO: {nomeProd.title} -- </span><span>QUANTIDADES: {nomeProd.quantity}</span>
</div>

<span>
  {nomeProd.extras.map((extra1) => 
  
    <span key={extra1._id}>{extra1}, </span>
    )}
  {nomeProd.extras2.map((extra2) => 
    <span key={extra2._id}>{extra2}, </span>
    )}
</span>
<input
              type="checkbox"
              id={nomeProd.title}
              name={nomeProd.title}
              className={styles.checkbox}
              onChange={(e)=> selProd(e, nomeProd.title, nomeProd.quantity, nomeProd.extras, nomeProd.extras2)}
            />
    </div>
          
        

          ))}
        <button className={styles.button} onClick={handleClick}>
          Order
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
