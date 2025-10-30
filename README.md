# Product Search Platform: Guide and Architecture

> _High performaing fuzzy-search interface for **5,995+ Healf** wellness products with advanced filtering._

[🏗️ Architecture Diagram](./docs/architecture-diagram.png) • [🎤 Voiceover Demo](https://youtu.be/njQ3Ak2GyiQ) • [🌐 Live Demo](https://product-search-platform-eight.vercel.app/)

---

## 📚 Table of contents

- [Product Search Platform: Guide and Architecture](#product-search-platform-guide-and-architecture)
  - [📚 Table of contents](#-table-of-contents)
  - [🚀 Quickstart](#-quickstart)
  - [🎉 Features](#-features)
  - [💡 Problem Statement](#-problem-statement)
    - [User story](#user-story)
    - [The Challenge](#the-challenge)
    - [The Solution](#the-solution)
  - [🏗️ Architecture Decisions](#️-architecture-decisions)
    - [1. Client-side searching vs Server-side searching](#1-client-side-searching-vs-server-side-searching)
    - [2. Fuzzy search (Fuse.js) vs Exact matching](#2-fuzzy-search-fusejs-vs-exact-matching)
    - [3. Tag-Based Filtering vs Other Filter Types](#3-tag-based-filtering-vs-other-filter-types)
    - [4. Virtual Scrolling vs Pagination](#4-virtual-scrolling-vs-pagination)
    - [5. Data optimisation strategy](#5-data-optimisation-strategy)
    - [6. Frontend Virtualisation for Unlimited scrolling vs Pagination](#6-frontend-virtualisation-for-unlimited-scrolling-vs-pagination)
    - [7. TypeScript vs JavaScript](#7-typescript-vs-javascript)
    - [8. Other decisions](#8-other-decisions)
  - [🐞 Existing Bugs \& Broken windows](#-existing-bugs--broken-windows)
  - [👤 Author](#-author)

## 🚀 Quickstart

To start run the following commands in sequence to get this all loaded and ready, I have opted in for `pnpm` over `npm` for the performance gains it offers.

```shell
nvm use # this will look to the .nvrmc file and ensure your machine is running the same version of node this was created in. Node Version Manager required for this.

pnpm install # install the dependencies

pnpm dev # runs the code
```

After running these commands, navigate to [http://localhost:3000](http://localhost:3000).

## 🎉 Features

- **Fuzzy searching**: Instant results that appear in realtime.
- **Typo-tolerant** - "streess" finds "stress" products.
- **Responsive design**: For mobiles and laptops.

## 💡 Problem Statement

### User story

> As a **health-conscious customer**,  
> I want to quickly find wellness products that match my specific criteria,  
> so I can improve my wellbeing without spending hours researching.

### The Challenge

Healf's catalog contains **5,955+ wellness products** across multiple categories
(supplements, skincare, sleep aids, etc.). Customers need a way to:

- Find products by name, brand, or health benefit
- Filter by specific health goals (stress relief, sleep quality, etc.)
- Discover products even with typos or partial searches
- Navigate results quickly on any device

### The Solution

A high-performance search interface that understands natural language queries,
handles typos gracefully, and provides instant filtering by health goals and
product categories.

## 🏗️ Architecture Decisions

This section will include assumptions made for this task, including any key decisions that need to be recorded. As this is a take-home task, the ADR will not be comprehensive, but will provide enough context why certain decisions were made over others.

### 1. Client-side searching vs Server-side searching

**Decision:** Client-side searching with server-side data optimisation

**Why:**

- 5,955 products ~2.8MB vs 50MB csv fits comfortably in browser memory
- 0ms search latency vs higher latency with API calls
- Simpler architecture without API endpoints
- Better UX for frequent filtering

**Trade-offs:**

- ⚠️ Won't scale beyond ~50K products (could be even less).

**When to reconsider:**

- Dataset exceeds acceptable client-side product threshold, could be >50K products
- Real-time updates needed from data changes

---

### 2. Fuzzy search (Fuse.js) vs Exact matching

**Decision:** Fuzzy search using Fuse.js library

**Why:**

- Wellness products have complex names (e.g., "PharmaGABA-100", "Relora Plus")
- Users make typos ("streess" → "stress", "thorne" → "thorn")
- Partial matching improves discovery ("sleep" finds "Sleep Quality", "Improves sleep")
- Fuse.js is battle-tested with 19.7K+ GitHub stars

**Trade-offs:**

- ✅ Better UX - handles typos and partial matches
- ✅ More forgiving search experience
- ⚠️ ~15KB bundle size (acceptable for features gained) - Note: this bundle size was from a previous version, no public bundle size available for fuse.js 7.1.0 (latest)
- ⚠️ Potentially slightly slower than exact match (~35ms vs ~5ms)

**When to reconsider:**

- Dataset exceeds 100K products
- Bundle size becomes critical (<5KB target)

---

### 3. Tag-Based Filtering vs Other Filter Types

**Decision:** Prioritised multi-select tag-based filtering over sorting/price filters

**Why:**

- CSV contains rich tag taxonomy (health goals: "Mood support", "Sleep Quality", "Stress and Anxiety")
- Wellness products are goal-oriented (users search by need, not price)
- Tags naturally group by goals, categories, and product types
- Multi-select enables powerful filter combinations

**Trade-offs:**

- ✅ Leverages existing data structure
- ✅ Domain-appropriate for wellness products
- ⚠️ Other features deferred (sort by price, rating)
- ⚠️ Limiting Vendor, Category, and Goal tags to 10 of each - prioritised by the recurring values

**Alternatives considered:**

- **Sort by price/rating:** Useful but less critical for wellness discovery
- **Price range slider:** Nice-to-have, but tags provide more value
- **Autocomplete:** High development cost for incremental benefit

**Feature prioritization rationale:**
Given 16-20 hour time budget, tag filtering provides the highest value:

- Directly addresses user need (find products by health goal)
- Utilizes rich existing data (no additional API needed)
- Demonstrates complex state management
- Shows product-thinking (domain-aware)

---

### 4. Virtual Scrolling vs Pagination

**Decision:** Virtual scrolling for search results

**Why:**

- Search can return thousands of results (max 5,955)
- Pagination breaks search-as-you-type flow
- Virtual scrolling maintains performance with large result sets

**Trade-offs:**

- ✅ Smooth scrolling through thousands of results
- ✅ No "page" interruption in search flow
- ✅ Only renders ~20 visible items (low DOM size)
- ⚠️ More complex implementation than simple pagination

**When to reconsider:**

- Dataset small enough to render all (<100 results typically)
- Need SEO-friendly pagination URLs
- Infinite scroll preferred for UX reasons

---

### 5. Data optimisation strategy

**Decision:** Aggressive server-side payload reduction (50MB -> ~6MB): **Update**: `Confirmed reduction to ~2.34MB`.

**Why:**

- Raw CSV contains extensive metadata (Shopify internal fields, JSON blobs, full HTML)
- Most fields irrelevant for search (variants, metafields, admin IDs)
- Mobile users on slower connections need fast initial load

**Optimization approach:**

```typescript
// Extract only search-essential fields
{
  id: string;           // Unique identifier
  title: string;        // Product name (~50 chars)
  vendor: string;       // Brand (~20 chars)
  description: string;  // Truncated to 200 chars
  tags: string[];       // Max 8 relevant tags
  price: number;        // Single min price
  imageUrl: string;     // First image only
}
// Result: Much smaller data size per product
```

**Trade-offs:**

- ✅ Estiamted 90% size reduction (50MB → 6MB)
- ✅ Faster initial load
- ⚠️ Full product details not available in search

**Alternatives considered:**

- **Send full data:** Rejected - poor mobile experience
- **Lazy load products:** Rejected - defeats instant search purpose
- **Progressive loading:** Viable but adds complexity

**When to reconsider:**

- Need full product details in search results
- Implementing product detail pages (would fetch full data on demand)

---

### 6. Frontend Virtualisation for Unlimited scrolling vs Pagination

**Decision:** Use Frontend Virtualisation with unlimited scroll

**Why:**

- Dataset is an acceptable size to enable a nice smooth unlimited scroll.
- We need to virtualise the data so that not all items are rendered in the DOM, only visible items.

**Trade-offs:**

- ⚠️ Quite fiddly to work with, can mess up styling
- ✅ Improves performance with big datasets

---

### 7. TypeScript vs JavaScript

**Decision:** Full TypeScript implementation

**Why:**

- Type safety catches errors at compile time
- Better IDE autocomplete and refactoring
- Self-documenting code (types as inline docs)

**Trade-offs:**

- ✅ Fewer runtime errors
- ✅ Better maintainability

**Not really a trade-off:** TypeScript is standard for production Next.js apps in 2025.

---

### 8. Other decisions

- Using `husky` for pre-commit checks as this is trunk-based-development.
- Testing: Include tests for lower-level functions such as the product-loader within `/lib`. With a single E2E test for confidence.
- Using `swc/jest` over `ts-jest` for lightning-fast speeds on local tests.
- Initially intended to use **ShadCn** for everything, but quickly found that components such as `Card` did work optimally with the styling I was going for. Still using **ShadCn** for other components, just not the product cards as they need different styling.
- Using **LordIcon** icons using a license I pay for to create extra polish and a better UI/UX experience.
- Using **Framer Motion** for animation polish.
- Basic error boundary created.

## 🐞 Existing Bugs & Broken windows

- The current filters have been limited to 10 based on the number of associated products. The filter names have some remnants of incorrect names.
- Many images that have `image unavailable`, a default image would be better UI/UX.
-

## 👤 Author

**[Hassan Ali]**  
[GitHub](https://github.com/canhassancode) • [LinkedIn](https://linkedin.com/in/hassan-a-dev)

---

**Built for Healf's Technical Assessment** • October 2025
