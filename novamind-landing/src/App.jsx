import { useState, useEffect, useRef } from 'react'
import './App.css'

const CIRCUMFERENCE = 2 * Math.PI * 54 // r=54

function getColor(score) {
  if (score === null) return 'c-neutral'
  if (score >= 67) return 'c-green'
  if (score >= 34) return 'c-yellow'
  return 'c-red'
}

function getStatus(score) {
  if (score === null) return '—'
  if (score >= 67) return 'Отличное'
  if (score >= 34) return 'Умеренное'
  return 'Низкое'
}

function formatTime(date) {
  return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
}

function simulateHRV() {
  // HRV в миллисекундах (реалистичный диапазон 20–90 мс)
  const hrv = Math.round(20 + Math.random() * 70)
  // Recovery: нормализуем HRV → 0–100
  const recovery = Math.min(100, Math.round((hrv / 90) * 100 + (Math.random() * 10 - 5)))
  const rhr = Math.round(48 + Math.random() * 20) // resting HR 48–68
  return { hrv, recovery: Math.max(0, Math.min(100, recovery)), rhr }
}

function HomeIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M3 12L12 3L21 12V21H15V15H9V21H3V12Z"
        fill={active ? 'currentColor' : 'none'}
        stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  )
}

function AssistantIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C6.48 2 2 6.48 2 12C2 13.85 2.5 15.58 3.37 17.07L2 22L6.93 20.63C8.42 21.5 10.15 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
        fill={active ? 'currentColor' : 'none'}
        stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M8 11H8.01M12 11H12.01M16 11H16.01"
        stroke={active ? '#000' : 'currentColor'} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function ProfileIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4"
        fill={active ? 'currentColor' : 'none'}
        stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 20C4 16.69 7.58 14 12 14C16.42 14 20 16.69 20 20"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export default function App() {
  const [tab, setTab] = useState('home')
  const [measuring, setMeasuring] = useState(false)
  const [progress, setProgress] = useState(0)   // 0–100
  const [current, setCurrent] = useState(null)   // { hrv, recovery, rhr }
  const [history, setHistory] = useState([])
  const [connected] = useState(true)
  const timerRef = useRef(null)
  const startRef = useRef(null)

  const DURATION = 5000 // 5 сек симуляция

  function startMeasure() {
    if (measuring) return
    setMeasuring(true)
    setProgress(0)
    startRef.current = performance.now()

    timerRef.current = setInterval(() => {
      const elapsed = performance.now() - startRef.current
      const p = Math.min((elapsed / DURATION) * 100, 100)
      setProgress(p)

      if (p >= 100) {
        clearInterval(timerRef.current)
        const result = simulateHRV()
        setCurrent(result)
        setHistory(prev => [
          { ...result, time: new Date() },
          ...prev.slice(0, 4),
        ])
        setMeasuring(false)
      }
    }, 50)
  }

  useEffect(() => () => clearInterval(timerRef.current), [])

  const score = current?.recovery ?? null
  const colorClass = getColor(score)
  const dashOffset = score === null
    ? CIRCUMFERENCE
    : CIRCUMFERENCE * (1 - score / 100)

  const faceClass = measuring ? 'measuring-face' : colorClass

  // ─── ASSISTANT TAB ───
  const [chatInput, setChatInput] = useState('')
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Привет! Я твой HRV-ассистент. Задай вопрос о своём восстановлении.' }
  ])

  function sendMessage() {
    const text = chatInput.trim()
    if (!text) return
    const userMsg = { from: 'user', text }
    const reply = getAutoReply(text, current)
    setMessages(prev => [...prev, userMsg, { from: 'bot', text: reply }])
    setChatInput('')
  }

  function getAutoReply(text, data) {
    const t = text.toLowerCase()
    if (t.includes('hrv') || t.includes('хрв')) {
      return data
        ? `Твой последний HRV: ${data.hrv} мс. ${data.hrv >= 55 ? 'Отличный показатель — нервная система хорошо восстановлена.' : data.hrv >= 35 ? 'Умеренный HRV. Стоит добавить сон и снизить стресс.' : 'Низкий HRV. Рекомендую отдых и избегать интенсивных нагрузок.'}`
        : 'Сначала сделай измерение на главной — тогда смогу проанализировать твой HRV.'
    }
    if (t.includes('восстановл') || t.includes('recovery')) {
      return data
        ? `Твой Recovery Score: ${data.recovery}. ${data.recovery >= 67 ? 'Зелёная зона — можно тренироваться на полную.' : data.recovery >= 34 ? 'Жёлтая зона — умеренная нагрузка, не перегружайся.' : 'Красная зона — организм не восстановился. Лучше лёгкая активность или отдых.'}`
        : 'Сначала сделай измерение на главной.'
    }
    if (t.includes('трениров') || t.includes('спорт')) {
      return data
        ? (data.recovery >= 67
            ? 'Сегодня зелёный день — отличное время для высокоинтенсивной тренировки!'
            : data.recovery >= 34
              ? 'Recovery умеренный. Подойдёт средняя нагрузка: кардио или силовая в 70–80% от макс.'
              : 'Recovery низкий. Рекомендую прогулку или лёгкую растяжку — не форсируй.')
        : 'Сначала сделай измерение, чтобы я мог дать персональный совет.'
    }
    if (t.includes('сон') || t.includes('sleep')) {
      return 'HRV тесно связан со сном. Старайся спать 7–9 часов, ложиться до полуночи и избегать алкоголя — он сильно снижает HRV.'
    }
    return 'Я могу ответить на вопросы о твоём HRV, recovery, тренировках и сне. Попробуй спросить!'
  }

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="header-logo">CUBE<span>HRV</span></div>
        <div className="header-status">
          <div className={`header-dot ${connected ? '' : 'offline'}`} />
          {connected ? 'ПОДКЛЮЧЕН' : 'НЕТ СВЯЗИ'}
        </div>
      </header>

      <main className="main">
      {tab === 'assistant' && (
        <div className="chat-screen">
          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble ${m.from}`}>{m.text}</div>
            ))}
          </div>
          <div className="chat-input-row">
            <input
              className="chat-input"
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Спроси об HRV, сне, тренировках..."
            />
            <button className="chat-send" onClick={sendMessage}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {tab === 'profile' && (
        <div className="profile-screen">
          <div className="profile-avatar">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M4 20C4 16.69 7.58 14 12 14C16.42 14 20 16.69 20 20"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="profile-name">Пользователь</div>
          <div className="profile-device">CubeHRV • Устройство подключено</div>

          <div className="profile-stats">
            <div className="profile-stat">
              <div className="profile-stat-val">{history.length}</div>
              <div className="profile-stat-label">Измерений</div>
            </div>
            <div className="profile-stat">
              <div className="profile-stat-val">
                {history.length ? Math.round(history.reduce((s, h) => s + h.recovery, 0) / history.length) : '—'}
              </div>
              <div className="profile-stat-label">Ср. Recovery</div>
            </div>
            <div className="profile-stat">
              <div className="profile-stat-val">
                {history.length ? Math.round(history.reduce((s, h) => s + h.hrv, 0) / history.length) : '—'}
              </div>
              <div className="profile-stat-label">Ср. HRV мс</div>
            </div>
          </div>

          <div className="profile-section-title">Настройки</div>
          {[
            { label: 'Уведомления', hint: 'Включены' },
            { label: 'Единицы HRV', hint: 'Миллисекунды' },
            { label: 'Синхронизация', hint: 'Авто' },
          ].map(item => (
            <div className="profile-row" key={item.label}>
              <span>{item.label}</span>
              <span className="profile-row-hint">{item.hint}</span>
            </div>
          ))}
        </div>
      )}
      {tab === 'home' && <>
        {/* CUBE + RING */}
        <div className="cube-section">
          {/* 3D куб */}
          <div className="cube-scene">
            <div className={`cube ${measuring ? 'measuring' : ''}`}>
              <div className={`cube-face front  ${faceClass}`} />
              <div className={`cube-face back   ${faceClass}`} />
              <div className={`cube-face left   ${faceClass}`} />
              <div className={`cube-face right  ${faceClass}`} />
              <div className={`cube-face top    ${faceClass}`} />
              <div className={`cube-face bottom ${faceClass}`} />
            </div>
          </div>

          {/* Recovery ring */}
          {measuring ? (
            <div className="measuring-overlay">
              <div className="measuring-dots">
                <div className="measuring-dot" />
                <div className="measuring-dot" />
                <div className="measuring-dot" />
              </div>
              <div className="measuring-text">АНАЛИЗ HRV...</div>
            </div>
          ) : (
            <div className="recovery-ring">
              <svg className="ring-svg" viewBox="0 0 120 120">
                <circle className="ring-track" cx="60" cy="60" r="54" />
                <circle
                  className={`ring-fill ${colorClass}`}
                  cx="60" cy="60" r="54"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={dashOffset}
                />
              </svg>
              <div className="ring-content">
                <div className={`ring-score ${colorClass}`}>
                  {score ?? '—'}
                </div>
                <div className="ring-label">RECOVERY</div>
                <div className={`ring-status ${colorClass}`}>
                  {getStatus(score)}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* METRICS */}
        <div className="metrics-row">
          <div className="metric-card">
            <div className="metric-card-label">HRV</div>
            <div className="metric-card-value" style={{ color: current ? 'var(--text)' : 'var(--text-dim)' }}>
              {measuring ? '...' : (current?.hrv ?? '—')}
            </div>
            <div className="metric-card-unit">мс</div>
          </div>
          <div className="metric-card">
            <div className="metric-card-label">Пульс покоя</div>
            <div className="metric-card-value" style={{ color: current ? 'var(--text)' : 'var(--text-dim)' }}>
              {measuring ? '...' : (current?.rhr ?? '—')}
            </div>
            <div className="metric-card-unit">уд/мин</div>
          </div>
        </div>

        {/* BUTTON */}
        <button
          className="measure-btn"
          onClick={startMeasure}
          disabled={measuring}
        >
          {measuring
            ? `Измеряем... ${Math.round(progress)}%`
            : current
              ? 'Измерить снова'
              : 'Начать измерение'
          }
        </button>

        {/* HISTORY */}
        <div className="history-section">
          <div className="history-title">История</div>
          {history.length === 0 ? (
            <div className="empty-history">Нет данных — нажми «Начать измерение»</div>
          ) : (
            <div className="history-list">
              {history.map((item, i) => {
                const c = getColor(item.recovery)
                return (
                  <div className="history-item" key={i}>
                    <div className="history-item-left">
                      <div className={`history-dot ${c}`} />
                      <div className="history-meta">
                        <div className="history-time">{formatTime(item.time)}</div>
                        <div className="history-hrv-val">HRV {item.hrv} мс · {item.rhr} уд/мин</div>
                      </div>
                    </div>
                    <div className={`history-score ${c}`}>{item.recovery}</div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </>}
      </main>

      {/* BOTTOM NAV */}
      <nav className="bottom-nav">
        {[
          { id: 'home',      label: 'Главная',   Icon: HomeIcon },
          { id: 'assistant', label: 'Ассистент', Icon: AssistantIcon },
          { id: 'profile',   label: 'Профиль',   Icon: ProfileIcon },
        ].map(({ id, label, Icon }) => (
          <button
            key={id}
            className={`nav-item ${tab === id ? 'active' : ''}`}
            onClick={() => setTab(id)}
          >
            <Icon active={tab === id} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </>
  )
}
