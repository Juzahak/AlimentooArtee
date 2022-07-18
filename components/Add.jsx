import { useState } from "react";
import styles from "../public/styles/Add.module.css";
import axios from "axios";
import { useRouter } from "next/router";



const Add = ({ setClose }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [prices, setPrices] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [extraOptions2, setExtraOptions2] = useState([]);
  
  const [extra, setExtra] = useState(null);
  const [extra2, setExtra2] = useState(null);
  const [refri, setRefri] = useState(false);

  
  
  
  console.log(refri)

  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

 

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name] : e.target.value });
  };

  const handleExtra = (e) => {
    setExtraOptions((prev) => [...prev, extra]);
  };
  const handleExtraInput2 = (e) => {
    setExtra2({ ...extra2, [e.target.name]: e.target.value });
  };

  const handleExtra2 = (e) => {
    setExtraOptions2((prev) => [...prev, extra2]);
  };

  const handleCreate = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dsy2z7f4h/image/upload",
        data
      );
        
      const { url } = uploadRes.data;

      const newProduct = {
        title,
        desc,
        prices,
        refri,
        extraOptions,
        extraOptions2,
        img: url,
      };

      await axios.post("http://localhost:3000/api/products", newProduct);
      setClose(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setClose(true)} className={styles.close}>
          X
        </span>
        <h1>Adicionar novo item!</h1>
        <div className={styles.item}>
          <label className={styles.label}>Escolha uma imagem</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className={styles.bebida}>Bebida/outro
          <input type="checkbox" 
          className={styles.inputinho} 
          checked={refri} 
          name="text"
          onClick={(e) => setRefri(e.target.checked)} >
         

          </input>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Nome do Produto</label>
          <input
            className={styles.input}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Descrição</label>
          <textarea
            rows={4}
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Valores</label>
          <div className={styles.priceContainer}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Sem salada OU Suco/Sopa"
              onChange={(e) => changePrice(e, 0)}
            />
            { !refri &&
              <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Com salada OU Deixar vazio"
              onChange={(e) => changePrice(e, 1)}
              />
            }
            
          </div>
        </div>
        <div className={styles.item}>
          
          <label className={styles.label}>Pratos</label>
          <div className={styles.extra}>
           <input
              className={`${styles.input} ${styles.inputSm}`}
              type="text"
              placeholder="Item/Sabor"
              name="text"
              onChange={handleExtraInput}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Valor/10, 25, 30, 22, 15..."
              name="price"
              onChange={handleExtraInput}
            />
            <button className={styles.extraButton} onClick={handleExtra}>
              Adicionar
            </button>
          </div>
           
          <div className={styles.extraItems}>
            {extraOptions.map((option) => (
              <span key={option.text} className={styles.extraItem}>
                {option.text}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.item}>
        { !refri &&
           <>
          <label className={styles.label}>Acompanhamentos</label>
          <div className={styles.extra}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="text"
              placeholder="Item OU deixar vazio"
              name="text"
              onChange={handleExtraInput2}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Valor OU deixar vazio"
              name="price"
              onChange={handleExtraInput2}
            />
            <button className={styles.extraButton} onClick={handleExtra2}>
              Adicionar
            </button>
          </div>
          </> }
          <div className={styles.extraItems}>
            {extraOptions2.map((option) => (
              <span key={option.text} className={styles.extraItem}>
                {option.text}
              </span>
            ))}
          </div>
        </div>
        <button className={styles.addButton} onClick={handleCreate}>
          Criar item!
        </button>
      </div>
    </div>
  );
};

export default Add;
