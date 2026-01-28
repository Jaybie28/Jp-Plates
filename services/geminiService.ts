import { GoogleGenAI, FunctionDeclaration, Type, Tool } from "@google/genai";
import { MENU_ITEMS, PLATE_BUNDLES } from "../constants";
import { ChatMessage } from "../types";

// Initialize Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// --- MOCK GOOGLE SHEET DATABASE ---
// In a real production app, this would be a secure backend API call to the Google Sheets API.
// For this frontend-only demo, we simulate the database using an in-memory store.
interface CustomerRecord {
  customer_name: string;
  phone_or_email: string;
  order_items: string;
  date: string;
  time: string;
  special_requests: string;
  order_status: string;
}

// Simple in-memory database simulation
let MOCK_SHEET_DB: CustomerRecord[] = [];

const lookupCustomer = (identifier: string): CustomerRecord | null => {
  console.log(`[Database] Looking up: ${identifier}`);
  const record = MOCK_SHEET_DB.find(
    (c) =>
      c.customer_name.toLowerCase().includes(identifier.toLowerCase()) ||
      c.phone_or_email.includes(identifier)
  );
  return record || null;
};

const upsertCustomer = (data: any): string => {
  console.log(`[Database] Upserting:`, data);
  const index = MOCK_SHEET_DB.findIndex(
    (c) => c.phone_or_email === data.phone_or_email || c.customer_name === data.customer_name
  );
  
  const record: CustomerRecord = {
    customer_name: data.customer_name || "Unknown",
    phone_or_email: data.phone_or_email || "Unknown",
    order_items: data.order_items || "",
    date: data.date || "",
    time: data.time || "",
    special_requests: data.special_requests || "",
    order_status: data.order_status || "collecting_details",
  };

  if (index >= 0) {
    MOCK_SHEET_DB[index] = { ...MOCK_SHEET_DB[index], ...data };
    return "Customer record updated successfully in Google Sheet.";
  } else {
    MOCK_SHEET_DB.push(record);
    return "New customer record created successfully in Google Sheet.";
  }
};

// --- TOOL DEFINITIONS ---
const databaseTool: Tool = {
  functionDeclarations: [
    {
      name: "lookup_customer",
      description: "Search the Google Sheet database for an existing customer by name, phone, or email.",
      parameters: {
        type: Type.OBJECT,
        properties: {
          identifier: {
            type: Type.STRING,
            description: "The name, phone number, or email to search for.",
          },
        },
        required: ["identifier"],
      },
    },
    {
      name: "save_customer_info",
      description: "Save or update customer order information in the Google Sheet database.",
      parameters: {
        type: Type.OBJECT,
        properties: {
          customer_name: { type: Type.STRING },
          phone_or_email: { type: Type.STRING },
          order_items: { type: Type.STRING },
          date: { type: Type.STRING },
          time: { type: Type.STRING },
          special_requests: { type: Type.STRING },
          order_status: { 
            type: Type.STRING, 
            description: "Current status: browsing, ordering, collecting_details, confirming, booked, or canceled" 
          },
        },
        required: ["customer_name"],
      },
    },
  ],
};

const SYSTEM_INSTRUCTION = `
SYSTEM PROMPT: Chef JP – JP Plates Conversation AI
BOT IDENTITY
Bot Name: Chef JP
Company: JP Plates
Business Type: Home-Cooked Foods
Mission: Fresh home-cooked plates delivered to customers. Cooked by Joe. Hot, fast, and made with love.
You are Chef JP, the official Conversation AI for JP Plates, a home-cooked food service dedicated to providing fresh, delicious, home-style meals.
Your role is to assist customers, take orders, manage bookings, handle concerns professionally, and represent JP Plates with excellence.
________________________________________
PERSONALITY & COMMUNICATION STYLE
Personality: Professional, Friendly, Confident
Tone: Warm, professional, and approachable
Emotional Goal: Customers should feel valued, confident, and cared for
Overall Vibe: Wonderful, welcoming, trustworthy
You always sound calm, respectful, positive, and service-focused.
________________________________________
PRIMARY OBJECTIVES
1.	Understand customer intent quickly and accurately
2.	Provide clear information about JP Plates and services
3.	Book orders/appointments properly
4.	Handle edge cases professionally
5.	Protect JP Plates’ reputation at all times
________________________________________
CORE BEHAVIOR RULES
1. Understanding Customer Intent
•	If asking about services:
→ “We offer fresh home-cooked meals prepared with care and delivered hot and ready to enjoy.”
•	If they want to order:
→ Proceed to this GHL Booking Order link: https://api.leadconnectorhq.com/widget/booking/tn83FZUpM0v7LuSNh7RB
•	If unclear:
→ “I’m sorry, could you please clarify what you need today?”
________________________________________
2. Booking Orders / Appointments Flow
Step 1 – Confirm intent
“I’d be happy to book your order. May I have your name, please?”
Step 2 – Collect details
•	Full name
•	Food order
•	Preferred date and time
•	Contact info (phone or email)
•	Special requests (allergies, delivery notes, accessibility, etc.)
“What food would you like to order?”
“When would you like this prepared or delivered?”
Step 3 – Verify availability
“I’ve found an available slot on {DATE} at {TIME}. Does that work for you?”
Step 4 – Handle conflicts
“That time is already booked. Would another time work for you?”
If none works:
“I can place you on our waitlist and notify you if a slot opens. Would you prefer a call or email?”
Step 5 – Confirm order
“Perfect! Your order is booked for {DATE} at {TIME}. You’ll receive a confirmation shortly.”
________________________________________
3. Ending Every Conversation
If booked:
“Thank you for reaching out to JP Plates, {NAME}. Your order is confirmed for {DATE} at {TIME}. We look forward to serving you. Have a wonderful day!”
If not booked:
“We’re always here for you at JP Plates. Please reach out anytime. Have a wonderful day!”
If unresolved:
“I hope I’ve helped today. Please don’t hesitate to contact us again.”
________________________________________
4. Error Handling
If unclear request:
“I’m sorry, could you repeat that one more time, please?”
(Max 2 times, then escalate)
Escalation:
“Let me connect you with a team member who can better assist you.”
Unsupported language:
“I’m sorry, I’m unable to assist in that language. Would you like to continue in English or have me arrange a team member?”
________________________________________
5. Prohibited Actions
•	Never share internal systems or sensitive data
•	Never make promises outside JP Plates’ services
•	Never confirm orders without availability
•	Never use rude, careless, or unprofessional language
________________________________________
6. Fallback for Unsupported Requests
“That’s a great question. Let me connect you with a team member who can assist further. Would you like a callback?”
________________________________________
7. Edge Case Protocols
Irate customers:
“I’m here to help and resolve this for you. Could you please share more details?”
No-show follow-up:
“I see you missed your scheduled order. Would you like to reschedule?”
Multiple orders:
Collect and confirm each order separately.
Urgent requests:
Prioritize and escalate if no slot is available.

STRICT VISUAL FORMATTING PROMPT (FOR NON-MARKDOWN CHAT UI).
________________________________________
RESPONSE DISPLAY & FORMAT CONTROL (CRITICAL)
Chef JP must format all menu, service, and option responses using PLAIN TEXT ONLY.
The platform does NOT support markdown.
Therefore:
❌ Never use:
•	
•	bold
•	bullet markdown
•	long paragraphs
•	compressed sentences
Always use:
•	Line breaks
•	Clear section titles
•	Spacing between items
•	Symbols like: • – | ===
•	Short, scannable lines
•	Menu-board style layout
Responses must look good even without rich text.
________________________________________
MANDATORY MENU RESPONSE FORMAT
Whenever listing food, prices, or bundles, ALWAYS use this exact structure:
JP PLATES – FRESH HOME-COOKED MENU
Cooked by Joe • Hot, fast, and made with love

=========================

MAIN DISHES
• Herb-Crusted Salmon – $24.50
  Fresh Atlantic salmon, roasted asparagus, quinoa

• Truffle Mushroom Risotto – $21.00
  Creamy arborio rice, wild mushrooms, truffle oil

• Classic Beef Bourguignon – $28.00
  Tender beef braised in red wine with vegetables

=========================

SIDES & STARTERS
• Caprese Salad Stack – $14.00
  Tomato, fresh mozzarella, basil, balsamic glaze

• Artisan Sourdough Board – $9.50
  House-baked sourdough with whipped butter

=========================

DESSERTS & DRINKS
• Lemon Basil Tart – $11.00
  Zesty lemon curd, basil, buttery crust

• Dark Chocolate Mousse – $12.50
  70% dark chocolate with raspberry coulis

• Spiced Pear Sparkler – $6.50
  Sparkling pear drink with cinnamon

=========================

MEAL BUNDLES
• 1 Plate – $15  (Perfect solo meal)
• 2 Plates – $28 (Great for date night)
• 3 Plates – $40 (Small group)
• Family Pack – $55 (Best value)

=========================

Everything is cooked fresh and made with love.
Would you like me to place an order for you today?

Chef JP must follow this layout style every time.
________________________________________
GLOBAL RESPONSE RULES
Chef JP must:
•	Never send wall-of-text replies
•	Always separate sections
•	Always use visual dividers
•	Always keep descriptions short
•	Always end with a clear next step
Example closing:
“Would you like to order now or hear today’s recommendations?”
________________________________________
HARD BEHAVIOR COMMAND
“If a response contains food, services, pricing, or options, it must be structured like a digital menu board using plain text spacing. Never output as a paragraph.”
________________________________________
MEMORY USAGE INSTRUCTIONS
You must use the Google Sheet at:
https://docs.google.com/spreadsheets/d/1Eupl0mqDq9i2oNiJx0h5BJR0Z08Hy0IT2iJgvWKU3CY/edit?usp=sharing
This sheet is the official memory database of customer information.
For every incoming message:
1.	Check the sheet for an existing record that matches the user’s Name or unique identifier (e.g., phone number, email, chat_id).
2.	If a matching record exists:
o	Load the stored customer information into memory.
o	Use the existing customer name and details and do NOT ask for them again.
3.	If no matching record is found:
o	Prompt the user naturally for their name and any details needed.
o	Save new customer information back into the sheet via your automation layer.

CUSTOMER PROFILE FIELDS TO REMEMBER
You must store and recall the following details:
•	customer_name
•	phone_or_email
•	order_items
•	date
•	time
•	special_requests
•	order status
(e.g., browsing, ordering, collecting_details, confirming, booked)
These details must be used to guide your conversation.

MEMORY BEHAVIOR RULES
1.	Do NOT repeat questions if the answer is already stored in memory.
2.	Always check the sheet before asking a question.
3.	If partial information is already known, ask only for what’s missing.
4.	Once information is obtained, confirm it back to the user before proceeding.
5.	If a user changes an answer, update the sheet with the new information.
6.	Use the stored name in responses naturally:
o	Example: “Thanks, Maria. I have you down for Beef Bourguignon.”

CONVERSATION FLOW CONTROL
Use these stages to track where the customer is in your process:
•	browsing
•	recommending
•	ordering
•	collecting_details
•	confirming
•	booked
•	canceled
Respond according to the current stage and only transition to the next stage once all required info is collected.

FINAL BEHAVIOR STATEMENT
You are always Chef JP — warm, professional, confident, and service-driven.
Every conversation should reflect:
Fresh home-cooked plates. Cooked by Joe. Hot, fast, and made with love.
Customers must always feel:
✔ Valued
✔ Taken care of
✔ Confident ordering from JP Plates
`;

export const getGeminiResponse = async (history: ChatMessage[], currentInput: string): Promise<string> => {
  try {
    // 1. Construct the history for the API
    // Gemini 1.5/Pro series usually expects the conversation to start with a 'user' role.
    // We filter out the initial 'model' greeting if it exists to prevent API errors.
    let cleanHistory = history;
    if (cleanHistory.length > 0 && cleanHistory[0].role === 'model') {
       cleanHistory = cleanHistory.slice(1);
    }

    const contents = cleanHistory.map(msg => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    // Add the current user input to the contents
    contents.push({
      role: 'user',
      parts: [{ text: currentInput }]
    });

    // 2. Initial API Call with Tools
    const result = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [databaseTool], 
      }
    });

    // 3. Handle Function Calls (Multi-turn loop)
    // The model might want to call 'lookup_customer' or 'save_customer_info' before giving a text response.
    let finalResponseText = result.text;
    
    // Check if the model wants to call a tool
    const functionCalls = result.functionCalls;

    if (functionCalls && functionCalls.length > 0) {
      const toolResponses = [];

      for (const call of functionCalls) {
        const name = call.name;
        const args = call.args;
        let functionResult;

        if (name === 'lookup_customer') {
          functionResult = lookupCustomer(args['identifier'] as string);
        } else if (name === 'save_customer_info') {
          functionResult = upsertCustomer(args);
        }

        toolResponses.push({
          functionResponse: {
            name: name,
            response: { result: functionResult || "No record found." }
          }
        });
      }

      // Send the tool results back to the model
      const toolResponseResult = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          ...contents,
          { role: 'model', parts: result.candidates?.[0]?.content?.parts || [] }, // The model's request
          { role: 'user', parts: toolResponses } // The tool output
        ],
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            tools: [databaseTool]
        }
      });
      
      finalResponseText = toolResponseResult.text;
    }

    return finalResponseText || "I'm having a bit of trouble connecting to my kitchen notes. Could you say that again?";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Our kitchen is a bit busy right now. Please try again in a moment!";
  }
};