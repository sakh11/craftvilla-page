// Elementreferanser
const calendar = document.getElementById('calendar');
const prevWeekBtn = document.getElementById('prev-week');
const nextWeekBtn = document.getElementById('next-week');
const bookingModal = document.getElementById('booking-modal');
const bookingForm = document.getElementById('booking-form');
const bookingTime = document.getElementById('booking-time');
const cancelBookingBtn = document.getElementById('cancel-booking');
const languageButton = document.getElementById('language-button');

// Språkdata
const translations = {
    en: {
        companyName: "CraftsVilla!",
        mainTitle: "Appointment Booking",
        prevWeek: "Previous Week",
        nextWeek: "Next Week",
        cancel: "Cancellation",
        bookTime: "Book an Appointment",
        firstName: "First Name:",
        lastName: "Last Name:",
        email: "Email:",
        confirm: "Confirm",
        address: "Smedasundet 66, 5528 Haugesund - Norway",
        rights: "&copy; 2024 A GROUP-A PROJECT. All rights reserved."
    },
    no: {
        companyName: "CraftsVilla!",
        mainTitle: "Timebestilling",
        prevWeek: "Forrige uke",
        nextWeek: "Neste uke",
        cancel: "Avbestilling",
        bookTime: "Book en time",
        firstName: "Fornavn:",
        lastName: "Etternavn:",
        email: "E-post:",
        confirm: "Bekreft",
        address: "Smedasundet 66, 5528 Haugesund - Norge",
        rights: "&copy; 2024 A GROUP-A PROJECT. Alle rettigheter reservert."
    }
};

let currentLanguage = "no"; // Standard språk
const workHours = { start: 9, end: 15 };
let currentWeekOffset = 0; // Kontroll for navigasjon i uker
const bookings = {}; // Lagrer bestillinger

// Oppdater tekst basert på valgt språk
function updateLanguage() {
    const elements = document.querySelectorAll("[data-lang-key]");
    elements.forEach((el) => {
        const key = el.dataset.langKey;
        el.innerHTML = translations[currentLanguage][key];
    });
}

// Bytt språk ved knappetrykk
languageButton.addEventListener("click", () => {
    currentLanguage = currentLanguage === "no" ? "en" : "no";
    languageButton.innerText = currentLanguage === "no" ? "English" : "Norsk";
    updateLanguage();
});

// Render kalenderen
function renderCalendar() {
    calendar.innerHTML = '';
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1 + currentWeekOffset * 7));

    for (let day = 0; day < 5; day++) {
        const dayColumn = document.createElement('div');
        dayColumn.classList.add('day-column');

        const dayDate = new Date(startOfWeek);
        dayDate.setDate(startOfWeek.getDate() + day);
        const dayHeader = document.createElement('div');
        dayHeader.innerText = dayDate.toLocaleDateString('no-NO', { weekday: 'long', day: 'numeric' });
        dayColumn.appendChild(dayHeader);

        for (let hour = workHours.start; hour <= workHours.end; hour++) {
            const timeSlot = document.createElement('div');
            const timeKey = `${dayDate.toISOString().split('T')[0]} ${hour}:00`;
            timeSlot.innerText = `${hour}:00`;
            timeSlot.classList.add('time-slot');

            if (bookings[timeKey]) {
                timeSlot.classList.add('booked');
                timeSlot.style.pointerEvents = 'none'; // Gjør den ikke-klikkbar
            } else {
                timeSlot.addEventListener('click', () => openBookingModal(timeKey));
            }
            dayColumn.appendChild(timeSlot);
        }
        calendar.appendChild(dayColumn);
    }

    // Oppdater knappens tilstand
    prevWeekBtn.disabled = currentWeekOffset === 0; // Deaktiver "Forrige uke" hvis vi er på dagens uke
}

// Åpne bookingmodal
function openBookingModal(timeKey) {
    bookingTime.innerText = `Ønsker du å booke ${timeKey}?`;
    bookingForm.dataset.timeKey = timeKey;
    bookingModal.style.display = 'block';
}

// Lukk bookingmodal
function closeBookingModal() {
    bookingModal.style.display = 'none';
}

// Lagre booking og oppdater kalenderen
bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const timeKey = bookingForm.dataset.timeKey;

    // Lagre bookingen
    bookings[timeKey] = {
        firstName: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value,
        email: document.getElementById('email').value
    };

    closeBookingModal();
    renderCalendar(); // Oppdater kalenderen for å vise den nye bookingen
});

// Avbryt booking
cancelBookingBtn.addEventListener('click', closeBookingModal);

// Navigasjonsknapper
prevWeekBtn.addEventListener('click', () => {
    if (currentWeekOffset > 0) {
        currentWeekOffset--;
        renderCalendar();
    }
});

nextWeekBtn.addEventListener('click', () => {
    currentWeekOffset++;
    renderCalendar();
});

// Initiering
renderCalendar();
updateLanguage();
