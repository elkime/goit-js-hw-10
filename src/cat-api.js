import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const url = 'https://api.thecatapi.com/v1/';
axios.defaults.headers.common['x-api-key'] =
  'live_4Pcv4aTWqGGks9DzB1q70KOOtW5yodbizd7fdnZGc5ZWmTZFZDzEmVM3D84zeuwW';

export function fetchBreeds(browser) {
  axios
    .get(url + 'breeds')
    .then(function (response) {
      const cats = response.data;
      cats.map(cat => {
        const option = document.createElement('option');
        option.value = cat.id;
        option.text = cat.name;
        browser.appendChild(option);
      });
    })
    .catch(function () {
      Notify.failure('❌ Opps! Something went wrong! Try reloading the page!');
    });
}

export function fetchCatByBreed(breedId, loader, info) {
  axios
    .get(url + 'images/search?breed_ids=' + breedId)
    .then(function (response) {
      loader.classList.remove('hidden');
      info.classList.add('hidden');
      info.innerHTML = '';
      setTimeout(function () {
        loader.classList.add('hidden');
        info.classList.remove('hidden');
      }, 1000);
      console.log(response.data);
      const catImage = document.createElement('img');
      catImage.src = response.data[0].url;
      catImage.classList.add('cat-image');
      const infoCat = document.createElement('div');
      const infoTitle = document.createElement('h1');
      const infoText = document.createElement('p');
      const infoTemp = document.createElement('p');
      infoCat.classList.add('info-cat');
      infoTitle.textContent = response.data[0].breeds[0].name;
      console.log(response.data[0].breeds[0].name);
      infoTitle.classList.add('cat-title');
      infoText.textContent = response.data[0].breeds[0].description;
      //infoText.classList.add('cat-description');//
      infoTemp.textContent =
        'TEMPERAMENT: ' + response.data[0].breeds[0].temperament;
      //infoTemp.classList.add('cat-temperament');//
      infoCat.appendChild(infoTitle);
      infoCat.appendChild(infoText);
      infoCat.appendChild(infoTemp);
      info.appendChild(catImage);
      info.appendChild(infoCat);
    })
    .catch(function () {
      Notify.failure('❌ Opps! Something went wrong! Try reloading the page!');
    });
}
