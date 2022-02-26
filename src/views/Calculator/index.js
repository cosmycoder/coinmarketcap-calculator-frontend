import React, { useEffect, useState } from "react";
import domtoimage from "dom-to-image";
import { Layout, Row, Col, InputNumber, Space, Tooltip } from "antd";
import "./index.css";
import CurrencySelect, {
  fiatCurrencies,
  defaultCryptoCurrencies,
} from "./CurrencySelect/index.js";

const { Content } = Layout;

function Calculator() {
  const [loading, setLoading] = useState(false);
  const [cryptoCurrencies, setCryptoCurrencies] = useState(null);
  const [amount, setAmount] = useState(1);
  const [inputCoin, setInputCoin] = useState(defaultCryptoCurrencies[0]);
  const [outputCoin, setOutputCoin] = useState(fiatCurrencies[0]);
  const [requestId, setRequestId] = useState(null);
  const [converted, setConverted] = useState("0");

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      fetch(
        "https://api.coinmarketcap.com/data-api/v3/map/all?cryptoAux=is_active,status&exchangeAux=is_active,status&limit=10000&listing_status=active,untracked&start=1"
      )
        .then((response) => response.json())
        .then((data) => {
          const currencies = data.data.cryptoCurrencyMap.filter(
            (i) => i.is_active === 1
          );
          setCryptoCurrencies(currencies);
          setInputCoin(currencies.find((it) => it.symbol === "BTC"));
          setOutputCoin(fiatCurrencies.find((it) => it.symbol === "USD"));
        });
    }
  }, [loading]);

  const priceConversion = (id, convertId, amount) => {
    fetch(
      `https://api.coinmarketcap.com/data-api/v3/tools/price-conversion?amount=${amount}&convert_id=${convertId}&id=${id}`
    )
      .then((response) => response.json())
      .then(({ data }) => {
        const quotes = data?.quote;
        if (quotes && quotes.length > 0) {
          const quote = quotes[0];
          const price = quote.price;
          if (price >= 1.0) {
            setConverted(price.toFixed(2));
          } else {
            setConverted(price.toFixed(8));
          }
        }
      });
  };

  useEffect(() => {
    if (inputCoin && outputCoin && amount !== 0) {
      const reqId = `${inputCoin.id}-${outputCoin.id}-${amount}`;
      if (requestId !== reqId) {
        setRequestId(reqId);
        priceConversion(inputCoin.id, outputCoin.id, amount);
      }
    }
  }, [requestId, inputCoin, outputCoin, amount]);

  const onSelectInputCoin = (currency) => {
    setInputCoin(currency);
  };

  const onSelectOutputCoin = (currency) => {
    setOutputCoin(currency);
  };

  const handleSwap = () => {
    if (inputCoin && outputCoin) {
      setInputCoin({ ...outputCoin });
      setOutputCoin({ ...inputCoin });
    }
  };

  const titleBold = {
    color: "#440645",
  };

  const onRefresh = () => {
    if (inputCoin && outputCoin && amount !== 0) {
      priceConversion(inputCoin.id, outputCoin.id, amount);
    }
  };

  const onDownload = () => {
    var filename = `${inputCoin.symbol}-${outputCoin.symbol}.JPG`;
    var wrapper = document.getElementById("background-wrapper");
    domtoimage
      .toJpeg(wrapper, { height: 500, bgcolor: "#FFFFFF" })
      .then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = filename;
        link.href = dataUrl;
        link.click();
      });
  };

  return (
    <Layout className="mainLayout">
      <Content className="content">
        <Row>
          <Col
            xl={{ span: 10, offset: 7 }}
            lg={{ span: 20, offset: 2 }}
            flex="auto"
            align="middle"
          >
            <Space direction="vertical">
              <div className="headerTitle">
                Convert{" "}
                <span style={titleBold}>{inputCoin?.symbol || "BTC"}</span> to{" "}
                <span style={titleBold}>{outputCoin?.symbol || "USD"}</span>
              </div>
              <p className="subTitle">
                Convert any cryptocurrency or token price into your perferred
                fiat currency, such as BCH to USD. The live BCH to USD price
                will be shown.
              </p>
            </Space>
          </Col>
        </Row>
        <div
          className="background-wrapper"
          id="background-wrapper"
          style={{ backgroundImage: `url(/images/background.png)` }}
        >
          <Row className="main-row">
            <Col
              flex="auto" align="middle"
              sm={{ span: 18, offset: 3 }}
              md={{ span: 12, offset: 6 }}
              lg={{ span: 8, offset: 8 }}
              xl={{ span: 8, offset: 8 }}
              xxl={{ span: 6, offset: 9 }}
            >
              <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                <InputNumber
                  min={1}
                  placeholder="Enter Amount to Convert"
                  style={{ width: "100%" }}
                  size="large"
                  defaultValue={amount}
                  onChange={(value) => setAmount(value)}
                />

                <CurrencySelect
                  cryptoCurrencies={cryptoCurrencies}
                  onSelect={onSelectInputCoin}
                  currentCoin={inputCoin}
                ></CurrencySelect>

                <Tooltip title="Swap" className="image-button">
                  <img
                    src="/images/swap.svg"
                    className="image-button rotate"
                    alt="swap"
                    width="40px"
                    onClick={handleSwap}
                  />
                </Tooltip>

                <CurrencySelect
                  cryptoCurrencies={cryptoCurrencies}
                  onSelect={onSelectOutputCoin}
                  currentCoin={outputCoin}
                ></CurrencySelect>

                <div flex="auto" align="middle">
                  <div className="priceTitle">{amount ? amount : "-"}</div>
                  {inputCoin ? (
                    <div className="coinName">{`${inputCoin.name} (${inputCoin.symbol})`}</div>
                  ) : (
                    <></>
                  )}
                </div>

                <img src="/images/equal.svg" alt="equal" width="50px" />

                <div flex="auto" align="middle">
                  <div className="priceTitle">{amount ? converted : "-"}</div>
                  {outputCoin ? (
                    <div className="coinName">{`${outputCoin.name} (${outputCoin.symbol})`}</div>
                  ) : (
                    <></>
                  )}
                </div>
              </Space>
            </Col>
          </Row>
        </div>
        <Row style={{ marginTop: "40px", marginBottom: "20px" }}>
          <Col span={12} offset={6} flex="auto" align="end">
            <Space>
              <Tooltip title="Refresh" className="image-button">
                <img
                  src="/images/refresh.svg"
                  className="image-button"
                  alt="refresh"
                  width="40px"
                  onClick={() => onRefresh()}
                />
              </Tooltip>
              <Tooltip title="Download" className="image-button">
                <img
                  src="/images/download.svg"
                  className="image-button"
                  alt="download"
                  width="40px"
                  onClick={() => onDownload()}
                />
              </Tooltip>
            </Space>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default Calculator;
