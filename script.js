const myBooks = [];
const addBtn = document.getElementById('add-btn');
const listBooks = document.getElementById('list-books');

const storedBooks = localStorage.getItem('myBooks');
if (storedBooks) {
  myBooks.push(...JSON.parse(storedBooks));
}

function showBooks() {
  listBooks.innerHTML = '';

  myBooks.forEach((myBook) => {
    const myBookDiv = document.createElement('div');
    myBookDiv.classList.add('row');

    const bookDetails = document.createElement('h4');
    bookDetails.textContent = `${myBook.bookTitle} by ${myBook.bookAuthor}`;

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
      // eslint-disable-next-line no-use-before-define
      removeBook(myBook.bookTitle);
    });

    myBookDiv.appendChild(bookDetails);
    myBookDiv.appendChild(removeBtn);
    listBooks.appendChild(myBookDiv);
  });
}

function addBook() {
  const bookTitle = document.getElementById('title').value.trim();
  const bookAuthor = document.getElementById('author').value.trim();
  const errorMsg = 'Both Title and Author must be filled out!';

  if (bookTitle === '' || bookAuthor === '') {
    // eslint-disable-next-line no-alert
    alert(errorMsg);
    return;
  }

  myBooks.push({ bookTitle, bookAuthor });
  localStorage.setItem('myBooks', JSON.stringify(myBooks));

  // Call showBooks() to see all books
  showBooks();

  // Clear the input fields values
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
}

function removeBook(bookTitleToRemove) {
  const myBooksUpdated = myBooks.filter((myBook) => myBook.bookTitle !== bookTitleToRemove);
  localStorage.setItem('myBooks', JSON.stringify(myBooksUpdated));

  // Update the myBooks array with the updated version
  myBooks.length = 0;
  myBooks.push(...myBooksUpdated);

  // Call showBooks() to see all books
  showBooks();
}

addBtn.addEventListener('click', addBook);

// Initial display of books
showBooks();