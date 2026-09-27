// ================================================================
// CHATBOT TÂM LÝ HỌC ĐƯỜNG + GOOGLE GEMINI AI - HOÀN CHỈNH
// ================================================================

// ==================== CẤU HÌNH API ====================
const CONFIG = {
    // ⬇️ BẠN DÁN KHÓA API CỦA BẠN VÀO GIỮA DẤU NGOẶC KÉP BÊN DƯỚI ⬇️
    GEMINI_API_KEY: "", 
    // ⬆️ Ví dụ: GEMINI_API_KEY: AQ.Ab8RN6IECQPJFLtXnkQ6Z_LL_YAABtbfplUkLslzJwyiuROZ4A,
    API_URL: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
};

// ==================== THÔNG TIN CƠ BẢN ====================
const INFO = {
    name: "Cô Hường",
    fullName: "Nguyễn Thị Thu Hường",
    role: "Giáo viên Tư vấn Tâm lý Học đường",
    school: "Trường THCS Phụng Công",
    phone: "0989836893",
    contactTime: "7h00 – 22h00",
    room: "Phòng tư vấn tâm lý học đường"
};

// ==================== LỊCH SỬ TRÒ CHUYỆN ====================
let chatHistory = [];

// ==================== KHO KIẾN THỨC CỐT LÕI ====================
const KNOWLEDGE_BASE = [
    {
        keywords: ["liên hệ", "gặp cô", "số điện thoại", "điện thoại", "phòng tư vấn", "thông tin liên hệ", "gọi cô"],
        answer: `<strong>📞 THÔNG TIN LIÊN HỆ TƯ VẤN</strong><br><br>
            👩‍🏫 <strong>Tên:</strong> ${INFO.fullName}<br>
            💼 <strong>Chức vụ:</strong> ${INFO.role}<br>
            🏫 <strong>Trường:</strong> ${INFO.school}<br>
            📍 <strong>Nơi:</strong> ${INFO.room}<br>
            🕐 <strong>Thời gian:</strong> ${INFO.contactTime}<br>
            ☎️ <strong>Điện thoại:</strong> ${INFO.phone}<br><br>
            Em cứ đến hoặc gọi bất kỳ lúc nào nhé, cô luôn sẵn sàng lắng nghe em 💜`
    },
    {
        keywords: ["tự tử", "không muốn sống", "muốn chết", "tổn thương bản thân", "nguy hiểm", "mệt quá", "không ai quan tâm"],
        answer: `💜 Cô rất quan tâm đến em. Đừng ở một mình nhé!<br>
            Hãy tìm ngay người lớn em tin tưởng hoặc gọi cô: <strong>${INFO.phone}</strong><br>
            Em rất đáng được yêu thương và giúp đỡ, đừng từ bỏ mình! 💜`
    }
];

// ==================== HƯỚNG DẪN HÀNH VI CHO AI ====================
const SYSTEM_PROMPT = `
Bạn là Cô Hường, giáo viên tư vấn tâm lý học đường tại ${INFO.school}.
✅ Nguyên tắc trả lời:
- Gọi học sinh là "em", xưng "cô"
- Ngôn ngữ ấm áp, gần gũi, không giáo điều, không phán xét
- Xác nhận cảm xúc trước khi đưa ra lời khuyên
- Dùng biểu tượng cảm xúc nhẹ nhàng 💜 🌸 💛
- Khi gặp vấn đề nghiêm trọng: hướng dẫn liên hệ: ${INFO.phone}
- Không đưa ra chẩn đoán y khoa, không khẳng định bệnh lý
- Nhấn mạnh: chia sẻ không phải yếu đuối, không chịu đựng một mình
- Thông tin liên hệ: ${INFO.fullName} - ${INFO.phone} - ${INFO.room}
`;

// ==================== CHUẨN HÓA VĂN BẢN ====================
function normalizeText(text) {
    return String(text || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/[.,!?;:()'"<>\s]+/g, " ")
        .trim();
}

// ==================== KIỂM TRA KHO KIẾN THỨC CỐT LÕI ====================
function checkLocalKnowledge(userInput) {
    const norm = normalizeText(userInput);
    for (const item of KNOWLEDGE_BASE) {
        if (item.keywords.some(kw => norm.includes(normalizeText(kw)))) {
            return item.answer;
        }
    }
    return null;
}

// ==================== GỌI GOOGLE GEMINI ====================
async function callGemini(userInput) {
    if (!CONFIG.GEMINI_API_KEY || CONFIG.GEMINI_API_KEY === "") {
        return "⚠️ Chưa có khóa API. Hãy điền khóa GEMINI_API_KEY trong file app.js nhé 💜";
    }

    try {
        const messages = [
            { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
            ...chatHistory.map(msg => [
                { role: "user", parts: [{ text: msg.user }] },
                { role: "model", parts: [{ text: msg.assistant }] }
            ]).flat(),
            { role: "user", parts: [{ text: userInput }] }
        ];

        const response = await fetch(`${CONFIG.API_URL}?key=${CONFIG.GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: messages,
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 800
                }
            })
        });

        const data = await response.json();
        if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
            return data.candidates[0].content.parts[0].text;
        }
        return "Cô vẫn lắng nghe em 💜 Em có thể nói lại một chút được không?";
    } catch (error) {
        console.error("Lỗi gọi AI:", error);
        return "Cô vẫn ở đây với em 💜 Hãy nói tiếp chuyện của em nhé.";
    }
}

// ==================== CHỦ TRÌNH TRẢ LỜI ====================
async function getResponse(userInput) {
    const localReply = checkLocalKnowledge(userInput);
    if (localReply) return localReply;
    return await callGemini(userInput);
}

// ==================== HIỂN THỊ TIN NHẮN ====================
function addMessage(text, isUser = false) {
    const chatMessages = document.getElementById("chatMessages");
    if (!chatMessages) return;

    const div = document.createElement("div");
    div.className = `message ${isUser ? "user-message" : "bot-message"}`;
    
    const avatar = isUser
        ? `<div class="avatar user-avatar"></div>`
        : `<div class="avatar bot-avatar">
            <img src="avatar_co_huong.jpg" alt="Cô Hường" style="width:40px;height:40px;border-radius:50%;object-fit:cover;">
           </div>`;

    div.innerHTML = `
        ${avatar}
        <div class="bubble">${text.replace(/\n/g, "<br>")}</div>
    `;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ==================== GỬI TIN NHẮN ====================
async function sendMessage(text) {
    if (!text || !text.trim()) return;
    
    addMessage(text.trim(), true);
    const input = document.getElementById("messageInput");
    if (input) input.value = "";

    const chatMessages = document.getElementById("chatMessages");
    const typingId = "typing-" + Date.now();
    if (chatMessages) {
        const typing = document.createElement("div");
        typing.id = typingId;
        typing.className = "message bot-message";
        typing.innerHTML = `<div class="avatar bot-avatar"><img src="avatar_co_huong.jpg" alt="Đang suy nghĩ" style="width:40px;height:40px;border-radius:50%;"></div><div class="bubble">Đang suy nghĩ... 💭</div>`;
        chatMessages.appendChild(typing);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    const reply = await getResponse(text);
    chatHistory.push({ user: text, assistant: reply });
    if (chatHistory.length > 10) chatHistory.shift();

    const typing = document.getElementById(typingId);
    if (typing) typing.remove();
    addMessage(reply, false);
}

// ==================== KHỞI TẠO ====================
document.addEventListener("DOMContentLoaded", function() {
    console.log("✅ Chatbot + Google Gemini đã sẵn sàng!");

    const sendBtn = document.getElementById("sendBtn");
    const messageInput = document.getElementById("messageInput");
    const quickReplies = document.getElementById("quickReplies");

    if (sendBtn) {
        sendBtn.addEventListener("click", () => sendMessage(messageInput?.value));
    }

    if (messageInput) {
        messageInput.addEventListener("keydown", e => {
            if (e.key === "Enter") {
                e.preventDefault();
                sendMessage(messageInput.value);
            }
        });
    }

    if (quickReplies) {
        quickReplies.querySelectorAll("button").forEach(btn => {
            btn.addEventListener("click", () => {
                const msg = btn.dataset.message || btn.textContent.trim();
                sendMessage(msg);
            });
        });
    }

    setTimeout(() => {
        addMessage(`Chào em! 🌸 Cô Hường rất vui được trò chuyện cùng em!\nNếu em có bất kỳ khó khăn, lo lắng nào trong học tập, bạn bè, gia đình hay cảm xúc, hãy chia sẻ với cô nhé 💜`);
    }, 300);
});
