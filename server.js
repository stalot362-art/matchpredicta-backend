const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/predict", (req, res) => {
  const { a_draw, b_draw, a_form, b_form, a_goals, b_goals, fatigue_a, fatigue_b } = req.body;

  let winAScore = 0;
  let winBScore = 0;
  let drawScore = 0;

  // Draw logic
  if (a_draw > 30 && b_draw > 30) {
    drawScore += 2;
  }

  // Form
  if (a_form === "good") winAScore += 1;
  if (b_form === "good") winBScore += 1;

  // Goals
  if (a_goals > b_goals) winAScore += 1;
  if (b_goals > a_goals) winBScore += 1;

  // Fatigue
  if (fatigue_a !== "none") winAScore -= 0.5;
  if (fatigue_b !== "none") winBScore -= 0.5;

  let result = "Draw";
  let confidence = 50;

  if (winAScore > winBScore && winAScore > drawScore) {
    result = "Team A Wins";
    confidence = 70;
  } else if (win
