# Zeller React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Notes

1. All components are placed in `Components` folder along with test files
2. Create `.env` file in the root directory and add `REACT_APP_API_KEY=<API_KEY>`. Please replace <API_KEY> with the actual API key provided to me.
3. By default "Admin" radio button is checked

## Approach

I built the App component with a focus on clear state management, type safety, and reusable UI components. The app initializes a GraphQL client once using useMemo and fetches customer data through a useEffect that calls the ListZellerCustomers query. The response filtered by role using useMemo for performance, and handled with proper loading and error states.

For the UI, I created two reusable components:

RadioButton – a controlled input component that updates the selected user role (admin or manager) through handleClick, providing a clean and accessible toggle for filtering users.

Card – a presentational component that displays each customer’s name, initial and role in a consistent, styled format.

Together, these components keep the App component lean, maintainable, and easy to test, emphasizing separation of concerns and performance through memoization.

## Available Scripts

In the project directory, you can run:

### `npm install`

Setup the project

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
Note: Press `a` to run all test.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run coverage`

To generate a code coverage report

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
