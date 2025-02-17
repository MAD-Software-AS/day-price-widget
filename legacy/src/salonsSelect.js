export const generateSalonsSelect = ({ shadowNode, selectedSalonName, salonNames }) => {
  const select = shadowNode.querySelector(".custom-select");
  const selectedOption = shadowNode.querySelector(".selected-option");
  const selectOptionsContainer = shadowNode.querySelector(".select-options");
  const selectTrigger = shadowNode.querySelector('.select-trigger');

  selectOptionsContainer.innerHTML = salonNames.map(
    (name) =>
      `<li class="option${
        name === selectedSalonName ? " selected" : ""
      }">${name}</li>`
  ).join('');
  selectedOption.textContent = selectedSalonName;

  const selectOptionsList = shadowNode.querySelectorAll(".option");
  selectOptionsList.forEach((option) => {
    option.addEventListener("click", () => {
      // Видаляємо клас "selected" з усіх опцій
      selectOptionsList.forEach((opt) => opt.classList.remove("selected"));

      // Додаємо клас "selected" до обраної опції
      option.classList.add("selected");

      // Змінюємо текст кнопки-тригера
      selectedOption.textContent = option.textContent;

      // Закриваємо список
      select.classList.remove("active");
    });
  });

  selectTrigger.addEventListener("click", () => {
    select.classList.toggle("active");
  });

  shadowNode.addEventListener("click", (e) => {
    if (!select.contains(e.target)) {
      select.classList.remove("active");
    }
  });
};
