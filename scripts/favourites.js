// variables
const access_token = '338148107599656';
const api_url = 'https://superheroapi.com/api.php/'+access_token+'/';
const favFalse = './images/white_star.png';
const favTrue = './images/red.jpg';


fav();

function fav(){
    let fav =JSON.parse(localStorage.getItem('superheroFavs'))
    if(fav.length==0){
        document.getElementById('results').innerHTML = "Add your favourite Heroes";
        return;
    }
    document.getElementById('results').innerHTML = '';
    fav.forEach(id => {
        searchHero(id)
    });
}


// Function to call API
async function searchHero(id){
    // Calling API
    let response = await fetch(api_url+id);
    if (response.ok) { // if HTTP-status is 200-299
        getHeros(await response.json());
    }
    else {
        alert("HTTP-Error: " + response.status);
    }
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
        <div class="card" style="width: 14rem;">
   <img src="${data.image.url}" class="card-img-top" alt="...">
   <div class="card-body cardbody">
   <div id="details_btn" class="card-name"><h2>${data.name}<h2></div>
   <span class="card-btns">
   
       <img id="add_fav_btn" src="${srcFav}" width="30">
   </span>
   </div>
 </div>
    `
    document.querySelector('#results').appendChild(heroCard) ;
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

// For changing visibility of alert box
function customAlert(type, message){
    var element = document.getElementsByClassName(type);
    element[0].innerHTML = message;
    element[0].style.visibility = "visible"
    setTimeout(() => {
        element[0].style.visibility = "hidden";
    }, 1000);
}

