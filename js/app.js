'use strict';

function Animal(url, title, description, keyword, horns){
  this.url = url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  console.log(this);
  Animal.allAnimals.push(this);
}
Animal.allAnimals = [];
Animal.prototype.renderAnimal = function(){
  const $liBase = $('li:first-child').clone();
  $liBase.find('h2').text(this.title);
  $liBase.find('img').attr('src', this.url);
  $liBase.find('p').text(this.description);
  console.log('renderanimal');
  $('ul').append($liBase);
};


$.ajax('data/page-1.json',{
  success:function (response){
    console.log('it works!');
    extractJsonData(response);
  },
  error: function (req, status, error){
    console.log('it\'s broken', status, error);
  }
});
function extractJsonData(jsonInfo){
  console.log(typeof(jsonInfo));
  jsonInfo.forEach(animal => {
    let dog = new Animal (animal.url, animal.title, animal.description, animal.keyword, animal.horns);
    console.log(dog);
  }
  );
  Animal.allAnimals.forEach(animalEntry => animalEntry.renderAnimal());
}


