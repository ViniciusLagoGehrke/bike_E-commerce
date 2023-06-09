# Bicycle e-commerce

![Desktop Preview](desktop-preview.jpg)

## What does it do?

- [x] As a customer I want to be able to select products from the drop down list.

- [x] As a customer I would like to be able to determine the quantity of the product before I add it to the shopping cart.

- [x] As a customer I would like to be informed when I exceed the maximum number of products and be prevented from entering more than this number

- [x] As a customer I want to be able to see all my products in the shopping cart

- [x] As a customer I want to be able to see the unit price in my shopping cart.

- [x] There is a value "taxRate" that calculate the gross price for each product.

- [x] As a customer I want to be able to see the total of the shopping cart at any time

- [x] As a customer I want to be able to remove products from the shopping cart either one by one or by all at one by pressing the "clear Cart" button.

- [x] It's not allowed to add more than 10 different product types in the shopping cart.

- [x] As a customer I want to be able to see a visual representation of how many product types I can still add in a progress bar on the bottom.

- [x] As a customer I want to see a graphical overlay when I confirm the purchase to know that my order was successful

- [x] It is not allowed to add a quantity of items to the shopping cart that exceeds the "**maxAmount**" of the respective product.

- [x] As a customer I want to be able to select the quantity of products with a slider

## What is inside?

This project uses many tools like:

- [Vite](https://vitejs.dev)
- [ReactJS](https://reactjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Vitest](https://vitest.dev)
- [Testing Library](https://testing-library.com)
- [Tailwindcss](https://tailwindcss.com)
- [Eslint](https://eslint.org)
- [Prettier](https://prettier.io)
- [Docker](https://www.docker.com/)

## Getting Started

For this project I used Node.js v19.7.0.
Alternatively you can run a container with the project in development mode using [Docker](https://docs.docker.com/)

### Install

Clone this project

```bash
git clone https://github.com/ViniciusLagoGehrke/bike_E-commerce.git
```

Access the project directory.

```bash
cd bike_E-commerce
```

#### Running on your machine

Make sure you are using the same Node version.

```bash
node -v
```

Install dependencies. (I suggest using PNPM)

```bash
pnpm install
```

Serve with hot reload at <http://localhost:5173>.

```bash
pnpm run dev
```

#### Using Docker

Build a image from the dockerfile

```bash
docker build -t vite-image .
```

Check if the image was created (optional)

```bash
docker images
```

Create a container from the image

```bash
docker run -it --name vite-react -p 8000:8000 --mount type=bind,source=$(pwd),target=/srv/app vite-image
```

Check if the container is running (optional)

```bash
docker ps
```

Access the command line inside the container

```bash
docker exec -it vite-react sh
```

Install the dependencies and run the app

```bash
yarn && yarn dev
```

Open your browser at *http://localhost:8000/*
You can edit the app and it will update on the browser

Whenever you want to stop the app just stop the container

```bash
docker stop vite-react
```

### Lint

```bash
pnpm run lint
```

### Typecheck

```bash
pnpm run typecheck
```

### Build

```bash
pnpm run build
```

### Test

```bash
pnpm run test
```

View and interact with your tests via UI. (Awesone vitest feature!)

```bash
pnpm run test:ui
```

## Deployment

I deployed this project in Vercel where you can Log in with GitHub, GitLab, Bitbucket, or email to deploy websites for free with zero configuration, automatic SSL, and global CDN.

You can check it live here: [Bike E-Commerce](bike-e-commerce.vercel.app/)

[OnPortfolio](https://front-end-portfolio.vercel.app/)
