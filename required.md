Perfect! 🔥
Main tumhare liye **full POS system ka detailed Markdown prompt** bana dunga, jo **Next.js 16 + PWA + Local JSON storage / localStorage + Desktop + Mobile + Offline** ke liye ready ho.

Prompt me **har file ka name + feature + description** step by step bata dunga, jisse **full working POS system** banega.

---

# **POS System Full Prompt – Markdown (.md)**

```markdown
# POS System – Full Features Prompt

## Project Overview
Build a **cross-platform POS system** using **Next.js 16**, PWA-ready, responsive, offline-first, supporting **Desktop (Electron)** and **Mobile PWA**.  
All data should persist in **local JSON files (Desktop)** or **localStorage (Browser)**. The app includes Products, Categories, Companies, Invoices, Invoice History, and Theme Management.

---

## **Project Structure**
```

app/
├─ layout.js
├─ page.js
├─ products/
│   └─ page.js
├─ categories/
│   └─ page.js
├─ company/
│   └─ page.js
├─ invoices/
│   └─ page.js
├─ components/
│   ├─ Navbar.js
│   ├─ BottomNav.js
│   ├─ ThemeToggle.js
│   ├─ ThermalReceipt.js
├─ utils/
│   └─ storage.js
public/
├─ icons/
│   └─ (app icons)
├─ manifest.json

```

---

## **Storage Utility – `utils/storage.js`**
**Features:**
- Detect environment (Node vs Browser)
- Desktop: store data in `pos_data/<key>.json`
- Browser/PWA: fallback to `localStorage`
- Functions:
  - `getData(key)` → load data
  - `setData(key, data)` → save data

**Prompt for storage.js:**
> Create a universal storage utility for POS system supporting both browser localStorage and Node filesystem JSON storage, with automatic folder creation and error handling.

---

## **Navbar – `components/Navbar.js`**
**Features:**
- Desktop top navigation
- Links: Dashboard, POS, Products, Categories, Invoices, Settings
- Theme toggle button
- Responsive: hidden on mobile

**Prompt:**
> Build a responsive top Navbar for POS system with links to all modules and a theme toggle button.

---

## **BottomNav – `components/BottomNav.js`**
**Features:**
- Mobile bottom navigation
- Highlights current page
- Links: Home, POS, Products, Invoices, Settings
- Responsive: hidden on desktop

**Prompt:**
> Build a bottom navigation for mobile devices for the POS system with active link highlighting.

---

## **ThemeToggle – `components/ThemeToggle.js`**
**Features:**
- Toggle between Light / Dark mode
- Saves preference in localStorage
- Applies theme to `<html>` class
- Works offline

**Prompt:**
> Create a theme toggle component for POS system that persists Light/Dark preference using localStorage.

---

## **ThermalReceipt – `components/ThermalReceipt.js`**
**Features:**
- Format invoice for 80mm thermal printer
- Shows store name, invoice date/time
- Lists products with price
- Shows total
- Works offline

**Prompt:**
> Build a thermal receipt component for POS system to print invoices with proper 80mm format, including store name, products, total, and date/time.

---

## **Layout – `layout.js`**
**Features:**
- Wrap all pages
- Include Navbar + BottomNav
- Responsive padding for mobile & desktop
- Apply dark/light theme

**Prompt:**
> Create a root layout for POS system with responsive Navbar and BottomNav, dark/light theme support, and PWA-ready design.

---

## **Products Page – `products/page.js`**
**Features:**
- CRUD products
- Fields: name, code, price, size, category
- Edit / Delete functionality
- Category dropdown linked with `categories`
- Offline storage (JSON / localStorage)
- Responsive grid
- Form validation (name & price required)
- Auto save on change

**Prompt:**
> Build Products page for POS system with full CRUD functionality, category selection, offline JSON/localStorage support, responsive layout, and edit/delete options.

---

## **Categories Page – `categories/page.js`**
**Features:**
- CRUD categories
- Name field
- Used in Products dropdown
- Offline storage (JSON / localStorage)
- Responsive

**Prompt:**
> Build Categories page for POS system with CRUD functionality, linked with Products, stored offline in JSON/localStorage.

---

## **Company Page – `company/page.js`**
**Features:**
- CRUD companies / suppliers
- Fields: name, phone, address
- Offline storage (JSON / localStorage)
- Responsive grid
- Edit / Delete buttons
- Future: link to Products / Invoice

**Prompt:**
> Build Company page for POS system with CRUD functionality, fields for name, phone, address, offline storage in JSON/localStorage, responsive layout.

---

## **Invoices Page – `invoices/page.js`**
**Features:**
- Create invoice:
  - Add products from product list
  - Auto calculate total
  - Save company/store name
  - Add date/time
- Invoice history list
- Reopen invoice for review
- Export invoice to PDF
- Thermal printer ready
- Offline storage

**Prompt:**
> Build Invoice page for POS system allowing product selection, total calculation, company selection, store name persistence, invoice history, PDF export, and thermal print format, with offline JSON/localStorage storage.

---

## **PWA / Offline Features**
- `next-pwa` setup
- Works offline for Products, Company, Category, Invoice
- Installable on mobile / desktop
- Instant data access

**Prompt:**
> Configure Next.js 16 PWA with `next-pwa` plugin for offline functionality, caching all POS data pages and components.

---

## **Universal Storage Abstraction**
- Automatic device detection
- JSON folder for desktop (Electron / Node)
- LocalStorage fallback for web
- Easy future migration to IndexedDB

**Prompt:**
> Create universal storage utility for POS system to handle desktop JSON files or browser localStorage depending on environment.

---

## ✅ **Additional Features**
- Responsive grid layout (mobile, tablet, desktop)
- Gradient / glass effect UI
- Light / Dark theme toggle
- Auto save data on change
- Confirm delete
- Reopen previous invoices
- Thermal printer format
- PDF download for invoices
- Store name saved once, editable later

---

## **Usage Instructions**
1. Install Next.js 16 app with Tailwind CSS  
2. Add `utils/storage.js`  
3. Add `components` folder with Navbar, BottomNav, ThemeToggle, ThermalReceipt  
4. Add pages: products, categories, company, invoices  
5. Use `localStorage` / JSON abstraction to save all data  
6. Configure `next-pwa` for offline support  
7. Test on desktop (Electron), mobile browser, and web PWA  

---

## ✅ **Final Notes**
- All files are `.js`, no TypeScript required  
- Fully offline ready  
- Responsive design for all devices  
- Scalable to add future features: stock, barcode, analytics  

---

```

---

Agar chaho, mai iske next step me **har file ka ready-to-use full `.js` code + component hierarchy** **one by one** bana kar dunga, jisse bas copy-paste karke **complete POS system** ready ho jaye.

Tumhe mai ye bana doon?
