// src/app/utils/useIndexedDB.js
// Custom hook for IndexedDB operations

import { useState, useEffect } from 'react';
import {
  initDB,
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  getAllInvoices,
  addInvoice,
  updateInvoice,
  deleteInvoice,
  getAllCompanies,
  addCompany,
  updateCompany,
  deleteCompany
} from './db';

export const useIndexedDB = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    initDB().catch(err => setError(err.message));
  }, []);

  // Products
  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const products = await getAllProducts();
      setLoading(false);
      return products;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return [];
    }
  };

  const saveProduct = async (product) => {
    setLoading(true);
    setError(null);
    try {
      if (product.id) {
        await updateProduct(product);
      } else {
        await addProduct(product);
      }
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const removeProduct = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteProduct(id);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  // Categories
  const loadCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const categories = await getAllCategories();
      setLoading(false);
      return categories;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return [];
    }
  };

  const saveCategory = async (category) => {
    setLoading(true);
    setError(null);
    try {
      if (category.id) {
        await updateCategory(category);
      } else {
        await addCategory(category);
      }
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const removeCategory = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteCategory(id);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  // Invoices
  const loadInvoices = async () => {
    setLoading(true);
    setError(null);
    try {
      const invoices = await getAllInvoices();
      setLoading(false);
      return invoices;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return [];
    }
  };

  const saveInvoice = async (invoice) => {
    setLoading(true);
    setError(null);
    try {
      if (invoice.id) {
        await updateInvoice(invoice);
      } else {
        await addInvoice(invoice);
      }
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const removeInvoice = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteInvoice(id);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  // Companies
  const loadCompanies = async () => {
    setLoading(true);
    setError(null);
    try {
      const companies = await getAllCompanies();
      setLoading(false);
      return companies;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return [];
    }
  };

  const saveCompany = async (company) => {
    setLoading(true);
    setError(null);
    try {
      if (company.id) {
        await updateCompany(company);
      } else {
        await addCompany(company);
      }
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const removeCompany = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteCompany(id);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return {
    loading,
    error,
    loadProducts,
    saveProduct,
    removeProduct,
    loadCategories,
    saveCategory,
    removeCategory,
    loadInvoices,
    saveInvoice,
    removeInvoice,
    loadCompanies,
    saveCompany,
    removeCompany
  };
};