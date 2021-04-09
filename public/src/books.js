function findObjByid(array, id) {
  // Abstracted function for findAuthorById and findBookById.
  let obj = {};
  obj = array.filter((item) => item.id === id);
  return obj[0];
}

function findAuthorById(authors, id) {
  return findObjByid(authors, id);
  // let authObj = {};
  // authObj = authors.filter((auth) => auth.id === id);
  // return authObj[0];
}

function findBookById(books, id) {
  return findObjByid(books, id);
  // let bookObj = {};
  // bookObj = books.filter((book) => book.id === id);
  // return bookObj[0];
}

function partitionBooksByBorrowedStatus(books) {
  let returned = [];
  let notReturned = [];
  for (let i = 0; i < books.length; i++) {
    const instances = books[i].borrows;
    let out = false;
    out = instances.every((instance) => instance.returned)
    if (out) {
      notReturned.push(books[i]);
    } else {
      returned.push(books[i]);
    }
  }
  let dualArray = [returned,notReturned]
  return dualArray;
}

function getBorrowersForBook(book, accounts) {
  let transactions = [];
  const borrowArray = book.borrows
  for (let i = 0; i < borrowArray.length && i < 10; i++) {
    let targetID = borrowArray[i].id;
    targetAccount = findObjByid(accounts, targetID);
    targetAccount.returned = borrowArray[i].returned;
    transactions.push(targetAccount);
  }
  return transactions;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
