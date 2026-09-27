// ================================================================
// CHATBOT TÂM LÝ HỌC ĐƯỜNG - PHIÊN BẢN HOÀN CHỈNH & DỄ BỔ SUNG KIẾN THỨC
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

// ==================== LỊCH SỬ TRÒ CHUYỆN (ĐỂ HIỂU NGỮ CẢNH) ====================
let chatHistory = [];

// ==================== KHO KIẾN THỨC - DỄ THÊM/SỬA ====================
// CẤU TRÚC: {
//   keywords: ["từ khóa 1", "từ khóa 2", "..."],
//   answers: ["Câu trả lời 1", "Câu trả lời 2 (ngẫu nhiên)"]
// }
const KNOWLEDGE_BASE = [
    // === CHÀO HỎI & BẮT ĐẦU ===
    {
        keywords: ["chào", "xin chào", "em chào cô", "cô ơi", "bắt đầu", "chào em"],
        answers: [
            "Chào em 🌸 Cô Hường rất vui được trò chuyện cùng em! Em có thể chia sẻ về học tập, bạn bè, gia đình, cảm xúc hoặc bất kỳ điều gì đang băn khoăn. Em muốn kể chuyện gì trước? 💜",
            "Chào em 💜 Cô đang lắng nghe em đây. Em cứ nói tự nhiên nhất nhé, không cần diễn đạt hoàn hảo. Hôm nay điều gì khiến em suy nghĩ nhiều nhất?"
        ]
    },

    // === CẢM XÚC BUỒN, KHÓ KHĂN, TÂM SỰ ===
    {
        keywords: ["buồn", "khóc", "tủi thân", "cô đơn", "mệt", "khó khăn", "bế tắc", "nặng lòng", "khó nói", "hu hu", "khóc lóc"],
        answers: [
            "Ôi em yêu 💜 Cô ở đây với em đây. Khóc không phải yếu đuối đâu, đó là cách em giải tỏa nỗi lòng. Em có thể kể chi tiết hơn chuyện đang xảy ra được không? Cô lắng nghe em thật sự 🌸",
            "Em cứ nói ra nhé, không cần giữ trong lòng 💛 Cô không phán xét em đâu. Điều gì đang khiến em buồn nhất lúc này?",
            "Cảm ơn em đã tin tưởng chia sẻ 💜 Chia sẻ ra đã nhẹ hơn một chút chưa? Em cứ nói tiếp đi, cô đang lắng nghe từng lời em nói."
        ]
    },

    // === TÌNH CẢM TUỔI DẬY THÌ ===
    {
        keywords: ["thích", "yêu", "crush", "tình cảm", "bạn ấy", "cảm nắng", "rung động", "thích ai đó", "băn khoăn tình cảm"],
        answers: [
            "Cảm xúc rung động ở tuổi em là hoàn toàn bình thường và rất đẹp 💜\n✅ Thích không nhất thiết là yêu — đó là cảm xúc trong sáng, ban đầu\n✅ Ưu tiên phát triển bản thân và học tập trước\n✅ Không chia sẻ ảnh riêng tư, không làm điều mình không muốn\nEm đang băn khoăn điều gì nhất trong chuyện này?",
            "Cô hiểu mà 💛 Có cảm xúc với bạn khác giới chứng tỏ trái tim em rất ấm áp. Điều quan trọng là em luôn tôn trọng chính mình và người ấy. Em có muốn nói rõ hơn về chuyện này không?"
        ]
    },

    // === BỊ TỪ CHỐI, CHIA TAY ===
    {
        keywords: ["bị từ chối", "chia tay", "không được đáp lại", "bị bỏ rơi", "buồn tình cảm", "người ấy không thích", "thất vọng tình cảm"],
        answers: [
            "Bị từ chối không làm em kém đi giá trị đâu 💜 Dũng cảm dám bày tỏ đã rất đáng quý rồi. Hãy cho mình thời gian để vượt qua, người phù hợp sẽ đến khi em trưởng thành hơn 💛",
            "Buồn là hoàn toàn tự nhiên 💜 Cho mình thời gian nhé — không cần ép mình 'phải vui ngay'. Tập trung vào bản thân, bạn bè, sở thích... Cuộc sống còn nhiều điều đẹp khác chờ em 🌸"
        ]
    },

    // === HỌC TẬP & ÁP LỰC ===
    {
        keywords: ["học tập", "điểm số", "thi cử", "áp lực học", "sợ thi", "học không vào", "bố mẹ kỳ vọng", "so sánh", "học chậm", "mệt học"],
        answers: [
            "Điểm số quan trọng nhưng không quyết định giá trị của em 📚\n✅ Học 45 phút nghỉ 5–10 phút hiệu quả hơn học liên tục\n✅ Chia bài thành phần nhỏ dễ học hơn\n✅ Nói với bố mẹ: 'Con cố gắng hết sức với khả năng của mình'\nEm gặp khó khăn ở môn nào cụ thể?",
            "Mỗi người có tốc độ học khác nhau 💜 Không cần so sánh mình với ai, chỉ cần hôm nay tiến bộ hơn hôm qua là đủ rồi. Em muốn cải thiện điều gì nhất?"
        ]
    },

    // === BẠN BÈ & BẠO LỰC ===
    {
        keywords: ["bạn bè", "bị cô lập", "bị chê", "bắt nạt", "bị chế", "cãi nhau", "bạn xấu", "không có bạn", "bị lừa", "bị ép"],
        answers: [
            "Tình bạn thật sự dựa trên sự tôn trọng 💛\n✅ Nếu ai đó làm em tổn thương: có quyền nói 'KHÔNG' và đặt ranh giới\n✅ Bị bắt nạt KHÔNG phải lỗi của em — hãy nói ngay với giáo viên hoặc bố mẹ\n✅ Không cần cố gắng làm hài lòng mọi người\nEm có đang cảm thấy không an toàn không?",
            "Không ai xứng đáng khiến em nghi ngờ giá trị của chính mình 💜 Nếu mối quan hệ nào khiến em mệt mỏi, em hoàn toàn có quyền rời đi."
        ]
    },

    // === GIA ĐÌNH ===
    {
        keywords: ["gia đình", "bố mẹ", "cãi nhau", "không hiểu", "kiểm soát", "áp lực gia đình", "so sánh anh chị", "bố mẹ giận"],
        answers: [
            "Muốn độc lập và khác bố mẹ là hoàn toàn bình thường ở tuổi em 💜\n✅ Nói 'Con cảm thấy...' thay vì 'Bố mẹ luôn...' sẽ giảm cãi nhau\n✅ Viết thư nếu khó nói trực tiếp\n✅ Chọn lúc bình tĩnh để trao đổi\nEm có dám nói những suy nghĩ thật của mình với bố mẹ không?",
            "Bố mẹ cũng là người, họ có thể chưa hiểu em nhưng không có nghĩa là không yêu em 💛 Hãy cho họ thời gian để hiểu, cũng như em cần thời gian hiểu chính mình."
        ]
    },

    // === TỰ TIN & NGOẠI HÌNH ===
    {
        keywords: ["tự ti", "ngoại hình", "xấu hổ", "kém người", "so sánh", "không tự tin", "vẻ ngoài", "cân nặng", "da", "mặt mũi"],
        answers: [
            "Giá trị của em không nằm ở vẻ bề ngoài 💜 Mỗi người có vẻ đẹp riêng, không ai giống ai hoàn hảo. Hãy tập trung vào những điều em làm tốt và nhân cách của mình nhé 💛",
            "Hình ảnh trên mạng đã qua chỉnh sửa, không phải chuẩn thực tế 🌸 Em là chính em, không cần trở thành bản sao của ai khác. Em có điều mình làm tốt không?"
        ]
    },

    // === MUỐN TƯ VẤN / TÂM SỰ ===
    {
        keywords: ["tôi muốn được tư vấn", "tư vấn", "tôi muốn tâm sự", "tâm sự", "tôi đang gặp khó khăn", "cần giúp đỡ", "cần lắng nghe", "chia sẻ"],
        answers: [
            "Cô luôn ở đây để lắng nghe em 💜 Em cứ nói chi tiết hơn về chuyện đang xảy ra được không? Bắt đầu từ điều làm em nặng lòng nhất nhé, ví dụ: 'Em đang buồn vì...'",
            "Cảm ơn em đã tin tưởng 🌸 Không cần nói hoàn hảo đâu, em cứ kể tự nhiên như đang nói với người chị thân thiết vậy. Chuyện gì đang xảy ra với em?"
        ]
    },

    // === LIÊN HỆ TRỰC TIẾP ===
    {
        keywords: ["gặp cô", "liên hệ", "số điện thoại", "địa chỉ", "phòng tư vấn", "gặp trực tiếp", "gọi cho cô"],
        answers: [
            `📞 THÔNG TIN LIÊN HỆ<br><br>👩‍🏫 ${INFO.fullName}<br>💼 ${INFO.role}<br>🏫 ${INFO.school}<br>📍 ${INFO.room}<br>🕐 ${INFO.contactTime}<br>☎️ ${INFO.phone}<br><br>Em cứ đến hoặc gọi nhé, cô luôn sẵn sàng lắng nghe em 💜`
        ]
    },

    // === AN TOÀN & HỖ TRỢ NGAY ===
    {
        keywords: ["không muốn sống", "muốn đi", "mệt quá", "không ai quan tâm", "tuyệt vọng", "đau khổ", "tổn thương bản thân", "một mình"],
        answers: [
            "💜 Cô rất quan tâm đến em. Nếu em đang cảm thấy quá nặng nề, đừng ở một mình nhé!\nHãy tìm ngay người lớn em tin tưởng: bố mẹ, giáo viên hoặc gọi cô: <strong>${INFO.phone}</strong>\nEm rất đáng được yêu thương và giúp đỡ, đừng từ bỏ mình! 💜"
        ]
    }
];

// ==================== CÂU TRẢ LỜI MẶC ĐỊNH KHI CHƯA HIỂU ====================
const FALLBACK = [
    "Cô đang lắng nghe em 💜 Cô chưa hiểu rõ lắm, em có thể nói thêm một chút được không? Bắt đầu bằng: 'Em đang buồn vì...' hoặc 'Em đang lo lắng vì...' nhé 🌸",
    "Em cứ nói tiếp đi 💜 Cô đang lắng nghe em đây. Chuyện đó xảy ra như thế nào ạ?",
    "Cô hiểu em có điều muốn nói 💜 Em không cần hoàn hảo, cứ nói theo cách của mình nhé."
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

// ==================== TÌM KIẾM KIẾN THỨC PHÙ HỢP NHẤT ====================
function findAnswer(userInput) {
    const norm = normalizeText(userInput);
    if (!norm) return FALLBACK[Math.floor(Math.random() * FALLBACK.length)];

    // Lưu lịch sử để hiểu ngữ cảnh
    chatHistory.push({ input: userInput, normalized: norm, time: Date.now() });
    if (chatHistory.length > 5) chatHistory.shift(); // Giữ tối đa 5 tin gần nhất

    // Tìm chủ đề phù hợp nhất
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

    // Trả lời
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
    
    // Avatar
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

    // Hiển thị "Đang suy nghĩ..."
    setTimeout(() => {
        const reply = findAnswer(text);
        addMessage(reply, false);
    }, 600);
}

// ==================== KHỞI TẠO SAU KHI TRANG TẢI XONG ====================
document.addEventListener("DOMContentLoaded", function() {
    console.log("✅ Chatbot đã sẵn sàng! Số chủ đề:", KNOWLEDGE_BASE.length);

    // Nút gửi
    const sendBtn = document.getElementById("sendBtn");
    const messageInput = document.getElementById("messageInput");
    const quickReplies = document.getElementById("quickReplies");

    if (sendBtn) {
        sendBtn.addEventListener("click", () => sendMessage(messageInput?.value));
    }

    // Nhấn Enter gửi
    if (messageInput) {
        messageInput.addEventListener("keydown", e => {
            if (e.key === "Enter") {
                e.preventDefault();
                sendMessage(messageInput.value);
            }
        });
    }

    // Nút gợi ý
    if (quickReplies) {
        quickReplies.querySelectorAll("button").forEach(btn => {
            btn.addEventListener("click", () => {
                const msg = btn.dataset.message || btn.textContent.trim();
                sendMessage(msg);
            });
        });
    }

    // Lời chào đầu
    setTimeout(() => {
        addMessage(`Chào em! 🌸 Cô Hường rất vui được trò chuyện cùng em!\nNếu em có bất kỳ khó khăn, lo lắng nào trong học tập, bạn bè, gia đình hay cảm xúc, hãy chia sẻ với cô nhé 💜`);
    }, 300);
});
