// Cars Array to store the car objects 
const cars = [
    {
        imgUrl: "https://media.ed.edmunds-media.com/tesla/model-s/2024/oem/2024_tesla_model-s_sedan_plaid_fq_oem_1_1280x855.jpg",
        mark: "Tesla",
        model: "Model S",
        price: 76380
    },
    {
        imgUrl: "https://hips.hearstapps.com/hmg-prod/images/2024-audi-a5-sportback-102-64c921ec101a6.jpg?crop=0.832xw:0.702xh;0.0928xw,0.210xh&resize=1200:*",
        mark: "Audi",
        model: "A5",
        price: 47295
    },
    {
        imgUrl: "https://hips.hearstapps.com/hmg-prod/images/2024-ferrari-812-gts-101-64caae4038b21.jpeg?crop=0.547xw:0.548xh;0.127xw,0.342xh&resize=700:*",
        mark: "Ferrari",
        model: "812 GTS",
        price: 433765
    },
    {
        imgUrl: "https://www.motortrend.com/files/664beab829c18800070e6f28/005-2025-honda-civic-hybrid.jpg",
        mark: "Honda",
        model: "Civic Hybrid",
        price: 28750
    },
    {
        imgUrl: "https://tmna.aemassets.toyota.com/is/image/toyota/toyota/jellies/max/2024/prius/limitedawd/1268/1l0/36/5.png?fmt=png-alpha&wid=930&qlt=90",
        mark: "Toyota",
        model: "Prius",
        price: 27950
    },
    {
        imgUrl: "https://hips.hearstapps.com/hmg-prod/images/2020-tesla-model-x-123-656e3825810bc.jpg?crop=0.479xw:0.433xh;0.261xw,0.297xh&resize=1200:*",
        mark: "Tesla",
        model: "Model X",
        price: 81630
    },
    {
        imgUrl: "https://media.drive.com.au/obj/tx_q:50,rs:auto:1920:1080:1/driveau/upload/cms/uploads/tllUrVGiSQidlLDlbzVx",
        mark: "Audi",
        model: "R8",
        price: 416377
    },
    {
        imgUrl: "https://hips.hearstapps.com/hmg-prod/images/ferrari-roma-spider-2-64137a910bf1c.jpg?crop=0.660xw:0.489xh;0.171xw,0.278xh&resize=1200:*",
        mark: "Ferrari",
        model: "Roma",
        price: 247308
    },
    {
        imgUrl: "https://media.ed.edmunds-media.com/honda/civic/2023/oem/2023_honda_civic_4dr-hatchback_sport-touring_fq_oem_1_815.jpg",
        mark: "Honda",
        model: "Civic Hatchback",
        price: 26045
    },
    {
        imgUrl: "https://tmna.aemassets.toyota.com/is/image/toyota/toyota/jellies/max/2025/corolla/le/1852/3t3/18/3.png?fmt=webp-alpha&wid=930&qlt=90",
        mark: "Toyota",
        model: "Corolla",
        price: 22175
    },
];

// Creating the car element and appending it in the cars list
function carItem(car, container, buttonText, buttonAction) {
    const li = document.createElement("li");
    const img = document.createElement("img");
    const mark = document.createElement("span");
    const model = document.createElement("span");
    const price = document.createElement("span");
    const button = document.createElement("button");

    img.src = car.imgUrl;
    mark.textContent = car.mark;
    model.textContent = car.model;
    price.textContent = `$${car.price.toFixed(0)}`;
    button.textContent = buttonText;

    button.addEventListener("click", buttonAction);

    mark.classList.add("mark");
    model.classList.add("model");
    price.classList.add("price");

    li.appendChild(img);
    li.appendChild(mark);
    li.appendChild(model);
    li.appendChild(price);
    li.appendChild(button);

    container.appendChild(li);
}


// Function to display the cars in the cars list 
function updateDisplay(filteredCars = cars) {
    const carList = document.getElementById("cars-list");
    carList.innerHTML = "";

    filteredCars.forEach(car => {
        carItem(car, carList, "Add to Cart", (event) => addToCart(event, car));
    });
}

// Function to filter cars based on mark and price range
function filterCars() {
    const markFilter = document.getElementById("mark").value.toLowerCase();
    const priceMin = parseInt(document.getElementById("price-min").value.replace(/,/g, "")) || 0;
    const priceMax = parseInt(document.getElementById("price-max").value.replace(/,/g, "")) || Infinity;

    const filteredCars = cars.filter(car => {
        const matchMark = markFilter === "all" || car.mark.toLowerCase() === markFilter;
        const matchPrice = car.price >= priceMin && car.price <= priceMax;
        return matchMark && matchPrice;
    });

    updateDisplay(filteredCars);
}

["mark", "price-min", "price-max"].forEach(id => {
    document.getElementById(id).addEventListener("change", filterCars);
});

// Function to add the cars from the cars list to the cart
function addToCart(event, car) {
    const cartList = document.getElementById("cart-items");
    carItem(car, cartList, "Remove", removeFromCart);
    
    calculateTotal();
}

// Function to remove the selected car from the cart
function removeFromCart(event, soldCar = null) {
    let item;

    if (soldCar) {
        const cartItems = document.querySelectorAll("#cart-items li");

        cartItems.forEach(cartItem => {
            const mark = cartItem.querySelector(".mark").textContent;
            const model = cartItem.querySelector(".model").textContent;
            const price = parseFloat(cartItem.querySelector(".price").textContent.replace("$", ""));

            if (mark === soldCar.mark && model === soldCar.model && price === soldCar.price) {
                item = cartItem;
            }
        });
    } else {
        item = event.target.closest("li");
    }
    
    if (item) {
        item.remove();
        calculateTotal();
    }
}

// Function to calculate the total price of the cart items
function calculateTotal() {
    const cartItems = document.querySelectorAll("#cart-items li");
    let total = 0;

    cartItems.forEach(item => {
        const priceText = item.querySelector(".price").textContent;
        const price = parseFloat(priceText.replace("$", ""));
        total += price;
    });

    document.querySelector("#total-price").textContent = `${total.toFixed(0)}`; 

    const totalPriceDisplay = document.getElementById("total-price-display");
    if (totalPriceDisplay) {
        totalPriceDisplay.textContent = `$${total.toFixed(0)}`;
    }
}

// Function to sell the selected car from the cart
function sellCar(soldCar) {
    carsToSell.push(soldCar);
}


// Function to cancel the cart and remove all selected cars from the cart
function cancelCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";
    document.querySelector("#total-price").textContent = "$0.00";
}

document.getElementById("cancel").addEventListener("click", cancelCart);

updateDisplay();

document.getElementById("add-car-form").addEventListener("submit", function(event) {
    event.preventDefault();
    addNewCar();
});

// Function to add a new car to the cars list and update the display
function addNewCar() {
    const newCarMark = document.getElementById("car-mark").value.trim();
    const newCarModel = document.getElementById("car-model").value.trim();
    const newCarPrice = parseFloat(document.getElementById("car-price").value);
    const newCarImgUrl = document.getElementById("car-image-url").value.trim();

    if (!newCarMark || !newCarModel || !newCarPrice || !newCarImgUrl) {
        alert("Please fill in all required fields correctly.");
        return;
    }

    const newCar = {
        imgUrl: newCarImgUrl,
        mark: newCarMark,
        model: newCarModel,
        price: newCarPrice
    };

    cars.push(newCar);
    document.getElementById("add-car-form").reset();
    updateDisplay();
    alert("New car added successfully!");
}

// Payment modal and success message modal
const paymentModal = document.getElementById("payment");
const successMessageModal = document.getElementById("success-message");
const background = document.querySelector(".container");

const sellButton = document.getElementById("sell");

let carsToSell = [];

sellButton.addEventListener("click", () => {
        const cartItems = document.querySelectorAll("#cart-items li");

        cartItems.forEach(item => {
            const mark = item.querySelector(".mark").textContent;
            const model = item.querySelector(".model").textContent;
            const price = parseFloat(item.querySelector(".price").textContent.replace("$", ""));
    
            const soldCar = { mark, model, price };
            carsToSell.push(soldCar);
        });

        calculateTotal();
    
        paymentModal.style.display = "block";
        background.style.filter = "opacity(70%)";
    });

window.addEventListener("click", (event) => {
    if (event.target === paymentModal) {
        paymentModal.style.display = "none";
    } else if (event.target === successMessageModal) {
        successMessageModal.style.display = "none";
    }
});

// Payment form validation 
document.getElementById("payment-form").addEventListener("submit", (event) => {
    event.preventDefault();

    let cardNumber = document.getElementById("card-number").value;
    let expirationDate = document.getElementById("expiration-date").value;
    let cvv = document.getElementById("cvv").value;

    if (
        cardNumber.trim() === "" ||
        expirationDate.trim() === "" ||
        cvv.trim() === ""
    ) {
        alert("Please fill all required fields!");
        return;
    }

    if(!cardNumber.match(/^\d{13,16}$/)) {
        alert("Please enter a valid card number!");
        return;
    }

    if(!cvv.match(/^\d{3,4}$/)) {
        alert("Please enter a valid CVV!");
        return;
    }

    paymentModal.style.display = "none";
    successMessageModal.style.display = "block";
    background.style.filter = "opacity(70%)";

    setTimeout(() => {
        successMessageModal.style.display = "none";
        background.style.filter = "";
    }, 6000);

    document.getElementById("payment-form").reset();

    carsToSell.forEach(soldCar => {
        const carIndex = cars.findIndex(car =>
            car.mark === soldCar.mark &&
            car.model === soldCar.model &&
            car.price === soldCar.price
        );

        if (carIndex > -1) {
            cars.splice(carIndex, 1);
        }
    });

    updateDisplay();
    cancelCart();
});