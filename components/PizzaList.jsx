import styles from "../styles/PizzaList.module.css";
import PizzaCard from "./PizzaCard"

const PizzaList = ({pizzaList}) => {
  return ( 
    <div>
    <div className={styles.container}>
      <h1 className={styles.title}>PRATOS DA CASA</h1>
      <div className={styles.wrapper}>
        {pizzaList.map((pizza) => (
          <PizzaCard key={pizza._id} pizza={pizza}/>
        ))}   
      </div>
    </div>
    <div className={styles.container}>
      <h1 className={styles.title}>BEBIDAS</h1>
      <div className={styles.wrapper}>
        {pizzaList.map((pizza) => (
          <PizzaCard key={pizza._id} pizza={pizza}/>
          ))} 
      </div>
    </div>
    </div>
  );
};

export default PizzaList;
