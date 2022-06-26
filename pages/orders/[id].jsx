import styles from "../../styles/Order.module.css";
import Image from "next/image";
import axios from "axios";
import { useEffect } from "react";


const Order = ({ order }) => {
  const status = order.status;

  
  
  const seila = () => {
    
    var rows = [];
     
        for (let index = 0; index < order.lenght; index++) {
                 if(index.lenght < order.lenght) {

                  rows.push(<div>
                <div className={styles.name}>{order.producto[index]} -- QTD: {order.quantidade[index]}</div>
                 <div>PRATOS: {order.extra1[index]},</div>
                <div className={styles.acomp}>ACOMPANHAMENTOS: {order.extra2[index]},</div>
                <div>------------</div>
               </div>);
                }else{
                  return <div>{rows}</div>;
                }
              }
              
              
    
};

console.log(seila())

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
            <tr className={styles.trTitle}>
              <th>CLIENTE</th>
              <th>PRODUTOS</th>
              <th>PRATOS</th>
              <th>ACOMPAN.</th>
              <th>ENDERECO</th>
            </tr>
            <tr className={styles.tr}>
              <td>
                <span className={styles.id}>{order.customer}</span>
              </td>
              <td>
              
              
             
              {order.producto.map((produto) =>
              <div>

                <div className={styles.address}>{produto}</div>
                ----------
                </div>
              )}

              </td>
              <td>
                {order.extra1.map((sla) => 
                <div>
                  {sla.map((sla2) =>
                <span className={styles.address}>{sla2}, </span>
                  )}
                <div>-------</div>
                </div>

                )}
              </td>
              <td>
                {order.extra2.map((sla) => 
                <div>
                  {sla.map((sla2) => 
                <span className={styles.address}>{sla2}, </span>
                  )}
                <div>---------</div>
                </div>

                )}
              </td>
              <td>
                <span className={styles.address}>{order.address}</span>
              </td>
              
            </tr>
          </table>
        </div>
        <div className={styles.row}>
          <div className={statusClass(0)}>
            <Image src="/img/paid.png" width={30} height={30} alt="" />
            <span>Payment</span>
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
            <span>Preparing</span>
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
            <span>On the way</span>
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
            <span>Delivered</span>
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
            <b className={styles.totalTextTitle}>SUBTOTAL:</b>R${order.total}.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>ENTREGA:</b>R$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>TROCO PARA:</b>R${order.troco}.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>TOTAL:</b>R${order.total}.00
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
  const res = await axios.get(`http://localhost:3000/api/orders/${params.id}`);
  return {
    props: { order: res.data },
  };
};

export default Order;
