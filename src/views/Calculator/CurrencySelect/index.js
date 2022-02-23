import React, { useEffect, useState } from 'react';
import { Input, AutoComplete } from 'antd';
import './currencySelect.css';
import { DownOutlined } from '@ant-design/icons';

export const fiatCurrencies = [
  { id: 2781, name: 'United States Dollars "$"', symbol: 'USD' },
  { id: 2781, name: 'Albanian Lek "L"', symbol: 'ALL' },
  { id: 2781, name: 'Algerian Dinar "د.ج"', symbol: 'DZD' },
  { id: 2781, name: 'Argentine Peso "ARS"', symbol: 'ARS' },
  { id: 2781, name: 'Armenian Dram "֏"', symbol: 'AMD' },
  { id: 2781, name: 'Australian Dollar "$"', symbol: 'AUD' },
  { id: 2781, name: 'Azerbaijani Manat "₼"', symbol: 'AZN' },
  { id: 2781, name: 'Bahraini Dinar ".د.ب"', symbol: 'BHD' },
  { id: 2781, name: 'Bangladeshi Taka "BDT"', symbol: 'BDT' },
  { id: 2781, name: 'Belarusian Ruble "Br"', symbol: 'BYN' },
]

const preciousMetals = [
  { id: 2781, name: 'Gold Troy Ounce', symbol: 'XAU', },
  { id: 2781, name: 'Silver Troy Ounce', symbol: 'XAG', },
  { id: 2781, name: 'Platinum Ounce', symbol: 'XPT', },
  { id: 2781, name: 'Palladium Ounce', symbol: 'XPD', },
]

const defaultCryptoCurrencies = [
  {
    "id": 1,
    "name": "Bitcoin",
    "symbol": "BTC",
    "slug": "bitcoin",
    "is_active": 1,
    "status": "active",
    "rank": 1
  },
  {
      "id": 1027,
      "name": "Ethereum",
      "symbol": "ETH",
      "slug": "ethereum",
      "is_active": 1,
      "status": "active",
      "rank": 2
  },
  {
      "id": 825,
      "name": "Tether",
      "symbol": "USDT",
      "slug": "tether",
      "is_active": 1,
      "status": "active",
      "rank": 3
  },
  {
      "id": 1839,
      "name": "BNB",
      "symbol": "BNB",
      "slug": "bnb",
      "is_active": 1,
      "status": "active",
      "rank": 4
  },
  {
      "id": 3408,
      "name": "USD Coin",
      "symbol": "USDC",
      "slug": "usd-coin",
      "is_active": 1,
      "status": "active",
      "rank": 5
  },
  {
      "id": 52,
      "name": "XRP",
      "symbol": "XRP",
      "slug": "xrp",
      "is_active": 1,
      "status": "active",
      "rank": 6
  },
  {
      "id": 2010,
      "name": "Cardano",
      "symbol": "ADA",
      "slug": "cardano",
      "is_active": 1,
      "status": "active",
      "rank": 7
  },
  {
      "id": 5426,
      "name": "Solana",
      "symbol": "SOL",
      "slug": "solana",
      "is_active": 1,
      "status": "active",
      "rank": 8
  },
  {
      "id": 5805,
      "name": "Avalanche",
      "symbol": "AVAX",
      "slug": "avalanche",
      "is_active": 1,
      "status": "active",
      "rank": 9
  },
]

const renderTitle = (title) => (
  <span>
    {title}
  </span>
);

const renderItem = (item) => ({
  value: `${item.name} (${item.symbol})`,
  label: (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {`${item.name} (${item.symbol})`}
    </div>
  ),
});

const defaultOptions = [
  {
    label: renderTitle('Fiat Currencies'),
    options: fiatCurrencies.map(item => renderItem(item)),
  },
  {
    label: renderTitle('Precious Metals'),
    options: preciousMetals.map(item => renderItem(item)),
  },
  {
    label: renderTitle('Cryptocurrencies'),
    options: defaultCryptoCurrencies.map(item => renderItem(item)),
  },
];

function CurrencySelect({ cryptoCurrencies, onSelect, currentCoin }) {
  const [options, setOptions] = useState(defaultOptions);
  const [searchText, setSearchText] = useState(null);

  useEffect(() => {
    if (!searchText) {
      setOptions(defaultOptions);
    }
  }, [searchText, currentCoin])

  const createOptionItems = (items, searchText) => {
    const search = searchText.toLowerCase();
    return items
      .filter(it => 
        it.name.toLowerCase().includes(search) || 
        it.symbol.toLowerCase().includes(search))
      .map(it => renderItem(it))
  }

  const onSearch = (value) => {
    setSearchText(value);

    if (value) {
      const updatedOptions = []
      let optionItems = createOptionItems(fiatCurrencies, value)
      if (optionItems.length > 0) {
        updatedOptions.push({
          label: renderTitle('Fiat Currencies'),
          options: optionItems
        })
      }

      optionItems = createOptionItems(preciousMetals, value)
      if (optionItems.length > 0) {
        updatedOptions.push({
          label: renderTitle('Precious Metals'),
          options: optionItems
        })
      }

      optionItems = createOptionItems(cryptoCurrencies, value)
      if (optionItems.length > 0) {
        updatedOptions.push({
          label: renderTitle('Cryptocurrencies'),
          options: optionItems
        })
      }
      setOptions(updatedOptions)
    }
  };

  const findCurrency = (value) => {
    const compare = (item, value) => `${item.name} (${item.symbol})` === value;

    let item = fiatCurrencies.find(it => compare(it, value));
    if (item) return item;

    item = preciousMetals.find(it => compare(it, value));
    if (item) return item;

    item = cryptoCurrencies.find(it => compare(it, value));
    if (item) return item;

    return null;
  }

  const handleSelectCoin = (value) => {
    const currency = findCurrency(value);
    if (currency) {
      onSelect(currency);
    }
  };

  return (
    <div>
      <AutoComplete
        dropdownClassName="certain-category-search-dropdown"
        style={{ width: 320 }}
        value={`${currentCoin.name} (${currentCoin.symbol})`}
        options={options}
        onSearch={onSearch}
        onSelect={handleSelectCoin}
      >
        <Input
          size='large'
          placeholder="Enter your username"
          suffix={
            <DownOutlined />
          }
        />
      </AutoComplete>
    </div>
  );
}

export default CurrencySelect;
