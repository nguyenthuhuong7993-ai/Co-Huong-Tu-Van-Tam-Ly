<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tư vấn Tâm lý Học đường - Cô Hường</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', Roboto, sans-serif; }
        body { background: linear-gradient(135deg, #e6f0fa, #f3e7fc); min-height: 100vh; }
        .chat-container { max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; height: 95vh; padding: 20px; }
        .chat-header { background: #6366f1; color: white; padding: 18px; border-radius: 16px 16px 0 0; display: flex; align-items: center; gap: 12px; }
        .chat-header img { width: 48px; height: 48px; border-radius: 50%; background: white; }
        .chat-messages { flex: 1; overflow-y: auto; padding: 20px; background: white; }
        .message { display: flex; gap: 12px; margin-bottom: 20px; align-items: flex-start; }
        .user-message { flex-direction: row-reverse; }
        .bot-avatar, .user-avatar { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .bot-avatar { background: #e0e7ff; color: #4f46e5; font-size: 20px; }
        .user-avatar { background: #ddd; }
        .message-content { padding: 12px 16px; border-radius: 18px; max-width: 75%; line-height: 1.5; font-size: 15px; }
        .bot-message .message-content { background: #f1f5f9; border-radius: 18px 18px 18px 4px; color: #1e293b; }
        .user-message .message-content { background: #4f46e5; color: white; border-radius: 18px 18px 4px 18px; }
        .quick-replies { display: flex; flex-wrap: wrap; gap: 8px; padding: 12px 20px; background: #fafafa; border-top: 1px solid #eee; }
        .reply-btn { padding: 8px 14px; background: #eef2ff; border: none; border-radius: 20px; cursor: pointer; font-size: 13px; color: #4338ca; transition: all 0.2s; }
        .reply-btn:hover { background: #ddd6fe; }
        .chat-input { display: flex; padding: 16px; background: white; border-radius: 0 0 16px 16px; border-top: 1px solid #eee; }
        .chat-input input { flex: 1; padding: 12px 16px; border: 1px solid #ddd; border-radius: 24px; outline: none; font-size: 15px; }
        .chat-input button { margin-left: 10px; padding: 12px 24px; background: #4f46e5; color: white; border: none; border-radius: 24px; cursor: pointer; font-weight: 500; transition: background 0.2s; }
        .chat-input button:hover { background: #4338ca; }
        strong { color: #4338ca; }
    </style>
</head>
<body>
    <div class="chat-container">
        <div class="chat-header">
            <div style="font-size: 24px;">💜</div>
            <div>
                <h3 style="font-size: 17px;">Cô Hường - Tư vấn Tâm lý Học đường</h3>
                <p style="font-size: 13px; opacity: 0.9;">Luôn lắng nghe & đồng hành cùng em</p>
            </div>
        </div>

        <div class="chat-messages" id="chatMessages"></div>

        <div class="quick-replies" id="quickReplies">
            <button class="reply-btn" data-message="Em muốn chia sẻ về cảm xúc của mình">Cảm xúc & tự tin</button>
            <button class="reply-btn" data-message="Em gặp áp lực trong học tập">Áp lực học tập</button>
            <button class="reply-btn" data-message="Em có khó khăn trong quan hệ bạn bè">Bạn bè & tình bạn</button>
            <button class="reply-btn" data-message="Em hoặc bạn bị bắt nạt/bạo lực học đường">Bạo lực học đường</button>
            <button class="reply-btn" data-message="Em có khó khăn với gia đình/cha mẹ">Gia đình</button>
            <button class="reply-btn" data-message="Em muốn biết thông tin liên hệ tư vấn">Liên hệ cô tư vấn</button>
        </div>

        <div class="chat-input">
            <input type="text" id="messageInput" placeholder="Nhập điều em muốn chia sẻ...">
            <button id="sendBtn">Gửi</button>
        </div>
    </div>

    <script>
        // ================================================================
        // THÔNG TIN LIÊN HỆ - GIỮ NGUYÊN
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
        // QUY TẮC TƯ VẤN
        // ================================================================
        const COUNSELING_RULES = {
            principles: [
                "lắng nghe", "tôn trọng", "không phán xét", "không trách móc",
                "không làm học sinh xấu hổ", "khuyến khích chia sẻ",
                "hướng dẫn tìm người lớn đáng tin cậy khi cần"
            ],
            avoid: [
                "tự chẩn đoán bệnh tâm lý", "khẳng định mắc rối loạn tâm lý",
                "đổ lỗi cho học sinh", "khuyến khích bạo lực",
                "hứa giữ bí mật tuyệt đối mọi trường hợp",
                "yêu cầu thông tin cá nhân không cần thiết"
            ]
        };

        // ================================================================
        // CHUẨN HÓA VĂN BẢN TIẾNG VIỆT
        // ================================================================
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

        // ================================================================
        // KHO KIẾN THỨC - ĐƯỢC NÂNG CẤP
        // ================================================================
        const KNOWLEDGE = {
            chao_hoi: {
                priority: 20,
                keywords: [
                    "chao", "xin chao", "hello", "hi", "co oi", "em chao co",
                    "chao co", "co a", "bat dau", "hoi dap", "ai day", "ban la ai"
                ],
                responses: [
                    `Chào em 🌸 Cô Hường rất vui được trò chuyện cùng em.\nEm có thể chia sẻ về học tập, bạn bè, gia đình, cảm xúc hoặc bất kỳ điều gì đang băn khoăn.\nEm muốn kể chuyện gì trước? 💜`,
                    `Chào em nhé 💜 Cô luôn ở đây để lắng nghe em. Không cần ngại ngùng, cứ nói thật lòng những điều em nghĩ nhé. Em đang có điều gì muốn chia sẻ?`
                ]
            },

            cam_xuc_nhan_dien: {
                priority: 95,
                keywords: [
                    "buon vo co", "tai sao de cau gat", "khong hieu cam xuc",
                    "buon va tram cam khac nhau", "thay minh vo dung",
                    "lo lang qua muc", "biet minh dang stress", "hay khoc co yeu duoi",
                    "co don du co ban", "vi sao suy nghi tieu cuc", "cam xuc co ban",
                    "luon met moi", "khong co niem vui", "cam thay trong rong"
                ],
                responses: [
                    `Em đừng quá lo lắng 💜 Những cảm xúc như buồn, lo lắng, mệt mỏi đều rất bình thường.\n- Buồn vô cớ: có thể do thay đổi cơ thể tuổi dậy thì hoặc căng thẳng ngầm.\n- Buồn khác trầm cảm: buồn là tạm thời; trầm cảm kéo dài trên 2 tuần, ảnh hưởng sinh hoạt hàng ngày.\n- Khóc không phải yếu đuối, đó là cách giải tỏa cảm xúc lành mạnh.\nEm có thể nói rõ hơn em đang cảm thấy như thế nào không?`,
                    `Cảm xúc của em luôn đáng được lắng nghe 🌱\nKhi áp lực cao, não dễ tập trung vào điều tiêu cực — đó không phải lỗi của em.\nViết ra giấy những suy nghĩ sẽ giúp em rõ ràng hơn.\nEm muốn nói về điều gì đang làm em bận tâm?`
                ]
            },

            cam_xuc_kiem_soat: {
                priority: 90,
                keywords: [
                    "lam sao bot gian", "nong tinh", "binh tinh khi bi che",
                    "tuc ma khong noi duoc", "xu ly khi bi hieu lam",
                    "lam sao vui len", "tu trach ban than", "kiem soat loi noi luc gian",
                    "bi anh huong loi nguoi khac", "qua buon nen lam gi", "dieu chinh cam xuc",
                    "khi gian nen lam gi"
                ],
                responses: [
                    `Khi tức giận, em hãy thử:\n✅ Hít thở sâu 5 lần, tạm rời khỏi tình huống\n✅ Đếm 1–10 trước khi nói\n✅ Viết ra giấy những điều muốn nói\n✅ Nhắc mình: "Lời nhận xét không quyết định giá trị của em"\n✅ Tìm người tin tưởng để chia sẻ thay vì giữ trong lòng\nEm đang tức giận về chuyện gì vậy? 💜`,
                    `Em hoàn toàn có quyền cảm thấy tức giận hoặc buồn bã 💜\nĐiều quan trọng là không để cảm xúc điều khiển hành động.\nNếu khó nói trực tiếp, em có thể viết thư hoặc nhắn tin sau khi bình tĩnh hơn.\nEm muốn kể cho cô nghe chuyện xảy ra không?`
                ]
            },

            tu_tin_va_long_tu_trong: {
                priority: 85,
                keywords: [
                    "thay minh kem hon ban", "tu ti vi ngoai hinh", "lam sao tu tin hon",
                    "so phat bien truoc lop", "ngai giao tiep", "so sanh ban than",
                    "bi danh gia", "khong co tai nang", "yeu ban than", "thieu dong luc",
                    "thap nghi", "khong dam noi y kien"
                ],
                responses: [
                    `Giá trị của em không chỉ nằm ở ngoại hình, điểm số hay lời người khác 💛\n✅ Mỗi người có tốc độ phát triển và điểm mạnh riêng\n✅ Tập trung vào điều em làm tốt, dù nhỏ\n✅ Bắt đầu từ việc đơn giản: chào hỏi, nói trước nhóm nhỏ\n✅ Ghi nhận những điều tốt mình làm mỗi ngày\nEm đang thiếu tự tin về điều gì nhất?`,
                    `Không ai hoàn hảo cả 💜 Em không cần giống người khác mới có giá trị.\nThay vì so sánh "hậu trường" của mình với "bề ngoài" của người khác, hãy tự hỏi:\n"Hôm nay mình đã tiến bộ hơn một chút không?"\nEm có điều gì mình làm tốt không? Kể cho cô nghe nhé!`
                ]
            },

            ap_luc_hoc_tap: {
                priority: 95,
                keywords: [
                    "hoc nhieu met qua", "so di hoc", "luon lo ve diem so",
                    "ap luc tu gia dinh", "so thi mat ngu", "hoc mai khong vao",
                    "so bi so sanh", "hoc cham hon lop", "so bi goi tra loi",
                    "cang thang truoc kiem tra", "ba me ky vong cao", "diem so thap",
                    "khong thich mon hoc", "sai lam trong hoc tap", "nghi minh khong co nang luc"
                ],
                responses: [
                    `Điểm số quan trọng nhưng không phải tất cả giá trị của em 📚\n✅ Nếu cảm thấy quá tải: sắp xếp lại thời gian, chia bài thành phần nhỏ\n✅ Nên chia sẻ với gia đình: "Con cố gắng hết sức, mong bố mẹ hiểu cho con"\n✅ Học 45 phút nghỉ 5–10 phút, không nên học khuya\n✅ Mỗi người có tốc độ học khác nhau, không cần chạy đua với ai\nEm đang áp lực từ đâu nhiều nhất?`,
                    `Sợ đi học hoặc sợ thi là phản ứng bình thường khi căng thẳng 💜\nHãy xác định rõ: em sợ nội dung bài, sợ kết quả hay sợ phản ứng của người khác?\nMột điểm thấp không định nghĩa cả con người em. Quan trọng là em không ngừng cố gắng.\nEm kể cho cô nghe nhé!`
                ]
            },

            bao_luc_hoc_duong: {
                priority: 145,
                keywords: [
                    "bao luc hoc duong", "bi bat nat", "bi che gieu", "bi co lap",
                    "bi noi xau", "bi danh", "bi lay do dung", "so di hoc vi bi ban",
                    "tren mang bi noi xau", "tung tin don", "anh xau bi dang",
                    "khong dam ke", "so bi tra thu", "bi doa", "ban bi bat nat"
                ],
                responses: [
                    `Em không đơn độc và KHÔNG CÓ LỖI trong chuyện này 💜\n✅ Nói ngay với giáo viên chủ nhiệm, cô tư vấn hoặc bố mẹ — đó không phải "mách lẻo" mà là bảo vệ chính mình\n✅ Lưu lại tin nhắn, ảnh, bằng chứng\n✅ Chặn tài khoản gây phiền nhiễu trên mạng\n✅ Tránh đi một mình, đi cùng bạn hoặc người lớn\n✅ Không trả đũa bằng bạo lực, dễ làm tình hình nghiêm trọng hơn\n📞 ${INFO.phone}\nEm đang bị ai đó làm phiền phải không? Hãy nói cho cô biết!`,
                    `Bạo lực học đường bao gồm cả hành vi thể chất, lời nói, cô lập và trên mạng ⚠️\nIm lặng sẽ khiến họ càng lấn tới. Nhà trường và gia đình CÓ TRÁCH NHIỆM bảo vệ em.\nEm có người mình tin tưởng để nói chuyện không? Hoặc gọi cô bất kỳ lúc nào nhé 💜`
                ]
            },

            tinh_ban_va_quan_he: {
                priority: 85,
                keywords: [
                    "khong co ban", "bi bo roi", "cai nhau voi ban", "ban loi dung",
                    "ep lam dieu khong muon", "noi xau sau lung", "xin loi", "giu tinh ban",
                    "ban choi voi nguoi khac", "cam thay don co"
                ],
                responses: [
                    `Tình bạn đẹp dựa trên sự chân thành, tin tưởng và tôn trọng lẫn nhau 💛\n✅ Bắt đầu bằng câu hỏi đơn giản: "Bạn học bài này chưa?"\n✅ Không cần giống nhau mới chơi được\n✅ Nếu bạn luôn yêu cầu em làm điều không muốn → đó không phải tình bạn lành mạnh\n✅ Nói rõ cảm xúc thay vì im lặng: "Mình buồn khi bạn làm vậy vì..."\nEm đang gặp khó khăn với bạn bè à?`,
                    `Chấp nhận cô đơn tạm thời tốt hơn ở trong mối quan hệ khiến mình mệt mỏi 💜\nEm có quyền nói "không" với những yêu cầu không phù hợp.\nMột người bạn thật tốt sẽ tôn trọng và lắng nghe em, không ép em làm điều trái lòng.\nEm muốn chia sẻ thêm không?`
                ]
            },

            tinh_cam_tuoi_day_thi: {
                priority: 90,
                keywords: [
                    "thich ban", "biet ban ay co thich minh khong", "so bi tu choi",
                    "buon bi tu choi", "nen noi hay giu kin", "anh huong hoc tap",
                    "hen ho som", "chia tay", "khong quen duoc", "mat tap trung"
                ],
                responses: [
                    `Cảm xúc rung động ở tuổi em là hoàn toàn bình thường và rất đẹp 💜\n✅ Thích không nhất thiết là yêu — đó là cảm xúc trong sáng ban đầu\n✅ Không đáp lại tình cảm của ai đó cũng không phải lỗi\n✅ Ưu tiên hàng đầu: học tập và phát triển bản thân\n✅ Giữ ranh giới rõ ràng: không chia sẻ ảnh riêng tư, không làm điều mình không muốn\nEm đang băn khoăn điều gì nhất?`,
                    `Từ chối không làm giảm giá trị của em đâu 💛\nDũng cảm bày tỏ đã là điều rất đáng trân trọng rồi.\nCho mình thời gian buồn rồi tiếp tục phát triển — người phù hợp sẽ đến khi em trưởng thành hơn.\nEm có đang suy nghĩ có nên bày tỏ hay không?`
                ]
            },

            gia_dinh_va_cha_me: {
                priority: 90,
                keywords: [
                    "bo me khong hieu", "so sanh voi con nha nguoi ta", "kiem soat qua nhieu",
                    "khong duoc di choi", "cai nhau voi cha me", "nghiem khong phai khong yeu",
                    "ap luc ky vong", "khong dam noi y kien", "viet thu cho cha me"
                ],
                responses: [
                    `Ở tuổi này, muốn khẳng định bản thân là điều hoàn toàn tự nhiên 💜\n✅ Bố mẹ nghiêm khắc không có nghĩa là không yêu em, chỉ là cách thể hiện khác nhau\n✅ Nói "Con cảm thấy..." thay vì "Bố mẹ luôn..." sẽ giảm đối đầu\n✅ Viết thư nếu khó nói trực tiếp\n✅ Mỗi người có con đường riêng, không cần giống ai\nEm có dám chia sẻ với bố mẹ những suy nghĩ của mình không?`,
                    `Khác biệt thế hệ tạo ra khoảng cách, nhưng hiểu nhau sẽ thu hẹp khoảng cách đó 💛\nChọn lúc bình tĩnh để nói, không nói khi đang giận.\nLắng nghe bố mẹ trước khi yêu cầu được lắng nghe.\nEm muốn cô hướng dẫn cách nói chuyện với bố mẹ không?`
                ]
            },

            suc_khoe_tinh_than_va_ho_tro: {
                priority: 100,
                keywords: [
                    "suc khoe tinh than", "can ho tro", "muon gap co", "tu van truc tiep",
                    "khong ai hieu", "ngai noi", "cam thay bo bo", "can nguoi lang nghe",
                    "lien he co", "so dien thoai co", "phong tu van"
                ],
                responses: [
                    `Sức khỏe tinh thần quan trọng không kém sức khỏe thể chất 💜\nNếu em cảm thấy quá nặng nề, hãy tìm đến:\n- Bố mẹ, giáo viên chủ nhiệm\n- Cô tư vấn tại phòng tư vấn\n📞 SĐT: ${INFO.phone}\nChia sẻ không làm em yếu đi, mà giúp em nhẹ lòng hơn. Em xứng đáng được yêu thương và hỗ trợ! 💛`,
                    `Em không cần đối mặt với khó khăn một mình 💜\nThông tin liên hệ cô tư vấn:\n👩‍🏫 ${INFO.fullName}\n🏫 ${INFO.school}\n📍 ${INFO.room}\n🕐 ${INFO.contactTime}\n☎️ ${INFO.phone}\nCô luôn sẵn sàng lắng nghe em. Em có thể đến trực tiếp hoặc gọi điện nhé!`
                ]
            },

            mang_xa_hoi_va_an_toan: {
                priority: 105,
                keywords: [
                    "an toan tren mang", "bi lam phien", "gap nguoi la", "gui anh rieng tu",
                    "bi doa gui anh", "thong tin ca nhan", "nguoi la nhan tin", "bi loi keo"
                ],
                responses: [
                    `An toàn của em luôn được đặt lên hàng đầu ⚠️\n✅ Không chia sẻ mật khẩu, địa chỉ, SĐT, ảnh riêng tư cho bất kỳ ai\n✅ Không gặp người quen trên mạng một mình\n✅ Nếu ai đó đe dọa hoặc ép em → nói ngay với người lớn đáng tin cậy\n✅ Lưu lại tin nhắn, bằng chứng\nEm có đang nhận được tin nhắn kỳ lạ không? Hãy nói cho cô biết! 💜`,
                    `Không ai có quyền ép em làm điều mình không muốn 💜\nNếu ai đó nói "gửi ảnh thì mới chơi với bạn" → đó không phải bạn thật sự.\nEm không có lỗi trong chuyện này. Hãy kể ngay cho người em tin tưởng hoặc gọi cô: ${INFO.phone}`
                ]
            }
        };

        // ================================================================
        // NHÓM TÌNH HUỐNG AN TOÀN - ƯU TIÊN CAO NHẤT
        // ================================================================
        const SAFETY_GROUPS = {
            self_harm: [
                "muon lam hai ban than", "lam hai ban than", "tu lam hai", "tu lam dau",
                "khong muon song", "khong muon ton tai", "muon chet", "muon tu tu",
                "tu tu", "ket thuc cuoc song", "khong muon song nua", "chet di",
                "muon bien mat", "tat ca deu vo nghia", "khong con ly do song"
            ],
            harm_others: [
                "muon lam hai nguoi khac", "muon giet nguoi", "muon danh nguoi",
                "muon tra thu bang bao luc"
            ],
            immediate_danger: [
                "dang gap nguy hiem", "dang bi de doa", "bi doa giet", "bi doa danh",
                "dang bi danh", "dang bi hanh hung", "co nguoi dang lam hai em",
                "khong an toan", "dang bi xam hai"
            ],
            exploitation: [
                "bi ep gui anh", "bi ep gui anh rieng tu", "nguoi lon cham vao",
                "bi cham vao", "bi ep buoc", "bi xam hai", "bi loi keo",
                "bi tong tien bang anh"
            ]
        };

        // ================================================================
        // HÀM KIỂM TRA AN TOÀN
        // ================================================================
        function checkSafety(text) {
            const normalized = normalizeText(text);
            
            if (containsAny(normalized, SAFETY_GROUPS.self_harm)) {
                return `<strong>💜 Cô rất quan tâm đến em.</strong><br><br>Nếu em đang có ý nghĩ làm đau bản thân hoặc không muốn sống, điều quan trọng nhất lúc này là <strong>em không nên ở một mình</strong>.<br><br>Hãy tìm ngay một người lớn đáng tin cậy đang ở gần em: bố mẹ, người thân, giáo viên hoặc cô tư vấn, và nói cho họ biết em đang cảm thấy như thế nào.<br><br>📞 <strong>${INFO.phone}</strong><br><br>Em rất đáng được yêu thương và không nên từ bỏ nhé 💜`;
            }
            
            if (containsAny(normalized, SAFETY_GROUPS.harm_others)) {
                return `<strong>Cô muốn ưu tiên sự an toàn của mọi người.</strong><br><br>Khi đang quá tức giận, hãy tạo khoảng cách với người hoặc vật có thể gây nguy hiểm và không hành động bằng bạo lực.<br><br>Hãy tìm ngay một người lớn đáng tin cậy để ở cùng và giúp em xử lý tình huống.<br><br>Em có thể kể cho cô nghe điều gì đã khiến em tức giận đến vậy không?`;
            }
            
            if (containsAny(normalized, SAFETY_GROUPS.immediate_danger)) {
                return `<strong>⚠️ ƯU TIÊN AN TOÀN TRƯỚC HẾT</strong><br><br>Nếu em đang bị đe dọa hoặc bị làm hại ngay lúc này, hãy rời khỏi nơi không an toàn và tìm người lớn đáng tin cậy ngay lập tức.<br><br>Nói với cha mẹ, giáo viên, cô tư vấn hoặc gọi: 📞 <strong>${INFO.phone}</strong>`;
            }
            
            if (containsAny(normalized, SAFETY_GROUPS.exploitation)) {
                return `<strong>💜 Em KHÔNG CÓ LỖI trong chuyện này.</strong><br><br>Đừng tiếp tục làm theo yêu cầu của người đó. Hãy giữ lại tin nhắn, bằng chứng và nói ngay với người lớn em tin tưởng.<br><br>Nếu đang gặp nguy hiểm, gọi ngay: 📞 <strong>${INFO.phone}</strong>`;
            }
            
            return null;
        }

        // ================================================================
        // HÀM HỖ TRỢ
        // ================================================================
        function containsAny(text, keywords) {
            for (const keyword of keywords) {
                const normKw = normalizeText(keyword);
                if (!normKw) continue;
                if (text.includes(normKw)) return true;
                const words = normKw.split(" ").filter(w => w.length > 2);
                if (words.length >= 2 && words.every(w => text.includes(w))) return true;
            }
            return false;
        }

        function isContactRequest(text) {
            const kw = ["lien he", "so dien thoai", "sdt", "gap co", "phong tu van", "dia chi", "thong tin co"];
            return containsAny(text, kw);
        }

        function isCounselorRequest(text) {
            const kw = ["muon gap co", "can tu van", "muon noi chuyen", "can nguoi lang nghe", "co giup em"];
            return containsAny(text, kw);
        }

        function getContactResponse() {
            return `<strong>📞 THÔNG TIN LIÊN HỆ TƯ VẤN</strong><br><br>👩‍🏫 <strong>${INFO.fullName}</strong><br>💼 ${INFO.role}<br>🏫 ${INFO.school}<br>📍 ${INFO.room}<br>🕐 ${INFO.contactTime}<br>☎️ <strong>${INFO.phone}</strong><br><br>Em có thể đến trực tiếp hoặc gọi điện nhé. Cô luôn sẵn sàng lắng nghe em 💜`;
        }

        // ================================================================
        // NHẬN DIỆN CHỦ ĐỀ & TRẢ LỜI
        // ================================================================
        function detectIntent(userText) {
            const text = normalizeText(userText);
            let bestTopic = null;
            let bestScore = 0;
            
            for (const [name, topic] of Object.entries(KNOWLEDGE)) {
                let score = 0;
                let matchCount = 0;
                for (const kw of topic.keywords) {
                    const nk = normalizeText(kw);
                    if (!nk) continue;
                    if (text.includes(nk)) {
                        score += nk.length * 3;
                        matchCount++;
                    } else {
                        const words = nk.split(" ").filter(w => w.length > 2);
                        if (words.length >= 2 && words.every(w => text.includes(w))) {
                            score += nk.length * 2;
                            matchCount++;
                        }
                    }
                }
                if (matchCount > 0) {
                    score += topic.priority + (matchCount * 5);
                    if (score > bestScore) {
                        bestScore = score;
                        bestTopic = name;
                    }
                }
            }
            return { topic: bestTopic, score: bestScore };
        }

        const FALLBACK_RESPONSES = [
            `Cô đang lắng nghe em 💜 Cô chưa hiểu hết điều em muốn chia sẻ. Em có thể kể thêm một chút về chuyện đang xảy ra không? Cứ nói tự nhiên nhất nhé!`,
            `Cô hiểu rằng có thể em đang có điều khá khó nói 🌱 Hãy thử bắt đầu bằng: "Em đang buồn vì..." hoặc "Em đang lo lắng vì..." Cô sẽ cùng em xem xét từng bước một.`,
            `Cô luôn ở đây 💜 Nếu chưa biết bắt đầu từ đâu, em có thể chọn các gợi ý bên dưới hoặc nói: "Em muốn được tư vấn" — cô sẽ lắng nghe em thật kỹ!`
        ];

        function getResponse(userText) {
            const normalized = normalizeText(userText);
            if (!normalized) return `Em hãy nhập điều em muốn chia sẻ với cô nhé 💜`;
            
            // Ưu tiên kiểm tra an toàn
            const safetyResp = checkSafety(userText);
            if (safetyResp) return safetyResp;
            
            // Yêu cầu liên hệ
            if (isContactRequest(normalized)) return getContactResponse();
            
            // Yêu cầu tư vấn trực tiếp
            if (isCounselorRequest(normalized)) return getContactResponse();
            
            // Nhận diện chủ đề
            const result = detectIntent(userText);
            if (result.topic && result.score > 0) {
                const responses = KNOWLEDGE[result.topic].responses;
                return responses[Math.floor(Math.random() * responses.length)].replace(/\n/g, '<br>');
            }
            
            // Không khớp chủ đề
            return FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
        }

        // ================================================================
        // GIAO DIỆN & XỬ LÝ GỬI TIN
        // ================================================================
        const messageInput = document.getElementById("messageInput");
        const sendBtn = document.getElementById("sendBtn");
        const chatMessages = document.getElementById("chatMessages");
        const quickReplies = document.getElementById("quickReplies");

        function escapeHTML(text) {
            const div = document.createElement("div");
            div.textContent = text;
            return div.innerHTML;
        }

        function addMessage(text, isUser = false) {
            if (!chatMessages) return;
            const div = document.createElement("div");
            div.className = `message ${isUser ? "user-message" : "bot-message"}`;
            div.innerHTML = `
                ${isUser ? `<div class="user-avatar"></div>` : `<div class="bot-avatar"><i class="fas fa-user-nurse"></i></div>`}
                <div class="message-content">${text}</div>
            `;
            chatMessages.appendChild(div);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function showTyping() {
            if (!chatMessages) return;
            const typing = document.createElement("div");
            typing.id = "typingIndicator";
            typing.className = "message bot-message";
            typing.innerHTML = `<div class="bot-avatar"><i class="fas fa-user-nurse"></i></div><div class="message-content">Đang suy nghĩ... 💭</div>`;
            chatMessages.appendChild(typing);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function removeTyping() {
            const el = document.getElementById("typingIndicator");
            if (el) el.remove();
        }

        function sendMessage(text) {
            if (!text || !text.trim()) return;
            
            addMessage(escapeHTML(text.trim()), true);
            if (messageInput) messageInput.value = "";
            
            showTyping();
            setTimeout(() => {
                removeTyping();
                const reply = getResponse(text.trim());
                addMessage(reply, false);
            }, 700 + Math.random() * 500);
        }

        // Gắn sự kiện - ĐÃ SỬA LỖI KHÔNG NHẬN TIN
        if (sendBtn) {
            sendBtn.addEventListener("click", () => {
                sendMessage(messageInput?.value || "");
            });
        }

        if (messageInput) {
            messageInput.addEventListener("keypress", e => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    sendMessage(messageInput.value);
                }
            });
        }

        if (quickReplies) {
            quickReplies.querySelectorAll(".reply-btn").forEach(btn => {
                btn.addEventListener("click", () => {
                    sendMessage(btn.dataset.message || btn.textContent.trim());
                });
            });
        }

        // Lời chào đầu tiên
        function showWelcome() {
            if (!chatMessages || chatMessages.children.length > 0) return;
            addMessage(`<strong>Chào em 🌸</strong><br><br>Cô Hường là giáo viên tư vấn tâm lý học đường. Cô ở đây để lắng nghe và cùng em tháo gỡ những điều em băn khoăn 💜<br><br>Em có thể chia sẻ về học tập, bạn bè, gia đình, cảm xúc hoặc bất kỳ điều gì. Hoặc chọn gợi ý bên dưới nhé!`);
        }

        // Khởi động
        document.addEventListener("DOMContentLoaded", showWelcome);
        if (document.readyState === "complete" || document.readyState === "interactive") {
            setTimeout(showWelcome, 100);
        }
    </script>
</body>
</html>
