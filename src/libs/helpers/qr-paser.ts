export interface EMVQRData {
  merchantName?: string;
  merchantCity?: string;
  merchantCategory?: string;
  transactionAmount?: string;
  transactionCurrency?: string;
  countryCode?: string;
  merchantAccount?: string;
  additionalData?: string;
  qrPayload: string;
}

export const CurrencyCode: Record<string, string> = {
  '978': 'EUR',
  '704': 'VND',
  '702': 'SGD',
  '826': 'GBP',
  '756': 'CHF',
  '392': 'JPY',
  '410': 'KRW',
  '156': 'CNY',
  '356': 'INR',
  '986': 'BRL',
  '484': 'MXN',
  '032': 'ARS',
  '170': 'COP',
  '152': 'CLP',
  '604': 'PEN',
  '554': 'NZD',
  '344': 'HKD',
  '458': 'MYR',
  '608': 'PHP',
  '764': 'THB',
  '360': 'IDR',
  '949': 'TRY',
  '643': 'RUB',
  '980': 'UAH',
  '050': 'BDT',
  '566': 'NGN',
  '710': 'ZAR',
  '404': 'KES',
  '834': 'TZS',
  '840': 'USD',
};

const getCurrencyCode = (code: string): string => {
  return CurrencyCode[code] || code;
};

export const parseEMVQR = (qrString: string): EMVQRData => {
  const data: EMVQRData = {
    qrPayload: qrString,
  };
  let index = 0;

  while (index < qrString.length) {
    // Read tag (2 digits)
    const tag = qrString.substring(index, index + 2);
    index += 2;

    // Read length (2 digits)
    const length = parseInt(qrString.substring(index, index + 2), 10);
    index += 2;

    // Read value
    const value = qrString.substring(index, index + length);
    index += length;

    // Map tags to data
    switch (tag) {
      case '00': // Payload Format Indicator
        break;
      case '38': // Merchant Account Information
      case '26': // Merchant Account Information (alternative)
        data.merchantAccount = value;
        break;
      case '52': // Merchant Category Code
        data.merchantCategory = value;
        break;
      case '53': // Transaction Currency
        data.transactionCurrency = getCurrencyCode(value);
        break;
      case '54': // Transaction Amount
        data.transactionAmount = value;
        break;
      case '58': // Country Code
        data.countryCode = value;
        break;
      case '59': // Merchant Name
        data.merchantName = value;
        break;
      case '60': // Merchant City
        data.merchantCity = value;
        break;
      case '62': // Additional Data
        data.additionalData = value;
        break;
      case '63': // CRC
        break;
    }
  }

  return data;
};
