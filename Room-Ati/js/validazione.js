const form = document.getElementById('modulo-contatto');

const regole = {
    nome:     { min: 2, regex: /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'\-]+$/, messaggio: 'Inserisci un nome valido (solo lettere, almeno due lettere).' },
    cognome:  { min: 2, regex: /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'\-]+$/, messaggio: 'Inserisci un cognome valido (solo lettere, almeno due lettere).' },
    email:    { regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, messaggio: 'Inserisci un indirizzo email valido.' },
    telefono: { regex: /^[\d\s\+\-\(\)]{7,20}$/, messaggio: 'Inserisci un numero di telefono valido.', opzionale: true },
    oggetto:  { messaggio: 'Seleziona un argomento.' },
    messaggio:{ min: 10, messaggio: 'Scrivi un messaggio di almeno 10 caratteri.' },
};

/* crea o aggiorna il messaggio di errore sotto al campo */
function mostraErrore(campo, testo) {
    let errore = campo.parentElement.querySelector('.errore-campo');
    if (!errore) {
        errore = document.createElement('span');
        errore.className = 'errore-campo';
        errore.setAttribute('aria-live', 'polite');
        campo.parentElement.appendChild(errore);
    }
    errore.textContent = testo;
    campo.setAttribute('aria-invalid', 'true');
    campo.classList.add('campo-invalido');
}

function rimuoviErrore(campo) {
    const errore = campo.parentElement.querySelector('.errore-campo');
    if (errore) errore.textContent = '';
    campo.setAttribute('aria-invalid', 'false');
    campo.classList.remove('campo-invalido');
}

function validaCampo(campo) {
    const id = campo.id;
    const valore = campo.value.trim();
    const regola = regole[id];

    if (!regola) return true;

    /* campo opzionale vuoto: valido */
    if (regola.opzionale && valore === '') {
        rimuoviErrore(campo);
        return true;
    }

    /* campo obbligatorio vuoto */
    if (!regola.opzionale && valore === '') {
        mostraErrore(campo, regola.messaggio);
        return false;
    }

    /* lunghezza minima */
    if (regola.min && valore.length < regola.min) {
        mostraErrore(campo, regola.messaggio);
        return false;
    }

    /* regex */
    if (regola.regex && !regola.regex.test(valore)) {
        mostraErrore(campo, regola.messaggio);
        return false;
    }

    rimuoviErrore(campo);
    return true;
}

function validaPrivacy() {
    const checkbox = document.getElementById('privacy');
    const wrapper = checkbox.closest('.casella-privacy');
    let errore = wrapper.querySelector('.errore-campo');

    if (!checkbox.checked) {
        if (!errore) {
            errore = document.createElement('span');
            errore.className = 'errore-campo';
            errore.setAttribute('aria-live', 'polite');
            wrapper.appendChild(errore);
        }
        errore.textContent = 'Devi accettare la Privacy Policy per continuare.';
        checkbox.setAttribute('aria-invalid', 'true');
        return false;
    }

    if (errore) errore.textContent = '';
    checkbox.setAttribute('aria-invalid', 'false');
    return true;
}

/* validazione in tempo reale su blur */
Object.keys(regole).forEach(id => {
    const campo = document.getElementById(id);
    if (!campo) return;
    campo.addEventListener('blur', () => validaCampo(campo));
    campo.addEventListener('input', () => {
        if (campo.classList.contains('campo-invalido')) validaCampo(campo);
    });
});

document.getElementById('privacy').addEventListener('change', validaPrivacy);

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const campi = Object.keys(regole).map(id => document.getElementById(id));
    const tuttiValidi = campi.map(validaCampo).every(Boolean) && validaPrivacy();

    if (!tuttiValidi) {
        /* sposta il focus sul primo campo con errore */
        const primoErrore = form.querySelector('.campo-invalido');
        if (primoErrore) primoErrore.focus();
        return;
    }

    /* form valido: lascia proseguire conferma.js */
    form.dispatchEvent(new CustomEvent('form-valido'));
});