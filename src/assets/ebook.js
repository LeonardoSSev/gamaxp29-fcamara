const gamaURL = 'https://smtl.gama.academy/leads/3d8521c0-39f4-11ea-a319-e90cfbc180ef';
const avengersURL = 'https://api-blog-gama.herokuapp.com/userSubscription';

let inputNameValue = '';
let inputEmailValue = '';
let inputContextValue = '';

let submitEvent;

let isEbook = false;
function processarCadastro(event) {
  event.preventDefault();
  
  submitEvent = event;
  abrirTermos();
}

async function enviarDados() {
  // Pega valores dos inputs relacionados ao evento de submit
  let inputs = submitEvent.target.elements;  

  for (let i = 0; i < inputs.length; i++) {
    let input = inputs[i];

    if (input.name === 'name') {
      inputNameValue = input.value;
    }
    if (input.name === 'email') {
      inputEmailValue = input.value;
    }
    if (input.name === 'context') {
      inputContextValue = input.value;
    }
  }

  await enviarDadosPraAvengers(inputNameValue, inputEmailValue, inputContextValue);
  await enviarDadosGama(inputNameValue, inputEmailValue);

  if (inputContextValue === 'Ebook') {
    window.alert("Obrigado! O download de seu Ebook começará em breve!");
    downloadEbook();
    return;
  }

  window.alert("Obrigado por se inscrever! Logo você receberá a nossa Newsletter!");
}

async function enviarDadosGama(name, email) {
    const body = new URLSearchParams({
        'name': name,
        'email': email
    });

    const requestOptions = {
        body,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        mode: 'cors'
    };

    const response = await fetch(gamaURL, requestOptions);
}

async function enviarDadosPraAvengers(nome, email, contexto) {
    const body = JSON.stringify({
        nome,
        email,
        contexto
    });

    const requestOptions = {
        body,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        mode: 'cors'
    };

    const response = await fetch(avengersURL, requestOptions);
}

function downloadEbook() {
    let a = document.createElement('a')
    a.href = './downloads/eBook-LGPD.pdf'
    a.download = 'eBook-LGPD.pdf'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}