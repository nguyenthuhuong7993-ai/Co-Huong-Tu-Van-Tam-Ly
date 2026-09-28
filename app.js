<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cô Hường - Tư vấn Tâm lý Học đường</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', Roboto, sans-serif; }
        body { background: #f0eefc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; }
        
        .chat-container {
            width: 100%; max-width: 540px;
            background: white;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(99, 102, 241, 0.15);
            display: flex; flex-direction: column; overflow: hidden;
        }

        /* ===== HEADER ===== */
        .chat-header {
            background: linear-gradient(90deg, #6366f1, #7c3aed);
            color: white;
            padding: 16px 20px;
            display: flex; align-items: center; gap: 12px;
        }
        .header-avatar {
            width: 40px; height: 40px;
            background: rgba(255,255,255,0.25);
            border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            font-size: 18px;
        }
        .header-info { flex: 1; }
        .header-name { font-weight: 600; font-size: 15px; }
        .header-role { font-size: 12px; opacity: 0.85; margin-top: 2px; }
        .status-badge {
            font-size: 12px;
            background: rgba(255,255,255,0.18);
            padding: 4px 10px;
            border-radius: 12px;
            display: flex; align-items: center; gap: 5px;
        }
        .status-dot {
            width: 7px; height: 7px;
            background: #86efac;
            border-radius: 50%;
        }

        /* ===== KHU VỰC TIN NHẮN ===== */
        .chat-messages {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            min-height: 420px;
            background: #fafbff;
        }
        .message {
            display: flex; gap: 10px; margin-bottom: 20px; align-items: flex-start;
        }
        .user-message { flex-direction: row-reverse; }
        
        .msg-avatar {
            width: 36px; height: 36px;
            border-radius: 50%; flex-shrink: 0;
            display: flex; align-items: center; justify-content: center;
            font-size: 16px;
        }
        .bot-message .msg-avatar { background: #eef2ff; color: #6366f1; }
        .user-message .msg-avatar { background: #e5e7eb; color: #4b5563; }
        
        .msg-content {
            padding: 12px 16px;
            border-radius: 18px;
            max-width: 76%;
            line-height: 1.55;
            font-size: 14.5px;
        }
        .bot-message .msg-content {
            background: white;
            border: 1px solid #e6e7f9;
            border-radius: 18px 18px 18px 6px;
            color: #1f2937;
        }
        .user-message .msg-content {
            background: #6366f1;
            color: white;
            border-radius: 18px 18px 6px 18px;
        }
        .typing-indicator { color: #9ca3af; font-size: 13px; }

        /* ===== NÚT GỢI Ý NHANH ===== */
        .quick-replies {
            display: flex; flex-wrap: wrap; gap: 8px;
            padding: 12px 20px;
            background: white;
            border-top: 1px solid #f0f0f7;
        }
        .quick-btn {
            padding: 9px 14px;
            background: #f3f4f6;
            border: none; border-radius: 20px;
            font-size: 13px;
            cursor: pointer;
            transition: all 0.2s;
            color: #374151;
        }
        .quick-btn:hover { background: #e5e7eb; }

        /* ===== Ô NHẬP & NÚT GỬI ===== */
        .input-area {
            display: flex; gap: 10px;
            padding: 16px 20px;
            background: white;
            border-top: 1px solid #f0f0f7;
        }
        .input-box {
            flex: 1;
            padding: 12px 18px;
            border: 1px solid #e5e7eb;
            border-radius: 24px;
            outline: none;
            font-size: 14.5px;
            transition: border-color 0.2s;
        }
        .input-box:focus { border-color: #6366f1; }
        .send-btn {
            width: 42px; height: 42px;
            border-radius: 50%;
            background: #6366f1;
            color: white;
            border: none;
            cursor: pointer;
            font-size: 16px;
            transition: background 0.2s;
        }
        .send-btn:hover { background: #4f46e5; }

        .footer-text {
            text-align: center;
            padding: 8px;
            font-size: 11px;
            color: #9ca3af;
        }
    </style>
</head>
<body>
    <div class="chat-container">
        <!-- HEADER -->
        <div class="chat-header">
            <div class="header-avatar">👩‍🏫</div>
            <div class="header-info">
                <div class="header-name">Cô Hường</div>
                <div class="header-role">Giáo viên Tư vấn Tâm lý Học đường</div>
            </div>
            <div class="status-badge">
                <span class="status-dot"></span>
                Trực tuyến
            </div>
        </div>

        <!-- KHU VỰC TIN NHẮN -->
        <div class="chat-messages" id="chatMessages"></div>

        <!-- NÚT GỢI Ý NHANH -->
        <div class="quick-replies" id="quickReplies">
            <button class="quick-btn" data-text="Tôi muốn được tư vấn">Tôi muốn được tư vấn</button>
            <button class="quick-btn" data-text="Tôi đang gặp khó khăn">Tôi đang gặp khó khăn</button>
            <button class="quick-btn" data-text="Tôi muốn tâm sự">Tôi muốn tâm sự</button>
        </div>

        <!-- Ô NHẬP & NÚT GỬI -->
        <div class="input-area">
            <input type="text" class="input-box" id="messageInput" placeholder="Nhập câu hỏi của em...">
            <button class="send-btn" id="sendBtn">
                <i class="fas fa-paper-plane"></i>
            </button>
        </div>

        <div class="footer-text">Chatbot Cô Hường • Luôn lắng nghe em 💜</div>
    </div>

    <script>
        // ================= THÔNG TIN LIÊN HỆ =================
        const INFO = {
            name: "Cô Hường",
            fullName: "Nguyễn Thị Thu Hường",
            role: "Giáo viên tư vấn tâm lý học đường",
            school: "Trường THCS Phụng Công",
            phone: "0989836893",
            contactTime: "7h00 – 22h00",
            room: "Phòng tư vấn tâm lý học đường"
        };

        // ================= CHUẨN HÓA VĂN BẢN =================
        function normalizeText(text) {
            return String(text || "")
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/đ/g, "d")
                .replace(/[.,!?;:()[\]{}"'`]/g, " ")
                .replace(/\s+/g, " ")
                .trim();
        }

        // ================= KHO KIẾN THỨC =================
        const KNOWLEDGE = {
            chao_hoi: {
                priority: 20,
                keywords: ["chao", "xin chao", "co oi", "em chao co", "bat dau", "hello", "hi"],
                responses: [
                    "Chào em! 🌸 Cô Hường rất vui được trò chuyện cùng em!<br>Em có thể chia sẻ về bất kỳ điều gì đang băn khoăn nhé 💜",
                    "Chào em! 💜 Cô luôn ở đây lắng nghe em. Em cứ nói thật lòng những điều mình nghĩ nhé!"
                ]
            },
            tu_van_tong_quat: {
                priority: 90,
                keywords: ["tu van", "muon duoc tu van", "can ho tro", "co giup em", "gap kho khan", "kho khan", "tam su", "chia se"],
                responses: [
                    "Cô rất sẵn lòng lắng nghe em 💜 Em có thể kể rõ hơn về chuyện đang xảy ra không? Em cứ nói tự nhiên nhất nhé!",
                    "Cô đang lắng nghe em 🌱 Em muốn chia sẻ về điều gì: cảm xúc, học tập, bạn bè, gia đình hay chuyện khác? Kể cho cô nghe nhé!"
                ]
            },
            cam_xuc: {
                priority: 85,
                keywords: ["buon", "met", "lo lang", "so", "tuc gian", "khong vui", "co don", "cam xuc"],
                responses: [
                    "Những cảm xúc như buồn, mệt, lo lắng đều rất bình thường 💜 Khóc cũng không phải yếu đuối đâu.<br>Em có thể nói rõ hơn em đang cảm thấy như thế nào không?",
                    "Cảm xúc của em luôn đáng được lắng nghe 💛 Viết ra giấy những điều em nghĩ sẽ giúp nhẹ lòng hơn. Em đang buồn/lo về chuyện gì?"
                ]
            },
            hoc_tap: {
                priority: 85,
                keywords: ["hoc tap", "diem", "thi", "ap luc", "so thi", "hoc khong vao", "bo me ky vong", "so sanh", "kho mon"],
                responses: [
                    "Điểm số quan trọng nhưng không phải là tất cả giá trị của em 📚<br>✅ Học 45 phút nghỉ 5–10 phút<br>✅ Chia nhỏ bài thành từng phần<br>✅ Nói với gia đình: 'Con cố gắng hết sức mình'<br>Em đang áp lực từ đâu nhiều nhất?",
                    "Mỗi người có tốc độ học khác nhau 💜 Không cần chạy đua với ai. Em gặp khó khăn ở môn nào hoặc chuyện nào?"
                ]
            },
            ban_be: {
                priority: 85,
                keywords: ["ban be", "tinh ban", "cai nhau", "bi bo roi", "bi bat nat", "che gieu", "co lap", "noi xau", "bao luc"],
                responses: [
                    "Tình bạn đẹp là khi em cảm thấy thoải mái, được tôn trọng 💜<br>Nếu bạn khiến em mệt mỏi hoặc sợ hãi → đó không phải tình bạn lành mạnh. Em đang gặp chuyện gì với bạn bè?",
                    "Bị cô lập, chế giễu, bắt nạt KHÔNG PHẢI LỖI CỦA EM ⚠️ Hãy nói ngay với người lớn em tin tưởng: bố mẹ, giáo viên hoặc cô.<br>📞 " + INFO.phone + "<br>Em có đang trải qua điều này không?"
                ]
            },
            gia_dinh: {
                priority: 80,
                keywords: ["gia dinh", "cha me", "bo me", "cai nhau", "khong hieu", "so sanh", "kiem soat", "nghiem khac"],
                responses: [
                    "Muốn độc lập và có ý kiến riêng ở tuổi em là hoàn toàn bình thường 💜<br>✅ Nói: 'Con cảm thấy...' thay vì đối đầu<br>✅ Viết thư nếu khó nói trực tiếp<br>✅ Bố mẹ yêu em theo cách của họ, dù đôi khi không đúng cách<br>Em có dám chia sẻ với bố mẹ không?",
                    "Khác biệt thế hệ tạo khoảng cách, nhưng hiểu nhau sẽ thu hẹp lại 💛 Em muốn cô hướng dẫn cách nói chuyện với bố mẹ không?"
                ]
            },
            lien_he: {
                priority: 100,
                keywords: ["lien he", "so dien thoai", "gap co", "phong tu van", "sdt", "co o dau"],
                responses: [
                    "<strong>📞 THÔNG TIN LIÊN HỆ</strong><br><br>👩‍🏫 " + INFO.fullName + "<br>💼 " + INFO.role + "<br>🏫 " + INFO.school + "<br>📍 " + INFO.room + "<br>🕐 " + INFO.contactTime + "<br>☎️ " + INFO.phone + "<br><br>Em cứ đến hoặc gọi nhé, cô luôn sẵn sàng 💜"
                ]
            },
            an_toan: {
                priority: 150,
                keywords: ["muon lam hai", "khong muon song", "dang bi danh", "bi de doa", "bi xam hai", "can cuu", "nguy hiem"],
                responses: [
                    "<strong>💜 Ưu tiên an toàn của em!</strong><br><br>Nếu em đang gặp nguy hiểm hoặc có ý nghĩ làm đau bản thân, hãy tìm ngay người lớn đáng tin cậy hoặc gọi:<br>📞 <strong>" + INFO.phone + "</strong><br>Em không đơn độc, đừng từ bỏ nhé 💛"
                ]
            }
        };

        // ================= KIỂM TRA AN TOÀN =================
        function checkSafety(text) {
            const norm = normalizeText(text);
            const dangerWords = ["lam hai ban than", "khong muon song", "muon tu tu", "dang bi danh", "bi de doa", "bi xam hai"];
            for (let i = 0; i < dangerWords.length; i++) {
                if (norm.includes(normalizeText(dangerWords[i]))) {
                    return "<strong>💜 Ưu tiên an toàn của em!</strong><br><br>Hãy tìm ngay người lớn đáng tin cậy hoặc gọi:<br>📞 <strong>" + INFO.phone + "</strong><br>Em không đơn độc đâu 💛";
                }
            }
            return null;
        }

        // ================= NHẬN DIỆN CHỦ ĐỀ =================
        function detectTopic(text) {
            const norm = normalizeText(text);
            let best = null;
            let maxScore = 0;
            for (const name in KNOWLEDGE) {
                if (KNOWLEDGE.hasOwnProperty(name)) {
                    const topic = KNOWLEDGE[name];
                    let score = 0;
                    for (let i = 0; i < topic.keywords.length; i++) {
                        const nkw = normalizeText(topic.keywords[i]);
                        if (norm.includes(nkw)) {
                            score += nkw.length * 2;
                        }
                    }
                    if (score > 0) {
                        score += topic.priority;
                        if (score > maxScore) {
                            maxScore = score;
                            best = name;
                        }
                    }
                }
            }
            return best;
        }

        // ================= LẤY CÂU TRẢ LỜI =================
        function getReply(userText) {
            if (!userText.trim()) {
                return "Em hãy nhập điều muốn chia sẻ nhé 💜";
            }
            
            const safety = checkSafety(userText);
            if (safety) {
                return safety;
            }

            const topic = detectTopic(userText);
            if (topic) {
                const list = KNOWLEDGE[topic].responses;
                return list[Math.floor(Math.random() * list.length)];
            }
            const fallback = [
                "Cô đang lắng nghe em 💜 Em có thể nói rõ hơn về điều mình đang nghĩ không?",
                "Cô chưa hiểu hết nhưng luôn lắng nghe em 🌱 Em thử nói thêm về chuyện đó nhé!"
            ];
            return fallback[Math.floor(Math.random() * fallback.length)];
        }

        // ================= BIẾN TOÀN CỤC =================
        const messageInput = document.getElementById("messageInput");
        const sendBtn = document.getElementById("sendBtn");
        const chatMessages = document.getElementById("chatMessages");
        const quickReplies = document.getElementById("quickReplies");

        // ================= THÊM TIN NHẮN RA MÀN HÌNH =================
        function addMessage(text, isUser) {
            if (typeof isUser === "undefined") {
                isUser = false;
            }
            const div = document.createElement("div");
            div.className = "message " + (isUser ? "user-message" : "bot-message");
            div.innerHTML =
                '<div class="msg-avatar">' + (isUser ? "👤" : "👩‍🏫") + '</div>' +
                '<div class="msg-content">' + text + '</div>';
            chatMessages.appendChild(div);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        // ================= HIỆU ỨNG ĐANG GÕ =================
        function showTyping() {
            const div = document.createElement("div");
            div.id = "typing";
            div.className = "message bot-message";
            div.innerHTML =
                '<div class="msg-avatar">👩‍🏫</div>' +
                '<div class="msg-content typing-indicator">Đang suy nghĩ... 💭</div>';
            chatMessages.appendChild(div);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        function hideTyping() {
            const el = document.getElementById("typing");
            if (el) {
                el.parentNode.removeChild(el);
            }
        }

        // ================= CHỨC NĂNG GỬI TIN =================
        function sendMessage(text) {
            const cleanText = text.trim();
            if (!cleanText) {
                return;
            }

            // Hiện tin nhắn người dùng
            addMessage(cleanText, true);
            messageInput.value = "";

            // Hiện trạng thái đang gõ
            showTyping();
            setTimeout(function() {
                hideTyping();
                const reply = getReply(cleanText);
                addMessage(reply, false);
            }, 700);
        }

        // === GẮN SỰ KIỆN - HOẠT ĐỘNG TRÊN MỌI TRÌNH DUYỆT ===
        // Nút gửi
        sendBtn.addEventListener("click", function() {
            sendMessage(messageInput.value);
        });

        // Nhấn Enter gửi
        messageInput.addEventListener("keydown", function(e) {
            if (e.key === "Enter") {
                e.preventDefault();
                sendMessage(messageInput.value);
            }
        });

        // Nút gợi ý nhanh
        const quickBtns = quickReplies.querySelectorAll(".quick-btn");
        for (let i = 0; i < quickBtns.length; i++) {
            quickBtns[i].addEventListener("click", function() {
                sendMessage(this.getAttribute("data-text"));
            });
        }

        // === LỜI CHÀO MỞ ĐẦU ===
        addMessage("<strong>Chào em! 🌸</strong><br><br>Cô Hường rất vui được trò chuyện cùng em!<br>Nếu em có bất kỳ khó khăn, lo lắng trong học tập, bạn bè, gia đình hay cảm xúc, hãy chia sẻ với cô nhé 💜");
    </script>
</body>
</html>
