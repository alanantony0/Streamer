import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";

const { Header } = Layout;

const HeaderComponent = () => {
  return (
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        style={{ flexGrow: 1, justifyContent: "space-between" }}
      >
        <div>
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/movies">Movies </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/upload">Upload </Link>
          </Menu.Item>
        </div>
        <UserButton />
      </Menu>
    </Header>
  );
};

export default HeaderComponent;
