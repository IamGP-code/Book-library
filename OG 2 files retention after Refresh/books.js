/*
 * Changelog:
 * Version 1.0.0 (2025-05-18): Initial version with duplicates
 * Version 1.1.0 (2025-05-18): Removed duplicates, ensured unique IDs
 * Version 1.2.0 (2025-05-20): Added PDF storage
 */
const books = [
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