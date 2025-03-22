const {
  sequelize,
  User,
  Category,
  Quiz,
  Question,
  Achievement,
  UserProgress,
} = require("../models");
const bcrypt = require("bcrypt");

async function seedDatabase() {
  try {
    // Sync database
    await sequelize.sync({ force: true });
    console.log("Database synced successfully");

    // Create users with different levels and points for leaderboard
    const users = [
      // Admin user
      {
        username: "admin",
        email: "admin@example.com",
        password: await bcrypt.hash("admin123", 10),
        bio: "System administrator and African history enthusiast",
        level: 20,
        points: 20000,
        role: "admin",
        lastLogin: new Date(),
      },
      // Regular users with varying levels for leaderboard
      {
        username: "sarahjones",
        email: "sarah@example.com",
        password: await bcrypt.hash("sarah123", 10),
        bio: "Teacher with passion for African geography",
        level: 18,
        points: 17850,
        lastLogin: new Date(),
      },
      {
        username: "michaelowusu",
        email: "michael@example.com",
        password: await bcrypt.hash("michael123", 10),
        bio: "History professor specializing in West African civilizations",
        level: 19,
        points: 19200,
        lastLogin: new Date(),
      },
      {
        username: "aminaliu",
        email: "amina@example.com",
        password: await bcrypt.hash("amina123", 10),
        bio: "Wildlife conservationist from Kenya",
        level: 17,
        points: 16500,
        lastLogin: new Date(),
      },
      {
        username: "kwameaddo",
        email: "kwame@example.com",
        password: await bcrypt.hash("kwame123", 10),
        bio: "Cultural researcher and trivia enthusiast",
        level: 16,
        points: 15800,
        lastLogin: new Date(),
      },
      {
        username: "priyashah",
        email: "priya@example.com",
        password: await bcrypt.hash("priya123", 10),
        bio: "Anthropologist studying African cultures",
        level: 15,
        points: 14700,
        lastLogin: new Date(),
      },
      {
        username: "josefrivas",
        email: "josef@example.com",
        password: await bcrypt.hash("josef123", 10),
        bio: "Traveler who has visited 20 African countries",
        level: 14,
        points: 13600,
        lastLogin: new Date(),
      },
      {
        username: "zainabmohammed",
        email: "zainab@example.com",
        password: await bcrypt.hash("zainab123", 10),
        bio: "Archaeology student focusing on ancient African civilizations",
        level: 13,
        points: 12800,
        lastLogin: new Date(),
      },
      {
        username: "davidcheng",
        email: "david@example.com",
        password: await bcrypt.hash("david123", 10),
        bio: "Food blogger interested in African cuisine",
        level: 12,
        points: 11900,
        lastLogin: new Date(),
      },
      // Additional users for enhanced leaderboard
      {
        username: "ngoziokoro",
        email: "ngozi@example.com",
        password: await bcrypt.hash("ngozi123", 10),
        bio: "Professor of African Languages at Lagos University",
        level: 15,
        points: 15200,
        lastLogin: new Date(),
      },
      {
        username: "akinadeleke",
        email: "akin@example.com",
        password: await bcrypt.hash("akin123", 10),
        bio: "Yoruba cultural expert and storyteller",
        level: 13,
        points: 13100,
        lastLogin: new Date(),
      },
      {
        username: "fatimadrame",
        email: "fatima@example.com",
        password: await bcrypt.hash("fatima123", 10),
        bio: "Advocate for girls' education in West Africa",
        level: 11,
        points: 11400,
        lastLogin: new Date(),
      },
      {
        username: "oluseyiogunlesi",
        email: "oluseyi@example.com",
        password: await bcrypt.hash("oluseyi123", 10),
        bio: "Entrepreneur and tech enthusiast from Nigeria",
        level: 10,
        points: 10300,
        lastLogin: new Date(),
      },
      {
        username: "ayodejiakande",
        email: "ayodeji@example.com",
        password: await bcrypt.hash("ayodeji123", 10),
        bio: "Musician studying traditional African instruments",
        level: 9,
        points: 9100,
        lastLogin: new Date(),
      },
      {
        username: "chinweodu",
        email: "chinwe@example.com",
        password: await bcrypt.hash("chinwe123", 10),
        bio: "Igbo folklore expert and storyteller",
        level: 8,
        points: 8400,
        lastLogin: new Date(),
      },
      {
        username: "abdulrahmandiallo",
        email: "abdulrahman@example.com",
        password: await bcrypt.hash("abdul123", 10),
        bio: "Historian specializing in the Mali Empire",
        level: 7,
        points: 7600,
        lastLogin: new Date(),
      },
      {
        username: "malikaamara",
        email: "malika@example.com",
        password: await bcrypt.hash("malika123", 10),
        bio: "Fashion designer inspired by African textiles",
        level: 6,
        points: 6700,
        lastLogin: new Date(),
      },
      {
        username: "nelsonmutai",
        email: "nelson@example.com",
        password: await bcrypt.hash("nelson123", 10),
        bio: "Marathon runner from Kenya",
        level: 5,
        points: 5500,
        lastLogin: new Date(),
      },
      {
        username: "aishakamara",
        email: "aisha@example.com",
        password: await bcrypt.hash("aisha123", 10),
        bio: "Culinary expert in North African cuisine",
        level: 4,
        points: 4300,
        lastLogin: new Date(),
      },
      {
        username: "kofiboateng",
        email: "kofi@example.com",
        password: await bcrypt.hash("kofi123", 10),
        bio: "Ghanaian drummer and music teacher",
        level: 3,
        points: 3400,
        lastLogin: new Date(),
      },
      {
        username: "testuser",
        email: "user@example.com",
        password: await bcrypt.hash("user123", 10),
        bio: "Just a trivia enthusiast!",
        level: 1,
        points: 800,
        lastLogin: new Date(),
      },
    ];

    const createdUsers = [];
    for (const userData of users) {
      const user = await User.create(userData);
      createdUsers.push(user);
    }

    console.log(`Created ${createdUsers.length} users`);

    // Create categories
    const categories = await Category.bulkCreate([
      {
        name: "History",
        description:
          "Explore the rich history of the African continent, from ancient civilizations to modern times.",
        icon: "history-icon.png",
      },
      {
        name: "Geography",
        description:
          "Learn about the diverse landscapes, countries, and natural features of Africa.",
        icon: "geography-icon.png",
      },
      {
        name: "Culture",
        description:
          "Discover the diverse cultures, traditions, arts, and music of Africa.",
        icon: "culture-icon.png",
      },
      {
        name: "Wildlife",
        description:
          "Test your knowledge of the amazing wildlife found across the African continent.",
        icon: "wildlife-icon.png",
      },
      {
        name: "Politics",
        description:
          "Learn about African political systems, leaders, movements, and current affairs.",
        icon: "politics-icon.png",
      },
      {
        name: "Languages",
        description:
          "Explore the linguistic diversity of Africa with over 2000 languages.",
        icon: "languages-icon.png",
      },
      {
        name: "Cuisine",
        description:
          "Discover the rich and diverse culinary traditions across African regions.",
        icon: "cuisine-icon.png",
      },
      {
        name: "Sports",
        description:
          "Test your knowledge about sports and famous athletes from Africa.",
        icon: "sports-icon.png",
      },
    ]);

    console.log(`Created ${categories.length} categories`);

    // ------ QUIZZES ------

    // 1. History Quiz - Ancient African Civilizations
    const africanHistoryQuiz = await Quiz.create({
      title: "Ancient African Civilizations",
      description:
        "Test your knowledge about the ancient civilizations of Africa, including Egypt, Nubia, Axum, and more.",
      difficultyLevel: "medium",
      thumbnail: "africa-history.jpg",
      timeLimit: 600,
      isPublic: true,
      isApproved: true,
      playCount: 128,
      rating: 4.7,
      tags: ["history", "ancient", "civilizations", "beginner"],
      categoryId: categories[0].id,
      creatorId: createdUsers[0].id,
    });

    // Create questions for the history quiz
    await Question.bulkCreate([
      {
        questionText:
          "Which ancient African civilization built the Great Pyramids of Giza?",
        questionType: "multiple-choice",
        options: ["Egypt", "Nubia", "Axum", "Carthage"],
        correctAnswer: "Egypt",
        explanation:
          "The Great Pyramids of Giza were built by the ancient Egyptian civilization during the Old Kingdom period.",
        pointsValue: 10,
        difficultyLevel: "easy",
        orderIndex: 0,
        quizId: africanHistoryQuiz.id,
      },
      {
        questionText:
          "The Kingdom of Axum was located in the area of which modern-day country?",
        questionType: "multiple-choice",
        options: ["Kenya", "Ethiopia", "Nigeria", "Morocco"],
        correctAnswer: "Ethiopia",
        explanation:
          "The Kingdom of Axum was centered in the northern region of modern-day Ethiopia and parts of Eritrea.",
        pointsValue: 15,
        difficultyLevel: "medium",
        orderIndex: 1,
        quizId: africanHistoryQuiz.id,
      },
      {
        questionText:
          "True or False: The Mali Empire was known for its wealth in gold.",
        questionType: "true-false",
        options: [],
        correctAnswer: true,
        explanation:
          "The Mali Empire was indeed known for its vast wealth, particularly from gold mining and trade.",
        pointsValue: 10,
        difficultyLevel: "easy",
        orderIndex: 2,
        quizId: africanHistoryQuiz.id,
      },
      {
        questionText:
          "Who was the famous ruler of the Mali Empire known for his pilgrimage to Mecca and generous distribution of gold?",
        questionType: "multiple-choice",
        options: [
          "Sundiata Keita",
          "Mansa Musa",
          "Askia Muhammad",
          "Sonni Ali",
        ],
        correctAnswer: "Mansa Musa",
        explanation:
          "Mansa Musa was the tenth Mansa (sultan) of the Mali Empire, known for his wealth and famous pilgrimage to Mecca in 1324-1325.",
        pointsValue: 20,
        difficultyLevel: "medium",
        orderIndex: 3,
        quizId: africanHistoryQuiz.id,
      },
      {
        questionText:
          "Which ancient African city was a major center of learning, with the University of Sankore being one of the world's oldest universities?",
        questionType: "multiple-choice",
        options: ["Cairo", "Timbuktu", "Benin City", "Meroe"],
        correctAnswer: "Timbuktu",
        explanation:
          "Timbuktu, located in present-day Mali, was a major center of Islamic learning with the University of Sankore being one of the world's oldest universities.",
        pointsValue: 25,
        difficultyLevel: "hard",
        orderIndex: 4,
        quizId: africanHistoryQuiz.id,
      },
    ]);

    // 2. Wildlife Quiz - African Wildlife Safari
    const wildlifeQuiz = await Quiz.create({
      title: "African Wildlife Safari",
      description:
        "Test your knowledge about the diverse wildlife found across the African continent.",
      difficultyLevel: "easy",
      thumbnail: "africa-wildlife.jpg",
      timeLimit: 300,
      isPublic: true,
      isApproved: true,
      playCount: 86,
      rating: 4.5,
      tags: ["wildlife", "animals", "safari", "nature"],
      categoryId: categories[3].id,
      creatorId: createdUsers[3].id,
    });

    // Create questions for the wildlife quiz
    await Question.bulkCreate([
      {
        questionText:
          'Which of these African animals is known as the "king of the jungle"?',
        questionType: "multiple-choice",
        options: ["Elephant", "Lion", "Giraffe", "Gorilla"],
        correctAnswer: "Lion",
        explanation:
          'The lion is often called the "king of the jungle" although they primarily inhabit grasslands and plains rather than jungles.',
        pointsValue: 10,
        difficultyLevel: "easy",
        orderIndex: 0,
        quizId: wildlifeQuiz.id,
      },
      {
        questionText: "Which is the largest land animal found in Africa?",
        questionType: "multiple-choice",
        options: ["Rhinoceros", "Hippopotamus", "Elephant", "Giraffe"],
        correctAnswer: "Elephant",
        explanation:
          "The African elephant is the largest land animal not just in Africa but in the world.",
        pointsValue: 10,
        difficultyLevel: "easy",
        orderIndex: 1,
        quizId: wildlifeQuiz.id,
      },
      {
        questionText:
          "True or False: The cheetah is the fastest land animal in the world.",
        questionType: "true-false",
        options: [],
        correctAnswer: true,
        explanation:
          "The cheetah is indeed the fastest land animal, capable of reaching speeds up to 70 mph (113 km/h) in short bursts.",
        pointsValue: 10,
        difficultyLevel: "easy",
        orderIndex: 2,
        quizId: wildlifeQuiz.id,
      },
      {
        questionText:
          'Which of these animals is part of the "Big Five" game animals of Africa?',
        questionType: "multiple-choice",
        options: ["Giraffe", "Hippo", "Cheetah", "Lion"],
        correctAnswer: "Lion",
        explanation:
          "The Big Five game animals of Africa are the lion, leopard, rhinoceros, elephant, and Cape buffalo.",
        pointsValue: 15,
        difficultyLevel: "medium",
        orderIndex: 3,
        quizId: wildlifeQuiz.id,
      },
      {
        questionText: "What is the only great ape native to Africa?",
        questionType: "multiple-choice",
        options: ["Orangutan", "Gorilla", "Chimpanzee", "Bonobo"],
        correctAnswer: "Gorilla",
        explanation:
          "While chimpanzees and bonobos are also native to Africa and are great apes, the gorilla is the largest great ape native to Africa.",
        pointsValue: 20,
        difficultyLevel: "medium",
        orderIndex: 4,
        quizId: wildlifeQuiz.id,
      },
    ]);

    // 3. Geography Quiz
    const geographyQuiz = await Quiz.create({
      title: "African Geography Challenge",
      description:
        "Test your knowledge of African countries, capitals, natural features and landscapes.",
      difficultyLevel: "medium",
      thumbnail: "africa-geography.jpg",
      timeLimit: 450,
      isPublic: true,
      isApproved: true,
      playCount: 103,
      rating: 4.3,
      tags: ["geography", "countries", "capitals", "landscapes"],
      categoryId: categories[1].id,
      creatorId: createdUsers[1].id,
    });

    // Create questions for the geography quiz
    await Question.bulkCreate([
      {
        questionText: "Which is the largest country by land area in Africa?",
        questionType: "multiple-choice",
        options: ["Nigeria", "Algeria", "Egypt", "South Africa"],
        correctAnswer: "Algeria",
        explanation:
          "Algeria is the largest country by land area in Africa, covering approximately 2.38 million square kilometers.",
        pointsValue: 15,
        difficultyLevel: "medium",
        orderIndex: 0,
        quizId: geographyQuiz.id,
      },
      {
        questionText:
          "Which African desert is the largest hot desert in the world?",
        questionType: "multiple-choice",
        options: [
          "Sahara Desert",
          "Kalahari Desert",
          "Namib Desert",
          "Libyan Desert",
        ],
        correctAnswer: "Sahara Desert",
        explanation:
          "The Sahara Desert is the largest hot desert in the world, covering most of North Africa.",
        pointsValue: 10,
        difficultyLevel: "easy",
        orderIndex: 1,
        quizId: geographyQuiz.id,
      },
      {
        questionText: "What is the capital city of Kenya?",
        questionType: "multiple-choice",
        options: ["Lagos", "Nairobi", "Addis Ababa", "Kigali"],
        correctAnswer: "Nairobi",
        explanation: "Nairobi is the capital and largest city of Kenya.",
        pointsValue: 10,
        difficultyLevel: "easy",
        orderIndex: 2,
        quizId: geographyQuiz.id,
      },
      {
        questionText: "True or False: The Nile is the longest river in Africa.",
        questionType: "true-false",
        options: [],
        correctAnswer: true,
        explanation:
          "The Nile is indeed the longest river in Africa and one of the longest in the world, flowing through 11 countries.",
        pointsValue: 10,
        difficultyLevel: "easy",
        orderIndex: 3,
        quizId: geographyQuiz.id,
      },
      {
        questionText: "Which mountain is the highest peak in Africa?",
        questionType: "multiple-choice",
        options: [
          "Mount Kenya",
          "Mount Kilimanjaro",
          "Atlas Mountains",
          "Rwenzori Mountains",
        ],
        correctAnswer: "Mount Kilimanjaro",
        explanation:
          "Mount Kilimanjaro, located in Tanzania, is the highest mountain in Africa at 5,895 meters (19,341 feet) above sea level.",
        pointsValue: 15,
        difficultyLevel: "medium",
        orderIndex: 4,
        quizId: geographyQuiz.id,
      },
    ]);

    // 4. Culture Quiz
    const cultureQuiz = await Quiz.create({
      title: "African Cultural Heritage",
      description:
        "Explore the rich and diverse cultural heritage of the African continent through this engaging quiz.",
      difficultyLevel: "medium",
      thumbnail: "africa-culture.jpg",
      timeLimit: 500,
      isPublic: true,
      isApproved: true,
      playCount: 75,
      rating: 4.6,
      tags: ["culture", "traditions", "arts", "music"],
      categoryId: categories[2].id,
      creatorId: createdUsers[4].id,
    });

    // Create questions for the culture quiz
    await Question.bulkCreate([
      {
        questionText:
          "Which African musical instrument is made from a hollowed-out gourd with metal tines attached to the surface?",
        questionType: "multiple-choice",
        options: ["Kora", "Djembe", "Kalimba", "Talking drum"],
        correctAnswer: "Kalimba",
        explanation:
          "The Kalimba, also known as the thumb piano, is made from a wooden board or hollowed-out gourd with metal tines attached to the surface.",
        pointsValue: 15,
        difficultyLevel: "medium",
        orderIndex: 0,
        quizId: cultureQuiz.id,
      },
      {
        questionText:
          "Which North African country is known for its distinctive blue-painted towns, particularly Chefchaouen?",
        questionType: "multiple-choice",
        options: ["Egypt", "Tunisia", "Morocco", "Algeria"],
        correctAnswer: "Morocco",
        explanation:
          'Morocco is known for Chefchaouen, often called "The Blue City," where buildings are painted in various shades of blue.',
        pointsValue: 15,
        difficultyLevel: "medium",
        orderIndex: 1,
        quizId: cultureQuiz.id,
      },
      {
        questionText:
          "Which African dance style, originating from Angola, influenced the development of Brazilian Capoeira?",
        questionType: "multiple-choice",
        options: ["Adumu", "Kizomba", "Ndombolo", "N'golo"],
        correctAnswer: "N'golo",
        explanation:
          'N\'golo (or Engolo), meaning "zebra kick," is an Angolan martial art and dance that heavily influenced the development of Brazilian Capoeira.',
        pointsValue: 20,
        difficultyLevel: "hard",
        orderIndex: 2,
        quizId: cultureQuiz.id,
      },
      {
        questionText:
          "True or False: The Maasai people are primarily found in Kenya and Tanzania.",
        questionType: "true-false",
        options: [],
        correctAnswer: true,
        explanation:
          "The Maasai are a Nilotic ethnic group inhabiting central and southern Kenya and northern Tanzania.",
        pointsValue: 10,
        difficultyLevel: "easy",
        orderIndex: 3,
        quizId: cultureQuiz.id,
      },
      {
        questionText:
          "Which colorful fabric, characterized by bright colors and patterns, is traditionally worn in West Africa?",
        questionType: "multiple-choice",
        options: ["Kente", "Kitenge", "Shweshwe", "Bogolan"],
        correctAnswer: "Kente",
        explanation:
          "Kente cloth, made of interwoven cloth strips, originated with the Akan people of Ghana and is characterized by bright multicolored patterns.",
        pointsValue: 15,
        difficultyLevel: "medium",
        orderIndex: 4,
        quizId: cultureQuiz.id,
      },
    ]);

    // 5. Languages Quiz
    const languagesQuiz = await Quiz.create({
      title: "Languages of Africa",
      description:
        "Explore the linguistic diversity of Africa with over 2000 languages spoken across the continent.",
      difficultyLevel: "hard",
      thumbnail: "africa-languages.jpg",
      timeLimit: 600,
      isPublic: true,
      isApproved: true,
      playCount: 42,
      rating: 4.2,
      tags: ["languages", "linguistics", "communication", "education"],
      categoryId: categories[5].id,
      creatorId: createdUsers[2].id,
    });

    // Questions for languages quiz
    await Question.bulkCreate([
      {
        questionText:
          "Which of these is the most widely spoken indigenous language in Africa?",
        questionType: "multiple-choice",
        options: ["Yoruba", "Swahili", "Zulu", "Amharic"],
        correctAnswer: "Swahili",
        explanation:
          "Swahili (Kiswahili) is the most widely spoken African language, used as a lingua franca in much of East Africa.",
        pointsValue: 15,
        difficultyLevel: "medium",
        orderIndex: 0,
        quizId: languagesQuiz.id,
      },
      {
        questionText:
          "Which language family do most North African languages belong to?",
        questionType: "multiple-choice",
        options: ["Niger-Congo", "Afro-Asiatic", "Nilo-Saharan", "Khoisan"],
        correctAnswer: "Afro-Asiatic",
        explanation:
          "Most North African languages, including Arabic, Berber languages, and ancient Egyptian, belong to the Afro-Asiatic language family.",
        pointsValue: 20,
        difficultyLevel: "hard",
        orderIndex: 1,
        quizId: languagesQuiz.id,
      },
      {
        questionText: "Which African language uses click consonants?",
        questionType: "multiple-choice",
        options: ["Swahili", "Yoruba", "Xhosa", "Hausa"],
        correctAnswer: "Xhosa",
        explanation:
          "Xhosa is known for its click consonants, represented in writing by letters like c, q, and x.",
        pointsValue: 15,
        difficultyLevel: "medium",
        orderIndex: 2,
        quizId: languagesQuiz.id,
      },
      {
        questionText:
          "True or False: Amharic is the official language of Ethiopia.",
        questionType: "true-false",
        options: [],
        correctAnswer: true,
        explanation:
          "Amharic is indeed the official language of Ethiopia and is the second most spoken Semitic language in the world after Arabic.",
        pointsValue: 10,
        difficultyLevel: "easy",
        orderIndex: 3,
        quizId: languagesQuiz.id,
      },
      {
        questionText: "Which language is the most widely spoken in Nigeria?",
        questionType: "multiple-choice",
        options: ["Hausa", "Yoruba", "Igbo", "English"],
        correctAnswer: "Hausa",
        explanation:
          "While English is the official language, Hausa is the most widely spoken indigenous language in Nigeria, particularly in the northern regions.",
        pointsValue: 15,
        difficultyLevel: "medium",
        orderIndex: 4,
        quizId: languagesQuiz.id,
      },
    ]);

    const quizzes = [
      africanHistoryQuiz,
      wildlifeQuiz,
      geographyQuiz,
      cultureQuiz,
      languagesQuiz,
    ];
    console.log(`Created ${quizzes.length} quizzes with questions`);

    // Create achievements
    const achievements = await Achievement.bulkCreate([
      {
        name: "Quiz Master",
        description: "Complete 10 quizzes with at least 80% accuracy",
        badge: "quiz-master-badge.png",
        pointsAwarded: 500,
        criteria: { quizzesCompleted: 10, minAccuracy: 80 },
        tier: "gold",
        category: "quiz",
      },
      {
        name: "History Buff",
        description: "Complete 5 history quizzes",
        badge: "history-buff-badge.png",
        pointsAwarded: 200,
        criteria: { category: "history", quizzesCompleted: 5 },
        tier: "silver",
        category: "category",
      },
      {
        name: "First Steps",
        description: "Complete your first quiz",
        badge: "first-steps-badge.png",
        pointsAwarded: 50,
        criteria: { quizzesCompleted: 1 },
        tier: "bronze",
        category: "quiz",
      },
      {
        name: "Perfect Score",
        description: "Get 100% on any quiz",
        badge: "perfect-score-badge.png",
        pointsAwarded: 300,
        criteria: { accuracy: 100 },
        tier: "gold",
        category: "quiz",
      },
      {
        name: "Wildlife Expert",
        description: "Complete 3 wildlife quizzes with at least 90% accuracy",
        badge: "wildlife-expert-badge.png",
        pointsAwarded: 250,
        criteria: {
          category: "wildlife",
          quizzesCompleted: 3,
          minAccuracy: 90,
        },
        tier: "silver",
        category: "category",
      },
      {
        name: "Cultural Connoisseur",
        description: "Complete quizzes from at least 5 different categories",
        badge: "cultural-badge.png",
        pointsAwarded: 350,
        criteria: { uniqueCategories: 5 },
        tier: "gold",
        category: "exploration",
      },
      {
        name: "Speed Demon",
        description: "Complete a quiz in less than half the allocated time",
        badge: "speed-badge.png",
        pointsAwarded: 200,
        criteria: { timePercentage: 50 },
        tier: "silver",
        category: "achievement",
      },
      {
        name: "Dedicated Scholar",
        description: "Complete at least one quiz every day for a week",
        badge: "scholar-badge.png",
        pointsAwarded: 400,
        criteria: { dailyStreak: 7 },
        tier: "gold",
        category: "achievement",
      },
    ]);

    console.log(`Created ${achievements.length} achievements`);

    // Create user progress records for the leaderboard
    const userProgressEntries = [];

    // For each user except admin
    for (let i = 1; i < createdUsers.length; i++) {
      // Each user completes 1-3 quizzes randomly
      const numQuizzesToComplete = Math.floor(Math.random() * 3) + 1;

      for (let j = 0; j < numQuizzesToComplete; j++) {
        // Select a random quiz
        const quizIndex = Math.floor(Math.random() * quizzes.length);
        const quiz = quizzes[quizIndex];

        // Calculate random score based on user level (higher levels = higher scores)
        const baseAccuracy = 60 + createdUsers[i].level * 4; // 60-100% accuracy
        const accuracy = Math.min(
          Math.max(baseAccuracy + (Math.random() * 20 - 10), 60),
          100
        );
        const correctCount = Math.floor(5 * (accuracy / 100)); // Assuming 5 questions per quiz
        const score = correctCount * 10; // 10 points per correct answer

        // Create fake answers array
        const answers = [];
        for (let k = 0; k < 5; k++) {
          const isCorrect = k < correctCount; // First correctCount answers are correct
          answers.push({
            questionId: `question_${k}`,
            userAnswer: `answer_${k}`,
            isCorrect,
          });
        }

        // Random time spent
        const timeSpent = Math.floor(
          quiz.timeLimit * (0.5 + Math.random() * 0.5)
        ); // 50-100% of time limit

        userProgressEntries.push({
          userId: createdUsers[i].id,
          quizId: quiz.id,
          score,
          answers,
          completed: true,
          timeSpent,
          completedAt: new Date(
            Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
          ), // Random day in the last month
          accuracy,
        });
      }
    }

    // Bulk create user progress
    await UserProgress.bulkCreate(userProgressEntries);

    console.log(
      `Created ${userProgressEntries.length} user progress records for the leaderboard`
    );

    console.log("\n=== SEEDING COMPLETE ===");
    console.log("User Accounts for Testing:");
    console.log("-------------------------");
    console.log("Admin User:");
    console.log("Email: admin@example.com");
    console.log("Password: admin123");
    console.log("\nRegular Users:");
    console.log("1. Email: sarah@example.com | Password: sarah123 | Level: 8");
    console.log(
      "2. Email: michael@example.com | Password: michael123 | Level: 9"
    );
    console.log("3. Email: amina@example.com | Password: amina123 | Level: 7");
    console.log("4. Email: kwame@example.com | Password: kwame123 | Level: 6");
    console.log("5. Email: user@example.com | Password: user123 | Level: 1");
    console.log("-------------------------");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
