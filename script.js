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
        this.removeBook(myBook.bookTitle);
      });

      myBookDiv.appendChild(bookDetails);
      myBookDiv.appendChild(removeBtn);
      this.listBooks.appendChild(myBookDiv);
    });
  }

  addBook() {
    const bookTitle = document.getElementById('title').value.trim();
    const bookAuthor = document.getElementById('author').value.trim();
    const errorMsg = 'Both Title and Author must be filled out!';

    if (bookTitle === '' || bookAuthor === '') {
      // eslint-disable-next-line no-alert
      alert(errorMsg);
      return;
    }

    this.myBooks.push({ bookTitle, bookAuthor });
    localStorage.setItem('myBooks', JSON.stringify(this.myBooks));

    // Call showBooks() to see all books
    this.showBooks();

    // Clear the input fields values
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
  }

  removeBook(bookTitleToRemove) {
    const myBooksUpdated = this.myBooks.filter((myBook) => myBook.bookTitle !== bookTitleToRemove);
    localStorage.setItem('myBooks', JSON.stringify(myBooksUpdated));

    // Update the myBooks array with the updated version
    this.myBooks.length = 0;
    this.myBooks.push(...myBooksUpdated);

    // Call showBooks() to see all books
    this.showBooks();
  }
}

// eslint-disable-next-line no-unused-vars
const bookLibrary = new BookLibrary();

}
