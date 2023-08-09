const myBooks = [];
const addBtn = document.getElementById('add-btn');
const listBooks = document.getElementById('list-books');

// load books from localStorage
const storedBooks = localStorage.getItem('myBooks');
if (storedBooks) {
  myBooks.push(...JSON.parse(storedBooks)); // Parse the storedBooks JSON string
}

function removeBook(bookTitleToRemove) {
  // Use filter to create a new array without the book to remove
  const myBooksUpdated = myBooks.filter((myBook) => myBook.bookTitle !== bookTitleToRemove);

  // Save updated myBooks array to localStorage
  localStorage.setItem('myBooks', JSON.stringify(myBooksUpdated));

  // Update the myBooks array with the updated version
  myBooks.length = 0;
  myBooks.push(...myBooksUpdated);
  window.location.reload();
}

function showBooks() {
  listBooks.innerHTML = '';

  // Show all books in the myBooks array using forEach() loop
  myBooks.forEach((myBook) => {
    const myBookDiv = document.createElement('div'); // Create a new div for each book

    // Create h4 element for title and append textContent
    const bookTitle = document.createElement('h4');
    bookTitle.textContent = myBook.bookTitle;

    // Create h4 element for author and append textContent
    const bookAuthor = document.createElement('h4');
    bookAuthor.textContent = myBook.bookAuthor;

    // Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';

    // Add event listener to remove button
    removeBtn.addEventListener('click', () => {
      removeBook(myBook.bookTitle);
    });

    // Add hr
    const hr = document.createElement('hr');

    // Append items to myBookDiv
    myBookDiv.appendChild(bookTitle);
    myBookDiv.appendChild(bookAuthor);
    myBookDiv.appendChild(removeBtn);
    myBookDiv.appendChild(hr);

    listBooks.appendChild(myBookDiv); // Append myBookDiv to the listBooks container
  });
}

function addBook() {
  // Pick title and author values and push to myBooks({title, author})
  const bookTitle = document.getElementById('title').value.trim();
  const bookAuthor = document.getElementById('author').value.trim();
  const errorSpan = document.getElementById('error-msg');
  const errorMsg = 'Both Title and Author must be filled out!';

  if (bookTitle === '' || bookAuthor === '') {
    errorSpan.textContent = errorMsg;
    return;
  }

  // Save to myBooks array
  myBooks.push({ bookTitle, bookAuthor });

  // Save updated myBooks array to localStorage
  localStorage.setItem('myBooks', JSON.stringify(myBooks));

  // Call showBooks() to see all books
  showBooks();

  // Clear the input fields values
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
}

// Add event listeners
addBtn.addEventListener('click', addBook);

// Initial display of books
showBooks();
