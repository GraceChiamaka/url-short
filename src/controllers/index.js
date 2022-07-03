// const express = require("express");
const ShortUrl = require("../models/shortUrl");
const validUrl = require("valid-url");
const shortId = require("shortid");
const config = require("config");

const createUrl = async (req, res) => {
  try {
    const { fullUrl } = req.body;
    const shortCode = shortId.generate();

    const baseUrl = config.get("baseUrl");

    // check if base url exists
    if (!validUrl.isUri(baseUrl)) {
      return res.status(401).json({ message: "Invalid base url" });
    }

    // check if url is valid
    if (validUrl.isUri(fullUrl)) {
      const shortUrl = baseUrl + "/" + shortCode;
      const findUrl = await ShortUrl.findOne({ fullUrl });
      if (findUrl) {
        return res.status(400).json({ message: "Url already exist" });
      } else {
        const newUrl = new ShortUrl({
          fullUrl: fullUrl,
          shortUrl: shortUrl,
          urlCode: shortCode,
          date: new Date(),
        });
        const result = await newUrl.save();
        console.log(result, "req response");

        return res.json({ status: 201, data: newUrl });
      }
    } else {
      return res.status(401).json({ message: "Invalid full url" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const getUrls = async (req, res) => {
  try {
    const shortUrls = await ShortUrl.find();
    return res.json({ status: 200, data: shortUrls });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const getUrl = async (req, res) => {
  const response = await ShortUrl.findOne({ shortUrl: req.params.shorUrl });

  if (response === null) {
    return res.json({ error: { status: 500, message: "URL not found" } });
  }
  response.clicks++;
  response.save();
  res.redirect(response.fullUrl);
};

module.exports = {
  createUrl,
  getUrls,
  getUrl,
};
