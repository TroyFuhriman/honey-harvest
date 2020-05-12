import State from "../Models/Target.js";
let _state = new State({ honey: 0, clickmod: 0, automod: 0, tools: { scraper: { price: 10, mod: 1, quantity: 0, auto: false }, hive: { price: 20, mod: 5, quantity: 0, auto: false }, beekeeper: { price: 100, mod: 20, quantity: 0, auto: true }, robots: { price: 200, mod: 100, quantity: 0, auto: true } }, upgrade: 0 })
export default class GameService {
  addTool(toolName) {
    _state.tools[toolName].quantity++;
    _state.honey -= _state.tools[toolName].price
    _state.tools[toolName].price += Math.floor(Math.random() * _state.tools[toolName].price)
    if (_state.tools[toolName].auto == false) {
      _state.clickmod += _state.tools[toolName].mod
    }
    else { _state.automod += _state.tools[toolName].mod }
  }

  harvest() {
    _state.honey += _state.clickmod + 1
  }
  autoharvest() {
    if (_state.automod > 0) { _state.honey += _state.automod }
  }
  disable() {
    if (_state.tools.scraper.price <= _state.honey) { document.getElementById("scraper-1").classList.remove("disable") }
    if (_state.tools.hive.price <= _state.honey) { document.getElementById("hive-1").classList.remove("disable") }
    if (_state.tools.beekeeper.price <= _state.honey) { document.getElementById("beekeeper-1").classList.remove("disable") }
    if (_state.tools.robots.price <= _state.honey) { document.getElementById("robots-1").classList.remove("disable") }
    if (_state.tools.scraper.price >= _state.honey) { document.getElementById("scraper-1").classList.add("disable") }
    if (_state.tools.hive.price >= _state.honey) { document.getElementById("hive-1").classList.add("disable") }
    if (_state.tools.beekeeper.price >= _state.honey) { document.getElementById("beekeeper-1").classList.add("disable") }
    if (_state.tools.robots.price >= _state.honey) { document.getElementById("robots-1").classList.add("disable") }
  }
  reset() {
    _state.honey = 0;
    _state.automod = 0
    _state.clickmod = 0
    _state.tools.scraper.quantity = 0
    _state.tools.hive.quantity = 0
    _state.tools.beekeeper.quantity = 0
    _state.tools.robots.quantity = 0
  }
  get StateHoney() {
    return _state.honey
  }
  get scraper() {
    return _state.tools.scraper.price
  }
  get hive() {
    return _state.tools.hive.price
  }
  get beekeeper() {
    return _state.tools.beekeeper.price
  }
  get robots() {
    return _state.tools.robots.price
  }
  saveState() {
    window.localStorage.setItem("state", JSON.stringify(_state))
  }
  loadState() {
    let stateData = JSON.parse(window.localStorage.getItem("state"))
    if (stateData) {
      _state = stateData
    }
  }

  constructor() {

  }
}