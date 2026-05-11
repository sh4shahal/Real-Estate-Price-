# Real Estate Price Prediction System

An AI-powered real estate platform that predicts property market values from user inputs, delivers instant price estimates using trained machine learning models, and automatically syncs predicted prices into a live Performance Analytics dashboard.

---

## 📌 Overview

This project is a full-stack intelligent real estate valuation system designed to provide instant, AI-driven property price predictions.

Users enter property details — location, type, size, condition, and more — through a modern interactive frontend. The backend processes the input using trained machine learning models and returns an **Estimated Market Value**. The predicted price is automatically synced to the **Performance Analytics** dashboard, updating the **Avg. Property Value** column in real time without any manual step.

The project combines **Machine Learning**, **Django REST APIs**, **React JS**, and **real-time state synchronization** into a single end-to-end real estate intelligence solution.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| Property Price Prediction | Predicts market value based on property details |
| Auto-Sync Analytics | Predicted price instantly updates Performance Analytics table |
| AI-Powered Valuation | Uses trained ML models for accurate price estimation |
| Confidence-Based Estimation | Returns estimated value with market-grounded calculations |
| Interactive Form UI | Modern property valuation form with sliders and dropdowns |
| JWT Authentication | Secure login and protected prediction APIs |
| Prediction History | Stores all previous user property valuations |
| Real-Time Dashboard | Live Avg. Property Value column updates on every prediction |
| Responsive UI | Mobile-friendly modern frontend design |
| Error Fallback System | Handles API failures gracefully with user feedback |

---

## 🧠 System Workflow

1. User enters property details in the valuation form
2. Frontend sends a POST request to the Django backend API
3. Backend preprocesses the input features
4. ML model predicts the estimated market value
5. Predicted price is returned to the frontend
6. Price is automatically synced to the Performance Analytics table
7. The matching **Avg. Property Value** row updates instantly
8. Prediction result is stored in the database for history

---

## 🛠 Tech Stack

### Frontend

| Technology | Usage |
|---|---|
| React JS | Frontend UI development |
| React Context API | Real-time price sync between components |
| Tailwind CSS / Inline Styles | Responsive modern styling |
| Axios | API communication with Django backend |
| React Router DOM | Frontend page routing |
| Vite | Frontend build tool and dev server |

### Backend

| Technology | Usage |
|---|---|
| Django | Backend web framework |
| Django REST Framework | REST API development |
| Simple JWT | Authentication system |
| SQLite | Local database storage |
| Python | Backend programming language |

### AI / ML Technologies

| Technology | Usage |
|---|---|
| Scikit-learn | Property price prediction model |
| Pandas & NumPy | Data preprocessing and feature engineering |
| Joblib | Model serialization and loading |
| Feature Engineering | Location, type, size, condition encoding |

---

## 🔐 Authentication System

The project uses **JWT-based authentication** with secure token handling.

**Implemented Features**
- User Signup and Login
- Access Token and Refresh Token generation
- Protected prediction APIs using authentication middleware
- User-specific prediction history access

---

## 🧠 Machine Learning Prediction Layer

The ML prediction layer estimates property market value from user-provided features.

### Workflow

**Feature Engineering**
The system encodes categorical inputs (location, property type, condition) and combines them with numerical features (square footage, year built, bathrooms, floors).

**Price Regression**
The encoded feature vector is passed through a trained regression model to output the predicted market price.

**Market Calibration**
Predictions are calibrated against real market data to ensure realistic value ranges across locations and property types.

---

## 🔄 Real-Time Price Sync Architecture

The auto-sync system is the core innovation of this project's frontend architecture.

### How It Works

```
PricePredictionForm
  └── User clicks "Predict Value"
        └── Calls Django /api/predict/
              └── Gets estimated_value back
                    └── syncToAnalytics(emv, { location, propertyType })
                          └── PriceContext finds matching analytics row
                                └── Updates avgValue in state
                                      └── PerformanceAnalytics re-renders
                                            └── Avg. Property Value shows live price ✓
```

**Components Involved**

| Component | Role |
|---|---|
| `PriceContext.jsx` | Shared state — connects form and analytics |
| `PricePredictionForm.jsx` | Sends prediction, calls syncToAnalytics |
| `PerformanceAnalytics.jsx` | Reads context, displays live Avg. Property Value |
| `MainApp.jsx` | Wraps both components in PriceProvider |

---

## 🎯 Machine Learning Models Evaluated

| Model | Performance |
|---|---|
| Linear Regression | Baseline |
| Random Forest Regressor | Good accuracy, handles non-linearity |
| Gradient Boosting (XGBoost) | High accuracy |
| Support Vector Regression | Best overall performance |

**Final Selected Model**
The best-performing regression model was selected based on lowest Mean Absolute Error (MAE) and highest R² score on the test dataset.

---

## 📊 Prediction History Management

| Feature | Description |
|---|---|
| Save Prediction | Stores every valuation result with inputs |
| Fetch History | Retrieves past predictions per user |
| User-Specific Data | Each user sees only their own history |
| Persistent Storage | Saved in SQLite via Django ORM |

---

## 📁 Project Structure

```
real-estate-price/
│
├── real-estate-backend/
│   ├── core/                    # Django project settings
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── predictor/               # ML prediction app
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── services/            # ML model loading & inference
│   ├── users/                   # Authentication app
│   ├── manage.py
│   └── requirements.txt
│
└── real-estate-frontend/
    └── src/
        └── app/
            ├── context/
            │   └── PriceContext.jsx       # Shared sync state
            ├── components/
            │   ├── PricePredictionForm.jsx  # Valuation form
            │   └── PerformanceAnalytics.jsx # Live analytics table
            ├── services/
            │   ├── api.js                 # Axios instance
            │   ├── predictService.js      # Prediction API calls
            │   └── authService.js         # Auth API calls
            ├── MainApp.jsx
            └── App.jsx
```

---

## 🚀 Future Enhancements

| Enhancement | Description |
|---|---|
| Map-Based Search | Visual property location picker using maps |
| Price Trend Charts | Historical price trend graphs per location |
| Nearby Amenities | Schools, hospitals, transport proximity scoring |
| Mortgage Calculator | EMI and loan eligibility estimator |
| Agent Recommendation | Connect users with local real estate agents |
| Multi-City Expansion | Extend dataset coverage to more cities |
| Export Reports | Download valuation report as PDF |

---

## ⚠ Current Limitations

- Predictions are estimates based on training data and may vary from actual market prices
- Currently uses SQLite — production deployment should use PostgreSQL
- Location options are limited to cities covered in the training dataset
- Requires Django backend to be running for predictions to work

---

## 👥 Team Members

| Name | Role | Responsibilities |
|---|---|---|
| Sadiq | Backend & ML Development | Django REST APIs, ML model training, prediction pipeline, JWT authentication, database models |
| [Teammate Name] | Frontend Development | React UI, PriceContext sync system, form design, API integration, dashboard |

---

## ▶️ Running the Project

### Clone the Repository

```bash
git clone https://github.com/your-username/real-estate-price.git
```

---

## 🧰 Setup Instructions

### Frontend Setup

```bash
cd real-estate-frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

### Backend Setup

```bash
cd real-estate-backend
python -m venv venv
```

**Activate Virtual Environment**

Windows:
```bash
venv\Scripts\activate
```

macOS / Linux:
```bash
source venv/bin/activate
```

**Install Dependencies**

```bash
pip install -r requirements.txt
```

**Run Database Migrations**

```bash
python manage.py migrate
```

**Run Backend Server**

```bash
python manage.py runserver
```

Backend runs at: `http://localhost:8000`

---

## 📚 References

- [Scikit-learn Documentation](https://scikit-learn.org/stable/)
- [Django REST Framework Documentation](https://www.django-rest-framework.org/)
- [React JS Documentation](https://react.dev/)
- [Simple JWT Documentation](https://django-rest-framework-simplejwt.readthedocs.io/)
- [Vite Documentation](https://vitejs.dev/)

---

## 🎉 Final Note

This project demonstrates how **Machine Learning**, **Django REST APIs**, and **React real-time state management** can be combined to build an intelligent, responsive, and scalable real estate valuation platform — with live analytics that update automatically on every prediction.