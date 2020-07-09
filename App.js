import React, { Component } from "react";
import { StyleSheet, View, Text, Button, Alert } from "react-native";
import { BoardDimensions } from "./src/utils/Constants";
import Cell from "./components/Cell";
import Popup from "./components/Popup";

const boardSize = BoardDimensions.CELL_SIZE * BoardDimensions.MAX_ROWS;
export default class App extends Component {
  constructor(props) {
    super(props);

    this.grid = Array.apply(null, Array(BoardDimensions.MAX_ROWS)).map(() =>
      Array(BoardDimensions.MAX_COLS).fill(null)
    );
    this.state = {
      showPopup: false,
      userWon: false
    };
  }

  openNeighborCell = (row, col) => {
    // -1 represents row or col before current cell
    // 0 represents current cell
    // 1 represents next row or col after current cell
    for (let rowIndex = -1; rowIndex <= 1; rowIndex++) {
      for (let colIndex = -1; colIndex <= 1; colIndex++) {
        if (
          (rowIndex != 0 || colIndex != 0) &&
          row + rowIndex >= 0 &&
          row + rowIndex <= BoardDimensions.MAX_ROWS - 1 &&
          col + colIndex >= 0 &&
          col + colIndex <= BoardDimensions.MAX_COLS - 1
        ) {
          this.grid[row + rowIndex][col + colIndex].onOpenCell(false);
        }
      }
    }
  };

  checkUserWon = () => {
    let userHasWon = true;

    for (let row = 0; row < BoardDimensions.MAX_ROWS; row++) {
      for (let col = 0; col < BoardDimensions.MAX_COLS; col++) {
        const currentCell = this.grid[row][col];

        if (currentCell.state.hasMine) {
          if (!currentCell.state.isFlagged) {
            userHasWon = false;
          } 
        } else {
          if (!currentCell.state.isOpened) {
            userHasWon = false;
          }
        }
      }
    }

    if(userHasWon){
      this.setState({
        showPopup: true,
        userWon: true
      })
    }
    
  };

  onOpenCell = (row, col) => {
    let neighbors = 0;
    for (let rowIndex = -1; rowIndex <= 1; rowIndex++) {
      for (let colIndex = -1; colIndex <= 1; colIndex++) {
        if (
          row + rowIndex >= 0 &&
          row + rowIndex <= BoardDimensions.MAX_ROWS - 1 &&
          col + colIndex >= 0 &&
          col + colIndex <= BoardDimensions.MAX_COLS - 1
        ) {
          if (this.grid[row + rowIndex][col + colIndex].state.hasMine) {
            neighbors++;
          }
        }
      }
    }

    if (neighbors) {
      this.grid[row][col].setState({
        neighbors: neighbors,
      });
    } else {
      this.openNeighborCell(row, col);
    }
  };

  userTappedOnMine = () => {
    //open all the cells
    for (let row = 0; row < BoardDimensions.MAX_ROWS; row++) {
      for (let col = 0; col < BoardDimensions.MAX_COLS; col++) {
        this.grid[row][col].openCell();
      }
    }
    this.setState({
      showPopup: true,
      userWon: false
    });
  };

  renderGame = () => {
    return Array.apply(null, Array(BoardDimensions.MAX_ROWS)).map(
      (_, rowIndex) => {
        let generatedCells = Array.apply(
          null,
          Array(BoardDimensions.MAX_COLS)
        ).map((_, colIndex) => {
          return (
            <Cell
              onOpenCell={this.onOpenCell}
              userTappedOnMine={this.userTappedOnMine}
              checkUserWon={this.checkUserWon}
              key={colIndex}
              colIndex={colIndex}
              rowIndex={rowIndex}
              ref={(ref) => {
                this.grid[colIndex][rowIndex] = ref;
              }}
            />
          );
        });

        return (
          <View key={rowIndex} style={styles.cellContainer}>
            {generatedCells}
          </View>
        );
      }
    );
  };

  resetGame = () => {
    for (let row = 0; row < BoardDimensions.MAX_ROWS; row++) {
      for (let col = 0; col < BoardDimensions.MAX_COLS; col++) {
        this.grid[row][col].reset();
      }
    }

    this.setState({
      showPopup: false,
    });
  };

  render() {
    return (
      <View style={styles.container} testID="mainContainer">
        <Text style={styles.title} testID="gameTitle">Minesweeper</Text>
        <View style={styles.gameBoard} testID="gameBoard">{this.renderGame()}</View>
        {this.state.showPopup && (
          <Popup onReTry={this.resetGame} userWon={this.state.userWon}/>
        )}
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "70%",
    height: 200,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gameBoard: {
    width: boardSize,
    height: boardSize,
    backgroundColor: "#666666",
    flexDirection: "column",
  },
  cellContainer: {
    width: boardSize,
    height: BoardDimensions.CELL_SIZE,
    flexDirection: "row",
  },
  title: {
    marginVertical: 40,
    fontSize: 30,
    fontWeight: "bold",
  },
});
