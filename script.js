document.getElementById("translateBtn").addEventListener("click", async () => {
    const inputText = document.getElementById("inputText").value;
    let targetLang = document.getElementById("languageSelect").value;

    if (!inputText) {
        alert("Please enter a phrase!");
        return;
    }

    const coolLanguages = ["en", "si", "ta", "hi", "ur", "zh", "ja", "la", "ru", "de", "fr", "es", "it", "el", "ar", "he", "pt", "ko", "th"];

    if (targetLang === "random") {
        targetLang = coolLanguages[Math.floor(Math.random() * coolLanguages.length)];
    }

    try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=auto|${targetLang}`);
        const data = await response.json();
        
        if (data.responseData.translatedText) {
            document.getElementById("outputText").textContent = data.responseData.translatedText;
        } else {
            document.getElementById("outputText").textContent = "Translation failed.";
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("outputText").textContent = "Error translating.";
    }
});

document.getElementById("copyBtn").addEventListener("click", () => {
    const text = document.getElementById("outputText").textContent;
    navigator.clipboard.writeText(text).then(() => alert("Copied!"));
});
