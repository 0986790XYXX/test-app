import { useMemo, useState } from 'react'
import Card from '../components/Card'
import { PRESET_FACTORS, PRESET_MOODS } from '../data/constants'
import { saveRecord } from '../utils/storage'

function HomePage() {
  const [selectedMood, setSelectedMood] = useState('')
  const [customMood, setCustomMood] = useState('')
  const [selectedFactors, setSelectedFactors] = useState([])
  const [customFactorInput, setCustomFactorInput] = useState('')
  const [customFactors, setCustomFactors] = useState([])
  const [note, setNote] = useState('')
  const [message, setMessage] = useState('')

  const allFactors = useMemo(() => [...PRESET_FACTORS, ...customFactors], [customFactors])

  const activeMood = selectedMood === '自定义' ? customMood.trim() : selectedMood

  function handleToggleFactor(factor) {
    setSelectedFactors((current) =>
      current.includes(factor) ? current.filter((item) => item !== factor) : [...current, factor],
    )
  }

  function handleAddCustomFactor() {
    const nextFactor = customFactorInput.trim()
    if (!nextFactor) return
    if (allFactors.includes(nextFactor)) {
      setCustomFactorInput('')
      return
    }

    setCustomFactors((current) => [...current, nextFactor])
    setSelectedFactors((current) => [...current, nextFactor])
    setCustomFactorInput('')
  }

  function resetForm() {
    setSelectedMood('')
    setCustomMood('')
    setSelectedFactors([])
    setCustomFactorInput('')
    setCustomFactors([])
    setNote('')
  }

  function handleSave() {
    if (!activeMood) {
      setMessage('请先选择或输入今天的情绪。')
      return
    }

    const record = {
      id: crypto.randomUUID(),
      mood: activeMood,
      factors: selectedFactors,
      note: note.trim(),
      date: new Date().toISOString(),
    }

    saveRecord(record)
    setMessage('已保存今天的情绪打卡。')
    resetForm()
  }

  return (
    <div className="space-y-4">
      <Card title="1. 今天的情绪">
        <div className="flex flex-wrap gap-2">
          {[...PRESET_MOODS, '自定义'].map((mood) => {
            const active = selectedMood === mood
            return (
              <button
                key={mood}
                type="button"
                className={`rounded-full border px-3 py-2 text-sm transition ${
                  active
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-slate-300 hover:border-slate-400'
                }`}
                onClick={() => setSelectedMood(mood)}
              >
                {mood}
              </button>
            )
          })}
        </div>
        {selectedMood === '自定义' && (
          <input
            type="text"
            value={customMood}
            onChange={(event) => setCustomMood(event.target.value)}
            placeholder="输入你的情绪..."
            className="mt-3 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none transition focus:border-indigo-500"
          />
        )}
      </Card>

      <Card title="2. 影响因素（可多选）">
        <div className="flex flex-wrap gap-2">
          {allFactors.map((factor) => {
            const active = selectedFactors.includes(factor)
            return (
              <button
                key={factor}
                type="button"
                className={`rounded-full border px-3 py-2 text-sm transition ${
                  active
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-slate-300 hover:border-slate-400'
                }`}
                onClick={() => handleToggleFactor(factor)}
              >
                {factor}
              </button>
            )
          })}
        </div>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <input
            type="text"
            value={customFactorInput}
            onChange={(event) => setCustomFactorInput(event.target.value)}
            placeholder="添加自定义因素"
            className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none transition focus:border-indigo-500"
          />
          <button
            type="button"
            onClick={handleAddCustomFactor}
            className="rounded-xl bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800"
          >
            添加
          </button>
        </div>
      </Card>

      <Card title="3. 简短记录">
        <textarea
          rows={4}
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="今天发生了什么？（可选）"
          className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none transition focus:border-indigo-500"
        />
      </Card>

      <Card>
        <button
          type="button"
          onClick={handleSave}
          className="w-full rounded-xl bg-indigo-600 px-4 py-2.5 font-medium text-white transition hover:bg-indigo-500"
        >
          保存到本地
        </button>
        {message && <p className="mt-3 text-sm text-slate-600">{message}</p>}
      </Card>
    </div>
  )
}

export default HomePage
