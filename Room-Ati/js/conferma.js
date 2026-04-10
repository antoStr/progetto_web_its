const modulo = document.getElementById('modulo-contatto');
const conferma = document.getElementById('messaggio-conferma');

// modulo.addEventListener('submit', function (e) {
//     e.preventDefault();
//     if (!modulo.checkValidity()) {
//         modulo.reportValidity();
//         return;
//     }
//     modulo.style.display = 'none';
//     conferma.classList.add('visibile');
// });

document.getElementById('modulo-contatto')
    .addEventListener('form-valido', function () {
        document.getElementById('messaggio-conferma').classList.add('visibile');
        this.reset();

        modulo.style.display = 'none';
        conferma.classList.add('visibile');
    });