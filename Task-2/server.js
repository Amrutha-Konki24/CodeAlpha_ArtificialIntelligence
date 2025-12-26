const http = require("http");
const fs = require("fs");
const faqs = require("./faqdata");
const similarityScore = require("./similarity");

function getBestAnswer(question) {
  let bestScore = 0;
  let bestAnswer = "Sorry, I couldn't find an answer.";

  faqs.forEach(faq => {
    const score = similarityScore(question, faq.question);
    if (score > bestScore) {
      bestScore = score;
      bestAnswer = faq.answer;
    }
  });

  return bestAnswer;
}

http.createServer((req, res) => {
  if (req.method === "GET") {
    fs.readFile("index.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  }

  if (req.method === "POST") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      const userQuestion = JSON.parse(body).question;
      const answer = getBestAnswer(userQuestion);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ answer }));
    });
  }
}).listen(3000);

console.log("Server running at http://localhost:3000");
