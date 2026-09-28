// ============================================================
// CHATBOT CÔ HƯỜNG - TƯ VẤN TÂM LÝ HỌC ĐƯỜNG
// PHIÊN BẢN HOÀN CHỈNH
// ============================================================

document.addEventListener("DOMContentLoaded", function () {

    // ========================================================
    // 1. THÔNG TIN CHATBOT
    // ========================================================

    const INFO = {
        fullName: "Nguyễn Thị Thu Hường",
        role: "Giáo viên tư vấn tâm lý học đường",
        school: "Trường THCS Phụng Công",
        room: "Phòng tư vấn tâm lý học đường",
        time: "7h00 – 22h00",
        phone: "0989836893"
    };


    // ========================================================
    // 2. LẤY CÁC PHẦN TỬ TRÊN GIAO DIỆN
    // ========================================================

    const chatMessages = document.getElementById("chatMessages");
    const messageInput = document.getElementById("messageInput");
    const sendBtn = document.getElementById("sendBtn");

    const qBtn1 = document.getElementById("qBtn1");
    const qBtn2 = document.getElementById("qBtn2");
    const qBtn3 = document.getElementById("qBtn3");


    // ========================================================
    // 3. KIỂM TRA GIAO DIỆN
    // ========================================================

    if (!chatMessages || !messageInput || !sendBtn) {

        console.error(
            "CHATBOT: Không tìm thấy các phần tử cần thiết trên giao diện."
        );

        return;
    }


    // ========================================================
    // 4. CHUẨN HÓA VĂN BẢN
    // ========================================================

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


    // ========================================================
    // 5. NGÂN HÀNG KIẾN THỨC
    // ========================================================

    const KNOWLEDGE = [

        // ----------------------------------------------------
        // CHÀO HỎI
        // ----------------------------------------------------

        {
            keywords: [
                "chao",
                "xin chao",
                "hello",
                "hi",
                "co oi",
                "em chao co",
                "chao co"
            ],

            responses: [
                "Chào em! 🌸 Cô Hường rất vui được trò chuyện cùng em. Em đang muốn chia sẻ điều gì với cô vậy? 💜",

                "Chào em! 👩‍🏫 Cô đang ở đây và sẵn sàng lắng nghe em. Em cứ chia sẻ thật tự nhiên nhé.",

                "Cô chào em! 🌷 Có chuyện gì khiến em muốn tìm đến cô hôm nay?"
            ]
        },


        // ----------------------------------------------------
        // MUỐN TÂM SỰ
        // ----------------------------------------------------

        {
            keywords: [
                "tam su",
                "muon tam su",
                "muon noi chuyen",
                "muon chia se",
                "chia se",
                "ke voi co",
                "noi voi co"
            ],

            responses: [
                "Cô đang lắng nghe em 💜 Em cứ kể cho cô từ điều khiến em suy nghĩ nhiều nhất nhé.",

                "Em có thể chia sẻ với cô từng chút một. Không cần phải nói mọi thứ cùng lúc đâu 🌱",

                "Cô ở đây để lắng nghe em. Điều gì đang khiến em cảm thấy khó chịu hoặc buồn nhất?"
            ]
        },


        // ----------------------------------------------------
        // CẦN TƯ VẤN
        // ----------------------------------------------------

        {
            keywords: [
                "tu van",
                "muon duoc tu van",
                "can tu van",
                "can ho tro",
                "giup em",
                "co the giup em",
                "gap kho khan"
            ],

            responses: [
                "Được chứ em 💜 Cô sẽ cùng em nhìn lại vấn đề một cách bình tĩnh. Em có thể nói cho cô biết chuyện gì đang xảy ra.",

                "Cô sẵn sàng hỗ trợ em 🌷 Em hãy chia sẻ hoàn cảnh của mình, cô sẽ cùng em tìm hướng giải quyết phù hợp.",

                "Em không cần phải tự giải quyết mọi chuyện một mình. Hãy kể cho cô nghe nhé."
            ]
        },


        // ----------------------------------------------------
        // HỌC TẬP
        // ----------------------------------------------------

        {
            keywords: [
                "hoc tap",
                "hoc",
                "diem",
                "diem kem",
                "diem thap",
                "thi",
                "kiem tra",
                "bai tap",
                "hoc khong vao",
                "khong hoc duoc",
                "mat tap trung",
                "ap luc hoc tap"
            ],

            responses: [
                "Nếu việc học đang khiến em áp lực, trước tiên hãy bình tĩnh nhé 💜 Em có thể nói cho cô biết môn học hoặc vấn đề cụ thể khiến em khó khăn.",

                "Điểm số không phải là toàn bộ giá trị của em 🌱 Mỗi người có tốc độ học tập khác nhau. Điều quan trọng là mình tìm được nguyên nhân và cách cải thiện phù hợp.",

                "Nếu em đang cảm thấy quá tải, hãy thử chia việc học thành những mục tiêu nhỏ hơn. Em muốn kể cho cô nghe điều gì đang khiến em áp lực nhất không?"
            ]
        },


        // ----------------------------------------------------
        // ÁP LỰC
        // ----------------------------------------------------

        {
            keywords: [
                "ap luc",
                "cang thang",
                "stress",
                "met moi",
                "qua tai",
                "lo lang",
                "lo au",
                "bat an",
                "khong thoai mai"
            ],

            responses: [
                "Cảm giác áp lực và mệt mỏi có thể xuất hiện khi em phải đối mặt với quá nhiều việc cùng lúc 💜 Em hãy thử dừng lại một chút, hít thở chậm và chia sẻ với cô điều khiến em lo nhất.",

                "Cô hiểu rằng khi có quá nhiều điều phải suy nghĩ, mình rất dễ cảm thấy quá tải. Em không cần giải quyết tất cả cùng một lúc đâu 🌱",

                "Em đang cảm thấy áp lực vì học tập, gia đình, bạn bè hay một chuyện khác? Em có thể nói với cô."
            ]
        },


        // ----------------------------------------------------
        // BẠN BÈ
        // ----------------------------------------------------

        {
            keywords: [
                "ban be",
                "ban",
                "cai nhau",
                "mau thuan",
                "xich mich",
                "bi bo roi",
                "bi co lap",
                "khong co ban",
                "mat ban"
            ],

            responses: [
                "Chuyện với bạn bè đôi khi khiến chúng ta rất buồn 💜 Em có thể kể cho cô biết chuyện gì đã xảy ra không?",

                "Một tình bạn tốt cần có sự tôn trọng và lắng nghe. Em đang gặp vấn đề với một người bạn hay với cả nhóm bạn?",

                "Nếu em cảm thấy bị bỏ rơi hoặc cô lập, em không cần phải chịu đựng một mình. Hãy chia sẻ với cô hoặc một người lớn mà em tin tưởng nhé."
            ]
        },


        // ----------------------------------------------------
        // BẮT NẠT
        // ----------------------------------------------------

        {
            keywords: [
                "bat nat",
                "bi bat nat",
                "bi danh",
                "danh em",
                "che gieu",
                "nhan xet",
                "dua",
                "de doa",
                "ep buoc",
                "bi lam phien"
            ],

            responses: [
                "Bị bắt nạt không phải là lỗi của em 💜 Em hãy tìm một người lớn đáng tin cậy để chia sẻ và hỗ trợ em.",

                "Nếu có người đánh, đe dọa hoặc ép buộc em, điều quan trọng nhất là đảm bảo an toàn cho mình. Em hãy báo ngay cho cha mẹ, thầy cô hoặc người lớn mà em tin tưởng.",

                "Cô rất quan tâm đến sự an toàn của em. Em có thể kể cụ thể hơn chuyện gì đang xảy ra không?"
            ]
        },


        // ----------------------------------------------------
        // GIA ĐÌNH
        // ----------------------------------------------------

        {
            keywords: [
                "gia dinh",
                "bo me",
                "cha me",
                "me",
                "bo",
                "ba me",
                "anh chi",
                "anh",
                "chi",
                "em trai",
                "em gai"
            ],

            responses: [
                "Chuyện gia đình đôi khi rất khó nói 💜 Em có thể chia sẻ với cô điều gì đang khiến em buồn hoặc khó xử?",

                "Khác biệt giữa cha mẹ và con cái đôi khi có thể dẫn đến hiểu lầm. Em hãy kể cho cô nghe điều khiến em cảm thấy khó chịu nhất nhé.",

                "Cảm xúc của em cũng rất quan trọng. Em có quyền được lắng nghe và tôn trọng."
            ]
        },


        // ----------------------------------------------------
        // BỊ SO SÁNH
        // ----------------------------------------------------

        {
            keywords: [
                "so sanh",
                "bi so sanh",
                "bo me so sanh",
                "kem ban",
                "khong bang ban",
                "thua ban"
            ],

            responses: [
                "Mỗi người có điểm mạnh và tốc độ phát triển khác nhau 🌱 Việc bị so sánh có thể khiến em buồn, nhưng điều đó không quyết định giá trị của em.",

                "Em không cần phải trở thành một người khác để có giá trị 💜 Hãy cùng cô tìm xem em đang mạnh ở điều gì và điều gì em muốn cải thiện."
            ]
        },


        // ----------------------------------------------------
        // CẢM XÚC BUỒN
        // ----------------------------------------------------

        {
            keywords: [
                "buon",
                "rat buon",
                "buon qua",
                "khoc",
                "muon khoc",
                "co don",
                "co doc",
                "that vong"
            ],

            responses: [
                "Cô nghe thấy em đang có một cảm xúc rất nặng nề 💜 Em không cần phải che giấu cảm xúc của mình. Điều gì đã khiến em buồn như vậy?",

                "Buồn là một cảm xúc bình thường và em có quyền được buồn. Cô ở đây để nghe em chia sẻ 🌷",

                "Nếu em muốn khóc, em có thể cho phép mình khóc. Sau đó chúng ta sẽ từ từ tìm hiểu chuyện gì đang xảy ra nhé."
            ]
        },


        // ----------------------------------------------------
        // TỰ TI
        // ----------------------------------------------------

        {
            keywords: [
                "tu ti",
                "khong tu tin",
                "kem coi",
                "vo dung",
                "khong gioi",
                "xau",
                "khong ai thich em"
            ],

            responses: [
                "Cô không nghĩ rằng một điểm yếu hay một lần thất bại có thể quyết định giá trị của một con người 💜",

                "Em không cần phải hoàn hảo mới xứng đáng được yêu thương và tôn trọng 🌱",

                "Hãy thử nói với cô một điều mà em từng làm tốt. Có thể đó là một việc rất nhỏ cũng được."
            ]
        },


        // ----------------------------------------------------
        // CÔ ĐƠN
        // ----------------------------------------------------

        {
            keywords: [
                "co don",
                "khong ai hieu",
                "khong ai quan tam",
                "khong ai nghe",
                "khong co ai"
            ],

            responses: [
                "Cảm giác cô đơn có thể rất khó chịu 💜 Nhưng em không nhất thiết phải đối mặt với nó một mình. Cô đang ở đây để lắng nghe em.",

                "Em hãy thử nghĩ đến một người mà em cảm thấy an toàn khi nói chuyện: cha mẹ, thầy cô, anh chị hoặc một người bạn đáng tin cậy."
            ]
        },


        // ----------------------------------------------------
        // TÌNH CẢM TUỔI HỌC TRÒ
        // ----------------------------------------------------

        {
            keywords: [
                "thich ban",
                "thich nguoi",
                "yeu",
                "tinh cam",
                "crush",
                "nguoi yeu",
                "chia tay",
                "that tinh"
            ],

            responses: [
                "Những cảm xúc rung động ở tuổi học trò là điều rất tự nhiên 🌷 Em có thể chia sẻ với cô mà không cần xấu hổ.",

                "Khi thích một người, mình có thể vui, hồi hộp hoặc lo lắng. Em đang gặp điều gì khiến em khó xử?",

                "Nếu em vừa trải qua chuyện chia tay hoặc thất vọng, hãy cho bản thân thời gian để bình tĩnh và chăm sóc chính mình nhé 💜"
            ]
        },


        // ----------------------------------------------------
        // MẤT NGỦ
        // ----------------------------------------------------

        {
            keywords: [
                "mat ngu",
                "khong ngu",
                "kho ngu",
                "ngu khong du",
                "thuc dem"
            ],

            responses: [
                "Nếu gần đây em thường xuyên khó ngủ, em hãy thử duy trì giờ ngủ đều đặn và hạn chế sử dụng điện thoại trước khi ngủ 🌙",

                "Cô muốn biết thêm: em khó ngủ vì học tập, lo lắng, chuyện gia đình hay một nguyên nhân khác?"
            ]
        },


        // ----------------------------------------------------
        // LIÊN HỆ CÔ HƯỜNG
        // ----------------------------------------------------

        {
            keywords: [
                "lien he",
                "so dien thoai",
                "sdt",
                "dien thoai",
                "co o dau",
                "tim co",
                "gap co"
            ],

            responses: [
                `
                <strong>📞 THÔNG TIN LIÊN HỆ</strong><br><br>
                👩‍🏫 ${INFO.fullName}<br>
                💼 ${INFO.role}<br>
                🏫 ${INFO.school}<br>
                📍 ${INFO.room}<br>
                🕐 ${INFO.time}<br>
                ☎️ ${INFO.phone}
                `
            ]
        }

    ];


    // ========================================================
    // 6. CÁC TỪ KHÓA CẦN ƯU TIÊN VỀ AN TOÀN
    // ========================================================

    const SAFETY_KEYWORDS = [

        "tu tu",
        "tu sat",
        "muon chet",
        "muon tu tu",
        "khong muon song",
        "muon bien mat",
        "lam hai ban than",
        "tu lam hai",
        "lam dau ban than",
        "bi danh",
        "bi bao hanh",
        "bi de doa",
        "nguy hiem",
        "co nguoi danh",
        "co nguoi de doa"

    ];


    // ========================================================
    // 7. KIỂM TRA AN TOÀN
    // ========================================================

    function checkSafety(text) {

        const normalized = normalizeText(text);

        for (const keyword of SAFETY_KEYWORDS) {

            if (normalized.includes(normalizeText(keyword))) {

                return `
                    <strong>💜 Cô rất quan tâm đến sự an toàn của em.</strong>
                    <br><br>
                    Nếu em đang gặp nguy hiểm hoặc có ý nghĩ làm hại bản thân,
                    em hãy tìm ngay một người lớn đáng tin cậy ở bên cạnh mình.
                    <br><br>
                    👩‍🏫 Em có thể liên hệ với cô Hường:
                    <strong>${INFO.phone}</strong>
                    <br><br>
                    Nếu có nguy hiểm ngay lập tức, hãy nhờ người lớn đưa em
                    đến cơ sở y tế hoặc gọi dịch vụ khẩn cấp phù hợp.
                    <br><br>
                    <strong>Em không cần phải đối mặt với chuyện này một mình. 💜</strong>
                `;
            }
        }

        return null;
    }


    // ========================================================
    // 8. TÌM CÂU TRẢ LỜI
    // ========================================================

    function getAnswer(text) {

        if (!text || !text.trim()) {

            return "Em hãy nhập điều muốn chia sẻ với cô nhé 💜";
        }


        // Kiểm tra an toàn trước

        const safetyAnswer = checkSafety(text);

        if (safetyAnswer) {

            return safetyAnswer;
        }


        const normalized = normalizeText(text);


        // ----------------------------------------------------
        // Tìm chủ đề phù hợp
        // ----------------------------------------------------

        let matchedTopic = null;
        let bestScore = 0;


        for (const topic of KNOWLEDGE) {

            let score = 0;

            for (const keyword of topic.keywords) {

                const key = normalizeText(keyword);

                if (normalized.includes(key)) {

                    // Từ khóa càng dài thì mức độ phù hợp càng cao

                    score += key.length;
                }
            }


            if (score > bestScore) {

                bestScore = score;
                matchedTopic = topic;
            }
        }


        // ----------------------------------------------------
        // Nếu tìm thấy chủ đề
        // ----------------------------------------------------

        if (matchedTopic) {

            const responses = matchedTopic.responses;

            return responses[
                Math.floor(Math.random() * responses.length)
            ];
        }


        // ----------------------------------------------------
        // Không tìm thấy
        // ----------------------------------------------------

        return `
            Cô đang lắng nghe em 💜
            <br><br>
            Em có thể nói rõ hơn một chút về điều đang khiến em
            suy nghĩ hoặc lo lắng không?
            <br><br>
            Em có thể bắt đầu bằng:
            <br>
            • "Em đang buồn vì..."
            <br>
            • "Em đang lo vì..."
            <br>
            • "Em gặp vấn đề với bạn..."
            <br>
            • "Em đang gặp khó khăn trong học tập..."
        `;
    }


    // ========================================================
    // 9. THÊM TIN NHẮN VÀO KHUNG CHAT
    // ========================================================

    function addMessage(content, isUser) {

        const message = document.createElement("div");

        message.className =
            "message " +
            (isUser ? "user-message" : "bot-message");


        const avatar = document.createElement("div");

        avatar.className = "msg-avatar";

        avatar.textContent =
            isUser ? "👤" : "👩‍🏫";


        const contentBox = document.createElement("div");

        contentBox.className = "msg-content";


        // Tin của chatbot có thể chứa <br>, <strong>

        if (!isUser) {

            contentBox.innerHTML = content;

        } else {

            // Tin người dùng sử dụng textContent
            // để tránh chèn HTML nguy hiểm

            contentBox.textContent = content;
        }


        message.appendChild(avatar);

        message.appendChild(contentBox);

        chatMessages.appendChild(message);


        // Tự động cuộn xuống cuối

        setTimeout(function () {

            chatMessages.scrollTop =
                chatMessages.scrollHeight;

        }, 50);
    }


    // ========================================================
    // 10. HIỂN THỊ "ĐANG SUY NGHĨ..."
    // ========================================================

    function showTyping() {

        removeTyping();


        const message = document.createElement("div");

        message.id = "typingMessage";

        message.className = "message bot-message";


        const avatar = document.createElement("div");

        avatar.className = "msg-avatar";

        avatar.textContent = "👩‍🏫";


        const content = document.createElement("div");

        content.className =
            "msg-content typing-indicator";

        content.textContent =
            "Cô đang suy nghĩ... 💭";


        message.appendChild(avatar);

        message.appendChild(content);

        chatMessages.appendChild(message);


        chatMessages.scrollTop =
            chatMessages.scrollHeight;
    }


    // ========================================================
    // 11. XÓA "ĐANG SUY NGHĨ..."
    // ========================================================

    function removeTyping() {

        const typing =
            document.getElementById("typingMessage");


        if (typing) {

            typing.remove();
        }
    }


    // ========================================================
    // 12. GỬI TIN NHẮN
    // ========================================================

    function sendMessage(text) {

        const message =
            String(text || "").trim();


        if (!message) {

            messageInput.focus();

            return;
        }


        // Hiển thị tin người dùng

        addMessage(message, true);


        // Xóa ô nhập

        messageInput.value = "";


        // Hiệu ứng chatbot

        showTyping();


        // Khóa nút gửi tạm thời

        sendBtn.disabled = true;

        sendBtn.style.opacity = "0.6";


        // Chatbot trả lời

        setTimeout(function () {

            removeTyping();


            const answer =
                getAnswer(message);


            addMessage(answer, false);


            sendBtn.disabled = false;

            sendBtn.style.opacity = "1";


            messageInput.focus();

        }, 600);
    }


    // ========================================================
    // 13. NÚT GỬI
    // ========================================================

    sendBtn.addEventListener("click", function () {

        sendMessage(messageInput.value);

    });


    // ========================================================
    // 14. NHẤN ENTER ĐỂ GỬI
    // ========================================================

    messageInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            event.preventDefault();

            sendMessage(messageInput.value);
        }

    });


    // ========================================================
    // 15. CÁC NÚT GỢI Ý
    // ========================================================

    if (qBtn1) {

        qBtn1.addEventListener("click", function () {

            sendMessage(
                "Tôi muốn được tư vấn"
            );

        });

    }


    if (qBtn2) {

        qBtn2.addEventListener("click", function () {

            sendMessage(
                "Tôi đang gặp khó khăn"
            );

        });

    }


    if (qBtn3) {

        qBtn3.addEventListener("click", function () {

            sendMessage(
                "Tôi muốn tâm sự"
            );

        });

    }


    // ========================================================
    // 16. LỜI CHÀO BAN ĐẦU
    // ========================================================

    addMessage(
        `
        <strong>Chào em! 🌸</strong>
        <br><br>
        Cô Hường rất vui được trò chuyện cùng em!
        <br>
        Nếu em có bất kỳ khó khăn, lo lắng trong học tập,
        bạn bè, gia đình hay cảm xúc, hãy chia sẻ với cô nhé 💜
        `,
        false
    );


    // ========================================================
    // 17. ĐẶT CON TRỎ VÀO Ô NHẬP
    // ========================================================

    messageInput.focus();


    // ========================================================
    // 18. THÔNG BÁO TRÊN CONSOLE
    // ========================================================

    console.log(
        "✅ Chatbot Cô Hường đã khởi động thành công!"
    );

    console.log(
        "📚 Hệ thống kiến thức:",
        KNOWLEDGE.length,
        "chủ đề"
    );

});
