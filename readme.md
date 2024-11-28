# Weather App

A responsive weather application built with React and TailwindCSS. The app provides real-time weather data for the user's current location and a 5-day weather forecast. It uses the OpenWeather API for fetching weather data.

## **Features**
- Displays current weather conditions (temperature, humidity, and wind speed).
- Provides a 5-day forecast with daily summaries.
- Automatically fetches user location using the Geolocation API.
- Fallback location support (Raipur) if location services are disabled.
- Responsive design powered by TailwindCSS.
- Dynamic weather icons using `react-animated-weather`.

## **Technologies Used**
- **Frontend**: React (v18.3.1), TailwindCSS
- **API**: OpenWeather 5-Day / 3-Hour Forecast API
- **HTTP Requests**: Axios
- **Icons and Animations**: React Animated Weather
- **Build Tool**: Vite
- **Linting**: ESLint

---

## **Getting Started**

### **Prerequisites**
- Node.js (v16+)
- npm or yarn package manager

---

### **Setup Instructions**

#### 1. Clone the Repository
```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
```
#### 2. Install Dependencies
Run the following command to install the required dependencies:
```bash
npm install
```

### **Enviornment variable configuration**
Create a .env file in the root directory and add your API key:
```bash
VITE_OPENWEATHER_API_KEY=your_api_key_here
VITE_BASE_URL=https://api.openweathermap.org/data/2.5/
```

