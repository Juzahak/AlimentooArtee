import Image from "next/image";
import styles from "../public/styles/Pratododia.module.css";
import Link from "next/link";


const Pratododia = ({ pizza }) => {


  return (
    <div className={styles.container}>
      <h1 className={styles.titulomob}>Sejam Bem Vindos ao nosso Restaurante!</h1>
      <div className={styles.imgg}>
        <Link href={`/product/${pizza._id}`} passHref>
          <a>

          <Image src={pizza.img} alt="" width="550" height="500" />
          </a>
        </Link>
      </div>

      <div className={styles.apresentacao}>
        <Link href={`/product/${pizza._id}`} passHref>
        <a>
          <Image src="/img/ornamentosuperior.png" alt="" width="500" height="100" />
          </a>
          </Link>
          <div className={styles.titext}>
            <Link href={`/product/${pizza._id}`} passHref>
            <a>
              <span className={styles.title}>{pizza.title}</span>
              </a>
              </Link>
              <Link href={`/product/${pizza._id}`} passHref>
              <a>
              <span className={styles.price}>R${pizza.prices[0]}.00</span>
              </a>
              </Link>
              <div className={styles.titext2}>
                <Link href={`/product/${pizza._id}`} passHref>
                <a>
                  <h2 className={styles.desc}>
                    Venha conhecer o verdadeiro sabor,
                  </h2>
                  </a>
                  </Link>
                  <Link href={`/product/${pizza._id}`} passHref>
                  <a>
                  <h2 className={styles.desc}>
                    Alimento e Arte!
                  </h2>
                  </a>
                  </Link>
                  <Link href={`/product/${pizza._id}`} passHref>
                  <a>
                  <h2 className={styles.desc}>
                    Alimento saúdavel e Delicioso!      </h2>
                    </a>
                </Link>
              </div>
          </div>
          <Link href={`/product/${pizza._id}`} passHref>
          <a>
          <Image src="/img/ornamentoinferior.png" alt="" width="500" height="100" />
          </a>
          </Link>
      </div>
    </div>
  );
};

export default Pratododia;