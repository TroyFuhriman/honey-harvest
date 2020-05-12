import GameService from "../Services/GameService.js";

let _gameService = new GameService()
_gameService.loadState()
function _draw() {
  document.getElementById("honey").innerHTML = _gameService.StateHoney
  document.getElementById("scraper").innerHTML = _gameService.scraper
  document.getElementById("hive").innerHTML = _gameService.hive
  document.getElementById("beekeeper").innerHTML = _gameService.beekeeper
  document.getElementById("robots").innerHTML = _gameService.robots
  _gameService.saveState()
  _gameService.disable()
}
export default class GameController {
  constructor() {
    _draw()
    setInterval(function () {
      _gameService.autoharvest()
      _draw()
    }, 3000)

  }
  harvest() {
    _gameService.harvest()
    _draw()
  }
  reset() {
    _gameService.reset()
    _draw()
  }
  addTool(toolName) {
    _gameService.addTool(toolName)
    _draw()
  }
}
