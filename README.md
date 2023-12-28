### Youth Commission

This is then front end for the Youth Commission RESTful API. This allows you to do POST, GET, DELETE requests with the various endpoints provided.

You can find the hosted version here: https://sweet-faun-6e71d9.netlify.app/

You can find the files here: https://github.com/Scodia619/Cheshire-youth-fe

This is developed with a mix of mobile and non-mobile CSS. The Home Page and Post Report pages are designed for mobile screens as that will be the majority of the traffic. The Admin Panel and components are focused on non-mobile as its all data that should be entered by someone at the office.

### Running Locally

Run the command:

$ git clone https://github.com/Scodia619/Cheshire-youth-fe

Then run:

$ npm install

This should have installed the following packages:

    "dependencies": {
    "axios": "^1.6.2",
    "bootstrap": "^5.3.2",
    "jspdf": "^2.5.1",
    "react": "^18.2.0",
    "react-bootstrap": "^2.9.2",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.21.0",
    "react-toastify": "^9.1.3"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.1",
    "eslint": "^8.55.0",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "vite": "^5.0.8"
  }

Then once this has been completed run:

$ npm run dev

If this is succesfull it should run on port: 5173