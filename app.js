// ================================================================
// CHATBOT TƯ VẤN TÂM LÝ HỌC ĐƯỜNG - BẢN HOÀN CHỈNH
// Nguồn kiến thức: 1000 câu hỏi & đáp án tâm lý học đường
// ================================================================

// ================================================================
// 1. LẤY CÁC PHẦN TỬ GIAO DIỆN
// ================================================================
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const chatMessages = document.getElementById("chatMessages");
const quickReplies = document.getElementById("quickReplies");

// ================================================================
// 2. THÔNG TIN CHATBOT / LIÊN HỆ
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
// 3. QUY TẮC TƯ VẤN
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
// 4. CHUẨN HÓA VĂN BẢN TIẾNG VIỆT
// ================================================================
function normalizeText(text) {
    return String(text || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/[.,!?;:()[\]{}"']/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

// ================================================================
// 5. KHO KIẾN THỨC TƯ VẤN - ĐẦY ĐỦ TỪ TÀI LIỆU 1000 CÂU
// ================================================================
const KNOWLEDGE = {
    // ============================================================
    // CHÀO HỎI & KHAI THÁC
    // ============================================================
    chao_hoi: {
        priority: 20,
        keywords: [
            "chao", "xin chao", "hello", "hi", "co oi", "em chao co",
            "chao co", "co a", "bat dau", "hoi dap"
        ],
        responses: [
            `Chào em 🌸 Cô Hường rất vui được trò chuyện cùng em.
Em có thể chia sẻ về học tập, bạn bè, gia đình, cảm xúc hoặc bất kỳ điều gì đang băn khoăn.
Em muốn kể chuyện gì trước? 💜`,
            },

    // ============================================================
    // CHỦ ĐỀ 1: NHẬN DIỆN & QUẢN LÝ CẢM XÚC (Câu 1–100)
    // ============================================================
    cam_xuc_nhan_dien: {
        priority: 95,
        keywords: [
            "buon vo co", "tai sao de cau gat", "khong hieu cam xuc",
            "buon va tram cam khac nhau", "thay minh vo dung",
            "lo lang qua muc", "biet minh dang stress", "hay khoc co yeu duoi",
            "co don du co ban", "vi sao suy nghi tieu cuc", "cam xuc co ban"
        ],
        responses: [
            `Em đừng quá lo lắng 💜 Những cảm xúc như buồn, lo lắng, mệt mỏi đều rất bình thường.
- Buồn vô cớ: có thể do thay đổi cơ thể tuổi dậy thì hoặc căng thẳng ngầm.
- Buồn khác trầm cảm: buồn là tạm thời; trầm cảm kéo dài trên 2 tuần, ảnh hưởng sinh hoạt hàng ngày.
- Khóc không phải yếu đuối, đó là cách giải tỏa cảm xúc lành mạnh.
Em có thể nói rõ hơn em đang cảm thấy như thế nào không?`,
            `Cảm xúc của em luôn đáng được lắng nghe 🌱
Khi áp lực cao, não dễ tập trung vào điều tiêu cực — đó không phải lỗi của em.
Viết ra giấy những suy nghĩ sẽ giúp em rõ ràng hơn.
Em muốn nói về điều gì đang làm em bận tâm?`
        ]
    },
    cam_xuc_kiem_soat: {
        priority: 90,
        keywords: [
            "lam sao bot gian", "nong tinh", "binh tinh khi bi che",
            "tuc ma khong noi duoc", "xu ly khi bi hieu lam",
            "lam sao vui len", "tu trach ban than", "kiem soat loi noi luc gian",
            "bi anh huong loi nguoi khac", "qua buon nen lam gi"
        ],
        responses: [
            `Khi tức giận, em hãy thử:
✅ Hít thở sâu 5 lần, tạm rời khỏi tình huống
✅ Đếm 1–10 trước khi nói
✅ Viết ra giấy những điều muốn nói
✅ Nhắc mình: "Lời nhận xét không quyết định giá trị của em"
✅ Tìm người tin tưởng để chia sẻ thay vì giữ trong lòng
Em đang tức giận về chuyện gì vậy? 💜`,
            `Em hoàn toàn có quyền cảm thấy tức giận hoặc buồn bã 💜
Điều quan trọng là không để cảm xúc điều khiển hành động.
Nếu khó nói trực tiếp, em có thể viết thư hoặc nhắn tin sau khi bình tĩnh hơn.
Em muốn kể cho cô nghe chuyện xảy ra không?`
        ]
    },
    tu_tin_va_long_tu_trong: {
        priority: 85,
        keywords: [
            "thay minh kem hon ban", "tu ti vi ngoai hinh", "lam sao tu tin hon",
            "so phat bien truoc lop", "ngai giao tiep", "so sanh ban than",
            "bi danh gia", "khong co tai nang", "yeu ban than", "thieu dong luc"
        ],
        responses: [
            `Giá trị của em không chỉ nằm ở ngoại hình, điểm số hay lời người khác 💛
✅ Mỗi người có tốc độ phát triển và điểm mạnh riêng
✅ Tập trung vào điều em làm tốt, dù nhỏ
✅ Bắt đầu từ việc đơn giản: chào hỏi, nói trước nhóm nhỏ
✅ Ghi nhận những điều tốt mình làm mỗi ngày
Em đang thiếu tự tin về điều gì nhất?`,
            `Không ai hoàn hảo cả 💜 Em không cần giống người khác mới có giá trị.
Thay vì so sánh "hậu trường" của mình với "bề ngoài" của người khác, hãy tự hỏi:
"Hôm nay mình đã tiến bộ hơn một chút không?"
Em có điều gì mình làm tốt không? Kể cho cô nghe nhé!`
        ]
    },
    xu_ly_cam_xuc_tieu_cuc: {
        priority: 80,
        keywords: [
            "suy nghi qua nhieu", "am anh loi sai", "so that bai",
            "khong ai hieu", "de ton thuong", "gian nhung lai cuoi",
            "buon ban dem", "ap luc vo hinh", "ghen ti", "khac biet",
            "ghet chinh minh", "cam thay trong rong", "so bi tu choi"
        ],
        responses: [
            `Khi suy nghĩ quá nhiều, hãy tập trung vào những điều em có thể kiểm soát 💜
- Sai lầm là cơ hội học hỏi, không phải bằng chứng thất bại
- Nếu khó chia sẻ, bắt đầu bằng: "Em đang buồn vì..."
- Cảm xúc kìm nén lâu ngày không tốt, hãy tìm cách giải tỏa
- Mỗi người có vẻ đẹp riêng, sự khác biệt tạo nên em
Em có muốn chia sẻ điều đang khiến em nặng lòng không?`,
            `Thất bại không định nghĩa con người em 🌱
Nếu cảm thấy trống rỗng, hãy thử tham gia hoạt động mới, gặp gỡ bạn bè.
Từ chối không phải là thất bại, mà là cơ hội tìm người phù hợp hơn.
Em đang cảm thấy thế nào?`
        ]
    },

    // ============================================================
    // CHỦ ĐỀ 2: ÁP LỰC HỌC TẬP & THI CỬ (Câu 101–200)
    // ============================================================
    ap_luc_hoc_tap_nhan_dien: {
        priority: 95,
        keywords: [
            "hoc nhieu met qua", "so di hoc", "luon lo ve diem so",
            "ap luc tu gia dinh", "so thi mat ngu", "hoc mai khong vao",
            "so bi so sanh", "hoc cham hon lop", "so bi goi tra loi",
            "cang thang truoc kiem tra", "ba me ky vong cao"
        ],
        responses: [
            `Điểm số quan trọng nhưng không phải tất cả giá trị của em 📚
✅ Nếu cảm thấy quá tải: sắp xếp lại thời gian, chia bài thành phần nhỏ
✅ Nên chia sẻ với gia đình: "Con cố gắng hết sức, mong bố mẹ hiểu cho con"
✅ Học 45 phút nghỉ 5–10 phút, không nên học khuya
✅ Mỗi người có tốc độ học khác nhau, không cần chạy đua với ai
Em đang áp lực từ đâu nhiều nhất?`,
            `Sợ đi học hoặc sợ thi là phản ứng bình thường khi căng thẳng 💜
Hãy xác định rõ: em sợ nội dung bài, sợ kết quả hay sợ phản ứng của người khác?
Từ đó chúng ta sẽ tìm giải pháp cụ thể. Em kể cho cô nghe nhé!`
        ]
    },
    quan_ly_thoi_gian_phuong_phap_hoc: {
        priority: 85,
        keywords: [
            "hoc hieu qua", "tri hoan bai tap", "mat tap trung khi hoc",
            "khong biet lap thoi gian bieu", "hoc bao lau thi nghi",
            "hoc truoc quen sau", "hoc lech mon", "hoc nuoc rut",
            "khong thich mon hoc", "chuong trinh qua kho"
        ],
        responses: [
            `Phương pháp học hiệu quả giúp em không cần học quá nhiều vẫn tiến bộ ✨
✅ Chia nội dung thành phần nhỏ, ôn theo từng phần
✅ Tắt điện thoại, chọn nơi yên tĩnh
✅ Ôn lại sau 24 giờ để ghi nhớ lâu hơn
✅ Lập thời gian biểu cụ thể: giờ học, giờ nghỉ, giờ chơi
✅ Hỏi thầy cô/bạn khi chưa hiểu thay vì để chồng chất
Em gặp khó khăn ở môn nào nhất?`,
            `Bắt đầu từ việc nhỏ nhất cũng được tạo động lực 💜
Thay vì nghĩ "phải học hết chương này", hãy nghĩ "học xong 1 trang rồi nghỉ".
Nếu không thích môn nào, thử tìm cách học thú vị hơn: xem video, học nhóm, liên hệ thực tế.
Em muốn cải thiện môn nào trước?`
        ]
    },
    ap_luc_tu_gia_dinh_xa_hoi: {
        priority: 90,
        keywords: [
            "ba me muon dung dau lop", "so lam bo me that vong",
            "ho hang hoi diem", "ap luc vi ban hoc them nhieu",
            "so bi thay co danh gia", "ap luc thi vao truong tot",
            "thua kem anh chi", "bi ep chon khoi", "ap luc chuyen cap",
            "so tuong lai vi hoc chua gioi"
        ],
        responses: [
            `Bố mẹ yêu em vì con người em, không chỉ vì điểm số 💜
✅ Em có thể nói: "Con cố gắng hết sức với khả năng của mình, mong bố mẹ hiểu"
✅ Không cần trả lời chi tiết khi họ hàng hỏi điểm, có thể nói: "Cũng ổn ạ, con sẽ cố gắng hơn"
✅ Mỗi người có con đường riêng, không nhất thiết giống anh chị
✅ Chọn trường phù hợp năng lực hơn trường nổi tiếng
Em có dám chia sẻ với bố mẹ những suy nghĩ của mình không?`,
            `Thành công không chỉ đo bằng điểm số hay trường danh tiếng 🌱
Ở độ tuổi này, chưa biết chắc tương lai làm gì là hoàn toàn bình thường.
Quan trọng là em phát triển thành người tốt, có ý chí và biết yêu thương.
Em có điều mình thích hoặc mong muốn thử không?`
        ]
    },
    xu_ly_khi_diem_thap: {
        priority: 92,
        keywords: [
            "diem kem rat buon", "so dua bai kiem tra cho cha me",
            "bi thay co nhac nhat truoc lop", "mat tu tin sau thi truoc",
            "xau ho vi diem thap", "muon giu diem kem", "bi ban che",
            "nghi minh khong hop hoc", "hoc nhieu ma diem van thap",
            "so thi lai"
        ],
        responses: [
            `Một điểm thấp không quyết định tương lai của em 💜
✅ Phân tích lỗi sai để rút kinh nghiệm thay vì tự trách
✅ Trung thực với gia đình: chia sẻ kế hoạch cải thiện sẽ được ủng hộ
✅ Điểm số không phản ánh hết năng lực — thông minh có nhiều dạng
✅ Nếu học nhiều mà không hiệu quả, đổi phương pháp chứ không phải tăng thời gian
Em có xem lại lỗi sai trong bài chưa?`,
            `Không ai tiến bộ mà không từng vấp ngã 🌱
Giấu điểm không giúp em tiến bộ. Chia sẻ sớm sẽ nhận được hỗ trợ sớm.
Em không cần giỏi tất cả các môn, chỉ cần không ngừng cố gắng là đủ rồi.
Em muốn cải thiện như thế nào? Cô sẽ cùng em lập kế hoạch!`
        ]
    },

    // ============================================================
    // CHỦ ĐỀ 3: BẠO LỰC HỌC ĐƯỜNG (Câu 201–300 + 501–600)
    // ============================================================
    bao_luc_nhan_dien: {
        priority: 140,
        keywords: [
            "bao luc hoc duong la gi", "chui nhau co phai bao luc",
            "treu choc nhieu lan", "bao luc tinh than nguy hiem",
            "danh ban mot lan", "co lap ban", "tung tin don",
            "cuoi ngoai hinh", "dang anh xau tren mang", "bao luc mang",
            "bat nat la gi", "khac nhau gi bat nat va mau thuan"
        ],
        responses: [
            `Bạo lực học đường là mọi hành vi gây tổn thương thể chất hoặc tinh thần, lặp lại và có sự chênh lệch quyền lực ⚠️
✅ Bao gồm: đánh, chửi, chế giễu, cô lập, tung tin đồn, đăng ảnh xấu trên mạng
✅ Trêu chọc nhiều lần khiến người khác buồn = bắt nạt
✅ Cô lập, nói xấu sau lưng cũng là bạo lực tinh thần
✅ Im lặng sẽ khiến tình trạng kéo dài
Em hoặc bạn bè đang gặp chuyện này phải không? Kể cho cô nghe nhé, cô sẽ giữ bí mật và hỗ trợ em! 💜`,
            `Lỗi không bao giờ thuộc về người bị bắt nạt 💜
Nếu em thấy bạn bị bắt nạt: không cổ vũ, không quay clip, hãy báo người lớn đáng tin cậy.
Im lặng có thể bị hiểu là đồng tình.
Em có đang chứng kiến hoặc trải qua điều gì không an toàn không?`
        ]
    },
    bao_luc_ung_pho: {
        priority: 145,
        keywords: [
            "bi bat nat phai lam gi", "so bi tra thu neu noi",
            "bi doa khong cho noi", "bi co lap", "bi noi xau sau lung",
            "bi danh khong dam ke", "bi bat nat tren mang", "xau ho khi bi bat nat",
            "so di hoc", "bi lay do dung", "bi che gieu", "bi xuc pham",
            "luu bang chung", "chong lai bao luc mang"
        ],
        responses: [
            `Em không đơn độc và không cần chịu đựng một mình 💜
✅ Nói ngay với giáo viên chủ nhiệm, cô tư vấn hoặc bố mẹ — đó không phải "mách lẻo" mà là bảo vệ chính mình
✅ Lưu lại tin nhắn, ảnh, bằng chứng
✅ Chặn tài khoản gây phiền nhiễu trên mạng
✅ Tránh đi một mình, đi cùng bạn hoặc người lớn
✅ Không trả đũa bằng bạo lực, dễ làm tình hình nghiêm trọng hơn
Em đang bị ai đó làm phiền phải không? Hãy nói cho cô biết, cô sẽ cùng em giải quyết!`,
            `Sợ bị trả thù là hoàn toàn bình thường, nhưng im lặng sẽ khiến họ càng lấn tới ⚠️
Nhà trường và gia đình có trách nhiệm bảo vệ em. Hãy tìm người em tin tưởng nhất để chia sẻ.
Em có người mình tin tưởng để nói chuyện không?`
        ]
    },

    // ============================================================
    // CHỦ ĐỀ 4: TÌNH BẠN TUỔI HỌC TRÒ (Câu 301–400)
    // ============================================================
    tinh_ban_xay_dung: {
        priority: 85,
        keywords: [
            "tinh ban la gi", "lam sao co ban moi", "ngai bat chuyen",
            "ban than co can giong nhau", "giu tinh ban lau dai",
            "khong co ban than", "kho tin nguoi khac", "chia se bi mat",
            "ban tot co dac diem gi", "muon than hon voi ban"
        ],
        responses: [
            `Tình bạn đẹp dựa trên sự chân thành, tin tưởng và tôn trọng lẫn nhau 💛
✅ Bắt đầu bằng câu hỏi đơn giản: "Bạn học bài này chưa?"
✅ Không cần giống nhau mới chơi được, khác biệt giúp bổ sung cho nhau
✅ Chia sẻ bí mật chỉ khi thực sự tin tưởng
✅ Chất lượng quan trọng hơn số lượng — một người bạn thật tốt hơn nhiều người chỉ chơi vui
Em muốn kết bạn với ai đó nhưng ngại ngùng phải không?`,
            `Để có bạn tốt, trước tiên hãy là một người bạn tốt 💜
- Lắng nghe khi bạn nói, không ngắt lời
- Giữ lời hứa, nếu không làm được thì không hứa
- Không nói xấu bạn sau lưng
- Tôn trọng bạn có thêm bạn khác, không chiếm hữu
Em đang gặp khó khăn trong quan hệ bạn bè à?`
        ]
    },
    mau_thuan_trong_tinh_ban: {
        priority: 90,
        keywords: [
            "gian ban vi that hua", "ban noi xau sau lung", "bi hieu lam",
            "cai nhau vi chuyen nho", "kho noi xin loi", "ban choi voi nguoi khac",
            "cam thay bo roi", "khong thich ban choi voi minh ghet",
            "lam gi khi tinh ban ran nut", "cat dut tinh ban",
            "ban loi dung", "ban ep lam dieu khong muon", "ban kiem soat"
        ],
        responses: [
            `Mâu thuẫn trong tình bạn là điều bình thường, cách giải quyết mới quan trọng 💜
✅ Nói rõ cảm xúc thay vì im lặng: "Mình buồn khi bạn làm vậy vì..."
✅ Xin lỗi không làm mất thể diện, mà thể hiện sự trưởng thành
✅ Bạn có quyền có nhiều mối quan hệ, không nên kiểm soát
✅ Nếu bạn liên tục yêu cầu em làm điều không muốn hoặc chê bai → đó không phải tình bạn lành mạnh
Em đang gặp chuyện gì với bạn bè vậy?`,
            `Chấp nhận cô đơn tạm thời tốt hơn ở trong mối quan hệ khiến mình mệt mỏi 💛
Nếu bạn luôn lợi dụng, ép em làm trái ý, chế giễu em → hãy đặt ranh giới rõ ràng: "Mình không làm được việc đó, đừng bắt mình nhé"
Em có dám nói "không" với bạn không?`
        ]
    },

    // ============================================================
    // CHỦ ĐỀ 5: TÌNH CẢM TUỔI DẬY THÌ (Câu 401–500)
    // ============================================================
    tinh_cam_tuoi_day_thi: {
        priority: 100,
        keywords: [
            "thich mot ban co binh thuong khong", "thich co phai yeu khong",
            "nghi ve ban ay suot ngay", "tim dap nhanh khi gap ban ay",
            "ngai noi chuyen voi nguoi minh thich", "thich hay nguong mo",
            "co nen noi cho ban ay biet", "so bi tu choi", "buon vi ban ay khong chu y",
            "thay minh thay doi vi thich ai do", "yeu som anh huong hoc tap",
            "mat tap trung vi thich ban", "giu kin hay chia se", "hen ho o tuoi nay"
        ],
        responses: [
            `Cảm xúc rung động ở tuổi em là hoàn toàn bình thường và rất đẹp 💜
✅ Thích không nhất thiết là yêu — đó là cảm xúc ban đầu, trong sáng
✅ Không đáp lại tình cảm của ai đó cũng không phải lỗi
✅ Ưu tiên hàng đầu: học tập và phát triển bản thân
✅ Nếu muốn chia sẻ, chọn người tin tưởng thay vì nói công khai
✅ Giữ ranh giới rõ ràng: không chia sẻ ảnh riêng tư, không làm điều mình không muốn
Em đang băn khoăn điều gì nhất trong chuyện này?`,
            `Từ chối không làm giảm giá trị của em đâu 💛
Dũng cảm bày tỏ đã là điều rất đáng trân trọng rồi.
Nếu bị từ chối, hãy cho mình thời gian buồn rồi tiếp tục phát triển — người phù hợp sẽ đến khi em trưởng thành hơn.
Em có đang suy nghĩ có nên bày tỏ hay không?`
        ]
    },
    chia_tay_va_ranh_gioi: {
        priority: 95,
        keywords: [
            "buon bi tu choi", "bi phu lo", "khoc vi tinh cam",
            "khong quen duoc nguoi ay", "xau ho bi tu choi", "chia tay dau long",
            "muon quay lai", "bi treu chia tay", "mat ham thich hoc",
            "mat niem tin vao tinh yeu", "giu khoang cach", "bi ep lam dieu khong muon",
            "chia se anh rieng tu", "bi kiem soat", "bi loi dung"
        ],
        responses: [
            `Buồn khi chia tay hoặc bị từ chối là hoàn toàn tự nhiên 💜
✅ Cho mình thời gian để vượt qua, không cần ép mình "phải vui ngay"
✅ Không chia sẻ ảnh riêng tư cho bất kỳ ai — đó là quyền bảo vệ bản thân
✅ Nếu ai đó ép em làm điều không muốn, đe dọa hoặc kiểm soát → nói ngay với người lớn đáng tin cậy
✅ Tập trung vào gia đình, bạn bè, sở thích — cuộc sống còn nhiều điều đẹp khác
Em có cảm thấy bị áp lực hoặc không an toàn không?`,
            `Giá trị của em không phụ thuộc vào việc ai đó có thích em hay không 💛
Nếu mối quan hệ khiến em mệt mỏi, sợ hãi hoặc mất chính mình → có quyền dừng lại.
Em xứng đáng được tôn trọng và yêu thương thật sự.
Em có muốn chia sẻ thêm về cảm xúc của mình không?`
        ]
    },

    // ============================================================
    // CHỦ ĐỀ 6: GIA ĐÌNH & MỐI QUAN HỆ CHA MẸ (Câu 701–800)
    // ============================================================
    gia_dinh_mau_thuan: {
        priority: 90,
        keywords: [
            "tai sao cai loi cha me", "mau thuan voi cha me co binh thuong",
            "bo me nhac nhieu", "bo me khong hieu", "bi so sanh voi con nha nguoi ta",
            "kiem soat dien thoai", "la mung co giup tien bo", "im lang khi gian",
            "ap dat nghe nghiep", "cai nhau truoc mat nguoi khac", "bo me so diem",
            "khong cho di choi", "noi doi de tranh bi mang", "nghiem khac co phai khong yeu",
            "cam thay bat cong", "so sanh anh chi", "tranh mat cha me khi gian"
        ],
        responses: [
            `Ở tuổi này, muốn khẳng định bản thân và độc lập là điều hoàn toàn tự nhiên 💜
✅ Bố mẹ lo lắng nên hay nhắc nhở, nhưng đôi khi cách thể hiện khiến em khó chịu
✅ Nói "Con cảm thấy..." thay vì "Bố mẹ luôn..." sẽ giảm đối đầu
✅ Viết thư nếu khó nói trực tiếp
✅ Không so sánh — mỗi người có con đường riêng
✅ Nếu kỳ vọng quá cao, chia sẻ thật: "Con cố gắng nhưng không thể hoàn hảo"
Em có dám nói những điều này với bố mẹ không?`,
            `Khác biệt thế hệ tạo ra khoảng cách, nhưng hiểu nhau sẽ thu hẹp khoảng cách đó 💛
- Chọn lúc bình tĩnh để nói, không nói khi đang giận
- Lắng nghe bố mẹ trước khi yêu cầu được lắng nghe
- Không im lặng kéo dài, càng im lặng càng khó hiểu nhau
- Nếu không nói được trực tiếp, viết thư hoặc nhắn tin
Em muốn cô hướng dẫn cách nói chuyện với bố mẹ không?`
        ]
    },

    // ============================================================
    // CHỦ ĐỀ 7: TỰ TIN, HÌNH ẢNH BẢN THÂN & TUỔI DẬY THÌ (Câu 801–900)
    // ============================================================
    tu_tin_va_ngoai_hinh: {
        priority: 85,
        keywords: [
            "tu ti la gi", "vi sao de tu ti o tuoi nay", "so sanh ngoai hinh",
            "bi che ngoai hinh", "dau hieu tu ti", "giam diem hoc tap",
            "so nguoi khac danh gia", "khac biet tu ti va khiem ton",
            "mang xa hoi lam tang tu ti", "thay minh kem", "bi mun",
            "cao thap khac nhau", "an kieng cuc doan", "trang diem o tuoi nay",
            "soi guong chi thay khuyet diem", "chap nhan co the minh"
        ],
        responses: [
            `Giá trị của em không nằm ở chiều cao, vóc dáng hay vẻ bề ngoài 💜
✅ Mỗi người phát triển theo tốc độ riêng — ai cao sớm, ai muộn hơn
✅ Mụn, thay đổi cơ thể là hoàn toàn bình thường ở tuổi dậy thì
✅ Hình ảnh trên mạng đã qua chỉnh sửa, không phải chuẩn mực thực tế
✅ Không ăn kiêng cực đoan, sẽ ảnh hưởng sức khỏe và phát triển
✅ Tập trung vào những điều em làm tốt, nhân cách của mình
Em đang tự ti về điều gì trên bản thân?`,
            `Chấp nhận bản thân là bước đầu để tự tin 🌱
Thay vì chỉ nhìn khuyết điểm, hãy tìm ra 3 điều em thích về mình.
Tự tin không phải không sợ, mà là dám làm dù còn sợ.
Em có điểm mạnh nào mà mình tự hào không?`
        ]
    },

    // ============================================================
    // CHỦ ĐỀ 8: SỨC KHỎE TINH THẦN & TÌM KIẾM HỖ TRỢ (Câu 901–1000)
    // ============================================================
    suc_khoe_tinh_than: {
        priority: 105,
        keywords: [
            "suc khoe tinh than la gi", "buon nhieu ngay lien tuc",
            "lo au khac gi cang thang", "mat hung thu voi moi viec",
            "met mofi du ngu du", "khoc la yeu duoi", "suy nghi tieu cuc nguy hiem",
            "tram cam la gi", "cam thay vo dung", "quan trong nhu suc khoe the chat",
            "ngai noi ve cam xuc", "khong ai hieu", "tu lam dau ban than",
            "co the boi lo au", "tien trien duoc", "giu trong long khong tot"
        ],
        responses: [
            `Sức khỏe tinh thần quan trọng không kém sức khỏe thể chất 💜
⚠️ Dấu hiệu cần chú ý nếu kéo dài trên 2 tuần:
- Buồn bã, mất hứng thú, mệt mỏi không rõ lý do
- Ngủ quá nhiều hoặc không ngủ được
- Không muốn ăn hoặc ăn quá nhiều
- Suy nghĩ làm tổn thương bản thân
→ Hãy nói ngay với người lớn em tin tưởng, đó không phải yếu đuối mà là dũng cảm!
Em có cảm thấy những điều này không?`,
            `Không ai phải đối mặt với khó khăn một mình 💛
Nếu em cảm thấy quá nặng nề, hãy tìm đến:
- Bố mẹ, giáo viên chủ nhiệm
- Cô tư vấn tâm lý — phòng tư vấn luôn mở cửa
- Tổng đài tư vấn tâm lý học đường
Chia sẻ không làm em yếu đi, mà giúp em nhẹ lòng hơn.
Em có muốn được lắng nghe nhiều hơn không?`
        ]
    },

    // ============================================================
    // CHỦ ĐỀ 9: KỸ NĂNG SỐNG & TỰ BẢO VỆ
    // ============================================================
    ky_nang_tu_bao_ve: {
        priority: 110,
        keywords: [
            "bao ve ban than", "noi khong", "bi ep gui anh", "bi yeu cau thong tin",
            "nguoi la nhan tin", "an toan tren mang", "khong chia se mat khau",
            "dia chi nha", "so dien thoai", "bi doa gui anh", "nguoi lon cham vao",
            "bi xam hai", "bi loi keo", "bi tong tien bang anh"
        ],
        responses: [
            `An toàn của em luôn được đặt lên hàng đầu ⚠️
✅ Không chia sẻ mật khẩu, địa chỉ, số điện thoại, ảnh riêng tư cho bất kỳ ai
✅ Không gặp người lạ mà không có người lớn đi cùng
✅ Nếu ai đó đe dọa, ép em làm điều không muốn → nói ngay với bố mẹ hoặc giáo viên
✅ Lưu lại tin nhắn, bằng chứng
✅ Em có quyền từ chối bất kỳ yêu cầu nào khiến em không thoải mái
Em có đang nhận được tin nhắn hoặc yêu cầu kỳ lạ không? Hãy nói cho cô biết! 💜`,
            `Không ai có quyền ép em làm điều mình không muốn 💜
Nếu ai đó nói "gửi ảnh thì mới chơi với bạn" hoặc đe dọa → đó không phải bạn thật sự.
Hãy kể ngay cho người em tin tưởng. Em không có lỗi trong chuyện này.
Em có muốn chia sẻ thêm không? Cô sẽ lắng nghe và hỗ trợ em.`
        ]
    },

    // ============================================================
    // CHỦ ĐỀ 10: MẠNG XÃ HỘI
    // ============================================================
    mang_xa_hoi: {
        priority: 95,
        keywords: [
            "mang xa hoi anh huong", "bi noi xau tren mang", "binh luan tieu cuc",
            "dang anh khong phep", "thoi gian dung dien thoai", "nghien mang",
            "so sanh tren mang", "thap cam khi xem mang", "bi lam phien tren mang",
            "chong tai khoan", "bao quan tri"
        ],
        responses: [
            `Mạng xã hội có nhiều điều thú vị nhưng cũng tiềm ẩn rủi ro 📱
✅ Hình ảnh trên mạng thường không phản ánh toàn bộ cuộc sống thực
✅ Giới hạn thời gian sử dụng, tránh ảnh hưởng học tập và giấc ngủ
✅ Bị bình luận tiêu cực: không trả lời, chặn tài khoản, báo quản trị
✅ Không chia sẻ thông tin cá nhân, ảnh vị trí
✅ Không gặp người quen trên mạng một mình
Em có bị ảnh hưởng gì từ mạng xã hội không?`
        ]
    }
};

// ================================================================
// 6. NHÓM TÌNH HUỐNG AN TOÀN - ƯU TIÊN CAO NHẤT
// ================================================================
const SAFETY_GROUPS = {
    self_harm: [
        "muon lam hai ban than", "lam hai ban than", "tu lam hai", "tu lam dau",
        "khong muon song", "khong muon ton tai", "muon chet", "muon tu tu",
        "tu tu", "ket thuc cuoc song", "khong muon song nua", "chet di",
        "muon bien mat khoi cuoc doi", "tat ca deu vo nghia", "khong con ly do song",
        "khong ai quan tam den em", "khong ai hieu", "muon bien mat"
    ],
    harm_others: [
        "muon lam hai nguoi khac", "muon giet nguoi", "muon danh nguoi",
        "muon lam nguoi khac bi thuong", "muon tra thu bang bao luc"
    ],
    immediate_danger: [
        "dang gap nguy hiem", "dang bi de doa", "bi doa giet", "bi doa danh",
        "dang bi danh", "dang bi hanh hung", "co nguoi dang danh em",
        "co nguoi dang lam hai em", "khong an toan", "dang bi xam hai"
    ],
    exploitation: [
        "bi ep gui anh", "bi ep gui anh rieng tu", "bi ep gui anh nhay cam",
        "nguoi lon cham vao", "bi cham vao", "bi ep buoc", "bi xam hai",
        "bi xam pham", "bi loi keo", "bi tong tien bang anh", "bi yeu cau gui anh"
    ]
};

// ================================================================
// 7. KIỂM TRA AN TOÀN - ĐƯỢC GỌI TRƯỚC NHẤT
// ================================================================
function checkSafety(text) {
    const normalized = normalizeText(text);
    
    if (containsAny(normalized, SAFETY_GROUPS.self_harm)) {
        return `
            <strong>💜 Cô rất quan tâm đến sự an toàn của em.</strong><br><br>
            Nếu em đang có ý nghĩ làm đau bản thân hoặc không muốn sống, điều quan trọng nhất lúc này là 
            <strong>em không nên ở một mình</strong>.<br><br>
            Hãy tìm ngay một người lớn đáng tin cậy đang ở gần em: bố mẹ, người thân, giáo viên hoặc cô tư vấn, 
            và nói cho họ biết em đang cảm thấy như thế nào.<br><br>
            Nếu em đang ở trong tình huống nguy hiểm ngay lúc này, hãy rời khỏi nơi không an toàn và tìm người lớn hỗ trợ trực tiếp.<br><br>
            <strong>📞 Cô Hường: ${INFO.phone}</strong><br>
            Em rất đáng được yêu thương và hỗ trợ, đừng từ bỏ nhé 💜
        `;
    }
    
    if (containsAny(normalized, SAFETY_GROUPS.harm_others)) {
        return `
            <strong>Cô muốn ưu tiên sự an toàn của em và những người xung quanh.</strong><br><br>
            Khi đang quá tức giận, em hãy tạo khoảng cách với người hoặc đồ vật có thể gây nguy hiểm 
            và không hành động bằng bạo lực.<br><br>
            Hãy tìm ngay một người lớn đáng tin cậy để ở cùng và giúp em xử lý tình huống.<br><br>
            Nếu em muốn, em có thể kể cho cô biết điều gì đã khiến em tức giận đến mức này.
        `;
    }
    
    if (containsAny(normalized, SAFETY_GROUPS.immediate_danger)) {
        return `
            <strong>⚠️ Cô muốn ưu tiên sự an toàn của em trước.</strong><br><br>
            Nếu em đang bị đe dọa hoặc bị làm hại ngay lúc này, hãy tìm người lớn đáng tin cậy ở gần em 
            và rời khỏi nơi không an toàn nếu có thể.<br><br>
            Em hãy nói ngay với cha mẹ, giáo viên, cô tư vấn tâm lý hoặc người lớn mà em tin tưởng.<br><br>
            <strong>📞 Cô Hường: ${INFO.phone}</strong>
        `;
    }
    
    if (containsAny(normalized, SAFETY_GROUPS.exploitation)) {
        return `
            <strong>💜 Em không có lỗi khi bị người khác ép buộc hoặc làm điều khiến em không thoải mái.</strong><br><br>
            Em không cần tiếp tục làm theo yêu cầu của người đó. Nếu có thể, hãy giữ lại thông tin, 
            tin nhắn liên quan và nói ngay với một người lớn đáng tin cậy.<br><br>
            Nếu em đang gặp nguy hiểm trực tiếp, hãy tìm người lớn ở gần và rời khỏi nơi không an toàn.<br><br>
            <strong>📞 Cô Hường: ${INFO.phone}</strong>
        `;
    }
    
    return null;
}

// ================================================================
// 8. CÁC HÀM HỖ TRỢ
// ================================================================
function containsAny(text, keywords) {
    for (const keyword of keywords) {
        const normalizedKeyword = normalizeText(keyword);
        if (normalizedKeyword && (
            text.includes(normalizedKeyword) ||
            isClosePhrase(text, normalizedKeyword)
        )) {
            return true;
        }
    }
    return false;
}

function isClosePhrase(text, phrase) {
    const words = phrase.split(" ");
    if (words.length < 2) return false;
    const importantWords = words.filter(word => word.length >= 3);
    if (importantWords.length < 2) return false;
    return importantWords.every(word => text.includes(word));
}

function isContactRequest(text) {
    const normalized = normalizeText(text);
    const contactKeywords = [
        "lien he", "so dien thoai", "sdt", "so cua co", "gap co", "tim co",
        "tu van truc tiep", "phong tu van", "co o dau", "dia chi", "so co huong"
    ];
    return containsAny(normalized, contactKeywords);
}

function isCounselorRequest(text) {
    const normalized = normalizeText(text);
    const keywords = [
        "muon gap co", "muon noi chuyen voi co", "can co huong", "can nguoi tu van",
        "can tu van", "muon duoc tu van", "muon tam su", "co giup em voi"
    ];
    return containsAny(normalized, keywords);
}

function getContactResponse() {
    return `
        <strong>📞 THÔNG TIN LIÊN HỆ TƯ VẤN</strong><br><br>
        👩‍🏫 <strong>Người tư vấn:</strong> ${INFO.fullName}<br>
        🏫 <strong>Đơn vị:</strong> ${INFO.school}<br>
        💼 <strong>Vị trí:</strong> ${INFO.role}<br>
        📍 <strong>Nơi tư vấn:</strong> ${INFO.room}<br>
        🕐 <strong>Thời gian:</strong> ${INFO.contactTime}<br>
        ☎️ <strong>Số điện thoại:</strong> ${INFO.phone}<br><br>
        Em có thể liên hệ trực tiếp hoặc đến phòng tư vấn nhé. Cô luôn sẵn sàng lắng nghe em 💜
    `;
}

// ================================================================
// 9. TÍNH ĐIỂM & NHẬN DIỆN CHỦ ĐỀ
// ================================================================
function calculateScore(text, topic) {
    let keywordScore = 0;
    let matchedCount = 0;
    for (const keyword of topic.keywords) {
        const normalizedKeyword = normalizeText(keyword);
        if (!normalizedKeyword) continue;
        if (text.includes(normalizedKeyword)) {
            matchedCount++;
            keywordScore += normalizedKeyword.length * 3;
        }
    }
    if (matchedCount === 0) return 0;
    return keywordScore + topic.priority;
}

function detectIntent(userText) {
    const text = normalizeText(userText);
    let bestTopic = null;
    let bestScore = 0;
    
    for (const [name, topic] of Object.entries(KNOWLEDGE)) {
        const score = calculateScore(text, topic);
        if (score > bestScore) {
            bestScore = score;
            bestTopic = name;
        }
    }
    return { topic: bestTopic, score: bestScore };
}

// ================================================================
// 10. CÂU TRẢ LỜI MẶC ĐỊNH KHI CHƯA HIỂU
// ================================================================
const FALLBACK_RESPONSES = [
    `Cô đang lắng nghe em 💜 Cô chưa hiểu hết điều em muốn chia sẻ.
Em có thể kể thêm một chút về chuyện đang xảy ra không?
Em cứ nói theo cách tự nhiên nhất nhé, không cần hoàn hảo.`,
    `Cô hiểu rằng có thể em đang có điều khá khó nói 🌱
Hãy thử bắt đầu bằng: "Em đang buồn vì..." hoặc "Em đang lo lắng vì..."
Cô sẽ cùng em xem xét từng bước một.`,
    `Cô ở đây để lắng nghe em 💜 Nếu chưa biết bắt đầu từ đâu, em có thể chọn các chủ đề gợi ý bên dưới hoặc nói:
- "Em muốn được tư vấn"
- "Em đang gặp khó khăn"
- "Em muốn tâm sự"
Cô luôn lắng nghe em.`
];

// ================================================================
// 11. HÀM TRẢ LỜI CHÍNH
// ================================================================
function getResponse(userText) {
    const normalized = normalizeText(userText);
    if (!normalized) {
        return `Em hãy nhập điều em muốn chia sẻ với cô nhé 💜`;
    }
    
    // Bước 1: Kiểm tra an toàn cao nhất
    const safetyResponse = checkSafety(userText);
    if (safetyResponse) return safetyResponse;
    
    // Bước 2: Yêu cầu liên hệ
    if (isContactRequest(userText)) {
        return getContactResponse();
    }
    
    // Bước 3: Muốn gặp/trực tiếp tư vấn
    if (isCounselorRequest(userText)) {
        return `
            Cô rất sẵn lòng lắng nghe em 💜<br><br>
            Nếu em muốn trao đổi trực tiếp:<br><br>
            👩‍🏫 <strong>${INFO.fullName}</strong><br>
            💼 ${INFO.role}<br>
            🏫 ${INFO.school}<br>
            📍 ${INFO.room}<br>
            🕐 ${INFO.contactTime}<br>
            ☎️ <strong>${INFO.phone}</strong><br><br>
            Em cứ đến bất kỳ lúc nào trong giờ nhé, cô luôn chào đón em 💜
        `;
    }
    
    // Bước 4: Nhận diện chủ đề
    const result = detectIntent(userText);
    if (result.topic && result.score > 0) {
        const responses = KNOWLEDGE[result.topic].responses;
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Bước 5: Không khớp chủ đề
    return FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
}

// ================================================================
// 12. BẢO VỆ & HIỂN THỊ GIAO DIỆN
// ================================================================
function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

function addMessage(text, isUser = false) {
    if (!chatMessages) return;
    const div = document.createElement("div");
    div.className = `message ${isUser ? "user-message" : "bot-message"}`;
    const avatarIcon = isUser
        ? `<div class="user-avatar"></div>`
        : `<div class="bot-avatar"><i class="fas fa-user-nurse"></i></div>`;
    div.innerHTML = `
        ${avatarIcon}
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
    typing.innerHTML = `
        <div class="bot-avatar"><i class="fas fa-user-nurse"></i></div>
        <div class="message-content">Đang suy nghĩ... 💭</div>
    `;
    chatMessages.appendChild(typing);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTyping() {
    const typing = document.getElementById("typingIndicator");
    if (typing) typing.remove();
}

// ================================================================
// 13. GỬI & NHẬN TIN NHẮN
// ================================================================
function sendMessage(text) {
    if (!text || !text.trim()) return;
    
    addMessage(escapeHTML(text.trim()), true);
    if (messageInput) {
        messageInput.value = "";
        messageInput.focus();
    }
    
    showTyping();
    setTimeout(() => {
        removeTyping();
        const reply = getResponse(text);
        addMessage(reply, false);
    }, 600);
}

// Nút gửi
if (sendBtn) {
    sendBtn.addEventListener("click", () => {
        sendMessage(messageInput ? messageInput.value : "");
    });
}

// Nhấn Enter gửi
if (messageInput) {
    messageInput.addEventListener("keypress", event => {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage(messageInput.value);
        }
    });
}

// Nút gợi ý nhanh
if (quickReplies) {
    quickReplies.querySelectorAll(".reply-btn").forEach(button => {
        button.addEventListener("click", () => {
            const message = button.dataset.message || button.textContent;
            sendMessage(message);
        });
    });
}

// ================================================================
// 14. TẢI THÔNG TIN LIÊN HỆ RA TRANG
// ================================================================
function loadContactInfoToPage() {
    const counselorName = document.getElementById("counselorName");
    const counselorPhone = document.getElementById("counselorPhone");
    const schoolName = document.getElementById("schoolName");
    const contactTime = document.getElementById("contactTime");
    
    if (counselorName) counselorName.textContent = INFO.fullName;
    if (counselorPhone) counselorPhone.textContent = INFO.phone;
    if (schoolName) schoolName.textContent = INFO.school;
    if (contactTime) contactTime.textContent = INFO.contactTime;
}
loadContactInfoToPage();

// ================================================================
// 15. LỜI CHÀO BAN ĐẦU
// ================================================================
function showWelcomeMessage() {
    if (!chatMessages) return;
    const hasMessages = chatMessages.querySelector(".message");
    if (hasMessages) return;
    
    addMessage(`
        <strong>Chào em 🌸</strong><br><br>
        Cô Hường là giáo viên tư vấn tâm lý học đường. Cô ở đây để lắng nghe và cùng em tìm cách tháo gỡ 
        những điều đang khiến em băn khoăn 💜<br><br>
        Em có thể chia sẻ về:<br>
       
