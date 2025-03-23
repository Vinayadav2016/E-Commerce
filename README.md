# E-commerce Frontend (React, Tailwind, Redux)

This project is a feature-rich e-commerce frontend application built with React, Tailwind CSS, and Redux for state management. It provides a seamless shopping experience with various functionalities, including product browsing, user authentication, and order management.

## About

This project demonstrates a modern e-commerce frontend architecture, focusing on performance, user experience, and maintainability. It utilizes React for building dynamic UIs, Tailwind CSS for rapid styling, and Redux for centralized state management.

## Features

* **Product Browsing:**
    * Latest arrivals and collections showcased in an infinite loop carousel on the home page.
    * Category filtering and sort by options, along with infinite scroll data fetching on the collection page.
    * Detailed product page with image carousel, product information, reviews, and related products.
* **User Authentication:**
    * User login and logout functionality.
    * Protected routes for logged-in users (place order, order details).
* **Shopping Cart and Wishlist:**
    * Add and remove products from the cart and wishlist.
    * Cart page with product details and quantity management.
* **Order Management:**
    * Place order page (accessible only when logged in).
    * Order details page (accessible only when logged in).
* **Responsive Design:**
    * Optimized for various screen sizes.
* **Smooth Animations:**
    * Beautiful animations throughout the application to enhance user experience.
* **Robust Error Handling:**
    * Implemented `ErrorBoundary` components to catch and handle errors gracefully.


## Technologies Used

* **React:** For building the user interface.
* **Tailwind CSS:** For rapid and responsive styling.
* **Redux:** For centralized state management.
* **React Router:** For navigation.
* **Axios/Fetch:** For API calls.
* **React-Icons:** for icons.

## Usage

* **Browse Products:** Navigate through the home, collection, and product pages to explore products.
* **User Authentication:** Log in or create an account to access protected features.
* **Shopping Cart and Wishlist:** Add products to the cart or wishlist.
* **Place Orders:** Logged-in users can place orders and view order details.
* **Filtering and Sorting:** Use category filters and sorting options on the collection page to refine product listings.

## State Management (Redux)

Redux is used for centralized state management, ensuring predictable state updates and efficient data flow throughout the application. Actions, reducers, and selectors are used to manage product data, user authentication, and cart/wishlist state.

## API Integration

The application integrates with a backend API to fetch product data and handle user authentication. Axios or Fetch is used to make API calls, and data is managed using Redux.

## Pages

* **Home Page:** Showcases latest arrivals and collections in an infinite loop carousel.
* **Collection Page:** Displays products with category filters, sort by options, and infinite scroll data fetching.
* **Product Page:** Provides detailed product information, reviews, and related products in an image carousel format.
* **Wishlist Page:** Displays the user's saved wishlist items.
* **Cart Page:** Manages the user's shopping cart.
* **Place Order Page (Protected):** Allows logged-in users to place orders.
* **Order Details Page (Protected):** Displays order details for logged-in users.

## Animations

The application incorporates beautiful animations to enhance the user experience, including:

* **Carousel animations:** Smooth transitions between carousel items.
* **Loading animations:** Visual feedback during data fetching.
* **Transition animations:** Smooth transitions between pages and components.
* **Interactive animations:** Animations on user interactions.

## Error Handling (ErrorBoundary)

`ErrorBoundary` components are implemented to catch JavaScript errors anywhere in the component tree, log those errors, and display a fallback UI instead of the component tree that crashed. This ensures a more robust and user-friendly experience by preventing the entire application from crashing due to a single component error.
