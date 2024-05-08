

import { useEffect, useState } from "react";
import './App.css';

const palavras = ['gato' , 'cachorro' , 'elefante' , 'macaco', 'gorila', 'girafa', 
'papagaio', 'urubu', 'pica-pau', 'tartaruga', 'topeira']

function Letras ({letras, onClick}){
  return(
    <div className="letras">
      {letras.map(letra => (
        <button key={letra} onClick={() => onClick(letra)} disable={false}>
          {letra}
        </button>
      ))}
    </div>
  );
}

function Forca() {
  const [palavra, setPalavra] = useState('')
  const [letrasSelecionadas, setLetrasSelecionadas] = useState([])
  const [tentativasErradas, setTentativasErradas] = useState(0);

  function escolherPalavra() {
    return palavras[Math.floor(Math.random() * palavras.length)]
  }

  useEffect(() => {
    setPalavra(escolherPalavra())
    setLetrasSelecionadas([])
    setTentativasErradas(0)
  }, [])

  function verificarLetra(letra) {
    return palavras.includes(letra)
  }

  function handleLetraclick(letra) {
    if (!letrasSelecionadas.includes(letra)) {
      const novaLista = [...letrasSelecionadas, letra]
      setLetrasSelecionadas(novaLista);
      if(!verificarLetra(letra)) {
        setTentativasErradas(tentativasErradas + 1)
      }
    }
  }

  function palavraOculta(){
    return palavra.split('').map(letra => (letrasSelecionadas.includes(letra) ?
    letra: '_')).join(' ');//split é para cortar as letras
  }

  //efeito p verificar se o jogador venceu
  useEffect(() => {
    if (palavra && palavra.split('').every(letra => letrasSelecionadas.includes(letra))) {
      setTimeout(() => {
        alert('Parabéns! você ganhou! 🥇');
        reiniciarJogo();
      }, 100)
    }
  }, [palavra, letrasSelecionadas])
  //executa a função toda vez que tiver uma alteração em 'palavra'

  useEffect(() => {
    if(tentativasErradas >= 6) {
      setTimeout(() => {
        alert('Game Over');
        reiniciarJogo();
        }, 100) //100 milisegundos p exibir o alert
      }
    },[tentativasErradas]) //executa a função toda vez que tiver uma alteração em 'tentativasErradas'

    //Função para reiniciar o game

function reiniciarJogo(){
  setPalavra(escolherPalavra());
  setLetrasSelecionadas([]);
  setTentativasErradas(0)
}
return(
  <div className="forca">
    <h1>Jogo da Forca</h1>
    <div>Palavra: {palavraOculta()}</div>

    <Letras letras = {
      ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',]} onClick={handleLetraclick}
      />

      {}
    <div> Letra selecionada: {letrasSelecionadas.join(',')}</div>
    <div> Tentativas Erradas: {tentativasErradas} de 6</div>

    </div>
);
  }

  export default Forca;
