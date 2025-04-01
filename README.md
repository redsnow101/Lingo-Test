# Lingo-Test

A language learning application with AI-powered voice interactions.

## Prerequisites

- Python 3.8 or higher
- Node.js 14.0 or higher
- npm or yarn package manager
- API keys for:
  - Groq (for AI language model)
  - ElevenLabs (for text-to-speech)

## Project Structure

```
Lingo-Test/
├── backend/         # Flask backend
├── frontend/        # React frontend
└── .env            # Environment variables
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   # Windows
   python -m venv venv
   .\venv\Scripts\activate

   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   - Copy `.env.example` to `.env` in the root directory
   - Add your API keys:
     - `GROQ_API_KEY`: Your Groq API key
     - `ELEVENLABS_API_KEY`: Your ElevenLabs API key

5. Run the Flask server:
   ```bash
   python app.py
   ```
   The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```
   The frontend will run on `http://localhost:3000`

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
FLASK_ENV=development
ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM
GROQ_MODEL=llama3-70b-8192
GROQ_API_KEY=your_groq_api_key
ELEVENLABS_API_KEY=your_elevenlabs_api_key
```

Replace `your_groq_api_key` and `your_elevenlabs_api_key` with your actual API keys.

## Running the Application

1. Start the backend server (from the backend directory):
   ```bash
   python app.py
   ```

2. Start the frontend development server (from the frontend directory):
   ```bash
   npm start
   # or
   yarn start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Technologies Used

### Backend
- Flask
- Flask-CORS
- Groq API
- ElevenLabs API
- Python-dotenv

### Frontend
- React
- React Router
- Tailwind CSS
- Radix UI

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
