import "./style.css";
import Swal from 'sweetalert2';

const buttonCurrency = document.querySelector('#button');
const currency = document.querySelector('#currency');
const reusltCurrency = document.querySelector('#resultCurrency')

const API_CURRENCY = (currencys) => {
  return fetch(`https://api.exchangerate.host/latest?base=${currencys}`)
  .then((response) => response.json())
}

const addCotacoes = (data) => {
    console.log(data);
    if (data.base === currency.value.toUpperCase()) {
        const itensList = data.rates
        const cotacoes = Object.keys(itensList);
        cotacoes.forEach((element) => {
            const div = document.createElement('div')
            div.classList = 'item';
            div.innerHTML = `<span>${element}</span> ${itensList[element].toFixed(3)}`;
            reusltCurrency.appendChild(div);
        })
   } else {
      tratandoErro();
   }
}

const tratandoErro = () => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Você precisa passar uma moeda!',
  })
}

buttonCurrency.addEventListener('click', (event) => {
  event.preventDefault();
  reusltCurrency.innerHTML = '';
  if (currency.value === '') {
    tratandoErro();
  } else {
    API_CURRENCY(currency.value)
    .then((data) => addCotacoes(data))
    currency.focus();
  }
})