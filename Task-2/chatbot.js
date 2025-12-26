const faqs = require("./faqdata");
const similarityScore = require("./similarity");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getBestAnswer(userQuestion) {
  let bestScore = 0;
  let bestAnswer = "Sorry, I couldn't find an answer.";

  faqs.forEach(faq => {
    const score = similarityScore(userQuestion, faq.question);
    if (score > bestScore) {
      bestScore = score;
      bestAnswer = faq.answer;
    }
  });

  return bestAnswer;
}

console.log("FAQ Chatbot (type 'exit' to quit)");

rl.on("line", (input) => {
  if (input.toLowerCase() === "exit") {
    rl.close();
  } else {
    console.log("Bot:", getBestAnswer(input));
  }
});
