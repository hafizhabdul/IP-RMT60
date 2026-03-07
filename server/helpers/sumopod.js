const axios = require("axios");
const { Lecture, Category, Lesson } = require("../models");

const SUMOPOD_API_URL = "https://ai.sumopod.com/v1/chat/completions";
const API_KEY = process.env.SUMOPOD_API_KEY;

const createSystemPrompt = (lectures, categories) => {
  const lectureInfo = lectures.map(lecture => {
    const lessonTitles = lecture.lessons && lecture.lessons.length > 0
      ? lecture.lessons.map(l => l.title).join(', ')
      : 'Details not available';

    return {
      id: lecture.id,
      instructor: lecture.name,
      technique: lecture.technique,
      category: lecture.category?.name || 'Unknown',
      price: lecture.price,
      description: lecture.description,
      availability: lecture.availability,
      experience: lecture.experience_years,
      certifications: lecture.certifications,
      lessons: lessonTitles
    };
  });

  const categoryInfo = categories.map(cat => ({
    name: cat.name,
    description: cat.description,
    techniques: cat.techniques
  }));

  return `You are SNS Assistant, an expert AI chatbot for SNS NDT Academy, a premier Non-Destructive Testing (NDT) training institution. Your goal is to be knowledgeable, helpful, and professional.

**Institutional Profile:**
- **Name:** SNS NDT Academy (SAR NDT Services)
- **Specialization:** Non-Destructive Testing (NDT) certification and training.
- **Target Industries:** Oil & Gas, Petrochemical, Aerospace, Automotive.
- **Instructor Quality:** All instructors are ASNT Level III certified professionals.
- **Registration:** All registrations are handled via WhatsApp at +62 812-9258-446

**Available Course Categories:**
${categoryInfo.map(cat => `- **${cat.name}**: ${cat.description}\n  *Techniques Covered*: ${cat.techniques?.join(', ') || 'N/A'}`).join('\n')}

**Detailed Course Offerings:**
${lectureInfo.map(course => `- **${course.technique}** by ${course.instructor} | Category: ${course.category} | Price: Rp ${new Intl.NumberFormat('id-ID').format(course.price || 0)} | Availability: ${course.availability || 'Contact admin'} | Curriculum: ${course.lessons}`).join('\n')}

**Your Role & Guidelines:**
1. Answer user questions about courses (content, price, schedule), NDT techniques, enrollment, and certification.
2. Maintain a professional, friendly tone. Respond in the same language the user uses (Indonesian or English).
3. Base answers on the course data provided above.
4. For enrollment queries, always direct users to WhatsApp: +62 812-9258-446
5. Keep responses concise but informative.`;
};

async function sendMessageToAI(message) {
  try {
    const [lectures, categories] = await Promise.all([
      Lecture.findAll({
        include: [
          { model: Category, as: 'category', attributes: ['name'] },
          { model: Lesson, as: 'lessons', attributes: ['title'] }
        ]
      }),
      Category.findAll()
    ]);

    const systemPrompt = createSystemPrompt(lectures, categories);

    const response = await axios.post(
      SUMOPOD_API_URL,
      {
        model: "kimi-k2-thinking",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        max_tokens: 1024,
        temperature: 0.7
      },
      {
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        },
        timeout: 30000
      }
    );

    const text = response.data.choices?.[0]?.message?.content;

    if (!text || text.trim().length === 0) {
      throw new Error("Empty response from AI");
    }

    return text;
  } catch (error) {
    console.error("Error in sendMessageToAI:", error.message);
    throw new Error(`Failed to get AI response: ${error.message}`);
  }
}

module.exports = { sendMessageToAI };
