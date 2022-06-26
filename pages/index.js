import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Add from "../components/Add";
import AddButton from "../components/AddButton";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import styles from "../styles/Home.module.css";

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.token) {
    admin = true;
  }

  const res = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      pizzaList: res.data,
      admin,
    },
  };
};

export default function Home({ pizzaList, admin}) {
  const [close, setClose] = useState(true);
  
  if(admin === true){
    return (
      <div className={styles.container}>
        <Head>
          <title>Alimento e Arte</title>
          <meta name="description" content="" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Featured />
        {<AddButton setClose={setClose} />}
        <PizzaList pizzaList={pizzaList} />
        {!close && <Add setClose={setClose} />}
      </div>
    );
  }else{
    return (
      <div className={styles.container}>
        <Head>
          <title>Alimento e Arte</title>
          <meta name="description" content="" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Featured />
       
        <PizzaList pizzaList={pizzaList} />
        
      </div>
    );
  }
  
}

