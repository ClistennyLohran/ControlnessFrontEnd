import { useEffect, useState } from 'react';
import api from '../services/api';

import '../../src/css/global.css';
import '../../src/css/reset.css';

import styles from '../App.module.css';

import Header from '../components/Header';
import Card from '../components/Card';
import BtnTransacao from '../components/BtnTransacao';
import Table from '../components/Table';
import Footer from '../components/Footer';

import { BsArrowUpCircle, BsArrowDownCircle, BsFillPlusCircleFill } from "react-icons/bs";
import { MdAttachMoney } from "react-icons/md";
import { AiFillThunderbolt, AiFillCloseSquare } from "react-icons/ai";

const Home = () => {
  const [allRows, setAllRows] = useState([]);

  const [nomeTransacao, setNomeTransacao] = useState('');
  const [valores, setValores] = useState('');
  const [tipoTransacao, setTipoTransacao] = useState(true);

  const [totalEntradas, setTotalEntradas] = useState([]);
  const [totalSaidas, setTotalSaidas] = useState([]);

  const [valorFinal, setValorFinal] = useState();

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await api.post('/transacoes', {
      nomeTransacao,
      valores,
      tipoTransacao,
    });

    clearInputs();
    setAllRows([...allRows, res.data]);
    sumAllRows();
  }

  // Animações do Formulário de cadastro de transações.
  useEffect(() => {
    let btn = document.getElementById('click');
    let leftText = document.getElementById('leftText');
    let rightText = document.getElementById('rightText');
    let backSlider = document.getElementById('backSlider');

    let check = true;

    btn.onclick = () => {
      if(check) {
        backSlider.style.left = '50%';
        leftText.style.color = 'var(--corSecundaria)';
        rightText.style.color = 'var(--corFonte)';
        setTipoTransacao(false);
        check = false;
        return;
      }
      backSlider.style.left = '0';
      leftText.style.color = 'var(--corFonte)';
      rightText.style.color = 'var(--corSecundaria)';
      setTipoTransacao(true);
      check = true;
    }

    let blur = document.getElementById('blur');
    let close = document.getElementById('close');
    let novaTransacao = document.getElementById('novaTransacao');

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    novaTransacao.onclick = async() => {
      blur.style.display = 'flex';
      await sleep(10);
      blur.style.opacity = '1';
    }

    close.onclick = async() => {
      if(!check) {
        backSlider.style.left = '0';
        leftText.style.color = 'var(--corFonte)';
        rightText.style.color = 'var(--corSecundaria)';
        setTipoTransacao(true);
        check = true;
      }
      blur.style.opacity = '0';
      await sleep(300);
      blur.style.display = 'none';
    }

  }, []);

  function clearInputs() {
    setNomeTransacao('');
    setValores('');
    setTipoTransacao(true)
  }

  function converteBRL(valor) {
    let valorConvertido = valor.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});

    return valorConvertido;
  }

  // Responsável pelos calculos.
  async function sumAllRows() {
    const res = await api.get('/sumAllValues');
    
    let arrayOfValue = res.data.map((valores) => {
      return valores;
    });

    let valorEntrada = arrayOfValue[0][0].total;
    let valorSaida = arrayOfValue[1][0].total;
    let valorFinal = valorEntrada - valorSaida;

    setTotalEntradas(converteBRL(valorEntrada));
    setTotalSaidas(converteBRL(valorSaida));
    setValorFinal(converteBRL(valorFinal));
  }

  // Pega todas as linhas da tabela e mostra na tela.
  async function getAllRows() {
    const res = await api.get('/transacoes');

    setAllRows(res.data);
  };

  useEffect(() => {
    sumAllRows();
    getAllRows();
  });

  async function handleDelete(id) {
    const res = await api.delete(`/transacoes/${id}`);

    if(res) {
      setAllRows(allRows.filter(row => row._id !== id)); 
    }

    sumAllRows();
  }

  let keyCodeList = [188, 69, 189, 187, 110, 109, 107];

  function checkInsertValue(e) {
    keyCodeList.forEach((value) => {
      if(e.keyCode === value) {
        e.preventDefault();
      }
    });
  }
  
  return(
    <div className="App">
      <div id="blur" className={styles.blur}>
        <div className={styles.formContainer}>
          <div id="close" className={styles.close}>
            <AiFillCloseSquare/>
          </div>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>Cadastro de Transação</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.itemContainer}>
              <label className={styles.label} htmlFor="nomeTransacao" name="nomeTransacao">TÍTULO</label>
              <input className={styles.input} onChange={e => setNomeTransacao(e.target.value)} type="text" name="nomeTransacao" placeholder="Título da Transação!" value={nomeTransacao} required></input>
            </div>
            <div className={styles.itemContainer}>
              <label className={styles.label} htmlFor="valores" name="valores">VALOR</label>
              <input className={styles.input} onChange={e => setValores(e.target.value)} onKeyDown={checkInsertValue} type="number" name="valores" placeholder="Valor da Transação!" value={valores} required></input>
            </div>
            <div id="click" className={styles.seletor}>
              <p id="leftText" className={styles.leftText}>ENTRADA</p>
              <p id="rightText" className={styles.rightText}>SAÍDA</p>
              <div id="backSlider" className={styles.backSlider}></div>
            </div>
            <button className={styles.btnCadastrar}>Cadastrar</button>
          </form>
        </div>
      </div>
      <Header/>
      <h1 className={styles.titlePainel}>Painel Financeiro</h1>
      <div className={styles.cards}>
        <Card cardClass="cardGeneral cardContainerEntrada" value={totalEntradas} text="Entradas" icon={<BsArrowUpCircle/>} valueClass="valueEntrada" iconClass="iconEntrada" textClass="textEntrada"/>
        <Card cardClass="cardGeneral cardContainerSaida" value={"-" + totalSaidas} text="Saídas" icon={<BsArrowDownCircle/>} valueClass="valueSaida" iconClass="iconSaida" textClass="textSaida"/>
        <Card cardClass="cardGeneral cardContainerTotal" value={valorFinal} text="Total" icon={<MdAttachMoney/>} valueClass="valueTotal" iconClass="iconTotal" textClass="textTotal"/>
      </div>
      <div className={styles.containerBtn}>
        <BtnTransacao id="novaTransacao" icon={<BsFillPlusCircleFill/>} text="NOVA TRANSAÇÃO"/>
      </div>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableFirstRow}>
            <th className={styles.column01}>TÍTULO</th>
            <th className={styles.column02}>VALOR</th>
            <th className={styles.column03}>DATA</th>
            <th className={styles.column04}>EXCLUIR</th>
          </tr>
        </thead>
        <tbody>
          {allRows.map(data => (
            <Table key={data._id} data={data} handleDelete={handleDelete}/>
          ))}
        </tbody>
      </table>
      <Footer icon={<AiFillThunderbolt/>}/>
    </div>
  );
}

export default Home;