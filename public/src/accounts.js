function findAccountById(accounts, id) {
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i].id === id) {
      return accounts[i];
    }
  }
}

function sortAccountsByLastName(accounts) {
  let sortedAccounts = accounts;
  sortedAccounts.sort((acc1, acc2) => 
    acc1.name.last > acc2.name.last ? 1 : -1
  );
  return sortedAccounts;
}

function getTotalNumberOfBorrows(account, books) {
  let borrowed = 0;
  for (let book of books) {
    for (let instance of book.borrows) {
      if (instance.id === account.id) {
        borrowed++;
      }
    }
  }
  return borrowed;
}

function getCurrentBorrows(account, books) {
  // Accepts the account (who is borrowing),
  // and an array of all books.
  // Returns an array of currently borrowed books for an account.
  let currentBorrowed = [];
  for (let book of books) {
    for (let instance of book.borrows) {
      if (instance.id === account.id && !instance.returned) {
        currentBorrowed.push(book);
      }
    }
  }
  return currentBorrowed;
}

function findAuthor(authors, book) {
  // Accepts array of all authors
  // and a book to find the author for.
  // Returns the corresponding author object.
  return authors.find((auth) => auth.id === book.authorId);
}

function getBooksPossessedByAccount(account, books, authors) {
  let bookAuthorArray = [];
  let borrowedBooks = getCurrentBorrows(account, books);
  bookAuthorArray = borrowedBooks.map((book) => {
    book.author = findAuthor(authors, book);
    return book;
  });
  return bookAuthorArray;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
