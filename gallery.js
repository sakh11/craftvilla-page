document.addEventListener('DOMContentLoaded', () => {
    const artworks = document.querySelectorAll('.artwork');
    const popup = document.getElementById('popup');
    const popupImage = document.getElementById('popup-image');
    const popupClose = document.getElementById('popup-close');

    // Åpne bilde, popup
    function openPopup(imageSrc) {
        popupImage.src = imageSrc;
        popup.classList.remove('hidden');
    }

    // Lukke popup
    function closePopup() {
        popup.classList.add('hidden');
        popupImage.src = ``;
    }

    

    // Trykke på bilde for å åpne.
    artworks.forEach(artwork => {
        artwork.addEventListener('click', () => {
            const imageSrc = artwork.querySelector('img').src;
            openPopup(imageSrc);
        });
    });

    // Lukk
    popupClose.addEventListener('click', closePopup);

    popup.addEventListener('click', (e) => {
        if (e.target === popup) closePopup();
    });


    //Escape ut av popup.
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.key === 'Esc') {
            closePopup();
        }
})});
