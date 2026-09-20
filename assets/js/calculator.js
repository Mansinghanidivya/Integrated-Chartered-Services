// Financial calculator logic for Chartered Integrated Services

function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

function calculateSIP(monthly, years, rate) {
  const n = years * 12;
  const r = rate / 100 / 12;
  const invested = monthly * n;
  const maturity = r === 0 ? invested : monthly * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
  return {
    invested: Math.round(invested),
    maturity: Math.round(maturity)
  };
}

function initCalculator() {
  const monthlyInput = document.getElementById('sip-monthly-input');
  const yearsInput = document.getElementById('sip-years-input');
  const rateInput = document.getElementById('sip-rate-input');

  const monthlyVal = document.getElementById('sip-monthly-display');
  const yearsVal = document.getElementById('sip-years-display');
  const rateVal = document.getElementById('sip-rate-display');

  const investedVal = document.getElementById('sip-invested-val');
  const maturityVal = document.getElementById('sip-maturity-val');

  if (!monthlyInput || !yearsInput || !rateInput) return;

  function update() {
    const monthly = Number(monthlyInput.value);
    const years = Number(yearsInput.value);
    const rate = Number(rateInput.value);

    if (monthlyVal) monthlyVal.textContent = formatINR(monthly);
    if (yearsVal) yearsVal.textContent = `${years} years`;
    if (rateVal) rateVal.textContent = `${rate}% p.a.`;

    const result = calculateSIP(monthly, years, rate);
    if (investedVal) investedVal.textContent = formatINR(result.invested);
    if (maturityVal) maturityVal.textContent = formatINR(result.maturity);
  }

  monthlyInput.addEventListener('input', update);
  yearsInput.addEventListener('input', update);
  rateInput.addEventListener('input', update);

  update();
}
