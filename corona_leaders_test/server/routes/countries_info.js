const express = require("express");
const router = express.Router();
require("chromedriver")
const webdriver = require("selenium-webdriver"),
  By = webdriver.By,
  until = webdriver.until;
const driver = new webdriver.Builder().forBrowser("chrome").build();

const fetchData = async () => {
  await driver.get("https://www.worldometers.info/coronavirus/").then(function(){
    let countries = driver.findElement(By.className("mt_a"));
      for (const country of countries) {
        console.log(country.text);
      }
  })
  // let countries = w_driver.findElement(By.className("mt_a"));
  // for (const country of countries) {
  //   console.log(country.text);
  // }
};

router.get("/", (req, res, next) => {
  fetchData();
  res.json("Zup from server");
});

module.exports = router;
