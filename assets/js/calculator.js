// Comprehensive Financial Calculators Suite for Chartered Integrated Services
// Includes all 9 calculators required by wealth-management positioning:
// 1. SIP Calculator
// 2. CAGR Calculator
// 3. XIRR Calculator
// 4. Lump Sum Calculator
// 5. Step-up SIP Calculator
// 6. Retirement Calculator
// 7. Goal Planning Calculator
// 8. Inflation Calculator
// 9. EMI Calculator

const CalculatorEngine = {
  // Indian Currency Formatter with intelligent abbreviations for large sums
  formatCurrency(amount, withWords = false) {
    if (isNaN(amount) || amount === null || amount === undefined) return '₹0';
    const num = Math.round(amount);
    const formatted = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num);

    if (!withWords) return formatted;

    if (num >= 10000000) {
      return `${formatted} (${(num / 10000000).toFixed(2)} Cr)`;
    } else if (num >= 100000) {
      return `${formatted} (${(num / 100000).toFixed(2)} Lakh)`;
    }
    return formatted;
  },

  formatPercent(val) {
    if (isNaN(val)) return '0%';
    return `${Number(val).toFixed(2)}%`;
  },

  // 1. SIP Calculator
  calcSIP(monthly, years, rate) {
    const n = Math.max(1, years * 12);
    const r = (rate / 100) / 12;
    const invested = monthly * n;
    let maturity = 0;
    if (r === 0) {
      maturity = invested;
    } else {
      maturity = monthly * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
    }
    const gain = Math.max(0, maturity - invested);
    return { invested: Math.round(invested), gain: Math.round(gain), maturity: Math.round(maturity) };
  },

  // 2. CAGR Calculator
  calcCAGR(initialVal, finalVal, years) {
    if (initialVal <= 0 || finalVal <= 0 || years <= 0) {
      return { cagr: 0, absoluteGain: 0, absolutePercent: 0 };
    }
    const cagr = (Math.pow(finalVal / initialVal, 1 / years) - 1) * 100;
    const absoluteGain = finalVal - initialVal;
    const absolutePercent = ((finalVal - initialVal) / initialVal) * 100;
    return {
      cagr: Number(cagr.toFixed(2)),
      absoluteGain: Math.round(absoluteGain),
      absolutePercent: Number(absolutePercent.toFixed(2))
    };
  },

  // 3. XIRR Calculator (Annualized Internal Rate of Return Approximation)
  calcXIRR(cashFlows) {
    // cashFlows: array of { year: number, amount: number }
    // Newton-Raphson approximation
    let rate = 0.10; // initial guess 10%
    const maxIterations = 100;
    const tolerance = 1e-5;

    for (let i = 0; i < maxIterations; i++) {
      let fValue = 0;
      let fDerivative = 0;

      for (let j = 0; j < cashFlows.length; j++) {
        const t = cashFlows[j].year;
        const cf = cashFlows[j].amount;
        const denominator = Math.pow(1 + rate, t);
        if (denominator === 0) continue;
        fValue += cf / denominator;
        fDerivative += -t * cf / Math.pow(1 + rate, t + 1);
      }

      if (Math.abs(fValue) < tolerance) break;
      if (Math.abs(fDerivative) < 1e-10) break;

      const newRate = rate - fValue / fDerivative;
      if (isNaN(newRate) || !isFinite(newRate)) break;
      rate = newRate;
    }

    return Number((rate * 100).toFixed(2));
  },

  // 4. Lump Sum Calculator
  calcLumpSum(principal, years, rate) {
    const r = rate / 100;
    const maturity = principal * Math.pow(1 + r, years);
    const gain = Math.max(0, maturity - principal);
    return {
      invested: Math.round(principal),
      gain: Math.round(gain),
      maturity: Math.round(maturity)
    };
  },

  // 5. Step-up SIP Calculator
  calcStepUpSIP(initialMonthly, stepUpPercent, years, rate) {
    const r = (rate / 100) / 12;
    let totalInvested = 0;
    let maturity = 0;
    let currentMonthly = initialMonthly;

    for (let yr = 1; yr <= years; yr++) {
      for (let m = 1; m <= 12; m++) {
        const monthsRemaining = (years - yr) * 12 + (12 - m + 1);
        totalInvested += currentMonthly;
        maturity += currentMonthly * Math.pow(1 + r, monthsRemaining);
      }
      currentMonthly += (currentMonthly * (stepUpPercent / 100));
    }

    // Baseline flat SIP for comparison
    const flatResult = this.calcSIP(initialMonthly, years, rate);

    return {
      invested: Math.round(totalInvested),
      gain: Math.round(maturity - totalInvested),
      maturity: Math.round(maturity),
      flatMaturity: flatResult.maturity,
      extraWealth: Math.round(maturity - flatResult.maturity)
    };
  },

  // 6. Retirement Planning Calculator
  calcRetirement(currentAge, retirementAge, currentExpenses, inflationRate, preReturn, postReturn, lifeExpectancy = 85) {
    const yearsToRetire = Math.max(1, retirementAge - currentAge);
    const retirementDuration = Math.max(1, lifeExpectancy - retirementAge);
    
    // Future monthly expense at retirement age adjusted for inflation
    const annualInflation = inflationRate / 100;
    const futureMonthlyExpense = currentExpenses * Math.pow(1 + annualInflation, yearsToRetire);
    const futureAnnualExpense = futureMonthlyExpense * 12;

    // Real rate of return post-retirement
    const postR = postReturn / 100;
    const realRate = (postR - annualInflation) / (1 + annualInflation);

    // Required Corpus at retirement using present value of annuity
    let requiredCorpus = 0;
    if (Math.abs(realRate) < 0.0001) {
      requiredCorpus = futureAnnualExpense * retirementDuration;
    } else {
      requiredCorpus = futureAnnualExpense * ((1 - Math.pow(1 + realRate, -retirementDuration)) / realRate);
    }

    // Required Monthly SIP to accumulate requiredCorpus over yearsToRetire
    const monthlyPreR = (preReturn / 100) / 12;
    const n = yearsToRetire * 12;
    let requiredSIP = 0;
    if (monthlyPreR > 0) {
      requiredSIP = requiredCorpus / (((Math.pow(1 + monthlyPreR, n) - 1) / monthlyPreR) * (1 + monthlyPreR));
    } else {
      requiredSIP = requiredCorpus / n;
    }

    return {
      yearsToRetire,
      futureMonthlyExpense: Math.round(futureMonthlyExpense),
      requiredCorpus: Math.round(requiredCorpus),
      requiredSIP: Math.round(requiredSIP)
    };
  },

  // 7. Goal Planning Calculator
  calcGoal(targetAmountToday, years, inflationRate, expectedReturn) {
    const inf = inflationRate / 100;
    const r = (expectedReturn / 100) / 12;
    const n = Math.max(1, years * 12);

    // Inflation adjusted future goal cost
    const futureGoalCost = targetAmountToday * Math.pow(1 + inf, years);

    // Monthly SIP required
    let monthlySIP = 0;
    if (r > 0) {
      monthlySIP = futureGoalCost / (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
    } else {
      monthlySIP = futureGoalCost / n;
    }

    // One-time Lumpsum required today
    const lumpsumRequired = futureGoalCost / Math.pow(1 + (expectedReturn / 100), years);

    return {
      futureGoalCost: Math.round(futureGoalCost),
      monthlySIP: Math.round(monthlySIP),
      lumpsumRequired: Math.round(lumpsumRequired)
    };
  },

  // 8. Inflation Calculator
  calcInflation(currentAmount, years, inflationRate) {
    const inf = inflationRate / 100;
    const futureCost = currentAmount * Math.pow(1 + inf, years);
    const purchasingPowerLoss = (1 - (1 / Math.pow(1 + inf, years))) * 100;
    const increaseMultiplier = (futureCost / currentAmount).toFixed(1);

    return {
      currentAmount: Math.round(currentAmount),
      futureCost: Math.round(futureCost),
      purchasingPowerLoss: Number(purchasingPowerLoss.toFixed(1)),
      increaseMultiplier: Number(increaseMultiplier)
    };
  },

  // 9. EMI Calculator
  calcEMI(principal, annualRate, tenureYears) {
    const r = (annualRate / 100) / 12;
    const n = tenureYears * 12;

    let emi = 0;
    if (r > 0) {
      emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    } else {
      emi = principal / n;
    }

    const totalPayment = emi * n;
    const totalInterest = Math.max(0, totalPayment - principal);

    return {
      emi: Math.round(emi),
      principal: Math.round(principal),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment)
    };
  }
};

// UI Manager for the Calculators Hub Page
const CalculatorsUI = {
  activeTab: 'sip',

  calcList: [
    { id: 'sip', name: 'SIP Calculator', tag: 'Disciplined Investing', icon: 'trending-up' },
    { id: 'stepup', name: 'Step-Up SIP', tag: 'Accelerated Wealth', icon: 'sparkles' },
    { id: 'lumpsum', name: 'Lump Sum', tag: 'Strategic Capital', icon: 'coins' },
    { id: 'cagr', name: 'CAGR Calculator', tag: 'Annualized Growth', icon: 'percent' },
    { id: 'xirr', name: 'XIRR Calculator', tag: 'Portfolio Returns', icon: 'activity' },
    { id: 'retirement', name: 'Retirement Planner', tag: 'Financial Freedom', icon: 'landmark' },
    { id: 'goal', name: 'Goal Planning', tag: 'Milestone Architecture', icon: 'target' },
    { id: 'inflation', name: 'Inflation Impact', tag: 'Purchasing Power', icon: 'shield-check' },
    { id: 'emi', name: 'EMI Calculator', tag: 'Debt & Loans', icon: 'calculator' }
  ],

  renderTabs() {
    return `
      <div class="flex overflow-x-auto pb-2 scrollbar-none gap-2" role="tablist">
        ${this.calcList.map(c => `
          <button 
            type="button"
            data-calc-tab="${c.id}"
            class="flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-3 text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${this.activeTab === c.id ? 'bg-[#0a192f] text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
          >
            ${renderIcon(c.icon, 'size-4')}
            <span>${c.name}</span>
          </button>
        `).join('')}
      </div>
    `;
  },

  renderActiveCalculator() {
    switch (this.activeTab) {
      case 'sip': return this.renderSIPView();
      case 'stepup': return this.renderStepUpView();
      case 'lumpsum': return this.renderLumpSumView();
      case 'cagr': return this.renderCAGRView();
      case 'xirr': return this.renderXIRRView();
      case 'retirement': return this.renderRetirementView();
      case 'goal': return this.renderGoalView();
      case 'inflation': return this.renderInflationView();
      case 'emi': return this.renderEMIView();
      default: return this.renderSIPView();
    }
  },

  // 1. SIP View
  renderSIPView() {
    return `
      <div class="grid gap-8 lg:grid-cols-[1fr_1fr]" id="calc-workspace">
        <div class="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div class="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <p class="text-[0.68rem] font-bold uppercase tracking-wider text-[#d97706]">Wealth Accumulation</p>
              <h3 class="text-xl font-bold text-[#0a192f] font-heading">Systematic Investment Plan (SIP)</h3>
            </div>
            <span class="grid size-10 place-items-center rounded-xl bg-emerald-50 text-[#059669]">
              ${renderIcon('trending-up', 'size-5')}
            </span>
          </div>

          <div class="mt-6 space-y-6">
            <div>
              <div class="flex justify-between text-sm font-semibold mb-2">
                <span class="text-slate-600">Monthly Investment Amount</span>
                <span class="font-mono text-[#059669] font-bold text-base" id="sip-monthly-label">₹25,000</span>
              </div>
              <input type="range" id="sip-monthly" min="1000" max="200000" step="1000" value="25000" class="w-full accent-[#059669] cursor-pointer">
              <div class="flex justify-between text-[0.7rem] text-slate-400 mt-1 font-mono">
                <span>₹1,000</span>
                <span>₹1,00,000</span>
                <span>₹2,00,000</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-sm font-semibold mb-2">
                <span class="text-slate-600">Investment Horizon (Years)</span>
                <span class="font-mono text-[#059669] font-bold text-base" id="sip-years-label">15 Years</span>
              </div>
              <input type="range" id="sip-years" min="1" max="30" step="1" value="15" class="w-full accent-[#059669] cursor-pointer">
              <div class="flex justify-between text-[0.7rem] text-slate-400 mt-1 font-mono">
                <span>1 Year</span>
                <span>15 Years</span>
                <span>30 Years</span>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-sm font-semibold mb-2">
                <span class="text-slate-600">Expected Annual Return Rate (% p.a.)</span>
                <span class="font-mono text-[#059669] font-bold text-base" id="sip-rate-label">13%</span>
              </div>
              <input type="range" id="sip-rate" min="5" max="25" step="0.5" value="13" class="w-full accent-[#059669] cursor-pointer">
              <div class="flex justify-between text-[0.7rem] text-slate-400 mt-1 font-mono">
                <span>5%</span>
                <span>13%</span>
                <span>25%</span>
              </div>
            </div>
          </div>
        </div>

        <div class="rounded-3xl bg-gradient-to-br from-[#0a192f] to-[#071526] p-6 sm:p-8 text-white flex flex-col justify-between shadow-xl">
          <div>
            <div class="flex items-center justify-between border-b border-white/10 pb-4">
              <span class="text-[0.68rem] font-bold uppercase tracking-wider text-emerald-300">Projected Outcome</span>
              <span class="text-xs text-slate-400">Compounded Growth</span>
            </div>

            <div class="mt-8 space-y-4">
              <div class="rounded-2xl bg-white/5 p-4 border border-white/10">
                <p class="text-xs text-slate-400">Total Capital Invested</p>
                <p class="mt-1 font-mono text-2xl font-bold text-white" id="sip-invested-res">₹45,00,000</p>
              </div>

              <div class="rounded-2xl bg-white/5 p-4 border border-white/10">
                <p class="text-xs text-slate-400">Estimated Wealth Gain</p>
                <p class="mt-1 font-mono text-2xl font-bold text-[#86efac]" id="sip-gain-res">₹86,41,563</p>
              </div>

              <div class="rounded-2xl bg-emerald-500/10 p-5 border border-emerald-500/30">
                <p class="text-xs uppercase tracking-wider text-emerald-200 font-semibold">Total Estimated Maturity Value</p>
                <p class="mt-1 font-mono text-3xl font-extrabold text-white" id="sip-maturity-res">₹1,31,41,563</p>
              </div>
            </div>
          </div>

          <div class="mt-8 pt-6 border-t border-white/10">
            <p class="text-[0.72rem] text-slate-400 leading-relaxed mb-4">
              Illustrative only. Projections do not constitute a performance guarantee. Equity returns depend on market conditions.
            </p>
            <button type="button" class="btn-consultation w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#059669] py-3 px-5 text-sm font-bold text-white hover:bg-emerald-600 transition-colors cursor-pointer" data-interest="Mutual Funds & SIP Planning">
              ${renderIcon('message-circle', 'size-4')}
              <span>Discuss SIP Strategy With an Advisor</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  // 2. Step-Up SIP View
  renderStepUpView() {
    return `
      <div class="grid gap-8 lg:grid-cols-[1fr_1fr]" id="calc-workspace">
        <div class="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div class="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <p class="text-[0.68rem] font-bold uppercase tracking-wider text-[#d97706]">Accelerated Compounding</p>
              <h3 class="text-xl font-bold text-[#0a192f] font-heading">Step-Up SIP Calculator</h3>
            </div>
            <span class="grid size-10 place-items-center rounded-xl bg-amber-50 text-[#d97706]">
              ${renderIcon('sparkles', 'size-5')}
            </span>
          </div>

          <div class="mt-6 space-y-5">
            <div>
              <div class="flex justify-between text-sm font-semibold mb-2">
                <span class="text-slate-600">Starting Monthly SIP</span>
                <span class="font-mono text-[#059669] font-bold text-base" id="step-monthly-label">₹20,000</span>
              </div>
              <input type="range" id="step-monthly" min="2000" max="150000" step="1000" value="20000" class="w-full accent-[#059669] cursor-pointer">
            </div>

            <div>
              <div class="flex justify-between text-sm font-semibold mb-2">
                <span class="text-slate-600">Annual Step-Up Rate (%)</span>
                <span class="font-mono text-[#059669] font-bold text-base" id="step-rate-label">10%</span>
              </div>
              <input type="range" id="step-rate" min="5" max="25" step="1" value="10" class="w-full accent-[#059669] cursor-pointer">
            </div>

            <div>
              <div class="flex justify-between text-sm font-semibold mb-2">
                <span class="text-slate-600">Investment Horizon (Years)</span>
                <span class="font-mono text-[#059669] font-bold text-base" id="step-years-label">15 Years</span>
              </div>
              <input type="range" id="step-years" min="2" max="30" step="1" value="15" class="w-full accent-[#059669] cursor-pointer">
            </div>

            <div>
              <div class="flex justify-between text-sm font-semibold mb-2">
                <span class="text-slate-600">Expected Return (% p.a.)</span>
                <span class="font-mono text-[#059669] font-bold text-base" id="step-return-label">13%</span>
              </div>
              <input type="range" id="step-return" min="6" max="20" step="0.5" value="13" class="w-full accent-[#059669] cursor-pointer">
            </div>
          </div>
        </div>

        <div class="rounded-3xl bg-gradient-to-br from-[#0a192f] to-[#071526] p-6 sm:p-8 text-white flex flex-col justify-between shadow-xl">
          <div>
            <div class="flex items-center justify-between border-b border-white/10 pb-4">
              <span class="text-[0.68rem] font-bold uppercase tracking-wider text-emerald-300">Step-Up Advantage</span>
              <span class="text-xs text-slate-400">Incremental Wealth</span>
            </div>

            <div class="mt-8 space-y-4">
              <div class="rounded-2xl bg-white/5 p-4 border border-white/10">
                <p class="text-xs text-slate-400">Total Invested (With Annual Increases)</p>
                <p class="mt-1 font-mono text-2xl font-bold text-white" id="step-invested-res">₹76,73,890</p>
              </div>

              <div class="rounded-2xl bg-emerald-500/10 p-5 border border-emerald-500/30">
                <p class="text-xs uppercase tracking-wider text-emerald-200 font-semibold">Total Estimated Value</p>
                <p class="mt-1 font-mono text-3xl font-extrabold text-white" id="step-maturity-res">₹2,16,15,480</p>
              </div>

              <div class="rounded-2xl bg-amber-500/10 p-4 border border-amber-500/30">
                <p class="text-xs text-amber-200">Extra Wealth Created vs Normal SIP</p>
                <p class="mt-1 font-mono text-xl font-bold text-[#d97706]" id="step-extra-res">+ ₹1,11,02,230</p>
              </div>
            </div>
          </div>

          <div class="mt-8 pt-6 border-t border-white/10">
            <button type="button" class="btn-consultation w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#059669] py-3 px-5 text-sm font-bold text-white hover:bg-emerald-600 transition-colors cursor-pointer" data-interest="Step-Up SIP Wealth Strategy">
              ${renderIcon('sparkles', 'size-4')}
              <span>Plan an Annual Step-Up Strategy</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  // 3. Lump Sum View
  renderLumpSumView() {
    return `
      <div class="grid gap-8 lg:grid-cols-[1fr_1fr]" id="calc-workspace">
        <div class="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div class="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <p class="text-[0.68rem] font-bold uppercase tracking-wider text-[#d97706]">Capital Deployment</p>
              <h3 class="text-xl font-bold text-[#0a192f] font-heading">Lump Sum Calculator</h3>
            </div>
            <span class="grid size-10 place-items-center rounded-xl bg-blue-50 text-blue-600">
              ${renderIcon('coins', 'size-5')}
            </span>
          </div>

          <div class="mt-6 space-y-6">
            <div>
              <div class="flex justify-between text-sm font-semibold mb-2">
                <span class="text-slate-600">Initial Investment Capital</span>
                <span class="font-mono text-[#059669] font-bold text-base" id="lump-principal-label">₹10,00,000</span>
              </div>
              <input type="range" id="lump-principal" min="50000" max="5000000" step="50000" value="1000000" class="w-full accent-[#059669] cursor-pointer">
            </div>

            <div>
              <div class="flex justify-between text-sm font-semibold mb-2">
                <span class="text-slate-600">Investment Horizon (Years)</span>
                <span class="font-mono text-[#059669] font-bold text-base" id="lump-years-label">10 Years</span>
              </div>
              <input type="range" id="lump-years" min="1" max="25" step="1" value="10" class="w-full accent-[#059669] cursor-pointer">
            </div>

            <div>
              <div class="flex justify-between text-sm font-semibold mb-2">
                <span class="text-slate-600">Expected Annual Return (% p.a.)</span>
                <span class="font-mono text-[#059669] font-bold text-base" id="lump-rate-label">12%</span>
              </div>
              <input type="range" id="lump-rate" min="4" max="22" step="0.5" value="12" class="w-full accent-[#059669] cursor-pointer">
            </div>
          </div>
        </div>

        <div class="rounded-3xl bg-gradient-to-br from-[#0a192f] to-[#071526] p-6 sm:p-8 text-white flex flex-col justify-between shadow-xl">
          <div>
            <div class="flex items-center justify-between border-b border-white/10 pb-4">
              <span class="text-[0.68rem] font-bold uppercase tracking-wider text-emerald-300">Lump Sum Growth</span>
              <span class="text-xs text-slate-400">Power of Time</span>
            </div>

            <div class="mt-8 space-y-4">
              <div class="rounded-2xl bg-white/5 p-4 border border-white/10">
                <p class="text-xs text-slate-400">Invested Principal</p>
                <p class="mt-1 font-mono text-2xl font-bold text-white" id="lump-invested-res">₹10,00,000</p>
              </div>

              <div class="rounded-2xl bg-white/5 p-4 border border-white/10">
                <p class="text-xs text-slate-400">Estimated Capital Growth</p>
                <p class="mt-1 font-mono text-2xl font-bold text-[#86efac]" id="lump-gain-res">₹21,05,848</p>
              </div>

              <div class="rounded-2xl bg-emerald-500/10 p-5 border border-emerald-500/30">
                <p class="text-xs uppercase tracking-wider text-emerald-200 font-semibold">Total Estimated Value</p>
                <p class="mt-1 font-mono text-3xl font-extrabold text-white" id="lump-maturity-res">₹31,05,848</p>
              </div>
            </div>
          </div>

          <div class="mt-8 pt-6 border-t border-white/10">
            <button type="button" class="btn-consultation w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#059669] py-3 px-5 text-sm font-bold text-white hover:bg-emerald-600 transition-colors cursor-pointer" data-interest="Lump Sum Deployment Strategy">
              ${renderIcon('coins', 'size-4')}
              <span>Discuss Surplus Deployment Options</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  // 4. CAGR View
  renderCAGRView() {
    return `
      <div class="grid gap-8 lg:grid-cols-[1fr_1fr]" id="calc-workspace">
        <div class="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div class="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <p class="text-[0.68rem] font-bold uppercase tracking-wider text-[#d97706]">Performance Metric</p>
              <h3 class="text-xl font-bold text-[#0a192f] font-heading">CAGR (Compound Annual Growth Rate)</h3>
            </div>
            <span class="grid size-10 place-items-center rounded-xl bg-purple-50 text-purple-600">
              ${renderIcon('percent', 'size-5')}
            </span>
          </div>

          <div class="mt-6 space-y-6">
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Initial Portfolio / Investment Value (₹)</label>
              <input type="number" id="cagr-initial" value="500000" min="1000" step="1000" class="w-full rounded-xl border border-slate-300 p-3 font-mono text-slate-800 focus:border-[#059669] focus:outline-none">
            </div>

            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Final Target / Realised Value (₹)</label>
              <input type="number" id="cagr-final" value="1250000" min="1000" step="1000" class="w-full rounded-xl border border-slate-300 p-3 font-mono text-slate-800 focus:border-[#059669] focus:outline-none">
            </div>

            <div>
              <div class="flex justify-between text-sm font-semibold mb-2">
                <span class="text-slate-600">Tenure (Years)</span>
                <span class="font-mono text-[#059669] font-bold text-base" id="cagr-years-label">5 Years</span>
              </div>
              <input type="range" id="cagr-years" min="1" max="25" step="0.5" value="5" class="w-full accent-[#059669] cursor-pointer">
            </div>
          </div>
        </div>

        <div class="rounded-3xl bg-gradient-to-br from-[#0a192f] to-[#071526] p-6 sm:p-8 text-white flex flex-col justify-between shadow-xl">
          <div>
            <div class="flex items-center justify-between border-b border-white/10 pb-4">
              <span class="text-[0.68rem] font-bold uppercase tracking-wider text-emerald-300">Annualized Result</span>
              <span class="text-xs text-slate-400">CAGR Calculation</span>
            </div>

            <div class="mt-8 space-y-4">
              <div class="rounded-2xl bg-emerald-500/10 p-5 border border-emerald-500/30">
                <p class="text-xs uppercase tracking-wider text-emerald-200 font-semibold">Compound Annual Growth Rate</p>
                <p class="mt-1 font-mono text-4xl font-extrabold text-[#86efac]" id="cagr-rate-res">20.11%</p>
              </div>

              <div class="rounded-2xl bg-white/5 p-4 border border-white/10">
                <p class="text-xs text-slate-400">Total Absolute Gain</p>
                <p class="mt-1 font-mono text-2xl font-bold text-white" id="cagr-gain-res">₹7,50,000</p>
              </div>

              <div class="rounded-2xl bg-white/5 p-4 border border-white/10">
                <p class="text-xs text-slate-400">Total Absolute Return Percentage</p>
                <p class="mt-1 font-mono text-2xl font-bold text-slate-200" id="cagr-pct-res">150.00%</p>
              </div>
            </div>
          </div>

          <div class="mt-8 pt-6 border-t border-white/10">
            <button type="button" class="btn-consultation w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#059669] py-3 px-5 text-sm font-bold text-white hover:bg-emerald-600 transition-colors cursor-pointer" data-interest="Portfolio CAGR & Review">
              ${renderIcon('activity', 'size-4')}
              <span>Request a Comprehensive Portfolio Review</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  // 5. XIRR View
  renderXIRRView() {
    return `
      <div class="grid gap-8 lg:grid-cols-[1fr_1fr]" id="calc-workspace">
        <div class="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div class="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <p class="text-[0.68rem] font-bold uppercase tracking-wider text-[#d97706]">Portfolio Analytics</p>
              <h3 class="text-xl font-bold text-[#0a192f] font-heading">XIRR (Internal Rate of Return)</h3>
            </div>
            <span class="grid size-10 place-items-center rounded-xl bg-teal-50 text-teal-600">
              ${renderIcon('activity', 'size-5')}
            </span>
          </div>

          <div class="mt-6 space-y-4">
            <p class="text-xs text-slate-500">Calculate exact annualized returns for staggered cash flows across different investment years.</p>
            <div id="xirr-cashflow-rows" class="space-y-3">
              <div class="grid grid-cols-2 gap-3 items-center">
                <span class="text-xs font-semibold text-slate-700">Year 0 (Initial Investment):</span>
                <input type="number" id="xirr-cf-0" value="-500000" class="rounded-lg border border-slate-300 p-2 font-mono text-sm" placeholder="-₹ Amount">
              </div>
              <div class="grid grid-cols-2 gap-3 items-center">
                <span class="text-xs font-semibold text-slate-700">Year 1 Inflow/Outflow:</span>
                <input type="number" id="xirr-cf-1" value="-200000" class="rounded-lg border border-slate-300 p-2 font-mono text-sm" placeholder="-₹ Amount">
              </div>
              <div class="grid grid-cols-2 gap-3 items-center">
                <span class="text-xs font-semibold text-slate-700">Year 2 Inflow/Outflow:</span>
                <input type="number" id="xirr-cf-2" value="-200000" class="rounded-lg border border-slate-300 p-2 font-mono text-sm" placeholder="-₹ Amount">
              </div>
              <div class="grid grid-cols-2 gap-3 items-center">
                <span class="text-xs font-semibold text-slate-700">Year 3 Current Valuation:</span>
                <input type="number" id="xirr-cf-3" value="1250000" class="rounded-lg border border-slate-300 p-2 font-mono text-sm" placeholder="+₹ Value">
              </div>
            </div>
            <p class="text-[0.7rem] text-slate-400">Note: Use negative values for investments/outflows and positive for redemptions/current valuation.</p>
          </div>
        </div>

        <div class="rounded-3xl bg-gradient-to-br from-[#0a192f] to-[#071526] p-6 sm:p-8 text-white flex flex-col justify-between shadow-xl">
          <div>
            <div class="flex items-center justify-between border-b border-white/10 pb-4">
              <span class="text-[0.68rem] font-bold uppercase tracking-wider text-emerald-300">Annualized XIRR</span>
              <span class="text-xs text-slate-400">Multi-Period Metric</span>
            </div>

            <div class="mt-8 space-y-4">
              <div class="rounded-2xl bg-emerald-500/10 p-5 border border-emerald-500/30">
                <p class="text-xs uppercase tracking-wider text-emerald-200 font-semibold">Calculated Annualized XIRR</p>
                <p class="mt-1 font-mono text-4xl font-extrabold text-[#86efac]" id="xirr-rate-res">14.85%</p>
              </div>

              <div class="rounded-2xl bg-white/5 p-4 border border-white/10">
                <p class="text-xs text-slate-400">Net Invested Capital</p>
                <p class="mt-1 font-mono text-xl font-bold text-white" id="xirr-invested-res">₹9,00,000</p>
              </div>

              <div class="rounded-2xl bg-white/5 p-4 border border-white/10">
                <p class="text-xs text-slate-400">Net Realized / Current Value</p>
                <p class="mt-1 font-mono text-xl font-bold text-slate-200" id="xirr-valuation-res">₹12,50,000</p>
              </div>
            </div>
          </div>

          <div class="mt-8 pt-6 border-t border-white/10">
            <button type="button" class="btn-consultation w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#059669] py-3 px-5 text-sm font-bold text-white hover:bg-emerald-600 transition-colors cursor-pointer" data-interest="XIRR & Investment Audit">
              ${renderIcon('file-text', 'size-4')}
              <span>Audit My Portfolio Return Metrics</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  // 6. Retirement View
  renderRetirementView() {
    return `
      <div class="grid gap-8 lg:grid-cols-[1fr_1fr]" id="calc-workspace">
        <div class="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div class="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <p class="text-[0.68rem] font-bold uppercase tracking-wider text-[#d97706]">Financial Independence</p>
              <h3 class="text-xl font-bold text-[#0a192f] font-heading">Retirement Planning Calculator</h3>
            </div>
            <span class="grid size-10 place-items-center rounded-xl bg-emerald-50 text-[#059669]">
              ${renderIcon('landmark', 'size-5')}
            </span>
          </div>

          <div class="mt-6 space-y-5">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">Current Age</label>
                <input type="number" id="ret-current-age" value="32" min="18" max="65" class="w-full rounded-xl border border-slate-300 p-2.5 font-mono">
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">Retirement Age</label>
                <input type="number" id="ret-retire-age" value="58" min="30" max="75" class="w-full rounded-xl border border-slate-300 p-2.5 font-mono">
              </div>
            </div>

            <div>
              <div class="flex justify-between text-sm font-semibold mb-2">
                <span class="text-slate-600">Current Monthly Expenses (₹)</span>
                <span class="font-mono text-[#059669] font-bold text-base" id="ret-exp-label">₹75,000</span>
              </div>
              <input type="range" id="ret-exp" min="20000" max="300000" step="5000" value="75000" class="w-full accent-[#059669] cursor-pointer">
            </div>

            <div>
              <div class="flex justify-between text-sm font-semibold mb-2">
                <span class="text-slate-600">Expected Inflation (% p.a.)</span>
                <span class="font-mono text-[#059669] font-bold text-base" id="ret-inf-label">6%</span>
              </div>
              <input type="range" id="ret-inf" min="4" max="10" step="0.5" value="6" class="w-full accent-[#059669] cursor-pointer">
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">Pre-Retirement Return (%)</label>
                <input type="number" id="ret-pre-return" value="12" step="0.5" class="w-full rounded-xl border border-slate-300 p-2.5 font-mono">
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">Post-Retirement Return (%)</label>
                <input type="number" id="ret-post-return" value="8" step="0.5" class="w-full rounded-xl border border-slate-300 p-2.5 font-mono">
              </div>
            </div>
          </div>
        </div>

        <div class="rounded-3xl bg-gradient-to-br from-[#0a192f] to-[#071526] p-6 sm:p-8 text-white flex flex-col justify-between shadow-xl">
          <div>
            <div class="flex items-center justify-between border-b border-white/10 pb-4">
              <span class="text-[0.68rem] font-bold uppercase tracking-wider text-emerald-300">Retirement Blueprint</span>
              <span class="text-xs text-slate-400">Lifelong Security</span>
            </div>

            <div class="mt-8 space-y-4">
              <div class="rounded-2xl bg-white/5 p-4 border border-white/10">
                <p class="text-xs text-slate-400">Future Monthly Expense at Retirement</p>
                <p class="mt-1 font-mono text-2xl font-bold text-white" id="ret-monthly-exp-res">₹3,41,200</p>
              </div>

              <div class="rounded-2xl bg-emerald-500/10 p-5 border border-emerald-500/30">
                <p class="text-xs uppercase tracking-wider text-emerald-200 font-semibold">Total Target Retirement Corpus Needed</p>
                <p class="mt-1 font-mono text-3xl font-extrabold text-white" id="ret-corpus-res">₹8,45,60,000</p>
              </div>

              <div class="rounded-2xl bg-amber-500/10 p-4 border border-amber-500/30">
                <p class="text-xs text-amber-200">Recommended Monthly SIP Starting Today</p>
                <p class="mt-1 font-mono text-2xl font-bold text-[#d97706]" id="ret-sip-res">₹38,200 / mo</p>
              </div>
            </div>
          </div>

          <div class="mt-8 pt-6 border-t border-white/10">
            <button type="button" class="btn-consultation w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#059669] py-3 px-5 text-sm font-bold text-white hover:bg-emerald-600 transition-colors cursor-pointer" data-interest="Personalised Retirement Architecture">
              ${renderIcon('landmark', 'size-4')}
              <span>Structure My Retirement Plan</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  // 7. Goal Planning View
  renderGoalView() {
    return `
      <div class="grid gap-8 lg:grid-cols-[1fr_1fr]" id="calc-workspace">
        <div class="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div class="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <p class="text-[0.68rem] font-bold uppercase tracking-wider text-[#d97706]">Milestone Planning</p>
              <h3 class="text-xl font-bold text-[#0a192f] font-heading">Goal Planning Calculator</h3>
            </div>
            <span class="grid size-10 place-items-center rounded-xl bg-rose-50 text-rose-600">
              ${renderIcon('target', 'size-5')}
            </span>
          </div>

          <div class="mt-6 space-y-6">
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Target Goal Cost in Today’s Value (₹)</label>
              <input type="number" id="goal-amount" value="5000000" min="50000" step="50000" class="w-full rounded-xl border border-slate-300 p-3 font-mono text-slate-800">
              <span class="text-xs text-slate-400 mt-1 block">e.g. Higher education, house purchase, starting a business</span>
            </div>

            <div>
              <div class="flex justify-between text-sm font-semibold mb-2">
                <span class="text-slate-600">Time Horizon (Years)</span>
                <span class="font-mono text-[#059669] font-bold text-base" id="goal-years-label">10 Years</span>
              </div>
              <input type="range" id="goal-years" min="1" max="25" step="1" value="10" class="w-full accent-[#059669] cursor-pointer">
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">Expected Inflation (%)</label>
                <input type="number" id="goal-inf" value="6" step="0.5" class="w-full rounded-xl border border-slate-300 p-2.5 font-mono">
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">Expected Return (%)</label>
                <input type="number" id="goal-return" value="12" step="0.5" class="w-full rounded-xl border border-slate-300 p-2.5 font-mono">
              </div>
            </div>
          </div>
        </div>

        <div class="rounded-3xl bg-gradient-to-br from-[#0a192f] to-[#071526] p-6 sm:p-8 text-white flex flex-col justify-between shadow-xl">
          <div>
            <div class="flex items-center justify-between border-b border-white/10 pb-4">
              <span class="text-[0.68rem] font-bold uppercase tracking-wider text-emerald-300">Target Requirements</span>
              <span class="text-xs text-slate-400">Milestone Strategy</span>
            </div>

            <div class="mt-8 space-y-4">
              <div class="rounded-2xl bg-white/5 p-4 border border-white/10">
                <p class="text-xs text-slate-400">Inflation-Adjusted Future Goal Cost</p>
                <p class="mt-1 font-mono text-2xl font-bold text-white" id="goal-future-res">₹89,54,238</p>
              </div>

              <div class="rounded-2xl bg-emerald-500/10 p-5 border border-emerald-500/30">
                <p class="text-xs uppercase tracking-wider text-emerald-200 font-semibold">Monthly SIP Required</p>
                <p class="mt-1 font-mono text-3xl font-extrabold text-[#86efac]" id="goal-sip-res">₹38,540 / mo</p>
              </div>

              <div class="rounded-2xl bg-white/5 p-4 border border-white/10">
                <p class="text-xs text-slate-400">Or Single Lump Sum Investment Today</p>
                <p class="mt-1 font-mono text-xl font-bold text-slate-200" id="goal-lump-res">₹28,82,900</p>
              </div>
            </div>
          </div>

          <div class="mt-8 pt-6 border-t border-white/10">
            <button type="button" class="btn-consultation w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#059669] py-3 px-5 text-sm font-bold text-white hover:bg-emerald-600 transition-colors cursor-pointer" data-interest="Family Goal Architecture">
              ${renderIcon('target', 'size-4')}
              <span>Align Portfolio to Milestone</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  // 8. Inflation View
  renderInflationView() {
    return `
      <div class="grid gap-8 lg:grid-cols-[1fr_1fr]" id="calc-workspace">
        <div class="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div class="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <p class="text-[0.68rem] font-bold uppercase tracking-wider text-[#d97706]">Purchasing Power</p>
              <h3 class="text-xl font-bold text-[#0a192f] font-heading">Inflation Impact Calculator</h3>
            </div>
            <span class="grid size-10 place-items-center rounded-xl bg-red-50 text-red-600">
              ${renderIcon('shield-check', 'size-5')}
            </span>
          </div>

          <div class="mt-6 space-y-6">
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Current Annual Living Expense / Cost (₹)</label>
              <input type="number" id="inf-amount" value="1200000" min="100000" step="50000" class="w-full rounded-xl border border-slate-300 p-3 font-mono text-slate-800">
            </div>

            <div>
              <div class="flex justify-between text-sm font-semibold mb-2">
                <span class="text-slate-600">Time Horizon (Years)</span>
                <span class="font-mono text-[#059669] font-bold text-base" id="inf-years-label">15 Years</span>
              </div>
              <input type="range" id="inf-years" min="1" max="30" step="1" value="15" class="w-full accent-[#059669] cursor-pointer">
            </div>

            <div>
              <div class="flex justify-between text-sm font-semibold mb-2">
                <span class="text-slate-600">Expected Annual Inflation Rate (%)</span>
                <span class="font-mono text-[#059669] font-bold text-base" id="inf-rate-label">6.5%</span>
              </div>
              <input type="range" id="inf-rate" min="3" max="12" step="0.5" value="6.5" class="w-full accent-[#059669] cursor-pointer">
            </div>
          </div>
        </div>

        <div class="rounded-3xl bg-gradient-to-br from-[#0a192f] to-[#071526] p-6 sm:p-8 text-white flex flex-col justify-between shadow-xl">
          <div>
            <div class="flex items-center justify-between border-b border-white/10 pb-4">
              <span class="text-[0.68rem] font-bold uppercase tracking-wider text-emerald-300">Purchasing Power Erosion</span>
              <span class="text-xs text-slate-400">Silent Wealth Killer</span>
            </div>

            <div class="mt-8 space-y-4">
              <div class="rounded-2xl bg-white/5 p-4 border border-white/10">
                <p class="text-xs text-slate-400">Cost in Future for the Same Lifestyle</p>
                <p class="mt-1 font-mono text-3xl font-bold text-[#86efac]" id="inf-future-res">₹30,86,134</p>
              </div>

              <div class="rounded-2xl bg-red-500/10 p-5 border border-red-500/30">
                <p class="text-xs uppercase tracking-wider text-red-300 font-semibold">Purchasing Power Loss of Cash</p>
                <p class="mt-1 font-mono text-3xl font-extrabold text-red-200" id="inf-loss-res">61.1%</p>
              </div>

              <div class="rounded-2xl bg-white/5 p-4 border border-white/10">
                <p class="text-xs text-slate-400">Expense Multiplier Factor</p>
                <p class="mt-1 font-mono text-xl font-bold text-slate-200" id="inf-mult-res">2.6x increase</p>
              </div>
            </div>
          </div>

          <div class="mt-8 pt-6 border-t border-white/10">
            <button type="button" class="btn-consultation w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#059669] py-3 px-5 text-sm font-bold text-white hover:bg-emerald-600 transition-colors cursor-pointer" data-interest="Inflation-Beating Portfolio Allocation">
              ${renderIcon('shield', 'size-4')}
              <span>Protect Purchasing Power with Equity & Real Assets</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  // 9. EMI View
  renderEMIView() {
    return `
      <div class="grid gap-8 lg:grid-cols-[1fr_1fr]" id="calc-workspace">
        <div class="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div class="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <p class="text-[0.68rem] font-bold uppercase tracking-wider text-[#d97706]">Debt & Liability</p>
              <h3 class="text-xl font-bold text-[#0a192f] font-heading">Loan EMI Calculator</h3>
            </div>
            <span class="grid size-10 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
              ${renderIcon('calculator', 'size-5')}
            </span>
          </div>

          <div class="mt-6 space-y-6">
            <div>
              <div class="flex justify-between text-sm font-semibold mb-2">
                <span class="text-slate-600">Loan Amount (₹)</span>
                <span class="font-mono text-[#059669] font-bold text-base" id="emi-principal-label">₹50,00,000</span>
              </div>
              <input type="range" id="emi-principal" min="100000" max="20000000" step="100000" value="5000000" class="w-full accent-[#059669] cursor-pointer">
            </div>

            <div>
              <div class="flex justify-between text-sm font-semibold mb-2">
                <span class="text-slate-600">Interest Rate (% p.a.)</span>
                <span class="font-mono text-[#059669] font-bold text-base" id="emi-rate-label">8.75%</span>
              </div>
              <input type="range" id="emi-rate" min="5" max="18" step="0.25" value="8.75" class="w-full accent-[#059669] cursor-pointer">
            </div>

            <div>
              <div class="flex justify-between text-sm font-semibold mb-2">
                <span class="text-slate-600">Tenure (Years)</span>
                <span class="font-mono text-[#059669] font-bold text-base" id="emi-years-label">20 Years</span>
              </div>
              <input type="range" id="emi-years" min="1" max="30" step="1" value="20" class="w-full accent-[#059669] cursor-pointer">
            </div>
          </div>
        </div>

        <div class="rounded-3xl bg-gradient-to-br from-[#0a192f] to-[#071526] p-6 sm:p-8 text-white flex flex-col justify-between shadow-xl">
          <div>
            <div class="flex items-center justify-between border-b border-white/10 pb-4">
              <span class="text-[0.68rem] font-bold uppercase tracking-wider text-emerald-300">Repayment Structure</span>
              <span class="text-xs text-slate-400">Monthly Commitment</span>
            </div>

            <div class="mt-8 space-y-4">
              <div class="rounded-2xl bg-emerald-500/10 p-5 border border-emerald-500/30">
                <p class="text-xs uppercase tracking-wider text-emerald-200 font-semibold">Monthly Loan EMI</p>
                <p class="mt-1 font-mono text-3xl font-extrabold text-[#86efac]" id="emi-amount-res">₹44,186</p>
              </div>

              <div class="rounded-2xl bg-white/5 p-4 border border-white/10">
                <p class="text-xs text-slate-400">Total Interest Payable</p>
                <p class="mt-1 font-mono text-2xl font-bold text-amber-300" id="emi-interest-res">₹56,04,534</p>
              </div>

              <div class="rounded-2xl bg-white/5 p-4 border border-white/10">
                <p class="text-xs text-slate-400">Total Payment (Principal + Interest)</p>
                <p class="mt-1 font-mono text-2xl font-bold text-white" id="emi-total-res">₹1,06,04,534</p>
              </div>
            </div>
          </div>

          <div class="mt-8 pt-6 border-t border-white/10">
            <button type="button" class="btn-consultation w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#059669] py-3 px-5 text-sm font-bold text-white hover:bg-emerald-600 transition-colors cursor-pointer" data-interest="Loan Prepayment vs SIP Investing">
              ${renderIcon('calculator', 'size-4')}
              <span>Evaluate Loan Prepayment vs Investment Arbitrage</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  // Attach live reactive listeners based on the current active tab
  bindEvents() {
    // Tab switching
    document.querySelectorAll('[data-calc-tab]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.getAttribute('data-calc-tab');
        if (tab && tab !== this.activeTab) {
          this.activeTab = tab;
          const container = document.getElementById('calc-container');
          if (container) {
            container.innerHTML = `
              ${this.renderTabs()}
              <div class="mt-8">${this.renderActiveCalculator()}</div>
            `;
            this.bindEvents();
          }
        }
      });
    });

    // 1. SIP Bindings
    if (this.activeTab === 'sip') {
      const monthly = document.getElementById('sip-monthly');
      const years = document.getElementById('sip-years');
      const rate = document.getElementById('sip-rate');

      const updateSIP = () => {
        if (!monthly || !years || !rate) return;
        const m = Number(monthly.value);
        const y = Number(years.value);
        const r = Number(rate.value);

        document.getElementById('sip-monthly-label').textContent = CalculatorEngine.formatCurrency(m);
        document.getElementById('sip-years-label').textContent = `${y} Years`;
        document.getElementById('sip-rate-label').textContent = `${r}%`;

        const res = CalculatorEngine.calcSIP(m, y, r);
        document.getElementById('sip-invested-res').textContent = CalculatorEngine.formatCurrency(res.invested);
        document.getElementById('sip-gain-res').textContent = CalculatorEngine.formatCurrency(res.gain);
        document.getElementById('sip-maturity-res').textContent = CalculatorEngine.formatCurrency(res.maturity, true);
      };

      if (monthly) monthly.addEventListener('input', updateSIP);
      if (years) years.addEventListener('input', updateSIP);
      if (rate) rate.addEventListener('input', updateSIP);
      updateSIP();
    }

    // 2. Step-Up Bindings
    if (this.activeTab === 'stepup') {
      const monthly = document.getElementById('step-monthly');
      const stepRate = document.getElementById('step-rate');
      const years = document.getElementById('step-years');
      const returnRate = document.getElementById('step-return');

      const updateStep = () => {
        if (!monthly || !stepRate || !years || !returnRate) return;
        const m = Number(monthly.value);
        const s = Number(stepRate.value);
        const y = Number(years.value);
        const r = Number(returnRate.value);

        document.getElementById('step-monthly-label').textContent = CalculatorEngine.formatCurrency(m);
        document.getElementById('step-rate-label').textContent = `${s}%`;
        document.getElementById('step-years-label').textContent = `${y} Years`;
        document.getElementById('step-return-label').textContent = `${r}%`;

        const res = CalculatorEngine.calcStepUpSIP(m, s, y, r);
        document.getElementById('step-invested-res').textContent = CalculatorEngine.formatCurrency(res.invested);
        document.getElementById('step-maturity-res').textContent = CalculatorEngine.formatCurrency(res.maturity, true);
        document.getElementById('step-extra-res').textContent = `+ ${CalculatorEngine.formatCurrency(res.extraWealth, true)}`;
      };

      if (monthly) monthly.addEventListener('input', updateStep);
      if (stepRate) stepRate.addEventListener('input', updateStep);
      if (years) years.addEventListener('input', updateStep);
      if (returnRate) returnRate.addEventListener('input', updateStep);
      updateStep();
    }

    // 3. Lump Sum Bindings
    if (this.activeTab === 'lumpsum') {
      const p = document.getElementById('lump-principal');
      const y = document.getElementById('lump-years');
      const r = document.getElementById('lump-rate');

      const updateLump = () => {
        if (!p || !y || !r) return;
        const principal = Number(p.value);
        const years = Number(y.value);
        const rate = Number(r.value);

        document.getElementById('lump-principal-label').textContent = CalculatorEngine.formatCurrency(principal);
        document.getElementById('lump-years-label').textContent = `${years} Years`;
        document.getElementById('lump-rate-label').textContent = `${rate}%`;

        const res = CalculatorEngine.calcLumpSum(principal, years, rate);
        document.getElementById('lump-invested-res').textContent = CalculatorEngine.formatCurrency(res.invested);
        document.getElementById('lump-gain-res').textContent = CalculatorEngine.formatCurrency(res.gain);
        document.getElementById('lump-maturity-res').textContent = CalculatorEngine.formatCurrency(res.maturity, true);
      };

      if (p) p.addEventListener('input', updateLump);
      if (y) y.addEventListener('input', updateLump);
      if (r) r.addEventListener('input', updateLump);
      updateLump();
    }

    // 4. CAGR Bindings
    if (this.activeTab === 'cagr') {
      const initial = document.getElementById('cagr-initial');
      const finalVal = document.getElementById('cagr-final');
      const years = document.getElementById('cagr-years');

      const updateCAGR = () => {
        if (!initial || !finalVal || !years) return;
        const init = Number(initial.value) || 1;
        const fin = Number(finalVal.value) || 1;
        const y = Number(years.value) || 1;

        document.getElementById('cagr-years-label').textContent = `${y} Years`;

        const res = CalculatorEngine.calcCAGR(init, fin, y);
        document.getElementById('cagr-rate-res').textContent = CalculatorEngine.formatPercent(res.cagr);
        document.getElementById('cagr-gain-res').textContent = CalculatorEngine.formatCurrency(res.absoluteGain);
        document.getElementById('cagr-pct-res').textContent = CalculatorEngine.formatPercent(res.absolutePercent);
      };

      if (initial) initial.addEventListener('input', updateCAGR);
      if (finalVal) finalVal.addEventListener('input', updateCAGR);
      if (years) years.addEventListener('input', updateCAGR);
      updateCAGR();
    }

    // 5. XIRR Bindings
    if (this.activeTab === 'xirr') {
      const cf0 = document.getElementById('xirr-cf-0');
      const cf1 = document.getElementById('xirr-cf-1');
      const cf2 = document.getElementById('xirr-cf-2');
      const cf3 = document.getElementById('xirr-cf-3');

      const updateXIRR = () => {
        if (!cf0 || !cf1 || !cf2 || !cf3) return;
        const v0 = Number(cf0.value) || 0;
        const v1 = Number(cf1.value) || 0;
        const v2 = Number(cf2.value) || 0;
        const v3 = Number(cf3.value) || 0;

        const cashFlows = [
          { year: 0, amount: v0 },
          { year: 1, amount: v1 },
          { year: 2, amount: v2 },
          { year: 3, amount: v3 }
        ];

        const rate = CalculatorEngine.calcXIRR(cashFlows);
        const totalInvested = Math.abs(Math.min(0, v0) + Math.min(0, v1) + Math.min(0, v2));

        document.getElementById('xirr-rate-res').textContent = `${rate}%`;
        document.getElementById('xirr-invested-res').textContent = CalculatorEngine.formatCurrency(totalInvested);
        document.getElementById('xirr-valuation-res').textContent = CalculatorEngine.formatCurrency(v3);
      };

      [cf0, cf1, cf2, cf3].forEach(input => {
        if (input) input.addEventListener('input', updateXIRR);
      });
      updateXIRR();
    }

    // 6. Retirement Bindings
    if (this.activeTab === 'retirement') {
      const curAge = document.getElementById('ret-current-age');
      const retAge = document.getElementById('ret-retire-age');
      const exp = document.getElementById('ret-exp');
      const inf = document.getElementById('ret-inf');
      const preRet = document.getElementById('ret-pre-return');
      const postRet = document.getElementById('ret-post-return');

      const updateRet = () => {
        if (!curAge || !retAge || !exp || !inf || !preRet || !postRet) return;
        const ca = Number(curAge.value) || 30;
        const ra = Number(retAge.value) || 60;
        const expenses = Number(exp.value) || 50000;
        const inflation = Number(inf.value) || 6;
        const pre = Number(preRet.value) || 12;
        const post = Number(postRet.value) || 8;

        document.getElementById('ret-exp-label').textContent = CalculatorEngine.formatCurrency(expenses);
        document.getElementById('ret-inf-label').textContent = `${inflation}%`;

        const res = CalculatorEngine.calcRetirement(ca, ra, expenses, inflation, pre, post);
        document.getElementById('ret-monthly-exp-res').textContent = `${CalculatorEngine.formatCurrency(res.futureMonthlyExpense)} / mo`;
        document.getElementById('ret-corpus-res').textContent = CalculatorEngine.formatCurrency(res.requiredCorpus, true);
        document.getElementById('ret-sip-res').textContent = `${CalculatorEngine.formatCurrency(res.requiredSIP)} / mo`;
      };

      [curAge, retAge, exp, inf, preRet, postRet].forEach(el => {
        if (el) el.addEventListener('input', updateRet);
      });
      updateRet();
    }

    // 7. Goal Bindings
    if (this.activeTab === 'goal') {
      const amount = document.getElementById('goal-amount');
      const years = document.getElementById('goal-years');
      const inf = document.getElementById('goal-inf');
      const ret = document.getElementById('goal-return');

      const updateGoal = () => {
        if (!amount || !years || !inf || !ret) return;
        const amt = Number(amount.value) || 1000000;
        const y = Number(years.value) || 10;
        const inflation = Number(inf.value) || 6;
        const r = Number(ret.value) || 12;

        document.getElementById('goal-years-label').textContent = `${y} Years`;

        const res = CalculatorEngine.calcGoal(amt, y, inflation, r);
        document.getElementById('goal-future-res').textContent = CalculatorEngine.formatCurrency(res.futureGoalCost, true);
        document.getElementById('goal-sip-res').textContent = `${CalculatorEngine.formatCurrency(res.monthlySIP)} / mo`;
        document.getElementById('goal-lump-res').textContent = CalculatorEngine.formatCurrency(res.lumpsumRequired, true);
      };

      [amount, years, inf, ret].forEach(el => {
        if (el) el.addEventListener('input', updateGoal);
      });
      updateGoal();
    }

    // 8. Inflation Bindings
    if (this.activeTab === 'inflation') {
      const amount = document.getElementById('inf-amount');
      const years = document.getElementById('inf-years');
      const rate = document.getElementById('inf-rate');

      const updateInf = () => {
        if (!amount || !years || !rate) return;
        const amt = Number(amount.value) || 1000000;
        const y = Number(years.value) || 15;
        const r = Number(rate.value) || 6.5;

        document.getElementById('inf-years-label').textContent = `${y} Years`;
        document.getElementById('inf-rate-label').textContent = `${r}%`;

        const res = CalculatorEngine.calcInflation(amt, y, r);
        document.getElementById('inf-future-res').textContent = CalculatorEngine.formatCurrency(res.futureCost, true);
        document.getElementById('inf-loss-res').textContent = `${res.purchasingPowerLoss}%`;
        document.getElementById('inf-mult-res').textContent = `${res.increaseMultiplier}x increase`;
      };

      [amount, years, rate].forEach(el => {
        if (el) el.addEventListener('input', updateInf);
      });
      updateInf();
    }

    // 9. EMI Bindings
    if (this.activeTab === 'emi') {
      const p = document.getElementById('emi-principal');
      const r = document.getElementById('emi-rate');
      const y = document.getElementById('emi-years');

      const updateEMI = () => {
        if (!p || !r || !y) return;
        const principal = Number(p.value) || 1000000;
        const rate = Number(r.value) || 8.5;
        const years = Number(y.value) || 15;

        document.getElementById('emi-principal-label').textContent = CalculatorEngine.formatCurrency(principal);
        document.getElementById('emi-rate-label').textContent = `${rate}%`;
        document.getElementById('emi-years-label').textContent = `${years} Years`;

        const res = CalculatorEngine.calcEMI(principal, rate, years);
        document.getElementById('emi-amount-res').textContent = `${CalculatorEngine.formatCurrency(res.emi)} / mo`;
        document.getElementById('emi-interest-res').textContent = CalculatorEngine.formatCurrency(res.totalInterest, true);
        document.getElementById('emi-total-res').textContent = CalculatorEngine.formatCurrency(res.totalPayment, true);
      };

      if (p) p.addEventListener('input', updateEMI);
      if (r) r.addEventListener('input', updateEMI);
      if (y) y.addEventListener('input', updateEMI);
      updateEMI();
    }
  }
};
