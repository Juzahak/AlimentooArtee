import { useState } from "react";
import styles from "../public/styles/Editar.module.css";
import axios from "axios";
import useSwr, {mutate} from 'swr'


const Editar = ({ setClose2, pizzaId, products, extras, extras2 }) => {
  const [pizzaList, setPizzaList] = useState(products);
  const [nomePrato, setNomePrato] = useState("");
  const [prices, setPrices] = useState([]);
  const [extra, setExtra] = useState([extras]);
  const [extra2, setExtra2] = useState([extras2]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [extraOptions2, setExtraOptions2] = useState([]);
  const [desc, setDesc] = useState(null);


  const [ide, setId] = useState(pizzaId);

 


  

  const handleUpdate = async (id) => {
    const item = products.filter((pizza) => pizza._id === id);

 if(nomePrato == "" || prices == "" || desc == ""){
  alert("preencha os campos corretamente")
  return
 }else{

    try {
      const res = await axios.put(`/api/products/${id}`, {
        title: nomePrato,
        prices: prices,
        extraOptions: extraOptions,
        extraOptions2: extraOptions2,
        desc: desc,
      });
      mutate(`/api/products`);
      location.reload()
    } catch (err) {
      console.log(err);
    }
  }
  };


  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };


  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
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

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.flexx}>
        <h1 className={styles.title}>EDITAR ITEM</h1>
      <div onClick={() => setClose2(true)} className={styles.close}>
        X
      </div>
      </div>
        {pizzaList.map((produto, Index) =>
          produto._id == ide ?

            <div key={Index}>
              <div className={styles.item} key={Index}>
                <h2 className={styles.label}>Nome</h2>
                <input
                  type="text"
                  className={styles.vames}
                  placeholder={produto.title}
                  onChange={(e) => setNomePrato(e.target.value)}
                />
                
              </div>
              <div className={styles.item}>
                <label className={styles.label}>Valores</label>
                <div className={styles.priceContainer}>
                  <span>Sem Salada:</span>
                  <input
                    className={`${styles.input} ${styles.inputSm}`}
                    type="number"
                    placeholder={produto.prices[0]}
                    onChange={(e) => changePrice(e, 0)}
                  />
                  {!produto.refri &&
                  <>
                  <span>Com Salada:</span>
                    <input
                      className={`${styles.input} ${styles.inputSm}`}
                      type="number"
                      placeholder={produto.prices[1]}
                      onChange={(e) => changePrice(e, 1)}
                    />
                    </>
                  }

                </div>
              </div>

              <div className={styles.item}>

                <label className={styles.label}>Pratos</label>
                <div className={styles.extra}>
                  <input
                    className={`${styles.input} ${styles.inputSm}`}
                    type="text"
                    placeholder="Item"
                    name="text"
                    onChange={handleExtraInput}
                  />
                  <input
                    className={`${styles.input} ${styles.inputSm}`}
                    type="number"
                    placeholder="Valor"
                    name="price"
                    onChange={handleExtraInput}
                  />
                  <div className={styles.extraButton} onClick={handleExtra}>
                    Adicionar!
                  </div>
                </div>

                <div className={styles.extraItems}>
                  <div className={styles.separador}> ANTIGOS:  
                  {produto.extraOptions.map((option, Index) => (

                    <span key={Index} className={styles.extraItem}>
                       {option.text}
                    
                    </span>
                  ))}
                    </div>
                  <div> NOVOS:
                  {extraOptions.map((option, Index) => (
                    <span key={Index} className={styles.extraItem}>
                      {option.text}
                    
                    </span>
                  ))}
                  </div>
                </div>
              </div>



              <div className={styles.item}>
                {!produto.refri &&
                  <>
                    <label className={styles.label}>Acompanhamentos</label>
                    <div className={styles.extra}>
                      <input
                        className={`${styles.input} ${styles.inputSm}`}
                        type="text"
                        placeholder="Item"
                        name="text"
                        onChange={handleExtraInput2}
                      />
                      <input
                        className={`${styles.input} ${styles.inputSm}`}
                        type="number"
                        placeholder="Valor"
                        name="price"
                        onChange={handleExtraInput2}
                      />
                      <div className={styles.extraButton} onClick={handleExtra2}>
                        Adicionar!
                      </div>
                    </div>
                  </>}
                  {!produto.refri &&
                <div className={styles.extraItems}>
                <div className={styles.separador}> ANTIGOS:  
                  {produto.extraOptions2.map((option, Index) => (
                   
                  
                    <span key={Index} className={styles.extraItem}>
                       {option.text}
                    
                    </span>
                    
                  ))}
                    </div>
                  <div> NOVOS:
                  {extraOptions2.map((option, Index) => (
                    <span key={Index} className={styles.extraItem}>
                      {option.text}
                    
                    </span>
                  ))}
                  </div>
                </div>
                      }
              </div>


            

              <div className={styles.item}>
                <h2 className={styles.label}>Obs Novas</h2>
                <textarea
                  rows={5}
                  placeholder={produto.desc}
                  type="text"
                  className={styles.textarea}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>
              <div className={styles.item}>
          
                <textarea
                  rows={5}
                  defaultValue={produto.desc}
                  type="text"
                  className={styles.textarea}
                />
              </div>

        <div className={styles.button} onClick={() => handleUpdate(produto._id)}>
          EDITAR ITEM
        </div>
            </div>
            :
            <span key={Index}></span>
        )}





      </div>
    </div>
  )

};


export default Editar