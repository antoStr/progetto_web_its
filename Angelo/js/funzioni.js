//BOTTONE SCORRIMENTO
function scrollGallery(direction) {
    const gallery = document.querySelector('.gallery');
    // Calcoliamo la larghezza di una card + il gap (es. 30px)
    const card = gallery.querySelector('li');
    const scrollAmount = card.offsetWidth + 30;

    gallery.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}
//direction -1 per il pulsante sinistro, 1 per quello destro
//gallery: seleziona il contenitore con la slidebar (overflow-x: auto)
//card: seleziona il primo elemento di tipo <li>
//scroll amount: calcola di quanto si deve spostare 
//  con card.offsetwidth (che vede quanto è larga la card es.330) e +30 di gap ( che abbiamo messo in css)
//left: direction * scrollAmount:
//      Se direction è 1: 1 * 330 = +330px (scorre a destra).
//      Se direction è -1: -1 * 330 = -330px (scorre a sinistra).
//behavior: 'smooth': Comunica al browser di non saltare istantaneamente alla posizione, ma di creare un'animazione fluida e piacevole.


//AGGIUNTA ELEMENTI AL CARRELLO

// Recupera il valore salvato (se esiste), altrimenti parte da 0
let count = localStorage.getItem('cartCount') ? parseInt(localStorage.getItem('cartCount')) : 0;

// Funzione che aggiorna il pallino del counter
function updateCartUI() {
    const badge = document.getElementById('cart-count');
    if (!badge) return; // Se il badge non c'è, non fare nulla
    
    badge.innerText = count;
    badge.style.display = count > 0 ? 'block' : 'none';
    
// Gestione dell'animazione:
    if (count > 0) {
        // 1. Rimuovi la classe se già presente (per riavviare l'animazione)
        badge.classList.remove('animate');
        // 2. Un piccolo trucco tecnico per forzare il browser a "accorgersi" del cambio
        // senza questo, l'animazione a volte non riparte al secondo click.
        void badge.offsetWidth; 
        // 3. Aggiungi la classe per far partire l'animazione
        badge.classList.add('animate');
    }
}

// Funzione per aggiungere oggetti
function addToCart() {
    count++;
    localStorage.setItem('cartCount', count); // Salva nel browser
    updateCartUI();
    console.log("Carrello aggiornato e salvato:", count);
}

// Fondamentale: aggiorna il numero appena la pagina si carica
document.addEventListener('DOMContentLoaded', updateCartUI);

function clearCart() {
    // 1. Riporta la variabile locale a zero
    count = 0;
    
    // 2. Rimuove il dato dal LocalStorage (oppure lo setta a 0)
    localStorage.removeItem('cartCount');
    
    // 3. Aggiorna l'interfaccia visiva
    updateCartUI();
    
    console.log("Il carrello è stato svuotato!");
}
