import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Mic, 
  Send, 
  StopCircle, 
  Volume2, 
  Video, 
  VideoOff, 
  Camera, 
  CameraOff, 
  Phone,
  PhoneOff,
  Maximize2,
  Minimize2,
  User
} from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

const themes = {
  light: {
    background: "from-gray-50 to-gray-100",
    card: "bg-white",
    text: "text-gray-800",
    textSecondary: "text-gray-600",
    border: "border-gray-100",
    hover: "hover:bg-blue-50",
    active: "bg-blue-50 text-blue-600",
    userMessage: "bg-blue-500 text-white",
    aiMessage: "bg-white text-gray-800 shadow",
    input: "border-gray-300 bg-white",
    videoBackground: "bg-gray-100"
  },
  dark: {
    background: "from-slate-900 to-slate-800",
    card: "bg-slate-900",
    text: "text-white",
    textSecondary: "text-slate-300",
    border: "border-slate-800",
    hover: "hover:bg-slate-800",
    active: "bg-slate-800 text-white",
    userMessage: "bg-blue-600 text-white",
    aiMessage: "bg-slate-800 text-white shadow-lg",
    input: "border-slate-700 bg-slate-800 text-white placeholder-slate-400",
    videoBackground: "bg-slate-800"
  }
};

export default function AIChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [audioStream, setAudioStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || "light";
  });
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [showConnectPrompt, setShowConnectPrompt] = useState(true);
  const [isPipMode, setIsPipMode] = useState(false);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const audioRef = useRef(null);
  const audioChunks = useRef([]);
  const videoContainerRef = useRef(null);
  const messagesEndRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { topic } = location.state || { topic: 'General' };
  const currentTheme = themes[theme];

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Listen for theme changes in localStorage
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'theme') {
        setTheme(e.newValue || 'light');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Apply theme to body
  useEffect(() => {
    document.body.className = `bg-gradient-to-br ${currentTheme.background}`;
  }, [theme, currentTheme.background]);

  // Handle fullscreen
  useEffect(() => {
    const handleFullScreen = async () => {
      if (isFullScreen && videoContainerRef.current) {
        try {
          if (videoContainerRef.current.requestFullscreen) {
            await videoContainerRef.current.requestFullscreen();
          } else if (videoContainerRef.current.webkitRequestFullscreen) {
            await videoContainerRef.current.webkitRequestFullscreen();
          } else if (videoContainerRef.current.msRequestFullscreen) {
            await videoContainerRef.current.msRequestFullscreen();
          }
        } catch (err) {
          console.error('Fullscreen error:', err);
        }
      } else {
        if (document.exitFullscreen) {
          if (document.fullscreenElement) {
            document.exitFullscreen();
          }
        } else if (document.webkitExitFullscreen) {
          if (document.webkitFullscreenElement) {
            document.webkitExitFullscreen();
          }
        } else if (document.msExitFullscreen) {
          if (document.msFullscreenElement) {
            document.msExitFullscreen();
          }
        }
      }
    };
    
    handleFullScreen();
  }, [isFullScreen]);

  // Initialize camera when call is activated
  useEffect(() => {
    let mounted = true;

    const setupCamera = async () => {
      if (isCallActive) {
        try {
          console.log('Requesting camera access...');
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: {
              width: 1280,
              height: 720,
              facingMode: 'user'
            },
            audio: true 
          });
          
          if (!mounted) {
            stream.getTracks().forEach(track => track.stop());
            return;
          }

          console.log('Camera stream obtained');
          setLocalStream(stream);
          
          // We'll now set up the streams correctly
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
          
          setIsCameraOn(true);
          setIsVideoOn(true);
          setShowConnectPrompt(false);
        } catch (err) {
          console.error('Error accessing camera:', err);
          setError('Failed to access camera. Please check your permissions.');
          setIsCallActive(false);
          setShowConnectPrompt(true);
        }
      } else {
        if (localStream) {
          localStream.getTracks().forEach(track => track.stop());
          setLocalStream(null);
        }
        setIsVideoOn(false);
        setIsCameraOn(false);
        setShowConnectPrompt(true);
      }
    };

    setupCamera();
    return () => {
      mounted = false;
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCallActive]);

  const sendMessage = async (message, isVoice = false) => {
    try {
      setIsLoading(true);
      setError('');
      
      // Add the user message immediately for better UX
      setMessages(prev => [...prev, { type: 'user', content: isVoice ? 'Processing voice message...' : message }]);
      
      let response;
      if (isVoice) {
        // Use voice assistant endpoint for voice messages
        response = await fetch('/api/voice-assistant/start', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            audio: message  // base64 audio data
          })
        });
      } else {
        // Use regular chat endpoint for text messages
        response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message,
            topic,
            isVoice
          }),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to process request');
      }

      // Update messages after we get the response
      setMessages(prev => {
        // Remove the last user message (which we'll replace with the correct one)
        const updatedMessages = prev.slice(0, -1);
        
        if (isVoice) {
          // Parse the voice assistant response
          if (!data.result) {
            throw new Error('No response received from voice assistant');
          }

          const lines = data.result.split('\n');
          let transcription = '';
          let aiResponse = '';
          let audioResponse = '';
          
          lines.forEach(line => {
            if (line.includes('You said:')) {
              const match = line.match(/You said: "([^"]+)"/);
              if (match) {
                transcription = match[1];
              }
            } else if (line.includes('Assistant response:')) {
              const match = line.match(/Assistant response: "([^"]+)"/);
              if (match) {
                aiResponse = match[1];
              }
            } else if (line.includes('Audio response:')) {
              audioResponse = line.split('Audio response:')[1].trim();
            }
          });

          if (!transcription) {
            transcription = "Voice message processed";
          }

          if (!aiResponse) {
            aiResponse = "Could not generate a response";
          }

          // Play the audio response if available
          if (audioResponse) {
            const audio = new Audio(`data:audio/mp3;base64,${audioResponse}`);
            audio.play();
          }

          return [
            ...updatedMessages,
            { type: 'user', content: transcription, isVoice: true },
            { type: 'ai', content: aiResponse, audio: audioResponse, isVoice: true }
          ];
        } else {
          // Handle regular chat response
          return [
            ...updatedMessages,
            { type: 'user', content: message },
            { type: 'ai', content: data.response }
          ];
        }
      });
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Sorry, there was an error processing your request.');
      setMessages(prev => {
        // Get all messages except the last one (which is the pending user message)
        const updatedMessages = prev.slice(0, -1);
        return [
          ...updatedMessages,
          { type: 'user', content: isVoice ? 'Voice message' : message },
          { type: 'ai', content: `Error: ${error.message || 'Failed to process request'}` }
        ];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const message = input;
    setInput('');
    await sendMessage(message);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setAudioStream(stream);
      
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      
      audioChunks.current = [];
      
      recorder.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };
      
      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = reader.result.split(',')[1];
          await sendMessage(base64Audio, true);
        };
      };
      
      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setError('Failed to access microphone. Please check your permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      audioStream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const handleVoiceRecord = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const playAudio = (audioData) => {
    if (audioRef.current) {
      audioRef.current.src = `data:audio/mp3;base64,${audioData}`;
      audioRef.current.play();
    }
  };

  // Fixed toggle video function
  const toggleVideo = () => {
    if (localStream) {
      const videoTracks = localStream.getVideoTracks();
      if (videoTracks.length > 0) {
        // Toggle the enabled property of the video track
        const newState = !isVideoOn;
        videoTracks.forEach(track => {
          track.enabled = newState;
        });
        setIsVideoOn(newState);
        console.log('Video track enabled:', newState);
      }
    }
  };

  // Fixed toggle camera function
  const toggleCamera = () => {
    if (localStream) {
      const videoTracks = localStream.getVideoTracks();
      if (videoTracks.length > 0) {
        // Toggle the enabled property of the video track
        const newState = !isCameraOn;
        videoTracks.forEach(track => {
          track.enabled = newState;
        });
        setIsCameraOn(newState);
        console.log('Camera track enabled:', newState);
      }
    }
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const toggleCall = () => {
    setIsCallActive(!isCallActive);
  };

  const swapVideoFeeds = () => {
    setIsPipMode(!isPipMode);
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (audioStream) {
        audioStream.getTracks().forEach(track => track.stop());
      }
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [audioStream, localStream]);

  // Format message content with proper line breaks
  const formatMessageContent = (content) => {
    // Split by newlines and join with <br /> elements
    return content.split('\n').map((text, i) => (
      <React.Fragment key={i}>
        {text}
        {i < content.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className={`flex flex-col h-screen bg-gradient-to-br ${currentTheme.background}`}>
      {/* Header */}
      <div className={`${currentTheme.card} shadow-sm p-4 flex items-center ${currentTheme.border}`}>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/dashboard')}
          className="mr-4"
        >
          <ArrowLeft size={24} className={currentTheme.text} />
        </Button>
        <h1 className={`text-xl font-semibold ${currentTheme.text}`}>{topic}</h1>
      </div>

      {/* Main Content - Split View */}
      <div className="flex flex-1 overflow-hidden">
        {/* Video Call Section - Left Side */}
        <div className="w-1/2 flex flex-col border-r border-gray-200 dark:border-gray-700">
          <div className={`flex-1 ${currentTheme.videoBackground} p-4 flex flex-col items-center justify-center relative`}>
            {showConnectPrompt ? (
              <div 
                className={`w-full h-full rounded-lg ${currentTheme.card} flex flex-col items-center justify-center cursor-pointer hover:bg-opacity-90 transition-all duration-300`}
                onClick={() => {
                  setIsCallActive(true);
                }}
              >
                <Video size={64} className={`${currentTheme.text} mb-4`} />
                <p className={`text-xl font-medium ${currentTheme.text}`}>Click to start video call</p>
                <p className={`text-sm ${currentTheme.textSecondary} mt-2`}>Camera permission will be requested</p>
              </div>
            ) : (
              <div 
                ref={videoContainerRef}
                className={`w-full h-full rounded-lg ${currentTheme.card} flex items-center justify-center relative overflow-hidden`}
              >
                {/* Main Video Display */}
                <div className="absolute inset-0 bg-black flex items-center justify-center">
                  {isPipMode ? (
                    <video
                      ref={localVideoRef}
                      className="h-full w-full object-cover"
                      autoPlay
                      playsInline
                      muted
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <video
                        ref={localVideoRef}
                        className="h-full w-full object-cover"
                        autoPlay
                        playsInline
                        muted
                      />
                    </div>
                  )}
                  
                  {(!isVideoOn || !isCameraOn) && (
                    <div className={`absolute inset-0 flex flex-col items-center justify-center ${currentTheme.text}`}>
                      <User size={64} className="mb-4" />
                      <p className="text-lg font-medium">Video is turned off</p>
                    </div>
                  )}
                </div>

                {/* Small Self-View (PiP) */}
                <div 
                  className="absolute bottom-4 right-4 w-48 h-36 bg-black rounded-lg overflow-hidden cursor-pointer z-10"
                  onClick={swapVideoFeeds}
                >
                  {isPipMode ? (
                    <div className="h-full w-full flex items-center justify-center">
                      <video
                        ref={localVideoRef}
                        className="h-full w-full object-cover"
                        autoPlay
                        playsInline
                        muted
                      />
                    </div>
                  ) : (
                    <video
                      ref={localVideoRef}
                      className="h-full w-full object-cover"
                      autoPlay
                      playsInline
                      muted
                    />
                  )}
                  
                  {(!isVideoOn || !isCameraOn) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                      <User size={32} className="text-white" />
                    </div>
                  )}
                </div>

                {/* Video Controls */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4 p-4 rounded-full bg-black/50 z-20">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleVideo}
                    className={`rounded-full ${!isVideoOn ? 'bg-red-500 hover:bg-red-600' : 'bg-white/10 hover:bg-white/20'}`}
                  >
                    {isVideoOn ? <Video size={20} className="text-white" /> : <VideoOff size={20} className="text-white" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleCamera}
                    className={`rounded-full ${!isCameraOn ? 'bg-red-500 hover:bg-red-600' : 'bg-white/10 hover:bg-white/20'}`}
                  >
                    {isCameraOn ? <Camera size={20} className="text-white" /> : <CameraOff size={20} className="text-white" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      toggleCall();
                      if (isCallActive) {
                        setShowConnectPrompt(true);
                      }
                    }}
                    className={`rounded-full ${!isCallActive ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
                  >
                    {isCallActive ? <PhoneOff size={20} className="text-white" /> : <Phone size={20} className="text-white" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleFullScreen}
                    className="rounded-full bg-white/10 hover:bg-white/20"
                  >
                    {isFullScreen ? <Minimize2 size={20} className="text-white" /> : <Maximize2 size={20} className="text-white" />}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Chat Section - Right Side */}
        <div className="w-1/2 flex flex-col">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? currentTheme.userMessage
                      : message.content.startsWith('Error:')
                        ? 'bg-red-100 text-red-800'
                        : currentTheme.aiMessage
                  }`}
                >
                  <div className="flex flex-col gap-2">
                    <div className="whitespace-pre-wrap break-words">
                      {formatMessageContent(message.content)}
                    </div>
                    <div className="flex items-center gap-2">
                      {message.isVoice && (
                        <span className="text-xs opacity-75">
                          {message.type === 'user' ? '🎤' : '🔊'}
                        </span>
                      )}
                      {message.audio && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`h-6 w-6 ${currentTheme.text}`}
                          onClick={() => playAudio(message.audio)}
                        >
                          <Volume2 size={16} />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Area */}
          <div className={`${currentTheme.card} border-t ${currentTheme.border} p-4`}>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleVoiceRecord}
                className={`${isRecording ? 'text-red-500' : currentTheme.text}`}
                disabled={isLoading}
              >
                {isRecording ? <StopCircle size={24} /> : <Mic size={24} />}
              </Button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message or use voice..."
                className={`flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${currentTheme.input}`}
                disabled={isLoading || isRecording}
              />
              <Button 
                onClick={handleSend} 
                disabled={isLoading || !input.trim() || isRecording}
                className={currentTheme.text}
              >
                <Send size={24} />
              </Button>
            </div>
            {isLoading && (
              <div className={`text-sm ${currentTheme.textSecondary} mt-2 text-center`}>
                Processing your request...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hidden audio element for playing responses */}
      <audio ref={audioRef} className="hidden" />
    </div>
  );
}