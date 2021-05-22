import React from "react";
import { Text } from "react-native";
import {Buffer} from "buffer";

global.Buffer = require('buffer').Buffer;

class ReadString extends React.Component {
  state = { dataKey: null };

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.CarShare;

    // let drizzle know we want to watch the `myString` method
    const dataKey = contract.methods["getData"].cacheCall();

    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
  }

  render() {
    // get the contract state from drizzleState
    const { CarShare } = this.props.drizzleState.contracts;

    // using the saved `dataKey`, get the variable we're interested in
    const myString = CarShare.getData[this.state.dataKey];

    // if it exists, then we display its value
    return <Text>My stored string: {myString && myString.value}</Text>;
  }
}

export default ReadString;