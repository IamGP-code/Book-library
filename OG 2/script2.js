import { uploadPDFAndGetURL } from './firebase-upload.js';


document.addEventListener('DOMContentLoaded', () => {
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
  let currentBooks = [...books];


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
    
    detailsDownloadBtn.href = book.pdfUrl;
    const book = books.find(b => b.id === id);
    if (!book) return;
    detailsCover.src = book.cover;
    detailsTitle.textContent = book.title;
    detailsAuthor.textContent = book.author;
    detailsCategory.textContent = book.category;
    detailsDescription.textContent = book.description;
    detailsDownloadBtn.style.display = book.pdfUrl ? 'inline-block' : 'none';
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
    } else {
      bookIdInput.value = '';
      titleInput.value = '';
      authorInput.value = '';
      categoryInput.value = '';
      descriptionInput.value = '';
    }
    editModal.style.display = 'flex';
  }

  cancelEditBtn.addEventListener('click', () => {
    editModal.style.display = 'none';
  });

  async function getFirstPageImage(file) {
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

  bookForm.addEventListener('submit', async e => {
    e.preventDefault();
    const id = bookIdInput.value;
    const file = fileInput.files[0];
    if (!file || file.type !== 'application/pdf') {
      alert('Please upload a valid PDF file.');
      return;
    }
   const coverImage = await getFirstPageImage(file);
const pdfURL = await uploadPDFAndGetURL(file);

const newBook = {
  id: id ? parseInt(id) : Date.now(),
  title: titleInput.value,
  author: authorInput.value,
  category: categoryInput.value,
  description: descriptionInput.value,
  cover: coverImage,
  pdfUrl: pdfURL  // 🔥 New field
};

    if (id) {
      const index = books.findIndex(b => b.id === parseInt(id));
      if (index !== -1) {
        books[index] = newBook;
      }
    } else {
      books.push(newBook);
    }
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