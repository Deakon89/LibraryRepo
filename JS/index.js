const btnSub= document.querySelector(".btnSub");
const btnRes= document.querySelector(".btnRst");
const bookSearch= document.querySelector(".book");
const main= document.querySelector(".main-container");
const btnRead= document.querySelector(".btnRead");
// const closeModal = document.querySelector(".closeModal");
const modal = document.createElement("div");
const article = document.createElement("article");
main.appendChild(article);
let id;



btnSub.addEventListener("click", search);



function lowerSerch(){
    return bookSearch.value.toLowerCase().trim();
}



function search(){
    let genName= lowerSerch();
    let urlGen="https://openlibrary.org/subjects/"+ genName +".json?limit=10";
    clear();
    createDisplay();
    fetch(urlGen)
    .then(response => response.json())
    .then(data => {
        removeLoader();
        console.log(data.works);

        data.works.forEach(element => {
            id=element.key;
            console.log(id);
        })
        viewResult(data);
    })
}


 function viewResult(x){
     article.innerHTML="<h2>Result:</h2>";
     for(let i=0; i<10; i++){
        article.innerHTML+="<h2>"+x.works[i].title+"</h2>"+
        "<p>Author: "+x.works[i].authors[0].name+"</p>"
        +"<br><img src='https://covers.openlibrary.org/b/id/"
        + x.works[i].cover_id +"-M.jpg'><br>"+"<button class='btnRead'>Read more</button>"
        +"<br>"+"<hr>";
    
         article.scrollIntoView({behavior: "smooth", block: "start"});
     }
    //  searchDescription(x);
 }


 function createDisplay(){
     article.classList.add("result");
     if(bookSearch.value === ""){
         article.innerHTML="<h2>parameter not fount</h2>"
     }else{
         let loader = document.createElement("span");
         loader.classList.add("loader");
         article.appendChild(loader);
     }
 }

function removeLoader(){
    let loader = document.querySelector(".loader");
    loader.remove();
}

  function clear(){
    article.innerHTML="";
    while(article.firstChild){
        article.removeChild(article.firstChild);
    }
  }

  function openModal(){
    modal.classList.add("modal");
    document.body.appendChild(modal);
    modal.style.display = "flex";
  }

  function closeModal(){
    modal.style.display = "none";
    modal.remove();
  }
















