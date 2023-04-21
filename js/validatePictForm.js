import {verifyLength} from './util.js';

const pictForm = document.querySelector('#upload-select-image');

const MAX_TAG_VALUE = 5;
const MAX_TAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 120;

const validateTag = (tagStr) => {
  if (tagStr.length === 0) {
    return true;
  }

  const tags = tagStr.toLowerCase().split(' ');

  if (tags.length > MAX_TAG_VALUE) {
    return false;
  }

  const re = /^#[a-zA-A0-9а-яА-Я]{1,19}$/;
  return tags.every((tag) => re.test(tag)
  && verifyLength(tag, MAX_TAG_LENGTH));
};

function validateComment (comment) {
  return verifyLength(comment, MAX_COMMENT_LENGTH);
}
const pristine = new Pristine(pictForm,{
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper-text',
});

pristine.addValidator(
  pictForm.querySelector('.text__hashtags'),
  validateTag,
  'До 5 хеш-тегов, разделенных пробелом. После знака # допустимы только буквы и цифры. Хеш-тег не длинее 20 символов включая символ #.'
);

pristine.addValidator(
  pictForm.querySelector('.text__description'),
  validateComment,
  'Длина комментария не более 120 символов.'
);

pictForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

const tagInput = document.querySelector('.text__hashtags');

tagInput.onmouseover = function(evt) {

  evt.stopPropagation();
};
