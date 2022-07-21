import Image from "next/image";
import styles from "../public/styles/Navbar.module.css";
import {useSelector} from "react-redux";
import {useState, useEffect} from "react";
import Link from "next/link";


const Navbar = () => {
  const [data, setData] = useState();
  const quantity = useSelector((state) => state.cart.quantity);
  


  useEffect(() => {
    
  
    let data = JSON.parse( localStorage.getItem('produto'));
    console.log(data)
    setData(data);
    return;
    
  }, []);

const pedidinho = data? `/orders/${data}` : `/orderCheck`;



  const teste = () => {
   
    if(quantity > 0) {
      

      return ( <Link href="/cart" passHref>    
      <div className={styles.item}>
        <div className={styles.cart}>
          <Image src="/img/cestinha.png" alt="" width="70px" height="70px" />
          <div className={styles.counter}>{quantity}</div>
        </div>
      </div>
      </Link>
      )
    }
    if(quantity == 0 ) {
     return ( <Link href="/cart" passHref>
      <div className={styles.item}>
        <div className={styles.cart}>
          <Image src="/img/cestavazia.png" alt="" width="70px" height="70px" />
          <div className={styles.counter}>{quantity}</div>
        </div>
      </div>
      </Link>
   ) }
  }
  
 
    return (
      <div className={styles.container}>
        <div className={styles.logotipomob}>
            
            <Image src="/img/ALimentoeArtelogo.png" alt="" width="600px" height="170px"/>
            </div>
            
            <div className={styles.menumob}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image src="/img/logow.png" alt="" width="55" height="55" />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>WhatssApp</div>
          <div className={styles.text}>(XX)XXXXX-XXXX</div>
        </div>
      </div>
      <div className={styles.item}>
            
        <ul className={styles.list}>
          <Link href="/" passHref >
          <div className={styles.menus2}>Menu</div>
          </Link>
          
          <div className={styles.logotipo}>
            
          <Image src="/img/ALimentoeArtelogo.png" alt="" width="600px" height="170px"/>
          </div>
          
          <Link href={pedidinho} passHref >
            
          <div className={styles.menus} >Pedido</div>    
          </Link>

        </ul>
      </div>
      {teste()}
      </div>
    </div>
    )
  }
  
export default Navbar