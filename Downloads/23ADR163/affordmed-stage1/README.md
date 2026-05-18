# AffordMed — Notifications Dashboard (Stage 1)

This is a beginner-friendly React application built for the AffordMed Campus Hiring Evaluation — Stage 1.
It lists notifications fetched from the provided API and includes filtering, searching, pagination, modern UI, and graceful error handling.

Tech stack
- React.js
- Material UI
- Axios

Getting started

1. Install dependencies
```bash
npm install
npm install axios
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
```

2. Run the dev server
```bash
npm start
```

3. Build for production
```bash
npm run build
```

Project structure

src/
  components/
    Header.js
    NotificationCard.js
    DashboardStats.js
    SearchBar.js
    FilterBar.js
    PaginationBar.js
    LoadingSkeleton.js
    EmptyState.js
    Footer.js
    ScrollTopButton.js
  services/
    api.js
  App.js
  index.js
  styles.css

API notes
- The app fetches notifications from `http://20.244.56.144/evaluation-service/notifications` using Axios.
- If the API is unreachable (network/CORS), the app falls back to a small set of mock notifications so the UI remains usable and for demonstration.
 - The header includes a **Mock/Live** switch — toggle it to force using built-in mock data for demos or testing. The choice is remembered in `localStorage`.

Pagination logic
- Pagination is implemented client-side. `pageSize` is set to 6 items per page.
- `totalPages` is computed from the filtered results and the current `page` is clamped to valid bounds.

Search functionality
- The search bar filters notifications by matching the search text against the `title` and `message` fields (case-insensitive).

Material UI usage
- The project uses Material UI components (AppBar, Grid, Card, Chip, Pagination, Skeleton, etc.) for a modern look and responsive layout.

Git push example
```bash
git init
git add .
git commit -m "Add AffordMed notifications frontend (stage 1)"
git remote add origin https://github.com/yourusername/affordmed-stage1.git
git branch -M main
git push -u origin main
```

If you want, I can commit and push changes for you (if you provide the remote) or run the dev server and verify locally.
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
