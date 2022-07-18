import styles from "../public/styles/PizzaList.module.css";
import PizzaCard from "./PizzaCard"
import Pratododia from "./Pratododia"

const PizzaList = ({ pizzaList }) => {

  

  return (
    <div className={styles.realcontainer}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {pizzaList.map((pizza) => (
            pizza.refri == false ?
              <Pratododia key={pizza._id} pizza={pizza} />
              :
              <span key={pizza._id}></span>
          ))}
        </div>
      </div>
      <div className={styles.container}>
        <h1 className={styles.title}>BEBIDAS</h1>
        <div className={styles.wrapper}>
          {pizzaList.map((pizza) => (

            pizza.refri == true ?
              <PizzaCard key={pizza._id} pizza={pizza} />
              :
              <span key={pizza._id}></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PizzaList;
