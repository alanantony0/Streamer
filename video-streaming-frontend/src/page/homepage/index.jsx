import {
  ClerkProvider,
  RedirectToSignIn,
  SignIn,
  SignInButton,
  SignUpButton,
  SignUp,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Card } from "antd";
import React, { useEffect } from "react";

function Homepage() {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  console.log(isSignedIn, "----");

  useEffect(() => {
    if (isSignedIn) {
      navigate("/upload");
    }
  }, [isSignedIn, navigate]);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Card
          style={{
            width: 350,
            height: 600,
            backgroundColor: "#f0f2f5",
            borderRadius: 8,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ width: 300 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "20px",
                textTransform: "uppercase",
                fontSize: "20px",
                fontWeight: 700,
              }}
            >
              SignIn / Signup
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "20px",
              }}
            >
              <SignInButton
                type="primary"
                htmlType="submit"
                style={{
                  height: "35px",
                  borderRadius: "5px",
                  borderColor: "none",
                  width: "30%",
                  backgroundColor: "#1890ff",
                  color: "#fff",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "20px",
              }}
            >
              <SignUpButton
                type="primary"
                htmlType="submit"
                style={{
                  height: "35px",
                  borderRadius: "5px",
                  borderColor: "none",
                  width: "30%",
                  backgroundColor: "#1890ff",
                  color: "#fff",
                }}
              />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

export default Homepage;
