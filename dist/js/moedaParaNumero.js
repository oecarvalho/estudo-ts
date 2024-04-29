export default function moedaParaNumero(moeda) {
    const numero = Number(moeda.replace('.', '').replace(',', '.'));
    if (isNaN(numero)) {
        return null;
    }
    else {
        return numero;
    }
}
