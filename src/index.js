import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//當component只有render方法時 可寫成function Component
function Square(props){
	if (props.lights){
		if (props.lights.includes(props.no)){
			return (
				<button className="square highlight" onClick={props.onClick}>
					{props.value}
				</button>
			);
		}
	}

	return (
		<button className="square" onClick={props.onClick}>
			{props.value}
		</button>
	);
}
  
class Board extends React.Component {
	renderSquare(i) {
		return (
			<Square 
				value={this.props.squares[i]} 
				onClick={() => this.props.onClick(i)}
				no = {i}
				lights = {this.props.lights}
			/>
		); //把叫做value的props傳給squre
	}	

	render() {
		const long = Math.sqrt(9);
		let square = [];
		for (let i=0;i<long;i++){
			let row = []
			for (let j=0;j<long;j++){
				row.push(this.renderSquare(i*3+j));
			}
			square.push(<div key={i} className="board-row">{row}</div>)
		}
		return (<div>{square}</div>);
	}
}
  
class Game extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			history : [
				{
					squares : Array(9).fill(null),
					position : null,
				}
			],
			stepNumber : 0,
			xIsNext : true,
			asc_order : true,
			lights : null,
		};
	}

	jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

	changeOrder(){
		this.setState({
			asc_order : !this.state.asc_order,
		});
	}

	handleClick(i){
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();

		if (calculateWinner(squares).winner || squares[i]){
			this.setState({
				lights:calculateWinner(squares).lights
			})
			return;
		}
		squares[i] = this.state.xIsNext ? 'X' : 'O';
		this.setState({
			history : history.concat([
				{
					squares : squares,
					position : i
				}
			]),
			stepNumber : history.length,
			xIsNext : !this.state.xIsNext,
		})
	}

	render() {
		let history = this.state.history.slice(); //這邊必須用slice複製一份，之後更改才不會動到原本的value
		const current = history[this.state.stepNumber];
		const winner = calculateWinner(current.squares).winner;
		const lights = calculateWinner(current.squares).lights;

		if (!this.state.asc_order){
			history.reverse();
		}

		const moves = history.map((step, move) => {
			if (!this.state.asc_order){
				move = this.state.stepNumber - move;
			}
			const row = Math.floor(step.position / 3);
			const col = step.position % 3;
      const desc = move ?
        'Go to move #' + move + ' position:' + 'row:' + row + 'col:' + col :
        'Go to game start';
			if (move === this.state.stepNumber){
				return (
        <li key={move}>
          <button className="current" onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      	);
			}else{
				return (
					<li key={move}>
						<button onClick={() => this.jumpTo(move)}>{desc}</button>
					</li>
					);
			}
    });

		let status;
		if (winner) {
			status = 'Winner: ' + winner;
		}
		else if(!current.squares.includes(null)){
			status = 'there is no winner!';
		}
		else {
			status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
		}
		return (
			<div className="game">
				<div className="game-board">
					<Board 
						squares = {current.squares}
						onClick = { i => this.handleClick(i)}
						lights  = {lights}
					/>
				</div>
				<div className="game-info">
					<div>{status}</div>
					<ol>{moves}</ol>
				</div>
				<div>
					<button onClick={()=>this.changeOrder()}>Change the order</button>
				</div>
			</div>
		);
	}
}
  
  // ========================================
  
ReactDOM.render(
	<Game />,
	document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {winner : squares[a],
							lights   : lines[i],
						 };
    }
  }
  return {
		winner : null,
		lights : null,
	};
}
