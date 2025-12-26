function tokenize(text) {
  return text.toLowerCase().replace(/[^a-z\s]/g, "").split(/\s+/);
}

function termFrequency(tokens) {
  const tf = {};
  tokens.forEach(word => {
    tf[word] = (tf[word] || 0) + 1;
  });
  return tf;
}

function cosineSimilarity(vec1, vec2) {
  let dotProduct = 0;
  let magnitude1 = 0;
  let magnitude2 = 0;

  for (let key in vec1) {
    if (vec2[key]) {
      dotProduct += vec1[key] * vec2[key];
    }
    magnitude1 += vec1[key] * vec1[key];
  }

  for (let key in vec2) {
    magnitude2 += vec2[key] * vec2[key];
  }

  return dotProduct / (Math.sqrt(magnitude1) * Math.sqrt(magnitude2) || 1);
}

function similarityScore(text1, text2) {
  const tf1 = termFrequency(tokenize(text1));
  const tf2 = termFrequency(tokenize(text2));
  return cosineSimilarity(tf1, tf2);
}

module.exports = similarityScore;
