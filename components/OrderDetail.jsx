import { useState } from "react";
import styles from "../public/styles/OrderDetail.module.css";
import { useDispatch } from 'react-redux';


const OrderDetail = ({ total, createOrder, produto, setCash, price, metodo, select }) => {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  const [troco, setTroco] = useState("");
  const [obs, setObs] = useState("");
  const [telefone, setTelefone] = useState("");
  

  

  console.log(produto)


  const handleClick = () => {


    createOrder({ customer, troco, address, total, produto, price, select, obs, metodo, telefone });
    
  };



  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
      <div>
      <span onClick={() => setCash(false)} className={styles.close}>
          X
        </span>
        <h1 className={styles.title}>INFORMAÇÕES DE ENTREGA</h1>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Nome</label>
          <input
            placeholder="NOME"
            type="text"
            className={styles.input}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Telefone</label>
          <input
            type="text"
            placeholder="(XX) XXXXX-XXXX"
            className={styles.input}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </div>
        {!metodo && (
        <div className={styles.item}>
          <label className={styles.label}>Precisa de troco?</label>
          <div className={styles.troquinho}>
          <input
            type="text"
            placeholder="INTEIRO 50, 60..."
            className={styles.input2}
            onChange={(e) => setTroco(e.target.value)}
          />
          <div className={styles.spancents}>,00</div>
          </div>
        </div>
        )}
        <div className={styles.item}>
          <label className={styles.label}>Endereço</label>
          <textarea
            rows={5}
            placeholder="DIGITE SEU ENDEREÇO"
            type="text"
            className={styles.input}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Obs Adicionais</label>
          <textarea
            rows={5}
            placeholder="OBS. ADICIONAIS"
            type="text"
            className={styles.textarea}
            onChange={(e) => setObs(e.target.value)}
          />
        </div>


        

       
        <button className={styles.button} onClick={handleClick}>
          ENVIAR PEDIDO
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
