// const books = [
//   {
//     id: 1,
//     title: 'The Great Gatsby',
//     author: 'F. Scott Fitzgerald',
//     cover: 'https://covers.openlibrary.org/b/id/7352161-L.jpg',
//     category: 'Classic',
//     description: 'A novel about the American dream and high society in the 1920s.'
//   },
//   {
//     id: 2,
//     title: 'To Kill a Mockingbird',
//     author: 'Harper Lee',
//     cover: 'https://covers.openlibrary.org/b/id/8228691-L.jpg',
//     category: 'Classic',
//     description: 'A story of racial injustice in the Deep South seen through a child’s eyes.'
//   },
//   {
//     id: 3,
//     title: '1984',
//     author: 'George Orwell',
//     cover: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
//     category: 'Fiction',
//     description: 'A dystopian novel about totalitarian regime and surveillance.'
//   },
//   {
//     id: 4,
//     title: 'Harry Potter and the Sorcerer\'s Stone',
//     author: 'J.K. Rowling',
//     cover: 'https://covers.openlibrary.org/b/id/7984916-L.jpg',
//     category: 'Fantasy',
//     description: 'The first book in the beloved wizarding series.'
//   },
//   {
//     id: 5,
//     title: 'The Hobbit',
//     author: 'J.R.R. Tolkien',
//     cover: 'https://covers.openlibrary.org/b/id/6979861-L.jpg',
//     category: 'Fantasy',
//     description: 'A fantasy adventure preceding the Lord of the Rings trilogy.'
//   },
// ];

// const masterPassword = 'admin123';

// const bookGallery = document.getElementById('bookGallery');
// const detailsModal = document.getElementById('detailsModal');
// const editModal = document.getElementById('editModal');

// const detailsCover = document.getElementById('detailsCover');
// const detailsTitle = document.getElementById('detailsTitle');
// const detailsAuthor = document.getElementById('detailsAuthor');
// const detailsDescription = document.getElementById('detailsDescription');
// const closeDetailsBtn = document.getElementById('closeDetailsBtn');

// const bookForm = document.getElementById('bookForm');
// const bookIdInput = document.getElementById('bookId');
// const titleInput = document.getElementById('titleInput');
// const authorInput = document.getElementById('authorInput');
// const categoryInput = document.getElementById('categoryInput');
// const coverInput = document.getElementById('coverInput');
// const descriptionInput = document.getElementById('descriptionInput');
// const cancelEditBtn = document.getElementById('cancelEditBtn');

// const searchInput = document.getElementById('searchInput');
// const categoryFilter = document.getElementById('categoryFilter');
// const addBookBtn = document.getElementById('addBookBtn');

// let currentBooks = [...books]; // copy to work with filters

// function renderBooks() {
//   bookGallery.innerHTML = '';
//   currentBooks.forEach(book => {
//     const card = document.createElement('div');
//     card.className = 'card';
//     card.dataset.id = book.id;

//     card.innerHTML = `
//       <img src="${book.cover}" alt="${book.title}" />
//       <h3>${book.title}</h3>
//       <p>${book.author}</p>
//       <div class="actions">
//         <button class="edit-btn">Edit</button>
//         <button class="delete-btn">Delete</button>
//       </div>
//     `;

//     // Clicking on card image or title shows details modal
//     card.querySelector('img').addEventListener('click', () => showDetails(book.id));
//     card.querySelector('h3').addEventListener('click', () => showDetails(book.id));

//     // Edit button
//     card.querySelector('.edit-btn').addEventListener('click', e => {
//       e.stopPropagation();
//       openEditModal(book.id);
//     });

//     // Delete button
//     card.querySelector('.delete-btn').addEventListener('click', e => {
//       e.stopPropagation();
//       handleDelete(book.id);
//     });

//     bookGallery.appendChild(card);
//   });
// }

// function showDetails(id) {
//   const book = books.find(b => b.id === id);
//   if (!book) return;
//   detailsCover.src = book.cover;
//   detailsTitle.textContent = book.title;
//   detailsAuthor.textContent = 'by ' + book.author;
//   detailsDescription.textContent = book.description;
//   detailsModal.style.display = 'flex';
// }

// closeDetailsBtn.addEventListener('click', () => {
//   detailsModal.style.display = 'none';
// });

// function openEditModal(id = null) {
//   if (id) {
//     const book = books.find(b => b.id === id);
//     if (!book) return;
//     bookIdInput.value = book.id;
//     titleInput.value = book.title;
//     authorInput.value = book.author;
//     categoryInput.value = book.category;
//     coverInput.value = book.cover;
//     descriptionInput.value = book.description;
//   } else {
//     // For adding new book
//     bookIdInput.value = '';
//     titleInput.value = '';
//     authorInput.value = '';
//     categoryInput.value = '';
//     coverInput.value = '';
//     descriptionInput.value = '';
//   }
//   editModal.style.display = 'flex';
// }

// cancelEditBtn.addEventListener('click', () => {
//   editModal.style.display = 'none';
// });

// bookForm.addEventListener('submit', e => {
//   e.preventDefault();
//   const id = bookIdInput.value;
//   if (id) {
//     // Edit existing book
//     const book = books.find(b => b.id == id);
//     if (book) {
//       book.title = titleInput.value;
//       book.author = authorInput.value;
//       book.category = categoryInput.value;
//       book.cover = coverInput.value;
//       book.description = descriptionInput.value;
//     }
//   } else {
//     // Add new book
//     const newBook = {
//       id: Date.now(),
//       title: titleInput.value,
//       author: authorInput.value,
//       category: categoryInput.value,
//       cover: coverInput.value,
//       description: descriptionInput.value,
//     };
//     books.push(newBook);
//   }
//   applyFilters();
//   editModal.style.display = 'none';
// });

// function handleDelete(id) {
//   const pass = prompt('Enter master password to delete this book:');
//   if (pass === masterPassword) {
//     if (confirm('Are you sure you want to delete this book?')) {
//       const index = books.findIndex(b => b.id === id);
//       if (index > -1) {
//         books.splice(index, 1);
//         applyFilters();
//         alert('Book deleted.');
//       }
//     }
//   } else {
//     alert('Incorrect password. Deletion cancelled.');
//   }
// }

// function applyFilters() {
//   const searchTerm = searchInput.value.trim().toLowerCase();
//   const category = categoryFilter.value;

//   currentBooks = books.filter(book => {
//     const matchesSearch = 
//       book.title.toLowerCase().includes(searchTerm) ||
//       book.author.toLowerCase().includes(searchTerm);
//     const matchesCategory = category === '' || book.category === category;
//     return matchesSearch && matchesCategory;
//   });

//   renderBooks();
// }

// searchInput.addEventListener('input', applyFilters);
// categoryFilter.addEventListener('change', applyFilters);

// addBookBtn.addEventListener('click', () => openEditModal(null));

// // Initial render
// renderBooks();
