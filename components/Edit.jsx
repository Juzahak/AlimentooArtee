import styles from "../public/styles/Editar.module.css";


const Edit = ({ setClose2 }) => {
  return (
    <div onClick={() => setClose2(false)} className={styles.mainAddButton}>
      Editar
    </div>
  );
};

export default Edit;