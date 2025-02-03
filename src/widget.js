(function () {
    // Ініціалізація віджета
    function initWidget() {
      const container = document.createElement("div");
      container.id = "price-widget-container";
      document.body.appendChild(container);
  
      // Shadow DOM
      const shadowRoot = container.attachShadow({ mode: "open" });
  
      // HTML + CSS для віджета
      shadowRoot.innerHTML = `
        <style>
          .widget {
            font-family: Arial, sans-serif;
            display: grid;
            gap: 10px;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            padding: 20px;
            background: #111;
            color: white;
          }
          .card {
            border: 1px solid #ccc;
            padding: 15px;
            background: #222;
            text-align: center;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }
          .card .price {
            font-size: 24px;
            color: #ffd700;
          }
          .reserve-btn {
            margin-top: 10px;
            padding: 10px 15px;
            background: #4caf50;
            color: white;
            border: none;
            cursor: pointer;
            border-radius: 5px;
          }
          .modal {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 20px;
            background: white;
            color: black;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
          }
          .modal.show {
            display: block;
          }
          .modal input {
            width: calc(100% - 20px);
            margin-bottom: 10px;
            padding: 5px;
          }
        </style>
        <div class="widget"></div>
        <div class="modal">
          <p><strong>Резервування ціни</strong></p>
          <input type="text" id="name" placeholder="Ваше ім'я">
          <input type="text" id="phone" placeholder="Ваш телефон">
          <button id="confirm">OK</button>
          <button id="cancel">Відмінити</button>
        </div>
      `;
  
      const widgetContainer = shadowRoot.querySelector(".widget");
      const modal = shadowRoot.querySelector(".modal");
      const confirmBtn = shadowRoot.querySelector("#confirm");
      const cancelBtn = shadowRoot.querySelector("#cancel");
  
      // Функція для завантаження даних з Firestore
      async function loadData() {
        // Приклад: замініть на реальні дані з Firestore
        const data = [
          { date: "31.01.2025", price: "649,-", originalPrice: "889,-" },
          { date: "03.02.2025", price: "649,-", originalPrice: "889,-" },
          { date: "04.02.2025", price: "649,-", originalPrice: "889,-" },
          { date: "05.02.2025", price: "649,-", originalPrice: "889,-" },
        ];
  
        // Генерація карток
        widgetContainer.innerHTML = data
          .map(
            (item) => `
            <div class="card">
              <p><strong>${item.date}</strong></p>
              <p>Gjeldende Dagpris:</p>
              <p class="price">${item.price}</p>
              <p><del>${item.originalPrice}</del></p>
              <button class="reserve-btn" data-date="${item.date}" data-price="${item.price}">Reserver Pris</button>
            </div>
          `
          )
          .join("");
  
        // Додаємо обробники подій для кнопок "Reserver Pris"
        shadowRoot.querySelectorAll(".reserve-btn").forEach((btn) => {
          btn.addEventListener("click", (e) => {
            const date = e.target.dataset.date;
            const price = e.target.dataset.price;
  
            // Відкрити модальне вікно
            modal.classList.add("show");
            modal.setAttribute("data-date", date);
            modal.setAttribute("data-price", price);
          });
        });
      }
  
      // Обробка кнопки підтвердження
      confirmBtn.addEventListener("click", () => {
        const name = shadowRoot.querySelector("#name").value;
        const phone = shadowRoot.querySelector("#phone").value;
        const date = modal.getAttribute("data-date");
        const price = modal.getAttribute("data-price");
  
        if (name && phone) {
          // Виклик API
          fetch("https://yourapi.com/reserve", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, phone, date, price }),
          })
            .then((res) => res.json())
            .then((data) => {
              alert("Резервування успішне!");
              modal.classList.remove("show");
            })
            .catch((err) => {
              console.error("Помилка:", err);
              alert("Сталася помилка.");
            });
        } else {
          alert("Будь ласка, заповніть усі поля.");
        }
      });
  
      // Обробка кнопки відміни
      cancelBtn.addEventListener("click", () => {
        modal.classList.remove("show");
      });
  
      // Завантаження даних
      loadData();
    }
  
    // Ініціалізація після завантаження сторінки
    window.addEventListener("load", initWidget);
  })();