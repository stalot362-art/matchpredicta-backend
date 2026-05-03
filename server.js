const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/predict", (req, res) => {
  const { parity, scoring, form } = req.body;

  // Step 1: Parity check
  if (parity === "no") {
    return res.json({
      result: "Unpredictable",
      confidence: 40
    });
  }

  // GOOD scoring
  if (scoring === "good") {
    return res.json({
      result: "Team A Wins",
      confidence: 75
    });
  }

  // MEDIUM scoring
  if (scoring === "medium") {
    if (form === "good") {
      return res.json({
        result: "Draw",
        confidence: 60
      });
    }

    if (form === "bad") {
      return res.json({
        result: "Team A Wins",
        confidence: 65
      });
    }

    return res.json({
      result: "Draw",
      confidence: 55
    });
  }

  // BAD scoring
  if (scoring === "bad") {
    if (form === "good") {
      return res.json({
        result: "Team A Loses",
        confidence: 70
      });
    }

    return res.json({
      result: "Draw",
      confidence: 60
    });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
