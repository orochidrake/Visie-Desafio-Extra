import * as React from 'react';
import Swal from 'sweetalert2';
import './style.css';

export default function App() {
  const Case = [
    [5, 3, 4],
    [1, 5, 8],
    [2, 2, 3, 4],
  ];
  const Case2 = [
    [7, 2, 4, 2],
    [3, 8, 4],
    [9, 3, 2],
  ];
  const Case3 = [[5, 4], [5], [2, 7, 3, 6]];

  function equalSum(items): number {
    const C1 = items[0];
    const C2 = items[1];
    const C3 = items[2];

    const sumC1 = C1.reduce((sum, num) => sum + num, 0);
    const sumC2 = C2.reduce((sum, num) => sum + num, 0);
    const sumC3 = C3.reduce((sum, num) => sum + num, 0);

    const dp: boolean[][][] = new Array(C1.length + 1)
      .fill(false)
      .map(() =>
        new Array(C2.length + 1)
          .fill(false)
          .map(() => new Array(C3.length + 1).fill(false))
      );

    dp[0][0][0] = true;

    for (let i = 0; i <= C1.length; i++) {
      for (let j = 0; j <= C2.length; j++) {
        for (let k = 0; k <= C3.length; k++) {
          if (dp[i][j][k]) {
            if (i < C1.length) dp[i + 1][j][k] = true;
            if (j < C2.length) dp[i][j + 1][k] = true;
            if (k < C3.length) dp[i][j][k + 1] = true;

            const sum1 = sumC1 - (i < C1.length ? C1[i] : 0);
            const sum2 = sumC2 - (j < C2.length ? C2[j] : 0);
            const sum3 = sumC3 - (k < C3.length ? C3[k] : 0);

            if (sum1 === sum2 && sum2 === sum3) {
              Swal.fire({
                title: 'O Resultado é',
                html: sum1,
              });

              return sum1;
            }
          }
        }
      }
    }
    Swal.fire({
      title: 'Os numeros fornecidos não possuim nenhuma combinação!',
      text: 'O resultado é 0',
    });

    return 0;
  }

  return (
    <div>
      <h1>Desafio Extra</h1>
      <div>
        <div>
          <button onClick={() => equalSum(Case)}>Testar Grupo 1</button>
        </div>
        <br />
        <div>
          <button onClick={() => equalSum(Case2)}>Testar Grupo 2</button>
        </div>
        <br />
        <div>
          <button onClick={() => equalSum(Case3)}>Testar Grupo 3</button>
        </div>
        <br />
      </div>
    </div>
  );
}
