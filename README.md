# Fortune AI Trading System

Fortune AI Trading System is a comprehensive full-stack application designed for modern algorithmic trading development. It leverages the power of the Gemini API to assist in project scaffolding, strategy generation, and provides a suite of tools for backtesting and portfolio management, all powered by a Python FastAPI backend.

## Key Features

-   **AI Project Scaffolder**: Generate entire project folder and file structures from a single natural language prompt.
-   **AI Strategy Designer**: Describe a trading strategy (e.g., "RSI + Bollinger Bands"), and receive generated pseudo-code, Python code, or JSON parameters.
-   **Backtest Viewer**: Run backtests against historical data on the server and visualize performance, view an equity curve, and analyze key metrics.
-   **Portfolio Dashboard**: A central hub to view your holdings, asset allocation, and real-time trading signals.
-   **Broker Sync**: Simulate syncing with a live broker (Fyers) to fetch real-time portfolio holdings.

## Project Structure

The project is a monorepo containing both the frontend and backend.

```
/
├── backend/                # Python FastAPI Backend
│   ├── routes/
│   ├── services/
│   ├── core/
│   ├── data/
│   ├── main.py
│   ├── requirements.txt
│   └── .env.example
├── components/             # Reusable React components
├── config/                 # Frontend configuration (API endpoints)
├── pages/                  # Top-level page components
├── services/               # Frontend API interaction layer
├── types/                  # TypeScript type definitions
├── utils/                  # Frontend utility functions
├── App.tsx                 # Main application component
├── index.html              # The main HTML file
├── index.tsx               # The entry point of the React application
├── README.md               # This file
├── run_backend.sh          # Script to run the backend server
└── run_frontend.sh         # Script to run the frontend locally
```

## Setup and Running Locally

### 1. Prerequisites

-   Node.js and npm (or equivalent)
-   Python 3.8+ and `pip`

### 2. Backend Setup

First, set up and run the Python backend server.

1.  **Navigate to Backend**:
    ```bash
    cd backend
    ```
2.  **Create a Virtual Environment** (Recommended):
    ```bash
    python -m venv venv
    source venv/bin/activate  # On macOS/Linux
    # venv\Scripts\activate   # On Windows
    ```
3.  **Install Python Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```
4.  **Configure Environment Variables**:
    -   Create a `.env` file inside the `backend/` directory (`cp .env.example .env`).
    -   Open the `.env` file and add your `GEMINI_API_KEY`.
5.  **Run the Backend Server**:
    -   Navigate back to the project root directory.
    -   Make the script executable and run it:
    ```bash
    chmod +x run_backend.sh
    ./run_backend.sh
    ```
    The backend API will be running at `http://127.0.0.1:8000`.

### 3. Frontend Setup

With the backend running, you can now start the frontend.

1.  **Install Dependencies**: Open a new terminal in the project root and run:
    ```bash
    npm install
    ```
2.  **Run the Frontend Development Server**:
    ```bash
    # Ensure this script is executable
    chmod +x run_frontend.sh
    ./run_frontend.sh
    ```
    The frontend application will be available at `http://localhost:5173` (or similar).

## How to Use the Gemini Features

The application's AI capabilities are powered by a secure backend proxy to the Google Gemini API.

-   **Project Scaffolder**: Navigate to the "Project Scaffolder" tab, describe the desired structure, and click "Generate Structure".
-   **Strategy Designer**: Go to the "Strategy Designer" tab, describe a trading strategy, and click "Generate Strategy".

The frontend communicates with your local backend, which then securely calls the Gemini API. This ensures your API key is never exposed in the browser.
