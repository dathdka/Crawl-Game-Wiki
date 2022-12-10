const scrapData = require("./scrapData");
const info = require("./info");
const crafting = require("./crafting");
const canCrafting = require("./canCrafting");
const getAllItem = require('./getAllItem');
const getItemById = require('./getItemById')
exports.controllers = {
  scrapData,
  crafting,
  canCrafting,
  info,
  getAllItem,
  getItemById
};
