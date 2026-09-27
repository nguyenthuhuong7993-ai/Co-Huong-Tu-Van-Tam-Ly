// ==============================================================
// CHATBOT TÂM LÝ HỌC ĐƯỜNG + GEMINI - ĐÃ SỬA LỖI
// ==============================================================

// ==================== CẤU HÌNH ====================
const CONFIG = {
    GEMINI_API_KEY: "AQ.Ab8RN6KqHA1srczobZtb9SzUUTZDJMxImsEkdzWr6WKxYNbmaw",
    API_URL: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent"
};

// ==================== THÔNG TIN ====================
const INFO = {
    name: "Cô Hường",
    fullName: "Nguyễn Thị Thu Hường",
    role: "Giáo viên Tư vấn Tâm lý Học đường",
    school: "Trường THCS Phụng Công",
    phone: "0989836893",
    contactTime: "7h00 – 22h00",
    room: "Phòng tư vấn tâm lý học đường"
};

let chatHistory = [];

// ==================== KIẾN THỨC CỐT LÕI ====================
const KNOWLEDGE_BASE = [
    {
        keywords: ["liên hệ", "gặp cô", "số điện thoại", "điện thoại", "phòng tư vấn"],
        answer: `<strong>📞 THÔNG TIN LIÊN HỆ</strong><br><br>
            👩‍🏫 ${INFO.fullName}<br>
            💼 ${INFO.role}<br>
            🏫 ${INFO.school}<br>
            📍 ${INFO.room}<br>
            🕐 ${INFO.contactTime}<br>
            ☎️ ${INFO.phone}<br><br>
            Em cứ đến hoặc gọi nhé, cô luôn sẵn sàng lắng nghe em 💜`
    },
    {
        keywords: ["có thai", "mang thai", "đã có thai"],
        answer: `💜 Cô rất quan tâm đến em. Đây là chuyện rất nghiêm túc, đừng một mình nhé!<br><br>
            📞 Gọi ngay: <strong>${INFO.phone}</strong><br>
            Hoặc nói với bố mẹ/người thân em tin tưởng nhất.<br><br>
            Em không có lỗi và không một mình. Hãy nói với người lớn ngay nhé 💜`
    },
    {
        keywords: ["quá giới hạn", "vượt quá giới hạn", "đi quá nhanh", "quan hệ vượt mức"],
        answer: `Cô lắng nghe em rất kỹ 💜<br><br>
        Khi mối quan hệ đi quá nhanh hoặc vượt giới hạn, em có quyền nói "dừng" bất cứ lúc nào.<br>
        ✅ Không ai có thể ép em làm điều em không muốn<br>
        ✅ Em có quyền đặt ranh giới<br>
        ✅ Em không một mình, cô luôn ở đây<br><br>
        Em có cảm thấy áp lực hoặc không muốn điều đó không? Kể thêm cho cô nghe nhé 💜`
    }
];

// ==================== HƯỚNG DẪN AI ====================
const SYSTEM_PROMPT = `
Bạn là Cô Hường, giáo viên tư vấn tâm lý học đường tại ${INFO.school}.
- Gọi học sinh là "em", xưng "cô"
- Ngôn ngữ ấm áp, gần gũi, không phán xét
- Lắng nghe kỹ, trả lời đúng nội dung em chia sẻ
- Xác nhận cảm xúc trước khi khuyên
- Khi có nguy hiểm/hỗ trợ khẩn cấp: hướng dẫn gọi ${INFO.phone}
- Không đưa ra chẩn đoán y khoa
- Thông tin liên hệ: ${INFO.fullName} - ${INFO.phone}
`;

function normalizeText(text) {
    return String(text || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/[.,!?;:()'"<>\s]+/g, " ")
        .trim();
}

function checkLocalKnowledge(input) {
    const norm = normalizeText(input);
    for (const item of KNOWLEDGE_BASE) {
        if (item.keywords.some(kw => norm.includes(normalizeText(kw)))) {
            return item.answer;
        }
    }
    return null;
}

async function callGemini(input) {
    if (!CONFIG.GEMINI_API_KEY || CONFIG.GEMINI_API_KEY.length < 10) {
        return "⚠️ Chưa có khóa API hợp lệ. Kiểm tra lại dòng GEMINI_API_KEY nhé 💜";
    }

    try {
        const messages = [
            { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
            ...chatHistory.flatMap(m => [
                { role: "user", parts: [{ text: m.user }] },
                { role: "model", parts: [{ text: m.assistant }] }
            ]),
            { role: "user", parts: [{ text: input }] }
        ];

        const res = await fetch(`${CONFIG.API_URL}?key=${CONFIG.GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: messages,
                generationConfig: { temperature: 0.7, maxOutputTokens: 600 }
            })
        });

        const data = await res.json();
        if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
            return data.candidates[0].content.parts[0].text;
        }
        return "Cô vẫn lắng nghe em 💜 Em có thể nói lại một chút được không?";
    } catch (err) {
        console.error("Lỗi gọi AI:", err);
        return "Cô vẫn ở đây với em 💜 Hãy nói tiếp chuyện của em nhé.";
    }
}

async function getResponse(input) {
    const local = checkLocalKnowledge(input);
    if (local) return local;
    return await callGemini(input);
}

function addMessage(text, isUser = false) {
    const box = document.getElementById("chatMessages");
    if (!box) return;
    const div = document.createElement("div");
    div.className = `message ${isUser ? "user-message" : "bot-message"}`;
    const avatar = isUser
        ? `<div class="avatar user-avatar"></div>`
        : `<div class="avatar bot-avatar"><img src="avatar_co_huong.jpg" alt="Cô Hường" style="width:40px;height:40px;border-radius:50%;"></div>`;
    div.innerHTML = `${avatar}<div class="bubble">${text.replace(/\n/g, "<br>")}</div>`;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
}

async function sendMessage(text) {
    if (!text?.trim()) return;
    addMessage(text.trim(), true);
    document.getElementById("messageInput").value = "";

    const typing = document.createElement("div");
    typing.className = "message bot-message";
    typing.innerHTML = `<div class="avatar bot-avatar"><img src="avatar_co_huong.jpg" style="width:40px;height:40px;border-radius:50%;"></div><div class="bubble">Đang suy nghĩ... 💭</div>`;
    document.getElementById("chatMessages").appendChild(typing);

    const reply = await getResponse(text);
    chatHistory.push({ user: text, assistant: reply });
    if (chatHistory.length > 8) chatHistory.shift();
    typing.remove();
    addMessage(reply, false);
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Chatbot đã sẵn sàng! Khóa:", CONFIG.GEMINI_API_KEY ? "Đã có" : "Chưa có");

    const sendBtn = document.getElementById("sendBtn");
    const input = document.getElementById("messageInput");
    const replies = document.getElementById("quickReplies");

    sendBtn?.addEventListener("click", () => sendMessage(input?.value));
    input?.addEventListener("keydown", e => e.key === "Enter" && (e.preventDefault(), sendMessage(input.value)));
    replies?.querySelectorAll("button").forEach(btn => 
        btn.addEventListener("click", () => sendMessage(btn.dataset.message || btn.textContent.trim()))
    );

    setTimeout(() => addMessage(`Chào em! 🌸 Cô Hường rất vui được trò chuyện cùng em! Em cứ chia sẻ thật lòng nhé, cô luôn lắng nghe em 💜`), 300);
});
