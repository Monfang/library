let myLibrary = [];

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
  // something here
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
  build += "<td>" + myLibrary[i].pages + "</td>";
  build += "<td>" + myLibrary[i].read + "</td>";
  build += "<td><button id='remove' onclick='remove(" + i + ", myLibrary);'>REMOVE</button></td>";
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
  return;
}

function tableHeader () {
  build = "<tr>";
  build += "<th>TITLE</th>";
  build += "<th>AUTHOR</th>";
  build += "<th>PAGES</th>";
  build += "<th>READ</th>";
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
