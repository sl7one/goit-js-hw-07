import { galleryItems } from './gallery-items.js';
// Change code below this line
const refs = {
  parentDom: document.querySelector('.gallery'),
};
// --------------создание строки и встраивание в дом элемент----------
function makeMarkup(obj) {
  return obj
    .map(el => {
      const { preview, original, description } = el;
      return `<a class="gallery__item" href="${original}"><img class="gallery__image" src="${preview}" alt="${description}" /></a>`;
    })
    .join('');
}

const markup = makeMarkup(galleryItems);
refs.parentDom.insertAdjacentHTML('beforeend', markup);

const lightbox = new SimpleLightbox('.gallery a', {
  //   overlay: false, // СКРИПТ ПАДАЕТ НА 2ОМ ВЫЗОВЕ
  captionsData: 'alt',
  captionsDelay: 250,
  //   captionPosition: 'right',
  overlayOpacity: 0.5,
  //   spinner: false,
  //   nav: false,
  //   navText: ['previous', 'next'],
  //   caption: true,
  //   closeText: false,
  //   swipeClose: true,
  //   showCounter: false,
  //   animationSpeed: 1000,
  //   animationSlide: false,
  //   enableKeyboard: false,
  //   loop: false,
  //   swipeTolerance: 100,
  //   widthRatio: 0.8,
  //   disableRightClick: true,
  //   additionalHtml: 'true',
  //   throttleInterval: 2000,
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

lightbox.on('nextImageLoaded.simplelightbox', () => {
  document.body.style.backgroundColor = getRandomHexColor();
});

lightbox.on('closed.simplelightbox', () => {
  document.body.style.backgroundColor = 'white';
});
