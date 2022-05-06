import styles from './BtnTransacao.module.css';

const BtnTransacao = ({text, icon, id}) => {
  return(
    <button id={id} className={styles.btnNovaTransacao}>
      <p className={styles.icon}>{icon}</p>
      <p className={styles.text}>{text}</p>
    </button>
  );
}

export default BtnTransacao;