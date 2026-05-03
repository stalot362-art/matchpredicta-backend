const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.post('/predict', (req, res) => {
  const { a_draw, b_draw, a_form, b_form, a_goals, b_goals, fatigue } = req.body;

  let drawScore = 0, winAScore = 0, winBScore = 0;

  // Rennes Model draw logic
  if (a_draw >= 15 && b_draw >= 15) drawScore += 3;
  if (Math.abs(a_draw - b_draw) < 5) drawScore += 2;
  if (a_form === b_form) drawScore += 1;
  if (Math.abs(a_goals - b_goals) < 3) drawScore += 2;
  if (fatigue === "yes") drawScore += 1;

  // Win logic
  if (a_goals > b_goals) winAScore += 2;
  if (b_goals > a_goals) winBScore += 2;

  if (a_form === "good" && b_form !== "good") winAScore += 2;
  if (b_form === "good" && a_form !== "good") winBScore += 2;

  let max = Math.max(drawScore, winAScore, winBScore);

  let prediction = "";
  if (max === drawScore) prediction = "Draw";
  else if (max === winAScore) prediction = "Team A Win";
  else prediction = "Team B Win";

  let total = drawScore + winAScore + winBScore;
  let confidence = Math.round((max / total) * 100);

  res.json({ prediction, confidence });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});
