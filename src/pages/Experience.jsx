const JOBS = [
  {
    title: 'Independent Consultant',
    meta: 'Freelance / Full-Stack & Technical Consulting · Jan 2025 – Present',
    bullets: [
      'Delivered full-stack development and technical consulting for early-stage startups, helping teams launch and scale MVPs across web and mobile platforms.',
      'Architected scalable system designs, optimized engineering workflows, and resolved production issues for client teams.',
    ],
  },
  {
    title: 'Founding Engineer',
    meta: 'Delivery Collective (withBites / Bites) · Jun 2023 – Sep 2024',
    bullets: [
      'Scaled a food delivery startup from 3 to 1,100+ weekly active customers by building and maintaining the customer-facing web and mobile experience and designing the backend infrastructure end-to-end.',
      'Monitored and supported live order processing outside standard hours to protect customer satisfaction and retention during the company’s highest-growth phase.',
      'Built with Next.js, React Native, Node.js, Python, PostgreSQL, AWS, and Git.',
    ],
  },
  {
    title: 'Founding Engineer (Frontend)',
    meta: 'Outpace.ai · Nov 2022 – Jun 2023',
    bullets: ['Built core MVP1 features as the frontend engineer on a small founding team, using React, Python, Git, and SQL.'],
  },
  {
    title: 'Founding Engineer → Lead Engineer',
    meta: 'Datatrixs (formerly FinPro) · Aug 2021 – Jun 2023',
    bullets: [
      'Led end-to-end product design and delivery of Datatrixs’ MVP1 in a 4-month turnaround, partnering directly with the CEO and product designer.',
      'Promoted to lead engineer; directed technical strategy and roadmap execution as the product matured.',
      'As founding consultant for FinPro (Aug 2021 – Nov 2022), led MVP1 from concept to launch in 6 months and managed a team of 3 contractors and 1 designer.',
      'Built with React, Node.js, AWS, Seed, Netlify, and Git.',
    ],
  },
  {
    title: 'Software Engineer III (Contract)',
    meta: 'Meta · Jul 2021 – Nov 2022',
    bullets: [
      'Designed and shipped key features for Channel Marketing Home, completing its migration from the legacy Marketing Home product.',
      'Collaborated within a cross-functional team of 20 engineers, designers, and product owners, and mentored newly onboarded engineers.',
      'Built with React, TypeScript, JavaScript, Hack, and Python.',
    ],
  },
  {
    title: 'Software Engineer',
    meta: 'Cerner · May 2020 – Jul 2021',
    bullets: [
      'Built Patient eSignature, an iOS application enabling secure document signing at the point of care.',
      'Extended the product with a web version for integration into Cerner’s EMR portal, partnering with a 7-person engineering team and cross-functional stakeholders to ship targeted features.',
      'Built with React, TypeScript, JavaScript, Node.js, Ruby on Rails, and Git.',
    ],
  },
  {
    title: 'Software Engineer Intern',
    meta: 'American Family Insurance · May 2019 – Aug 2019',
    bullets: [
      'Built a third-party vendor data API to streamline claims processing and implemented a weather-related claims rating algorithm in Java.',
    ],
  },
  {
    title: 'Front End Developer',
    meta: 'Facilities Planning & Management, Iowa State University · May 2018 – Dec 2018',
    bullets: ['Redesigned and developed internal web portals plus 15 external client sites, improving UX and site performance.'],
  },
]

export default function Experience() {
  return (
    <>
      <h1>Experience</h1>
      <p className="page-intro">
        Six-plus years across three founding-engineer roles, a contract at Meta, and production healthcare software
        at Cerner — from first commit to production.
      </p>

      {JOBS.map((job) => (
        <article className="card" key={job.title + job.meta}>
          <h3>{job.title}</h3>
          <p className="card-meta">{job.meta}</p>
          <ul>
            {job.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </article>
      ))}

      <section>
        <h2>Education</h2>
        <div className="card">
          <h3>Bachelor of Science, Computer Science</h3>
          <p className="card-meta mb-0">Iowa State University · Dec 2019</p>
        </div>
      </section>
    </>
  )
}
