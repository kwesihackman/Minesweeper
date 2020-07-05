import { Dimensions } from "react-native";
export const BoardDimensions = {
  max_width: Dimensions.get("screen").width,
  max_height: Dimensions.get("screen").height,
  size: 10,
  cell_size: 30,
};
