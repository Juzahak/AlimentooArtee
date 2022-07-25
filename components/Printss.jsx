import { useState } from "react";
import styles from "../public/styles/Printss.module.css";
import Image from "next/image";



const Printss = ({ setClose3, order, orderId }) => {
    const [ide, setId] = useState(orderId);

  
 
 
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.flexx}>
     
      <div onClick={() => setClose3(true)} className={styles.close}>
        X
      </div>
      </div>
      {order.map((pedidos, Index) => (
          pedidos._id == ide ?
          
          <div className={styles.conts} key={Index}>
            <section className={styles.notinha} id={styles.notinhaPr}>
            <div className={styles.position34}></div>
            <div className={styles.position25}>Alimento e Arte</div>
            <div className={styles.position}>Dia: {pedidos.createdAt.slice(0, 10)} </div>
            <div className={styles.position}>Hora: {pedidos.createdAt.slice(11, 16)}</div>
            <div className={styles.position}>====================</div>
            <div className={styles.position4}>-Cliente-</div>
            <div className={styles.position4}>{pedidos.customer}</div>
            <div className={styles.position4}>{pedidos.telefone}</div>
            <div className={styles.position}>====================</div>

            <div className={styles.position4}>{pedidos.address}</div>
            <div className={styles.position4}>{pedidos.select}</div>
            <div className={styles.position4}>OBS:  {pedidos.obs}</div>
            <div className={styles.position}>====================</div>
            <div className={styles.position2}>-Pedido-</div>
            {pedidos.produto.map((produtos, Index) => (
                <div key={Index}>
                    <div className={styles.position}>{produtos.title}</div>
                    <div className={styles.position}>Quantidade: {produtos.quantity}</div>
                    
                    {!produtos.refri && <div className={styles.position2}>-Pratos-</div>}
                    {produtos.extras.map((extras1, Index) => 
                        <div className={styles.position} key={Index}>-{extras1}</div>
                    )}
                    {!produtos.refri && <div className={styles.position2}>-Acompanhamentos-</div>}
                    {produtos.extras2.map((extras2, Index) => 
                        <div className={styles.position} key={Index}>-{extras2}</div>
                    )}
            <div className={styles.position}>====================</div>
            </div>
                
                
                ))}
                <div className={styles.position}>Sub-Total: R${pedidos.total}.00</div>
                <div className={styles.position}>Tax-Entreg: R${pedidos.price}.00</div>
                <div className={styles.position}>Total: R${pedidos.price + pedidos.total}.00</div>
                {pedidos.metodo == 0 ?
                <div className={styles.position}>Método: Dinheiro</div>
                :
                <div className={styles.position}>Método: Cartão</div>
                }
                <div className={styles.position}>Troco Para: R${pedidos.troco}.00</div>
                <div className={styles.position3}></div>
                <div className={styles.image}>
                <Image src="/img/ALimentoeArtelogo.png" alt="" width="220px" height="70px"/>
                </div>
            </section>
        </div>
            
            :
            <footer key={Index}></footer>
            
            
            ))}
          
            <div onClick={() => window.print()} className={styles.imprimirbutton}>IMPRIMIR</div>
            
      </div>
    </div>
  )

};

export default Printss;