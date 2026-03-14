<<<<<<< HEAD
export type Log = {
  id: number
  type: "error" | "warning"
  text: string
}

let logs: Log[] = []

let listener: ((logs: Log[]) => void) | null = null

export function setLogListener(fn: (logs: Log[]) => void) {
  listener = fn
}

export function pushLog(type: Log["type"], text: string) {
  const log = {
    id: Date.now(),
    type,
    text
  }

  logs = [...logs, log]

  listener?.(logs)

  setTimeout(() => {
    logs = logs.filter((l) => l.id !== log.id)
    listener?.(logs)
  }, 10000)
=======
export type Log = {
  id: number
  type: "error" | "warning"
  text: string
}

let logs: Log[] = []

let listener: ((logs: Log[]) => void) | null = null

export function setLogListener(fn: (logs: Log[]) => void) {
  listener = fn
}

export function pushLog(type: Log["type"], text: string) {
  const log = {
    id: Date.now(),
    type,
    text
  }

  logs = [...logs, log]

  listener?.(logs)

  setTimeout(() => {
    logs = logs.filter((l) => l.id !== log.id)
    listener?.(logs)
  }, 10000)
>>>>>>> 10668668e591bbb09f4c012e6a2b97598338e54a
}