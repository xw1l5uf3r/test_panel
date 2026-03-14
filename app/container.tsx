<<<<<<< HEAD
// components/ToastContainer.tsx
"use client";
import { useEffect, useState } from "react";
import { setLogListener, Log } from "./logStore";
import { Lexend } from 'next/font/google'

const lexend = Lexend({ subsets: ['latin'], weight: ['400','500','600','700'] })
export default function ToastContainer() {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    setLogListener(setLogs);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        zIndex: 9999,
      }}
    >
      {logs.map((log) => (
        <div

          className={lexend.className}
          key={log.id}
          style={{
            maxWidth: 200,
            maxHeight: 100,
            padding: "8px 12px",
            overflow: "hidden",
            borderRadius: 20,
            color: "#fff",
            background: log.type === "error" ? "#d9534f" : "#f0ad4e",
          }}
        >
          {log.text}
        </div>
      ))}
    </div>
  );
=======
// components/ToastContainer.tsx
"use client";
import { useEffect, useState } from "react";
import { setLogListener, Log } from "./logStore";
import { Lexend } from 'next/font/google'

const lexend = Lexend({ subsets: ['latin'], weight: ['400','500','600','700'] })
export default function ToastContainer() {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    setLogListener(setLogs);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        zIndex: 9999,
      }}
    >
      {logs.map((log) => (
        <div

          className={lexend.className}
          key={log.id}
          style={{
            maxWidth: 200,
            maxHeight: 100,
            padding: "8px 12px",
            overflow: "hidden",
            borderRadius: 20,
            color: "#fff",
            background: log.type === "error" ? "#d9534f" : "#f0ad4e",
          }}
        >
          {log.text}
        </div>
      ))}
    </div>
  );
>>>>>>> 10668668e591bbb09f4c012e6a2b97598338e54a
}