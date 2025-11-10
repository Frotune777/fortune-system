# Fortune AI Trading System - Backend

This directory contains the Python backend for the Fortune AI Trading System, built with FastAPI. It provides a robust, modular, and scalable API to support the frontend application.

## Core Features

-   **RESTful API**: Clean, standard-based endpoints for all frontend functionalities.
-   **Gemini API Proxy**: A secure endpoint to proxy requests to the Google Gemini API, keeping your API key safe on the server.
-   **Live Broker Integration**: Connects to the Fyers API to fetch live portfolio holdings.
-   **Data Service**: Serves historical market data (mocked from a CSV for now).
-   **Signal Generation**: Implements trading strategies (e.g., RSI + Bollinger Bands, Mean Reversion) to generate live signals.
-   **Backtesting Engine**: A simple simulation engine to test strategies against historical data and return performance metrics.
-   **Database Integration**: Uses SQLite with SQLAlchemy to persist all backtest runs and their associated trades. The models are defined in `core/models.py`.
-   **Modular Architecture**: Code is organized into `routes`, `services`, and `core` for maintainability.

## Folder Structure

```
/
├── main.py                    # FastAPI entrypoint
├── routes/                    # API route definitions
├── core/                      # Config, database, core models
├── services/                  # Business logic (strategies, backtesting, Fyers)
├── data/                      # Sample data and logs
├── .env.example               # Example environment file
├── requirements.txt           # Python dependencies
└── README.md                  # This file
```

## Setup and Running Locally

Follow these steps to get the backend server running on your local machine.

### 1. Prerequisites

-   Python 3.8+
-   `pip` (Python package installer)

### 2. Create a Virtual Environment (Recommended)

```bash
# Create a virtual environment
python -m venv venv

# Activate it
# On Windows:
# venv\Scripts\activate
# On macOS/Linux:
# source venv/bin/activate
```

### 3. Install Dependencies

Install all the required Python libraries from the `requirements.txt` file.

```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables

The application uses a `.env` file to manage secret keys.

-   Create a new file named `.env` in the `backend/` directory.
-   Open the `.env` file and add your secret keys. You can use `.env.example` as a template.

    ```
    # .env file
    GEMINI_API_KEY="YOUR_GOOGLE_GEMINI_API_KEY"

    # Fyers API Credentials
    FYERS_APP_ID="YOUR_FYERS_APP_ID"
    FYERS_SECRET_KEY="YOUR_FYERS_SECRET_KEY"
    FYERS_ACCESS_TOKEN="YOUR_GENERATED_FYERS_ACCESS_TOKEN"
    ```

### 5. Run the Development Server

Use `uvicorn` to run the FastAPI application. The `--reload` flag will automatically restart the server when you make code changes.

```bash
uvicorn main:app --reload
```

The server will start, and you can access the API at `http://127.0.0.1:8000`.

You can also view the interactive API documentation (provided by Swagger UI) at `http://127.0.0.1:8000/docs`.

## Database

The application uses a SQLite database (`trading_system.db`) which is automatically created in the `backend/` directory when the server starts for the first time.

The database contains two main tables:

-   `backtest_runs`: Stores a summary and performance metrics for each backtest executed.
-   `trade_logs`: Stores every individual trade generated during a backtest, linked to its parent `backtest_run`.

This allows for historical analysis and review of past strategy performance.
