//let myLibrary = [];

function Book(title, author, pages, read) {
  this.title= title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    return title + " by " + author + ", " + pages + " pages, " + read;
    }
}
//console.log(myLibrary);
//console.log(TheHobbit.info());

function addBookToLibrary() {
  let form = document.getElementById('add-form');
  let title = form.elements['title'].value;
  console.log(title);
  let author = form.elements['author'].value;
  console.log(author);
  let pages = form.elements['pages'].value;
  console.log(pages);
  let read = form.elements['read'].value;
  console.log(read);

  if ((title == "") || (author == "") || (pages == "") || (read == "")) {
    document.getElementById("error").innerHTML = "Please complete your entry";

    return;
  } else {
   document.getElementById("form-popup").style.display = "none";

  const addBook = new Book(title, author, pages, read);
myLibrary.push(addBook);
  console.log(addBook);
  saveToLocal();
  buildLibrary();

  let reset = document.getElementById("add-form");
  reset.reset();

    }
}

function openForm() {
  document.getElementById("form-popup").style.display = "block";
}

function closeForm() {
  document.getElementById("form-popup").style.display = "none";

  let reset = document.getElementById("add-form");
  reset.reset();

}

function changeRead(i, myLibrary) {

  let status = myLibrary[i].read;
  console.log(status);

  if (status === "read") {
    myLibrary[i].read = "unread";
    saveToLocal();
    buildLibrary();
    return;
  } else {
    myLibrary[i].read = "read";
    saveToLocal();
    buildLibrary();
    return;
  }

}

function dummyBooks() {
  const TheHobbit = new Book('The Hobbit', 'J.R.R Tolkien', 295, 'unread');
  myLibrary.push(TheHobbit);

  const Bridgerton = new Book('Bridgerton', 'Lady Mae', 619, 'read');
  myLibrary.push(Bridgerton);

  const HarryPotter = new Book('Harry Potter', 'J.K Rowling', 777, 'unread');
  myLibrary.push(HarryPotter);

}

//console.log("Length: " + myLibrary.length);

function buildTable(){
  let i = 0;
  build = '';
if (i < myLibrary.length) {
  while (i < myLibrary.length) {
  //console.log(myLibrary[i].info());
  build += "<tr>";
  build += "<td>" + myLibrary[i].title + "</td>";
  build += "<td>" + myLibrary[i].author + "</td>";
  build += "<td class='hide-mobile'>" + myLibrary[i].pages + "</td>";
    build += "<td><button id='status' onclick='changeRead(" + i + ", myLibrary);'>" + myLibrary[i].read + "</button></td>";
  //build += "<td>" + myLibrary[i].read + "</td>";
  build += "<td><button id='remove' onclick='remove(" + i + ", myLibrary);'>remove</button></td>";
  build += "</tr>";
  i++

  }
  return build;

//document.getElementById("books").innerHTML += myLibrary[i].info() + "<br>";

}
}

function remove(i, myLibrary) {
  console.log(i);
  myLibrary.splice(i, 1);
  buildLibrary();
  saveToLocal();
  return;
}

function tableHeader () {
  build = "<tr>";
  build += "<th>TITLE</th>";
  build += "<th>AUTHOR</th>";
  build += "<th class='hide-mobile'>PAGES</th>";
  build += "<th>STATUS</th>";
  build += "<th>REMOVE</th>";
  build += "</tr>";

  return build;
}

function buildLibrary() {

  image = '<img id="image" src="images/cat.png" alt="empty library">';

  if (myLibrary.length == 0) {
    document.getElementById("builder").innerHTML = image ;
  } else {
  builder = "<table>";
  builder += tableHeader();
  builder += buildTable();
  builder += "</table>";
        document.getElementById("builder").innerHTML = builder;
    }
  }

  // local storage

  function saveToLocal() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  }

  function restoreLocal() {
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    if (myLibrary === null) myLibrary = [];
    dummyBooks();
    buildLibrary();
  }
