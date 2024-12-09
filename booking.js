// Elementreferanser
const calendar = document.getElementById('calendar');
const prevWeekBtn = document.getElementById('prev-week');
const nextWeekBtn = document.getElementById('next-week');
const bookingModal = document.getElementById('booking-modal');
const bookingForm = document.getElementById('booking-form');
const bookingTime = document.getElementById('booking-time');
const cancelBookingBtn = document.getElementById('cancel-booking');

const workHours = { start: 9, end: 15 };
let currentWeekOffset = 0;
const bookings = {};

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
                timeSlot.style.pointerEvents = 'none';
            } else {
                timeSlot.addEventListener('click', () => openBookingModal(timeKey));
            }
            dayColumn.appendChild(timeSlot);
        }
        calendar.appendChild(dayColumn);
    }

    prevWeekBtn.disabled = currentWeekOffset === 0;
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

// Lagre booking
bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const timeKey = bookingForm.dataset.timeKey;

    bookings[timeKey] = {
        firstName: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value,
        email: document.getElementById('email').value
    };

    closeBookingModal();
    renderCalendar();
});

cancelBookingBtn.addEventListener('click', closeBookingModal);

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
