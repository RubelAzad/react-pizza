# react-pizza
# Instruction for running the project
- npm i or npm install
- npm run dev
- run the project: http://localhost:5173


# Project Requirements from the business

1. Very simple application, where users can order one or more pizzas from a menu
2. Requires no user accounts and no login: users just input their name before user the app
3. the pizza menu can change, so it should be loaded from an API
4. Users can add multiple pizzas to a cart before ordering
5. Ordering requires just the the user name, phone number, and address
6. if possible, GPS location should also be provided to make delivery easier
7. User's can mark their order as priority for an additional 20% of the cart price.
8. Orders are made by sending a POST request with the order data of the api
9. Each order will get a unique ID that should be displayed, so the user can later look up their order based on the ID
10. Users Should be able to mark their order as priority order after it has been placed.