// sets input from form and against book
function Book(title, author, pages, read) {
  this.title= title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// adds book to the library
function addBookToLibrary() {
  let form = document.getElementById('add-form');
  let title = form.elements['title'].value;
  let author = form.elements['author'].value;
  let pages = form.elements['pages'].value;
  let read = form.elements['read'].value;

  // validation for form
  if ((title == "") || (author == "") || (pages == "") || (read == "")) {
    document.getElementById("error").innerHTML = "Please complete your entry";
    return;
  // if validation fine, hide input form and create book entry
  // push book to library, save to localStorage and call buildLibrary to update display
  } else {
      document.getElementById("form-popup").style.display = "none";
      const addBook = new Book(title, author, pages, read);
      myLibrary.push(addBook);
      saveToLocal();
      buildLibrary();
      // clears input form so the next time the button is clicked it is empty
      let reset = document.getElementById("add-form");
      reset.reset();
    }
}

// opens the input form
function openForm() {
  document.getElementById("form-popup").style.display = "block";
}

// closes the input form and clears input
function closeForm() {
  document.getElementById("form-popup").style.display = "none";
  let reset = document.getElementById("add-form");
  reset.reset();

}

// changes the read status
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

  // dummy books, no longer used but good to keep
  function dummyBooks() {
    const TheHobbit = new Book('The Hobbit', 'J.R.R Tolkien', 295, 'unread');
    myLibrary.push(TheHobbit);

    const Bridgerton = new Book('Bridgerton', 'Lady Mae', 619, 'read');
    myLibrary.push(Bridgerton);

    const HarryPotter = new Book('Harry Potter', 'J.K Rowling', 777, 'unread');
    myLibrary.push(HarryPotter);
  }

  // table with the books is built
  function buildTable(){
    let i = 0;
    build = '';

    if (i < myLibrary.length) {
      while (i < myLibrary.length) {
        build += "<tr>";
        build += "<td>" + myLibrary[i].title + "</td>";
        build += "<td>" + myLibrary[i].author + "</td>";
        build += "<td class='hide-mobile'>" + myLibrary[i].pages + "</td>";
        build += "<td><button id='status' onclick='changeRead(" + i + ", myLibrary);'>" + myLibrary[i].read + "</button></td>";
        build += "<td><button id='remove' onclick='remove(" + i + ", myLibrary);'>remove</button></td>";
        build += "</tr>";

        i++
      }
      return build;
    }
  }

  // uses the books index in the myLibrary array to splice and remove it
  // calls buildLibrary and saveToLocal to update library
  function remove(i, myLibrary) {
    myLibrary.splice(i, 1);
    buildLibrary();
    saveToLocal();
    return;
  }

  // table header
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

// takes tableHeader and buildTable and brings it all together
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

  // save to localStorage
  function saveToLocal() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  }

  // called onload, checks if myLibrary exists, if so it loads, if not it creates an empty library
  function restoreLocal() {
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    if (myLibrary === null) myLibrary = [];
    buildLibrary();
  }
