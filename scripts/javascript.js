console.log(
    "При нажатии на кнопки:Gargens,Lawn,Planting происходит смена фокуса на услугах в разделе service +50" + "\n" +  "Accordion в секции prices реализация 3-х выпадающих списков об услугах и ценах + 50" + "\n" + "В разделе contacts реализован select с выбором городов +25" + "\n"  + "Всего: 125 баллов");

const hamb = document.querySelector("#hamb");
const popup = document.querySelector("#popup");
const body = document.body;

// Клонируем меню, чтобы задать свои стили для мобильной версии
const menu = document.querySelector("#menu").cloneNode(1);

// При клике на иконку hamb вызываем ф-ию hambHandler
hamb.addEventListener("click", hambHandler);

// Выполняем действия при клике
function hambHandler(e) {
  e.preventDefault();
  // Переключаем стили элементов при клике
  popup.classList.toggle("open");
  hamb.classList.toggle("active");
  body.classList.toggle("noscroll");
  renderPopup();
}

// Pендерим элементы в попап
function renderPopup() {
  popup.appendChild(menu);
}

// Закрытие меню при нажатии на ссылку
const links = Array.from(menu.children);

// Для каждого элемента меню при клике вызываем ф-ию
links.forEach((link) => {
  link.addEventListener("click", closeOnClick);
});

// Закрытие попапа при клике на меню
function closeOnClick() {
  popup.classList.remove("open");
  hamb.classList.remove("active");
  body.classList.remove("noscroll");
}

//Services
let selectButtons = [];
let buttons =[];
let disabledButton;

const categoriesButtons = document.querySelectorAll('.service__category');
const containerButtons = document.querySelector(".services__catagories");

const servicesItems = document.querySelectorAll('.services__item');

const gardenItems = document.querySelectorAll('[data-id="garden-item"]');
const lawnItems = document.querySelectorAll('[data-id="lawn-item"]');
const plantingItems = document.querySelectorAll('[data-id="planting-item"]');

containerButtons.addEventListener("click", (event)=>{
    if(event.target.tagName=="BUTTON")servicesItems.forEach(item=> item.classList.add('services__item_blur'));
},{once:true});

categoriesButtons.forEach((button) => {
    buttons.push(button.id);
    button.addEventListener('click', (event) => {
        if (selectButtons.includes(event.target.id)) {
          selectButtons.splice(selectButtons.indexOf(event.target.id), 1)
        } else {
          selectButtons.push(event.target.id)
        }


        if (event.target.id === 'gardens') {
          button.classList.toggle('service_active');
          gardenItems.forEach(item=> item.classList.toggle('hidden-blur'));
        } else if (event.target.id === 'lawn') {
          button.classList.toggle('service_active');
          lawnItems.forEach(item=> item.classList.toggle('hidden-blur'));
        } else if (event.target.id === 'planting') {
          button.classList.toggle('service_active');
          plantingItems.forEach(item=> item.classList.toggle('hidden-blur'));
        }

        if (selectButtons.length === 2) {
          disabledButton = buttons.filter(it => !selectButtons.includes(it))[0];
          document.getElementById(disabledButton).classList.add('button_disabled');
          document.getElementById(disabledButton).setAttribute("disabled", "disabled");
        } else if (disabledButton) {
          document.getElementById(disabledButton).classList.remove('button_disabled');
          document.getElementById(disabledButton).removeAttribute("disabled");
          disabledButton = null;
        }
    })
})

//Accordion

const accordionHeaders = document.querySelectorAll(".accordion__header");
accordionHeaders.forEach(item => {
      item.addEventListener("click", event => {
        const accordionItem = item.parentNode;

        if (item.classList.contains("accordion__header_open")) {
          item.classList.remove("accordion__header_open");
          accordionItem.classList.remove("accordion__item_show");
        } else {
          document.querySelector(".accordion__header_open")?.classList.remove("accordion__header_open");
          item.classList.add("accordion__header_open");
          accordionItem.classList.add("accordion__item_show");
        }
      });
});

//Select

document.querySelector('.select-wrapper').addEventListener('click', function() {
  this.querySelector('.select').classList.toggle('select_active');
});

const adresses= document.querySelectorAll(".adress");

for (const option of document.querySelectorAll(".custom-option")) {
  option.addEventListener('click', function() {
      if (!this.classList.contains('selected')) {
          this.classList.add('selected');
          this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
          adresses.forEach(function(item){
            if(item.classList.contains('adress-show')){
              item.classList.remove('adress-show');
            }
          })
          document.getElementById(this.getAttribute("data-value")).classList.add('adress-show');
          this.closest('.select').querySelector('.select__trigger span').textContent = this.textContent;
          this.closest('.select').querySelector('.select__trigger').style= "background-color: #C1E698; font-size: 16px;";
      }
  })
}

window.addEventListener('click', function(e) {
  const select = document.querySelector('.select')
  if (!select.contains(e.target)) {
      select.classList.remove('select_active');
  }
});