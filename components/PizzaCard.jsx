import Image from "next/image";
import styles from "../public/styles/PizzaCard.module.css";
import Link from "next/link";

const PizzaCard = ({pizza}) => {
  
  return (
    <div className={styles.container}>
        
      <div className={styles.imagefood}>
      <Link href={`/product/${pizza._id}`} passHref>
      <a>
      <Image src={pizza.img} alt="" width="500" height="500" />
      </a>
      </Link>
      </div>
      <Link href={`/product/${pizza._id}`} passHref>
      <a>
      <h1 className={styles.title}>{pizza.title}</h1>
      </a>
      </Link>
      <Link href={`/product/${pizza._id}`} passHref>
      <a className={styles.price}>
      <span className={styles.price}>R$ {pizza.prices[0]}.00</span>
      </a>
      </Link>
      <Link href={`/product/${pizza._id}`} passHref>
      <a>
      <h2 className={styles.desc}>
        {pizza.desc}
      </h2>
      </a>
      </Link>
      
    </div>
  );
};

export default PizzaCard
