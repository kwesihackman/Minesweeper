import { Dimensions } from "react-native";
export const BoardDimensions = {
  MAX_WIDTH: Dimensions.get("screen").width,
  MAX_HEIGHT: Dimensions.get("screen").height,
  MAX_ROWS: 4,
  MAX_COLS: 4,
  CELL_SIZE: 30,
};
