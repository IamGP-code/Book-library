document.addEventListener('DOMContentLoaded', () => {
  // Ensure pdf.js worker is set
  if (typeof pdfjsLib !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
  }

  const masterPassword = 'admin123';
  const bookGallery = document.getElementById('bookGallery');
  const detailsModal = document.getElementById('detailsModal');
  const editModal = document.getElementById('editModal');
  const fileInput = document.getElementById('fileInput');
  const detailsCover = document.getElementById('detailsCover');
  const detailsTitle = document.getElementById('detailsTitle');
  const detailsAuthor = document.getElementById('detailsAuthor');
  const detailsDescription = document.getElementById('detailsDescription');
  const detailsCategory = document.getElementById('detailsCategory');
  const closeDetailsBtn = document.getElementById('closeDetailsBtn');
  const downloadPdfBtn = document.getElementById('downloadPdfBtn');
  const bookForm = document.getElementById('bookForm');
  const bookIdInput = document.getElementById('bookId');
  const titleInput = document.getElementById('titleInput');
  const authorInput = document.getElementById('authorInput');
  const categoryInput = document.getElementById('categoryInput');
  const descriptionInput = document.getElementById('descriptionInput');
  const cancelEditBtn = document.getElementById('cancelEditBtn');
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const addBookBtn = document.getElementById('addBookBtn');
  
  // Load books from localStorage or use default
  let books = JSON.parse(localStorage.getItem('books')) || [
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      cover: 'https://covers.openlibrary.org/b/id/7352161-L.jpg',
      category: 'Classic',
      description: 'A novel about the American dream and high society in the 1920s.',
      pdf: null
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      cover: 'https://covers.openlibrary.org/b/id/8228691-L.jpg',
      category: 'Classic',
      description: 'A story of racial injustice in the Deep South seen through a child’s eyes.',
      pdf: null
    },
    {
      id: 3,
      title: '1984',
      author: 'George Orwell',
      cover: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
      category: 'Fiction',
      description: 'A dystopian novel about totalitarian regime and surveillance.',
      pdf: null
    },
    {
      id: 4,
      title: 'Harry Potter and the Sorcerer\'s Stone',
      author: 'J.K. Rowling',
      cover: 'https://covers.openlibrary.org/b/id/7984916-L.jpg',
      category: 'Fantasy',
      description: 'The first book in the beloved wizarding series.',
      pdf: null
    },
    {
      id: 5,
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      cover: 'https://covers.openlibrary.org/b/id/6979861-L.jpg',
      category: 'Fantasy',
      description: 'A fantasy adventure preceding the Lord of the Rings trilogy.',
      pdf: null
    }
  ];
  let currentBooks = [...books];

  function saveBooks() {
    localStorage.setItem('books', JSON.stringify(books));
  }

  function renderBooks() {
    bookGallery.innerHTML = '';
    currentBooks.forEach(book => {
      const card = document.createElement('div');
      card.className = 'card';
      card.dataset.id = book.id;
      card.innerHTML = `
        <img src="${book.cover}" alt="${book.title}" />
        <h3>${book.title}</h3>
        <p>${book.author}</p>
        <div class="actions">
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </div>
      `;
      card.querySelector('img').addEventListener('click', () => showDetails(book.id));
      card.querySelector('h3').addEventListener('click', () => showDetails(book.id));
      card.querySelector('.edit-btn').addEventListener('click', e => {
        e.stopPropagation();
        openEditModal(book.id);
      });
      card.querySelector('.delete-btn').addEventListener('click', e => {
        e.stopPropagation();
        handleDelete(book.id);
      });
      bookGallery.appendChild(card);
    });
  }

  categoryInput.addEventListener('change', () => {
    if (categoryInput.value === '__add_new__') {
      const newCategory = prompt('Enter new category name:');
      if (newCategory && newCategory.trim()) {
        const trimmed = newCategory.trim();
        addCategoryToFilter(trimmed);
        const newOption = new Option(trimmed, trimmed);
        categoryInput.insertBefore(newOption, categoryInput.lastElementChild);
        categoryInput.value = trimmed;
      } else {
        categoryInput.value = '';
      }
    }
  });

  function addCategoryToFilter(categoryName) {
    const exists = Array.from(categoryFilter.options).some(opt => opt.value === categoryName);
    if (!exists) {
      const option = new Option(categoryName, categoryName);
      categoryFilter.appendChild(option);
    }
  }

  function showDetails(id) {
    const book = books.find(b => b.id === id);
    if (!book) return;
    detailsCover.src = book.cover;
    detailsTitle.textContent = book.title;
    detailsAuthor.textContent = book.author;
    detailsCategory.textContent = book.category;
    detailsDescription.textContent = book.description;
    downloadPdfBtn.style.display = book.pdf ? 'block' : 'none';
    if (book.pdf) {
      downloadPdfBtn.onclick = () => {
        const link = document.createElement('a');
        link.href = book.pdf;
        link.download = `${book.title}.pdf`;
        link.click();
      };
    }
    detailsModal.style.display = 'flex';
  }

  closeDetailsBtn.addEventListener('click', () => {
    detailsModal.style.display = 'none';
  });

  function openEditModal(id = null) {
    if (id) {
      const book = books.find(b => b.id === id);
      if (!book) return;
      bookIdInput.value = book.id;
      titleInput.value = book.title;
      authorInput.value = book.author;
      categoryInput.value = book.category;
      descriptionInput.value = book.description;
      fileInput.required = false;
    } else {
      bookIdInput.value = '';
      titleInput.value = '';
      authorInput.value = '';
      categoryInput.value = '';
      descriptionInput.value = '';
      fileInput.required = true;
    }
    editModal.style.display = 'flex';
  }

  cancelEditBtn.addEventListener('click', () => {
    editModal.style.display = 'none';
  });

  async function getFirstPageImage(file) {
    if (!window.pdfjsLib) {
      alert('PDF.js failed to load. Please check your internet connection.');
      return null;
    }
    const fileReader = new FileReader();
    return new Promise((resolve, reject) => {
      fileReader.onload = async function () {
        const typedarray = new Uint8Array(this.result);
        const loadingTask = pdfjsLib.getDocument({ data: typedarray });
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        await page.render({ canvasContext: context, viewport }).promise;
        const imageDataUrl = canvas.toDataURL();
        resolve(imageDataUrl);
      };
      fileReader.onerror = reject;
      fileReader.readAsArrayBuffer(file);
    });
  }

  function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  bookForm.addEventListener('submit', async e => {
    e.preventDefault();
    const id = bookIdInput.value;
    const file = fileInput.files[0];
    if (!id && (!file || file.type !== 'application/pdf')) {
      alert('Please upload a valid PDF file.');
      return;
    }
    const coverImage = file ? await getFirstPageImage(file) : books.find(b => b.id === parseInt(id))?.cover;
    if (!coverImage && file) return;
    const pdfData = file ? await readFileAsDataURL(file) : books.find(b => b.id === parseInt(id))?.pdf;
    const newBook = {
      id: id ? parseInt(id) : Date.now(),
      title: titleInput.value,
      author: authorInput.value,
      category: categoryInput.value,
      description: descriptionInput.value,
      cover: coverImage,
      pdf: pdfData
    };
    if (id) {
      const index = books.findIndex(b => b.id === parseInt(id));
      if (index !== -1) {
        books[index] = newBook;
      }
    } else {
      books.push(newBook);
    }
    saveBooks();
    currentBooks = [...books];
    renderBooks();
    editModal.style.display = 'none';
  });

  function handleDelete(id) {
    const pass = prompt('Enter master password to delete this book:');
    if (pass === masterPassword) {
      if (confirm('Are you sure you want to delete this book?')) {
        const index = books.findIndex(b => b.id === id);
        if (index > -1) {
          books.splice(index, 1);
          saveBooks();
          applyFilters();
          alert('Book deleted.');
        }
      }
    } else {
      alert('Incorrect password. Deletion cancelled.');
    }
  }

  function applyFilters() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const category = categoryFilter.value;
    currentBooks = books.filter(book => {
      const matchesSearch = 
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm);
      const matchesCategory = category === '' || book.category === category;
      return matchesSearch && matchesCategory;
    });
    renderBooks();
  }

  searchInput.addEventListener('input', applyFilters);
  categoryFilter.addEventListener('change', applyFilters);
  addBookBtn.addEventListener('click', () => openEditModal(null));
  renderBooks();
});