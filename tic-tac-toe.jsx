//A square of the tic tac toe board
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

//the play button 
function PlayButton(props) {
  return (
    <button className="play" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

//the actual board
class Board extends React.Component {
  constructor(props) {    
    super(props);    
    this.state = {      
      squares: Array(9).fill(null),
      xIsNext: true,
      totalTurns: 0,
    };  
  }
  
  //when a square is clicked
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {      
      return;   
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      totalTurns: this.state.totalTurns + 1,
      });
  }

  //when the play button is clicked
  handleReset() {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true, 
      totalTurns: 0,
    })
  }

  //to display a square
  renderSquare(i) {
    return (
      <Square 
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }
  
  //to display the play button
  renderPlayButton() {
    return (
      <PlayButton
        value = {"New Game"}
        onClick={() => this.handleReset()}
      />
    );
  }

  //to display the entire board
  render() {
    const winner = calculateWinner(this.state.squares);    
    let status;    
    if (winner) {      
      status = 'Winner: ' + winner;    
    } 
    else if (this.state.totalTurns === this.state.squares.length) {
      status = 'Draw';
    }
    else {      
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');    
    }

    return (
      <div>
        <div className="status">{status}</div>
        {this.renderPlayButton()}
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

//to display the entire game
class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{"Your classic tic-tac-toe"}</div>
          <ol>{"Easy to play"}</ol>
        </div>
      </div>
    );
  }
}

//check for a winner: either x, o or null if there is no winner
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
      return squares[a];
    }
  }
  return null;
}
// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
