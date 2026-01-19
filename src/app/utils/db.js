// src/app/utils/db.js
// IndexedDB utility for offline POS & Invoice system

const DB_NAME = 'PosInvoiceDB';
const DB_VERSION = 1;
const STORES = {
  PRODUCTS: 'products',
  CATEGORIES: 'categories',
  INVOICES: 'invoices',
  COMPANIES: 'companies'
};

let db = null;

// Initialize IndexedDB
export const initDB = () => {
  return new Promise((resolve, reject) => {
    if (db) {
      resolve(db);
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      console.error('Database failed to open');
      reject(request.error);
    };

    request.onsuccess = () => {
      db = request.result;
      console.log('Database opened successfully');
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      db = event.target.result;

      // Create products store
      if (!db.objectStoreNames.contains(STORES.PRODUCTS)) {
        const productsStore = db.createObjectStore(STORES.PRODUCTS, { keyPath: 'id', autoIncrement: true });
        productsStore.createIndex('name', 'name', { unique: false });
        productsStore.createIndex('category', 'category', { unique: false });
        productsStore.createIndex('price', 'price', { unique: false });
      }

      // Create categories store
      if (!db.objectStoreNames.contains(STORES.CATEGORIES)) {
        const categoriesStore = db.createObjectStore(STORES.CATEGORIES, { keyPath: 'id', autoIncrement: true });
        categoriesStore.createIndex('name', 'name', { unique: true });
      }

      // Create invoices store
      if (!db.objectStoreNames.contains(STORES.INVOICES)) {
        const invoicesStore = db.createObjectStore(STORES.INVOICES, { keyPath: 'id', autoIncrement: true });
        invoicesStore.createIndex('customer', 'customer', { unique: false });
        invoicesStore.createIndex('date', 'date', { unique: false });
      }

      // Create companies store
      if (!db.objectStoreNames.contains(STORES.COMPANIES)) {
        const companiesStore = db.createObjectStore(STORES.COMPANIES, { keyPath: 'id', autoIncrement: true });
        companiesStore.createIndex('name', 'name', { unique: false });
        companiesStore.createIndex('phone', 'phone', { unique: false });
      }

      console.log('Database setup complete');
    };
  });
};

// Generic functions for all stores
export const getAllData = async (storeName) => {
  await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readonly');
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.getAll();

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const addData = async (storeName, data) => {
  await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readwrite');
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.add(data);

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const updateData = async (storeName, data) => {
  await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readwrite');
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.put(data);

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const deleteData = async (storeName, id) => {
  await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readwrite');
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.delete(id);

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

// Specific functions for products
export const getAllProducts = () => getAllData(STORES.PRODUCTS);
export const addProduct = (product) => addData(STORES.PRODUCTS, product);
export const updateProduct = (product) => updateData(STORES.PRODUCTS, product);
export const deleteProduct = (id) => deleteData(STORES.PRODUCTS, id);

// Specific functions for categories
export const getAllCategories = () => getAllData(STORES.CATEGORIES);
export const addCategory = (category) => addData(STORES.CATEGORIES, category);
export const updateCategory = (category) => updateData(STORES.CATEGORIES, category);
export const deleteCategory = (id) => deleteData(STORES.CATEGORIES, id);

// Specific functions for invoices
export const getAllInvoices = () => getAllData(STORES.INVOICES);
export const addInvoice = (invoice) => addData(STORES.INVOICES, invoice);
export const updateInvoice = (invoice) => updateData(STORES.INVOICES, invoice);
export const deleteInvoice = (id) => deleteData(STORES.INVOICES, id);

// Specific functions for companies
export const getAllCompanies = () => getAllData(STORES.COMPANIES);
export const addCompany = (company) => addData(STORES.COMPANIES, company);
export const updateCompany = (company) => updateData(STORES.COMPANIES, company);
export const deleteCompany = (id) => deleteData(STORES.COMPANIES, id);

// Clear all data
export const clearAllData = async () => {
  await initDB();
  const transaction = db.transaction(Object.values(STORES), 'readwrite');

  return Promise.all(
    Object.values(STORES).map(storeName => {
      return new Promise((resolve, reject) => {
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.clear();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    })
  );
};