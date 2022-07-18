import styles from "../public/styles/Finalizado.module.css";

const Finalizados = ({ setClose }) => {
  return (
    <div onClick={() => setClose(false)} className={styles.mainAddButton}>
      FINALIZADOS
    </div>
  );
};

export default Finalizados;