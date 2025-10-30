import React, { useState } from "react";
import Header from "../components/Header";
import UploadSection from "../components/UploadSection";
import HistoryPanel from "../components/HistoryPanel";
import MetadataSection from "../components/MetadataSection";
import FeaturesSection from "../components/FeaturesSection";
import DashboardPage from "./DashboardPage";
import ProfilePage from "./ProfilePage";
import Login from "./Login";
import { jsPDF } from "jspdf";
import {
  FaCoins,
  FaChartLine,
  FaCogs,
  FaGlobe,
  FaLock,
  FaCamera,
  FaDatabase,
  FaUser,
  FaUpload,
  FaHistory,
  FaLanguage,
  FaDownload,
} from "react-icons/fa";

// TRANSLATIONS (kept here in Home as requested)
const translations = {
  en: {
    //coin_id: "Coin ID",
    //confidence: "Confidence",
    type: "Type",
    dynasty: "Dynasty",
    year: "Year",
    metal: "Metal",
    obverse: "Obverse",
    reverse: "Reverse",
    weight: "Weight",
    diameter: "Diameter",
    shape: "Shape",
    orientation: "Orientation",
    demonetized: "Demonetized",
    number: "Number",
    reference: "Reference",
    value: "Value",
    comment: "Comment",
    metadata: "Metadata",
    features: "Features",
    unknown: "Unknown",
  },
  ta: {
    //coin_id: "நாணய ஐடி",
    //confidence: "நம்பிக்கை அளவு",
    type: "வகை",
    dynasty: "வம்சம்",
    year: "ஆண்டு",
    metal: "உலோகம்",
    obverse: "முன்பக்கம்",
    reverse: "பின்பக்கம்",
    weight: "எடை",
    diameter: "விட்டம்",
    shape: "வடிவம்",
    orientation: "நிலை",
    demonetized: "புழக்கத்தில் இல்லை",
    number: "எண்",
    reference: "உறுதி",
    value: "மதிப்பு",
    comment: "கருத்து",
    metadata: "தகவல் விவரம்",
    features: "அம்சங்கள்",
    unknown: "தெரியவில்லை",
  },
};

async function translateToTamil(text) {
  try {
    const res = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ta&dt=t&q=${encodeURIComponent(
        text
      )}`
    );
    const data = await res.json();
    return data[0][0][0];
  } catch {
    return text;
  }
}

export default function Home({ setLoggedIn }) {
  const [loggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activePage, setActivePage] = useState("home");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);
  const [history, setHistory] = useState([]);
  const [language, setLanguage] = useState("en");
  const [translatedData, setTranslatedData] = useState(null);

  const translateAllValues = async (data) => {
    const translated = {};
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === "string" && value.trim() !== "") {
        translated[key] = await translateToTamil(value);
      } else {
        translated[key] = value;
      }
    }
    setTranslatedData(translated);
  };

  const handleLogin = () => {
    if (!email || !password) return alert("Enter both email and password!");
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: "Velmani R",
        email,
        role: "Admin",
        joined: new Date().toLocaleDateString(),
      })
    );
    setIsLoggedIn(true);
  };

  const handleAnalyze = async () => {
    if (!uploadedFile) return alert("Upload an image first!");
    const formData = new FormData();
    formData.append("file", uploadedFile);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Error analyzing image");
      const data = await response.json();

      const metadata = {
        coin_id: data.coin_id || "Unknown",
        confidence: data.confidence || 0,
        ...data.metadata,
        features: data.features || "Not available",
        image: URL.createObjectURL(uploadedFile),
        date: new Date().toLocaleString(),
      };

      setFetchedData(metadata);
      setHistory([metadata, ...history]);

      if (language === "ta") {
        await translateAllValues(metadata);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to analyze image. Make sure Flask backend is running.");
    }
  };

  const handleLanguageChange = async (e) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    if (selectedLang === "ta" && fetchedData) {
      await translateAllValues(fetchedData);
    }
  };

  const downloadPDF = () => {
    if (!fetchedData) return;
    const dataToUse = language === "ta" ? translatedData || fetchedData : fetchedData;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(language === "ta" ? "நாணய தகவல் விவரம்" : "Coin Metadata", 10, 10);

    if (fetchedData.image) {
      const img = new Image();
      img.src = fetchedData.image;
      doc.addImage(img, "JPEG", 130, 10, 60, 60);
    }

    let y = 80;
    Object.entries(dataToUse).forEach(([key, val]) => {
      if (key !== "image" && key !== "date") {
        const label = translations[language][key] || key;
        const value = val || translations[language].unknown;
        doc.text(`${label}: ${value}`, 10, y);
        y += 7;
      }
    });
    doc.save("coin_metadata.pdf");
  };

  // ---- RENDER LOGIN SCREEN (unchanged UI) ----
  if (!loggedIn) {
    return (
      <Login
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
    );
  }

  // Data for charts and features (same as before)
  const COLORS = ["#FFD700", "#C0C0C0", "#CD7F32"];
  const metalData = [
    { name: "Gold", value: history.filter((h) => h.metal === "Gold").length },
    { name: "Silver", value: history.filter((h) => h.metal === "Silver").length },
    { name: "Bronze", value: history.filter((h) => h.metal === "Bronze").length },
  ];
  const yearData = history.map((h) => ({ year: h.year, coins: 1 }));
  const displayData = language === "ta" ? translatedData || fetchedData : fetchedData;
  const user = JSON.parse(localStorage.getItem("user"));

  const features = [
    { icon: <FaCoins />, title: "Ancient Coin Detection", desc: "Identify coins with AI." },
    { icon: <FaCamera />, title: "Smart Image Capture", desc: "Upload or drag & drop photos." },
    { icon: <FaChartLine />, title: "Visual Analytics", desc: "Track historical data." },
    { icon: <FaLanguage />, title: "Multilingual", desc: "Switch between English & Tamil." },
    { icon: <FaDownload />, title: "PDF Export", desc: "Download metadata instantly." },
    { icon: <FaDatabase />, title: "Cloud Storage", desc: "Securely store analyzed coins." },
  ];

  return (
    <div
      style={{
        background: "#111324",
        color: "#fff",
        minHeight: "100vh",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <Header user={{ username: email }} setLoggedIn={setLoggedIn} handleNavClick={setActivePage} />

      <div style={{ padding: "20px" }}>
        {activePage === "home" && (
          <>
            {/* Upload + History */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
              <UploadSection
                uploadedFile={uploadedFile}
                setUploadedFile={setUploadedFile}
                handleAnalyze={handleAnalyze}
                language={language}
                handleLanguageChange={handleLanguageChange}
              />

              <HistoryPanel history={history} setFetchedData={setFetchedData} />
            </div>

            {/* Metadata + Features BELOW fetched data */}
            {fetchedData && (
              <>
                <MetadataSection
                  displayData={displayData}
                  translations={translations}
                  language={language}
                  downloadPDF={downloadPDF}
                />

                <FeaturesSection features={features} />
              </>
            )}
          </>
        )}

        {/* DASHBOARD */}
        {activePage === "dashboard" && <DashboardPage history={history} />}

        {/* PROFILE */}
        {activePage === "profile" && <ProfilePage user={user} />}
      </div>
    </div>
  );
}
