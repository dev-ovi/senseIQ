const { Category, Quiz, Question } = require("../models");

const newCategories = [
  {
    name: "African Literature",
    description:
      "Explore the rich literary tradition of Africa, from oral storytelling to contemporary novels.",
    icon: "book-icon.png",
  },
  {
    name: "Traditional Music",
    description:
      "Discover the diverse musical traditions and instruments of Africa.",
    icon: "music-icon.png",
  },
  {
    name: "African Cuisine",
    description:
      "Learn about the diverse culinary traditions and dishes across Africa.",
    icon: "food-icon.png",
  },
  {
    name: "Indigenous Languages",
    description: "Test your knowledge of Africa's rich linguistic diversity.",
    icon: "language-icon.png",
  },
  {
    name: "African Art",
    description: "Explore traditional and contemporary African art forms.",
    icon: "art-icon.png",
  },
  {
    name: "Traditional Games",
    description: "Learn about traditional African games and sports.",
    icon: "games-icon.png",
  },
  {
    name: "African Innovation",
    description:
      "Discover African innovations in technology, science, and entrepreneurship.",
    icon: "innovation-icon.png",
  },
];

const newQuizzes = [
  {
    title: "African Literature Classics",
    description:
      "Test your knowledge of African literary giants and their works",
    category: "African Literature",
    difficultyLevel: "medium",
    timeLimit: 600,
    questions: [
      {
        questionText: "Who wrote 'Things Fall Apart'?",
        questionType: "multiple-choice",
        options: [
          "Chinua Achebe",
          "Wole Soyinka",
          "Ngugi wa Thiong'o",
          "Ben Okri",
        ],
        correctAnswer: "Chinua Achebe",
        pointsValue: 10,
        explanation:
          "Chinua Achebe's 'Things Fall Apart' is considered one of the most important works of African literature.",
      },
      {
        questionText:
          "Which Nigerian author won the Nobel Prize in Literature in 1986?",
        questionType: "multiple-choice",
        options: [
          "Wole Soyinka",
          "Chinua Achebe",
          "Buchi Emecheta",
          "Ben Okri",
        ],
        correctAnswer: "Wole Soyinka",
        pointsValue: 10,
        explanation:
          "Wole Soyinka was the first African to win the Nobel Prize in Literature.",
      },
    ],
  },
  {
    title: "Traditional African Instruments",
    description:
      "Learn about the diverse musical instruments used across Africa",
    category: "Traditional Music",
    difficultyLevel: "medium",
    timeLimit: 600,
    questions: [
      {
        questionText: "Which instrument is known as the 'talking drum'?",
        questionType: "multiple-choice",
        options: ["Djembe", "Kora", "Dundun", "Mbira"],
        correctAnswer: "Dundun",
        pointsValue: 10,
        explanation:
          "The Dundun is a West African drum that can mimic the tones of speech.",
      },
      {
        questionText: "The Kora is a string instrument from which region?",
        questionType: "multiple-choice",
        options: [
          "West Africa",
          "East Africa",
          "Southern Africa",
          "North Africa",
        ],
        correctAnswer: "West Africa",
        pointsValue: 10,
        explanation:
          "The Kora is a 21-string lute-bridge-harp used extensively in West Africa.",
      },
    ],
  },
];

async function seedAdditionalContent() {
  try {
    // Create new categories
    const createdCategories = await Category.bulkCreate(newCategories);
    console.log(`Created ${createdCategories.length} new categories`);

    // Create new quizzes
    for (const quizData of newQuizzes) {
      const category = await Category.findOne({
        where: { name: quizData.category },
      });
      if (category) {
        const quiz = await Quiz.create({
          title: quizData.title,
          description: quizData.description,
          categoryId: category.id,
          difficultyLevel: quizData.difficultyLevel,
          timeLimit: quizData.timeLimit,
          isPublic: true,
          isApproved: true,
        });

        // Create questions for the quiz
        const questions = quizData.questions.map((q) => ({
          ...q,
          quizId: quiz.id,
        }));
        await Question.bulkCreate(questions);
        console.log(`Created quiz: ${quiz.title}`);
      }
    }

    console.log("Additional content seeded successfully");
  } catch (error) {
    console.error("Error seeding additional content:", error);
  }
}

module.exports = seedAdditionalContent;
