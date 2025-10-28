# Product Search Platform: Guide and Architecture

> _High performaing fuzzy-search interface for **5,995+ Healf** wellness products with advanced filtering._

[Architecture Diagram](./docs/architecture-diagram.png) • [Voiceover Demo](TODO) • [Live Demo](TODO)

---

## 📚 Table of contents

TODO: include contents

## 🚀 Quickstart

To start run the following commands in sequence to get this all loaded and ready, I have opted in for `pnpm` over `npm` for the performance gains it offers.

```shell
nvm use # this will look to the .nvrmc file and ensure your machine is running the same version of node this was created in.

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

### The Challenge / Problem statement

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

### Client-side searching vs server-side searching

**Decision:** Client-side searching with server-side data optimisation

**Why:**

- 5,955 products (TODO: add optimized size vs 50MB csv) fits comfortably in browser memory
- 0ms search latency vs higher latency with API calls
- Simpler architecture without API endpoints
- Better UX for frequent filtering

**Trade-offs:**

- Won't scale beyond ~50K products (could be even less).

**When to reconsider:**

- Dataset exceeds acceptable client-side product threshold, could be >50K products
- Real-time updates needed from data changes
