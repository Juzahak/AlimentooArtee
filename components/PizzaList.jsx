import styles from "../public/styles/PizzaList.module.css";
import PizzaCard from "./PizzaCard"
import Pratododia from "./Pratododia"
import useSwr, {isValidating} from 'swr'
import axios from 'axios'
import { useEffect, useState } from "react";

const PizzaList = ({ pizzaList, lista }) => {

  
  
  

  



console.log(lista);

  
  
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
        
      {lista.map((listt) => (
        <>
          <h1 className={styles.title}>{listt.list}</h1>
        <div className={styles.wrapper} key={listt.list}>
          {pizzaList.map((pizza) => (

            pizza.refri == true && pizza.listName === listt.list ?
              <PizzaCard key={pizza._id} pizza={pizza} />
              :
              <span key={pizza._id}></span>
          ))}
        </div>
        </>
      ))}
      
      </div>
    </div>
  );
};

export default PizzaList;
