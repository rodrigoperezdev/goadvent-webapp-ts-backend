# GoAdvent WebApp

This backend provides the necessary infrastructure to **manage the booking of travel destinations and activities**. Designed to handle **users, reservations, payments, and real-time availability**, it allows travelers to explore, plan, and secure their experiences **easily and efficiently**.

This service is the **core** of the booking ecosystem, ensuring a **secure and efficient data flow** for customers and administrators.

Built with **Yarn**, **Node.js**, **Express**, **TypeScript**, and **MongoDB**.

---

## Prerequisites

Before you begin, make sure you have the following installed:

- **[Node.js](https://nodejs.org/)** (Latest LTS version recommended)
- **[Yarn](https://yarnpkg.com/)** (Package manager for dependencies)

  Install Yarn globally using:

  ```sh
  npm install -g yarn
  ```

---

## Installation

1️. **Clone the repository**

```sh
git clone https://github.com/rodrigoperezdev/goadvent-webapp-ts-backend.git
cd goadvent-webapp-ts-backend
```

2️. **Install dependencies**

```sh
yarn install
```

3. **Run the development server**
   ```sh
   yarn dev
   ```

---

## 🏗 Models

The models are located in the `/src/models` directory and define the database structure using **Mongoose**.

### Available Models:

- **`destination.model.ts`** → Defines the schema for travel destinations, including name, location, description, and images.
- **`review.model.ts`** → Defines user reviews for destinations, including rating, comment, and user reference.
- **`faq.model.ts`** → Defines frequently asked questions (FAQs).

Each model is used in controllers and routes to handle database interactions efficiently.

---

## About the Project

This is a **portfolio project** developed by **Rodrigo Pérez** to demonstrate **backend development skills**.  
It includes **API design, database management, authentication, and booking systems**.

---

## 📬 Contact

**Email**: [rodrigoperezdev@gmail.com](mailto:rodrigoperezdev@gmail.com)  
**LinkedIn**: [linkedin.com/in/rpdev/](https://www.linkedin.com/in/rpdev/)  
**GitHub**: [github.com/rodrigoperezdev](https://github.com/rodrigoperezdev)

---
