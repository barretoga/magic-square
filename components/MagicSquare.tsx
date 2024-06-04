import { useState } from 'react';
import { StyleSheet, SafeAreaView, TextInput, View, FlatList, StyleProp, ViewStyle } from 'react-native';

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

  return (
    <View
      style={boxStyles}
    >
      {
        returnSquareLayout()
      }
    </View>
  );
}
