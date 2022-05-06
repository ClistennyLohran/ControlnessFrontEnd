import styles from './Footer.module.css';

import { FaYoutube, FaGithub, FaLinkedinIn } from "react-icons/fa";

const Footer = ({icon}) => {
  return(
    <div className={styles.footer}>
      <div className={styles.socialMedia}>
        <p className={styles.media}><FaYoutube/></p>
        <p className={styles.media}><FaGithub/></p>
        <p className={styles.media}><FaLinkedinIn/></p>
      </div>
      <div className={styles.createdBy}>
        <p className={styles.icon}>{icon}</p>
        <p className={styles.text}>Criado por LohranBM</p>
      </div>
    </div>
  );
}

export default Footer;