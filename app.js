// ================================================================
// CHATBOT TÂM LÝ HỌC ĐƯỜNG - ĐÃ SỬA THÔNG TIN LIÊN HỆ
// ================================================================

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

// ==================== KHO KIẾN THỨC ====================
const KNOWLEDGE_BASE = [
    // === CHÀO HỎI ===
    {
        keywords: ["chào", "xin chào", "em chào cô", "cô ơi", "bắt đầu", "chào em"],
        answers: [
            "Chào em 🌸 Cô Hường rất vui được trò chuyện cùng em! Em có thể chia sẻ về học tập, bạn bè, gia đình, cảm xúc hoặc bất kỳ điều gì đang băn khoăn. Em muốn kể chuyện gì trước? 💜",
            "Chào em 💜 Cô đang lắng nghe em đây. Em cứ nói tự nhiên nhất nhé, không cần diễn đạt hoàn hảo. Hôm nay điều gì khiến em suy nghĩ nhiều nhất?"
        ]
    },

    // === TƯ VẤN / TÂM SỰ ===
    {
        keywords: ["tôi muốn được tư vấn", "tư vấn", "tôi muốn tâm sự", "tâm sự", "tôi đang gặp khó khăn", "cần giúp đỡ", "cần lắng nghe", "chia sẻ"],
        answers: [
            "Cô luôn ở đây để lắng nghe em 💜 Em cứ nói chi tiết hơn về chuyện đang xảy ra được không? Bắt đầu từ điều làm em nặng lòng nhất nhé, ví dụ: 'Em đang buồn vì...'",
            "Cảm ơn em đã tin tưởng 🌸 Không cần nói hoàn hảo đâu, em cứ kể tự nhiên như đang nói với người chị thân thiết vậy. Chuyện gì đang xảy ra với em?"
        ]
    },

    // === CẢM XÚC BUỒN ===
    {
        keywords: ["buồn", "khóc", "tủi thân", "cô đơn", "mệt", "khó khăn", "bế tắc", "nặng lòng", "khó nói", "hu hu", "khóc lóc"],
        answers: [
            "Ôi em yêu 💜 Cô ở đây với em đây. Khóc không phải yếu đuối đâu, đó là cách em giải tỏa nỗi lòng. Em có thể kể chi tiết hơn chuyện đang xảy ra được không? Cô lắng nghe em thật sự 🌸",
            "Em cứ nói ra nhé, không cần giữ trong lòng 💛 Cô không phán xét em đâu. Điều gì đang khiến em buồn nhất lúc này?"
        ]
    },

    // === LIÊN HỆ / GẶP TRỰC TIẾP ===
    {
        keywords: ["gặp cô", "liên hệ", "số điện thoại", "điện thoại", "gọi", "địa chỉ", "phòng tư vấn", "gặp trực tiếp", "số cô", "liên lạc", "ở đâu", "thời gian tư vấn"],
        answers: [
            `<strong>📞 THÔNG TIN LIÊN HỆ TƯ VẤN</strong><br><br>
            👩‍🏫 <strong>Tên:</strong> ${INFO.fullName}<br>
            💼 <strong>Chức vụ:</strong> ${INFO.role}<br>
            🏫 <strong>Trường:</strong> ${INFO.school}<br>
            📍 <strong>Nơi:</strong> ${INFO.room}<br>
            🕐 <strong>Thời gian:</strong> ${INFO.contactTime}<br>
            ☎️ <strong>Điện thoại:</strong> ${INFO.phone}<br><br>
            Em cứ đến hoặc gọi bất kỳ lúc nào trong giờ nhé, cô luôn sẵn sàng lắng nghe em 💜`
        ]
    },

    // === TÌNH CẢM ===
    {
        keywords: ["thích", "yêu", "crush", "tình cảm", "bạn ấy", "cảm nắng", "rung động", "bị từ chối", "chia tay"],
        answers: [
            "Cảm xúc rung động ở tuổi em là hoàn toàn bình thường và rất đẹp 💜\n✅ Thích không nhất thiết là yêu\n✅ Ưu tiên phát triển bản thân và học tập trước\n✅ Không chia sẻ ảnh riêng tư, không làm điều mình không muốn\nEm có muốn nói rõ hơn về chuyện này không?"
        ]
    },

    // === HỌC TẬP ===
    {
        keywords: ["học tập", "điểm số", "thi cử", "áp lực học", "sợ thi", "học không vào", "bố mẹ kỳ vọng", "so sánh", "điểm kém"],
        answers: [
            "Điểm số quan trọng nhưng không quyết định giá trị của em 📚\n✅ Học 45 phút nghỉ 5–10 phút hiệu quả hơn\n✅ Chia bài thành phần nhỏ dễ học hơn\n✅ Nói với bố mẹ: 'Con cố gắng hết sức với khả năng của mình'\nEm gặp khó khăn ở môn nào cụ thể?"
        ]
    },

    // === GIA ĐÌNH ===
    {
        keywords: ["gia đình", "bố mẹ", "cãi nhau", "không hiểu", "kiểm soát", "áp lực gia đình"],
        answers: [
            "Muốn độc lập và khác bố mẹ là hoàn toàn bình thường ở tuổi em 💜\n✅ Nói 'Con cảm thấy...' thay vì 'Bố mẹ luôn...' sẽ giảm cãi nhau\n✅ Viết thư nếu khó nói trực tiếp\nEm có dám nói những suy nghĩ thật của mình với bố mẹ không?"
        ]
    },

    // === BẢO LỰC / AN TOÀN ===
    {
        keywords: ["bắt nạt", "bị cô lập", "bị chê", "bị ép", "bị làm tổn thương", "nguy hiểm", "không an toàn", "bị đe dọa"],
        answers: [
            "Em không có lỗi trong chuyện này 💜 Hãy nói ngay với giáo viên chủ nhiệm, bố mẹ hoặc cô tư vấn nhé — đó không phải 'mách lẻo' mà là bảo vệ chính mình.\n📞 Số điện thoại cô: <strong>${INFO.phone}</strong>\nEm có đang ở trong tình huống không an toàn không?"
        ]
    },

    // === SUY NGHĨ NẶNG NỀ ===
    {
        keywords: ["không muốn sống", "muốn đi", "mệt quá", "không ai quan tâm", "tuyệt vọng", "tổn thương bản thân"],
        answers: [
            "💜 Cô rất quan tâm đến em. Nếu em đang cảm thấy quá nặng nề, đừng ở một mình nhé!\nHãy tìm ngay người lớn em tin tưởng hoặc gọi cô: <strong>${INFO.phone}</strong>\nEm rất đáng được yêu thương và giúp đỡ, đừng từ bỏ mình! 💜"
        ]
    }
];

// ==================== CÂU TRẢ LỜI MẶC ĐỊNH ====================
const FALLBACK = [
    "Cô đang lắng nghe em 💜 Cô chưa hiểu rõ lắm, em có thể nói thêm một chút được không? Bắt đầu bằng: 'Em đang buồn vì...' hoặc 'Em đang lo lắng vì...' nhé 🌸",
    "Em cứ nói tiếp đi 💜 Cô đang lắng nghe em đây. Chuyện đó xảy ra như thế nào ạ?"
];

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

// ==================== TÌM CÂU TRẢ LỜI ====================
function findAnswer(userInput) {
    const norm = normalizeText(userInput);
    if (!norm) return "Em hãy nhập điều muốn chia sẻ nhé 💜";

    chatHistory.push({ input: userInput, normalized: norm, time: Date.now() });
    if (chatHistory.length > 5) chatHistory.shift();

    let bestMatch = null;
    let bestScore = 0;

    for (const topic of KNOWLEDGE_BASE) {
        let score = 0;
        for (const kw of topic.keywords) {
            const kwNorm = normalizeText(kw);
            if (kwNorm && norm.includes(kwNorm)) {
                score += kwNorm.length * 2;
            }
        }
        // Tăng điểm nếu có ngữ cảnh liên quan
        if (score > 0 && chatHistory.length >= 2) {
            const prevMsg = chatHistory[chatHistory.length - 2].normalized;
            for (const kw of topic.keywords) {
                if (prevMsg.includes(normalizeText(kw))) score += 5;
            }
        }
        if (score > bestScore) {
            bestScore = score;
            bestMatch = topic;
        }
    }

    if (bestMatch && bestScore > 0) {
        return bestMatch.answers[Math.floor(Math.random() * bestMatch.answers.length)];
    }
    return FALLBACK[Math.floor(Math.random() * FALLBACK.length)];
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
function sendMessage(text) {
    if (!text || !text.trim()) return;
    
    addMessage(text.trim(), true);
    const input = document.getElementById("messageInput");
    if (input) input.value = "";

    setTimeout(() => {
        const reply = findAnswer(text);
        addMessage(reply, false);
    }, 600);
}

// ==================== KHỞI TẠO ====================
document.addEventListener("DOMContentLoaded", function() {
    console.log("✅ Chatbot đã sẵn sàng! Số chủ đề:", KNOWLEDGE_BASE.length);

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
