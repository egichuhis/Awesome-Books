class BookLibrary {
  constructor() {
    this.myBooks = [];
    this.addBtn = document.getElementById('add-btn');
    this.listBooks = document.getElementById('list-books');

    const storedBooks = localStorage.getItem('myBooks');
    if (storedBooks) {
      this.myBooks.push(...JSON.parse(storedBooks));
    }

    this.addBtn.addEventListener('click', this.addBook.bind(this));

    // Initial display of books
    this.showBooks();
  }

  showBooks() {
    this.listBooks.innerHTML = '';

    this.myBooks.forEach((myBook) => {
      const myBookDiv = document.createElement('div');
      myBookDiv.classList.add('row');

      const bookDetails = document.createElement('h4');
      bookDetails.textContent = `${myBook.bookTitle} by ${myBook.bookAuthor}`;

      const removeBtn = document.createElement('button');
      removeBtn.classList.add('remove-btn');
      removeBtn.textContent = 'Remove';
      removeBtn.addEventListener('click', () => {
        this.removeBook(myBook.bookID);
      });
      myBookDiv.appendChild(bookDetails);
      myBookDiv.appendChild(removeBtn);
      this.listBooks.appendChild(myBookDiv);
    });
  }

  addBook() {
    const bookID = this.myBooks.length + 1;
    const bookTitle = document.getElementById('title').value.trim();
    const bookAuthor = document.getElementById('author').value.trim();
    const errorSpan = document.getElementById('error-msg');
    const errorMsg = 'Both Title and Author must be filled out!';

    if (bookTitle === '' || bookAuthor === '') {
      errorSpan.textContent = errorMsg;
      return;
    }

    this.myBooks.push({ bookID, bookTitle, bookAuthor });
    localStorage.setItem('myBooks', JSON.stringify(this.myBooks));

    // Call showBooks() to see all books
    this.showBooks();

    // Clear the input fields values
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
  }

  removeBook(bookIDToRemove) {
    const myBooksUpdated = this.myBooks.filter((myBook) => myBook.bookID !== bookIDToRemove);
    localStorage.setItem('myBooks', JSON.stringify(myBooksUpdated));

    // Update the myBooks array with the updated version
    this.myBooks.length = 0;
    this.myBooks.push(...myBooksUpdated);

    // Call showBooks() to see all books
    this.showBooks();
  }
}

const bookLibrary = new BookLibrary();
bookLibrary();
