import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!url) return alert("Please enter URL");

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:3000/api/download",
        { url },
        { responseType: "blob" }
      );

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(res.data);
      link.download = "audio.mp3";
      link.click();

      setUrl("");
      fetchHistory();
    } catch (error) {
      alert("Download failed");
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async () => {
    const res = await axios.get(
      "http://localhost:3000/api/download/history"
    );
    setHistory(res.data);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-bl from-black to-red-800 h-40 text-white flex flex-col items-center p-6">

      
      <h1 className="text-5xl font-bold mb-6 text-center">
        🎧 YouTube to MP3 Converter 🎧
      </h1>

      
      <div className="bg-red-100 p-6 rounded-2xl shadow-lg w-full max-w-xl">
        <input
          type="text"
          value={url}
          placeholder="Paste YouTube URL..."
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-3 rounded-lg text-black outline-none"
        />

        <button
          onClick={handleDownload}
          className="mt-4 w-full bg-red-500 hover:bg-red-600 p-3 rounded-lg font-semibold transition"
        >
          {loading ? "Downloading..." : "Download MP3"}
        </button>
      </div>

      <div className="mt-10 w-full max-w-xl">
        <h2 className="text-2xl font-semibold mb-4">📕Download History📕</h2>

        {history.length === 0 && (
          <p className="text-gray-400">No downloads yet</p>
        )}

        <div className="space-y-3">
          {history.map((item, index) => (
            <div
              key={index}
              className="bg-red-50 text-gray-800 p-4 rounded-lg flex justify-between items-center"
            >
              <span className="text-sm truncate w-3/4">
                {item.url}
              </span>

              <span className="text-xs text-gray-600">
                {new Date(item.createdAt).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default App;