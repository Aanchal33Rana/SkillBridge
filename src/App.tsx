
import { useState } from 'react';
import { Disclosure } from './components/Disclosure';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [matchedCareer, setMatchedCareer] = useState<string | null>(null);

  // Simulated Web Speech API integration for voice-first discovery
  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Please type your query.');
      return;
    }
    
    // @ts-expect-error - window speech recognition types
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'hi-IN'; // Hindi-English regional support
    
    setIsListening(true);
    recognition.onresult = (event: any) => {
      const speechToText = event.results[0][0].transcript;
      setSearchQuery(speechToText);
      setIsListening(false);
      runAiMatch(speechToText);
    };
    
    recognition.onerror = () => {
      setIsListening(false);
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognition.start();
  };

  const runAiMatch = (query: string) => {
    // Simulated FastAPI / Scikit-learn AI matching logic
    const lower = query.toLowerCase();
    if (lower.includes('electrician') || lower.includes('bijli') || lower.includes('repair')) {
      setMatchedCareer('Certified Electrician & Solar Technician (PMKVY Scheme - 82% Match)');
    } else if (lower.includes('tailor') || lower.includes('silai') || lower.includes('clothing')) {
      setMatchedCareer('Advanced Apparel & Garment Technology Artisan (90% Match)');
    } else {
      setMatchedCareer('Digital Literacy & Rural Micro-Entrepreneurship Hub (78% Match)');
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 p-6 font-sans">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">
              HunarSetu (ह हुनर सेतु)
            </h1>
            <span className="text-xs bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full font-medium">
              Offline-First PWA
            </span>
          </div>
          <p className="text-sm text-zinc-500 mt-1">
            Voice-first career discovery, skill verification, and local opportunity matching.
          </p>
        </header>

        {/* Voice & Search Section */}
        <section className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-4">
          <h2 className="text-lg font-semibold">Find Your Career Path (बोलो और खोजो)</h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type skills or tap mic to speak (e.g. Electrician, Tailoring)..."
              className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleVoiceSearch}
              className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 cursor-pointer transition-colors ${
                isListening 
                  ? 'bg-red-600 text-white animate-pulse' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {isListening ? 'Listening...' : '🎙️ Speak'}
            </button>
          </div>

          {matchedCareer && (
            <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 rounded-lg">
              <h3 className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">AI Recommendation Result:</h3>
              <p className="text-sm text-indigo-700 dark:text-indigo-300 mt-1">{matchedCareer}</p>
            </div>
          )}
        </section>

        {/* Career Guides / Disclosures */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Verified Rural Skilling Schemes</h2>
          <Disclosure title="PMKVY Solar & Electrical Training Program">
            <p className="mb-2">Free 3-month certification course with stipend support for rural youth specializing in micro-grid maintenance and solar panel installation.</p>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">● Offline Available in IndexedDB</span>
          </Disclosure>

          <Disclosure title="National Apprenticeship Promotion Scheme (NAPS)">
            <p className="mb-2">Earn while you learn with partnered manufacturing and digital service hubs across district centers.</p>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">● Offline Available in IndexedDB</span>
          </Disclosure>
        </section>

      </div>
    </main>
  );
}