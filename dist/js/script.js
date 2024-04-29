var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Estatisticas from "./Estatisticas.js";
import fetchData from "./fetchData.js";
import normalizarTransacao from "./normalizar.js";
function handleData() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield fetchData('https://api.origamid.dev/json/transacoes.json?');
        if (!data) {
            return;
        }
        const transacoes = data.map(normalizarTransacao);
        preencherTabela(transacoes);
        preencherEstatisticas(transacoes);
    });
}
function preencherEstatisticas(transacoes) {
    const data = new Estatisticas(transacoes);
    const totalElemento = document.querySelector('#total span');
    if (totalElemento) {
        totalElemento.innerText = data.total.toLocaleString("pt-BR", {
            style: 'currency',
            currency: 'BRL'
        });
    }
}
function preencherTabela(transacoes) {
    const tabela = document.querySelector('#transacoes tbody');
    if (!tabela) {
        return;
    }
    transacoes.forEach(transacao => {
        tabela.innerHTML += `
         <tr>
            <td>${transacao.nome}</td>
            <td>${transacao.email}</td>
            <td>R$ ${transacao.moeda}</td>
            <td>${transacao.pagamento}</td>
            <td>${transacao.status}</td>
         </tr>
        `;
    });
}
handleData();
