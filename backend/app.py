from dotenv import load_dotenv
import os
import pyaudio
import wave
import tempfile
import time
import keyboard
import pygame
import requests
import json
from groq import Groq
from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import logging
from voice_assistant import VoiceAssistant

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Load environment variables
load_dotenv()

# Check required environment variables
required_env_vars = ['GROQ_API_KEY', 'ELEVENLABS_API_KEY']
missing_vars = [var for var in required_env_vars if not os.getenv(var)]
if missing_vars:
    logger.error(f"Missing required environment variables: {', '.join(missing_vars)}")
    raise ValueError(f"Missing required environment variables: {', '.join(missing_vars)}")

# API Keys and configuration
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
ELEVENLABS_API_KEY = os.getenv("ELEVENLABS_API_KEY")
ELEVENLABS_VOICE_ID = os.getenv("ELEVENLABS_VOICE_ID", "21m00Tcm4TlvDq8ikWAM")  # Default voice - Rachel
GROQ_MODEL = os.getenv("GROQ_MODEL", "llama3-70b-8192")  # For text generation
STT_MODEL = "distil-whisper-large-v3-en"  # For speech-to-text

# Initialize Groq client for both STT and LLM
groq_client = Groq(api_key=GROQ_API_KEY)

@app.route('/api/voice-assistant/start', methods=['POST'])
def start_voice_assistant():
    try:
        logger.info("Received voice assistant request")
        data = request.get_json()
        
        if not data or 'audio' not in data:
            logger.error("No audio data provided in request")
            return jsonify({
                'success': False,
                'error': 'No audio data provided'
            }), 400

        # Decode base64 audio data
        try:
            audio_data = base64.b64decode(data['audio'])
            logger.info("Successfully decoded audio data")
        except Exception as e:
            logger.error(f"Error decoding audio data: {e}")
            return jsonify({
                'success': False,
                'error': 'Invalid audio data format'
            }), 400
        
        # Create a temporary file to store the audio
        try:
            with tempfile.NamedTemporaryFile(delete=False, suffix='.wav') as temp_file:
                temp_file.write(audio_data)
                temp_file_path = temp_file.name
            logger.info(f"Created temporary file: {temp_file_path}")
        except Exception as e:
            logger.error(f"Error creating temporary file: {e}")
            return jsonify({
                'success': False,
                'error': 'Failed to process audio file'
            }), 500

        # Set the audio file path in environment variable
        os.environ['AUDIO_FILE'] = temp_file_path

        # Process the audio file
        try:
            assistant = VoiceAssistant()
            success = assistant.process_audio_file(temp_file_path)
            logger.info(f"Audio processing {'successful' if success else 'failed'}")
        except Exception as e:
            logger.error(f"Error processing audio: {e}")
            return jsonify({
                'success': False,
                'error': f'Error processing audio: {str(e)}'
            }), 500

        # Clean up the temporary file
        try:
            os.unlink(temp_file_path)
            logger.info("Cleaned up temporary file")
        except Exception as e:
            logger.error(f"Error deleting temporary file: {e}")

        if not success:
            return jsonify({
                'success': False,
                'error': 'Failed to process audio'
            }), 500

        # Return the results
        return jsonify({
            'success': True,
            'result': assistant.last_result
        })

    except Exception as e:
        logger.error(f"Unexpected error in voice assistant: {e}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        message = data.get('message')
        topic = data.get('topic', 'General')
        is_voice = data.get('isVoice', False)

        if not message:
            logger.error("No message provided in request")
            return jsonify({
                'success': False,
                'error': 'No message provided'
            }), 400

        # Process the message and get response
        try:
            assistant = VoiceAssistant()
            response = assistant.get_ai_response(message)
            logger.info("Successfully got AI response")
        except Exception as e:
            logger.error(f"Error getting AI response: {e}")
            return jsonify({
                'success': False,
                'error': f'Error getting AI response: {str(e)}'
            }), 500

        # If it's a voice request, convert response to speech
        audio_response = None
        if is_voice:
            try:
                audio_response = assistant.elevenlabs_tts(response)
                logger.info("Successfully generated audio response")
            except Exception as e:
                logger.error(f"Error generating audio response: {e}")
                return jsonify({
                    'success': False,
                    'error': f'Error generating audio response: {str(e)}'
                }), 500

        return jsonify({
            'success': True,
            'response': response,
            'audio': base64.b64encode(audio_response).decode('utf-8') if audio_response else None
        })

    except Exception as e:
        logger.error(f"Unexpected error in chat endpoint: {e}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True)