import { useState } from 'react';
import { TextInput, View, Text, Button } from 'react-native';

export type MagicSquareProps = {
  width: string;
  height: string;
}

export function MagicSquare({ width, height }: MagicSquareProps) {
  const [square, setSquare] = useState([
    ['1', '0', '0'],
    ['2', '4', '6'],
    ['6', '2', '4']
  ]);

  function increaseSquareSize() {
    const newSize = square.length + 1;
    const newSquare = Array.from({ length: newSize }, (_, i) =>
      Array.from({ length: newSize }, (_, j) => 
        i < square.length && j < square.length ? square[i][j] : '0'
      )
    );
    setSquare(newSquare);
  }

  const boxStyles: any = {
    flex: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: 'full',
  };

  const itemStyle: any = {
    flexBasis: `${100 / square.length - 1}%`,
    borderColor: 'black',
    backgroundColor: 'white',
    borderRadius: 5,
    margin: 1,
    marginBottom: 15,
    height: 70,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 25,
    textAlign: 'center',
  };

  const errorMessageStyle: any = {
    fontSize: 25,
    color: 'red',
    margin: 'auto',
  };

  const successMessageStyle: any = {
    fontSize: 25,
    color: 'green',
    margin: 'auto',
  };

  function handleChange(event: any, i: number, j: number) {
    const updatedSquare = [...square];
    updatedSquare[i][j] = event.target.value;
    setSquare(updatedSquare);
  }

  function returnSquareLayout() {
    const elements = []

    for (let i = 0; i < square.length; i++) {
      for (let j = 0; j < square[i].length; j++) {
        elements.push(
          <TextInput
            style={itemStyle}
            key={`line-${i}-element-${j}`}
            value={square[i][j]}
            maxLength={2}
            onChange={(event) => handleChange(event, i, j)}
          />
        )
      }
    }

    return elements
  }

  function returnMagicSquareValidation() {
    const n = square.length;
    const magicSum = (n * (n * n + 1)) / 2;
    let isValid = true;

    for (let i = 0; i < n; i++) {
      let sum = 0;
      for (let j = 0; j < n; j++) {
        sum += parseInt(square[i][j]);
      }
      if (sum !== magicSum) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      for (let i = 0; i < n; i++) {
        let sum = 0;
        for (let j = 0; j < n; j++) {
          sum += parseInt(square[j][i]);
        }
        if (sum !== magicSum) {
          isValid = false;
          break;
        }
      }
    }

    if (isValid) {
      let sum = 0;
      for (let i = 0; i < n; i++) {
        sum += parseInt(square[i][i]);
      }
      if (sum !== magicSum) {
        isValid = false;
      }
    }

    if (isValid) {
      let sum = 0;
      for (let i = 0; i < n; i++) {
        sum += parseInt(square[i][n - 1 - i]);
      }
      if (sum !== magicSum) {
        isValid = false;
      }
    }

    return isValid ? 
      <Text style={successMessageStyle}>The magic square is valid!</Text>
      :
      <Text style={errorMessageStyle}>The magic square is not valid!</Text>;
  }

  return (
    <View>
      <View style={boxStyles}>
        {returnSquareLayout()}
      </View>
      <View style={{
        marginBottom: 40,
      }}>
        <Button title="Increase Size" onPress={increaseSquareSize} />
      </View>
      <View>
        {returnMagicSquareValidation()}
      </View>
    </View>
  );
}
