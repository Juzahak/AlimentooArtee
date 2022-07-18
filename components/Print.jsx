import styles from "../public/styles/Printss.module.css";

const Print = ({ setClose3 }) => {
  return (
    <div onClick={() => setClose3(false)} className={styles.mainAddButton}>
      EMITIR
    </div>
  );
};

export default Print;