"use client";
import { useState } from "react";

import { setLogListener, pushLog, Log } from "./logStore"
type Props = {
  onSubmit: (address: string) => void;
};
function isEthAddress(address: string): boolean {
  const ethRegex = /^0x[a-fA-F0-9]{40}$/;
  return ethRegex.test(address);
}
export default function LoginPage({ onSubmit }: Props) {
  const [address, setAddress] = useState("");

  function handleSubmit() {
    if (!address.trim()){
      pushLog("error", "Enter Contract Address");
      return;
    }
    else if(!isEthAddress(address.trim())){
      pushLog("error", "This is not an Ethereum address");
      return;
    }
    onSubmit(address.trim());
  }

  return (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    }}
  >

    <h1 style={{ marginBottom: 15, textAlign: "center", color: "#FFFAFA", fontSize: "48px" }}>
      Sign In
    </h1>
    <div

      style={{
        background: "#FFFFFFBF",
        padding: 30,
        borderRadius: 20,
        width: 400,
        display: "flex",
        flexDirection: "column",
        gap: 10
      }}
    >
      <h2 style={{ margin: 0,fontSize: "24px", color: "#1C1C1C"}}>Enter Contract Address</h2>

      <input
        style={{ border: "none",
    outline: "none", height: 30, backgroundColor: "#E5E5E5",}}
        id="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="0x..."
      />

        
      <button style={{height: 35}} onClick={handleSubmit}>Continue</button>
    </div>
  </div>

);
}
