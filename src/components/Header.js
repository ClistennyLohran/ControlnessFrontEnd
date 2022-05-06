import { Link } from 'react-router-dom';
import { FaHome, FaRegChartBar, FaUserPlus } from 'react-icons/fa';

import styles from './Header.module.css';
import logo from '../img/Logo.svg';

const Header = () => {
  return (
    <div className={styles.containerMenu}>
      <div className={styles.header}>
        <img className={styles.logo} src={logo} alt="Logo"></img>
        <h1 className={styles.title}>CONTROLNESS</h1>
      </div>
      <div className={styles.menu}>
        <ul className={styles.menuGroup}>
          <li>
            <Link className={styles.item} to="/graficos"><FaRegChartBar/></Link>
          </li>
          <li>
            <Link className={styles.item} to="/"><FaHome/></Link>
          </li>
          <li>
            <Link className={styles.item} to="/usuarios"><FaUserPlus/></Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;