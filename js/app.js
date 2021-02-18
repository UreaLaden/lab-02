'use strict';

Animal.allAnimals = [];

function Animal(url, title, description, keyword, horns){
  this.url = url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  /*
  if (!Animal.allAnimals.includes(this)){
    Animal.allAnimals.push(this);
  }
  */
}

Animal.prototype.renderAnimal = function(){
  const $h2 = $('<h2></h2>').text(this.title);
  const $image = $('<img></img>').attr('src', this.url);
  const $p = $('<p></p>').text(this.description);
  $('ul').append($h2, $image, $p);
};

Animal.prototype.removeAnimal = function(){
  const $h2 = $('<h2></h2>').text(this.title);
  const $image = $('<img></img>').attr('src', this.url);
  const $p = $('<p></p>').text(this.description);
  //$('body').empty();
  $('h2,p').hide();
  $('img').hide();
<<<<<<< HEAD
};

const pageOnejsonFile = 'data/page-1.json';
const pageTwojsonFile = 'data/page-2.json';
let buttonOneClicked = false;
let buttonTwoClicked = false;
let currentPage = buttonOneClicked ? 1 : 2;

$(document).ready(function()
{
  $('button:first-of-type').on('click', () =>
  {
    console.log('Clicked button 1');
    resetPage();   
  });
  $('button:nth-of-type(2)').on('click', ()=>
  {
    console.log('Clicked button 2');
    resetPage();
  });
=======
  $('.entry').hide();
}
let jsonFiles = ['data/page-1.json','data/page-1.json'];

$.ajax('data/page-1.json',{
  success:function (response){
    //console.log('it works!');
    extractJsonData(response);
    populateDropdown(response);
  },
  error: function (req, status, error){
    console.log('it\'s broken', status, error);
  }
>>>>>>> drae-working
});

const resetPage = () =>{
  buttonOneClicked = !buttonOneClicked; 
  buttonTwoClicked = !buttonTwoClicked;  
  console.log(jsonFile);
  console.log("Current Page:" + currentPage);
  animalObjects.forEach(animal =>{
    animal.removeAnimal();
  });
  parseJson();
};

let jsonFile = pageOnejsonFile;
//TODO: Logic prevents swapping jsonFile to page-1;
if(buttonTwoClicked && currentPage < 2 || buttonTwoClicked && currentPage === 2 || currentPage === 2)
{
    jsonFile = pageTwojsonFile;
}
else if(buttonOneClicked && currentPage > 1 || buttonOneClicked && currentPage === 1 || currentPage === 1)
{
    jsonFile = pageOnejsonFile;
}
else
{
  jsonFile = pageOnejsonFile;
}

const parseJson = () => {
  $.ajax(jsonFile,{
    success:function(response)
    {
      console.log('it works!');
      extractJsonData(response);
      populateDropdown(response);
    },
    error: function (req, status, error)
    {
      console.log('it\'s broken', status, error);
    }
  });
};

parseJson();
const animalObjects=[];
const currentOptions = {};

function extractJsonData(jsonInfo)
{
  jsonInfo.forEach(function(animal)
  {
    let tempAnimal = new Animal (animal.image_url, animal.title, animal.description,animal.keyword, animal.horns);       
      animalObjects.push(tempAnimal);
  });
  animalObjects.forEach(function(animal) 
  {
      animal.renderWithJQueryAndMustache();
  });
};

function populateDropdown(jsonInfo){
  
  jsonInfo.forEach(animal =>{
    let optionText = animal.keyword.toString().charAt(0).toUpperCase() + animal.keyword.slice(1);
    let optionValue = animal.keyword;
    const $option = new Option(optionText,optionValue);
    currentOptions[animal.keyword] = true;
  });  
  const objKeys = Object.keys(currentOptions);
  let value = 1;
  for(let key in objKeys)
  {
    let optionText = objKeys[key].toString().charAt(0).toUpperCase() + objKeys[key].slice(1);
    let $newOption = new Option(optionText,value);
    value++;
    $newOption.setAttribute('keyword',objKeys[key]);
    $newOption.setAttribute('id',objKeys[key]);    
    $newOption.setAttribute('selected','selected'); 
    //$newOption.setAttribute('selected',false);
    $('select').append($newOption);
  }
}

//Changes the drop down
$('#select').change(function(){
  $('select option:selected').each(function(){
    
    console.log(this);
    console.log($(this).text())
    let target = this;
    displayEntry(target);
  });
});

function displayEntry(target){
    //console.log(`${$(target).text()} was clicked`);

    let keyword = $(target).attr('keyword');
    let animalsToDisplay = [];
    animalObjects.forEach(entry =>{      
      if(entry.keyword === keyword){
          console.log("Match!");
          animalsToDisplay.push(entry);
          entry.removeAnimal();
      };
    });
    animalsToDisplay.forEach(entry =>{
      console.log("entry test");
      entry.renderWithJQueryAndMustache();
    });
};

Animal.prototype.renderWithJQueryAndMustache = function(){

  const animalTemplateHtml = $('#mustache-template').html();
  const templateOutput = Mustache.render(animalTemplateHtml,this);  
  $('body').append(templateOutput);
};

