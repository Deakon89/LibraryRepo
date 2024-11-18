
// variable and constant html
const btnSub= document.querySelector(".btnSub");
const bookSearch= document.querySelector(".book");
const main= document.querySelector(".main-container");
const btnRead= document.querySelector(".btnRead");
// ---

// DOM manipulation
const modal = document.createElement("div");
const article = document.createElement("article");
const btnClose = document.createElement("button");
main.appendChild(article);
// ---

// event button
 btnSub.addEventListener("click", search);
// ---

// lowercase searching
 function lowerSerch(){
     return bookSearch.value.toLowerCase();
 }
// ---

// search information fetching API
 function search(){
     let genName= lowerSerch();
     let urlGen="https://openlibrary.org/subjects/"+ genName +".json?limit=10";
     clearDisplay();
     createDisplay();
     fetch(urlGen)
     .then(response => response.json())
     .then(data => {
        // console.log(data.works);
        removeLoader();
        viewResult(data);
    })
    .catch(error => {
        console.log(error);
        article.innerHTML="<h2>parameter not fount</h2>"
    });
}
// ---

// organize result
 function viewResult(item){
    _.forEach(item, (value, key) => {
        if (key === "works") {
          _.forEach(value, (item) => {
            // console.log(item);
            // creating book card
            const card = document.createElement("div");
            card.classList.add("card");
            article.appendChild(card);
            // inner card text
            card.innerHTML+="<h2>"+item.title+"</h2>"+"<p>Author: "+item.authors[0].name+"</p>"
            +"<br><img src='https://covers.openlibrary.org/b/id/"+ item.cover_id +"-M.jpg'><br>";
            // modal control
            const btnRead = document.createElement("button");
            btnRead.classList.add("btnRead");
            btnRead.innerHTML = "Read more";
            card.appendChild(btnRead);
            btnRead.addEventListener("click", () => {
              openModal();
              searchDescription(item);
            });
            
            article.scrollIntoView({ behavior: "smooth" });
          });

        }
        if (value.length === 0) {
          article.innerHTML="<h2>Result:</h2>"+"<h2>parameter not fount</h2>";
        }
      });
    }
// ---

// search for description fetching API
 function searchDescription(item){
     fetch(`https://openlibrary.org${item.key}.json`)
        .then(response => response.json())
        .then(data => {
         if(typeof data.description === "string"){
              // console.log(data);
               modal.innerHTML+="<h2>"+data.title+"</h2>"+"<h2>Description:</h2>"+"<p>"+data.description+"</p>"+"<br>";
         }else{
            //  console.log("description not found");
               modal.innerHTML+="<h2>description:</h2>"+"<p>description not found</p>"+"<br>";
         }
         closeModal();
          })
          .catch(error => {
              console.log(error);
            });
          }
// ---

// display control function 

function removeLoader(){
    let loader = document.querySelector(".loader");
    loader.remove();
}
function clearDisplay(){
    article.innerHTML="";
    while(article.firstChild){
        article.removeChild(article.firstChild);
    }
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

  function closeModal(){
    btnClose.classList.add("btnRead");
    modal.appendChild(btnClose);
    btnClose.innerHTML = "Close";
    btnClose.addEventListener("click",()=>{
    modal.innerHTML="";
    modal.style.display = "none";
    modal.remove();
    })
  }

  function clearModal(){
    modal.innerHTML="";
  }

   function openModal(){
    clearModal();
     modal.classList.add("modal");
     main.appendChild(modal)
     modal.style.display = "flex";
     modal.style.flexDirection = "column"; 

   }
// end project
  










