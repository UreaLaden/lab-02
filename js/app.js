'use strict';

function Animal(url, title, description, keyword, horns){
  this.url = url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  Animal.allAnimals.push(this);
}
Animal.allAnimals = [];

Animal.prototype.renderAnimal = function(){
  const $liBase = $('li:first-child').clone();
  $liBase.find('h2').text(this.title);
  $liBase.find('img').attr('src', this.url);
  $liBase.find('p').text(this.description);
  $('ul').append($liBase);
};

$.ajax('data/page-1.json').then(extractJsonData);
function extractJsonData(jsonInfo){
  console.log(jsonInfo);
  jsonInfo.forEach(animal => {
    new Animal (animal.url, animal.title, animal.description, animal.keyword, animal.horns);
  });
  Animal.allAnimals.forEach(animalEntry => animalEntry.renderAnimal());
}


