import React, {Component} from 'react';
import Square from "./Square";

class Board extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                squares: Array(9).fill(null),
                isX: true
            };
        this.lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        this.winner = null;
        this.count = 0;
    }

    calculateWinner = squares => {
        if (this.count < 5)
            return null;
        for (let i = 0; i < this.lines.length; i++) {
            const [a, b, c] = this.lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
                return squares[a];
        }
        return null;
    }
    fillSquare = index => {
        if (!this.state.squares[index] && !this.winner) {
            let temp = [...this.state.squares];
            temp[index] = this.state.isX ? 'X' : 'O';
            this.setState(
                {
                    squares: temp,
                    isX: !this.state.isX
                }
            )
            this.count++;
        }
    }
    getStatus = () => {
        this.winner = this.calculateWinner(this.state.squares);
        if (this.winner)
            return `Winner is ${this.winner}`;
        else if (this.count === 9)
            return 'DRAW';
        else
            return `Next player: ${this.state.isX ? 'X' : 'O'}`;
    }

    render() {
        return (
            <div className={'board'}>
                <div className={'status'}>{this.getStatus()}</div>
                {this.state.squares.map((item, index) =>
                    <Square key={index} value={item} index={index}
                            fillSquare={this.fillSquare}/>)}
            </div>
        );
    }
}

export default Board;