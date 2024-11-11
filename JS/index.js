const btnS= document.querySelector(".btnSub");
const btnR= document.querySelector(".btnRst");
const bookS= document.querySelector(".book");
const geneS= document.querySelector(".generies");
const main= document.querySelector(".main-container");

btnS.addEventListener("click", function(){
    const article = document.createElement("article");
    let loader = document.createTextNode("loading...");
    article.appendChild(loader);
    article.classList.add("result");
    main.appendChild(article);
    fetch("https://openlibrary.org/search.json?q="+bookS.value)
    .then(response => response.json())
    .then(data => {
        for(let i=0; i<10; i++){;
        loader.remove();    
        article.innerHTML+="<h2>Result:</h2>" + "<h3>"+data.docs[i].title+"</h3>"+
         "<h5>"+data.docs[i].author_name+"</h5>"+"<br><img src='https://covers.openlibrary.org/b/isbn/"+ data.docs[i].isbn[0]+"-M.jpg'><br>"+ "<hr>";
        console.log(data.docs[i].title);
        } 
    })
});

