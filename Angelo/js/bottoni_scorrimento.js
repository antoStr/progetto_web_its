function scrollGallery(direction) {
    const gallery = document.querySelector('.gallery');
    const cardWidth = document.querySelector('.cards li').offsetWidth + 30; // Larghezza card + gap

    gallery.scrollBy({
        left: direction * cardWidth,
        behavior: 'smooth' // Rende il movimento fluido
    });
}


// function scrollGallery(direction) {
//     const gallery = document.querySelector('.gallery');
//     // Calcoliamo la larghezza di una card + il gap (es. 30px)
//     const card = gallery.querySelector('li');
//     const scrollAmount = card.offsetWidth + 30; 

//     gallery.scrollBy({
//         left: direction * scrollAmount,
//         behavior: 'smooth'
//     });
// }