let games = {}; 
function checkWinner(board) {
	const winPatterns = [
		[0, 1, 2], [3, 4, 5], [6, 7, 8], 
		[0, 3, 6], [1, 4, 7], [2, 5, 8], 
		[0, 4, 8], [2, 4, 6]             
	];

	for (const pattern of winPatterns) {
		const [a, b, c] = pattern;
		if (board[a] && board[a] === board[b] && board[a] === board[c]) {
			return board[a]; 
		}
	}

	return null; 
}

function isBoardFull(board) {
	return board.every((cell) => cell !== null);
}

function displayBoard(board) {
	let display = "";
	for (let i = 0; i < 9; i++) {
		display += board[i] ? board[i] : "⬛";
		display += (i + 1) % 3 === 0 ? "\n" : " ";
	}
	return display.replace(/❌/g, "❌").replace(/⭕/g, "⭕"); 
}

function makeBotMove(board, currentPlayer) {
	for (let i = 0; i < 9; i++) {
		if (board[i] === null) {
			board[i] = currentPlayer === "❌" ? "⭕" : "❌";
			if (checkWinner(board)) {
				return;
			}
			board[i] = null; 
		}
	}

	for (let i = 0; i < 9; i++) {
		if (board[i] === null) {
			board[i] = currentPlayer === "❌" ? "❌" : "⭕";
			if (checkWinner(board)) {
				board[i] = "⭕"; 
				return;
			}
			board[i] = null; 
		}
	}

	const emptyCells = board.reduce((acc, cell, index) => {
		if (cell === null) {
			acc.push(index);
		}
		return acc;
	}, []);

	if (emptyCells.length > 0) {
		const randomIndex = Math.floor(Math.random() * emptyCells.length);
		const botMove = emptyCells[randomIndex];
		board[botMove] = currentPlayer === "❌" ? "⭕" : "❌";
	}
}

function resetGame(playerID) {
	games[playerID] = {
		board: Array(9).fill(null),
		currentPlayer: "❌"
	};
}

module.exports = {
	config: {
		name: "ttt",
		aliases: ["tictactoe"],
		version: "1.0",
		author: "Kshitiz",
		category: "game",
	},
	onStart: async function ({ event, api }) {
		const playerID = event.senderID;


		if (!games[playerID] || isBoardFull(games[playerID].board) || checkWinner(games[playerID].board)) {
			resetGame(playerID);
		}

		const introMessage = "Reply box by number\nYou are '❌' and the bot is '⭕'.";
		api.sendMessage(introMessage, event.threadID, event.messageID);

		const boardMessage = displayBoard(games[playerID].board);
		api.sendMessage(boardMessage, event.threadID, event.messageID);
	},
	onChat: async function ({ event, api, args }) {
		const playerID = event.senderID;


		if (!games[playerID]) {
			api.sendMessage("", event.threadID);
			return;
		}

		const position = parseInt(args[0]);

		if (isBoardFull(games[playerID].board) || checkWinner(games[playerID].board)) {

			resetGame(playerID);
		}

		if (isNaN(position) || position < 1 || position > 9 || games[playerID].board[position - 1] !== null) {
			const errorMessage = "";
			api.sendMessage(errorMessage, event.threadID);
			return;
		}

		games[playerID].board[position - 1] = "❌";

		makeBotMove(games[playerID].board, games[playerID].currentPlayer);

		const updatedBoardMessage = displayBoard(games[playerID].board);
		api.sendMessage(updatedBoardMessage, event.threadID, event.messageID);

		const winner = checkWinner(games[playerID].board);
		if (winner) {
			const winMessage = `${winner} wins!`;
			api.sendMessage(winMessage, event.threadID, event.messageID);
		} else if (isBoardFull(games[playerID].board)) {
			const drawMessage = "It's a draw!";
			api.sendMessage(drawMessage, event.threadID, event.messageID);
		}
	},
};
