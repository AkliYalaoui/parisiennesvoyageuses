// Function to translate text using Groq API
const translateText = async (text, targetLang) => {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "user",
              content: `Translate this into ${targetLang} without additional text: "${text}"`,
            },
          ],
        }),
      });
  
      const data = await res.json();
      
      return data.choices[0]?.message?.content?.trim() || text; // Return original if translation fails
    } catch (error) {
      console.error(`Translation to ${targetLang} failed:`, error);
      return text; // Fallback to original text
    }
  };
  
  export { translateText };
  