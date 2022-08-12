
Array.prototype.lastElement = function() {
    return this[this.length - 1]
}

class DataStorage {
    teams = []
    games = []
    name = 'DataStorage'
    gameStartsDisplay = {
        message: document.getElementById('msg-box')
    }
    teamWinsDisplay = {
        teamOne: document.getElementById('game-win-t0'),
        teamTwo: document.getElementById('game-win-t1')
    }
    generalTeamScoreDisplay = {
        teamOne: document.getElementById('general-score-t0'),
        teamTwo: document.getElementById('general-score-t1'),
    }
    roundInfoDisplay = {
        roundInfo: document.getElementById('round-info')
    }
    gameScoreDisplay = {
        teamOne: document.getElementById('game-score-0'),
        teamTwo: document.getElementById('game-score-1'),
    }

    constructor() {
    }
    addTeam(team) {
        this.teams.push(team)
    }
    getTeam(teamId) {
        return this.teams[teamId]
    }
    getTeams() {
        return this.teams
    }
    addGame(game) {
        this.games.push(game)
    }
    getGame(gameId) {
        return this.games[gameId]
    }
    getGames() {
        return this.games
    }
    calcGeneralTeamScore() {
        let generalPoints = 0
        for(let i = 0; i< this.games.length; i++) {
            generalPoints += this.getGames(i)
        }
        return generalPoints
    }
    getCurrentGame() {
        return this.games.lastElement()
    }

}

let points = {
    teamOnePoints: document.getElementById('0tp'),
    teamTwoPoints: document.getElementById('1tp')
}
let combinations = {
    bella: document.getElementById('value_bella'),
    triple: document.getElementById('value_triple'),
    four: document.getElementById('value_four'),
    five: document.getElementById('value_five'),
    seven: document.getElementById('value_seven'),
}

class Game {
    teamOne
    teamTwo
    teamOneScore
    teamTwoScore
    halfBaitPoints = 0
    teamOneBaits = []
    teamTwoBaits = []
    teamOneBaitCount = 0
    teamTwoBaitCount = 0
    rounds = []
    roundCount = 0
    constructor(teamOne, teamTwo) {
        this.teamOne = teamOne
        this.teamTwo = teamTwo
        dataStorage.addGame(this)
        dataStorage.getTeam(0).addGame(this)
    }
    addRound(round) {
        this.rounds.push(round)
        this.roundCount++
    }
    calcTeamOneGameScore() {
        let score = 0
        for(let i = 0; i < this.rounds.length; i++) {
            score += this.rounds[i].teamOnePoints
        }
        console.log('lst, t0: ' + score)
        this.teamOneScore = score
    }
    calcTeamTwoGameScore() {
        let score = 0
        for(let i = 0; i < this.rounds.length; i++) {
            score += this.rounds[i].teamTwoPoints
        }
        console.log('lst, t1: ' + score)
        this.teamTwoScore = score
    }
    getTeamOnePoints() {
        return this.teamOneScore
    }
    getTeamTwoPoints() {
        return this.teamTwoScore
    }
    getRoundCount() {
        return this.roundCount
    }
    getLastRound() {
        return this.rounds.lastElement()
    }
    addBaitTeamOne() {
        this.teamOneBaits.push('bait')
        this.teamOneBaitCount ++
    }
    addBaitTeamTwo() {
        this.teamTwoBaits.push('bait')
        this.teamTwoBaitCount ++
    }
    getAmountBaitsOfTeamOne() {
        return this.teamOneBaits.length
    }
    getAmountBaitsOfTeamTwo() {
        return this.teamTwoBaits.length
    }
    getAmountBaitsOfTeam(teamId) {
        if(teamId == 0) {
            return this.getAmountBaitsOfTeamOne()
        } else {
            return this.getAmountBaitsOfTeamTwo()
        }
    }
    resetCounter(teamId) {
        if(teamId == 0) {
            this.teamOneBaitCount = 0
        } else {
            this.teamTwoBaitCount = 0
        }
    }
    getBaitCount(teamId) {
        if(teamId == 0) {
            return this.teamOneBaitCount
        } else {
            return this.teamTwoBaitCount
        }
    }

    getHalfBaitPoints() {
        return this.halfBaitPoints
    }
    setHalfBaitPoints(points) {
        this.halfBaitPoints = points
    }
    resetHalfBaitPoints() {
        this.halfBaitPoints = 0
    }
}

class Team {
    teamGameScore = 0
    wins = 0
    name
    baits = []
    zeros = []
    bellas = []
    triplets = []
    fours = []
    sevens = []
    roundScores = []
    id
    games = []

    constructor(name, id) {
        this.name = name
        this.id = id
        dataStorage.addTeam(this)
    }
    recordGameTeamScore(points) {
        this.teamGameScore += points
    }
    addRoundScore(points) {
        this.roundScores.push(points)
    }
    addGame(game) {
        this.games.push(game)
    }
    setWin() {
        this.wins++
    }
}

class Round {
    game
    roundPoints
    defRoundPoints = 162
    bellaPoints = 20
    triplPoints = 20
    fourPoints = 50
    fivePoints = 70
    sevensPoints = 1005
    teamOnePoints
    teamTwoPoints
    teamOneForRenderValue
    teamTwoForRenderValue
    teamConsoleInfo = {
        teamOneC: 'message',
        teamTwoC: 'message'
    }
    constructor() {
        this.game = dataStorage.getGame(dataStorage.games.length-1)
        this.game.addRound(this)
        this.calcRoundPoints()
        // this.calcTeamsPoints()
    }
    calcRoundPoints() {
        this.roundPoints = this.defRoundPoints + this.bellaPoints * +combinations.bella.value + this.triplPoints * +combinations.triple.value +
            this.fourPoints * +combinations.four.value + this.fivePoints * +combinations.five.value +
            this.sevensPoints * +combinations.seven.value
    }

    defineRoundWinner() {
        console.log('Round after balls')
        if(this.teamOnePoints > this.teamTwoPoints) {
            this.teamOnePoints += dataStorage.getCurrentGame().getHalfBaitPoints()
            this.teamOneForRenderValue += dataStorage.getCurrentGame().getHalfBaitPoints()
            dataStorage.getCurrentGame().resetHalfBaitPoints()
        } else {
            this.teamTwoPoints += dataStorage.getCurrentGame().getHalfBaitPoints()
            this.teamTwoForRenderValue += dataStorage.getCurrentGame().getHalfBaitPoints()
            dataStorage.getCurrentGame().resetHalfBaitPoints()
        }
    }

    calcTeamsPoints() {
        if(+points.teamOnePoints.value > 0) {
            this.teamOnePoints = +points.teamOnePoints.value
            this.teamTwoPoints = this.roundPoints - this.teamOnePoints
            this.teamOneForRenderValue = +points.teamOnePoints.value
            this.teamTwoForRenderValue = this.roundPoints - this.teamOnePoints
        } else {
            this.teamTwoPoints = +points.teamTwoPoints.value
            this.teamOnePoints = this.roundPoints - this.teamTwoPoints
            this.teamTwoForRenderValue = +points.teamTwoPoints.value
            this.teamOneForRenderValue = this.roundPoints - this.teamTwoPoints
        }
        this.defineRoundWinner()

    }
    calcBaitPoints(baitedTeam) {

        if(baitedTeam == 0) {
            dataStorage.getCurrentGame().addBaitTeamOne()
            let baitResult = baitedTeamPoints(baitedTeam)
            this.teamTwoPoints = this.roundPoints + dataStorage.getCurrentGame().getHalfBaitPoints()
            this.teamTwoForRenderValue = this.roundPoints + dataStorage.getCurrentGame().getHalfBaitPoints()
            this.teamOnePoints = baitResult.teamPoints
            this.teamOneForRenderValue = baitResult.teamValue

        } else {
            dataStorage.getCurrentGame().addBaitTeamTwo()
            let baitResult = baitedTeamPoints(baitedTeam)
            this.teamOnePoints = this.roundPoints + dataStorage.getCurrentGame().getHalfBaitPoints()
            this.teamOneForRenderValue = this.roundPoints + dataStorage.getCurrentGame().getHalfBaitPoints()
            this.teamTwoPoints = baitResult.teamPoints
            this.teamTwoForRenderValue = baitResult.teamValue
        }
        dataStorage.getCurrentGame().resetHalfBaitPoints()
    }
    calcZeroPoints(zeroedTeamId) {
        if(zeroedTeamId == 0) {
            this.teamTwoPoints = this.roundPoints + dataStorage.getCurrentGame().getHalfBaitPoints()
            this.teamTwoForRenderValue = this.roundPoints + dataStorage.getCurrentGame().getHalfBaitPoints()
            this.teamOnePoints = -100
            this.teamOneForRenderValue = 'L -100'
        } else {
            this.teamOnePoints = this.roundPoints + dataStorage.getCurrentGame().getHalfBaitPoints()
            this.teamOneForRenderValue = this.roundPoints + dataStorage.getCurrentGame().getHalfBaitPoints()
            this.teamTwoPoints = -100
            this.teamTwoForRenderValue = 'L -100'
        }
        dataStorage.getCurrentGame().resetHalfBaitPoints()
    }
    calcHalfBaitPoints(halfBaitTeamId) {
        if(halfBaitTeamId == 0) {
            this.teamTwoPoints = this.roundPoints/2
            this.teamTwoForRenderValue = this.roundPoints/2
            this.teamOnePoints = 0
            this.teamOneForRenderValue = 'Balls 0'
        } else {
            this.teamOnePoints = this.roundPoints/2
            this.teamOneForRenderValue = this.roundPoints/2
            this.teamTwoPoints = 0
            this.teamTwoForRenderValue = 'Balls 0'
        }
        dataStorage.getCurrentGame().setHalfBaitPoints(this.roundPoints/2)
    }
}

class Bait {

}
class Zero {

}
class Bella {

}
class Terz {

}
class FourCards {

}
class FiveCards {

}
class Deberz {

}

var dataStorage = new DataStorage()
const leftTeam = new Team('Left', 0)
const rightTeam = new Team('right', 1)
endGame()



function playGame() {
    clearGameResult()
    clearRoundResults()
    const game = new Game(leftTeam, rightTeam)
    let btns = document.getElementsByTagName('button')
    for (let btn of btns) {
        btn.disabled = false
    }
    dataStorage.gameStartsDisplay.message.style.display = 'none'
    renderTeamWins()
    dataStorage.roundInfoDisplay.roundInfo.innerHTML = 'Round ' + 1

}

function endGame() {
    let btns = document.getElementsByTagName('button')
    for (let btn of btns) {
        btn.disabled = true
    }
    dataStorage.gameStartsDisplay.message.style.display = 'flex'
}

function playRound() {
    if(!isValidRound()) return
    const round = new Round()
    round.calcTeamsPoints()
    dataStorage.getCurrentGame().teamOne.addRoundScore(round.teamOnePoints)
    dataStorage.getCurrentGame().teamTwo.addRoundScore(round.teamTwoPoints)
    dataStorage.getCurrentGame().teamOne.recordGameTeamScore(round.teamOnePoints)
    dataStorage.getCurrentGame().teamTwo.recordGameTeamScore(round.teamTwoPoints)
    dataStorage.getCurrentGame().calcTeamOneGameScore()
    dataStorage.getCurrentGame().calcTeamTwoGameScore()
    renderGameResult(dataStorage.getCurrentGame().getTeamOnePoints(), dataStorage.getCurrentGame().getTeamTwoPoints())
    renderRoundResult()
    renderGeneralTeamScore()
    renderRoundInfo()
    isGameOver()
    clearForm()
}

function playBaitRound(baitedTeamId, winTeam) {

    const round = new Round()
    round.calcBaitPoints(baitedTeamId)

    dataStorage.getCurrentGame().teamOne.addRoundScore(round.teamOnePoints)
    dataStorage.getCurrentGame().teamTwo.addRoundScore(round.teamTwoPoints)
    dataStorage.getCurrentGame().teamOne.recordGameTeamScore(round.teamOnePoints)
    dataStorage.getCurrentGame().teamTwo.recordGameTeamScore(round.teamTwoPoints)
    dataStorage.getCurrentGame().calcTeamOneGameScore()
    dataStorage.getCurrentGame().calcTeamTwoGameScore()
    renderGameResult(dataStorage.getCurrentGame().getTeamOnePoints(), dataStorage.getCurrentGame().getTeamTwoPoints())
    renderRoundResult()
    renderGeneralTeamScore()
    renderRoundInfo()
    isGameOver()
    clearForm()
}

function playZeroRound(zeroTeamId) {
    const round = new Round()
    round.calcZeroPoints(zeroTeamId)

    dataStorage.getCurrentGame().teamOne.addRoundScore(round.teamOnePoints)
    dataStorage.getCurrentGame().teamTwo.addRoundScore(round.teamTwoPoints)
    dataStorage.getCurrentGame().teamOne.recordGameTeamScore(round.teamOnePoints)
    dataStorage.getCurrentGame().teamTwo.recordGameTeamScore(round.teamTwoPoints)
    dataStorage.getCurrentGame().calcTeamOneGameScore()
    dataStorage.getCurrentGame().calcTeamTwoGameScore()
    renderGameResult(dataStorage.getCurrentGame().getTeamOnePoints(), dataStorage.getCurrentGame().getTeamTwoPoints())
    renderRoundResult()
    renderGeneralTeamScore()
    renderRoundInfo()
    isGameOver()
    clearForm()
}

function playHalfBaitRound(halfBaitTeamId) {
    const round = new Round()
    round.calcHalfBaitPoints(halfBaitTeamId)

    dataStorage

    dataStorage.getCurrentGame().teamOne.addRoundScore(round.teamOnePoints)
    dataStorage.getCurrentGame().teamTwo.addRoundScore(round.teamTwoPoints)
    dataStorage.getCurrentGame().teamOne.recordGameTeamScore(round.teamOnePoints)
    dataStorage.getCurrentGame().teamTwo.recordGameTeamScore(round.teamTwoPoints)
    dataStorage.getCurrentGame().calcTeamOneGameScore()
    dataStorage.getCurrentGame().calcTeamTwoGameScore()
    renderGameResult(dataStorage.getCurrentGame().getTeamOnePoints(), dataStorage.getCurrentGame().getTeamTwoPoints())
    renderRoundResult()
    renderGeneralTeamScore()
    renderRoundInfo()
    isGameOver()
    clearForm()
}

function baitedTeamPoints(baitedTeamId) {
    if(Number.isInteger(dataStorage.getCurrentGame().getAmountBaitsOfTeam(baitedTeamId) / 3)) {
        dataStorage.getCurrentGame().resetCounter(baitedTeamId)
        return {teamPoints: -100, teamValue: 'B'+ 3 + ' -100'}
    } else {
        return {teamPoints: 0, teamValue: 'B'+ dataStorage.getCurrentGame().getBaitCount(baitedTeamId)}
    }
}

// function zeroTeamPoints(zeroTeamId) {
//     return {teamPoints: -100, teamValue: 'L -100'}
// }

function renderTeamWins() {
    dataStorage.teamWinsDisplay.teamOne.innerHTML = dataStorage.getTeam(0).wins
    dataStorage.teamWinsDisplay.teamTwo.innerHTML = dataStorage.getTeam(1).wins
}

function renderGeneralTeamScore() {
    dataStorage.generalTeamScoreDisplay.teamOne.innerHTML = dataStorage.getTeam(0).teamGameScore
    dataStorage.generalTeamScoreDisplay.teamTwo.innerHTML = dataStorage.getTeam(1).teamGameScore
}

function renderTeamGameResult() {

}

function renderGameResult(valueOne, valueTwo) {
    dataStorage.gameScoreDisplay.teamOne.innerHTML = valueOne
    dataStorage.gameScoreDisplay.teamTwo.innerHTML = valueTwo
}

function renderRoundResult() {
    let targetOneTeam = document.getElementById('t0-rounds')
    let targetTwoTeam = document.getElementById('t1-rounds')
    let teamOneResultDisplay = document.createElement('div')
    let teamTwoResultDisplay = document.createElement('div')
    teamOneResultDisplay.classList.add('round_cell_info')
    teamTwoResultDisplay.classList.add('round_cell_info')
    teamOneResultDisplay.innerHTML = dataStorage.getCurrentGame().getLastRound().teamOneForRenderValue
    teamTwoResultDisplay.innerHTML = dataStorage.getCurrentGame().getLastRound().teamTwoForRenderValue
    targetOneTeam.appendChild(teamOneResultDisplay)
    targetTwoTeam.appendChild(teamTwoResultDisplay)
}

function clearRoundResults() {
    let target = document.getElementById('t0-rounds')
    document.querySelectorAll(".round_cell_info").forEach(el => el.remove());
}

function clearGameResult() {
    dataStorage.gameScoreDisplay.teamOne.innerHTML = '0'
    dataStorage.gameScoreDisplay.teamTwo.innerHTML = '0'
}

function clearForm() {
    combinations.bella.selectedIndex = null
    combinations.triple.selectedIndex = null
    combinations.four.selectedIndex = null
    combinations.five.selectedIndex = null
    combinations.seven.selectedIndex = null

    points.teamOnePoints.value = null
    points.teamTwoPoints.value = null
}

function isValidRound() {
    if(+points.teamOnePoints.value + +points.teamTwoPoints.value == 0) {
        alert('Enter points')
        return false
    }
    return true
}

function isGameOver() {
    let teamOneGameScore = dataStorage.getCurrentGame().getTeamOnePoints()
    let teamTwoGameScore = dataStorage.getCurrentGame().getTeamTwoPoints()

    if(teamOneGameScore > 1005 && teamOneGameScore > teamTwoGameScore) {
        console.log('Win oneTeam')
        dataStorage.getTeam(0).setWin()
        endGame()
        // return true
    } else if (teamTwoGameScore > 1005 && teamTwoGameScore > teamOneGameScore) {
        console.log('Win twoTeam')
        dataStorage.getTeam(1).setWin()
        endGame()
        // return true
    }
}

function renderRoundInfo() {
    dataStorage.roundInfoDisplay.roundInfo.innerHTML = 'Round ' + dataStorage.getCurrentGame().getRoundCount()
}