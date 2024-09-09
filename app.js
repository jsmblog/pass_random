const TXT = document.getElementById('TXT');
const BTN = document.getElementById('btn-generate');
const BTN_COPY = document.getElementById('copy');
const INPUT = document.getElementById('input');
const DISPLAY_SMS = document.getElementById('display-sms');
const BTN_DARK_MODE = document.getElementById('btn-dark-mode');
const TXT_PER_CHANGE = document.getElementById('txt-per-change');
const TXT_LEVEL = document.querySelector('.txt-level');

let inputValue = INPUT.value;
let txt = '';

const options1 = '0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz'
const options2 = '0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz¡!*_<>°~^'
const options3 = '0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz¡!*_[]()=+-.&%$#|<>°~^'

const generatePassRandom = (options) => {
    let pass = '';
    for (let i = 0; i < inputValue; i++) {
        let index = Math.floor(Math.random() * options.length);
        pass += options[index];
    }
    return pass;
}
const changeSmsWarning = (sms) => {
    TXT_LEVEL.textContent = sms;
    TXT_LEVEL.style.transition = '.4s ease';
}
INPUT.addEventListener('input', (e) => {
    inputValue = e.target.value;
    INPUT.classList.remove('green', 'yellow', 'red');
    if (inputValue >= 10 && inputValue <= 15) {
        INPUT.classList.add('yellow');
        changeSmsWarning('contraseña segura ✅​');
    }
    else if (inputValue >= 16 && inputValue <= 24) {
        INPUT.classList.add('red');
        changeSmsWarning('muy segura 😉!!');
    }
    else if (inputValue >= 25 && inputValue <= 30) {
        INPUT.classList.add('green');
        changeSmsWarning('extremadamente segura...🤯​');
    }
});

BTN.addEventListener('click', () => {
    if (inputValue >= 21 && inputValue <= 30)
        txt = `${generatePassRandom(options3)}-${generatePassRandom(options3)}-${generatePassRandom(options3)}-${generatePassRandom(options3)}`;
    else if (inputValue >= 11 && inputValue <= 20)
        txt = `${generatePassRandom(options2)}-${generatePassRandom(options2)}-${generatePassRandom(options2)}-${generatePassRandom(options2)}`;
    else
        txt = `${generatePassRandom(options1)}-${generatePassRandom(options1)}-${generatePassRandom(options1)}-${generatePassRandom(options1)}`;
    TXT.innerText = txt;
})

const displaySms = (sms) => {
    DISPLAY_SMS.style.display = 'inline-block';
    DISPLAY_SMS.classList.add('puff-in-center')
    DISPLAY_SMS.innerText = sms;
    setTimeout(() => {
        DISPLAY_SMS.style.display = 'none';
    }, 5000);
    TXT.innerText = '¡ Aquí aparecerá tu contraseña !';
    INPUT.value = 10;
    inputValue = 10;
}

BTN_COPY.addEventListener('click', () => {
    navigator.clipboard.writeText(TXT.innerText).then(() => {
        if (TXT.innerText === '' || TXT.innerText === '¡ Aquí aparecerá tu contraseña !') displaySms(`Genera una contraseña primero 😉​`);
        else {
            displaySms(`Contraseña copiada , ¡ guárdala en un lugar seguro ! 😁`)
            changeSmsWarning('añade dificultad')
            INPUT.classList.remove('green', 'yellow', 'red');
        }
    }).catch(error => console.log(error.message))
})
let statusBtnDm = false;

BTN_DARK_MODE.addEventListener('click', () => {
    statusBtnDm = !statusBtnDm;
    const firstChild = document.body.children[0];
    if (statusBtnDm) {
        firstChild.id = 'dark-mode';
        BTN_DARK_MODE.style.transform = 'rotate(180deg)';
        BTN_DARK_MODE.style.transition = '.4s ease';
    } else {
        firstChild.removeAttribute('id');
        BTN_DARK_MODE.style.transform = 'rotate(0deg)';
    }
});

const arrayWords = ['seguras...', 'aleatorias...', 'únicas...', 'fuertes...', 'rápido...', 'fácilmente...']
let currentIndexWord = 0;
setInterval(() => {
    TXT_PER_CHANGE.innerText = arrayWords[currentIndexWord];
    currentIndexWord = Math.floor((currentIndexWord + 1) % arrayWords.length);
}, 3000);
