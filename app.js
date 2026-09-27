// ================================================================
// CHATBOT AI TƯ VẤN TÂM LÝ HỌC ĐƯỜNG - PHIÊN BẢN NÂNG CẤP
// ================================================================


// ================================================================
// 1. LẤY CÁC PHẦN TỬ GIAO DIỆN
// ================================================================

const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const chatMessages = document.getElementById("chatMessages");
const quickReplies = document.getElementById("quickReplies");


// ================================================================
// 2. THÔNG TIN CHATBOT / THÔNG TIN LIÊN HỆ
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
// 3. QUY TẮC TRẢ LỜI
// ================================================================

const COUNSELING_RULES = {

    principles: [
        "lắng nghe",
        "tôn trọng",
        "không phán xét",
        "không trách móc",
        "không làm học sinh xấu hổ",
        "khuyến khích học sinh chia sẻ từng bước",
        "khuyến khích tìm người lớn đáng tin cậy khi cần"
    ],

    avoid: [
        "tự chẩn đoán bệnh tâm lý",
        "khẳng định học sinh mắc một rối loạn tâm lý",
        "đổ lỗi cho học sinh",
        "khuyến khích trả đũa hoặc bạo lực",
        "hứa giữ bí mật tuyệt đối trong mọi tình huống",
        "yêu cầu học sinh cung cấp thông tin cá nhân không cần thiết"
    ]
};


// ================================================================
// 4. CHUẨN HÓA TIẾNG VIỆT
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
// 5. KHO KIẾN THỨC TƯ VẤN
// ================================================================

const KNOWLEDGE = {


    // ============================================================
    // CHÀO HỎI
    // ============================================================

    chao: {

        priority: 20,

        keywords: [
            "chao",
            "xin chao",
            "hello",
            "hi",
            "co oi",
            "em chao co",
            "chao co",
            "co a"
        ],

        responses: [

            `Chào em 🌸 Cô Hường rất vui được trò chuyện cùng em.

Em có thể chia sẻ với cô về chuyện học tập, bạn bè, gia đình, cảm xúc hoặc bất kỳ điều gì đang khiến em băn khoăn.

Em muốn kể cho cô nghe chuyện gì trước?`,

            `Chào em 💜 Cô đang lắng nghe em.

Em cứ nói theo cách tự nhiên nhất nhé. Em không cần phải diễn đạt thật hoàn hảo.

Hôm nay điều gì đang khiến em suy nghĩ nhiều nhất?`
        ]
    },


    // ============================================================
    // TÌNH CẢM TUỔI HỌC TRÒ
    // ============================================================

    tinh_cam: {

        priority: 100,

        keywords: [
            "tinh yeu",
            "yeu ban",
            "thich ban",
            "thich mot ban",
            "crush",
            "nguoi minh thich",
            "co nguoi yeu",
            "nguoi yeu",
            "tinh cam",
            "rung dong",
            "yeu don phuong",
            "ban ay co thich em",
            "em thich ban ay",
            "ban ay khong thich em",
            "chia tay",
            "ghen",
            "bi tu choi",
            "to tinh",
            "bay to tinh cam",
            "bay to"
        ],

        responses: [

            `Cô hiểu rồi 💜 Có vẻ em đang muốn chia sẻ về chuyện tình cảm hoặc cảm xúc với một người bạn.

Ở lứa tuổi của em, việc có cảm giác thích hoặc rung động trước một bạn nào đó là điều có thể xảy ra.

Điều quan trọng là em tôn trọng bản thân, tôn trọng bạn ấy và không để chuyện tình cảm làm ảnh hưởng quá nhiều đến việc học cũng như các mối quan hệ khác.

Em có thể kể cho cô biết điều gì đang khiến em băn khoăn nhất không?`,

            `Cảm xúc dành cho một người đôi khi vừa vui vừa khiến mình lo lắng 😊

Cô không đánh giá em đâu.

Nếu em muốn, cô có thể cùng em xem xét tình huống cụ thể: em đang thích một bạn, bạn ấy không đáp lại tình cảm, hai bạn đang giận nhau hay em chưa biết nên nói với bạn ấy như thế nào?`
        ]
    },


    // ============================================================
    // TÌNH BẠN
    // ============================================================

    ban_be: {

        priority: 90,

        keywords: [
            "ban be",
            "ban than",
            "mat ban",
            "cai nhau voi ban",
            "ban khong choi voi em",
            "ban khong noi chuyen",
            "ban bo em",
            "ban hieu lam",
            "xich mich",
            "mau thuan voi ban",
            "khong co ban",
            "bi xa lanh",
            "ban nghi em",
            "ban gian em",
            "ban khong thich em"
        ],

        responses: [

            `Cô hiểu 💛 Mối quan hệ bạn bè rất quan trọng ở tuổi THCS nên khi xảy ra mâu thuẫn, mình có thể buồn và suy nghĩ rất nhiều.

Nếu em muốn giải quyết, trước hết hãy thử bình tĩnh tìm hiểu xem điều gì khiến hai bạn hiểu lầm hoặc tổn thương nhau.

Khi nói chuyện, em có thể tập trung vào cảm xúc của mình thay vì trách móc bạn.

Em muốn kể cho cô biết chuyện giữa hai bạn bắt đầu từ đâu không?`,

            `Mất kết nối với một người bạn có thể khiến em cảm thấy cô đơn.

Em có thể thử nghĩ xem em mong muốn điều gì: muốn làm hòa, muốn nói rõ hiểu lầm hay chỉ cần có người lắng nghe?

Nếu em kể thêm tình huống cụ thể, cô sẽ cùng em tìm một cách nói chuyện phù hợp.`
        ]
    },


    // ============================================================
    // BẮT NẠT HỌC ĐƯỜNG
    // ============================================================

    bat_nat: {

        priority: 140,

        keywords: [
            "bat nat",
            "bi bat nat",
            "treu choc",
            "che gieu",
            "xuc pham",
            "de doa",
            "danh em",
            "danh ban",
            "co lap em",
            "bi co lap",
            "lam nhuc",
            "ep em",
            "uy hiep",
            "danh nhau",
            "bi danh",
            "bi hanh hung",
            "bi doa danh",
            "bi bat ep"
        ],

        responses: [

            `Cô rất tiếc vì em đang phải đối mặt với chuyện này 💜 Em không đáng bị đối xử thiếu tôn trọng.

Điều quan trọng là em không nên cố chịu đựng một mình.

Em có thể tìm đến giáo viên chủ nhiệm, cô giáo tư vấn tâm lý, cha mẹ hoặc một người lớn mà em tin tưởng để được hỗ trợ.

Nếu em muốn, em có thể kể cho cô biết chuyện đang xảy ra ở lớp, ở trường hay trên mạng xã hội.

Cô sẽ cùng em xem xét cách xử lý an toàn.`,

            `Nếu em đang bị bắt nạt, việc tìm người lớn hỗ trợ là rất quan trọng.

Em không nên trả đũa bằng bạo lực.

Nếu có thể, hãy lưu lại thông tin liên quan đến sự việc và nói với người lớn đáng tin cậy.

Em đang bị bắt nạt bằng lời nói, hành động, trên mạng hay bị đe dọa trực tiếp?`
        ]
    },


    // ============================================================
    // HỌC TẬP
    // ============================================================

    hoc_tap: {

        priority: 80,

        keywords: [
            "hoc tap",
            "diem so",
            "kiem tra",
            "thi",
            "thi cu",
            "bai tap",
            "khong hoc duoc",
            "mat dong luc hoc",
            "so diem kem",
            "bi diem kem",
            "ap luc hoc",
            "ap luc thi",
            "so thi",
            "khong tap trung",
            "hoc kem",
            "mat goc",
            "khong hieu bai",
            "khong lam duoc bai",
            "hoc khong vao",
            "sot ruot vi diem"
        ],

        responses: [

            `Cô hiểu 📚 Áp lực học tập có thể khiến mình mệt mỏi, lo lắng hoặc mất động lực.

Trước tiên, em đừng tự đánh giá bản thân chỉ bằng một điểm số.

Chúng ta có thể chia vấn đề thành từng phần nhỏ để giải quyết.

Em đang gặp khó khăn chủ yếu ở việc không hiểu bài, không tập trung, sợ kiểm tra hay áp lực từ gia đình?`,

            `Một điểm kiểm tra chưa nói lên toàn bộ khả năng của em 🌱

Em hãy thử xác định một việc nhỏ nhất có thể làm ngay hôm nay, chẳng hạn xem lại một phần bài chưa hiểu hoặc hỏi giáo viên một câu mình còn vướng.

Nếu em nói cho cô biết môn học và phần em đang khó, cô có thể giúp em chia vấn đề thành từng bước.`
        ]
    },


    // ============================================================
    // ÁP LỰC HỌC TẬP
    // ============================================================

    ap_luc_hoc_tap: {

        priority: 95,

        keywords: [
            "ap luc",
            "ap luc hoc tap",
            "ap luc thi cu",
            "ap luc diem",
            "so truot",
            "so thi truot",
            "lo truoc ky thi",
            "lo thi",
            "cang thang khi thi",
            "bo me bat hoc",
            "bo me ep hoc",
            "phai dat diem cao"
        ],

        responses: [

            `Cô hiểu cảm giác phải đạt điểm cao hoặc lo lắng trước kỳ thi có thể khiến em rất căng thẳng.

Em hãy thử chia việc học thành những phần nhỏ, đặt mục tiêu vừa sức và dành thời gian nghỉ ngắn giữa các khoảng học.

Nếu áp lực đến từ kỳ vọng của gia đình, em có thể chia sẻ với một người lớn mà em tin tưởng để cùng tìm cách cân bằng hơn.

Điều gì đang tạo áp lực cho em nhiều nhất?`,

            `Khi áp lực tăng lên, mình thường dễ nghĩ rằng “mình phải làm thật hoàn hảo”.

Nhưng em có thể bắt đầu từ một mục tiêu nhỏ và thực tế hơn.

Em đang lo nhất về điểm số, kỳ thi hay phản ứng của bố mẹ?`
        ]
    },


    // ============================================================
    // GIA ĐÌNH
    // ============================================================

    gia_dinh: {

        priority: 90,

        keywords: [
            "gia dinh",
            "bo me",
            "bo em",
            "me em",
            "cha me",
            "bi bo me mang",
            "bo me khong hieu",
            "bo me ep",
            "bo me ky vong",
            "cai nhau voi bo",
            "cai nhau voi me",
            "nguoi than",
            "bo me danh",
            "gia dinh khong hieu em",
            "bo me khong nghe em"
        ],

        responses: [

            `Cô hiểu 💙 Đôi khi chúng ta rất yêu gia đình nhưng vẫn có thể cảm thấy khó chia sẻ với bố mẹ.

Nếu em đang có mâu thuẫn với người thân, em có thể kể cho cô biết điều gì khiến em khó chịu nhất.

Cô sẽ giúp em nhìn vấn đề từ nhiều phía và tìm cách giao tiếp phù hợp hơn.`,

            `Có những lúc bố mẹ và con cái nhìn cùng một vấn đề theo những cách khác nhau.

Nếu em cảm thấy khó nói trực tiếp, em có thể bắt đầu bằng việc nói về cảm xúc của mình:

“Con cảm thấy...”

thay vì bắt đầu bằng lời trách móc.

Em muốn kể cho cô nghe điều gì đang xảy ra ở nhà không?`
        ]
    },


    // ============================================================
    // CẢM XÚC
    // ============================================================

    cam_xuc: {

        priority: 65,

        keywords: [
            "buon",
            "khoc",
            "co don",
            "lo lang",
            "so hai",
            "cang thang",
            "met moi",
            "tuc gian",
            "that vong",
            "tu ti",
            "mac cam",
            "trong trai",
            "chan nan",
            "stress",
            "khong vui",
            "buon phien",
            "cam thay te",
            "cam thay roi"
        ],

        responses: [

            `Cô đang lắng nghe em 💜 Những cảm xúc như buồn, lo lắng, tức giận hay thất vọng đều có thể xuất hiện khi chúng ta gặp chuyện khó khăn.

Em không cần phải giải quyết tất cả mọi thứ cùng một lúc.

Nếu em muốn, hãy nói với cô điều gì đang khiến em buồn hoặc lo lắng nhất lúc này.`,

            `Cảm xúc của em đáng được lắng nghe 🌱

Trước tiên, em có thể cho bản thân một chút thời gian để bình tĩnh, nghỉ ngơi và hít thở chậm.

Sau đó, em thử nói cho cô biết điều gì đã xảy ra trước khi em bắt đầu cảm thấy như vậy nhé.`
        ]
    },


    // ============================================================
    // CÔ ĐƠN
    // ============================================================

    co_don: {

        priority: 85,

        keywords: [
            "co don",
            "mot minh",
            "khong ai quan tam",
            "khong ai hieu em",
            "khong co ai",
            "khong co ban",
            "cam thay le loi",
            "bi bo lai"
        ],

        responses: [

            `Cảm giác cô đơn có thể rất nặng nề, nhất là khi em nghĩ rằng không có ai hiểu mình 💜

Em không nhất thiết phải giải quyết điều đó một mình.

Hãy thử nghĩ đến một người mà em cảm thấy tương đối an toàn khi nói chuyện: giáo viên, bố mẹ, anh chị, người thân hoặc một người bạn đáng tin cậy.

Nếu muốn, em có thể kể cho cô biết gần đây điều gì khiến em cảm thấy cô đơn nhất.`
        ]
    },


    // ============================================================
    // TỰ TIN
    // ============================================================

    tu_tin: {

        priority: 70,

        keywords: [
            "tu tin",
            "khong tu tin",
            "xau",
            "ngoai hinh",
            "mac cam",
            "so sanh voi ban",
            "khong bang ban",
            "khong du tot",
            "ghet ban than",
            "khong thich ban than",
            "thay minh xau",
            "thay minh kem"
        ],

        responses: [

            `Cô hiểu cảm giác tự so sánh mình với người khác có thể khiến em thấy không thoải mái 💛

Mỗi người có những điểm mạnh, tốc độ phát triển và hoàn cảnh khác nhau.

Em không cần phải giống người khác mới có giá trị.

Nếu em muốn, cô có thể cùng em tìm hiểu điều gì đang khiến em thiếu tự tin nhất.`,

            `Có thể em đang nhìn thấy rất rõ những điểm mình chưa hài lòng nhưng lại quên mất những điều mình đã làm được.

Em thử kể cho cô một điều nhỏ mà em từng làm tốt hoặc một phẩm chất mà em nghĩ mình có nhé.

Chúng ta có thể bắt đầu từ đó.`
        ]
    },


    // ============================================================
    // KHÓ TẬP TRUNG
    // ============================================================

    tap_trung: {

        priority: 60,

        keywords: [
            "khong tap trung",
            "mat tap trung",
            "hoc khong vao",
            "dau oc",
            "met moi khi hoc",
            "ngoi hoc khong vao",
            "hay quen",
            "de mat tap trung",
            "khong nho bai",
            "hoc mot chut la chan"
        ],

        responses: [

            `Nếu gần đây em khó tập trung, cô muốn cùng em tìm nguyên nhân thay vì vội kết luận rằng em “lười” nhé 🌱

Có thể liên quan đến việc thiếu ngủ, áp lực học tập, cảm xúc, môi trường học hoặc quá nhiều việc phải suy nghĩ.

Em thường khó tập trung nhất vào thời điểm nào?`,

            `Em có thể thử học theo từng khoảng thời gian ngắn, nghỉ giữa các phần học và giảm những thứ dễ làm mình mất tập trung.

Nhưng trước hết, cô muốn biết điều gì đang khiến em khó tập trung: mệt mỏi, lo lắng, buồn, thiếu ngủ hay bài học quá khó?`
        ]
    },


    // ============================================================
    // GIẤC NGỦ
    // ============================================================

    giac_ngu: {

        priority: 70,

        keywords: [
            "mat ngu",
            "khong ngu duoc",
            "kho ngu",
            "ngu khong ngon",
            "thuc khuya",
            "hay tinh giac",
            "buon ngu",
            "thieu ngu"
        ],

        responses: [

            `Nếu gần đây em khó ngủ hoặc thường xuyên thức khuya, cô muốn cùng em tìm hiểu nguyên nhân trước.

Em có thể thử giữ giờ ngủ và giờ thức tương đối ổn định, hạn chế dùng điện thoại quá sát giờ ngủ và dành một khoảng thời gian yên tĩnh trước khi đi ngủ.

Nếu tình trạng kéo dài hoặc ảnh hưởng nhiều đến sinh hoạt và học tập, em nên chia sẻ với bố mẹ hoặc người chăm sóc và người lớn đáng tin cậy để được hỗ trợ phù hợp.

Em thường khó ngủ vì suy nghĩ nhiều, dùng điện thoại hay vì một lý do khác?`
        ]
    },


    // ============================================================
    // MẠNG XÃ HỘI
    // ============================================================

    mang_xa_hoi: {

        priority: 100,

        keywords: [
            "facebook",
            "zalo",
            "tiktok",
            "instagram",
            "mang xa hoi",
            "tren mang",
            "binh luan",
            "tin nhan",
            "anh tren mang",
            "bi dang anh",
            "noi xau tren mang",
            "online",
            "bi hack",
            "tai khoan",
            "nguoi la nhan tin",
            "lam phien tren mang"
        ],

        responses: [

            `Cô hiểu 📱 Những chuyện xảy ra trên mạng xã hội đôi khi cũng ảnh hưởng rất nhiều đến cảm xúc của mình.

Nếu em đang gặp bình luận tiêu cực, bị hiểu lầm, bị làm phiền hoặc có vấn đề liên quan đến hình ảnh hoặc tin nhắn, em không nên chịu đựng một mình.

Em có thể lưu lại thông tin cần thiết, hạn chế tranh cãi trực tiếp và nói với người lớn mà em tin tưởng.

Em có thể kể cho cô biết chuyện đang xảy ra như thế nào không?`,

            `Nếu một người trên mạng khiến em sợ hãi hoặc liên tục làm phiền, em không nhất thiết phải tiếp tục trả lời họ.

Em có thể chặn tài khoản, lưu lại bằng chứng và báo cho người lớn đáng tin cậy.

Nếu em muốn, hãy nói cho cô biết người đó đang làm gì.`
        ]
    },


    // ============================================================
    // TỨC GIẬN
    // ============================================================

    tuc_gian: {

        priority: 75,

        keywords: [
            "tuc gian",
            "rat gian",
            "gian du",
            "muon danh",
            "muon dap",
            "muon tra thu",
            "khong kiem soat duoc",
            "no tung",
            "uc che"
        ],

        responses: [

            `Cô hiểu. Khi tức giận, cảm xúc có thể rất mạnh và khiến mình muốn hành động ngay.

Trước tiên, em hãy tạo khoảng cách với tình huống đang làm em tức, hít thở chậm và tránh tranh cãi hoặc dùng bạo lực khi đang mất bình tĩnh.

Khi đã bình tĩnh hơn, em có thể kể cho cô điều gì đã khiến em tức giận.

Cô sẽ cùng em tìm cách xử lý an toàn hơn.`
        ]
    },


    // ============================================================
    // QUAN HỆ VỚI THẦY CÔ
    // ============================================================

    thay_co: {

        priority: 75,

        keywords: [
            "thay co",
            "giao vien",
            "co giao",
            "thay giao",
            "bi co phat",
            "bi thay phat",
            "co khong hieu",
            "thay khong hieu",
            "so giao vien",
            "mau thuan voi giao vien"
        ],

        responses: [

            `Cô hiểu rằng khi em cảm thấy chưa được thầy cô hiểu hoặc có một tình huống khiến em không thoải mái, em có thể rất khó xử.

Em có thể kể lại sự việc theo những gì đã xảy ra, tránh tự trách mình hoặc vội kết luận về người khác.

Nếu em thấy khó trao đổi trực tiếp với giáo viên liên quan, em có thể tìm đến giáo viên chủ nhiệm, cô tư vấn tâm lý hoặc một người lớn đáng tin cậy để được hỗ trợ.`
        ]
    },


    // ============================================================
    // TƯƠNG LAI
    // ============================================================

    tuong_lai: {

        priority: 55,

        keywords: [
            "tuong lai",
            "nghe nghiep",
            "chon nghe",
            "chon truong",
            "thi vao lop",
            "thi vao truong",
            "khong biet lam gi",
            "khong biet chon gi",
            "uoc mo",
            "ap luc tuong lai"
        ],

        responses: [

            `Không phải lúc nào em cũng cần biết ngay mình sẽ trở thành ai trong tương lai 🌱

Ở tuổi THCS, em có thể bắt đầu bằng việc tìm hiểu mình thích gì, làm tốt điều gì và điều gì khiến mình muốn học thêm.

Nếu em đang lo về việc chọn trường hoặc định hướng tương lai, em có thể kể cụ thể điều gì khiến em băn khoăn.

Cô sẽ cùng em phân tích từng phần.`
        ]
    },


    // ============================================================
    // MẤT ĐỘNG LỰC
    // ============================================================

    dong_luc: {

        priority: 55,

        keywords: [
            "khong co dong luc",
            "luoi hoc",
            "khong muon hoc",
            "chan hoc",
            "bo hoc",
            "khong muon lam gi",
            "khong muon lam bai"
        ],

        responses: [

            `Có những giai đoạn mình mất động lực và cảm thấy không muốn bắt đầu việc gì cả.

Điều đó không có nghĩa là em là người lười hay không có khả năng.

Em có thể bắt đầu bằng một việc rất nhỏ, chẳng hạn học một phần bài trong thời gian ngắn rồi nghỉ.

Cô muốn hỏi thêm: em mất động lực chủ yếu với việc học hay gần đây em cũng không muốn làm những việc mà trước đây em từng thích?`
        ]
    },


    // ============================================================
    // QUYỀN RIÊNG TƯ
    // ============================================================

    rieng_tu: {

        priority: 110,

        keywords: [
            "thong tin ca nhan",
            "bi lay anh",
            "bi lay thong tin",
            "bi do thong tin",
            "mat khau",
            "cho nguoi khac mat khau",
            "dia chi nha",
            "so dien thoai cua em",
            "gui anh rieng tu",
            "anh rieng tu"
        ],

        responses: [

            `Em hãy cẩn thận với thông tin cá nhân của mình 🔒

Không nên tùy tiện chia sẻ mật khẩu, địa chỉ nhà, số điện thoại, hình ảnh riêng tư hoặc thông tin có thể khiến người khác xác định được em.

Nếu ai đó đang ép buộc, đe dọa hoặc yêu cầu em gửi hình ảnh hoặc thông tin mà em không muốn chia sẻ, hãy nói với một người lớn đáng tin cậy càng sớm càng tốt.

Em có thể kể cho cô biết người đó đang yêu cầu em điều gì không?`
        ]
    }

};


// ================================================================
// 6. NHÓM TÌNH HUỐNG AN TOÀN
// ================================================================

const SAFETY_GROUPS = {


    self_harm: [

        "muon lam hai ban than",
        "lam hai ban than",
        "tu lam hai",
        "tu lam dau",
        "lam dau ban than",
        "khong muon song",
        "khong muon ton tai",
        "muon chet",
        "muon tu tu",
        "tu tu",
        "ket thuc cuoc song",
        "khong muon song nua",
        "chet di",
        "muon bien mat khoi cuoc doi"
    ],


    harm_others: [

        "muon lam hai nguoi khac",
        "muon giet nguoi",
        "muon danh nguoi",
        "muon lam nguoi khac bi thuong",
        "muon tra thu bang bao luc"
    ],


    immediate_danger: [

        "dang gap nguy hiem",
        "dang bi de doa",
        "bi doa giet",
        "bi doa danh",
        "dang bi danh",
        "dang bi hanh hung",
        "co nguoi dang danh em",
        "co nguoi dang lam hai em",
        "khong an toan"
    ],


    exploitation: [

        "bi ep gui anh",
        "bi ep gui anh rieng tu",
        "bi ep gui anh nhay cam",
        "nguoi lon cham vao",
        "bi cham vao",
        "bi ep buoc",
        "bi xam hai",
        "bi xam pham",
        "bi loi keo",
        "bi tong tien bang anh"
    ]

};


// ================================================================
// 7. KIỂM TRA AN TOÀN
// ================================================================

function checkSafety(text) {

    const normalized = normalizeText(text);


    // ------------------------------------------------------------
    // TỰ LÀM HẠI BẢN THÂN
    // ------------------------------------------------------------

    if (containsAny(normalized, SAFETY_GROUPS.self_harm)) {

        return `
            <strong>💜 Cô rất quan tâm đến sự an toàn của em.</strong><br><br>

            Nếu em đang có ý nghĩ làm đau bản thân hoặc không muốn sống,
            điều quan trọng nhất lúc này là
            <strong>em không nên ở một mình</strong>.

            <br><br>

            Em hãy tìm ngay một người lớn đáng tin cậy đang ở gần em,
            chẳng hạn bố mẹ, người thân, giáo viên hoặc cô tư vấn tâm lý,
            và nói cho họ biết em đang cảm thấy như thế nào.

            <br><br>

            Nếu em đang ở trong tình huống nguy hiểm ngay lúc này,
            hãy rời khỏi nơi nguy hiểm và tìm người lớn hỗ trợ trực tiếp.

            <br><br>

            <strong>Cô Hường: ${INFO.phone}</strong>
        `;
    }


    // ------------------------------------------------------------
    // LÀM HẠI NGƯỜI KHÁC
    // ------------------------------------------------------------

    if (containsAny(normalized, SAFETY_GROUPS.harm_others)) {

        return `
            <strong>Cô muốn ưu tiên sự an toàn của em và những người xung quanh.</strong><br><br>

            Khi đang quá tức giận, em hãy tạo khoảng cách với người
            hoặc đồ vật có thể gây nguy hiểm và không hành động bằng bạo lực.

            <br><br>

            Hãy tìm ngay một người lớn đáng tin cậy để ở cùng và giúp em
            xử lý tình huống.

            <br><br>

            Nếu em muốn, em có thể kể cho cô biết điều gì đã khiến em
            tức giận đến mức này.
        `;
    }


    // ------------------------------------------------------------
    // NGUY HIỂM TRỰC TIẾP
    // ------------------------------------------------------------

    if (containsAny(normalized, SAFETY_GROUPS.immediate_danger)) {

        return `
            <strong>⚠️ Cô muốn ưu tiên sự an toàn của em trước.</strong><br><br>

            Nếu em đang bị đe dọa hoặc bị làm hại ngay lúc này,
            hãy tìm người lớn đáng tin cậy ở gần em và rời khỏi nơi
            không an toàn nếu có thể.

            <br><br>

            Em hãy nói ngay với cha mẹ, giáo viên, cô tư vấn tâm lý
            hoặc người lớn mà em tin tưởng.

            <br><br>

            <strong>Cô Hường: ${INFO.phone}</strong>
        `;
    }


    // ------------------------------------------------------------
    // XÂM HẠI / ÉP BUỘC
    // ------------------------------------------------------------

    if (containsAny(normalized, SAFETY_GROUPS.exploitation)) {

        return `
            <strong>💜 Em không có lỗi khi bị người khác ép buộc
            hoặc làm điều khiến em không thoải mái.</strong><br><br>

            Em không cần tiếp tục làm theo yêu cầu của người đó.

            Nếu có thể, hãy giữ lại thông tin liên quan và nói ngay
            với một người lớn đáng tin cậy.

            <br><br>

            Nếu em đang gặp nguy hiểm trực tiếp, hãy tìm người lớn ở gần
            và rời khỏi nơi không an toàn.

            <br><br>

            Em có thể liên hệ cô Hường để được lắng nghe và hỗ trợ:

            <strong>${INFO.phone}</strong>
        `;
    }


    return null;
}


// ================================================================
// 8. KIỂM TRA TỪ KHÓA
// ================================================================

function containsAny(text, keywords) {

    for (const keyword of keywords) {

        const normalizedKeyword = normalizeText(keyword);

        if (
            normalizedKeyword &&
            (
                text.includes(normalizedKeyword) ||
                isClosePhrase(text, normalizedKeyword)
            )
        ) {
            return true;
        }
    }

    return false;
}


// ================================================================
// 9. NHẬN DIỆN CỤM TỪ GẦN ĐÚNG
// ================================================================

function isClosePhrase(text, phrase) {

    const words = phrase.split(" ");

    if (words.length < 2) {
        return false;
    }

    const importantWords =
        words.filter(word => word.length >= 3);

    if (importantWords.length < 2) {
        return false;
    }

    return importantWords.every(word =>
        text.includes(word)
    );
}


// ================================================================
// 10. NHẬN DIỆN YÊU CẦU THÔNG TIN LIÊN HỆ
// ================================================================

function isContactRequest(text) {

    const normalized = normalizeText(text);

    const contactKeywords = [

        "lien he",
        "so dien thoai",
        "sdt",
        "so dt",
        "so cua co",
        "so co huong",
        "lien lac voi co",
        "gap co",
        "tim co huong",
        "tu van truc tiep",
        "phong tu van",
        "co o dau",
        "dia chi lien he"
    ];

    return containsAny(
        normalized,
        contactKeywords
    );
}


// ================================================================
// 11. TRẢ THÔNG TIN LIÊN HỆ
// ================================================================

function getContactResponse() {

    return `
        <strong>📞 THÔNG TIN LIÊN HỆ TƯ VẤN</strong><br><br>

        👩‍🏫 <strong>Người tư vấn:</strong>
        ${INFO.fullName}

        <br>

        🏫 <strong>Đơn vị:</strong>
        ${INFO.school}

        <br>

        💼 <strong>Vị trí:</strong>
        ${INFO.role}

        <br>

        📍 <strong>Nơi tư vấn:</strong>
        ${INFO.room}

        <br>

        🕐 <strong>Thời gian liên hệ:</strong>
        ${INFO.contactTime}

        <br>

        ☎️ <strong>Số điện thoại:</strong>
        ${INFO.phone}

        <br><br>

        Nếu em muốn được cô hỗ trợ trực tiếp,
        em có thể liên hệ theo thông tin trên.
    `;
}


// ================================================================
// 12. NHẬN DIỆN HỌC SINH MUỐN GẶP CÔ
// ================================================================

function isCounselorRequest(text) {

    const normalized = normalizeText(text);

    const keywords = [

        "muon gap co",
        "muon noi chuyen voi co",
        "muon gap co huong",
        "can co huong",
        "can nguoi tu van",
        "can tu van",
        "muon duoc tu van",
        "muon noi chuyen"
    ];

    return containsAny(
        normalized,
        keywords
    );
}


// ================================================================
// 13. TÍNH ĐIỂM CHO TỪNG CHỦ ĐỀ
// ================================================================

function calculateScore(text, topic) {

    let keywordScore = 0;
    let matchedCount = 0;


    for (const keyword of topic.keywords) {

        const normalizedKeyword =
            normalizeText(keyword);


        if (!normalizedKeyword) {
            continue;
        }


        if (text.includes(normalizedKeyword)) {

            matchedCount++;

            keywordScore +=
                normalizedKeyword.length * 3;
        }
    }


    // Không có từ khóa phù hợp
    // thì điểm phải bằng 0.
    if (matchedCount === 0) {
        return 0;
    }


    return keywordScore + topic.priority;
}


// ================================================================
// 14. TÌM CHỦ ĐỀ PHÙ HỢP NHẤT
// ================================================================

function detectIntent(userText) {

    const text = normalizeText(userText);

    let bestTopic = null;
    let bestScore = 0;


    for (
        const [name, topic]
        of Object.entries(KNOWLEDGE)
    ) {

        const score =
            calculateScore(text, topic);


        if (score > bestScore) {

            bestScore = score;
            bestTopic = name;
        }
    }


    return {

        topic: bestTopic,

        score: bestScore
    };
}


// ================================================================
// 15. CÂU TRẢ LỜI KHI CHƯA HIỂU
// ================================================================

const FALLBACK_RESPONSES = [

    `Cô đang lắng nghe em 💜

Cô chưa hiểu hết điều em muốn chia sẻ.

Em có thể kể thêm một chút về chuyện đang xảy ra không?

Em không cần cung cấp tên, địa chỉ hoặc thông tin cá nhân nếu không cần thiết.`,



    `Cô hiểu rằng có thể em đang có một điều khá khó nói.

Em hãy thử kể cho cô theo cách đơn giản nhất:

<strong>Điều gì đã xảy ra?</strong>

Sau đó cô sẽ cùng em xem xét từng bước.`,


    `Cô ở đây để lắng nghe em 🌱

Nếu chưa biết bắt đầu từ đâu, em có thể nói:

“Em đang buồn vì...”

hoặc

“Em đang lo vì...”

Em cứ chia sẻ từng chút một nhé.`
];


// ================================================================
// 16. HÀM TRẢ LỜI CHÍNH
// ================================================================

function getResponse(userText) {

    const normalized =
        normalizeText(userText);


    if (!normalized) {

        return `
            Em hãy nhập điều em muốn chia sẻ
            với cô nhé 💜
        `;
    }


    // ------------------------------------------------------------
    // BƯỚC 1 - KIỂM TRA AN TOÀN
    // ------------------------------------------------------------

    const safetyResponse =
        checkSafety(userText);


    if (safetyResponse) {

        return safetyResponse;
    }


    // ------------------------------------------------------------
    // BƯỚC 2 - YÊU CẦU THÔNG TIN LIÊN HỆ
    // ------------------------------------------------------------

    if (isContactRequest(userText)) {

        return getContactResponse();
    }


    // ------------------------------------------------------------
    // BƯỚC 3 - MUỐN GẶP CÔ
    // ------------------------------------------------------------

    if (isCounselorRequest(userText)) {

        return `

            Cô rất sẵn lòng lắng nghe em 💜

            <br><br>

            Nếu em muốn được trao đổi trực tiếp,
            em có thể liên hệ:

            <br><br>

            👩‍🏫 <strong>${INFO.fullName}</strong>

            <br>

            💼 ${INFO.role}

            <br>

            🏫 ${INFO.school}

            <br>

            🕐 ${INFO.contactTime}

            <br>

            ☎️ <strong>${INFO.phone}</strong>

        `;
    }


    // ------------------------------------------------------------
    // BƯỚC 4 - NHẬN DIỆN CHỦ ĐỀ
    // ------------------------------------------------------------

    const result =
        detectIntent(userText);


    if (
        result.topic &&
        result.score > 0
    ) {

        const responses =
            KNOWLEDGE[result.topic].responses;


        return responses[
            Math.floor(
                Math.random() *
                responses.length
            )
        ];
    }


    // ------------------------------------------------------------
    // BƯỚC 5 - KHÔNG HIỂU
    // ------------------------------------------------------------

    return FALLBACK_RESPONSES[
        Math.floor(
            Math.random() *
            FALLBACK_RESPONSES.length
        )
    ];
}


// ================================================================
// 17. BẢO VỆ HTML
// ================================================================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


// ================================================================
// 18. THÊM TIN NHẮN
// ================================================================

function addMessage(
    text,
    isUser = false
) {

    if (!chatMessages) {
        return;
    }


    const div =
        document.createElement("div");


    div.className = `
        message
        ${isUser
            ? "user-message"
            : "bot-message"}
    `;


    const avatarIcon = isUser

        ? `<div
                class="bot-avatar"
                style="display:none">
           </div>`

        : `<div class="bot-avatar">
                <i class="fas fa-user-nurse"></i>
           </div>`;


    div.innerHTML = `

        ${avatarIcon}

        <div class="message-content">
            ${text}
        </div>

    `;


    chatMessages.appendChild(div);


    chatMessages.scrollTop =
        chatMessages.scrollHeight;
}


// ================================================================
// 19. HIỆU ỨNG "ĐANG SUY NGHĨ"
// ================================================================

function showTyping() {

    if (!chatMessages) {
        return;
    }


    const typing =
        document.createElement("div");


    typing.id =
        "typingIndicator";


    typing.className =
        "message bot-message";


    typing.innerHTML = `

        <div class="bot-avatar">
            <i class="fas fa-user-nurse"></i>
        </div>

        <div class="message-content">
            <span>Đang suy nghĩ...</span> 💭
        </div>

    `;


    chatMessages.appendChild(typing);


    chatMessages.scrollTop =
        chatMessages.scrollHeight;
}


function removeTyping() {

    const typing =
        document.getElementById(
            "typingIndicator"
        );


    if (typing) {
        typing.remove();
    }
}


// ================================================================
// 20. GỬI TIN NHẮN
// ================================================================

function sendMessage(text) {

    if (
        !text ||
        !text.trim()
    ) {
        return;
    }


    // Hiển thị câu hỏi học sinh
    addMessage(
        escapeHTML(text.trim()),
        true
    );


    // Xóa ô nhập
    if (messageInput) {

        messageInput.value = "";

        messageInput.focus();
    }


    // Hiển thị trạng thái đang suy nghĩ
    showTyping();


    // Trả lời sau 0,5 giây
    setTimeout(() => {

        removeTyping();


        const reply =
            getResponse(text);


        addMessage(
            reply,
            false
        );

    }, 500);
}


// ================================================================
// 21. NÚT GỬI
// ================================================================

if (sendBtn) {

    sendBtn.addEventListener(
        "click",
        () => {

            sendMessage(
                messageInput
                    ? messageInput.value
                    : ""
            );

        }
    );
}


// ================================================================
// 22. NHẤN ENTER ĐỂ GỬI
// ================================================================

if (messageInput) {

    messageInput.addEventListener(
        "keypress",
        event => {

            if (
                event.key === "Enter"
            ) {

                event.preventDefault();

                sendMessage(
                    messageInput.value
                );
            }

        }
    );
}


// ================================================================
// 23. CÁC NÚT GỢI Ý
// ================================================================

if (quickReplies) {

    quickReplies
        .querySelectorAll(".reply-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const message =
                        button.dataset.message ||
                        button.textContent;


                    sendMessage(message);

                }
            );

        });
}


// ================================================================
// 24. HIỂN THỊ THÔNG TIN LIÊN HỆ LÊN TRANG
// ================================================================

function loadContactInfoToPage() {

    const counselorName =
        document.getElementById(
            "counselorName"
        );


    const counselorPhone =
        document.getElementById(
            "counselorPhone"
        );


    const schoolName =
        document.getElementById(
            "schoolName"
        );


    const contactTime =
        document.getElementById(
            "contactTime"
        );


    if (counselorName) {

        counselorName.textContent =
            INFO.fullName;
    }


    if (counselorPhone) {

        counselorPhone.textContent =
            INFO.phone;
    }


    if (schoolName) {

        schoolName.textContent =
            INFO.school;
    }


    if (contactTime) {

        contactTime.textContent =
            INFO.contactTime;
    }
}


loadContactInfoToPage();


// ================================================================
// 25. LỜI CHÀO BAN ĐẦU
// ================================================================

function showWelcomeMessage() {

    if (!chatMessages) {
        return;
    }


    const hasMessages =
        chatMessages.querySelector(
            ".message"
        );


    if (hasMessages) {
        return;
    }


    addMessage(`

        <strong>Chào em 🌸</strong>

        <br><br>

        Cô Hường là giáo viên
        tư vấn tâm lý học đường.

        Cô ở đây để lắng nghe
        và cùng em tìm cách tháo gỡ
        những điều đang khiến em băn khoăn.

        <br><br>

        Em có thể hỏi về:

        <br>
        📚 Học tập

        <br>
        💛 Bạn bè

        <br>
        💜 Cảm xúc

        <br>
        🏠 Gia đình

        <br>
        📱 Mạng xã hội

        <br>
        🌱 Sự tự tin

        <br>
        💞 Tình cảm tuổi học trò

        <br><br>

        Nếu em muốn gặp cô trực tiếp,
        hãy gõ:

        <strong>
        “Em muốn liên hệ với cô”
        </strong>.

    `, false);
}


// ================================================================
// 26. CHẠY LỜI CHÀO
// ================================================================

setTimeout(
    showWelcomeMessage,
    100
);


// ================================================================
// 27. THÔNG BÁO KIỂM TRA
// ================================================================

console.log(
    "=========================================="
);

console.log(
    "CHATBOT TƯ VẤN TÂM LÝ ĐÃ KHỞI ĐỘNG"
);

console.log(
    "Người tư vấn:",
    INFO.fullName
);

console.log(
    "Trường:",
    INFO.school
);

console.log(
    "Số chủ đề:",
    Object.keys(KNOWLEDGE).length
);

console.log(
    "=========================================="
);
