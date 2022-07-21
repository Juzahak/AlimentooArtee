import styles from "../../public/styles/Product.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {addProduct} from '../../redux/cartSlice';
import Link from "next/link";
import useSwr from 'swr'




const fetcher = (url) => fetch(url).then((res) => res.json())

const Product = ( {productId}) => {
  const {data: pizza} = useSwr(`/api/products/${productId}`, fetcher)
 
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState(0);
  const [qtd, setQtd] = useState(1);
  const [qtd2, setQtd2] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState([]);
  const [extras2, setExtras2] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!pizza) return;
    setPrice(pizza.prices[0]);
  }, [pizza]);

  const changePrice = (number) => {
    setPrice(price + number);
  };

  const handleSize = (sizeIndex) => {
    if(!pizza) return;

    const difference = pizza.prices[sizeIndex] - pizza.prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };


  const handleChange = (e,option) => {
    const checked = e.target.checked;
 
    if(pizza.refri == true && qtd <= 1){
      setQtd(qtd + 1)
      changePrice(option.price);
      setExtras((prev) => [...prev, option.text]);
    }
    if(pizza.refri == true && qtd == 2 && e.target.checked == true){
      e.target.checked = false;
      
      alert("Por favor, selecione até uma opcão")
      

      changePrice(-option.price);
      setExtras(extras.filter(extras => extras !== option.text));
      return false;
    }

    if(pizza.refri == true && qtd <= 2) {
      setQtd(qtd - 1)
      changePrice(-option.price);
      setExtras(extras.filter(extras => extras !== option.text));
    } 


    if(checked && qtd <= 2) {
      
      setQtd(qtd + 1)
      changePrice(option.price);
      setExtras((prev) => [...prev, option.text]);
      
    }

    if(checked == false && qtd <= 3) {
      setQtd(qtd - 1)
      changePrice(-option.price);
      setExtras(extras.filter(extras => extras !== option.text));
    }                    
    if(checked == true && qtd == 3){
      e.target.checked = false;
      
      alert("Por favor, selecione até duas opcões")
     

      changePrice(-option.price);
      setExtras(extras.filter(extras => extras !== option.text));
      return false;
  }
  };

  const handleChange2 = (e,option) => {
    const checked = e.target.checked;
   
    
    if(checked && qtd2 <= 4) {
      
      setQtd2(qtd2 + 1)
      changePrice(option.price);
      setExtras2((prev) => [...prev, option.text]);
      
    }

    if(checked == false && qtd2 <= 5) {
      setQtd2(qtd2 - 1)
      changePrice(-option.price);
      setExtras2(extras2.filter(extras => extras !== option.text));
    }                    
    if(checked == true && qtd2 == 5){
      e.target.checked = false;
      
      alert("Por favor, selecione até quatro opcões")
     

      changePrice(-option.price);
      setExtras2(extras2.filter(extras => extras !== option.text));
      return false;
  }

  };

  const handleClick = () => {
    if(qtd >= 1 && qtd2 >= 2) {
      alert('Item adicionado com sucesso');
    dispatch(addProduct({...pizza, extras, extras2, price, quantity, size}));
  }
  if(pizza.refri == true) {
    alert('Item adicionado com sucesso');
    dispatch(addProduct({...pizza, extras, extras2, price, quantity, size}));
  }
  if(qtd <= 1 && qtd2 <= 2){
    
    return
  }
}

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          {pizza && <Image src={pizza.img} objectFit="contain" layout="fill" alt="" />}
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza?.title}</h1>
        <span className={styles.price}>R$ {price}.00</span>
        <p className={styles.desc}>{pizza?.desc}</p>
        {pizza?.refri && (
          <>
          <div className={styles.position}>
          <div className={styles.margem}>
        <h3 className={styles.choose}>Adicione</h3>
        <div className={styles.ingredients} name='form1'>
          
            {pizza?.extraOptions.map((option) => (
              <div className={styles.option} key={option._id}>
                <input
              type="checkbox"
              id={option.text}
              name={option.text}
              className={styles.checkbox}
              onChange={(e)=>handleChange(e,option)}
            />
            <label htmlFor="double">{option.text}</label>
          </div>
          
            ))}
            </div>
        </div>
        </div>
          </>
        )}

        {!pizza?.refri && (
          
      <>
       
       

        <h3 className={styles.choose}>Deseja experimentar nossa salada hoje?</h3>
        
        
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src="/img/nosalad.png" layout="fill" alt="" />
            <span className={styles.number}>Sem Salada</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src="/img/salad.png" layout="fill" alt="" />
            <span className={styles.number}>Com Salada</span>
          </div>
        </div>
        <div className={styles.position}>
          <div className={styles.margem}>
        <h3 className={styles.choose}>Pratos (Escolha 2)</h3>
        <div className={styles.ingredients} name='form1'>
          
            {pizza?.extraOptions.map((option) => (
              <div className={styles.option} key={option._id}>
                <input
              type="checkbox"
              id={option.text}
              name={option.text}
              className={styles.checkbox}
              onChange={(e)=>handleChange(e,option)}
            />
            <label htmlFor="double">{option.text}</label>
          </div>
          
            ))}
            </div>
        </div>
        <div className={styles.margem}>
        <h3 className={styles.choose}>Acompanhamentos (Escolha 4)</h3>
        <div className={styles.ingredients}>
          
            {pizza?.extraOptions2.map((option) => (
              <div className={styles.option} key={option._id}>
                <input
              type="checkbox"
              id={option.text}
              name={option.text}
              className={styles.checkbox}
              onChange={(e)=>handleChange2(e,option)}
            />
            <label htmlFor="double">{option.text}</label>
          </div>
          
            ))}
            </div>
        </div>
        </div>
        </>
      )}
        <div className={styles.add}>
            <input onChange={(e) => setQuantity(e.target.value)} type="number" defaultValue={1} className={styles.quantity}/>
            
            <Link href="/" passHref >
            <button className={styles.button} onClick={handleClick}>ADICIONAR</button>
            </Link>
            
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({params}) => {

  return {
    props: {
      productId: params.id
    },
  };
}; 

export default Product;
