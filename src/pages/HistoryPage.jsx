import { useMemo } from 'react'
import Card from '../components/Card'
import { getRecords } from '../utils/storage'

function formatDate(dateString) {
  return new Date(dateString).toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function HistoryPage() {
  const records = useMemo(() => getRecords(), [])

  if (records.length === 0) {
    return (
      <Card>
        <p className="text-sm text-slate-600">还没有历史记录，先去“今日打卡”添加一条吧。</p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {records.map((record) => (
        <Card key={record.id}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-lg font-semibold">{record.mood}</p>
            <span className="text-xs text-slate-500">{formatDate(record.date)}</span>
          </div>

          <div className="mt-3">
            <p className="mb-1 text-sm font-medium text-slate-700">影响因素</p>
            {record.factors?.length ? (
              <div className="flex flex-wrap gap-2">
                {record.factors.map((factor) => (
                  <span
                    key={factor}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700"
                  >
                    {factor}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">未选择</p>
            )}
          </div>

          <div className="mt-3">
            <p className="mb-1 text-sm font-medium text-slate-700">记录</p>
            <p className="whitespace-pre-wrap text-sm text-slate-600">{record.note || '（无）'}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default HistoryPage
