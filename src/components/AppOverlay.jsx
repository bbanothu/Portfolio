import { useEffect, useState } from 'react'

const CALENDLY_URL = 'https://calendly.com/bharathbanothu'

function AppWindow({ title, file, onClose, children }) {
  const [state, setState] = useState('normal')
  const isMinimized = state === 'minimized'
  const isMaximized = state === 'maximized'

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const stop = (fn) => (event) => {
    event.stopPropagation()
    fn()
  }

  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div
        className={
          isMaximized
            ? 'winpanel !fixed !inset-0 !z-50 !m-0 !max-w-none'
            : isMinimized
              ? 'winpanel !min-h-0 !flex-none'
              : 'winpanel'
        }
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div
          className="winpanel-header"
          onClick={isMinimized ? () => setState('normal') : undefined}
          style={isMinimized ? { cursor: 'pointer' } : undefined}
        >
          <div className="winpanel-title">
            <span className="winpanel-dot" aria-hidden="true" />
            <span>{title}</span>
          </div>
          <div className="flex shrink-0 gap-1">
            <button
              type="button"
              className="ctrl-btn"
              onClick={stop(() => setState(isMinimized ? 'normal' : 'minimized'))}
              title={isMinimized ? 'Restore' : 'Minimize'}
            >
              &#95;
            </button>
            <button
              type="button"
              className="ctrl-btn"
              onClick={stop(() => setState(isMaximized ? 'normal' : 'maximized'))}
              title={isMaximized ? 'Restore down' : 'Maximize'}
            >
              {isMaximized ? '❐' : '□'}
            </button>
            <button type="button" className="ctrl-btn close" onClick={stop(onClose)} title="Close">
              ×
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {children}
            <div className="statusline">
              <span>NORMAL</span>
              <span className="muted-seg">~/apps/{file}</span>
              <span className="spacer" />
              <span className="muted-seg">UTF-8</span>
              <span>app</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function MailApp() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('sending')
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Failed to send.')
      setStatus('sent')
    } catch (err) {
      setStatus('error')
      setError(err.message || 'Something went wrong. Please try again.')
    }
  }

  if (status === 'sent') {
    return (
      <div className="winpanel-body">
        <p className="lead">Message sent — thanks for reaching out. I'll get back to you soon.</p>
      </div>
    )
  }

  return (
    <form className="winpanel-body" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="mail-name">Name</label>
        <input
          id="mail-name"
          name="name"
          required
          value={form.name}
          onChange={handleChange}
          placeholder="Bender Bending Rodríguez"
        />
      </div>
      <div className="field">
        <label htmlFor="mail-email">Email</label>
        <input
          id="mail-email"
          type="email"
          name="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder="bender@planetexpress.com"
        />
      </div>
      <div className="field">
        <label htmlFor="mail-message">Message</label>
        <textarea
          id="mail-message"
          name="message"
          rows={5}
          required
          value={form.message}
          onChange={handleChange}
          placeholder="Let's talk about..."
        />
      </div>
      <button type="submit" className="btn" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send'}
      </button>
      {status === 'error' && <p className="mt-3 text-xs text-red">{error}</p>}
    </form>
  )
}

function CalendlyApp() {
  return (
    <div className="winpanel-body flex flex-1 flex-col !p-0">
      <iframe title="Schedule time with Bharath Banothu" src={CALENDLY_URL} className="w-full flex-1 border-0 bg-white" />
      <div className="flex justify-center border-t border-border-strong px-4 py-2">
        <a className="text-xs" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
          Open in a new tab ↗
        </a>
      </div>
    </div>
  )
}

export default function AppOverlay({ app, onClose }) {
  if (app === 'mail') {
    return (
      <AppWindow title="~/apps/mail.app" file="mail.app" onClose={onClose}>
        <MailApp />
      </AppWindow>
    )
  }
  if (app === 'calendly') {
    return (
      <AppWindow title="~/apps/calendly.app" file="calendly.app" onClose={onClose}>
        <CalendlyApp />
      </AppWindow>
    )
  }
  return null
}
