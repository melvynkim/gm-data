const axios = require('axios');
const fs = require('fs');
const faker = require('faker');

const categories = [
  "Search",
  "Ads",
  "Cloud",
  "Retail",
  "Media",
  "Hardware",
  "Software",
  "Services",
  "Social",
  "Privacy",
  "Open Source",
  "Automotive",
  "Energy",
  "Transportation",
  "Travel",
  "Hospitality",
  "Collaboration",
  "Enterprise"
];

const getRandomCategories = () => {
  const numCategories = Math.floor(Math.random() * 3) + 1;
  const shuffledCategories = faker.helpers.shuffle(categories);
  return shuffledCategories.slice(0, numCategories);
};

const getRandomLogos = async () => {
  const numLogos = Math.floor(Math.random() * 181) + 20;
  const logos = [];
  for (let i = 0; i < numLogos; i++) {
    const company = await axios.get(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${Math.random().toString(36).substring(7)}`);
    const image = `https://logo.clearbit.com/${company.data[0].domain}`;
    const title = faker.company.companyName();
    const subtitle = faker.lorem.words();
    const categories = getRandomCategories();
    logos.push({ image, title, subtitle, categories });
  }
  return logos;
};

const generateLogosFile = async () => {
  const logos = await getRandomLogos();
  fs.writeFile('logos.json', JSON.stringify(logos, null, 2), err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('File has been created');
  });
};

generateLogosFile();
