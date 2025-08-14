const prices = {
    USDT: 170,  
    TON: 660,  
    SOL: 38000,  
    STAR: 150,  
    PREMIUM: {
        "3 Months": 1900,
        "6 Months": 2900,
        "1 Year": 3700
    }
};

const minQuantities = {
    USDT: 1,
    TON: 0.3,
    SOL: 0.0005,
    STAR: 50
};

// Get current date in YYYY-MM-DD format
function getCurrentDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

// Update the crypto price
function updatePrice() {
    const selectedCrypto = document.getElementById("crypto-selection").value;
    const quantity = parseFloat(document.getElementById("crypto-quantity").value);
    const priceElement = document.getElementById("crypto-price");

    if (isNaN(quantity) || quantity <= 0) {
        priceElement.innerText = "0";
        return;
    }

    const price = prices[selectedCrypto];
    const totalPrice = price * quantity;
    priceElement.innerText = totalPrice.toFixed(2);
}

// Update the star price
function updateStarPrice() {
    const quantity = parseInt(document.getElementById("star-quantity").value);
    const priceElement = document.getElementById("star-price");

    if (quantity < minQuantities.STAR) {
        priceElement.innerText = "Minimum 50 stars required.";
        return;
    }

    const totalPrice = (prices.STAR * (quantity / minQuantities.STAR));
    priceElement.innerText = totalPrice.toFixed(2);
}

// Update the premium price
function updatePremiumPrice() {
    const selectedDuration = document.getElementById("premium-duration").value;
    const priceElement = document.getElementById("premium-price");

    const price = prices.PREMIUM[selectedDuration];
    priceElement.innerText = price.toFixed(2);
}

// Handle Crypto Purchase
function buyCrypto() {
    const crypto = document.getElementById("crypto-selection").value;
    const quantity = document.getElementById("crypto-quantity").value;
    const network = document.getElementById("crypto-network").value;
    const wallet = document.getElementById("crypto-wallet").value;
    const price = document.getElementById("crypto-price").textContent;
    const date = getCurrentDate();

    const message = `🛒 New Order\n\n📌 I WANT TO BUY: ${crypto}\n📦 Amount: ${quantity}\n🌐 Network: ${network}\n🏦 Address: ${wallet}\n💰 Price: ${price} Birr\n📅 Date: ${date}`;

    redirectToTelegram(message);
}

// Handle Star Purchase
function buyStar() {
    const quantity = document.getElementById("star-quantity").value;
    const username = document.getElementById("star-username").value;
    const price = document.getElementById("star-price").textContent;
    const date = getCurrentDate();

    const message = `🛒 New Order\n\n📌 I WANT TO BUY: Star\n📦 Amount: ${quantity}\n👤 Username: ${username}\n💰 Price: ${price} Birr\n📅 Date: ${date}`;

    redirectToTelegram(message);
}

// Handle Premium Purchase
function buyPremium() {
    const duration = document.getElementById("premium-duration").value;
    const username = document.getElementById("premium-username").value;
    const price = document.getElementById("premium-price").textContent;
    const date = getCurrentDate();

    const message = `🛒 New Order\n\n📌 I WANT TO BUY: Premium\n📦 Duration: ${duration}\n👤 Username: ${username}\n💰 Price: ${price} Birr\n📅 Date: ${date}`;

    redirectToTelegram(message);
}

// Redirect to Telegram with formatted message
function redirectToTelegram(message) {
    const telegramLink = `https://t.me/super_ett?text=${encodeURIComponent(message)}`;
    window.location.href = telegramLink;
}

// Event listeners to trigger the price updates
document.getElementById("crypto-selection").addEventListener("change", updatePrice);
document.getElementById("crypto-quantity").addEventListener("input", updatePrice);
document.getElementById("star-quantity").addEventListener("input", updateStarPrice);
document.getElementById("premium-duration").addEventListener("change", updatePremiumPrice);

// Initially call to set the prices when the page loads
updatePrice();
updateStarPrice();
updatePremiumPrice();