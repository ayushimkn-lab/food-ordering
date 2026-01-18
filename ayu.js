// =================== SWIPER ===================
new Swiper(".mySwiper", {
    loop: true,
    autoplay: false,
    navigation: {
        nextEl: "#next",
        prevEl: "#prev",
    }
});
const cartIcon = document.querySelector('.cart-icon');
const cartTab = document.querySelector('.cart-tab');
const cartList = document.querySelector('.cart-list');
const closeBtn = document.querySelector('.close-btn');
const cartValue = document.querySelector('.cart-value');
const cartTotalEl = document.querySelector('.cart-total');

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const bars = document.querySelector('.fa-bars');


hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    hamburger.addEventListener('click', () =>{ 
    bars.classList.toggle('fa-bars')
    });
});


let cart = [];

// Open Cart
cartIcon.addEventListener('click', () => {
    cartTab.classList.add('cart-tab-active');
});

// Close Cart
closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    cartTab.classList.remove('cart-tab-active');
});

// Add to Cart buttons
const addBtns = document.querySelectorAll('.order-card .btn');

addBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const card = e.target.closest('.order-card');
        const name = card.querySelector('h4').textContent;
        const price = parseFloat(card.querySelector('.price').textContent.replace('$',''));
        const image = card.querySelector('img').src;

        const existingItem = cart.find(item => item.name === name);
        if(existingItem){
            existingItem.quantity += 1;
        } else {
            cart.push({name, price, image, quantity:1});
        }

        updateCart();
    });
});

// Update Cart UI
function updateCart(){
    cartList.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('item');

        cartItem.innerHTML = `
            <div class="image-container">
                <img src="${item.image}">
            </div>
            <div class="content">
                <h4>${item.name}</h4>
                <div class="quantity-controls flex mt-one-half">
                    <button class="quantity-btn minus">-</button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn plus">+</button>
                </div>
                <h4 class="item-total">$${(item.price * item.quantity).toFixed(2)}</h4>
            </div>
        `;

        // Plus button
        cartItem.querySelector('.plus').addEventListener('click', () => {
            item.quantity += 1;
            updateCart();
        });

        // Minus button
        cartItem.querySelector('.minus').addEventListener('click', () => {
            if(item.quantity > 1){
                item.quantity -= 1;
            } else {
                cart.splice(index,1);
            }
            updateCart();
        });

        cartList.appendChild(cartItem);

        total += item.price * item.quantity;
    });

    cartTotalEl.textContent = `$${total.toFixed(2)}`;
    cartValue.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
}



        