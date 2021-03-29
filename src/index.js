import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap4-toggle/css/bootstrap4-toggle.min.css'
import React from 'react';
import ReactDOM, { render } from 'react-dom';
import './index.css';


class Switch extends React.Component{
	render(){
		return (
			<div>
				<label class="switch">
					<input type="checkbox"></input>
					<span class="slider round"></span>
				</label>
			</div>
		)
	}
}
  
  // ========================================
  
ReactDOM.render(
	<Switch />,
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
