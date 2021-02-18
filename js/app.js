'use strict';

Animal.allAnimals = [];
const pageOnejsonFile = 'data/page-1.json';
const pageTwojsonFile = 'data/page-2.json';
const animalObjects=[];
const currentOptions = {};
var jsonFile = pageOnejsonFile;
let buttonOneClicked = false;
let buttonTwoClicked = false;
let dropDownPopulated = false;
let currentPage = 1;


function Animal(url, title, description, keyword, horns){
  this.url = url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;

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
  $('.entry').hide();
  console.log("Removing: " );
  console.log(this);
}


const resetPage = () =>{
  buttonOneClicked = !buttonOneClicked; 
  buttonTwoClicked = !buttonTwoClicked;  
  console.log(jsonFile);
  console.log("Current Page:" + currentPage);
  console.log("Animal Object Count from resetPage: " + animalObjects.length);
  animalObjects.forEach(animal =>{
    animal.removeAnimal();
  });
  dropDownPopulated = false;
  parseJson();
};

$(document).ready(function(){
  $('button:first-of-type').on('click',function(){
    console.log('Clicked Page 1 Button'); 
    buttonOneClicked = true;   
    if(currentPage > 1 & buttonOneClicked){
      currentPage = 1;
      jsonFile = pageOnejsonFile;
      resetPage();
    }
    console.log("Current Page: " + currentPage);
  })
  $('button:nth-of-type(2)').on('click',function(){
    console.log('Clicked Page 2 Button');
    buttonTwoClicked = true;
    if(currentPage < 2 & buttonTwoClicked){
      currentPage = 2;
      jsonFile = pageTwojsonFile;
      resetPage();
    }
    console.log("Current Page: " + currentPage);
  })
  console.log(jsonFile);
})

const parseJson = () => {
  $.ajax(jsonFile,{
    success:function(response)
    {
      //console.log('it works!');
      console.log("response from parseJson");
      console.log(response);
      console.log("end response from parsJson");
      extractJsonData(response);
      //TODO: populateDropdown need to be separate from parseJson to avoid duplicates
      //populateDropdown(response);
    },
    error: function (req, status, error)
    {
      console.log('it\'s broken', status, error);
    }
  });
  console.log("json file from parseJson: " + jsonFile);
};

parseJson();
populateDropdown(animalObjects);
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
  if(dropDownPopulated === false){
    populateDropdown(animalObjects);
    dropDownPopulated = true;
  }
};

//*******************
function populateDropdown(animalObjects){
  console.log("Response: ");
  console.log(animalObjects);
  console.log("End");
  animalObjects.forEach(animal =>
    {
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
//**************************** */

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

