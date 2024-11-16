const btnSub= document.querySelector(".btnSub");
const btnRes= document.querySelector(".btnRst");
const bookSearch= document.querySelector(".book");
const main= document.querySelector(".main-container");
const btnRead= document.querySelector(".btnRead");
const modal = document.createElement("div");
const article = document.createElement("article");
const btnClose = document.createElement("button");
main.appendChild(article);

 btnSub.addEventListener("click", search);


 function lowerSerch(){
     return bookSearch.value.toLowerCase().trim();
 }

 function search(){
     let genName= lowerSerch();
     let urlGen="https://openlibrary.org/subjects/"+ genName +".json?limit=10";
     clearDisplay();
     createDisplay();
     fetch(urlGen)
     .then(response => response.json())
     .then(data => {
        console.log(data.works); 
        removeLoader();
        viewResult(data);
    })
}

 function viewResult(item){
    _.forEach(item, (value, key) => {
        if (key === "works") {
          _.forEach(value, (item) => {
            console.log(item);
            const card = document.createElement("div");
            card.classList.add("card");
            article.appendChild(card);
            card.innerHTML+="<h2>title: "+item.title+"</h2>"+"<p>Author: "+item.authors[0].name+"</p>"
            +"<br><img src='https://covers.openlibrary.org/b/id/"+ item.cover_id +"-M.jpg'><br>";
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
   
    
 function searchDescription(item){
     fetch(`https://openlibrary.org${item.key}.json`)
        .then(response => response.json()) 
        .then(data => { 
         if(typeof data.description === "string"){
             console.log(data);
               modal.innerHTML+="<h2>Description:</h2>"+"<p>"+data.description+"</p>"+"<br>";
         }else{
             console.log("description not found");
               modal.innerHTML+="<h2>Description:</h2>"+"<p>description not found</p>"+"<br>";
         }
         closeModal();
          })
          .catch(error => {
              console.log(error);
            });
          }
    


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

   function openModal(){
     modal.classList.add("modal");
     document.body.appendChild(modal)   
     modal.style.display = "flex";
     modal.style.flexDirection = "column";
        
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


  

    
    
      

 

    