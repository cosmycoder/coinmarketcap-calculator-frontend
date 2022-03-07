import React from "react";
import { NavLink } from "react-router-dom";
import { Row, Col, Space, Dropdown } from "antd";
import { DownOutlined } from '@ant-design/icons';
import "./index.css";

const Footer = () => {

  return (
    <>
      <Row className="mb-1">
        <Col
          span={12}
          flex="auto"
          align="left"
        >
          <img
              src="/images/elafaki.png"
              alt="Elafaki Cryptocurrency Analytics"
              width={180}
            />
        </Col>
      </Row>

      <Row className="">
        <Col
          sm={{ span: 24 }}
          lg={{ span: 12 }}
          flex="auto"
          align="left"
        >
          <Space direction="vertical" size={12}>
            <Space direction="horizontal" size={30}>
              <a href="/privacy">Privacy, Terms and Conditions</a>
              <a href="/cookies">Cookies</a>
              <a href="/contact">Contact Us</a>
            </Space>

            <div>
              2022 Phlanx Pty Ltd. All rights reserved
            </div>
            
            <Row style={{marginBottom: '-6px'}}>
              <Col
                md={{ span: 8 }}
                flex="auto"
              >
                <div className="yellow">Secured by</div>
                <img
                  src="/images/amazon-logo-white.png"
                  alt="Amazon"
                  width={100}
                  style={{paddingTop: '6px'}}
                />
              </Col>
              <Col
                md={{ span: 12 }}
                flex="auto"
              >
                <div className="yellow">SSL Encrypted</div>
                <img
                  src="/images/poweredby2.png"
                  alt="Amazon"
                  width={280}
                />
              </Col>
            </Row>
            
            <Space direction="horizontal" size={10} className="mt-2">
              <img
                src="/images/discord.svg"
                alt="Amazon"
                width={40}
              />
              <img
                src="/images/instagram.svg"
                alt="Amazon"
                width={40}
              />
              <img
                src="/images/twitter.svg"
                alt="Amazon"
                width={40}
              />
            </Space>
          </Space>
        </Col>

        <Col
          id="features"
          lg={{ span: 8 }}
          flex="auto"
          align="left"
        >
          <div className="features-title">Features of Elafaki.com</div>
          <NavLink to="/cryptocurrency">
            <div className="features-link">Cryptocurrency Conversion Calculator</div>
          </NavLink>
          <NavLink to="/profitloss">
            <div className="features-link">Crypto Profit and Loss Calculator</div>
          </NavLink>
          <NavLink to="/nftprofit">
            <div className="features-link">NFT Profit Calculator</div>
          </NavLink>
        </Col>

        <Col
          id="elafaki-logo"
          lg={{ span: 4 }}
          flex="auto"
          align="right"
        >
          <img
            src="/images/kryptos.svg"
            alt="Elafaki"
            width={70}
            className="elafki"
          />
        </Col>
      </Row>
    </>
  );
};

export default Footer;
