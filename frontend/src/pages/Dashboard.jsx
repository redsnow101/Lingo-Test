import { useState, useEffect } from "react";
import { 
  Menu, 
  X, 
  Home, 
  User, 
  Settings, 
  Mail, 
  Mic, 
  BookOpen, 
  GraduationCap, 
  Target, 
  Bell, 
  HelpCircle,
  Code,
  Stethoscope,
  Heart,
  DollarSign,
  Cpu
} from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useNavigate } from 'react-router-dom';

const themes = {
  light: {
    background: "from-gray-50 to-gray-100",
    card: "bg-white",
    text: "text-gray-800",
    textSecondary: "text-gray-600",
    border: "border-gray-100",
    hover: "hover:bg-blue-50",
    active: "bg-blue-50 text-blue-600",
    progress: "bg-blue-600",
    icon: "text-blue-600",
    input: "border-gray-300",
    progressBg: "bg-gray-200"
  },
  dark: {
    background: "from-slate-900 to-slate-800",
    card: "bg-slate-900",
    text: "text-white",
    textSecondary: "text-slate-300",
    border: "border-slate-800",
    hover: "hover:bg-slate-800",
    active: "bg-slate-800 text-white",
    progress: "bg-blue-500",
    icon: "text-blue-400",
    input: "border-slate-700 bg-slate-800 text-white placeholder-slate-400",
    progressBg: "bg-slate-700"
  }
};

const topics = [
  { name: "Software Engineering", icon: <Code size={24} /> },
  { name: "IELTS", icon: <GraduationCap size={24} /> },
  { name: "Medicine", icon: <Stethoscope size={24} /> },
  { name: "Health", icon: <Heart size={24} /> },
  { name: "Finance", icon: <DollarSign size={24} /> },
  { name: "Marketing", icon: <Target size={24} /> },
  { name: "Education", icon: <BookOpen size={24} /> },
  { name: "Technology", icon: <Cpu size={24} /> }
];

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");
  const [theme, setTheme] = useState(() => {
    // Get theme from localStorage or default to light
    return localStorage.getItem('theme') || "light";
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Apply theme to document body and store in localStorage
    document.body.className = `bg-gradient-to-br ${themes[theme].background}`;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleTopicSelect = (topic) => {
    navigate('/chat', { state: { topic: topic.name } });
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const currentTheme = themes[theme];
  const iconSize = isSidebarOpen ? 20 : 24; // Bigger icons when sidebar is collapsed

  return (
    <div className={`flex h-screen bg-gradient-to-br ${currentTheme.background}`}>
      {/* Sidebar */}
      <div className={`${currentTheme.card} shadow-lg h-full transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-16"}`}>
        <div className={`flex items-center justify-between p-4 border-b ${currentTheme.border}`}>
          <h2 className={`text-xl font-bold ${currentTheme.text} ${!isSidebarOpen && "hidden"}`}>LingoTest</h2>
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X size={24} className={currentTheme.text} /> : <Menu size={24} className={currentTheme.text} />}
          </Button>
        </div>
        <nav className="p-4 space-y-2">
          <div 
            className={`flex items-center space-x-3 cursor-pointer ${currentTheme.hover} p-3 rounded-xl transition-all duration-200 ${
              activePage === "Dashboard" ? currentTheme.active : currentTheme.textSecondary
            }`} 
            onClick={() => setActivePage("Dashboard")}
          >
            <Home size={iconSize} />
            {isSidebarOpen && <span className="font-medium">Home</span>}
          </div>
          <div 
            className={`flex items-center space-x-3 cursor-pointer ${currentTheme.hover} p-3 rounded-xl transition-all duration-200 ${
              activePage === "Profile" ? currentTheme.active : currentTheme.textSecondary
            }`} 
            onClick={() => setActivePage("Profile")}
          >
            <User size={iconSize} />
            {isSidebarOpen && <span className="font-medium">Profile</span>}
          </div>
          <div 
            className={`flex items-center space-x-3 cursor-pointer ${currentTheme.hover} p-3 rounded-xl transition-all duration-200 ${
              activePage === "Settings" ? currentTheme.active : currentTheme.textSecondary
            }`} 
            onClick={() => setActivePage("Settings")}
          >
            <Settings size={iconSize} />
            {isSidebarOpen && <span className="font-medium">Settings</span>}
          </div>
          <div 
            className={`flex items-center space-x-3 cursor-pointer ${currentTheme.hover} p-3 rounded-xl transition-all duration-200 ${
              activePage === "Contact" ? currentTheme.active : currentTheme.textSecondary
            }`} 
            onClick={() => setActivePage("Contact")}
          >
            <Mail size={iconSize} />
            {isSidebarOpen && <span className="font-medium">Contact</span>}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {activePage === "Dashboard" && (
          <>
            <div className="mb-8">
              <h1 className={`text-3xl font-bold ${currentTheme.text} mb-2`}>Welcome Back!</h1>
              <p className={currentTheme.textSecondary}>Choose a topic to start practicing your language skills</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {topics.map((topic, index) => (
                <Card 
                  key={index} 
                  className={`group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 ${currentTheme.card} ${theme === 'dark' ? 'backdrop-blur-sm bg-opacity-80' : ''}`}
                  onClick={() => handleTopicSelect(topic)}
                >
                  <CardContent className="p-6 flex flex-col items-center justify-center space-y-4">
                    <div className={`p-3 ${currentTheme.hover} rounded-full group-hover:bg-opacity-80 transition-colors`}>
                      {topic.icon}
                    </div>
                    <span className={`font-semibold text-lg ${currentTheme.text} text-center`}>{topic.name}</span>
                    <div className={`flex items-center space-x-2 text-sm ${currentTheme.textSecondary}`}>
                      <Mic size={16} />
                      <span>Voice Practice</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {activePage === "Profile" && (
          <div className="max-w-4xl mx-auto">
            <h1 className={`text-3xl font-bold ${currentTheme.text} mb-8`}>Your Profile</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className={`p-6 ${currentTheme.card}`}>
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`w-20 h-20 rounded-full ${currentTheme.hover} flex items-center justify-center`}>
                    <User size={40} className={currentTheme.icon} />
                  </div>
                  <div>
                    <h2 className={`text-xl font-semibold ${currentTheme.text}`}>John Doe</h2>
                    <p className={currentTheme.textSecondary}>john.doe@example.com</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className={currentTheme.textSecondary}>Member Since</span>
                    <span className="font-medium">January 2024</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={currentTheme.textSecondary}>Practice Sessions</span>
                    <span className="font-medium">24</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={currentTheme.textSecondary}>Topics Completed</span>
                    <span className="font-medium">8</span>
                  </div>
                </div>
              </Card>

              <Card className={`p-6 ${currentTheme.card}`}>
                <h2 className={`text-xl font-semibold ${currentTheme.text} mb-4`}>Progress Overview</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className={currentTheme.textSecondary}>Speaking Skills</span>
                      <span className="font-medium">75%</span>
                    </div>
                    <div className={`w-full ${currentTheme.progressBg} rounded-full h-2`}>
                      <div className={`${currentTheme.progress} h-2 rounded-full`} style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className={currentTheme.textSecondary}>Listening Skills</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <div className={`w-full ${currentTheme.progressBg} rounded-full h-2`}>
                      <div className={`${currentTheme.progress} h-2 rounded-full`} style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className={currentTheme.textSecondary}>Vocabulary</span>
                      <span className="font-medium">90%</span>
                    </div>
                    <div className={`w-full ${currentTheme.progressBg} rounded-full h-2`}>
                      <div className={`${currentTheme.progress} h-2 rounded-full`} style={{ width: '90%' }}></div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activePage === "Settings" && (
          <div className="max-w-4xl mx-auto">
            <h1 className={`text-3xl font-bold ${currentTheme.text} mb-8`}>Settings</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className={`p-6 ${currentTheme.card}`}>
                <h2 className={`text-xl font-semibold ${currentTheme.text} mb-4`}>Account Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium ${currentTheme.text} mb-1`}>Email Notifications</label>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span className={currentTheme.textSecondary}>Receive practice reminders</span>
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${currentTheme.text} mb-1`}>Voice Settings</label>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span className={currentTheme.textSecondary}>Auto-play responses</span>
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${currentTheme.text} mb-1`}>Theme</label>
                    <select 
                      className={`w-full p-2 border rounded-lg ${currentTheme.input}`}
                      value={theme}
                      onChange={(e) => handleThemeChange(e.target.value)}
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                    </select>
                  </div>
                </div>
              </Card>

              <Card className={`p-6 ${currentTheme.card}`}>
                <h2 className={`text-xl font-semibold ${currentTheme.text} mb-4`}>Privacy Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium ${currentTheme.text} mb-1`}>Profile Visibility</label>
                    <select className={`w-full p-2 border rounded-lg ${currentTheme.input}`}>
                      <option>Public</option>
                      <option>Private</option>
                      <option>Friends Only</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${currentTheme.text} mb-1`}>Progress Sharing</label>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span className={currentTheme.textSecondary}>Share progress with friends</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activePage === "Contact" && (
          <div className="max-w-4xl mx-auto">
            <h1 className={`text-3xl font-bold ${currentTheme.text} mb-8`}>Contact Us</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className={`p-6 ${currentTheme.card}`}>
                <h2 className={`text-xl font-semibold ${currentTheme.text} mb-4`}>Get in Touch</h2>
                <form className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium ${currentTheme.text} mb-1`}>Name</label>
                    <input type="text" className={`w-full p-2 border rounded-lg ${currentTheme.input}`} placeholder="Your name" />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${currentTheme.text} mb-1`}>Email</label>
                    <input type="email" className={`w-full p-2 border rounded-lg ${currentTheme.input}`} placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${currentTheme.text} mb-1`}>Message</label>
                    <textarea className={`w-full p-2 border rounded-lg h-32 ${currentTheme.input}`} placeholder="Your message"></textarea>
                  </div>
                  <Button className="w-full">Send Message</Button>
                </form>
              </Card>

              <Card className={`p-6 ${currentTheme.card}`}>
                <h2 className={`text-xl font-semibold ${currentTheme.text} mb-4`}>Support Options</h2>
                <div className="space-y-4">
                  <div className={`flex items-center space-x-3 p-3 ${currentTheme.hover} rounded-lg cursor-pointer`}>
                    <HelpCircle size={20} className={currentTheme.icon} />
                    <div>
                      <h3 className={`font-medium ${currentTheme.text}`}>Help Center</h3>
                      <p className={`text-sm ${currentTheme.textSecondary}`}>Browse our help articles</p>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-3 p-3 ${currentTheme.hover} rounded-lg cursor-pointer`}>
                    <Mail size={20} className={currentTheme.icon} />
                    <div>
                      <h3 className={`font-medium ${currentTheme.text}`}>Email Support</h3>
                      <p className={`text-sm ${currentTheme.textSecondary}`}>support@lingotest.com</p>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-3 p-3 ${currentTheme.hover} rounded-lg cursor-pointer`}>
                    <Bell size={20} className={currentTheme.icon} />
                    <div>
                      <h3 className={`font-medium ${currentTheme.text}`}>Status Updates</h3>
                      <p className={`text-sm ${currentTheme.textSecondary}`}>Check system status</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


