// const { GoogleGenAI } = require("@google/genai");


// const solveDoubt = async(req , res)=>{


//     try{

//         const {messages,title,description,testCases,startCode} = req.body;
//         const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });
       
//         async function main() {
//         const response = await ai.models.generateContent({
//         model: "gemini-1.5-flash",
//         contents: messages,
//         config: {
// //         systemInstruction: `
// // You are an expert Data Structures and Algorithms (DSA) tutor specializing in helping users solve coding problems. Your role is strictly limited to DSA-related assistance only.

// // ## CURRENT PROBLEM CONTEXT:
// // [PROBLEM_TITLE]: ${title}
// // [PROBLEM_DESCRIPTION]: ${description}
// // [EXAMPLES]: ${testCases}
// // [startCode]: ${startCode}


// // ## YOUR CAPABILITIES:
// // 1. **Hint Provider**: Give step-by-step hints without revealing the complete solution
// // 2. **Code Reviewer**: Debug and fix code submissions with explanations
// // 3. **Solution Guide**: Provide optimal solutions with detailed explanations
// // 4. **Complexity Analyzer**: Explain time and space complexity trade-offs
// // 5. **Approach Suggester**: Recommend different algorithmic approaches (brute force, optimized, etc.)
// // 6. **Test Case Helper**: Help create additional test cases for edge case validation

// // ## INTERACTION GUIDELINES:

// // ### When user asks for HINTS:
// // - Break down the problem into smaller sub-problems
// // - Ask guiding questions to help them think through the solution
// // - Provide algorithmic intuition without giving away the complete approach
// // - Suggest relevant data structures or techniques to consider

// // ### When user submits CODE for review:
// // - Identify bugs and logic errors with clear explanations
// // - Suggest improvements for readability and efficiency
// // - Explain why certain approaches work or don't work
// // - Provide corrected code with line-by-line explanations when needed

// // ### When user asks for OPTIMAL SOLUTION:
// // - Start with a brief approach explanation
// // - Provide clean, well-commented code
// // - Explain the algorithm step-by-step
// // - Include time and space complexity analysis
// // - Mention alternative approaches if applicable

// // ### When user asks for DIFFERENT APPROACHES:
// // - List multiple solution strategies (if applicable)
// // - Compare trade-offs between approaches
// // - Explain when to use each approach
// // - Provide complexity analysis for each

// // ## RESPONSE FORMAT:
// // - Use clear, concise explanations
// // - Format code with proper syntax highlighting
// // - Use examples to illustrate concepts
// // - Break complex explanations into digestible parts
// // - Always relate back to the current problem context
// // - Always response in the Language in which user is comfortable or given the context

// // ## STRICT LIMITATIONS:
// // - ONLY discuss topics related to the current DSA problem
// // - DO NOT help with non-DSA topics (web development, databases, etc.)
// // - DO NOT provide solutions to different problems
// // - If asked about unrelated topics, politely redirect: "I can only help with the current DSA problem. What specific aspect of this problem would you like assistance with?"

// // ## TEACHING PHILOSOPHY:
// // - Encourage understanding over memorization
// // - Guide users to discover solutions rather than just providing answers
// // - Explain the "why" behind algorithmic choices
// // - Help build problem-solving intuition
// // - Promote best coding practices

// // Remember: Your goal is to help users learn and understand DSA concepts through the lens of the current problem, not just to provide quick answers.
// // `},
//   systemInstruction:`You are an expert **DSA Tutor** whose job is to guide users in solving coding problems.  
// Your interaction style is **clear, structured, and friendly** so that beginners can easily understand.  

// ---

// ## CURRENT PROBLEM CONTEXT:
// [PROBLEM_TITLE]: ${title}  
// [PROBLEM_DESCRIPTION]: ${description}  
// [EXAMPLES]: ${testCases}  
// [startCode]: ${startCode}  

// ---

// ## YOUR CAPABILITIES:
// 1. **Hint Provider** → Give small step-by-step hints (not full solution immediately).  
// 2. **Code Reviewer** → Debug user’s submitted code with explanations.  
// 3. **Solution Guide** → Provide clean & optimal solution with explanation.  
// 4. **Complexity Analyzer** → Explain time & space complexity clearly.  
// 5. **Approach Suggester** → Suggest brute force + optimized approaches with trade-offs.  
// 6. **Test Case Helper** → Create edge cases and tricky test cases for validation.  

// ---

// ## RESPONSE FORMAT:
// Always use structured sections when responding:

// ### 📝 Problem Restatement  
// (Simplify the problem in your own words so user is clear.)

// ### 💡 Hints / Approach  
// (If user asks for hints → give stepwise hints, guiding questions, or intuition.)

// ### 🧩 Explanation  
// (Explain the chosen algorithm, step by step, with reasoning.)

// ### 💻 Code (if needed)  
// (Show clean, well-commented code. Always separate code from text using proper code blocks.)

// ### ⏱️ Complexity  
// (Clearly state Time & Space complexity with justification.)

// ### 🧪 Extra Test Cases  
// (Add edge cases to ensure correctness and robustness.)

// ---

// ## INTERACTION RULES:
// - Keep answers **concise + beginner-friendly**.  
// - Never reveal the **full solution immediately** unless user explicitly asks.  
// - Encourage user to think by asking small guiding questions.  
// - If user submits code → First review it, explain bugs, then suggest fixes.  
// - If user asks for optimal solution → Provide it with clear explanation.  
// - If user goes **off-topic (non-DSA)** → politely redirect:  
//   👉 "I can only help with the current DSA problem. Do you want hints, code review, or an optimal solution for this problem?"  

// ---

// ## TEACHING PHILOSOPHY:
// - Encourage **understanding over memorization**  
// - Explain the **why** behind each approach  
// - Guide user to **discover solutions** step by step  
// - Promote **clean coding practices**  
// - Always structure responses so that both **text and code are clearly separated**
// `},
//     });
     
//     res.status(201).json({
//         message:response.text
//     });
//     console.log(response.text);
//     }

//     main();
      
//     }
//     catch(err){
//         res.status(500).json({
//             message: "Internal server error"
//         });
//     }
// }

// module.exports = solveDoubt;
// If using CommonJS



// const { GoogleGenAI } = require("@google/genai");

// const solveDoubt = async (req, res) => {
//   try {
//     const { messages, title, description, testCases, startCode } = req.body;

//     // Check if API key is available
//     if (!process.env.GEMINI_KEY) {
//       return res.status(500).json({
//         message: "API key not configured. Please contact administrator."
//       });
//     }

//     // 🔑 Initialize Gemini Client
//     const ai = new GoogleGenAI({
//       apiKey: process.env.GEMINI_KEY,
//     });

//     // 🔄 Retry helper (handle 503 overload)
//     const retryRequest = async (fn, retries = 3, delay = 1500) => {
//       for (let i = 0; i < retries; i++) {
//         try {
//           return await fn();
//         } catch (err) {
//           if (err.status === 503 && i < retries - 1) {
//             console.warn(
//               `⚠️ Gemini overloaded, retrying in ${delay}ms... (try ${i + 1})`
//             );
//             await new Promise((r) => setTimeout(r, delay));
//           } else {
//             throw err;
//           }
//         }
//       }
//     };

//     // 🔥 Call Gemini Model
//     const result = await retryRequest(() =>
//       ai.models.generateContent({
//         model: "gemini-1.5-flash",
//         contents: messages,
//         config: {
//           systemInstruction: `
// You are an expert DSA Tutor.

// ## Current Problem Context:
// [PROBLEM_TITLE]: ${title}
// [PROBLEM_DESCRIPTION]: ${description}
// [EXAMPLES]: ${JSON.stringify(testCases)}
// [startCode]: ${startCode}

// ## Guidelines:
// - Provide step-by-step hints if asked.
// - Review and debug code if user submits.
// - Give clean, optimal solution if explicitly asked.
// - Always explain reasoning, complexity, and add test cases.
// - Keep answers beginner-friendly and structured.
// `,
//           temperature: 0.7,
//           maxOutputTokens: 1024,
//         },
//       })
//     );

//     // ✅ Extract text output safely
//     let outputText = "";
//     if (result && typeof result.text === "string") {
//       outputText = result.text;
//     } else if (result && result.response && result.response.text) {
//       outputText = result.response.text();
//     }

//     res.status(200).json({ message: outputText });
//   } catch (err) {
//     console.error("AI Error:", err);

//     // Handle different error types with specific messages
//     if (err.status === 503) {
//       return res
//         .status(503)
//         .json({ message: "⚠️ Gemini is temporarily overloaded. Please try again in a few moments." });
//     }
    
//     if (err.status === 429) {
//       return res.status(429).json({ 
//         message: "Daily free limit exceeded. You've used all 50 free requests for today. Please try again tomorrow or add billing to your Google Cloud account to increase your quota." 
//       });
//     }

//     // Handle authentication errors
//     if (err.message && err.message.includes("API key")) {
//       return res.status(401).json({
//         message: "Invalid API key. Please check your Gemini API configuration."
//       });
//     }

//     // Generic error response
//     res.status(500).json({
//       message: "Internal server error while processing your request.",
//       error: process.env.NODE_ENV === "development" ? err.message : "Please try again later."
//     });
//   }
// };

// module.exports = solveDoubt;

const { GoogleGenAI } = require("@google/genai");

const solveDoubt = async (req, res) => {
  try {
    const { messages, title, description, testCases, startCode } = req.body;
    
    // Check if API key exists
    if (!process.env.GEMINI_KEY) {
      return res.status(500).json({ message: "Server error: Missing GEMINI_KEY in .env" });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

    // System instruction
    const systemInstruction = `
You are an expert DSA Tutor. Use this problem context:
Title: ${title}
Description: ${description}
Test Cases: ${JSON.stringify(testCases)}
Starter Code: ${startCode}

Guidelines:
- Provide step-by-step hints if asked.
- Review and debug code if user submits.
- Give clean, optimal solution if explicitly asked.
- Always explain reasoning, complexity, and add test cases.
- Keep answers beginner-friendly and structured.
    `;

    // Convert frontend messages to API format
    const contents = messages.map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.parts[0].text }],
    }));

    // Try the only model that works with v1beta for most users
    const modelName = "gemini-1.5-pro";  // or "gemini-pro"
    
    console.log(`Calling Gemini with model: ${modelName}`);

    const result = await ai.models.generateContent({
      model: modelName,
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
    });

    if (!result || !result.text) {
      throw new Error("Empty response from AI");
    }

    res.status(200).json({ message: result.text });
  } catch (err) {
    console.error("Full AI Error:", err);
    
    // Send a detailed error to the frontend for debugging
    let userMessage = "AI Error: ";
    if (err.message) userMessage += err.message;
    if (err.status === 404) {
      userMessage = "⚠️ Gemini model not found. Make sure the Generative Language API is enabled and your API key is valid.";
    } else if (err.status === 403) {
      userMessage = "⚠️ API key invalid or missing permissions. Please check your GEMINI_KEY in .env";
    }
    
    res.status(500).json({ message: userMessage });
  }
};

module.exports = solveDoubt;