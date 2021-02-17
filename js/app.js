'use strict';

Animal.allAnimals = [];

function Animal(url, title, description, keyword, horns){
  this.url = url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  if (!Animal.allAnimals.includes(this)){
    Animal.allAnimals.push(this);
  }
}

Animal.prototype.renderAnimal = function(){
  const $liBase = $('<div></div>');
  console.log($liBase);
  const $h2 = $('<h2></h2>').text(this.title);
  const $image = $('<img></img>').attr('src', this.url);
  const $p = $('<p></p>').text(this.description);
  $('ul').append($h2, $image, $p);
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
    new Animal (animal.image_url, animal.title, animal.description, animal.keyword, animal.horns).renderAnimal();
  }
  );
  //Animal.allAnimals.forEach(animalEntry => animalEntry.renderAnimal());
}




