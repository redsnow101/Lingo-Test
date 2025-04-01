from dotenv import load_dotenv
import os
import pyaudio
import wave
import tempfile
import time
import pygame
import requests
import json
import sys
import argparse
from groq import Groq
import base64
import logging

# Load environment variables
load_dotenv()

# API Keys and configuration
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
ELEVENLABS_API_KEY = os.getenv("ELEVENLABS_API_KEY")
ELEVENLABS_VOICE_ID = os.getenv("ELEVENLABS_VOICE_ID", "21m00Tcm4TlvDq8ikWAM")  # Default voice - Rachel
GROQ_MODEL = os.getenv("GROQ_MODEL", "llama3-70b-8192")  # For text generation
STT_MODEL = "distil-whisper-large-v3-en"  # For speech-to-text

# Initialize Groq client for both STT and LLM
groq_client = Groq(api_key=GROQ_API_KEY)

class VoiceAssistant:
    def __init__(self):
        self.temp_audio_file = None
        self.last_result = ""
        self.logger = logging.getLogger(__name__)

    def process_audio_file(self, audio_file):
        """Process an existing audio file."""
        try:
            if not os.path.exists(audio_file):
                self.logger.error(f"Audio file not found: {audio_file}")
                return False

            # 1. Transcribe using Groq
            self.logger.info("Starting audio transcription")
            transcription = self.transcribe_audio(audio_file)

            if not transcription or not hasattr(transcription, 'text') or not transcription.text:
                self.logger.error("No speech detected or transcription failed")
                return False

            # 2. Print the transcription
            print(f"You said: \"{transcription.text}\"")
            self.last_result += f"You said: \"{transcription.text}\"\n"

            # 3. Get AI response from Groq
            self.logger.info("Getting AI response")
            ai_response = self.get_ai_response(transcription.text)

            # 4. Convert response to speech with ElevenLabs
            self.logger.info("Converting response to speech")
            audio_data = self.elevenlabs_tts(ai_response)

            # 5. Print text response
            print(f"Assistant response: \"{ai_response}\"")
            self.last_result += f"Assistant response: \"{ai_response}\"\n"

            if audio_data:
                print("Audio response: " + base64.b64encode(audio_data).decode('utf-8'))
                self.last_result += "Audio response: " + base64.b64encode(audio_data).decode('utf-8') + "\n"

            return True

        except Exception as e:
            self.logger.error(f"Error processing audio file: {e}")
            return False

    def transcribe_audio(self, filename):
        """Transcribe the audio file using Groq API."""
        self.logger.info("Transcribing audio using Groq...")

        try:
            with open(filename, "rb") as file:
                transcription = groq_client.audio.transcriptions.create(
                    file=(filename, file.read()),
                    model=STT_MODEL,
                    response_format="verbose_json",
                )

            return transcription
        except Exception as e:
            self.logger.error(f"Error transcribing audio: {e}")
            return None

    def get_ai_response(self, transcription):
        """Get AI response from Groq API."""
        self.logger.info(f"Getting AI response for: '{transcription}'")

        try:
            completion = groq_client.chat.completions.create(
                model=GROQ_MODEL,
                messages=[
                    {"role": "system", "content": "You are a helpful assistant. Keep responses clear and concise."},
                    {"role": "user", "content": transcription}
                ],
                max_tokens=200,
            )

            ai_response = completion.choices[0].message.content
            self.logger.info(f"AI Response: '{ai_response}'")

            return ai_response
        except Exception as e:
            self.logger.error(f"Error getting AI response: {e}")
            return "I'm sorry, I couldn't process your request."

    def elevenlabs_tts(self, text):
        """Convert text to speech using ElevenLabs API and save it."""
        self.logger.info("Converting response to speech using ElevenLabs...")

        ELEVENLABS_API_URL = f"https://api.elevenlabs.io/v1/text-to-speech/{ELEVENLABS_VOICE_ID}"

        headers = {
            "Accept": "audio/mpeg",
            "Content-Type": "application/json",
            "xi-api-key": ELEVENLABS_API_KEY
        }

        data = {
            "text": text,
            "model_id": "eleven_monolingual_v1",
            "voice_settings": {
                "stability": 0.5,
                "similarity_boost": 0.5
            }
        }

        try:
            # Make the API request to ElevenLabs
            response = requests.post(ELEVENLABS_API_URL, json=data, headers=headers)
            response.raise_for_status()

            # Return the audio data
            return response.content
        except Exception as e:
            self.logger.error(f"Error in ElevenLabs text-to-speech: {e}")
            return None

    def cleanup(self):
        """Clean up temporary files."""
        if self.temp_audio_file and os.path.exists(self.temp_audio_file):
            try:
                os.unlink(self.temp_audio_file)
                print(f"Temporary file {self.temp_audio_file} deleted")
            except Exception as e:
                print(f"Error deleting temporary file: {e}") 