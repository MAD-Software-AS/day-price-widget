export const generateReservations = ({ salonReservationPrice, shadowNode }) => {
  const widgetContent = shadowNode.querySelector(".widget-content");
  const widgetContainer = shadowNode.querySelector('.widget');
  const modalBackdrop = shadowNode.querySelector('#modalBackdrop');
  const price = shadowNode.querySelector('#modal-price');
  const date = shadowNode.querySelector('#modal-date');

  const reservationOptions = new Array(4).fill(null).map((_, index) => ({
    date: `${
      new Date().getDay() + index
    }.${new Date().getMonth()}.${new Date().getFullYear()}`,
    price: `${salonReservationPrice},-`,
    originalPrice: "889,-",
  }));

  // Генерація карток
  widgetContent.innerHTML = reservationOptions
    .map(
      (item) => `
              <div class="card">
                <p class="widget-card-date"><strong>${item.date}</strong></p>
                <p>GJELDENE DAGPRIS AKKURAT NÅ:</p>
                <p class="price">${item.price}</p>
                <p>ord.pris <del>${item.originalPrice}</del></p>
                <button class="reserve-btn" data-date="${item.date}" data-price="${item.price}">Reserver Pris</button>
              </div>
            `
    )
    .join("");

    shadowNode.querySelectorAll(".reserve-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const dateValue = e.target.dataset.date;
      const priceValue = e.target.dataset.price;

      widgetContainer.style.display = "none";
      modalBackdrop.style.display = "flex";
      price.textContent = priceValue;
      date.textContent = dateValue;
    });
  });
};
