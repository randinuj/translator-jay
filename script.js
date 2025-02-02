document.getElementById("translateBtn").addEventListener("click", async () => {
    const inputText = document.getElementById("inputText").value;
    let targetLang = document.getElementById("languageSelect").value;

    if (!inputText) {
        alert("Please enter a phrase!");
        return;
    }

    const coolLanguages = ["EN", "SI", "TA", "HI", "UR", "ZH", "JA", "LA", "RU", "DE", "FR", "ES", "IT", "EL", "AR", "HE", "PT", "KO", "TH"];

    if (targetLang === "random") {
        targetLang = coolLanguages[Math.floor(Math.random() * coolLanguages.length)];
    }

    try {
        const apiKey = 'YOUR_DEEPL_API_KEY';  // Replace with your DeepL API key
        const response = await fetch(`https://api-free.deepl.com/v2/translate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                auth_key: apiKey,
                text: inputText,
                target_lang: targetLang,
            }),
        });

        const data = await response.json();

        if (data.translations && data.translations[0]) {
            document.getElementById("outputText").textContent = data.translations[0].text;
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
