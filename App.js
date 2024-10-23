import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

const MAX_CHARACTERS = 22;

const Calculator = () => {
  const [display, setDisplay] = useState('');

  // Limpiar el display
  const clearDisplay = () => {
    setDisplay('');
  };

  // Añadir texto al display
  const appendToDisplay = (value) => {
    if (['Error', 'Math Error', 'Syntax Error'].includes(display)) clearDisplay();

    const lastChar = display.slice(-1);

    // Manejar multiplicación implícita (como 5π, 5e, 5( )
    if (isNumber(lastChar) && (value === 'π' || value === 'e' || value === '(')) {
      value = '*' + value;
    }

    if (display.length >= MAX_CHARACTERS) {
      setDisplay(display.slice(1) + value);
    } else {
      setDisplay(display + value);
    }
  };

  // Verificar si un carácter es un número
  const isNumber = (char) => !isNaN(char) && char !== ' ';

  // Borrar el último carácter del display
  const deleteLastCharacter = () => {
    if (['Error', 'Math Error', 'Syntax Error'].includes(display)) {
      clearDisplay();
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  // Evaluar la expresión ingresada
  const calculate = () => {
    try {
      let expression = display
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/√\(/g, 'Math.sqrt(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/\^2/g, '**2')
        .replace(/\^3/g, '**3')
        .replace(/\|([^|]+)\|/g, 'Math.abs($1)');

      let result = Function(`"use strict"; return (${expression})`)();

      if (!isFinite(result)) throw new Error('Math Error');

      setDisplay(result.toString());
    } catch (error) {
      setDisplay(error.message === 'Math Error' ? 'Math Error' : 'Syntax Error');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.display}
        value={display}
        editable={false}
        placeholder="0"
        placeholderTextColor="#999"
      />
      <View style={styles.buttons}>
        {/* Botones de la calculadora */}
        {[
          { label: 'C', onPress: clearDisplay },
          { label: '(', onPress: () => appendToDisplay('(') },
          { label: ')', onPress: () => appendToDisplay(')') },
          { label: '√', onPress: () => appendToDisplay('√(') },
          { label: 'sin', onPress: () => appendToDisplay('sin(') },
          { label: 'cos', onPress: () => appendToDisplay('cos(') },
          { label: 'tan', onPress: () => appendToDisplay('tan(') },
          { label: '^', onPress: () => appendToDisplay('^') },
          { label: 'x²', onPress: () => appendToDisplay('^2') },
          { label: 'x³', onPress: () => appendToDisplay('^3') },
          { label: '|x|', onPress: () => appendToDisplay('|') },
          { label: 'ln', onPress: () => appendToDisplay('ln(') },
          { label: 'log', onPress: () => appendToDisplay('log(') },
          { label: 'π', onPress: () => appendToDisplay('π') },
          { label: 'e', onPress: () => appendToDisplay('e') },
          { label: '÷', onPress: () => appendToDisplay('/') },
          { label: '7', onPress: () => appendToDisplay('7') },
          { label: '8', onPress: () => appendToDisplay('8') },
          { label: '9', onPress: () => appendToDisplay('9') },
          { label: '×', onPress: () => appendToDisplay('*') },
          { label: '4', onPress: () => appendToDisplay('4') },
          { label: '5', onPress: () => appendToDisplay('5') },
          { label: '6', onPress: () => appendToDisplay('6') },
          { label: '−', onPress: () => appendToDisplay('-') },
          { label: '1', onPress: () => appendToDisplay('1') },
          { label: '2', onPress: () => appendToDisplay('2') },
          { label: '3', onPress: () => appendToDisplay('3') },
          { label: '+', onPress: () => appendToDisplay('+') },
          { label: '0', onPress: () => appendToDisplay('0') },
          { label: '.', onPress: () => appendToDisplay('.') },
          { label: 'DEL', onPress: deleteLastCharacter },
          { label: '=', onPress: calculate }
        ].map((button, index) => (
          <TouchableOpacity key={index} style={styles.button} onPress={button.onPress}>
            <Text style={styles.buttonText}>{button.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  display: {
    width: '90%',
    height: 60,
    fontSize: 24,
    textAlign: 'right',
    padding: 10,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#007bff',
    borderRadius: 8,
  },
  buttons: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    width: '22%',
    height: 60,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default Calculator;
