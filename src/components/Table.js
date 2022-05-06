import styles from './Table.module.css';

import { BsFillTrashFill } from 'react-icons/bs';

const Table = ({data, handleDelete}) => {

  function handleSubmit(e) {
    e.preventDefault();
  }

  function CheckValor() {
    let formatValue = data.valores.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});

    if(data.tipoTransacao) {
      return <td className={styles.entrada}>{formatValue}</td>;
    }
    return <td className={styles.saida}>-{formatValue}</td>;
  }

  return (
    <>
      <tr className={styles.row}>
        <td>{data.nomeTransacao}</td>
        <CheckValor/>
        <td>{data.dataTransacao}</td>
        <td>
          <form className={styles.deletar} onSubmit={handleSubmit}>
            <button onClick={() => handleDelete(data._id)} className={styles.btnSubmit} type="submit"><BsFillTrashFill/></button>
          </form>
        </td>
      </tr>
    </>
  );
}

export default Table;