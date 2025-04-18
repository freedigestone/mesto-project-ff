export const initialCards = [
  {
    name: "Большая Голубая Дыра Белиза",
    link: "https://lh3.googleusercontent.com/p/AF1QipNuzyi09dnodFNeJB3I5WfF_dmaWSGfPM_zbow3=s1360-w1360-h1020",
    alt: "Вид сверху на Большую Голубую Дыру в Белизе — знаменитую подводную воронку с насыщенно-синим цветом",
  },
  {
    name: "Амазонка",
    link: "https://tengrinews.kz/userdata/images/u40/resized/c83e338fdc5ae400cadfe0d98acc7dfb.jpg",
    alt: "Река Амазонка и ее леса, вид с высоты птичего полета",
  },
  {
    name: "Большой Барьерный Риф",
    link: "https://tengrinews.kz/userdata/images/u40/resized/1440ff6f3880e3f235756b6f4a0cc371.JPG",
    alt: "Большой барьерный риф, вид с высоты птичего полета",
  },
  {
    name: "Антарктида",
    link: "https://tengrinews.kz/userdata/images/u40/811fcd16cd3b3d987f0ce8648bd7ba65.jpg",
    alt: "Отколовшийся ледник лазурного цветаб в воде, не далеко от скалистого берега",
  },
  {
    name: "Мадагаскар",
    link: "https://tengrinews.kz/userdata/images/u40/resized/24c2552cb38e9c194dfc62e55e08d67e.jpg",
    alt: "Животные пасущиеся на лугу, на  побережье с лазурной водой",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    alt: "Скалистый берег озера Байкал",
  }
];



export const cardsContainer = document.querySelector('.places__list');
export const cardTemplate = document.querySelector('#card-template').content;



  //  попапы
 export const editButton = document.querySelector('.profile__edit-button');
 export const addButton = document.querySelector('.profile__add-button');
 export const popupEdit = document.querySelector('.popup_type_edit');
 export const popupNewCard = document.querySelector('.popup_type_new-card');
 export const popupImage = document.querySelector('.popup_type_image');
 export const closeButtons = document.querySelectorAll('.popup__close');
 export const overlay = document.querySelector('.popup');

 export const popupAvatar = document.querySelector('.popup_type_avatar');
 export const avatarForm = popupAvatar.querySelector('.popup__form');
 export const avatarInput = avatarForm.querySelector('.popup__input_type_avatar');
 export const avatarEditButton = document.querySelector('.profile__image-edit');
 // scripts/constants.js

export const profileName = document.querySelector('.profile__title');
export const profileJob = document.querySelector('.profile__description');
export const profileAvatar = document.querySelector('.profile__image'); // проверь, какой у тебя класс
export const popupConfirm = document.querySelector('.popup_type_confirm');
export const confirmForm = popupConfirm.querySelector('.popup__form');




 