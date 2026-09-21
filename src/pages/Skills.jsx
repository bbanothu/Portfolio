const ACTIVITIES = [
  { name: 'Competitive Chess', note: '2012 – Present · Captain, Moline HS Chess Team (2015)' },
  { name: 'Boxing', note: 'National Collegiate Boxing Association · 2016 – Present' },
]

const SKILL_GROUPS = [
  {
    title: 'Languages',
    chips: ['TypeScript', 'JavaScript', 'Python', 'Java', 'PHP', 'Ruby'],
  },
  {
    title: 'Frontend',
    chips: ['React', 'React Native', 'Next.js', 'HTML/CSS'],
  },
  {
    title: 'Backend & Data',
    chips: ['Node.js', 'Ruby on Rails', 'REST APIs', 'SQL', 'NoSQL', 'PostgreSQL'],
  },
  {
    title: 'Infrastructure',
    chips: ['AWS', 'Docker', 'CI/CD', 'Git', 'Linux', 'Netlify'],
  },
]

export default function Skills() {
  return (
    <>
      <h1>Skills &amp; Activities</h1>
      <p className="page-intro">
        Grouped the way I build day to day: languages first, then the frontend and backend stack, then the
        infrastructure that ships it — plus what keeps me sharp outside of code.
      </p>

      <h2>Activities</h2>
      <div className="cert-row">
        {ACTIVITIES.map((activity) => (
          <div className="cert" key={activity.name}>
            {activity.name}
            <small>{activity.note}</small>
          </div>
        ))}
      </div>

      <h2>Technical skills</h2>
      {SKILL_GROUPS.map((group) => (
        <div className="skill-group" key={group.title}>
          <h3>{group.title}</h3>
          <div className="chips">
            {group.chips.map((chip) => (
              <span className="chip" key={chip}>
                {chip}
              </span>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}
