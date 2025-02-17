(function () {
    function initFirebase() {
      const widgetContainer = document.createElement('div');
      document.body.appendChild(widgetContainer);
  
      const shadowRoot = widgetContainer.attachShadow({ mode: 'open' });
  
      // Підключення Firebase SDK через CDN
      const firebaseScript = document.createElement('script');
      firebaseScript.src =
        'https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js'; // Firebase App SDK
      shadowRoot.appendChild(firebaseScript);
  
      const firestoreScript = document.createElement('script');
      firestoreScript.src =
        'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore-compat.js'; // Firestore SDK
      shadowRoot.appendChild(firestoreScript);
  
      // Дочекаємося завантаження SDK
      firebaseScript.onload = () => {
        firestoreScript.onload = () => {
          const firebaseConfig = {
            apiKey: 'AIzaSyArCDE83F6fnSapepCsGIk8uJ8UQNANS0c',
            authDomain: 'fohn-demo.firebaseapp.com',
            projectId: 'fohn-demo',
            storageBucket: 'fohn-demo.appspot.com',
            messagingSenderId: '141055045592',
            appId: '1:141055045592:web:e325237a8e9352d2714cad',
          };
  
          firebase.initializeApp(firebaseConfig);
          const db = firebase.firestore();
          initWidget({ db, shadowRoot });
        };
      };
    }
  
    // Ініціалізація віджета
    function initWidget({ db, shadowRoot }) {
      // HTML + CSS для віджета
      shadowRoot.innerHTML = `
          <style>
      </style>
      <div class="widget">
        <div class="widget-header">
          <div class="custom-select">
            <button class="select-trigger">
              <div class="selected-option">Chain Admin</div>
              <span class="arrow">&#9662;</span>
            </button>
            <ul class="select-options">
              <li class="option">Chain Admin</li>
              <li class="option">Chain Level</li>
              <li class="option">Manager</li>
              <li class="option">Employee</li>
            </ul>
          </div>
          <button id="widget-close-button" class="widget-close-button">
            Close
          </button>
        </div>
        <div class="widget-content"></div>
      </div>
      <div id="modalBackdrop" class="modal-backdrop" style="display: none">
        <div class="modal">
          <div class="modal-header">
            <div>
              <div>
                <span>Dato: </span>
                <span id="modal-date"></span>
              </div>
              <div>
                <span>Siste oppstart: kl. 14.00</span>
              </div>
            </div>
  
            <div>
              <span>Dagpris: </span>
              <span id="modal-price"></span>
            </div>
          </div>
  
          <div class="modal-description">
            Din Dagpris blir nå reservert, men du er først garantert ledig time
            når timen er bestilt (neste steg).
          </div>
  
          <div class="modal-body">
            <div>
              <div class="input-label">Name:</div>
              <input type="text" class="input" placeholder="Enter your name" />
            </div>
  
            <div>
              <div class="input-label">Phone:</div>
              <input
                type="tel"
                class="input"
                placeholder="Enter phone number in format +47XXXXXXXX"
                pattern="\+47[0-9]{8}"
              />
            </div>
            <p class="modal-additional-text">
              Du vil nå motta en sms med videre instrukser.
            </p>
          </div>
          <div class="modal-actions">
            <button id="cancelButton" class="widget-close-button">Cancel</button>
            <button id="saveButton" class="save-button">OK</button>
          </div>
        </div>
      </div>
      <button id="widget-toggle-button" class="widget-toggle-button">Open</button>
        `;
  
      const widgetContainer = shadowRoot.querySelector('.widget');
      const widgetContent = shadowRoot.querySelector('.widget-content');
      const openModal = shadowRoot.querySelector('#openModal');
      const modalBackdrop = shadowRoot.querySelector('#modalBackdrop');
      const cancelButton = shadowRoot.querySelector('#cancelButton');
      const confirmBtn = shadowRoot.querySelector('#saveButton');
      const toggleButton = shadowRoot.querySelector('#widget-toggle-button');
      const price = shadowRoot.querySelector('#modal-price');
      const date = shadowRoot.querySelector('#modal-date');
      const optionsContainer = shadowRoot.querySelector('.select-options');
      const selectTrigger = shadowRoot.querySelector('.select-trigger');
  
      const select = shadowRoot.querySelector('.custom-select');
      const selectedOption = shadowRoot.querySelector('.selected-option');
  
      // Функція для завантаження даних з Firestore
      async function loadData(salonName) {
        const realData = (
          await db.collection('dayPrices').doc('a9XSDat68cb1pxmwPCzg').get()
        ).data();
        const realDataList = Object.entries(realData.dayPriceConfig);
        const selectedSalonName = salonName || realDataList[0][0];
        const selectedData = Object.values(
          realData.dayPriceConfig[salonName || realDataList[0][0]]
        )[0];
        const reservationOptions = new Array(4)
          .fill(null)
          .map((_, index) => ({
            date: `${
              new Date().getDay() + index
            }.${new Date().getMonth()}.${new Date().getFullYear()}`,
            price: `${selectedData},-`,
            originalPrice: '889,-',
          }));
        console.log('realData:', realData);
  
        // Генерація карток
        widgetContent.innerHTML = reservationOptions
          .map(
            item => `
              <div class="card">
                <p class="widget-card-date"><strong>${item.date}</strong></p>
                <p>GJELDENE DAGPRIS AKKURAT NÅ:</p>
                <p class="price">${item.price}</p>
                <p>ord.pris <del>${item.originalPrice}</del></p>
                <button class="reserve-btn" data-date="${item.date}" data-price="${item.price}">Reserver Pris</button>
              </div>
            `
          )
          .join('');
  
        optionsContainer.innerHTML = realDataList.map(
          ([name]) =>
            `<li class="option${
              name === selectedSalonName ? ' selected' : ''
            }">${name}</li>`
        );
        selectedOption.textContent = selectedSalonName;
  
      const selectOptions = shadowRoot.querySelectorAll('.option');
      selectOptions.forEach(option => {
        option.addEventListener('click', () => {
  
          // Видаляємо клас "selected" з усіх опцій
          selectOptions.forEach(opt => opt.classList.remove('selected'));
  
          // Додаємо клас "selected" до обраної опції
          option.classList.add('selected');
  
          // Змінюємо текст кнопки-тригера
          selectedOption.textContent = option.textContent;
  
          // Закриваємо список
          select.classList.remove('active');
        });
      });
  
        // Додаємо обробники подій для кнопок "Reserver Pris"
        shadowRoot.querySelectorAll('.reserve-btn').forEach(btn => {
          btn.addEventListener('click', e => {
            const dateValue = e.target.dataset.date;
            const priceValue = e.target.dataset.price;
  
            widgetContainer.style.display = 'none';
            // Відкрити модальне вікно
            modalBackdrop.style.display = 'flex';
            price.textContent = priceValue;
            date.textContent = dateValue;
            // modal.classList.add('show');
            // modal.setAttribute('data-date', date);
            // modal.setAttribute('data-price', price);
          });
        });
      }
  
      // Обробка кнопки підтвердження
      confirmBtn.addEventListener('click', () => {
        // const name = shadowRoot.querySelector('#name').value;
        // const phone = shadowRoot.querySelector('#phone').value;
        // const date = modal.getAttribute('data-date');
        // const price = modal.getAttribute('data-price');
        // if (name && phone) {
        //   // Виклик API
        //   fetch('https://yourapi.com/reserve', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ name, phone, date, price }),
        //   })
        //     .then(res => res.json())
        //     .then(data => {
        //       alert('Резервування успішне!');
        //     })
        //     .catch(err => {
        //       console.error('Помилка:', err);
        //       alert('Сталася помилка.');
        //     });
        // } else {
        //   alert('Будь ласка, заповніть усі поля.');
        // }
      });
  
      // Завантаження даних
      loadData();
  
      toggleButton.addEventListener('click', () => {
        widgetContainer.style.display = 'block';
      });
      shadowRoot
        .querySelector('#widget-close-button')
        .addEventListener('click', () => {
          widgetContainer.style.display = 'none';
        });
  
      selectTrigger.addEventListener('click', () => {
        select.classList.toggle('active');
      });
  
      shadowRoot.addEventListener('click', e => {
        if (!select.contains(e.target)) {
          select.classList.remove('active');
        }
      });
  
      cancelButton.addEventListener('click', () => {
        modalBackdrop.style.display = 'none';
      });
      modalBackdrop.addEventListener('click', e => {
        if (e.target === modalBackdrop) {
          modalBackdrop.style.display = 'none';
        }
      });
    }
  
    // Ініціалізація після завантаження сторінки
    window.addEventListener('load', initFirebase);
  })();
  