// ================================================================
// CHATBOT TƯ VẤN TÂM LÝ HỌC ĐƯỜNG - BẢN SỬA LỖI NÚT & Ô NHẬP LIỆU
// ================================================================

// ================================================================
// 1. KHAI BÁO BIẾN TOÀN CỤC
// ================================================================
let messageInput, sendBtn, chatMessages, quickReplies;

// ================================================================
// 2. THÔNG TIN CHATBOT
// ================================================================
const INFO = {
    name: "Cô Hường",
    fullName: "Nguyễn Thị Thu Hường",
    role: "Giáo viên tư vấn tâm lý học đường",
    school: "Trường THCS Phụng Công",
    phone: "0989836893",
    contactTime: "7h00 – 22h00",
    room: "Phòng tư vấn tâm lý học đường"
};

// ================================================================
// 3. CHUẨN HÓA VĂN BẢN TIẾNG VIỆT
// ================================================================
function normalizeText(text) {
    return String(text || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/[.,!?;:()[\]{}"'']/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

// ================================================================
// 4. KHO KIẾN THỨC TƯ VẤN
// ================================================================
const KNOWLEDGE = {
    chao_hoi: {
        priority: 20,
        keywords: ["chao", "xin chao", "co oi", "em chao co", "co a", "bat dau"],
        responses: [
            `Chào em 🌸 Cô Hường rất vui được trò chuyện cùng em!\nEm có thể chia sẻ về học tập, bạn bè, gia đình, cảm xúc hoặc bất kỳ điều gì đang băn khoăn. Em muốn kể chuyện gì trước? 💜`,
            `Chào em 💜 Cô đang lắng nghe em đây. Em cứ nói tự nhiên nhất nhé, không cần diễn đạt hoàn hảo. Hôm nay điều gì khiến em suy nghĩ nhiều nhất?`
        ]
    },
    tu_van_kho_khan: {
        priority: 95,
        keywords: ["toi muon duoc tu van", "can tu van", "muon tam su", "dang gap kho khan", "co giup em voi", "kho khan", "can nguoi lang nghe"],
        responses: [
            `Cô luôn ở đây để lắng nghe em 💜\nEm có thể kể chi tiết hơn về chuyện đang xảy ra được không? Không cần sợ, mọi điều em chia sẻ sẽ được giữ kín trừ khi em gặp nguy hiểm.\nEm đang cảm thấy thế nào?`,
            `Cảm ơn em đã tin tưởng chia sẻ 🌱\nEm cứ nói theo cách của mình nhé, không cần hoàn hảo. Hãy bắt đầu từ điều làm em nặng lòng nhất: "Em đang buồn vì..." hoặc "Em đang lo lắng vì..."\nCô sẽ cùng em tìm hướng giải quyết. 💜`
        ]
    },
    cam_xuc: {
        priority: 90,
        keywords: ["buon", "lo lang", "cang thang", "met moi", "tuc gian", "co don", "tu ti", "khong vui", "khoc"],
        responses: [
            `Những cảm xúc này đều rất bình thường và đáng được lắng nghe 💜\n- Buồn, lo lắng, mệt mỏi là phản ứng tự nhiên khi có áp lực\n- Khóc không phải yếu đuối, đó là cách giải tỏa cảm xúc\n- Không cần một mình chịu đựng mọi thứ\nEm có muốn chia sẻ cụ thể hơn không?`,
            `Em không đơn độc đâu 💛\nKhi cảm thấy quá nặng nề, hãy thử:\n✅ Nói với người em tin tưởng\n✅ Viết ra giấy những suy nghĩ\n✅ Hít thở sâu, nghỉ ngơi một chút\nEm đang cảm thấy điều gì nhất?`
        ]
    },
    hoc_tap: {
        priority: 85,
        keywords: ["hoc tap", "diem so", "thi cu", "ap luc hoc", "so thi", "hoc khong vao", "bo me ky vong", "so sanh"],
        responses: [
            `Điểm số quan trọng nhưng không quyết định giá trị của em 📚\n✅ Học 45 phút nghỉ 5–10 phút hiệu quả hơn học liên tục\n✅ Chia bài thành phần nhỏ dễ học hơn\n✅ Nói với bố mẹ: "Con cố gắng hết sức với khả năng của mình"\nEm gặp khó khăn ở môn nào hoặc chuyện gì cụ thể?`,
            `Mỗi người có tốc độ học khác nhau 💜\nKhông cần so sánh mình với ai, chỉ cần hôm nay tiến bộ hơn hôm qua là đủ rồi.\nEm muốn cải thiện điều gì nhất trong học tập?`
        ]
    },
    ban_be: {
        priority: 85,
        keywords: ["ban be", "tinh ban", "bi bo roi", "cai nhau", "bi bat nat", "bi che", "co don", "khong co ban"],
        responses: [
            `Tình bạn thật sự dựa trên sự tôn trọng và chân thành 💛\n✅ Nếu bạn làm em tổn thương: có quyền nói "không" và đặt ranh giới\n✅ Chất lượng quan trọng hơn số lượng bạn bè\n✅ Nếu bị bắt nạt: hãy nói ngay với giáo viên hoặc bố mẹ — không phải "mách lẻo" mà là bảo vệ chính mình\nEm đang gặp chuyện gì với bạn bè vậy?`,
            `Không ai xứng đáng khiến em cảm thấy tồi tệ về chính mình 💜\nNếu mối quan hệ khiến em mệt mỏi, có quyền dừng lại.\nEm có đang cảm thấy không an toàn hoặc bị tổn thương không?`
        ]
    },
    gia_dinh: {
        priority: 80,
        keywords: ["gia dinh", "cha me", "bo me", "cai nhau voi bo me", "bi kiem soat", "ap luc gia dinh", "khong hieu"],
        responses: [
            `Muốn độc lập và khác bố mẹ là hoàn toàn bình thường ở tuổi em 💜\n✅ Nói "Con cảm thấy..." thay vì "Bố mẹ luôn..." sẽ giảm cãi nhau\n✅ Viết thư nếu khó nói trực tiếp\n✅ Chọn lúc bình tĩnh để trao đổi\nEm có dám nói những suy nghĩ thật của mình với bố mẹ không?`,
            `Bố mẹ cũng là người, họ có thể chưa hiểu em nhưng không có nghĩa là không yêu em 💛\nHãy cho họ thời gian để hiểu em cũng cần thời gian để hiểu chính mình.\nEm muốn được hỗ trợ điều gì trong chuyện này?`
        ]
    },
    tinh_cam: {
        priority: 85,
        keywords: ["tinh cam", "thich", "yeu", "crush", "chia tay", "bi tu choi", "buon tinh cam", "hen ho"],
        responses: [
            `Cảm xúc rung động ở tuổi em là hoàn toàn bình thường và rất đẹp 💜\n✅ Thích không nhất thiết là yêu, đó là cảm xúc trong sáng ban đầu\n✅ Ưu tiên học tập và phát triển bản thân trước\n✅ Không chia sẻ ảnh riêng tư, không làm điều mình không muốn\nEm đang băn khoăn điều gì nhất?`,
            `Bị từ chối hoặc chia tay không làm em kém đi giá trị 💛\nCho mình thời gian để buồn, rồi tiếp tục phát triển — người phù hợp sẽ đến khi em trưởng thành hơn.\nEm có muốn chia sẻ thêm không?`
        ]
    },
    lien_he: {
        priority: 100,
        keywords: ["lien he", "so dien thoai", "gap co", "dia chi", "phong tu van", "can gap co"],
        responses: [
            `📞 THÔNG TIN LIÊN HỆ TƯ VẤN<br><br>👩‍🏫 ${INFO.fullName}<br>💼 ${INFO.role}<br>🏫 ${INFO.school}<br>📍 ${INFO.room}<br>🕐 ${INFO.contactTime}<br>☎️ ${INFO.phone}<br><br>Em cứ đến hoặc gọi bất kỳ lúc nào nhé, cô luôn sẵn sàng lắng nghe em 💜`
        ]
    }
};

// ================================================================
// 5. KIỂM TRA AN TOÀN - ƯU TIÊN CAO NHẤT
// ================================================================
const SAFETY_KEYWORDS = {
    nguy_hiem: ["muon tu ban", "khong muon song", "lam hai ban than", "dang bi danh", "bi xam hai", "bi ep buoc", "muon chet", "tu tu"],
    can_ho_tro: ["rat met", "khong con hy vong", "khong ai hieu", "tuyet vong"]
};

function checkSafety(text) {
    const norm = normalizeText(text);
    
    if (SAFETY_KEYWORDS.nguy_hiem.some(k => norm.includes(normalizeText(k)))) {
        return `💜 Cô rất quan tâm đến em. Nếu em đang có những suy nghĩ này, đừng ở một mình nhé.\nHãy tìm ngay người lớn em tin tưởng: bố mẹ, giáo viên hoặc gọi cô: ${INFO.phone}\nEm rất đáng được yêu thương và giúp đỡ, đừng từ bỏ mình! 💜`;
    }
    
    return null;
}

// ================================================================
// 6. HÀM TRẢ LỜI CHÍNH
// ================================================================
function getResponse(userText) {
    const normalized = normalizeText(userText);
    if (!normalized) return `Em hãy nhập điều muốn chia sẻ nhé 💜`;
    
    // Kiểm tra an toàn trước
    const safety = checkSafety(userText);
    if (safety) return safety;
    
    // Tìm chủ đề phù hợp nhất
    let bestTopic = null;
    let bestScore = 0;
    
    for (const [name, topic] of Object.entries(KNOWLEDGE)) {
        let score = 0;
        for (const kw of topic.keywords) {
            const nkw = normalizeText(kw);
            if (normalized.includes(nkw)) score += nkw.length * 2;
        }
        if (score > 0) score += topic.priority;
        if (score > bestScore) {
            bestScore = score;
            bestTopic = name;
        }
    }
    
    if (bestTopic && bestScore > 0) {
        const replies = KNOWLEDGE[bestTopic].responses;
        return replies[Math.floor(Math.random() * replies.length)];
    }
    
    // Câu trả lời mặc định
    return `Cô đang lắng nghe em 💜 Cô chưa hiểu rõ lắm, em có thể nói thêm một chút được không? Hoặc chọn các gợi ý bên dưới:\n- "Tôi muốn được tư vấn"\n- "Tôi đang gặp khó khăn"\n- "Tôi muốn tâm sự"\nCô luôn ở đây cùng em 🌸`;
}

// ================================================================
// 7. HIỂN THỊ TIN NHẮN
// ================================================================
function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML.replace(/\n/g, "<br>");
}

function addMessage(text, isUser = false) {
    if (!chatMessages) return;
    const div = document.createElement("div");
    div.className = `message ${isUser ? "user" : "bot"}`;
    div.innerHTML = `
        <div class="message-bubble">
            ${escapeHTML(text)}
        </div>
    `;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ================================================================
// 8. GỬI TIN NHẮN
// ================================================================
function sendMessage(text) {
    if (!text || !text.trim()) return;
    
    addMessage(text.trim(), true);
    if (messageInput) messageInput.value = "";
    
    // Hiển thị "Đang suy nghĩ..."
    setTimeout(() => {
        const reply = getResponse(text);
        addMessage(reply, false);
    }, 500);
}

// ================================================================
// 9. KHỞI TẠO SAU KHI TRANG TẢI XONG
// ================================================================
document.addEventListener("DOMContentLoaded", function() {
    console.log("✅ Trang đã tải xong, khởi tạo chatbot...");
    
    // Lấy các phần tử giao diện
    messageInput = document.getElementById("messageInput");
    sendBtn = document.getElementById("sendBtn");
    chatMessages = document.getElementById("chatMessages");
    quickReplies = document.getElementById("quickReplies");
    
    // Kiểm tra và báo lỗi nếu thiếu
    if (!messageInput) console.warn("⚠️ Không tìm thấy ô nhập liệu (id='messageInput')");
    if (!sendBtn) console.warn("⚠️ Không tìm thấy nút gửi (id='sendBtn')");
    if (!chatMessages) console.warn("⚠️ Không tìm thấy vùng tin nhắn (id='chatMessages')");
    if (!quickReplies) console.warn("⚠️ Không tìm thấy vùng nút gợi ý (id='quickReplies')");
    
    // Gắn sự kiện NÚT GỬI
    if (sendBtn) {
        sendBtn.addEventListener("click", function() {
            sendMessage(messageInput ? messageInput.value : "");
        });
    }
    
    // Gắn sự kiện NHẬN ENTER
    if (messageInput) {
        messageInput.addEventListener("keydown", function(e) {
            if (e.key === "Enter") {
                e.preventDefault();
                sendMessage(messageInput.value);
            }
        });
    }
    
    // Gắn sự kiện NÚT GỢI Ý
    if (quickReplies) {
        const buttons = quickReplies.querySelectorAll("button");
        console.log("🔍 Tìm thấy", buttons.length, "nút gợi ý");
        
        buttons.forEach(btn => {
            btn.addEventListener("click", function() {
                const msg = this.dataset.message || this.textContent.trim();
                console.log("✅ Nhấn nút:", msg);
                sendMessage(msg);
            });
        });
    }
    
    // Lời chào đầu tiên
    setTimeout(() => {
        if (chatMessages && chatMessages.children.length === 0) {
            addMessage(`Chào em! 🌸 Cô Hường rất vui được trò chuyện cùng em!\nNếu em có bất kỳ khó khăn, lo lắng nào trong học tập, bạn bè, gia đình hay cảm xúc, hãy chia sẻ với cô nhé 💜`);
        }
    }, 300);
});
