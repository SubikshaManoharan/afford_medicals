# Average Calculator Microservice

This project is an Average Calculator microservice that exposes a REST API to handle requests for qualified number IDs. It fetches numbers from a third-party server and calculates the average of stored unique numbers while adhering to a specified window size.

## Project Structure

```
average-calculator-service
├── src
│   ├── app.js                  # Entry point of the application
│   ├── routes
│   │   └── numbers.js          # Route handler for the "numbers/{numberid}" endpoint
│   ├── controllers
│   │   └── numbersController.js # Logic for handling number requests
│   ├── services
│   │   └── thirdPartyService.js # Functions to interact with third-party APIs
│   ├── utils
│   │   └── averageCalculator.js  # Utility to calculate the average of numbers
│   └── middlewares
│       └── errorHandler.js      # Middleware for error handling
├── package.json                 # npm configuration file
├── .env                         # Environment variables
└── README.md                    # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd average-calculator-service
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and set the required environment variables:
   ```
   PORT=5000
   BASE_URL=<third-party-api-url>
   ```

5. Start the server:
   ```
   npm start
   ```

## API Usage

### Get Numbers

- **Endpoint:** `GET /numbers/{numberid}`
- **Description:** Fetches numbers based on the qualified number ID and calculates the average of unique numbers.
- **Parameters:**
  - `numberid`: The ID of the number type (e.g., prime, Fibonacci, even, random).

### Example Request

```
GET /numbers/prime
```

### Example Response

```json
{
  "average": 5.5,
  "numbers": [2, 3, 5, 7, 11]
}
```

## License

This project is licensed under the MIT License.