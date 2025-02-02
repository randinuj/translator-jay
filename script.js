const apiKey = "YOUR_GOOGLE_TRANSLATE_API_KEY"; 

document.getElementById("translateBtn").addEventListener("click", () => {
    let text = document.getElementById("inputText").value;
    let targetLang = document.getElementById("languageSelect").value;

    if (targetLang === "random") {
    const languages = [
        "en", "si", "fr", "de", "es", "zh", "hi", "ta", "ar", "bn", "ru", "ja", "ko", "it", "nl",
        "pt", "el", "tr", "he", "vi", "pl", "sv", "fi", "no", "da", "cs", "hu", "ro", "id", "th",
        "fa", "ur", "bg", "ms", "uk", "sr", "hr", "lt", "sk", "sl", "et", "lv", "mt", "is", "ga",
        "cy", "la"
    ];
    targetLang = languages[Math.floor(Math.random() * languages.length)];
    }

    translateText(text, targetLang);
});

document.getElementById("copyBtn").addEventListener("click", () => {
    let text = document.getElementById("translatedText").innerText;
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
});

async function translateText(text, targetLang) {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
    
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
            q: text,
            target: targetLang,
            format: "text"
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await response.json();
    document.getElementById("translatedText").innerText = data.data.translations[0].translatedText;
}
