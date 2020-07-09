import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Alert,
} from "react-native";
import { BoardDimensions } from "../src/utils/Constants";

export default class Cell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpened: false,
      hasMine: Math.random() < 0.2,
      neighbors: null,
      isFlagged: false,
    };
  }

  onFlagCell = () => {
    if (this.state.isOpened) {
      return;
    }

    this.setState(
      {
        isFlagged: !this.state.isFlagged,
      },
      () => this.props.checkUserWon()
    );
  };

  openCell = () => {
    if (this.state.isOpened || this.state.isFlagged) {
      return;
    }

    this.setState({
      isOpened: true,
    });
  };

  onOpenCell = (isOpenedByUser) => {
    if (this.state.isOpened) {
      return;
    }

    if (!isOpenedByUser && this.state.hasMine) {
      return;
    }

    this.setState(
      {
        isOpened: true,
      },
      () => {
        if (this.state.hasMine) {
          this.props.userTappedOnMine();
        } else {
          this.props.onOpenCell(this.props.colIndex, this.props.rowIndex);
        }

        this.props.checkUserWon();
      }
    );
  };

  reset = () => {
    this.setState({
      isOpened: false,
      hasMine: Math.random() < 0.2,
      neighbors: null,
      isFlagged: false,
    });
  };

  render() {
    if (!this.state.isOpened) {
      if (this.state.isFlagged) {
        return (
          <TouchableOpacity onLongPress={() => this.onFlagCell()}>
            <View
              style={[
                styles.openedCell,
                {
                  width: BoardDimensions.CELL_SIZE,
                  height: BoardDimensions.CELL_SIZE,
                },
              ]}
            >
              <Image
                source={require("../assets/flagred.png")}
                style={{
                  width: BoardDimensions.CELL_SIZE / 2,
                  height: BoardDimensions.CELL_SIZE / 2,
                }}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        );
      }
      return (
        <TouchableOpacity
          onPress={() => {
            this.onOpenCell(true);
          }}
          onLongPress={() => this.onFlagCell()}
        >
          <View
            style={[
              styles.cell,
              {
                width: BoardDimensions.CELL_SIZE,
                height: BoardDimensions.CELL_SIZE,
              },
            ]}
          ></View>
        </TouchableOpacity>
      );
    } else {
      let content = null;
      if (this.state.hasMine) {
        content = (
          <Image
            source={require("../assets/bomb.png")}
            style={{
              width: BoardDimensions.CELL_SIZE / 2,
              height: BoardDimensions.CELL_SIZE / 2,
            }}
            resizeMode="contain"
          />
        );
      } else if (this.state.neighbors) {
        content = <Text>{this.state.neighbors}</Text>;
      }

      return (
        <View
          style={[
            styles.openedCell,
            {
              width: BoardDimensions.CELL_SIZE,
              height: BoardDimensions.CELL_SIZE,
            },
          ]}
        >
          {content}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  cell: {
    backgroundColor: "#bebebe",
    borderWidth: 3,
    borderTopColor: "#ffffff",
    borderLeftColor: "#ffffff",
    borderRightColor: "#7a7a7a",
    borderBottomColor: "#7a7a7a",
  },
  openedCell: {
    backgroundColor: "#bebebe",
    borderWidth: 1,
    borderColor: "#7a7a7a",
    alignItems: "center",
    justifyContent: "center",
  },
});
