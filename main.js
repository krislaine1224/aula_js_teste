// Aguarda o HTML carregar completamente antes de rodar o script
document.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('display');
  const buttons = document.querySelectorAll('.btn');

  let shouldResetDisplay = false;

  buttons.forEach(button => {
    button.addEventListener('click', (event) => {
      // Pega o texto do botão removendo espaços em branco acidentais
      const value = button.textContent.trim();
      const id = button.id;

      // Se for o botão de Limpar (C)
      if (id === 'btn-clear' || value === 'C') {
        clearDisplay();
        return;
      }

      // Se for o botão de Apagar (⌫)
      if (id === 'btn-delete' || value === '⌫') {
        deleteLast();
        return;
      }

      // Se for o botão de Igual (=)
      if (id === 'btn-equal' || value === '=') {
        calculate();
        return;
      }

      // Para números e operadores (+, -, ×, ÷, ,)
      appendValue(value);
    });
  });

  function appendValue(val) {
    if (display.value === '0' || shouldResetDisplay) {
      if (val === ',') {
        display.value = '0,';
      } else {
        display.value = val;
      }
      shouldResetDisplay = false;
    } else {
      display.value += val;
    }
  }

  function clearDisplay() {
    display.value = '';
    shouldResetDisplay = false;
  }

  function deleteLast() {
    display.value = display.value.slice(0, -1);
  }

  function calculate() {
    try {
      // Pega a expressão e substitui os símbolos visuais pelos operadores do JS
      let expression = display.value
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/,/g, '.');

      if (!expression) return;

      // Avalia a conta
      let result = Function(`'use strict'; return (${expression})`)();

      if (!isFinite(result)) {
        display.value = 'Erro';
      } else {
        display.value = result.toString().replace(/\./g, ',');
      }

      shouldResetDisplay = true;
    } catch (error) {
      display.value = 'Erro';
      shouldResetDisplay = true;
    }
  }
});