function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  let checkedOut = 0;
  checkedOut = books.reduce((acc, book) => {
    if (!(book.borrows[0].returned)) {
      acc++;
    }
    return acc;
  }, 0);
  return checkedOut;
}

function getMostCommonGenres(books) {
  let genreArray = [];

  for (let i = 0; i < books.length; i++) {
    let genreCheck = false;
    let genreIndex = 0;
    if (genreArray.length !== 0) {
      for (let j = 0; j < genreArray.length; j++) {
        if (genreArray[j].name === books[i].genre) {
          genreCheck = true;
          genreIndex = j;
          break;
        }
      }
    }

    if (genreCheck) {
      genreArray[genreIndex].count += 1;
    } else {
      const name = books[i].genre;
      let count = 1;
      genreArray.push({name, count});
    }
  }

  genreArray.sort((obj1, obj2) => 
    obj1.count < obj2.count ? 1 : -1
  )
  console.log(genreArray);
  if (genreArray.length <= 5) {
    return genreArray;
  } else {
    return genreArray.slice(0,5);
  }
}


function getMostPopularBooks(books) {  
  let popularArray = [];

  for (let i = 0; i < books.length; i++) {
    const name = books[i].title;
    const count = books[i].borrows.length;
    popularArray.push({name, count});
  }

  popularArray.sort((obj1, obj2) => 
    obj1.count < obj2.count ? 1 : -1
  )

  if (popularArray.length <= 5) {
    return popularArray;
  } else {
    return popularArray.slice(0,5);
  }
}

function findObjByid(array, id) {
  let obj = {};
  obj = array.filter((item) => item.id === id);
  return obj[0];
}

function getMostPopularAuthors(books, authors) {
  let authorArray = [];


  for (let i = 0; i < books.length; i++) {
    const authorName = findObjByid(authors, books[i].authorId);
    let authorCheck = false;
    let authorIndex = 0;
    if (authorArray.length !== 0) {
      for (let j = 0; j < authorArray.length; j++) {
        const authorInArray = findObjByid(authors, authorArray[j].id)
        if (authorArray[j].id === books[i].authorId) {
          authorCheck = true;
          authorIndex = j;
          break;
        }
      }
    }

    if (authorCheck) {
      authorArray[authorIndex].count += books[i].borrows.length;
    } else {
      const name = authorName.name.first + ' ' + authorName.name.last;
      let count = books[i].borrows.length;
      authorArray.push({name, count});
    }
  }

  authorArray.sort((obj1, obj2) => 
    obj1.count < obj2.count ? 1 : -1
  )
  console.log(authorArray);
  if (authorArray.length <= 5) {
    return authorArray;
  } else {
    return authorArray.slice(0,5);
  }
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
