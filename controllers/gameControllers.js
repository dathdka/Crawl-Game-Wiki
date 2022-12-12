const scrapData = require("./scrapData");
const info = require("./info");
const crafting = require("./crafting");
const canCrafting = require("./canCrafting");
const getAllItem = require('./getAllItem');
const getItemById = require('./getItemByID')
const getItemByName = require('./getItemByName')
exports.controllers = {
  scrapData,
  crafting,
  canCrafting,
  info,
  getAllItem,
  getItemById,
  getItemByName
};
