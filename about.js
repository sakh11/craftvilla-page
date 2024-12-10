const aboutImage = document.querySelectorAll(".about-image");

aboutImage.forEach(parameter => {
    parameter.addEventListener("click", () => {
        removeActiveClasses();
        parameter.classList.add("active");
    })
})

function removeActiveClasses(){
    aboutImage.forEach(parameter => {
        parameter.classList.remove("active");
    })
}

/* Shopping cart */
document.addEventListener('DOMContentLoaded', function() {
    const cartIcon = document.querySelector('.cart-icon');
    const cartDropdown = document.getElementById('cart-dropdown');
    const cartItems = document.getElementById('cart-items');
    const totalItems = document.getElementById('total-items');
    const totalPrice = document.getElementById('total-price');
    const cartCount = document.getElementById('cart-count');
    let cart = [];

    cartIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', function(event) {
        if (!cartDropdown.contains(event.target)) {
            cartDropdown.style.display = 'none';
        }
    });

    document.querySelectorAll('.item-box').forEach(itemBox => {
        itemBox.addEventListener('click', function() {
            const itemId = this.getAttribute('data-id');
            const itemName = this.querySelector('p').textContent;
            const itemPrice = parseInt(itemName.match(/\d+/)[0]);
            const itemImage = this.querySelector('img').src;
            addItemToCart(itemId, itemName, itemPrice, itemImage);
        });
    });

    function addItemToCart(itemId, itemName, itemPrice, itemImage) {
        const listItem = document.createElement('li');
        const img = document.createElement('img');
        img.src = itemImage;
        const itemText = document.createElement('span');
        itemText.textContent = itemName;
        listItem.appendChild(img);
        listItem.appendChild(itemText);
        listItem.setAttribute('data-id', itemId);
        listItem.setAttribute('data-price', itemPrice);
        listItem.addEventListener('click', function() {
            removeItemFromCart(itemId, itemPrice);
            cartItems.removeChild(listItem);
        });
        cartItems.appendChild(listItem);
        cart.push({ id: itemId, price: itemPrice });
        updateCartSummary();
    }

    function removeItemFromCart(itemId, itemPrice) {
        cart = cart.filter(item => item.id !== itemId);
        updateCartSummary();
    }

    function updateCartSummary() {
        const totalItemCount = cart.length;
        const totalCartPrice = cart.reduce((total, item) => total + item.price, 0);
        totalItems.textContent = totalItemCount;
        totalPrice.textContent = totalCartPrice;
        cartCount.textContent = totalItemCount;
    }
});

/* Site google translation  */

function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,no,da,sv,uk,ar',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}

document.addEventListener("DOMContentLoaded", function () {
    const scrollContainer = document.querySelector(".scroll-container");
    let scrollSpeed = 1; // Adjust scroll speed if needed
            
    function autoScroll() {
        scrollContainer.scrollLeft += scrollSpeed;
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth - 1) {
            scrollContainer.scrollLeft = 0;
        }
    }
            
    setInterval(autoScroll, 40);
});