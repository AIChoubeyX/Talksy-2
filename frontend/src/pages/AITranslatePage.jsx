import { useState } from "react";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import { ClipboardCopy, LoaderCircle, ArrowLeftCircle, Volume2 } from "lucide-react";
import { Link } from "react-router";
import Lottie from "lottie-react";
// import speakingGlobe from "../assets/speaking-globe.json";


const LANGUAGES = [
  "Arabic", "Bengali", "Bulgarian", "Chinese", "Croatian", "Czech",
  "Danish", "Dutch", "English", "Estonian", "Filipino", "Finnish",
  "French", "Georgian", "German", "Greek", "Gujarati", "Hebrew",
  "Hindi", "Hungarian", "Indonesian", "Italian", "Japanese", "Kannada",
  "Korean", "Latvian", "Lithuanian", "Malay", "Malayalam", "Marathi",
  "Nepali", "Norwegian", "Persian", "Polish", "Portuguese", "Punjabi",
  "Romanian", "Russian", "Serbian", "Sinhala", "Slovak", "Slovenian",
  "Spanish", "Swahili", "Swedish", "Tamil", "Telugu", "Thai",
  "Turkish", "Ukrainian", "Urdu", "Vietnamese", "Welsh"
];

export default function AITranslatePage() {
  const [text, setText] = useState("");
  const [targetLang, setTargetLang] = useState("Spanish");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text) return;
    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/translate", {
        text,
        targetLanguage: targetLang,
      });
      setResult(data.translationBlock);
    } catch (err) {
      console.error("Translate error:", err);
      setResult(
        "❌ Translation failed: " +
          (err?.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    window.toast?.success("Copied to clipboard!");
  };

  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setText((prev) => (prev ? prev + " " + transcript : transcript));
    };

    recognition.onerror = (e) => {
      console.error("Voice input error:", e);
      setListening(false);
    };

    recognition.start();
  };

  const speakResult = () => {
    if (!result) return;
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(result);
    utterance.lang = "en"; // Optional: match with targetLang
    synth.speak(utterance);
  };

//   return (
//     <div className="flex">
  

//       <div className="flex-1 p-6">
//         <div className="flex items-center justify-between mb-4">
//           <h1 className="text-3xl font-bold">AI Translate</h1>
          
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
//           <textarea
//             className="w-full textarea textarea-bordered h-28"
//             placeholder="Type or speak text to translate…"
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//           />
//           <div className="flex items-center gap-3">
//             <button
//               type="button"
//               onClick={handleVoiceInput}
//               className={`btn btn-sm ${listening ? "btn-warning" : "btn-accent"}`}
//             >
//               🎤 {listening ? "Listening…" : "Speak"}
//             </button>
//           </div>

//           <select
//             className="select select-bordered w-full"
//             value={targetLang}
//             onChange={(e) => setTargetLang(e.target.value)}
//           >
//             {LANGUAGES.map((lang) => (
//               <option key={lang}>{lang}</option>
//             ))}
//           </select>

//           <button
//             type="submit"
//             disabled={loading}
//             className="btn btn-primary w-full flex items-center justify-center gap-2"
//           >
//             {loading && <LoaderCircle className="animate-spin size-5" />}
//             {loading ? "Translating…" : "Translate"}
//           </button>
//         </form>

//         {result && (
//           <div className="mt-8 relative max-w-2xl">
//             <div className="absolute top-2 right-2 flex gap-2">
//               <button
//                 onClick={handleCopy}
//                 className="btn btn-xs btn-ghost"
//                 title="Copy to clipboard"
//               >
//                 <ClipboardCopy className="size-4" />
//               </button>
//               <button
//                 onClick={speakResult}
//                 className="btn btn-xs btn-ghost"
//                 title="Read aloud"
//               >
//                 <Volume2 className="size-4" />
//               </button>
//             </div>

//             <pre className="whitespace-pre-wrap bg-gray-50 border border-gray-300 rounded-md p-5 text-sm leading-relaxed">
//               {result}
//             </pre>
//           </div>
//         )}
//       </div>
//     </div>
//   );

return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 p-6">
    <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-3xl space-y-8 text-center">
      {/* <Lottie animationData={speakingGlobe} loop={true} className="h-40 mx-auto" /> */}

      <div>
        <h1 className="text-4xl font-extrabold text-gray-800">🌍 AI Translate</h1>
        <p className="text-sm text-gray-500 mt-2">Type or speak a sentence, and let AI handle the translation!</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <textarea
          className="textarea textarea-bordered w-full h-28 text-base"
          placeholder="Type or speak text to translate…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        
        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={handleVoiceInput}
            className={`btn ${listening ? "btn-warning" : "btn-accent"} shadow`}
          >
            🎤 {listening ? "Listening…" : "Speak"}
          </button>
        </div>

        <select
          className="select select-bordered w-full"
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
        >
          {LANGUAGES.map((lang) => (
            <option key={lang}>{lang}</option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full flex items-center justify-center gap-2 shadow"
        >
          {loading && <LoaderCircle className="animate-spin size-5" />}
          {loading ? "Translating…" : "Translate"}
        </button>
      </form>

      {result && (
        <div className="relative bg-gray-100 border border-gray-300 rounded-xl p-6 text-lg font-bold text-gray-800 text-left mt-6 shadow-inner">
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              onClick={handleCopy}
              className="btn btn-xs btn-ghost"
              title="Copy to clipboard"
            >
              <ClipboardCopy className="size-4" />
            </button>
            <button
              onClick={speakResult}
              className="btn btn-xs btn-ghost"
              title="Read aloud"
            >
              <Volume2 className="size-4" />
            </button>
          </div>

          <pre className="whitespace-pre-wrap leading-relaxed">{result}</pre>
        </div>
      )}
    </div>
  </div>
);

 }
