import { useState } from 'react';
import { TextInput, View, Text } from 'react-native';

export type MagicSquareProps = {
  width: string;
  height: string;
}

export function MagicSquare({ width, height }: MagicSquareProps) {
  const [square, setSquare] = useState([
    ['1', '0', '0'],
    ['2', '4', '6'],
    ['6', '2', '4']
  ])

  const boxStyles: any = {
    flex: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  }

  const itemStyle: any = {
    flexBasis: '30%',
    borderColor: 'black',
    backgroundColor: 'white',
    borderRadius: 5,
    margin: 2,
    marginBottom: 15,
    height: 70,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 25,
    textAlign: 'center',
  }

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
            maxLength={1}
            onChange={(event) => handleChange(event, i, j)}
          />
        )
      }
    }

    return elements
  }

  function returnMagicSquareValidation() {
    let isValid = true;

    for (let i = 0; i < square.length; i++) {
      let sum = 0;
      for (let j = 0; j < square[i].length; j++) {
        sum += parseInt(square[i][j]);
      }
      if (sum !== 15) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      for (let i = 0; i < square.length; i++) {
        let sum = 0;
        for (let j = 0; j < square[i].length; j++) {
          sum += parseInt(square[j][i]);
        }
        if (sum !== 15) {
          isValid = false;
          break;
        }
      }
    }

    if (isValid) {
      let sum = 0;
      for (let i = 0; i < square.length; i++) {
        sum += parseInt(square[i][i]);
      }
      if (sum !== 15) {
        isValid = false;
      }
    }

    if (isValid) {
      let sum = 0;
      for (let i = 0; i < square.length; i++) {
        sum += parseInt(square[i][square.length - 1 - i]);
      }
      if (sum !== 15) {
        isValid = false;
      }
    }

    return isValid ? 
      <Text style={successMessageStyle}>The magic square is valid!</Text>
      :
      <Text style={errorMessageStyle}>The magic square is not valid!</Text>;
  }

  return (
    <View
      style={boxStyles}
    >
      {
        returnSquareLayout()
      }
      {
        returnMagicSquareValidation()
      }
    </View>
  );
}
