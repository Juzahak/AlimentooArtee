import styles from "../public/styles/dropdown.module.css";
import { useState } from "react";
import ReactDOM from 'react-dom'

function Dropdown({ select, setSelect, price, setPrice }) {
    const [ativo, setAtivo] = useState(false);
    const opcoes = [
        {
            bairro: 'Alto das Palmeiras',
            preco: 8,
        },
        {
            bairro: 'Centro',
            preco: 5
        }, {
            bairro: 'São Luiz',
            preco: 7
        }];
    const frete = [8, 5, 7];
    
    return (
        <div className={styles.container}>
            <div className={styles.icon}>
                <div className={styles.dropBtn} onClick={(e) => setAtivo(!ativo)}>{select}
                    <span src="../public/img/icondown.png" alt="icon">▼</span>
                </div>
            </div>
            {ativo && (

                <div className={styles.dropCont}>
                    {opcoes.map((opt) => 
                        <span key={opt.bairro}>
                        <div onClick={(e) => { setSelect(opt.bairro); setAtivo(false); setPrice(opt.preco); }} className={styles.dropsItem}>
                            {opt.bairro}
                            
                        </div>
                        </span>
                    )}

                </div>
            )}
        </div>
    )
}

export default Dropdown