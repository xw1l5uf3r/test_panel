<<<<<<< HEAD
import { Log } from "./logStore"

type Props = {
  currentData: string
  newData: string
  setNewData: (v: string) => void
  isAdmin: boolean
  currentAccount: string | null
  logs: Log[]
  updateData: () => void
  checkWalletConnection: () => void
}

export default function AdminPanelView({
  currentData,
  newData,
  setNewData,
  isAdmin,
  currentAccount,
  logs,
  updateData,
  checkWalletConnection
}: Props) {

  return (
    <>
      <h1 style={{ marginBottom: 15, textAlign: "center", color: "#FFFAFA", fontSize: "48px" }}>
        Admin Panel
      </h1>

      {}
      <div
        style={{
          width: 700,
          maxWidth: "90%",
          backgroundColor: "#FFFFFFBF",
          borderRadius: 20,
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 0,
        }}
      >
        <h2 style={{ color: "#1C1C1C", fontSize: "24px" }}>Current Data</h2>
        <div
          style={{
            borderRadius: 20,
            overflow: "hidden",
            backgroundColor: "#E5E5E5",
          }}
        >
        <div
            style={{
              padding: "8px",
              borderRadius: 20,
              backgroundColor: "#E5E5E5",
              overflowY: "auto",
              overflowX: "auto",
            }}
          >
          {currentData}
          </div>
        </div>

        {isAdmin ? (
          <>
            <h3 style={{ fontSize: "24px", color: "#1C1C1C" }}>Update Data</h3>

            <div style={{ position: "relative", width: "100%" }}>
            <div
                style={{
                  borderRadius: 20,
                  overflow: "hidden", 
                  backgroundColor: "#E5E5E5"
                }}
              >
            <textarea
              value={newData}
              onChange={(e) => setNewData(e.target.value)}
              style={{ width: "100%", 
                    height: 300,
                    padding: "8px",
                    resize: "none",
                    backgroundColor: "#E5E5E5",
                    borderRadius: 20,
                    boxSizing: "border-box",
                    paddingBottom: "50px",
                    fontSize: "14px",
                    border: "none", 
                    outline: "none" }}
                  placeholder="Enter your JSON"
            />
              </div>
            <button onClick={updateData} style={{
                  position: "absolute",
                  bottom: 6,
                  right: 6
                }}>Update</button>
            </div>
          </>
        ) : (
          <p style={{ color: "#C41E3A", textAlign: "center" }}>You are not the admin</p>
        )}
      </div>

      <div style={{ marginTop: 10 }}>
        {currentAccount ? (
          <p style={{ color: "#F5F5F5" }}>Connected as: {currentAccount}</p>
        ) : (
          <button onClick={checkWalletConnection}>
            Connect Wallet
          </button>
        )}
      </div>

    </>
  )
=======
import { Log } from "./logStore"

type Props = {
  currentData: string
  newData: string
  setNewData: (v: string) => void
  isAdmin: boolean
  currentAccount: string | null
  logs: Log[]
  updateData: () => void
  checkWalletConnection: () => void
}

export default function AdminPanelView({
  currentData,
  newData,
  setNewData,
  isAdmin,
  currentAccount,
  logs,
  updateData,
  checkWalletConnection
}: Props) {

  return (
    <>
      <h1 style={{ marginBottom: 15, textAlign: "center", color: "#FFFAFA", fontSize: "48px" }}>
        Admin Panel
      </h1>

      {}
      <div
        style={{
          width: 700,
          maxWidth: "90%",
          backgroundColor: "#FFFFFFBF",
          borderRadius: 20,
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 0,
        }}
      >
        <h2 style={{ color: "#1C1C1C", fontSize: "24px" }}>Current Data</h2>
        <div
          style={{
            borderRadius: 20,
            overflow: "hidden",
            backgroundColor: "#E5E5E5",
          }}
        >
        <div
            style={{
              padding: "8px",
              borderRadius: 20,
              backgroundColor: "#E5E5E5",
              overflowY: "auto",
              overflowX: "auto",
            }}
          >
          {currentData}
          </div>
        </div>

        {isAdmin ? (
          <>
            <h3 style={{ fontSize: "24px", color: "#1C1C1C" }}>Update Data</h3>

            <div style={{ position: "relative", width: "100%" }}>
            <div
                style={{
                  borderRadius: 20,
                  overflow: "hidden", 
                  backgroundColor: "#E5E5E5"
                }}
              >
            <textarea
              value={newData}
              onChange={(e) => setNewData(e.target.value)}
              style={{ width: "100%", 
                    height: 300,
                    padding: "8px",
                    resize: "none",
                    backgroundColor: "#E5E5E5",
                    borderRadius: 20,
                    boxSizing: "border-box",
                    paddingBottom: "50px",
                    fontSize: "14px",
                    border: "none", 
                    outline: "none" }}
                  placeholder="Enter your JSON"
            />
              </div>
            <button onClick={updateData} style={{
                  position: "absolute",
                  bottom: 6,
                  right: 6
                }}>Update</button>
            </div>
          </>
        ) : (
          <p style={{ color: "#C41E3A", textAlign: "center" }}>You are not the admin</p>
        )}
      </div>

      <div style={{ marginTop: 10 }}>
        {currentAccount ? (
          <p style={{ color: "#F5F5F5" }}>Connected as: {currentAccount}</p>
        ) : (
          <button onClick={checkWalletConnection}>
            Connect Wallet
          </button>
        )}
      </div>

    </>
  )
>>>>>>> 10668668e591bbb09f4c012e6a2b97598338e54a
}