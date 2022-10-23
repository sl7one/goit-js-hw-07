import { galleryItems } from './gallery-items.js';

const refs = {
  parentDom: document.querySelector('.gallery'),
};

// --------------создание строки и встраивание в дом элемент----------
function makeMarkup(obj) {
  return obj
    .map(el => {
      const { preview, original, description } = el;
      return `<a class="gallery__link" href="#"> <img class="gallery__image lazyload" src="${preview}" data-src="${preview}" data-source="${original}" alt="${description}"/></a>`;
    })
    .join('');
}
const markup = makeMarkup(galleryItems);
refs.parentDom.insertAdjacentHTML('beforeend', markup);
let instanceNew;
// -------------создание instance ----------------------------
function setInstance(event) {
  event.target.src = event.target.dataset.source;
  const instance = basicLightbox.create(event.target.outerHTML);
  return instance;
}
//-------------прослушиваем клик по галлерее------------------------------
refs.parentDom.addEventListener('click', onClickGallery);
function onClickGallery(event) {
  if (event.target.classList.contains('gallery__image')) {
    event.preventDefault();
    instanceNew = setInstance(event);
    instanceNew.show();
    setListenerEsc();
  }
}
//-------------прослушиваем клик по ESC------------------------------
function onPressEsc(event) {
  console.log('ловим клавишу', event.key);
  if (event.key === 'Escape') {
    instanceNew.close();
    removeListenerEsc();
  }
}
//-------------прослушиваем клик по документу, чтобы снять слушатель с клавиатуры------------
document.addEventListener('click', onClic);
function onClic(event) {
  if (event.target.classList.contains('basicLightbox')) {
    removeListenerEsc();
  }
}
//-------------сеты для клавиатуры---------------------------------------
function setListenerEsc() {
  document.addEventListener('keydown', onPressEsc);
}
function removeListenerEsc() {
  document.removeEventListener('keydown', onPressEsc);
}
