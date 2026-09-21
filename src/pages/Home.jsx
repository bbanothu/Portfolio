import { Link } from 'react-router-dom'

const FOCUS_AREAS = [
  'React & React Native',
  'Next.js',
  'Node.js',
  'TypeScript',
  'Python',
  'AWS',
  'PostgreSQL',
  '0 → 1 Product Builds',
]

export default function Home() {
  return (
    <>
      <section className="pt-1 pb-2">
        <p className="hero-eyebrow">San Francisco, CA</p>
        <h1>Bharath Banothu</h1>
        <p className="hero-role">
          Full-Stack Engineer &amp; Founding Engineer | React · React Native · Next.js · Node.js · TypeScript · AWS
        </p>
        <p className="lead">
          Full-stack engineer and three-time founding engineer with 6+ years shipping products from 0 to 1. I&rsquo;ve
          architected systems, led small teams, and owned products end-to-end — from first commit to production — at
          early-stage startups, plus production experience at Meta and Cerner. Comfortable moving fast, wearing
          multiple hats, and building without a playbook.
        </p>
        <p className="lead">Core stack: React, React Native, Next.js, Node.js, TypeScript, Python, and AWS.</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link className="btn" to="/experience">
            View experience
          </Link>
          <Link className="btn" to="/contact">
            Contact
          </Link>
          <a className="btn" href="https://github.com/bbanothu" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
      </section>

      <section>
        <h2>Focus areas</h2>
        <div className="chips">
          {FOCUS_AREAS.map((area) => (
            <span className="chip" key={area}>
              {area}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h2>Currently</h2>
        <div className="card">
          <h3>Independent Consultant</h3>
          <p className="card-meta">Freelance / Full-Stack &amp; Technical Consulting · Jan 2025 – Present</p>
          <p>
            Delivering full-stack development and technical consulting for early-stage startups — helping teams
            launch and scale MVPs across web and mobile, architecting scalable system designs, and resolving
            production issues for client teams.
          </p>
          <p className="mb-0">
            <Link to="/experience">Full experience timeline →</Link>
          </p>
        </div>
      </section>
    </>
  )
}
