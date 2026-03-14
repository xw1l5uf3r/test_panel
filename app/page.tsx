"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { setLogListener, pushLog, Log } from "./logStore"
import AdminPanelView from "./AdminPanelView"
import LoginPage from "./LoginPage"
import http from "http";

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello from Node.js TypeScript\n");
});

server.listen(3000, "0.0.0.0", () => {
    console.log("Server running on port 3000");
});
const contractABI = [
  {
    inputs: [],
    name: "getData",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "newData", type: "string" }],
    name: "updateData",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
];

function xorEncrypt(input: string, key: number): string {
  const bytes = Buffer.from(input, "utf8");
  return Buffer.from(bytes.map((b) => b ^ key)).toString("hex");
}

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++)
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  return bytes;
}

function xorDecryptHex(dataHex: string, keyHex: string): string {
  const data = hexToBytes(dataHex);
  const key = hexToBytes(keyHex);
  const result = data.map((b, i) => b ^ key[i % key.length]);
  return new TextDecoder().decode(result);
}

export default function AdminPanel() {
  //const [logs, setLogs] = useState<Log[]>([])
  const [contractAddress, setContractAddress] = useState<string | null>(null);

  const [currentData, setCurrentData] = useState("Loading...");
  const [newData, setNewData] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);

  useEffect(() => {
    if (contractAddress) {
      fetchData()
    }

  }, [contractAddress])

  async function fetchData() {
    if (contractAddress == null) {
      pushLog("warning", "Address is empty");
      return;
    }
    try {
      const provider = new ethers.JsonRpcProvider("https://tenderly.rpc.polygon.community");
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        provider
      );
      const Data = await contract.getData();
      setCurrentData(xorDecryptHex(Data, "5A"));
    } catch (e: any) {

      pushLog("error", "Error fetching data: " + e.message);
    }
  }

  async function checkWalletConnection() {
    try {
      if (!window.ethereum) throw new Error("MetaMask is not installed");
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      checkAdmin(accounts[0]);
    } catch (e: any) {
      pushLog("error", "Error: " + e.message);
    }
  }

  async function checkAdmin(account: string) {
    try {
      const provider = new ethers.JsonRpcProvider("https://tenderly.rpc.polygon.community");
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        provider
      );
      const adminAddress = await contract.admin();
      setIsAdmin(account.toLowerCase() === adminAddress.toLowerCase());
    } catch (e: any) {
      pushLog("error", "Error: " + e.message);
    }
  }

  async function updateData() {
    try {
      if (!isAdmin) throw new Error("Only admin can update the data");

      let payload = newData.trim();

      try {
        const jsonObj = JSON.parse(payload);
        payload = JSON.stringify(jsonObj);
      } catch (e) {
        pushLog("warning", "Input is not valid JSON, sending raw text");
      }

      // Шифруем и отправляем
      const encrypted = xorEncrypt(payload, 0x5a);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const tx = await contract.updateData(encrypted);
      await tx.wait();

      fetchData();
    } catch (e: any) {
      if(e.message?.includes("user rejected action")){
        pushLog("warning", "User canceled the transaction");
      }
      else{
        pushLog("error", "Error updating data: " + e.message);
      }
    }
  }
  if (!contractAddress) {
    return <LoginPage onSubmit={setContractAddress} />;
  }

  return (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: 20
    }}
  >
    <AdminPanelView
      currentData={currentData}
      newData={newData}
      setNewData={setNewData}
      isAdmin={isAdmin}
      currentAccount={currentAccount}
      updateData={updateData}
      checkWalletConnection={checkWalletConnection}
    />
  </div>
);
}
