export const truncateAddress = (address: string, startLength = 6, endLength = 4) => {
  if (!address) return '';

  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
};

export const formatBalance = (value: number, fractionDigits = 2) => {
  const formattedAmount = value.toLocaleString('en-US', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });

  return formattedAmount;
};

export const formatNumber = (value: number, fractionDigits = 6) => {
  if (isNaN(value)) return '0';
  if (!isFinite(value)) return value > 0 ? '∞' : '-∞';
  if (value === 0) return '0';
  if (Math.abs(value) < 0.00000001) return '0';
  if (Math.abs(value) < 0.000001) return value.toExponential(2);
  if (Math.abs(value) < 0.01) fractionDigits = 8;
  if (Math.abs(value) < 1) fractionDigits = Math.min(8, fractionDigits);
  if (Math.abs(value) > 1000) fractionDigits = Math.max(0, fractionDigits - 2);
  if (Math.abs(value) > 10000) fractionDigits = Math.max(0, fractionDigits - 2);
  if (Math.abs(value) > 1000000) fractionDigits = Math.max(0, fractionDigits - 4);
  if (Math.abs(value) > 1000000000) fractionDigits = Math.max(0, fractionDigits - 6);

  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
};

export const formatNumberInput = (value: string): string => {
  // If empty string, return empty
  if (!value) return '';

  // Allow typing decimal point at the end
  if (value === '.') return '0.';

  // Remove all characters except digits, decimal point, and comma
  let cleaned = value.replace(/[^\d.,]/g, '');

  // Handle case where user types just a comma (treat as decimal)
  if (cleaned === ',') return '0.';

  // Replace comma with decimal point for European number format support
  cleaned = cleaned.replace(',', '.');

  // Handle multiple decimal points - keep only the first one
  const decimalIndex = cleaned.indexOf('.');
  if (decimalIndex !== -1) {
    const beforeDecimal = cleaned.substring(0, decimalIndex);
    const afterDecimal = cleaned.substring(decimalIndex + 1).replace(/\./g, '');
    cleaned = beforeDecimal + '.' + afterDecimal;
  }

  // Remove leading zeros but preserve single zero before decimal
  if (cleaned.match(/^0+\d/)) {
    cleaned = cleaned.replace(/^0+/, '');
  }

  // If starts with decimal, add leading zero
  if (cleaned.startsWith('.')) {
    cleaned = '0' + cleaned;
  }

  // Split into integer and decimal parts
  const parts = cleaned.split('.');
  let integerPart = parts[0] || '';
  const decimalPart = parts[1];

  // Format integer part with thousand separators
  if (integerPart && integerPart !== '0') {
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  // Reconstruct the number
  if (decimalPart !== undefined) {
    return integerPart + '.' + decimalPart;
  }

  // Preserve trailing decimal point while typing
  if (value.endsWith('.')) {
    return integerPart + '.';
  }

  return integerPart;
};

export const parseFormattedNumber = (value: string): number => {
  if (!value) return 0;

  // Remove commas and parse
  const cleaned = value.replace(/,/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
};

// Alternative: Use this helper for the input onChange handler

export const handleNumberInputChange = (inputValue: string, field: any) => {
  // Don't format if user is typing decimal point or comma
  if (inputValue.endsWith('.') || inputValue.endsWith(',')) {
    field.onChange(parseFormattedNumber(inputValue));
    return;
  }

  const formatted = formatNumberInput(inputValue);
  const numericValue = parseFormattedNumber(formatted);
  field.onChange(numericValue);
};
