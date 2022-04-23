// variables
const access_token = '338148107599656';
const url = 'https://superheroapi.com/api.php/'+access_token+'/search/';
const favFalse = './images/white_star.png';
const favTrue = './images/red.jpg';


const searchBar = document.getElementById('search-data');


//search event
searchBar.addEventListener('keyup', (e)=> {
    const searchString = e.target.value;
    console.log("Searching for: ",searchString);
    if (searchString.length < 2){   
        document.getElementById('results').innerHTML = 'Add atleast 2 characters';
    }
    else{
        searchHero(searchString);
    }
});



// create object for this app in localStorage if not present
checkLocalStorage();

// Initialize localStorage entry
function checkLocalStorage(){
    if (localStorage.getItem('superheroFavs')==null){
        let arr=[];
        localStorage.setItem('superheroFavs', JSON.stringify(arr));
        // localStorage.setItem('superheroFavs', JSON.stringify(Array()));
    }
}
  //event listeners for detail and favourite button
    document.addEventListener('click',(e)=>{
        if(e.path[1].id=='details_btn'){
            let id = e.target.parentNode.parentNode.parentNode.parentNode.id;
            console.log(id)
             window.open('details.html'+'?id='+id, "_self");
        }
        else if(e.path[0].id=='add_fav_btn'){
            let id=e.target.parentNode.parentNode.parentNode.parentNode.id;
            let favs=JSON.parse(localStorage.getItem('superheroFavs'))

            // fav button decide
        if (favs.indexOf(id) != -1){
            favs = favs.filter((item) => item!=id);
            localStorage.setItem('superheroFavs',JSON.stringify(favs));
            e.target.src = favFalse;
            customAlert('failure','Favourite Removed');
        }else{
            
            favs.push(id)
            console.log(favs)
            localStorage.setItem('superheroFavs',JSON.stringify(favs))
            e.target.src = favTrue;
            customAlert('success','Favourite Added');
        }
            }
        })
   




async function searchHero(searchString){
      // Calling API
      let response = await fetch(url+searchString);
      if (response.ok) { // if HTTP-status is 200-299
          renderData(await response.json());
      }
      else {
          alert("Error in fetching data from api " + response.status);
      }
}

function renderData(data){
     
      // deleting previous results
      var results = document.getElementById('results');
      results.remove();


    // Creating new results
    var result_container = document.getElementById('result-container');
    var results = document.createElement('DIV');
    results.id = 'results';
    result_container.appendChild(results);
    
   // rendering each heroes
   data.results.forEach((element) => {
    results.appendChild(getHeros(element));
});
}

function getHeros(data){
  
   var heroCard = document.createElement('DIV');
   heroCard.className = 'position';
   heroCard.id = data.id;
   var srcFav;
   var favs = JSON.parse(localStorage.getItem('superheroFavs'));
   // Checking if the hero is fav or not
   if(favs.indexOf(data.id) !== -1){
       srcFav = favTrue;
   }
   else{
       srcFav = favFalse;
   }
   //used bootstrap 
   heroCard.innerHTML = `
       <div class="card" style="width: 18rem;">
  <img src="${data.image.url}" class="card-img-top" alt="...">
  <div class="card-body cardbody">
  <div id="details_btn" class="card-name"><h2>${data.name}<h2></div>
  <span class="card-btns">
  
      <img id="add_fav_btn" src="${srcFav}" width="30">
  </span>
  </div>
</div>
   `
   return heroCard;
}


// For changing visibility of alert box
function customAlert(type, message){
    var element = document.getElementsByClassName(type);
    element[0].innerHTML = message;
    element[0].style.visibility = "visible"
    setTimeout(() => {
        element[0].style.visibility = "hidden";
    }, 1000);
}