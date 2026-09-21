import { NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import AppOverlay from './AppOverlay.jsx'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/experience', label: 'Experience' },
  { to: '/skills', label: 'Skills' },
  { to: '/contact', label: 'Contact' },
]

function useClock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }))
    tick()
    const id = setInterval(tick, 30000)
    return () => clearInterval(id)
  }, [])

  return time || '--:--'
}

function DocumentIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 1h6l4 4v10H3z" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M9 1v4h4" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5 8h6M5 10.5h6M5 13h4" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  )
}

function EnvelopeIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <rect x="1.5" y="3" width="13" height="10" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1.5 3l6.5 5.5L14.5 3" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <rect x="1.5" y="2.5" width="13" height="12" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1.5 5.5h13M4.5 1v3M11.5 1v3" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

const RESUME_HREF = '/Bharath_Banothu_Resume.pdf'

function DesktopIcons({ onOpenApp }) {
  return (
    <div className="mx-auto mb-5 flex max-w-[860px] flex-wrap gap-3 xl:fixed xl:top-16 xl:left-6 xl:mx-0 xl:mb-0 xl:max-w-none xl:flex-col xl:gap-5">
      <a className="desktop-icon" href={RESUME_HREF} target="_blank" rel="noopener noreferrer" title="Open resume (PDF)">
        <span className="desktop-icon-glyph">
          <DocumentIcon />
        </span>
        <span className="desktop-icon-label">resume.pdf</span>
      </a>
      <button type="button" className="desktop-icon" onClick={() => onOpenApp('mail')} title="Email Bharath">
        <span className="desktop-icon-glyph">
          <EnvelopeIcon />
        </span>
        <span className="desktop-icon-label">mail.app</span>
      </button>
      <button type="button" className="desktop-icon" onClick={() => onOpenApp('calendly')} title="Schedule via Calendly">
        <span className="desktop-icon-glyph">
          <CalendarIcon />
        </span>
        <span className="desktop-icon-label">calendly</span>
      </button>
    </div>
  )
}

function TopBar({ title, hidden, onOpenApp }) {
  const location = useLocation()
  const clock = useClock()

  if (hidden) return null

  return (
    <div className="topbar">
      <div className="flex items-center gap-1">
        {NAV_LINKS.map((link, i) => (
          <NavLink
            key={link.to}
            to={link.to}
            end
            title={link.label}
            className={() => `workspace${location.pathname === link.to ? ' active' : ''}`}
          >
            {i + 1}
          </NavLink>
        ))}
      </div>
      <div className="topbar-path">Bharath Banothu — {title}</div>
      <div className="ml-auto flex items-center gap-2">
        <a className="topbar-module" href={RESUME_HREF} target="_blank" rel="noopener noreferrer" title="Open resume (PDF)">
          <DocumentIcon />
          Resume
        </a>
        <button type="button" className="topbar-module" onClick={() => onOpenApp('mail')} title="Email Bharath">
          <EnvelopeIcon />
          Email
        </button>
        <button type="button" className="topbar-module" onClick={() => onOpenApp('calendly')} title="Schedule via Calendly">
          <CalendarIcon />
          Calendly
        </button>
        <span className="topbar-clock">{clock}</span>
        <span className="h-2.5 w-2.5 shrink-0 bg-green" title="Available for work" aria-hidden="true" />
      </div>
    </div>
  )
}

export default function Layout({ title, file, children }) {
  const [windowState, setWindowState] = useState('normal')
  const [activeApp, setActiveApp] = useState(null)
  const isMinimized = windowState === 'minimized'
  const isMaximized = windowState === 'maximized'
  const isClosed = windowState === 'closed'

  const stop = (fn) => (event) => {
    event.stopPropagation()
    fn()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <TopBar title={title} hidden={isMaximized} onOpenApp={setActiveApp} />

      <div className="flex flex-1 flex-col px-4 pt-6 pb-4">
        {!isMaximized && <DesktopIcons onOpenApp={setActiveApp} />}

        {isClosed ? (
          <div className="closed-tile">
            <button
              type="button"
              onClick={() => setWindowState('normal')}
              className="closed-tile-inner focus-visible:outline focus-visible:outline-dotted focus-visible:outline-accent"
            >
              <strong>window closed</strong>
              <p>~/resume/{file} — click to reopen, or press a workspace number above</p>
            </button>
          </div>
        ) : (
          <div
            className={
              isMaximized
                ? 'winpanel !fixed !inset-0 !z-50 !m-0 !max-w-none'
                : isMinimized
                  ? 'winpanel !min-h-0 !flex-none'
                  : 'winpanel'
            }
          >
            <div
              className="winpanel-header"
              onClick={isMinimized ? () => setWindowState('normal') : undefined}
              style={isMinimized ? { cursor: 'pointer' } : undefined}
            >
              <div className="winpanel-title">
                <span className="winpanel-dot" aria-hidden="true" />
                <span>~/resume/{file}</span>
              </div>
              <div className="flex shrink-0 gap-1">
                <button
                  type="button"
                  className="ctrl-btn"
                  onClick={stop(() => setWindowState(isMinimized ? 'normal' : 'minimized'))}
                  title={isMinimized ? 'Restore' : 'Minimize'}
                >
                  &#95;
                </button>
                <button
                  type="button"
                  className="ctrl-btn"
                  onClick={stop(() => setWindowState(isMaximized ? 'normal' : 'maximized'))}
                  title={isMaximized ? 'Restore down' : 'Maximize'}
                >
                  {isMaximized ? '❐' : '□'}
                </button>
                <button type="button" className="ctrl-btn close" onClick={stop(() => setWindowState('closed'))} title="Close">
                  ×
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                <div className="winpanel-body">{children}</div>
                <div className="statusline">
                  <span>NORMAL</span>
                  <span className="muted-seg">~/resume/{file}</span>
                  <span className="spacer" />
                  <span className="muted-seg">UTF-8</span>
                  <span>md</span>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <AppOverlay app={activeApp} onClose={() => setActiveApp(null)} />
    </div>
  )
}
