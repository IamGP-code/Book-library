const books = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    cover: 'https://covers.openlibrary.org/b/id/7352161-L.jpg',
    category: 'Classic',
    description: 'A novel about the American dream and high society in the 1920s.'
  },
  {
    id: 2,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    cover: 'https://covers.openlibrary.org/b/id/8228691-L.jpg',
    category: 'Classic',
    description: 'A story of racial injustice in the Deep South seen through a child’s eyes.'
  },
  {
    id: 3,
    title: '1984',
    author: 'George Orwell',
    cover: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
    category: 'Fiction',
    description: 'A dystopian novel about totalitarian regime and surveillance.'
  },
  {
    id: 4,
    title: "Harry Potter and the Sorcerer's Stone",
    author: 'J.K. Rowling',
    cover: 'https://covers.openlibrary.org/b/id/7984916-L.jpg',
    category: 'Fantasy',
    description: 'The first book in the beloved wizarding series.'
  },
  {
    id: 5,
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    cover: 'https://covers.openlibrary.org/b/id/6979861-L.jpg',
    category: 'Fantasy',
    description: 'A fantasy adventure preceding the Lord of the Rings trilogy.'
  }
];

const masterPassword = 'admin123'; // password for delete confirmation

// DOM references
const bookGallery = document.getElementById('bookGallery');
const detailsModal = document.getElementById('detailsModal');
const editModal = document.getElementById('editModal');
const detailsCover = document.getElementById('detailsCover');
const detailsTitle = document.getElementById('detailsTitle');
const detailsAuthor = document.getElementById('detailsAuthor');
const detailsDescription = document.getElementById('detailsDescription');
const closeDetailsBtn = document.getElementById('closeDetailsBtn');

const addBookBtn = document.getElementById('addBookBtn');
const bookForm = document.getElementById('bookForm');
const bookIdInput = document.getElementById('bookId');
const titleInput = document.getElementById('titleInput');
const authorInput = document.getElementById('authorInput');
const categoryInput = document.getElementById('categoryInput');
const fileInput = document.getElementById('fileInput');
const descriptionInput = document.getElementById('descriptionInput');
const cancelEditBtn = document.getElementById('cancelEditBtn');

const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');

// Render books in the gallery according to filters and search
function renderBooks() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedCategory = categoryFilter.value;

  // Clear gallery
  bookGallery.innerHTML = '';

  // Filter books by search and category
  const filtered = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm) || book.author.toLowerCase().includes(searchTerm);
    const matchesCategory = selectedCategory === '' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if(filtered.length === 0) {
    bookGallery.innerHTML = '<p>No books found.</p>';
    return;
  }

  filtered.forEach(book => {
    const card = document.createElement('div');
    card.className = 'card';

    // Clicking on the card (except buttons) shows details
    card.addEventListener('click', (e) => {
      if(e.target.tagName.toLowerCase() === 'button') return; // ignore clicks on buttons
      showDetails(book);
    });

    const img = document.createElement('img');
    img.src = book.cover;
    img.alt = book.title + ' cover';

    const title = document.createElement('h3');
    title.textContent = book.title;

    const author = document.createElement('p');
    author.textContent = book.author;

    // Action buttons container
    const actions = document.createElement('div');
    actions.className = 'actions';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-btn';
    editBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openEditModal(book);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteBook(book);
    });

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(actions);

    bookGallery.appendChild(card);
  });
}

// Show details modal
function showDetails(book) {
  detailsCover.src = book.cover;
  detailsTitle.textContent = book.title;
  detailsAuthor.textContent = book.author;
  detailsDescription.textContent = book.description;
  detailsModal.style.display = 'flex';
}

// Close details modal
closeDetailsBtn.addEventListener('click', () => {
  detailsModal.style.display = 'none';
});
detailsModal.addEventListener('click', (e) => {
  if(e.target === detailsModal) detailsModal.style.display = 'none';
});

// Open edit/add modal
function openEditModal(book = null) {
  if(book) {
    bookIdInput.value = book.id;
    titleInput.value = book.title;
    authorInput.value = book.author;
    categoryInput.value = book.category;
    descriptionInput.value = book.description;
    fileInput.required = false; // allow keeping existing file for edit
  } else {
    bookIdInput.value = '';
    titleInput.value = '';
    authorInput.value = '';
    categoryInput.value = '';
    descriptionInput.value = '';
    fileInput.value = '';
    fileInput.required = true;
  }
  editModal.style.display = 'flex';
}

// Close edit modal
cancelEditBtn.addEventListener('click', () => {
  editModal.style.display = 'none';
});
editModal.addEventListener('click', (e) => {
  if(e.target === editModal) editModal.style.display = 'none';
});

addBookBtn.addEventListener('click', () => openEditModal());

// Handle new category selection "Add new category..."
categoryInput.addEventListener('change', () => {
  if(categoryInput.value === '__add_new__') {
    const newCat = prompt('Enter new category name:');
    if(newCat && newCat.trim() !== '') {
      // Add new category to both filter and form selects
      const newValue = newCat.trim();

      // Add to categoryInput
      const optionExists = [...categoryInput.options].some(o => o.value.toLowerCase() === newValue.toLowerCase());
      if(!optionExists) {
        const option = document.createElement('option');
        option.value = newValue;
        option.textContent = newValue;
        categoryInput.insertBefore(option, categoryInput.querySelector('option[value="__add_new__"]'));
      }
      categoryInput.value = newValue;

      // Add to categoryFilter if not present
      const filterExists = [...categoryFilter.options].some(o => o.value.toLowerCase() === newValue.toLowerCase());
      if(!filterExists) {
        const opt = document.createElement('option');
        opt.value = newValue;
        opt.textContent = newValue;
        categoryFilter.appendChild(opt);
      }
    } else {
      // Reset to empty if cancelled
      categoryInput.value = '';
    }
  }
});

// Delete book with password confirmation
function deleteBook(book) {
  const pass = prompt('Enter master password to delete this book:');
  if(pass === masterPassword) {
    const idx = books.findIndex(b => b.id === book.id);
    if(idx !== -1) {
      books.splice(idx, 1);
      alert('Book deleted successfully.');
      renderBooks();
    }
  } else {
    alert('Incorrect password. Delete cancelled.');
  }
}

// Handle form submission (add/edit)
bookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const idVal = bookIdInput.value;
  const titleVal = titleInput.value.trim();
  const authorVal = authorInput.value.trim();
  const categoryVal = categoryInput.value;
  const descriptionVal = descriptionInput.value.trim();
  const file = fileInput.files[0];

  if(!titleVal || !authorVal || !categoryVal || !descriptionVal) {
    alert('Please fill all fields.');
    return;
  }

  if(!idVal && !file) {
    alert('Please select a PDF file.');
    return;
  }

  // Simulate upload and create a cover from first page of PDF using pdf.js (optional)
  // For simplicity, here we just generate a placeholder cover image based on category

  const coverUrl = getCoverForCategory(categoryVal);

  if(idVal) {
    // Edit existing book
    const book = books.find(b => b.id == idVal);
    if(book) {
      book.title = titleVal;
      book.author = authorVal;
      book.category = categoryVal;
      book.description = descriptionVal;
      if(file) {
        // If new file uploaded, update cover (simulate)
        book.cover = coverUrl;
      }
    }
    alert('Book updated successfully.');
  } else {
    // Add new book
    const newBook = {
      id: Date.now(),
      title: titleVal,
      author: authorVal,
      category: categoryVal,
      description: descriptionVal,
      cover: coverUrl,
    };
    books.push(newBook);
    alert('Book added successfully.');
  }

  editModal.style.display = 'none';
  renderBooks();
});

// Simple function to get placeholder cover image URL based on category
function getCoverForCategory(cat) {
  const covers = {
    'Classic': 'https://covers.openlibrary.org/b/id/8231851-L.jpg',
    'Fiction': 'https://covers.openlibrary.org/b/id/8104461-L.jpg',
    'Fantasy': 'https://covers.openlibrary.org/b/id/8105424-L.jpg',
  };
  return covers[cat] || 'https://via.placeholder.com/150x200?text=No+Cover';
}

// Filter/search event listeners
searchInput.addEventListener('input', renderBooks);
categoryFilter.addEventListener('change', renderBooks);

// Initial render
renderBooks();
