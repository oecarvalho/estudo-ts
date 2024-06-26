import Estatisticas from "./Estatisticas.js";
import fetchData from "./fetchData.js";
import normalizarTransacao, { TransacaoAPI } from "./normalizar.js";
import { Transacao } from "./normalizar.js";

async function handleData(){
    const data = await fetchData<TransacaoAPI[]>('https://api.origamid.dev/json/transacoes.json?');

    if(!data){
        return;
    }

   const transacoes = data.map(normalizarTransacao);
   preencherTabela(transacoes);
   preencherEstatisticas(transacoes);
}

function preencherEstatisticas(transacoes: Transacao[]): void{
    const data = new Estatisticas(transacoes);

    const totalElemento = document.querySelector<HTMLElement>('#total span')

    if(totalElemento){
        totalElemento.innerText = data.total.toLocaleString("pt-BR", {
            style: 'currency',
            currency: 'BRL'
        })
    }
}


function preencherTabela(transacoes: Transacao[]): void{
    const tabela = document.querySelector('#transacoes tbody');
    if(!tabela){
        return;
    }
    transacoes.forEach(transacao =>{
        tabela.innerHTML += `
         <tr>
            <td>${transacao.nome}</td>
            <td>${transacao.email}</td>
            <td>R$ ${transacao.moeda}</td>
            <td>${transacao.pagamento}</td>
            <td>${transacao.status}</td>
         </tr>
        `
    })
}

handleData()

