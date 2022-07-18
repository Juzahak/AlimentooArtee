import styles from "../public/styles/Add.module.css";
import ReactDOM from 'react-dom'



const AddButton = ({ setClose }) => {
  return (
    <div onClick={() => setClose(false)} className={styles.mainAddButton}>
     Adicionar item!
    </div>
  );
};

export default AddButton;
