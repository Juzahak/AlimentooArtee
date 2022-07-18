import Image from "next/image";
import styles from "../public/styles/Footer.module.css";
import Gmaps from "./Gmaps"


const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/img/foto4.jpg" objectFit="cover" layout="fill" alt="" />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>
            Obrigado por visitar nosso menu,
            <br />
            <br />
             Nossa alegria é te servir bem!
          </h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>LOCAL DO RESTAURANTE</h1>
          <div className={styles.text}>
           
            Rua Sete de Setembro 228, 
            <br /> Serra Negra - SP,
            <br /> 13930-000 
            <br /> (XX) XXXXX-XXXX
          </div>
         
        </div>
        
        <div>
        <Gmaps />

        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>ABERTO ÁS:</h1>
          <div className={styles.text}>
          Segunda: 12:00 às 15:00
            
          </div>
          <div className={styles.text}>
          Terça: 12:00 às 15:00         
          </div>
          <div className={styles.text}>
          Quarta: 12:00 às 15:00
            
          </div>
          <div className={styles.text}>
          Quinta: 11:00 às 15:00
          </div>
          <div className={styles.text}>
          Sexta: 12:00 às 15:00
          <br />17:00 às 23:00
            
          </div>
          <div className={styles.text}>
          Sábado: 12:00 às 15:00
          <br />  17:00 às 23:00
            
          </div>
          <div className={styles.text}>
          Domingo: 12:00 às 15:00
          <br />   17:00 às 23:00
            
          </div>
          
        </div>
      </div>
      
    </div>
  );
};

export default Footer;
