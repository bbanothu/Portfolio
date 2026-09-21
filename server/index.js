import 'dotenv/config'
import express from 'express'
import nodemailer from 'nodemailer'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distPath = path.join(__dirname, '..', 'dist')

const PORT = process.env.PORT || 5174
const CONTACT_TO = process.env.CONTACT_TO || 'bbanothu1997@gmail.com'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

transporter.verify().then(
  () => console.log('SMTP transport ready'),
  (err) => console.error('SMTP transport failed to verify:', err.message),
)

const app = express()
app.use(express.json({ limit: '10kb' }))

const cleanLine = (value) => String(value ?? '').replace(/[\r\n]+/g, ' ').trim()

app.post('/api/contact', async (req, res) => {
  const name = cleanLine(req.body?.name).slice(0, 200)
  const email = cleanLine(req.body?.email).slice(0, 200)
  const message = String(req.body?.message ?? '').trim().slice(0, 5000)

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' })
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'That email address does not look valid.' })
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: CONTACT_TO,
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      text: `${message}\n\n— ${name} (${email})`,
    })
    res.json({ ok: true })
  } catch (err) {
    console.error('Failed to send contact email:', err)
    res.status(502).json({ error: 'Failed to send email. Please try again later.' })
  }
})

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath))
  app.get(/.*/, (_req, res) => res.sendFile(path.join(distPath, 'index.html')))
}

app.listen(PORT, () => {
  console.log(`Contact API listening on http://localhost:${PORT}`)
})
