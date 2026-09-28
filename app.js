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
        .status-dot { width: 7px; height: 7px; background: #86efac; border-radius: 50%; }

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
            background: white; border: 1px solid #e6e7f9;
            border-radius: 18px 18px 18px 6px; color: #1f2937;
        }
        .user-message .msg-content {
            background: #6366f1; color: white;
            border-radius: 18px 18px 6px 18px;
        }
        .typing-indicator { color: #9ca3af; font-size: 13px; }

        .quick-replies {
            display: flex; flex-wrap: wrap; gap: 8px;
            padding: 12px 20px;
            background: white; border-top: 1px solid #f0f0f7;
        }
        .quick-btn {
            padding: 9px 14px; background: #f3f4f6;
            border: none; border-radius: 20px; font-size: 13px;
            cursor: pointer; transition: all 0.2s; color: #374151;
        }
        .quick-btn:hover { background: #e5e7eb; }

        .input-area {
            display: flex; gap: 10px; padding: 16px 20px;
            background: white; border-top: 1px solid #f0f0f7;
        }
        .input-box {
            flex: 1; padding: 12px 18px;
            border: 1px solid #e5e7eb; border-radius: 24px;
            outline: none; font-size: 14.5px;
        }
        .input-box:focus { border-color: #6366f1; }
        .send-btn {
            width: 42px; height: 42px; border-radius: 50%;
            background: #6366f1; color: white; border: none;
            cursor: pointer; font-size: 16px;
        }
        .send-btn:hover { background: #4f46e5; }

        .footer-text {
            text-align: center; padding: 8px;
            font-size: 11px; color: #9ca3af;
        }
    </style>
</head>
<body>
    <div class="chat-container">
        <div class="chat-header">
            <div class="header-avatar">👩‍🏫</div>
            <div class="header-info">
                <div class="header-name">Cô Hường</div>
                <div class="header-role">Giáo viên Tư vấn Tâm lý Học đường</div>
            </div>
            <div class="status-badge">
                <span class="status-dot"></span>Trực tuyến
            </div>
        </div>

        <div class="chat-messages" id="chatMessages"></div>

        <div class="quick-replies" id="quickReplies">
            <button class="quick-btn" id="q1">Tôi muốn được tư vấn</button>
            <button class="quick-btn" id="q2">Tôi đang gặp khó khăn</button>
            <button class="quick-btn" id="q3">Tôi muốn tâm sự</button>
        </div>

        <div class="input-area">
            <input type="text" class="input-box" id="messageInput" placeholder="Nhập câu hỏi của em...">
            <button class="send-btn" id="sendBtn">
                <i class="fas fa-paper-plane"></i>
            </button>
        </div>

        <div class="footer-text">Chatbot Cô Hường • Luôn lắng nghe em 💜</div>
    </div>

    <script>
        const INFO = {
            phone: "0989836893",
            fullName: "Nguyễn Thị Thu Hường",
            role: "Giáo viên tư vấn tâm lý học đường",
            school: "Trường THCS Phụng Công",
            contactTime: "7h00 – 22h00",
            room: "Phòng tư vấn tâm lý học đường"
        };

        function normalizeText(text) {
            return String(text || "").toLowerCase()
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                .replace(/đ/g, "d").replace(/[.,!?;:()[\]{}"'`]/g, " ")
                .replace(/\s+/g, " ").trim();
        }

        const KNOWLEDGE = {
            chao: {
                keys: ["chao", "xin chao", "co oi", "hello", "hi"],
                res: ["Chào em! 🌸 Cô Hường rất vui được trò chuyện cùng em!<br>Nếu em có khó khăn, lo lắng, hãy chia sẻ nhé 💜"]
            },
            tu_van: {
                keys: ["tu van", "muon duoc tu van", "can ho tro", "chia se", "tam su", "gap kho khan", "kho khan"],
                res: [
                    "Cô luôn sẵn sàng lắng nghe em 💜 Em muốn nói về chuyện gì vậy?",
                    "Cô đang lắng nghe em 🌱 Hãy cứ tự nhiên chia sẻ những điều em nghĩ nhé!"
                ]
            },
            hoc_tap: {
                keys: ["hoc tap", "diem", "thi", "ap luc", "hoc khong vao", "bo me ky vong"],
                res: [
                    "Điểm số không phải là tất cả giá trị của em 💜 Em có thể chia sẻ cụ thể hơn không?",
                    "Mỗi người có tốc độ học khác nhau 💛 Em gặp khó khăn ở đâu?"
                ]
            },
            ban_be: {
                keys: ["ban be", "cai nhau", "bi bo roi", "bi bat nat", "che gieu", "co lap"],
                res: [
                    "Tình bạn đẹp là khi em được tôn trọng 💜 Em có đang gặp chuyện gì với bạn bè?",
                    "Bị cô lập hay bắt nạt KHÔNG PHẢI LỖI CỦA EM ⚠️ Hãy nói với người lớn em tin tưởng hoặc gọi: " + INFO.phone
                ]
            },
            gia_dinh: {
                keys: ["gia dinh", "cha me", "bo me", "cai nhau", "khong hieu", "so sanh"],
                res: [
                    "Muốn có ý kiến riêng là hoàn toàn bình thường 💜 Em thử nói: 'Con cảm thấy...' thay vì đối đầu nhé!",
                    "Khác biệt thế hệ tạo khoảng cách, nhưng hiểu nhau sẽ thu hẹp lại 💛"
                ]
            },
            lien_he: {
                keys: ["lien he", "so dien thoai", "sdt", "co o dau"],
                res: [
                    "<strong>📞 THÔNG TIN LIÊN HỆ</strong><br><br>👩‍🏫 " + INFO.fullName + "<br>💼 " + INFO.role + "<br>🏫 " + INFO.school + "<br>📍 " + INFO.room + "<br>🕐 " + INFO.contactTime + "<br>☎️ " + INFO.phone
                ]
            },
            an_toan: {
                keys: ["lam hai", "khong muon song", "tu tu", "bi danh", "bi de doa", "nguy hiem"],
                res: [
                    "<strong>💜 Cô rất quan tâm em!</strong><br>Hãy tìm ngay người lớn đáng tin cậy hoặc gọi: 📞 " + INFO.phone + "<br>Em không đơn độc đâu 💛"
                ]
            }
        };

        function checkSafety(text) {
            const n = normalizeText(text);
            const danger = ["lam hai", "khong muon song", "tu tu", "bi danh", "bi de doa", "nguy hiem"];
            for (let w of danger) if (n.includes(w)) return KNOWLEDGE.an_toan.res[0];
            return null;
        }

        function getReply(text) {
            if (!text.trim()) return "Em hãy nhập điều muốn chia sẻ nhé 💜";
            const safe = checkSafety(text);
            if (safe) return safe;
            
            const n = normalizeText(text);
            for (let t in KNOWLEDGE) {
                for (let k of KNOWLEDGE[t].keys) {
                    if (n.includes(normalizeText(k))) {
                        const arr = KNOWLEDGE[t].res;
                        return arr[Math.floor(Math.random() * arr.length)];
                    }
                }
            }
            return "Cô đang lắng nghe em 💜 Em có thể nói rõ hơn một chút được không?";
        }

        // === KHỞI TẠO ===
        const input = document.getElementById("messageInput");
        const sendBtn = document.getElementById("sendBtn");
        const chat = document.getElementById("chatMessages");
        const q1 = document.getElementById("q1");
        const q2 = document.getElementById("q2");
        const q3 = document.getElementById("q3");

        function addMsg(text, isUser) {
            const div = document.createElement("div");
            div.className = "message " + (isUser ? "user-message" : "bot-message");
            div.innerHTML = '<div class="msg-avatar">' + (isUser ? "👤" : "👩‍🏫") + '</div><div class="msg-content">' + text + '</div>';
            chat.appendChild(div);
            chat.scrollTop = chat.scrollHeight;
        }

        function showTyping() {
            const div = document.createElement("div");
            div.id = "typing";
            div.className = "message bot-message";
            div.innerHTML = '<div class="msg-avatar">👩‍🏫</div><div class="msg-content typing-indicator">Đang suy nghĩ... 💭</div>';
            chat.appendChild(div);
            chat.scrollTop = chat.scrollHeight;
        }
        function hideTyping() {
            const el = document.getElementById("typing");
            if (el) el.remove();
        }

        function doSend(text) {
            const t = text.trim();
            if (!t) return;
            addMsg(t, true);
            input.value = "";
            showTyping();
            setTimeout(function() {
                hideTyping();
                addMsg(getReply(t), false);
            }, 700);
        }

        // === GẮN SỰ KIỆN - HOẠT ĐỘNG 100% ===
        sendBtn.onclick = function() { doSend(input.value); };
        input.onkeydown = function(e) { if (e.key === "Enter") { e.preventDefault(); doSend(input.value); }};
        q1.onclick = function() { doSend("Tôi muốn được tư vấn"); };
        q2.onclick = function() { doSend("Tôi đang gặp khó khăn"); };
        q3.onclick = function() { doSend("Tôi muốn tâm sự"); };

        // === LỜI CHÀO ĐẦU ===
        addMsg("<strong>Chào em! 🌸</strong><br><br>Cô Hường rất vui được trò chuyện cùng em!<br>Nếu em có bất kỳ khó khăn, lo lắng trong học tập, bạn bè, gia đình hay cảm xúc, hãy chia sẻ với cô nhé 💜");
    </script>
</body>
</html>
