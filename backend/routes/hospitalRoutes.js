const router = require("express").Router();
const Hospital = require("../models/Hospital");

router.get("/", async (req, res) => {
  try {
    const hospitals = await Hospital.find();

    console.log("Hospitals found:", hospitals);

    res.json(hospitals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;