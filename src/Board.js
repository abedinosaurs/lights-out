import React, { Component } from "react";
import Cell from "./Cell";
import "./Board.css";

class Board extends Component {
	static defaultProps = {
		nrows: 5,
		ncols: 5,
		chanceLightStartsOn: 0.25,
	};

	constructor(props) {
		super(props);
		this.state = {
			hasWon: false,
			board: this.createBoard(),
		};
	}

	createBoard() {
		let board = [];
		//Creates the play board with a table made with the state number of rows and columns
		for (let y = 0; y < this.props.nrows; y++) {
			let row = [];

			for (let x = 0; x < this.props.ncols; x++) {
				//sets random tiles to start lit (0.25 seems to work best)
				row.push(Math.random() < this.props.chanceLightStartsOn);
			}
			board.push(row);
		}
		return board;
	}

	//This checks the tiles around and the tile you click

	flipCellsAround(coord) {
		let { ncols, nrows } = this.props;
		let board = this.state.board;
		let [y, x] = coord.split("-").map(Number);

		function flipCell(y, x) {
			//will flip the tiles that exist
			if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
				board[y][x] = !board[y][x];
			}
		}
		flipCell(y, x);
		flipCell(y, x - 1);
		flipCell(y, x + 1);
		flipCell(y - 1, x);
		flipCell(y + 1, x);

		//check if all of the tiles are unlit if so you win
		let hasWon = board.every((row) => row.every((cell) => !cell));
		this.setState({ board: board, hasWon: hasWon });
	}

	//render based on if you have won or not.

	render() {
		if (this.state.hasWon) {
			return <h1>YOU WIN!</h1>;
		}
		let tblBoard = [];
		for (let y = 0; y < this.props.nrows; y++) {
			let row = [];
			for (let x = 0; x < this.props.ncols; x++) {
				let coord = `${y}-${x}`;
				row.push(
					<Cell
						key={coord}
						isLit={this.state.board[y][x]}
						flipCellsAroundMe={() => this.flipCellsAround(coord)}
					/>
				);
			}
			console.log({ row });
			tblBoard.push(<tr key={[y]}>{row}</tr>);
		}
		return (
			<div>
				<div className="neon-orange">Lights</div>
				<div className="neon-blue">out</div>
				<table className="Board">
					<tbody>{tblBoard}</tbody>
				</table>
			</div>
		);
	}
}

export default Board;
