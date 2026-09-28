import React, { useState, useEffect, useRef } from "react";
import "./App.css";

/*
=========================================================
   TRỢ LÝ AI TƯ VẤN TÂM LÝ HỌC ĐƯỜNG
   PHIÊN BẢN SCHOOL COUNSELOR AI
=========================================================

   MỤC ĐÍCH:
   - Hỗ trợ học sinh THCS chia sẻ vấn đề
   - Phân loại chủ đề
   - Nhận diện mức độ nguy cơ
   - Đưa ra phản hồi đồng cảm
   - Gợi ý kỹ năng phù hợp
   - Kết nối giáo viên tư vấn

   LƯU Ý:
   Đây không phải công cụ chẩn đoán bệnh tâm thần.
=========================================================
*/


/* ======================================================
   1. THÔNG TIN GIÁO VIÊN TƯ VẤN
====================================================== */

const COUNSELOR = {
  name: "Giáo viên tư vấn tâm lý học đường",
  school: "Trường THCS",
  phone: "",
  email: "",
  workingTime: "7:00 - 22:00",
};


/* ======================================================
   2. CÁC CHỦ ĐỀ TƯ VẤN
====================================================== */

const TOPICS = {
  emotion: {
    name: "Cảm xúc",
    icon: "😟",
    keywords: [
      "buồn",
      "lo",
      "lo lắng",
      "sợ",
      "tức giận",
      "cô đơn",
      "tự ti",
      "khóc",
      "stress",
      "áp lực",
      "mệt mỏi",
      "chán",
      "căng thẳng",
    ],
  },

  study: {
    name: "Học tập",
    icon: "📚",
    keywords: [
      "học",
      "điểm",
      "thi",
      "kiểm tra",
      "bài tập",
      "mất tập trung",
      "không muốn học",
      "điểm kém",
      "áp lực học",
      "thành tích",
    ],
  },

  friendship: {
    name: "Bạn bè",
    icon: "👥",
    keywords: [
      "bạn",
      "bạn bè",
      "cãi nhau",
      "hiểu lầm",
      "cô lập",
      "không có bạn",
      "nói xấu",
      "ghét",
      "bỏ rơi",
    ],
  },

  family: {
    name: "Gia đình",
    icon: "🏠",
    keywords: [
      "bố",
      "ba",
      "mẹ",
      "gia đình",
      "cha mẹ",
      "bố mẹ",
      "anh",
      "chị",
      "em",
      "người thân",
      "cãi nhau với bố mẹ",
    ],
  },

  love: {
    name: "Tình cảm",
    icon: "💕",
    keywords: [
      "thích",
      "yêu",
      "crush",
      "người yêu",
      "chia tay",
      "tình cảm",
      "ghen",
      "thích bạn",
    ],
  },

  bullying: {
    name: "Bắt nạt học đường",
    icon: "🛡️",
    keywords: [
      "bắt nạt",
      "đánh",
      "đe dọa",
      "chửi",
      "làm nhục",
      "cô lập",
      "ức hiếp",
      "đánh nhau",
      "bắt nạt trên mạng",
      "cyberbullying",
    ],
  },

  socialMedia: {
    name: "Mạng xã hội",
    icon: "📱",
    keywords: [
      "facebook",
      "tiktok",
      "zalo",
      "instagram",
      "mạng xã hội",
      "điện thoại",
      "game",
      "chơi game",
      "tin nhắn",
      "bình luận",
    ],
  },

  lifeSkill: {
    name: "Kỹ năng sống",
    icon: "🌱",
    keywords: [
      "giao tiếp",
      "tự tin",
      "từ chối",
      "quản lý thời gian",
      "quản lý cảm xúc",
      "mục tiêu",
      "giải quyết vấn đề",
    ],
  },
};


/* ======================================================
   3. NHẬN DIỆN NGUY CƠ CAO
====================================================== */

const HIGH_RISK_KEYWORDS = [
  "muốn chết",
  "muốn tự tử",
  "tự tử",
  "giết mình",
  "kết thúc cuộc đời",
  "không muốn sống",
  "muốn biến mất mãi mãi",
  "tự làm đau",
  "tự làm hại",
  "cắt tay",
  "tự sát",
  "sắp tự tử",
  "chuẩn bị tự tử",
  "muốn chết đi",
  "không muốn tồn tại",
  "đang bị đánh",
  "đang bị bạo hành",
  "bị xâm hại",
  "bị cưỡng ép",
  "đang bị đe dọa",
];


/* ======================================================
   4. NHẬN DIỆN MỨC ĐỘ CẦN QUAN TÂM
====================================================== */

const MEDIUM_RISK_KEYWORDS = [
  "nhiều ngày",
  "nhiều tuần",
  "mất ngủ",
  "không ngủ được",
  "không muốn đi học",
  "sợ đi học",
  "không muốn gặp ai",
  "không muốn nói chuyện",
  "không còn hứng thú",
  "buồn rất nhiều",
  "khóc thường xuyên",
  "bị cô lập",
  "bị bắt nạt",
  "bị đe dọa",
  "áp lực rất lớn",
  "quá mệt mỏi",
];


/* ======================================================
   5. HÀM CHUẨN HÓA VĂN BẢN
====================================================== */

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .trim();
}


/* ======================================================
   6. NHẬN DIỆN NGUY CƠ
====================================================== */

function detectRisk(text) {
  const normalized = normalizeText(text);

  const highRisk = HIGH_RISK_KEYWORDS.some((keyword) =>
    normalized.includes(normalizeText(keyword))
  );

  if (highRisk) {
    return "HIGH";
  }

  const mediumRisk = MEDIUM_RISK_KEYWORDS.some((keyword) =>
    normalized.includes(normalizeText(keyword))
  );

  if (mediumRisk) {
    return "MEDIUM";
  }

  return "LOW";
}


/* ======================================================
   7. NHẬN DIỆN CHỦ ĐỀ
====================================================== */

function detectTopic(text) {
  const normalized = normalizeText(text);

  let bestTopic = null;
  let highestScore = 0;

  Object.entries(TOPICS).forEach(([key, topic]) => {
    let score = 0;

    topic.keywords.forEach((keyword) => {
      if (normalized.includes(normalizeText(keyword))) {
        score++;
      }
    });

    if (score > highestScore) {
      highestScore = score;
      bestTopic = key;
    }
  });

  return bestTopic || "emotion";
}


/* ======================================================
   8. PHẢN HỒI NGUY CƠ CAO
====================================================== */

function highRiskResponse() {
  return {
    type: "HIGH",
    message: `
🆘 CÔ MUỐN EM ƯU TIÊN AN TOÀN TRƯỚC TIÊN.

Những điều em vừa chia sẻ rất quan trọng và em không nên phải đối mặt với chúng một mình.

Nếu em đang có nguy cơ làm tổn thương bản thân hoặc đang ở trong tình huống nguy hiểm ngay lúc này:

• Hãy đến gần một người lớn mà em tin tưởng.
• Hãy nói rõ rằng em đang cần được giúp đỡ.
• Không ở một mình khi em cảm thấy mình có thể làm điều nguy hiểm.
• Nếu đang ở nơi không an toàn, hãy tìm cách rời khỏi nơi đó và tìm sự hỗ trợ khẩn cấp tại địa phương.

Em có thể nói với cô giáo, cha mẹ, người thân hoặc một người lớn mà em tin tưởng:

"Em đang không cảm thấy an toàn và em cần người giúp em."

Cô sẽ ở đây để lắng nghe em, nhưng trong tình huống nguy hiểm, sự hỗ trợ trực tiếp của người lớn là rất quan trọng.
`,
  };
}


/* ======================================================
   9. PHẢN HỒI MỨC ĐỘ CẦN QUAN TÂM
====================================================== */

function mediumRiskResponse(topic) {
  const topicName = TOPICS[topic]?.name || "vấn đề này";

  return {
    type: "MEDIUM",
    message: `
Cô nghe em và cô nghĩ rằng ${topicName.toLowerCase()} đang khiến em chịu khá nhiều áp lực.

Điều em cảm thấy là điều đáng được quan tâm, đặc biệt nếu tình trạng này kéo dài hoặc ảnh hưởng đến việc học, giấc ngủ, các mối quan hệ hoặc cuộc sống hằng ngày.

Trước mắt, em có thể thử:

🌱 1. Dừng lại một chút và hít thở chậm.
🌱 2. Viết ra điều đang khiến em khó chịu nhất.
🌱 3. Chia vấn đề thành một việc nhỏ có thể giải quyết trước.
🌱 4. Nói chuyện với một người lớn mà em tin tưởng.

Nếu em muốn, cô có thể tiếp tục cùng em tìm hiểu vấn đề này.

Và em cũng có thể liên hệ trực tiếp với giáo viên tư vấn tâm lý học đường khi cần.
`,
  };
}


/* ======================================================
   10. KIẾN THỨC TƯ VẤN THEO CHỦ ĐỀ
====================================================== */

const KNOWLEDGE = {

  emotion: {
    opening:
      "Cô nghe em. Có vẻ hiện tại cảm xúc của em đang khá nặng nề.",

    questions: [
      "Điều gì khiến em cảm thấy như vậy?",
      "Cảm xúc này bắt đầu từ khi nào?",
      "Điều gì làm em khó chịu nhất lúc này?",
      "Em đã từng chia sẻ chuyện này với ai chưa?",
    ],

    advice: `
Em có thể thử một cách rất đơn giản:

1. Dừng lại vài phút.
2. Hít vào chậm.
3. Thở ra từ từ.
4. Gọi tên cảm xúc của mình: "Mình đang buồn", "Mình đang lo" hoặc "Mình đang tức giận".
5. Tự hỏi: "Điều gì nằm trong khả năng mình có thể thay đổi ngay lúc này?"

Em không cần phải giải quyết tất cả mọi chuyện cùng một lúc.
`,
  },


  study: {
    opening:
      "Áp lực học tập có thể khiến chúng ta cảm thấy mệt mỏi, lo lắng hoặc mất động lực.",

    questions: [
      "Điều gì trong việc học đang khiến em áp lực nhất?",
      "Em lo điểm số hay lo phản ứng của cha mẹ/thầy cô?",
      "Môn học nào khiến em cảm thấy khó khăn nhất?",
      "Em thường học vào thời gian nào?",
    ],

    advice: `
Em có thể thử phương pháp "việc nhỏ trước":

📚 Chọn một nhiệm vụ nhỏ.
⏱️ Tập trung khoảng 20–25 phút.
☕ Nghỉ vài phút.
✅ Hoàn thành từng phần thay vì nghĩ rằng mình phải hoàn thành tất cả.

Điểm số là một thông tin về kết quả học tập, không phải giá trị của một con người.
`,
  },


  friendship: {
    opening:
      "Mối quan hệ bạn bè rất quan trọng ở lứa tuổi của em, nên mâu thuẫn với bạn có thể khiến em buồn rất nhiều.",

    questions: [
      "Chuyện giữa em và bạn bắt đầu như thế nào?",
      "Em muốn điều gì xảy ra giữa hai bạn?",
      "Em đã thử nói chuyện trực tiếp với bạn chưa?",
      "Em có cảm thấy mình đang bị cô lập hoặc bị bắt nạt không?",
    ],

    advice: `
Nếu đây chỉ là một hiểu lầm, em có thể chọn lúc cả hai bình tĩnh rồi nói:

"Mình cảm thấy buồn khi chuyện đó xảy ra. Mình muốn chúng ta nói chuyện để hiểu nhau hơn."

Hãy nói về cảm xúc và sự việc thay vì dùng những câu mang tính công kích như:
"Bạn lúc nào cũng..."

Nếu có hành vi bắt nạt, đe dọa hoặc bạo lực, em không cần tự giải quyết một mình.
`,
  },


  family: {
    opening:
      "Mâu thuẫn với gia đình có thể khiến em cảm thấy rất khó chịu, nhất là khi em cảm thấy mình không được hiểu.",

    questions: [
      "Điều gì khiến em khó nói chuyện với bố mẹ?",
      "Em mong bố mẹ hiểu điều gì về mình?",
      "Hai bên thường tranh cãi về vấn đề gì?",
      "Có người lớn nào trong gia đình mà em cảm thấy dễ chia sẻ hơn không?",
    ],

    advice: `
Khi nói chuyện với cha mẹ, em có thể thử chọn thời điểm mọi người bình tĩnh.

Thay vì:
"Bố mẹ chẳng bao giờ hiểu con."

Em có thể nói:
"Con cảm thấy áp lực khi chuyện này xảy ra và con muốn bố mẹ nghe con nói trước."

Không phải lúc nào hai bên cũng đồng ý với nhau ngay, nhưng cách nói bình tĩnh có thể giúp cuộc trò chuyện dễ dàng hơn.
`,
  },


  love: {
    opening:
      "Cảm xúc thích một người là điều rất tự nhiên ở tuổi học sinh.",

    questions: [
      "Điều gì khiến em băn khoăn nhất về tình cảm này?",
      "Em đang vui, buồn hay lo lắng?",
      "Em có cảm thấy mình đang bị ép buộc điều gì không?",
      "Em có đang bỏ bê việc học hoặc những hoạt động khác vì chuyện này không?",
    ],

    advice: `
Tình cảm tuổi học trò nên đi cùng sự tôn trọng, tự nguyện và ranh giới cá nhân.

Em có quyền nói "không" với điều khiến em không thoải mái.

Đừng gửi hoặc chia sẻ hình ảnh riêng tư chỉ vì sợ mất một mối quan hệ.
`,
  },


  bullying: {
    opening:
      "Nếu em đang bị bắt nạt, điều đầu tiên cô muốn em biết là em không cần phải chịu đựng một mình.",

    questions: [
      "Chuyện đó xảy ra ở đâu?",
      "Ai đang làm điều đó?",
      "Chuyện xảy ra một lần hay nhiều lần?",
      "Em có cảm thấy mình đang gặp nguy hiểm không?",
      "Có giáo viên hoặc người lớn nào đã biết chuyện chưa?",
    ],

    advice: `
Nếu em bị bắt nạt:

🛡️ Không nhất thiết phải đối đầu trực tiếp với người bắt nạt.
🛡️ Hãy ở gần bạn bè hoặc người lớn đáng tin cậy.
🛡️ Lưu lại thông tin liên quan nếu phù hợp và an toàn.
🛡️ Báo với giáo viên hoặc người lớn.
🛡️ Nếu có nguy hiểm về thể chất, ưu tiên rời khỏi nơi đó và tìm sự giúp đỡ.

Bị bắt nạt không phải là lỗi của em.
`,
  },


  socialMedia: {
    opening:
      "Mạng xã hội có thể giúp chúng ta kết nối, nhưng cũng có thể tạo ra khá nhiều áp lực.",

    questions: [
      "Điều gì trên mạng xã hội đang khiến em khó chịu?",
      "Em sử dụng điện thoại khoảng bao lâu mỗi ngày?",
      "Em có đang bị ai nhắn tin đe dọa hoặc xúc phạm không?",
      "Em có cảm thấy mình phải liên tục kiểm tra điện thoại không?",
    ],

    advice: `
Em có thể thử:

📱 Đặt khoảng thời gian không sử dụng điện thoại.
🌱 Tắt thông báo không cần thiết.
😴 Không sử dụng điện thoại ngay trước khi ngủ.
👥 Dành thời gian cho hoạt động ngoài đời thực.
🛡️ Nếu bị đe dọa hoặc bắt nạt trực tuyến, hãy lưu lại thông tin và báo cho người lớn.
`,
  },


  lifeSkill: {
    opening:
      "Cô rất vui khi em muốn tìm cách cải thiện kỹ năng của mình.",

    questions: [
      "Em muốn cải thiện kỹ năng nào nhất?",
      "Điều gì khiến em thấy mình đang gặp khó khăn?",
      "Em đã thử cách nào rồi?",
    ],

    advice: `
Em không cần thay đổi tất cả cùng một lúc.

Hãy chọn một việc nhỏ:

🎯 Xác định mục tiêu.
📝 Viết ra việc cần làm.
⏱️ Chọn thời gian thực hiện.
✅ Hoàn thành một bước nhỏ.
🔄 Xem lại kết quả.

Thay đổi nhỏ nhưng đều đặn thường dễ duy trì hơn việc đặt mục tiêu quá lớn ngay từ đầu.
`,
  },
};


/* ======================================================
   11. TẠO CÂU TRẢ LỜI
====================================================== */

function generateResponse(userText) {

  const risk = detectRisk(userText);

  /* NGUY CƠ CAO */
  if (risk === "HIGH") {
    return highRiskResponse();
  }

  /* CHỦ ĐỀ */
  const topic = detectTopic(userText);

  /* NGUY CƠ TRUNG BÌNH */
  if (risk === "MEDIUM") {
    return mediumRiskResponse(topic);
  }

  const data = KNOWLEDGE[topic];

  const randomQuestion =
    data.questions[
      Math.floor(Math.random() * data.questions.length)
    ];

  return {
    type: "NORMAL",

    message: `
${data.opening}

${data.advice}

💬 Cô muốn hỏi em thêm một điều:

"${randomQuestion}"

Em có thể kể cho cô theo cách mà em cảm thấy thoải mái nhất.
Không cần phải kể tất cả ngay một lúc.
`,
  };
}


/* ======================================================
   12. COMPONENT NÚT LIÊN HỆ GIÁO VIÊN
====================================================== */

function CounselorCard() {

  return (
    <div className="counselor-card">

      <div className="counselor-icon">
        👩‍🏫
      </div>

      <div className="counselor-content">

        <strong>
          Giáo viên tư vấn tâm lý học đường
        </strong>

        <div>
          {COUNSELOR.school}
        </div>

        <div>
          🕐 Thời gian hỗ trợ: {COUNSELOR.workingTime}
        </div>

        {COUNSELOR.phone && (
          <div>
            📞 {COUNSELOR.phone}
          </div>
        )}

        {COUNSELOR.email && (
          <div>
            ✉️ {COUNSELOR.email}
          </div>
        )}

      </div>

    </div>
  );
}


/* ======================================================
   13. COMPONENT APP
====================================================== */

export default function App() {

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: `
👋 Chào em!

Cô là Trợ lý AI tư vấn tâm lý học đường.

Em có thể chia sẻ với cô về:

📚 Học tập
😟 Cảm xúc
👥 Bạn bè
🏠 Gia đình
💕 Tình cảm
🛡️ Bắt nạt học đường
📱 Mạng xã hội
🌱 Kỹ năng sống

Em không cần phải kể mọi thứ ngay lập tức.

Hãy bắt đầu bằng điều đang khiến em băn khoăn nhất nhé.
`,
    },
  ]);

  const [input, setInput] = useState("");

  const [typing, setTyping] = useState(false);

  const chatEndRef = useRef(null);


  /* ====================================================
     TỰ ĐỘNG CUỘN XUỐNG
  ==================================================== */

  useEffect(() => {

    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages, typing]);


  /* ====================================================
     GỬI TIN NHẮN
  ==================================================== */

  const sendMessage = (text = input) => {

    const message = text.trim();

    if (!message) return;

    setMessages((prev) => [
      ...prev,

      {
        sender: "user",
        text: message,
      },
    ]);

    setInput("");

    setTyping(true);


    setTimeout(() => {

      const response = generateResponse(message);

      setMessages((prev) => [
        ...prev,

        {
          sender: "bot",
          text: response.message,
          risk: response.type,
        },
      ]);

      setTyping(false);

    }, 700);
  };


  /* ====================================================
     GỢI Ý NHANH
  ==================================================== */

  const quickTopics = [

    {
      icon: "😟",
      label: "Em đang buồn",
      text: "Em đang cảm thấy rất buồn và không biết phải làm gì.",
    },

    {
      icon: "📚",
      label: "Áp lực học tập",
      text: "Em đang cảm thấy rất áp lực về việc học và điểm số.",
    },

    {
      icon: "👥",
      label: "Vấn đề bạn bè",
      text: "Em đang có vấn đề với bạn bè và không biết giải quyết thế nào.",
    },

    {
      icon: "🏠",
      label: "Gia đình",
      text: "Em đang gặp khó khăn khi nói chuyện với bố mẹ.",
    },

    {
      icon: "💕",
      label: "Tình cảm",
      text: "Em đang có một vấn đề về tình cảm và muốn được chia sẻ.",
    },

    {
      icon: "🛡️",
      label: "Bị bắt nạt",
      text: "Em đang bị các bạn bắt nạt và em không biết phải làm gì.",
    },

    {
      icon: "📱",
      label: "Mạng xã hội",
      text: "Mạng xã hội đang khiến em cảm thấy áp lực.",
    },

    {
      icon: "🌱",
      label: "Kỹ năng sống",
      text: "Em muốn được hướng dẫn cách tự tin và quản lý cảm xúc tốt hơn.",
    },

  ];


  /* ====================================================
     NÚT KHẨN CẤP
  ==================================================== */

  const emergency = () => {

    const response = highRiskResponse();

    setMessages((prev) => [

      ...prev,

      {
        sender: "user",
        text: "🆘 Em cần được giúp đỡ ngay.",
      },

      {
        sender: "bot",
        text: response.message,
        risk: "HIGH",
      },

    ]);

  };


  return (

    <div className="app">

      {/* HEADER */}

      <header className="header">

        <div className="logo">
          🧠
        </div>

        <div>

          <h1>
            Trợ lý AI Tư vấn Tâm lý Học đường
          </h1>

          <p>
            Luôn lắng nghe • Không phán xét • Đồng hành cùng em
          </p>

        </div>

      </header>


      {/* CHAT */}

      <main className="chat-container">

        <div className="chat-box">

          {messages.map((message, index) => (

            <div
              key={index}
              className={
                message.sender === "user"
                  ? "message user-message"
                  : "message bot-message"
              }
            >

              <div className="avatar">

                {message.sender === "user"
                  ? "👧"
                  : "🧠"}

              </div>

              <div className="bubble">

                <div className="message-text">
                  {message.text}
                </div>

                {message.sender === "bot" &&
                  message.risk === "HIGH" && (

                    <CounselorCard />

                  )}

              </div>

            </div>

          ))}


          {/* TYPING */}

          {typing && (

            <div className="message bot-message">

              <div className="avatar">
                🧠
              </div>

              <div className="bubble typing">
                Cô đang suy nghĩ...
              </div>

            </div>

          )}

          <div ref={chatEndRef} />

        </div>


        {/* GỢI Ý */}

        <div className="quick-section">

          <div className="quick-title">
            Em muốn chia sẻ về:
          </div>

          <div className="quick-grid">

            {quickTopics.map((item, index) => (

              <button
                key={index}
                className="quick-button"
                onClick={() => sendMessage(item.text)}
              >

                <span>
                  {item.icon}
                </span>

                <span>
                  {item.label}
                </span>

              </button>

            ))}

          </div>

        </div>


        {/* KHẨN CẤP */}

        <button
          className="emergency-button"
          onClick={emergency}
        >
          🆘 Em cần được giúp đỡ ngay
        </button>


        {/* INPUT */}

        <div className="input-area">

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {

              if (
                e.key === "Enter" &&
                !e.shiftKey
              ) {

                e.preventDefault();

                sendMessage();

              }

            }}
            placeholder="Em hãy viết điều em muốn chia sẻ..."
          />

          <button
            className="send-button"
            onClick={() => sendMessage()}
          >
            ➤
          </button>

        </div>


        {/* THÔNG TIN */}

        <div className="privacy-note">

          🔒 Em không cần cung cấp mật khẩu,
          thông tin tài khoản hoặc những thông tin
          cá nhân không cần thiết.

        </div>

      </main>

    </div>

  );
}
