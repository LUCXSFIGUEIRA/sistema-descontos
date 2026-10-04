import { useState } from 'react';

import {
  calculateDiscount
} from '../services/discountService';

import './DiscountDashboard.css';

const currency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
});

export default function DiscountDashboard() {

  const [value, setValue] = useState('');

  const [result, setResult] = useState(null);

  const [error, setError] = useState('');

  function handleCalculate(event) {

    event.preventDefault();

    try {

      const response =
        calculateDiscount(Number(value));

      setResult(response);

      setError('');

    } catch {

      setResult(null);

      setError('Informe um valor maior que zero.');
    }
  }

  return (

    <main className="dd-page">

      <section className="dd-card">

        <header className="dd-header">

          <div className="dd-badge" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
              stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z" />
              <circle cx="7.5" cy="7.5" r="1.5" />
            </svg>
          </div>

          <div>
            <h1 className="dd-title">
              Sistema Comercial
            </h1>

            <p className="dd-subtitle">
              Cálculo automático de descontos
            </p>
          </div>

        </header>

        <form className="dd-form" onSubmit={handleCalculate} noValidate>

          <label className="dd-label" htmlFor="purchase-value">
            Valor da Compra
          </label>

          <div className={`dd-input-wrap${error ? ' dd-input-wrap--error' : ''}`}>

            <span className="dd-prefix">R$</span>

            <input
              id="purchase-value"

              type="number"

              inputMode="decimal"

              min="0"

              step="0.01"

              placeholder="Digite o valor"

              value={value}

              onChange={(e) =>
                setValue(e.target.value)
              }

              aria-invalid={Boolean(error)}

              aria-describedby={error ? 'purchase-error' : undefined}

              className="dd-input"
            />

          </div>

          {
            error && (
              <p id="purchase-error" className="dd-error" role="alert">
                {error}
              </p>
            )
          }

          <button type="submit" className="dd-button">
            Calcular Desconto
          </button>

        </form>

        {

          result && (

            <div className="dd-result" aria-live="polite">

              <div className="dd-result-head">
                <span className="dd-result-label">
                  Valor Final
                </span>

                <span className="dd-pill">
                  {result.discount}% OFF
                </span>
              </div>

              <strong className="dd-total">
                {currency.format(result.finalValue)}
              </strong>

              <dl className="dd-rows">

                <div className="dd-row">
                  <dt>Valor Original</dt>
                  <dd>{currency.format(result.originalValue)}</dd>
                </div>

                <div className="dd-row dd-row--saving">
                  <dt>Economia</dt>
                  <dd>− {currency.format(result.discountValue)}</dd>
                </div>

              </dl>

            </div>

          )

        }

      </section>

    </main>

  );
}
