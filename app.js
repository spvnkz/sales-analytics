/**
 * SalesPulse Analytics Dashboard
 * Vanilla JavaScript implementation with WebStorage persistence
 */

(function () {
  'use strict';

  // --- Constants & Storage Keys ---
  const STORAGE_KEY = 'salespulse_analytics_data_v1';
  const TARGET_QUOTA = 180000; // $180,000 target

  // Seed sample data for first-time launch or reset
  const SEED_TRANSACTIONS = [
    { id: 'TX-10041', date: '2026-11-10', customer: 'Acme Global Inc', product: 'Enterprise Cloud Suite', category: 'Enterprise Software', region: 'North America', paymentMethod: 'Wire Transfer', units: 3, unitPrice: 3200, amount: 9600, status: 'Completed' },
    { id: 'TX-10040', date: '2026-11-09', customer: 'Vortex Technologies', product: 'DevOps Automation Pro', category: 'Developer Tools', region: 'Europe (EMEA)', paymentMethod: 'Credit Card', units: 5, unitPrice: 450, amount: 2250, status: 'Completed' },
    { id: 'TX-10039', date: '2026-11-08', customer: 'Helios Media Lab', product: 'Cloud Storage Appliance', category: 'Cloud Hardware', region: 'Asia Pacific', paymentMethod: 'Stripe', units: 2, unitPrice: 2800, amount: 5600, status: 'Completed' },
    { id: 'TX-10038', date: '2026-11-07', customer: 'Nexus Financials', product: 'CyberGuard Enterprise', category: 'Security Subscriptions', region: 'North America', paymentMethod: 'Wire Transfer', units: 1, unitPrice: 12500, amount: 12500, status: 'Completed' },
    { id: 'TX-10037', date: '2026-11-06', customer: 'Quantum Dynamics', product: 'Executive IT Consulting', category: 'Consulting & Training', region: 'Europe (EMEA)', paymentMethod: 'Purchase Order', units: 10, unitPrice: 350, amount: 3500, status: 'Pending' },
    { id: 'TX-10036', date: '2026-11-05', customer: 'Apex Biometrics', product: 'DevOps Automation Pro', category: 'Developer Tools', region: 'North America', paymentMethod: 'Credit Card', units: 4, unitPrice: 450, amount: 1800, status: 'Completed' },
    { id: 'TX-10035', date: '2026-11-03', customer: 'Horizon Logistics', product: 'Enterprise Cloud Suite', category: 'Enterprise Software', region: 'Latin America', paymentMethod: 'PayPal', units: 2, unitPrice: 3200, amount: 6400, status: 'Completed' },
    { id: 'TX-10034', date: '2026-11-02', customer: 'Starlight Retail', product: 'Cloud Storage Appliance', category: 'Cloud Hardware', region: 'Middle East', paymentMethod: 'Wire Transfer', units: 3, unitPrice: 2800, amount: 8400, status: 'Completed' },
    { id: 'TX-10033', date: '2026-11-01', customer: 'Summit Interactive', product: 'Executive IT Consulting', category: 'Consulting & Training', region: 'North America', paymentMethod: 'Stripe', units: 8, unitPrice: 350, amount: 2800, status: 'Completed' },
    { id: 'TX-10032', date: '2026-10-29', customer: 'Aurora Health Tech', product: 'CyberGuard Enterprise', category: 'Security Subscriptions', region: 'Europe (EMEA)', paymentMethod: 'Purchase Order', units: 1, unitPrice: 12500, amount: 12500, status: 'Completed' },
    { id: 'TX-10031', date: '2026-10-27', customer: 'PixelCraft Studio', product: 'DevOps Automation Pro', category: 'Developer Tools', region: 'Asia Pacific', paymentMethod: 'Credit Card', units: 3, unitPrice: 450, amount: 1350, status: 'Completed' },
    { id: 'TX-10030', date: '2026-10-25', customer: 'Elevate Robotics', product: 'Cloud Storage Appliance', category: 'Cloud Hardware', region: 'North America', paymentMethod: 'Wire Transfer', units: 4, unitPrice: 2800, amount: 11200, status: 'Completed' },
    { id: 'TX-10029', date: '2026-10-22', customer: 'Titanium Systems', product: 'Enterprise Cloud Suite', category: 'Enterprise Software', region: 'Europe (EMEA)', paymentMethod: 'Credit Card', units: 1, unitPrice: 3200, amount: 3200, status: 'Refunded' },
    { id: 'TX-10028', date: '2026-10-20', customer: 'Nordic Wave AB', product: 'Executive IT Consulting', category: 'Consulting & Training', region: 'Europe (EMEA)', paymentMethod: 'Wire Transfer', units: 15, unitPrice: 350, amount: 5250, status: 'Completed' },
    { id: 'TX-10027', date: '2026-10-18', customer: 'Bravura Media', product: 'CyberGuard Enterprise', category: 'Security Subscriptions', region: 'Latin America', paymentMethod: 'PayPal', units: 1, unitPrice: 12500, amount: 12500, status: 'Pending' },
    { id: 'TX-10026', date: '2026-10-15', customer: 'Oasis Energy Group', product: 'Cloud Storage Appliance', category: 'Cloud Hardware', region: 'Middle East', paymentMethod: 'Wire Transfer', units: 2, unitPrice: 2800, amount: 5600, status: 'Completed' },
    { id: 'TX-10025', date: '2026-10-12', customer: 'Cobalt Analytics', product: 'Enterprise Cloud Suite', category: 'Enterprise Software', region: 'Asia Pacific', paymentMethod: 'Stripe', units: 3, unitPrice: 3200, amount: 9600, status: 'Completed' },
    { id: 'TX-10024', date: '2026-10-09', customer: 'Solstice AI Labs', product: 'DevOps Automation Pro', category: 'Developer Tools', region: 'North America', paymentMethod: 'Credit Card', units: 6, unitPrice: 450, amount: 2700, status: 'Completed' },
    { id: 'TX-10023', date: '2026-10-05', customer: 'Alpha Bridge Capital', product: 'CyberGuard Enterprise', category: 'Security Subscriptions', region: 'North America', paymentMethod: 'Wire Transfer', units: 2, unitPrice: 12500, amount: 25000, status: 'Completed' },
    { id: 'TX-10022', date: '2026-10-02', customer: 'Zenith Architecture', product: 'Executive IT Consulting', category: 'Consulting & Training', region: 'Europe (EMEA)', paymentMethod: 'Purchase Order', units: 12, unitPrice: 350, amount: 4200, status: 'Completed' },
    { id: 'TX-10021', date: '2026-09-28', customer: 'Pacific Rim Goods', product: 'Cloud Storage Appliance', category: 'Cloud Hardware', region: 'Asia Pacific', paymentMethod: 'Stripe', units: 1, unitPrice: 2800, amount: 2800, status: 'Completed' },
    { id: 'TX-10020', date: '2026-09-24', customer: 'Vector BioSciences', product: 'Enterprise Cloud Suite', category: 'Enterprise Software', region: 'North America', paymentMethod: 'Credit Card', units: 2, unitPrice: 3200, amount: 6400, status: 'Completed' },
    { id: 'TX-10019', date: '2026-09-20', customer: 'Crestline Mobility', product: 'DevOps Automation Pro', category: 'Developer Tools', region: 'Europe (EMEA)', paymentMethod: 'Credit Card', units: 4, unitPrice: 450, amount: 1800, status: 'Pending' },
    { id: 'TX-10018', date: '2026-09-15', customer: 'Terra Green Sol', product: 'Executive IT Consulting', category: 'Consulting & Training', region: 'Latin America', paymentMethod: 'PayPal', units: 6, unitPrice: 350, amount: 2100, status: 'Completed' },
    { id: 'TX-10017', date: '2026-09-10', customer: 'Kyoto Advanced Labs', product: 'CyberGuard Enterprise', category: 'Security Subscriptions', region: 'Asia Pacific', paymentMethod: 'Wire Transfer', units: 1, unitPrice: 12500, amount: 12500, status: 'Completed' },
    { id: 'TX-10016', date: '2026-09-04', customer: 'Silverstone Auto', product: 'Cloud Storage Appliance', category: 'Cloud Hardware', region: 'Europe (EMEA)', paymentMethod: 'Purchase Order', units: 3, unitPrice: 2800, amount: 8400, status: 'Completed' },
    { id: 'TX-10015', date: '2026-08-28', customer: 'Vanguard Aerospace', product: 'Enterprise Cloud Suite', category: 'Enterprise Software', region: 'North America', paymentMethod: 'Wire Transfer', units: 4, unitPrice: 3200, amount: 12800, status: 'Completed' },
    { id: 'TX-10014', date: '2026-08-22', customer: 'Echo Media Network', product: 'DevOps Automation Pro', category: 'Developer Tools', region: 'North America', paymentMethod: 'Credit Card', units: 2, unitPrice: 450, amount: 900, status: 'Refunded' },
    { id: 'TX-10013', date: '2026-08-16', customer: 'Falcon Trading LLC', product: 'CyberGuard Enterprise', category: 'Security Subscriptions', region: 'Middle East', paymentMethod: 'Wire Transfer', units: 1, unitPrice: 12500, amount: 12500, status: 'Completed' },
    { id: 'TX-10012', date: '2026-08-11', customer: 'Evergreen Logistics', product: 'Executive IT Consulting', category: 'Consulting & Training', region: 'Asia Pacific', paymentMethod: 'Stripe', units: 5, unitPrice: 350, amount: 1750, status: 'Completed' },
    { id: 'TX-10011', date: '2026-08-04', customer: 'BlueShift Telecom', product: 'Cloud Storage Appliance', category: 'Cloud Hardware', region: 'North America', paymentMethod: 'Purchase Order', units: 2, unitPrice: 2800, amount: 5600, status: 'Completed' },
    { id: 'TX-10010', date: '2026-07-28', customer: 'Metric Minds Inc', product: 'Enterprise Cloud Suite', category: 'Enterprise Software', region: 'North America', paymentMethod: 'Credit Card', units: 2, unitPrice: 3200, amount: 6400, status: 'Completed' },
    { id: 'TX-10009', date: '2026-07-20', customer: 'Krypton Cyber Corp', product: 'CyberGuard Enterprise', category: 'Security Subscriptions', region: 'Europe (EMEA)', paymentMethod: 'Wire Transfer', units: 1, unitPrice: 12500, amount: 12500, status: 'Completed' },
    { id: 'TX-10008', date: '2026-07-12', customer: 'Prism Creative Co', product: 'DevOps Automation Pro', category: 'Developer Tools', region: 'Latin America', paymentMethod: 'PayPal', units: 3, unitPrice: 450, amount: 1350, status: 'Completed' },
    { id: 'TX-10007', date: '2026-06-25', customer: 'Global Shipways', product: 'Executive IT Consulting', category: 'Consulting & Training', region: 'Asia Pacific', paymentMethod: 'Purchase Order', units: 10, unitPrice: 350, amount: 3500, status: 'Completed' },
    { id: 'TX-10006', date: '2026-06-18', customer: 'Atlas Cloud Works', product: 'Enterprise Cloud Suite', category: 'Enterprise Software', region: 'North America', paymentMethod: 'Credit Card', units: 3, unitPrice: 3200, amount: 9600, status: 'Completed' },
    { id: 'TX-10005', date: '2026-06-08', customer: 'Desert Bloom Ventures', product: 'Cloud Storage Appliance', category: 'Cloud Hardware', region: 'Middle East', paymentMethod: 'Wire Transfer', units: 1, unitPrice: 2800, amount: 2800, status: 'Completed' },
    { id: 'TX-10004', date: '2026-05-22', customer: 'Cascade Systems', product: 'CyberGuard Enterprise', category: 'Security Subscriptions', region: 'North America', paymentMethod: 'Wire Transfer', units: 2, unitPrice: 12500, amount: 25000, status: 'Completed' },
    { id: 'TX-10003', date: '2026-05-14', customer: 'Lighthouse Tech', product: 'DevOps Automation Pro', category: 'Developer Tools', region: 'Europe (EMEA)', paymentMethod: 'Credit Card', units: 5, unitPrice: 450, amount: 2250, status: 'Completed' },
    { id: 'TX-10002', date: '2026-04-30', customer: 'AeroDynamics Ltd', product: 'Executive IT Consulting', category: 'Consulting & Training', region: 'Europe (EMEA)', paymentMethod: 'Stripe', units: 4, unitPrice: 350, amount: 1400, status: 'Completed' },
    { id: 'TX-10001', date: '2026-04-12', customer: 'Origin Bio Labs', product: 'Enterprise Cloud Suite', category: 'Enterprise Software', region: 'North America', paymentMethod: 'Credit Card', units: 1, unitPrice: 3200, amount: 3200, status: 'Completed' }
  ];

  const CATEGORY_COLORS = {
    'Enterprise Software': '#2563eb',       // Blue
    'Cloud Hardware': '#06b6d4',            // Cyan
    'Consulting & Training': '#8b5cf6',     // Purple
    'Security Subscriptions': '#10b981',    // Emerald
    'Developer Tools': '#f59e0b'            // Amber
  };

  const AVATAR_COLORS = [
    { bg: '#dbeafe', text: '#1e40af' },
    { bg: '#ede9fe', text: '#5b21b6' },
    { bg: '#d1fae5', text: '#065f46' },
    { bg: '#fef3c7', text: '#92400e' },
    { bg: '#fee2e2', text: '#991b1b' },
    { bg: '#cffafe', text: '#155e75' }
  ];

  // --- State ---
  let state = {
    transactions: [],
    timeRange: 'all', // 'all', 'year', 'quarter', 'month', 'week'
    searchQuery: '',
    categoryFilter: 'all',
    regionFilter: 'all',
    statusFilter: 'all',
    sortColumn: 'date',
    sortDirection: 'desc',
    currentPage: 1,
    pageSize: 10,
    deleteTargetId: null
  };

  // --- Storage Functions ---
  function loadData() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          state.transactions = parsed;
          return;
        }
      }
    } catch (e) {
      console.warn('Failed to parse localStorage data:', e);
    }
    // Fallback to initial seed data
    state.transactions = JSON.parse(JSON.stringify(SEED_TRANSACTIONS));
    saveData();
  }

  function saveData() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.transactions));
    } catch (e) {
      console.error('Error saving data to localStorage:', e);
      showToast('Error saving to WebStorage. Quota exceeded?', 'error');
    }
  }

  // --- Helper Date & Format Utils ---
  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }

  function formatCurrencyPrecise(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  }

  function formatDate(dateStr) {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const d = new Date(parts[0], parts[1] - 1, parts[2]);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    return dateStr;
  }

  function getInitials(name) {
    if (!name) return '??';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function getAvatarColor(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % AVATAR_COLORS.length;
    return AVATAR_COLORS[index];
  }

  // --- Filtering & Queries ---
  function getFilteredTransactions() {
    // 1. Time range filter
    const now = new Date('2026-11-12T08:54:00'); // Consistent baseline reference
    let list = state.transactions.filter(item => {
      if (state.timeRange === 'all') return true;
      const itemDate = new Date(item.date + 'T00:00:00');
      const diffDays = (now - itemDate) / (1000 * 60 * 60 * 24);

      if (state.timeRange === 'week') return diffDays >= 0 && diffDays <= 7;
      if (state.timeRange === 'month') return diffDays >= 0 && diffDays <= 30;
      if (state.timeRange === 'quarter') return diffDays >= 0 && diffDays <= 90;
      if (state.timeRange === 'year') return itemDate.getFullYear() === now.getFullYear();
      return true;
    });

    // 2. Search query filter
    const q = state.searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(item =>
        item.id.toLowerCase().includes(q) ||
        item.customer.toLowerCase().includes(q) ||
        item.product.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.region.toLowerCase().includes(q)
      );
    }

    // 3. Category filter
    if (state.categoryFilter !== 'all') {
      list = list.filter(item => item.category === state.categoryFilter);
    }

    // 4. Region filter
    if (state.regionFilter !== 'all') {
      list = list.filter(item => item.region === state.regionFilter);
    }

    // 5. Status filter
    if (state.statusFilter !== 'all') {
      list = list.filter(item => item.status === state.statusFilter);
    }

    // 6. Sorting
    list.sort((a, b) => {
      let valA = a[state.sortColumn];
      let valB = b[state.sortColumn];

      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();

      if (valA < valB) return state.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return state.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return list;
  }

  // --- KPI Updates ---
  function updateKPIs(transactions) {
    const validSales = transactions.filter(t => t.status !== 'Refunded');
    const totalRev = validSales.reduce((acc, t) => acc + Number(t.amount || 0), 0);
    const orderCount = validSales.length;
    const totalUnits = validSales.reduce((acc, t) => acc + Number(t.units || 1), 0);
    const aov = orderCount > 0 ? totalRev / orderCount : 0;
    const avgUnits = orderCount > 0 ? (totalUnits / orderCount).toFixed(1) : '0';

    // Estimated profit margin: 34.5%
    const estProfit = totalRev * 0.345;

    // Render KPI numbers
    document.getElementById('kpiRevenue').textContent = formatCurrency(totalRev);
    document.getElementById('kpiOrders').textContent = orderCount.toLocaleString();
    document.getElementById('kpiOrdersSub').textContent = `avg. ${avgUnits} units/order`;
    document.getElementById('kpiAOV').textContent = formatCurrencyPrecise(aov);
    document.getElementById('kpiProfit').textContent = formatCurrency(estProfit);

    // Target Progress
    const progressPercent = Math.min(100, Math.round((totalRev / TARGET_QUOTA) * 100));
    const targetRemaining = Math.max(0, TARGET_QUOTA - totalRev);

    const progressFill = document.getElementById('targetProgressFill');
    if (progressFill) progressFill.style.width = `${progressPercent}%`;

    const targetFraction = document.getElementById('targetFraction');
    if (targetFraction) targetFraction.textContent = `${formatCurrency(totalRev)} / $180k`;

    const targetPercentText = document.getElementById('targetPercentText');
    if (targetPercentText) targetPercentText.textContent = `${progressPercent}% of quota`;

    const targetRemainingText = document.getElementById('targetRemainingText');
    if (targetRemainingText) {
      targetRemainingText.textContent = targetRemaining > 0
        ? `${formatCurrency(targetRemaining)} remaining`
        : 'Quota achieved! 🎯';
    }
  }

  // --- Visual Charts Rendering ---
  // Setup canvas high-DPI scaling
  function setupCanvas(canvas) {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = rect.width || canvas.clientWidth || 300;
    const height = rect.height || canvas.clientHeight || 200;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);

    const ctx = canvas.getContext('2d');
    if (ctx.resetTransform) {
      ctx.resetTransform();
    } else {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    ctx.scale(dpr, dpr);
    return { ctx, width, height, dpr };
  }

  // Chart 1: Revenue & Profit Trend (Monthly / Daily Area Chart)
  let revenueChartDataPoints = []; // cached for tooltips

  function renderRevenueChart(transactions) {
    const canvas = document.getElementById('revenueTrendCanvas');
    if (!canvas) return;

    const { ctx, width, height } = setupCanvas(canvas);
    ctx.clearRect(0, 0, width, height);

    // Aggregate revenue by month
    const monthlyMap = {};
    const monthsOrder = ['Jun 26', 'Jul 26', 'Aug 26', 'Sep 26', 'Oct 26', 'Nov 26'];
    monthsOrder.forEach(m => { monthlyMap[m] = { revenue: 0, profit: 0, count: 0 }; });

    transactions.forEach(t => {
      if (t.status === 'Refunded') return;
      const d = new Date(t.date + 'T00:00:00');
      const label = d.toLocaleDateString('en-US', { month: 'short' }) + ' ' + String(d.getFullYear()).slice(-2);
      if (!monthlyMap[label]) {
        monthlyMap[label] = { revenue: 0, profit: 0, count: 0 };
      }
      monthlyMap[label].revenue += Number(t.amount || 0);
      monthlyMap[label].profit += Number(t.amount || 0) * 0.345;
      monthlyMap[label].count += 1;
    });

    const labels = Object.keys(monthlyMap);
    const revenueValues = labels.map(l => monthlyMap[l].revenue);
    const profitValues = labels.map(l => monthlyMap[l].profit);

    const maxVal = Math.max(...revenueValues, 10000);
    const padding = { top: 25, right: 30, bottom: 35, left: 55 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    // Draw horizontal grid lines & labels
    const gridLines = 4;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.font = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1;

    for (let i = 0; i <= gridLines; i++) {
      const y = padding.top + (chartH / gridLines) * i;
      const val = maxVal - (maxVal / gridLines) * i;

      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      const label = val >= 1000 ? `$${Math.round(val / 1000)}k` : `$${Math.round(val)}`;
      ctx.fillText(label, padding.left - 10, y);
    }

    if (labels.length === 0) return;

    // Calculate coordinate points
    revenueChartDataPoints = [];
    const stepX = labels.length > 1 ? chartW / (labels.length - 1) : chartW;

    const revPoints = labels.map((lbl, idx) => {
      const x = padding.left + idx * stepX;
      const y = padding.top + chartH - (revenueValues[idx] / maxVal) * chartH;
      revenueChartDataPoints.push({
        x, y,
        label: lbl,
        revenue: revenueValues[idx],
        profit: profitValues[idx],
        count: monthlyMap[lbl].count
      });
      return { x, y };
    });

    const profitPoints = labels.map((lbl, idx) => {
      const x = padding.left + idx * stepX;
      const y = padding.top + chartH - (profitValues[idx] / maxVal) * chartH;
      return { x, y };
    });

    // 1. Fill Revenue Gradient Area
    const revGradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
    revGradient.addColorStop(0, 'rgba(37, 99, 235, 0.22)');
    revGradient.addColorStop(1, 'rgba(37, 99, 235, 0.00)');

    ctx.beginPath();
    ctx.moveTo(revPoints[0].x, height - padding.bottom);
    revPoints.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.lineTo(revPoints[revPoints.length - 1].x, height - padding.bottom);
    ctx.closePath();
    ctx.fillStyle = revGradient;
    ctx.fill();

    // 2. Draw Revenue Line
    ctx.beginPath();
    ctx.moveTo(revPoints[0].x, revPoints[0].y);
    revPoints.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.stroke();

    // 3. Draw Profit Line
    ctx.beginPath();
    ctx.moveTo(profitPoints[0].x, profitPoints[0].y);
    profitPoints.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]); // reset dash

    // 4. Draw Data Point Circles & X-axis Labels
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

    revPoints.forEach((p, idx) => {
      // Circle dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = '#2563eb';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Label
      ctx.fillStyle = '#64748b';
      ctx.fillText(labels[idx], p.x, height - padding.bottom + 10);
    });
  }

  // Chart 2: Category Donut Chart
  let donutSlices = []; // cached for tooltips

  function renderCategoryChart(transactions) {
    const canvas = document.getElementById('categoryDonutCanvas');
    if (!canvas) return;

    const { ctx, width, height } = setupCanvas(canvas);
    ctx.clearRect(0, 0, width, height);

    // Sum by category
    const catTotals = {
      'Enterprise Software': 0,
      'Cloud Hardware': 0,
      'Consulting & Training': 0,
      'Security Subscriptions': 0,
      'Developer Tools': 0
    };

    let total = 0;
    transactions.forEach(t => {
      if (t.status === 'Refunded') return;
      const cat = t.category || 'Other';
      const amt = Number(t.amount || 0);
      if (catTotals[cat] !== undefined) {
        catTotals[cat] += amt;
      } else {
        catTotals[cat] = amt;
      }
      total += amt;
    });

    document.getElementById('donutTotalVal').textContent = formatCurrency(total);

    const centerX = width / 2;
    const centerY = height / 2;
    const outerRadius = Math.min(centerX, centerY) - 8;
    const innerRadius = outerRadius * 0.65;

    let currentAngle = -Math.PI / 2;
    donutSlices = [];

    const categories = Object.keys(catTotals);

    categories.forEach(cat => {
      const value = catTotals[cat];
      const sliceAngle = total > 0 ? (value / total) * 2 * Math.PI : 0;
      const color = CATEGORY_COLORS[cat] || '#94a3b8';

      if (sliceAngle > 0) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, outerRadius, currentAngle, currentAngle + sliceAngle);
        ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();

        donutSlices.push({
          category: cat,
          value,
          percent: Math.round((value / total) * 100),
          startAngle: currentAngle,
          endAngle: currentAngle + sliceAngle,
          centerX, centerY, innerRadius, outerRadius, color
        });
      }

      currentAngle += sliceAngle;
    });

    // Populate Category Legend List
    const legendList = document.getElementById('categoryLegendList');
    if (legendList) {
      legendList.innerHTML = '';
      categories.forEach(cat => {
        const val = catTotals[cat];
        const share = total > 0 ? Math.round((val / total) * 100) : 0;
        const color = CATEGORY_COLORS[cat] || '#94a3b8';

        const row = document.createElement('div');
        row.className = 'category-row';
        row.innerHTML = `
          <div class="category-row-left">
            <span class="category-color-swatch" style="background-color: ${color}"></span>
            <span>${cat}</span>
          </div>
          <div class="category-row-right">
            <span class="category-val">${formatCurrency(val)}</span>
            <span class="category-share">${share}%</span>
          </div>
        `;
        legendList.appendChild(row);
      });
    }
  }

  // Chart 3: Regional Performance Bar Chart
  let regionBars = []; // cached for tooltips

  function renderRegionChart(transactions) {
    const canvas = document.getElementById('regionBarCanvas');
    if (!canvas) return;

    const { ctx, width, height } = setupCanvas(canvas);
    ctx.clearRect(0, 0, width, height);

    const regions = [
      'North America',
      'Europe (EMEA)',
      'Asia Pacific',
      'Latin America',
      'Middle East'
    ];

    const regionData = {};
    regions.forEach(r => { regionData[r] = { amount: 0, count: 0 }; });

    transactions.forEach(t => {
      if (t.status === 'Refunded') return;
      const r = t.region;
      if (regionData[r]) {
        regionData[r].amount += Number(t.amount || 0);
        regionData[r].count += 1;
      }
    });

    // Determine top region badge
    let topRegion = 'North America';
    let topAmount = -1;
    regions.forEach(r => {
      if (regionData[r].amount > topAmount) {
        topAmount = regionData[r].amount;
        topRegion = r;
      }
    });
    const badge = document.getElementById('topRegionBadge');
    if (badge) badge.textContent = `Top: ${topRegion.split(' ')[0]}`;

    const maxAmt = Math.max(...regions.map(r => regionData[r].amount), 1000);
    const padding = { top: 15, right: 25, bottom: 25, left: 110 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;
    const barHeight = Math.min(26, Math.floor(chartH / regions.length) - 8);
    const gap = (chartH - barHeight * regions.length) / (regions.length - 1);

    regionBars = [];

    regions.forEach((region, i) => {
      const y = padding.top + i * (barHeight + gap);
      const amt = regionData[region].amount;
      const barW = Math.max(4, (amt / maxAmt) * chartW);

      // Draw Region label
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.font = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillStyle = '#475569';
      ctx.fillText(region, padding.left - 12, y + barHeight / 2);

      // Background track
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(padding.left, y, chartW, barHeight, 4);
      } else {
        ctx.rect(padding.left, y, chartW, barHeight);
      }
      ctx.fillStyle = '#f1f5f9';
      ctx.fill();

      // Active fill bar
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(padding.left, y, barW, barHeight, 4);
      } else {
        ctx.rect(padding.left, y, barW, barHeight);
      }
      ctx.fillStyle = region === topRegion ? '#2563eb' : '#60a5fa';
      ctx.fill();

      // Amount label inside or next to bar
      ctx.textAlign = 'left';
      ctx.fillStyle = '#0f172a';
      ctx.font = '600 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillText(formatCurrency(amt), padding.left + barW + 8, y + barHeight / 2);

      regionBars.push({
        region,
        amount: amt,
        count: regionData[region].count,
        x: padding.left,
        y,
        w: barW,
        h: barHeight
      });
    });
  }

  // Chart 4: Fulfillment & Payment Distribution
  function renderDistribution(transactions) {
    const total = transactions.length;
    let completed = 0;
    let pending = 0;
    let refunded = 0;

    const paymentMap = {
      'Credit Card': { count: 0, amount: 0 },
      'Wire Transfer': { count: 0, amount: 0 },
      'Stripe': { count: 0, amount: 0 },
      'PayPal': { count: 0, amount: 0 },
      'Purchase Order': { count: 0, amount: 0 }
    };

    transactions.forEach(t => {
      if (t.status === 'Completed') completed++;
      else if (t.status === 'Pending') pending++;
      else if (t.status === 'Refunded') refunded++;

      const pm = t.paymentMethod || 'Credit Card';
      if (!paymentMap[pm]) paymentMap[pm] = { count: 0, amount: 0 };
      paymentMap[pm].count++;
      if (t.status !== 'Refunded') {
        paymentMap[pm].amount += Number(t.amount || 0);
      }
    });

    // Fulfillment segment bar
    const countsEl = document.getElementById('fulfillmentCounts');
    if (countsEl) {
      countsEl.textContent = `${completed} Completed / ${pending} Pending / ${refunded} Refunded`;
    }

    const barEl = document.getElementById('fulfillmentBar');
    if (barEl) {
      const pCompleted = total > 0 ? (completed / total) * 100 : 0;
      const pPending = total > 0 ? (pending / total) * 100 : 0;
      const pRefunded = total > 0 ? (refunded / total) * 100 : 0;

      barEl.innerHTML = `
        <div class="progress-segment seg-completed" style="width: ${pCompleted}%" title="Completed: ${completed}"></div>
        <div class="progress-segment seg-pending" style="width: ${pPending}%" title="Pending: ${pending}"></div>
        <div class="progress-segment seg-refunded" style="width: ${pRefunded}%" title="Refunded: ${refunded}"></div>
      `;
    }

    // Payment methods grid cards
    const grid = document.getElementById('paymentMethodsGrid');
    if (grid) {
      grid.innerHTML = '';
      Object.keys(paymentMap).slice(0, 4).forEach(method => {
        const item = paymentMap[method];
        const card = document.createElement('div');
        card.className = 'payment-card';
        card.innerHTML = `
          <span class="payment-method-name">${method}</span>
          <span class="payment-method-amount">${formatCurrency(item.amount)}</span>
          <span class="payment-method-count">${item.count} orders</span>
        `;
        grid.appendChild(card);
      });
    }
  }

  // Master charts update
  function updateAllCharts(transactions) {
    renderRevenueChart(transactions);
    renderCategoryChart(transactions);
    renderRegionChart(transactions);
    renderDistribution(transactions);
  }

  // --- Transactions Table & Pagination ---
  function renderTable(filteredData) {
    const tbody = document.getElementById('salesTableBody');
    const emptyState = document.getElementById('emptyState');
    const totalBadge = document.getElementById('totalRecordsBadge');

    totalBadge.textContent = `${filteredData.length} records`;

    if (filteredData.length === 0) {
      tbody.innerHTML = '';
      emptyState.classList.remove('hidden');
      renderPagination(0, 1, state.pageSize);
      return;
    }

    emptyState.classList.add('hidden');

    // Pagination slice
    const totalPages = Math.ceil(filteredData.length / state.pageSize);
    if (state.currentPage > totalPages) state.currentPage = totalPages || 1;

    const startIdx = (state.currentPage - 1) * state.pageSize;
    const endIdx = Math.min(startIdx + state.pageSize, filteredData.length);
    const pageItems = filteredData.slice(startIdx, endIdx);

    tbody.innerHTML = '';

    pageItems.forEach(tx => {
      const tr = document.createElement('tr');
      const initials = getInitials(tx.customer);
      const avatarColors = getAvatarColor(tx.customer);
      const statusClass = 'status-' + (tx.status || 'completed').toLowerCase();

      tr.innerHTML = `
        <td class="tx-id">${escapeHtml(tx.id)}</td>
        <td>${formatDate(tx.date)}</td>
        <td>
          <div class="tx-customer">
            <div class="customer-avatar" style="background-color: ${avatarColors.bg}; color: ${avatarColors.text};">
              ${initials}
            </div>
            <span class="customer-name">${escapeHtml(tx.customer)}</span>
          </div>
        </td>
        <td>
          <div class="tx-product">
            <span class="product-title">${escapeHtml(tx.product)}</span>
            <span class="product-cat">${escapeHtml(tx.category)}</span>
          </div>
        </td>
        <td>${escapeHtml(tx.region)}</td>
        <td>${escapeHtml(tx.paymentMethod)}</td>
        <td class="text-right amount-bold">${formatCurrencyPrecise(tx.amount)}</td>
        <td class="text-center">
          <span class="status-badge ${statusClass}">${escapeHtml(tx.status)}</span>
        </td>
        <td class="text-right">
          <div class="action-buttons">
            <button type="button" class="action-btn btn-edit" data-id="${escapeHtml(tx.id)}" title="Edit transaction">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
            <button type="button" class="action-btn btn-delete" data-id="${escapeHtml(tx.id)}" title="Delete transaction">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });

    renderPagination(filteredData.length, state.currentPage, state.pageSize);
    updateSortIndicators();
  }

  function renderPagination(totalCount, currentPage, pageSize) {
    const info = document.getElementById('paginationInfo');
    const container = document.getElementById('paginationButtons');

    if (totalCount === 0) {
      info.textContent = 'Showing 0 to 0 of 0 entries';
      container.innerHTML = '';
      return;
    }

    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalCount);
    info.textContent = `Showing ${start} to ${end} of ${totalCount} entries`;

    const totalPages = Math.ceil(totalCount / pageSize);
    container.innerHTML = '';

    // Prev Button
    const prevBtn = document.createElement('button');
    prevBtn.className = 'page-btn';
    prevBtn.innerHTML = '&lsaquo;';
    prevBtn.disabled = currentPage <= 1;
    prevBtn.addEventListener('click', () => {
      if (state.currentPage > 1) {
        state.currentPage--;
        refreshUI();
      }
    });
    container.appendChild(prevBtn);

    // Number Buttons (with ellipsis if large)
    for (let p = 1; p <= totalPages; p++) {
      if (p === 1 || p === totalPages || (p >= currentPage - 1 && p <= currentPage + 1)) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `page-btn ${p === currentPage ? 'active' : ''}`;
        pageBtn.textContent = p;
        pageBtn.addEventListener('click', () => {
          state.currentPage = p;
          refreshUI();
        });
        container.appendChild(pageBtn);
      } else if (p === currentPage - 2 || p === currentPage + 2) {
        const dots = document.createElement('span');
        dots.textContent = '...';
        dots.style.padding = '0 4px';
        dots.style.color = '#94a3b8';
        container.appendChild(dots);
      }
    }

    // Next Button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'page-btn';
    nextBtn.innerHTML = '&rsaquo;';
    nextBtn.disabled = currentPage >= totalPages;
    nextBtn.addEventListener('click', () => {
      if (state.currentPage < totalPages) {
        state.currentPage++;
        refreshUI();
      }
    });
    container.appendChild(nextBtn);
  }

  function updateSortIndicators() {
    document.querySelectorAll('.data-table th.sortable').forEach(th => {
      const col = th.getAttribute('data-sort');
      const ind = th.querySelector('.sort-indicator');
      if (!ind) return;
      ind.className = 'sort-indicator';
      if (col === state.sortColumn) {
        ind.classList.add(state.sortDirection);
      }
    });
  }

  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // --- CRUD Modals & Form Actions ---
  function openAddModal() {
    document.getElementById('modalTitle').textContent = 'New Sales Transaction';
    document.getElementById('editTransactionId').value = '';
    document.getElementById('transactionForm').reset();

    // Default to today
    document.getElementById('formDate').value = new Date().toISOString().split('T')[0];
    document.getElementById('formQuantity').value = 1;
    document.getElementById('formUnitPrice').value = '';
    document.getElementById('formTotalAmount').value = '$0.00';

    clearFormErrors();
    document.getElementById('transactionModalBackdrop').classList.remove('hidden');
    document.getElementById('formCustomer').focus();
  }

  function openEditModal(id) {
    const tx = state.transactions.find(t => t.id === id);
    if (!tx) return;

    document.getElementById('modalTitle').textContent = `Edit Transaction ${tx.id}`;
    document.getElementById('editTransactionId').value = tx.id;
    document.getElementById('formCustomer').value = tx.customer;
    document.getElementById('formDate').value = tx.date;
    document.getElementById('formProduct').value = tx.product;
    document.getElementById('formCategory').value = tx.category;
    document.getElementById('formRegion').value = tx.region;
    document.getElementById('formPaymentMethod').value = tx.paymentMethod;
    document.getElementById('formQuantity').value = tx.units || 1;
    document.getElementById('formUnitPrice').value = tx.unitPrice || tx.amount;
    document.getElementById('formTotalAmount').value = formatCurrencyPrecise(tx.amount);
    document.getElementById('formStatus').value = tx.status;

    clearFormErrors();
    document.getElementById('transactionModalBackdrop').classList.remove('hidden');
  }

  function closeModal() {
    document.getElementById('transactionModalBackdrop').classList.add('hidden');
    document.getElementById('deleteModalBackdrop').classList.add('hidden');
  }

  function clearFormErrors() {
    document.querySelectorAll('.field-error').forEach(el => { el.textContent = ''; });
    document.querySelectorAll('.input-error').forEach(el => { el.classList.remove('input-error'); });
  }

  function updateCalculatedTotal() {
    const qty = parseFloat(document.getElementById('formQuantity').value) || 0;
    const price = parseFloat(document.getElementById('formUnitPrice').value) || 0;
    const total = qty * price;
    document.getElementById('formTotalAmount').value = formatCurrencyPrecise(total);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    clearFormErrors();

    const editId = document.getElementById('editTransactionId').value;
    const customer = document.getElementById('formCustomer').value.trim();
    const date = document.getElementById('formDate').value;
    const product = document.getElementById('formProduct').value.trim();
    const category = document.getElementById('formCategory').value;
    const region = document.getElementById('formRegion').value;
    const paymentMethod = document.getElementById('formPaymentMethod').value;
    const units = parseInt(document.getElementById('formQuantity').value, 10);
    const unitPrice = parseFloat(document.getElementById('formUnitPrice').value);
    const status = document.getElementById('formStatus').value;

    let hasError = false;

    if (!customer) {
      document.getElementById('formCustomerError').textContent = 'Customer name is required';
      document.getElementById('formCustomer').classList.add('input-error');
      hasError = true;
    }

    if (!date) {
      document.getElementById('formDateError').textContent = 'Valid date is required';
      document.getElementById('formDate').classList.add('input-error');
      hasError = true;
    }

    if (!product) {
      document.getElementById('formProductError').textContent = 'Product name is required';
      document.getElementById('formProduct').classList.add('input-error');
      hasError = true;
    }

    if (isNaN(units) || units < 1) {
      document.getElementById('formQuantityError').textContent = 'Quantity must be at least 1';
      document.getElementById('formQuantity').classList.add('input-error');
      hasError = true;
    }

    if (isNaN(unitPrice) || unitPrice <= 0) {
      document.getElementById('formUnitPriceError').textContent = 'Enter a valid unit price';
      document.getElementById('formUnitPrice').classList.add('input-error');
      hasError = true;
    }

    if (hasError) return;

    const amount = Math.round(units * unitPrice * 100) / 100;

    if (editId) {
      // Update existing
      const idx = state.transactions.findIndex(t => t.id === editId);
      if (idx !== -1) {
        state.transactions[idx] = {
          ...state.transactions[idx],
          customer, date, product, category, region, paymentMethod, units, unitPrice, amount, status
        };
        saveData();
        showToast(`Transaction ${editId} updated`, 'success');
      }
    } else {
      // Create new
      const newId = 'TX-' + Math.floor(10000 + Math.random() * 90000);
      const newRecord = {
        id: newId,
        customer,
        date,
        product,
        category,
        region,
        paymentMethod,
        units,
        unitPrice,
        amount,
        status
      };
      state.transactions.unshift(newRecord);
      saveData();
      showToast(`Transaction ${newId} created successfully`, 'success');
    }

    closeModal();
    refreshUI();
  }

  function promptDelete(id) {
    state.deleteTargetId = id;
    document.getElementById('deleteTargetId').textContent = id;
    document.getElementById('deleteModalBackdrop').classList.remove('hidden');
  }

  function confirmDelete() {
    if (!state.deleteTargetId) return;
    const target = state.deleteTargetId;
    state.transactions = state.transactions.filter(t => t.id !== target);
    saveData();
    closeModal();
    refreshUI();
    showToast(`Transaction ${target} removed`, 'info');
    state.deleteTargetId = null;
  }

  // --- Export CSV ---
  function exportCSV() {
    const list = getFilteredTransactions();
    if (list.length === 0) {
      showToast('No transactions to export', 'warning');
      return;
    }

    const headers = ['Transaction ID', 'Date', 'Customer', 'Product', 'Category', 'Region', 'Payment Method', 'Units', 'Unit Price', 'Total Amount', 'Status'];
    const rows = list.map(t => [
      `"${t.id}"`,
      `"${t.date}"`,
      `"${(t.customer || '').replace(/"/g, '""')}"`,
      `"${(t.product || '').replace(/"/g, '""')}"`,
      `"${t.category}"`,
      `"${t.region}"`,
      `"${t.paymentMethod}"`,
      t.units || 1,
      t.unitPrice || t.amount,
      t.amount,
      `"${t.status}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sales_analytics_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`Exported ${list.length} transactions to CSV`, 'success');
  }

  // --- Reset Seed Data ---
  function resetDemoData() {
    state.transactions = JSON.parse(JSON.stringify(SEED_TRANSACTIONS));
    saveData();
    refreshUI();
    showToast('Demo dataset restored with 40+ records', 'info');
  }

  // --- Toast Feedback System ---
  function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, 3200);
  }

  // --- Tooltips for Canvas Charts ---
  function initChartTooltips() {
    // 1. Revenue Chart Tooltip
    const revCanvas = document.getElementById('revenueTrendCanvas');
    const revTooltip = document.getElementById('revenueTooltip');

    if (revCanvas && revTooltip) {
      revCanvas.addEventListener('mousemove', e => {
        const rect = revCanvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Find closest point within 30px
        let closest = null;
        let minDist = 35;

        revenueChartDataPoints.forEach(pt => {
          const dist = Math.hypot(pt.x - mouseX, pt.y - mouseY);
          if (dist < minDist) {
            minDist = dist;
            closest = pt;
          }
        });

        if (closest) {
          revTooltip.style.display = 'block';
          revTooltip.style.left = `${closest.x}px`;
          revTooltip.style.top = `${closest.y}px`;
          revTooltip.innerHTML = `
            <strong>${closest.label}</strong><br/>
            Revenue: ${formatCurrency(closest.revenue)}<br/>
            Est. Profit: ${formatCurrency(closest.profit)}<br/>
            Orders: ${closest.count}
          `;
        } else {
          revTooltip.style.display = 'none';
        }
      });

      revCanvas.addEventListener('mouseleave', () => {
        revTooltip.style.display = 'none';
      });
    }

    // 2. Donut Chart Tooltip
    const donutCanvas = document.getElementById('categoryDonutCanvas');
    const donutTooltip = document.getElementById('donutTooltip');

    if (donutCanvas && donutTooltip) {
      donutCanvas.addEventListener('mousemove', e => {
        const rect = donutCanvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        let hoveredSlice = null;

        donutSlices.forEach(slice => {
          const dx = mouseX - slice.centerX;
          const dy = mouseY - slice.centerY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist >= slice.innerRadius && dist <= slice.outerRadius) {
            let angle = Math.atan2(dy, dx);
            if (angle < -Math.PI / 2) angle += 2 * Math.PI;

            let sAngle = slice.startAngle;
            let eAngle = slice.endAngle;
            if (sAngle < -Math.PI / 2) { sAngle += 2 * Math.PI; eAngle += 2 * Math.PI; }

            if (angle >= sAngle && angle <= eAngle) {
              hoveredSlice = slice;
            }
          }
        });

        if (hoveredSlice) {
          donutTooltip.style.display = 'block';
          donutTooltip.style.left = `${mouseX}px`;
          donutTooltip.style.top = `${mouseY}px`;
          donutTooltip.innerHTML = `
            <strong>${hoveredSlice.category}</strong><br/>
            Amount: ${formatCurrency(hoveredSlice.value)}<br/>
            Share: ${hoveredSlice.percent}%
          `;
        } else {
          donutTooltip.style.display = 'none';
        }
      });

      donutCanvas.addEventListener('mouseleave', () => {
        donutTooltip.style.display = 'none';
      });
    }

    // 3. Region Bar Chart Tooltip
    const regCanvas = document.getElementById('regionBarCanvas');
    const regTooltip = document.getElementById('regionTooltip');

    if (regCanvas && regTooltip) {
      regCanvas.addEventListener('mousemove', e => {
        const rect = regCanvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const hoveredBar = regionBars.find(b =>
          mouseX >= b.x && mouseX <= b.x + b.w + 60 &&
          mouseY >= b.y && mouseY <= b.y + b.h
        );

        if (hoveredBar) {
          regTooltip.style.display = 'block';
          regTooltip.style.left = `${mouseX}px`;
          regTooltip.style.top = `${hoveredBar.y}px`;
          regTooltip.innerHTML = `
            <strong>${hoveredBar.region}</strong><br/>
            Total Sales: ${formatCurrency(hoveredBar.amount)}<br/>
            Transactions: ${hoveredBar.count}
          `;
        } else {
          regTooltip.style.display = 'none';
        }
      });

      regCanvas.addEventListener('mouseleave', () => {
        regTooltip.style.display = 'none';
      });
    }
  }

  // --- Master UI Refresh ---
  function refreshUI() {
    const filtered = getFilteredTransactions();
    updateKPIs(filtered);
    updateAllCharts(filtered);
    renderTable(filtered);
  }

  // --- Event Listeners Setup ---
  function initEventListeners() {
    // 1. Time filter pills
    const timeFilterGroup = document.getElementById('timeFilterGroup');
    if (timeFilterGroup) {
      timeFilterGroup.addEventListener('click', e => {
        const target = e.target.closest('.time-pill');
        if (!target) return;
        timeFilterGroup.querySelectorAll('.time-pill').forEach(btn => btn.classList.remove('active'));
        target.classList.add('active');
        state.timeRange = target.getAttribute('data-range') || 'all';
        state.currentPage = 1;
        refreshUI();
      });
    }

    // 2. Search input
    const searchInput = document.getElementById('searchInput');
    const searchClear = document.getElementById('searchClearBtn');
    if (searchInput) {
      searchInput.addEventListener('input', e => {
        state.searchQuery = e.target.value;
        state.currentPage = 1;
        if (searchClear) {
          if (e.target.value) searchClear.classList.add('visible');
          else searchClear.classList.remove('visible');
        }
        refreshUI();
      });

      if (searchClear) {
        searchClear.addEventListener('click', () => {
          searchInput.value = '';
          searchClear.classList.remove('visible');
          state.searchQuery = '';
          state.currentPage = 1;
          refreshUI();
        });
      }
    }

    // 3. Dropdown Filters
    const catFilter = document.getElementById('categoryFilter');
    if (catFilter) {
      catFilter.addEventListener('change', e => {
        state.categoryFilter = e.target.value;
        state.currentPage = 1;
        refreshUI();
      });
    }

    const regFilter = document.getElementById('regionFilter');
    if (regFilter) {
      regFilter.addEventListener('change', e => {
        state.regionFilter = e.target.value;
        state.currentPage = 1;
        refreshUI();
      });
    }

    const statFilter = document.getElementById('statusFilter');
    if (statFilter) {
      statFilter.addEventListener('change', e => {
        state.statusFilter = e.target.value;
        state.currentPage = 1;
        refreshUI();
      });
    }

    // Reset filters buttons
    const resetFilters = () => {
      state.searchQuery = '';
      state.categoryFilter = 'all';
      state.regionFilter = 'all';
      state.statusFilter = 'all';
      if (searchInput) searchInput.value = '';
      if (searchClear) searchClear.classList.remove('visible');
      if (catFilter) catFilter.value = 'all';
      if (regFilter) regFilter.value = 'all';
      if (statFilter) statFilter.value = 'all';
      state.currentPage = 1;
      refreshUI();
    };

    document.getElementById('resetFiltersBtn')?.addEventListener('click', resetFilters);
    document.getElementById('emptyClearBtn')?.addEventListener('click', resetFilters);

    // 4. Page size selector
    document.getElementById('pageSizeSelect')?.addEventListener('change', e => {
      state.pageSize = parseInt(e.target.value, 10) || 10;
      state.currentPage = 1;
      refreshUI();
    });

    // 5. Table Column Sorting
    document.querySelectorAll('.data-table th.sortable').forEach(th => {
      th.addEventListener('click', () => {
        const col = th.getAttribute('data-sort');
        if (state.sortColumn === col) {
          state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
          state.sortColumn = col;
          state.sortDirection = 'asc';
        }
        refreshUI();
      });
    });

    // 6. Action buttons delegation in Table
    document.getElementById('salesTableBody')?.addEventListener('click', e => {
      const editBtn = e.target.closest('.btn-edit');
      if (editBtn) {
        const id = editBtn.getAttribute('data-id');
        openEditModal(id);
        return;
      }

      const deleteBtn = e.target.closest('.btn-delete');
      if (deleteBtn) {
        const id = deleteBtn.getAttribute('data-id');
        promptDelete(id);
      }
    });

    // 7. Modals events
    document.getElementById('openAddModalBtn')?.addEventListener('click', openAddModal);
    document.getElementById('closeModalBtn')?.addEventListener('click', closeModal);
    document.getElementById('cancelModalBtn')?.addEventListener('click', closeModal);
    document.getElementById('closeDeleteModalBtn')?.addEventListener('click', closeModal);
    document.getElementById('cancelDeleteBtn')?.addEventListener('click', closeModal);
    document.getElementById('confirmDeleteBtn')?.addEventListener('click', confirmDelete);

    // Close on backdrop click
    document.getElementById('transactionModalBackdrop')?.addEventListener('click', e => {
      if (e.target.id === 'transactionModalBackdrop') closeModal();
    });
    document.getElementById('deleteModalBackdrop')?.addEventListener('click', e => {
      if (e.target.id === 'deleteModalBackdrop') closeModal();
    });

    // Form inputs live calculation
    document.getElementById('formQuantity')?.addEventListener('input', updateCalculatedTotal);
    document.getElementById('formUnitPrice')?.addEventListener('input', updateCalculatedTotal);
    document.getElementById('transactionForm')?.addEventListener('submit', handleFormSubmit);

    // 8. Header action buttons
    document.getElementById('exportCsvBtn')?.addEventListener('click', exportCSV);
    document.getElementById('seedDataBtn')?.addEventListener('click', () => {
      if (confirm('Reset sales data to default demo dataset? Any custom transactions will be overwritten.')) {
        resetDemoData();
      }
    });

    // 9. Window resize observer for responsive charts
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const filtered = getFilteredTransactions();
        updateAllCharts(filtered);
      }, 100);
    });

    // ESC key closes modals
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeModal();
    });

    // Tooltips
    initChartTooltips();
  }

  // --- Initializer ---
  function init() {
    loadData();
    initEventListeners();
    refreshUI();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
