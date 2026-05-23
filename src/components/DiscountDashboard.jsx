import { useState } from 'react';

import {
  calculateDiscount
} from '../services/discountService';

export default function DiscountDashboard() {

  const [value, setValue] = useState('');

  const [result, setResult] = useState(null);

  function handleCalculate() {

    const response =
      calculateDiscount(Number(value));

    setResult(response);
  }

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h1 style={styles.title}>
          Sistema Comercial
        </h1>

        <p style={styles.subtitle}>
          Cálculo automático de descontos
        </p>

        <div style={styles.formGroup}>

          <label style={styles.label}>
            Valor da Compra
          </label>

          <input
            type="number"

            placeholder="Digite o valor"

            value={value}

            onChange={(e) =>
              setValue(e.target.value)
            }

            style={styles.input}
          />

        </div>

        <button
          onClick={handleCalculate}
          style={styles.button}
        >
          Calcular Desconto
        </button>

        {

          result && (

            <div style={styles.resultCard}>

              <div style={styles.row}>
                <span>
                  Valor Original
                </span>

                <strong>
                  R$ {result.originalValue}
                </strong>
              </div>

              <div style={styles.row}>
                <span>
                  Desconto Aplicado
                </span>

                <strong>
                  {result.discount}%
                </strong>
              </div>

              <div style={styles.row}>
                <span>
                  Economia
                </span>

                <strong>
                  R$ {result.discountValue}
                </strong>
              </div>

              <div style={styles.divider}></div>

              <div style={styles.totalRow}>
                <span>
                  Valor Final
                </span>

                <strong>
                  R$ {result.finalValue}
                </strong>
              </div>

            </div>

          )

        }

      </div>

    </div>

  );
}

const styles = {

  container: {

    minHeight: '100vh',

    display: 'flex',

    justifyContent: 'center',

    alignItems: 'center',

    background: '#f3f4f6',

    padding: '24px',

    fontFamily:
      'Roboto, Arial, sans-serif'
  },

  card: {

    width: '100%',

    maxWidth: '420px',

    background: '#ffffff',

    borderRadius: '16px',

    padding: '32px',

    boxShadow:
      '0 2px 10px rgba(0,0,0,0.08)'
  }

};