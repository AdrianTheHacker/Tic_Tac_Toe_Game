import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


class Square extends React.Component {
    render() {
        return (
            <button 
                className="square"
                onClick={() => this.props.onClick()}
            >
                {this.props.value}
            </button>
        );
    }
}
  
class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        squares: Array(9).fill(null),
        turn: true, // true = X's turn
                    // false = Y's turn
      };
    }

    findWinner(squares) {
      const winCondition = [
        [0, 4, 8],    // top left to bottom right
        [3, 5, 7],    // top right to bottom left
        [0, 3, 6],    // top left to bottom left
        [1, 4, 7],    // top middle to bottom middle
        [2, 5, 8],    // top left to bottom left
        [0, 1, 2],    // top left to top right
        [3, 4, 5],    // middle left to middle right
        [6, 7, 8]     // bottom left to bottom right
      ];
  
      for (let i = 0; i < winCondition.length; i++) {
        const [a, b, c] = winCondition[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          if(squares[a] == "X") {return true;}
          if(squares[a] == "Y") {return false;}
        }
      }
      return null;
    }

    xOrY(turn) {
        if(turn === true) {return "X"}
            return "Y"
    }

    nextTurn() {
        // Returns the char of the next turn.
        const turn = !this.state.turn;
        this.setState({turn: turn});

        console.log(this.state.turn);
        return this.xOrY(this.state.turn);
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        this.findWinner(this.state.squares);

        if(squares[i] != null) {return} 

        squares[i] = this.nextTurn();
        this.setState({squares: squares});
    }

    renderSquare(i) {
      return <Square 
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
             />;
    }
    
    render() {
      let status = `Next Turn: ${this.xOrY(this.state.turn)}`;
      if(this.findWinner(this.state.squares) == true) {
        status = "X's win"
      } else if(this.findWinner(this.state.squares) == false) {
        status = "Y's win"
      }
  
      return (
        <div>
          <div className="status">{status}</div>
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
  
class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  