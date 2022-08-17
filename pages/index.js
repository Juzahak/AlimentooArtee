import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Add from "../components/Add";
import AddButton from "../components/AddButton";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import styles from "../public/styles/Home.module.css";
import useSwr from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

export const  getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.token) {
    admin = true;
  }

  
  return {
    props: {
      
      admin,
    },
  };
};

export default function Home({admin}) {
  const [close, setClose] = useState(true);
  const {data: pizzaList} = useSwr("/api/products", fetcher);
  const {data: lista} = useSwr("/api/lists", fetcher);
  console.log(lista);
  if(admin === false){
    return (
      <div className={styles.container}>
        <Head>
          <title>Alimento e Arte</title>
          <meta name="description" content="" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Featured />
        {<AddButton setClose={setClose} />}
        <PizzaList pizzaList={pizzaList || []} lista={lista || []}/>
        {!close && <Add setClose={setClose} lista={lista || []}/>}
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
       
        <PizzaList pizzaList={pizzaList || []} lista={lista || []}/>
        
      </div>
    );
  }
  
}

