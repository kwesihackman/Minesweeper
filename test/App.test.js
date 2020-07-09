import React from "react";
import renderer from "react-test-renderer";
import {cleanup, render} from 'react-native-testing-library';
import App from "../App";

afterEach(cleanup);

describe("<App /> functions", () => {

it("should match snapshot", () => {
  const tree = render(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("should properly render title text", () => {
const tree = render(<App />);
const titleComponent = tree.getByTestId('gameTitle')

expect(titleComponent.children).toEqual('Minesweeper')
});

});
