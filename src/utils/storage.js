import { STORAGE_KEY } from '../data/constants'

export function getRecords() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []

    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveRecord(record) {
  const records = getRecords()
  const nextRecords = [record, ...records]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextRecords))
}
