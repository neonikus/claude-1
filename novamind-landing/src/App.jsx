import './App.css'
import BorderGlow from './components/BorderGlow'

const features = [
  {
    icon: '🧠',
    iconClass: 'purple',
    title: 'Neural Context Engine',
    desc: 'NovaMind remembers every conversation, document, and decision — building a living model of your work that grows smarter over time.',
    colors: ['#c084fc', '#a855f7', '#7c3aed'],
    glow: '270 70 75',
  },
  {
    icon: '⚡',
    iconClass: 'pink',
    title: 'Instant Synthesis',
    desc: 'Turn hours of research into sharp, actionable insights in seconds. Feed it anything — PDFs, links, notes — and get clarity immediately.',
    colors: ['#f472b6', '#ec4899', '#db2777'],
    glow: '330 70 75',
  },
  {
    icon: '🔒',
    iconClass: 'blue',
    title: 'Private by Design',
    desc: 'Your data never trains our models. End-to-end encryption, SOC 2 Type II certified, and deployable entirely on-premise.',
    colors: ['#38bdf8', '#0ea5e9', '#0284c7'],
    glow: '200 80 70',
  },
  {
    icon: '🔗',
    iconClass: 'green',
    title: 'Deep Integrations',
    desc: 'Connect Notion, Slack, Linear, GitHub, and 200+ tools. NovaMind works where you work — no context switching required.',
    colors: ['#34d399', '#10b981', '#059669'],
    glow: '160 65 65',
  },
  {
    icon: '🎯',
    iconClass: 'orange',
    title: 'Autonomous Agents',
    desc: 'Delegate multi-step tasks to AI agents that plan, execute, and report back. Ship faster without losing oversight.',
    colors: ['#fb923c', '#f97316', '#ea580c'],
    glow: '25 80 70',
  },
  {
    icon: '📊',
    iconClass: 'cyan',
    title: 'Team Intelligence',
    desc: 'Shared knowledge bases, collaborative prompts, and AI-powered wikis keep the whole team aligned and up to speed.',
    colors: ['#22d3ee', '#06b6d4', '#0891b2'],
    glow: '190 75 65',
  },
]

const testimonials = [
  {
    text: '"NovaMind cut our onboarding time in half. New engineers are productive on day one because the entire codebase context is just... there."',
    name: 'Mia Chen',
    role: 'CTO at Arkive',
    avatarBg: 'linear-gradient(135deg, #c084fc, #f472b6)',
    initial: 'M',
    colors: ['#c084fc', '#f472b6', '#a855f7'],
    glow: '280 70 75',
  },
  {
    text: '"I replaced four separate tools with NovaMind. My research workflow is now frictionless — it\'s like having a second brain that actually works."',
    name: 'James Okafor',
    role: 'Lead Researcher at Nexus Labs',
    avatarBg: 'linear-gradient(135deg, #38bdf8, #818cf8)',
    initial: 'J',
    colors: ['#38bdf8', '#818cf8', '#6366f1'],
    glow: '215 75 70',
  },
  {
    text: '"The autonomous agents handle our competitor analysis every week. We just wake up to a polished report in Slack. Absolutely wild."',
    name: 'Sofia Reyes',
    role: 'Head of Strategy at Meridian',
    avatarBg: 'linear-gradient(135deg, #34d399, #22d3ee)',
    initial: 'S',
    colors: ['#34d399', '#22d3ee', '#10b981'],
    glow: '170 70 65',
  },
]

const plans = [
  {
    name: 'Starter',
    price: '0',
    desc: 'For individuals exploring smarter ways to work.',
    features: [
      '50 AI requests / day',
      '3 integrations',
      '100 MB knowledge base',
      'Community support',
    ],
    btnClass: '',
    featured: false,
    colors: ['#c084fc', '#f472b6', '#38bdf8'],
    glow: '270 60 70',
  },
  {
    name: 'Pro',
    price: '29',
    desc: 'For power users who need unlimited intelligence.',
    features: [
      'Unlimited AI requests',
      'All 200+ integrations',
      '10 GB knowledge base',
      'Autonomous agents',
      'Priority support',
    ],
    btnClass: 'featured',
    featured: true,
    badge: 'Most popular',
    colors: ['#c084fc', '#f472b6', '#a855f7'],
    glow: '280 80 80',
  },
  {
    name: 'Team',
    price: '79',
    desc: 'For teams that want collective superintelligence.',
    features: [
      'Everything in Pro',
      'Up to 25 seats',
      'Shared knowledge bases',
      'Admin controls & SSO',
      'SLA & dedicated support',
    ],
    btnClass: '',
    featured: false,
    colors: ['#38bdf8', '#818cf8', '#6366f1'],
    glow: '210 75 75',
  },
]

export default function App() {
  return (
    <>
      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">NovaMind</div>
        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#testimonials">Stories</a></li>
          <li><a href="#pricing">Pricing</a></li>
        </ul>
        <button className="nav-cta">Get started free</button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg-glow" />
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          Now in public beta — join 12,000+ teams
        </div>
        <h1>
          Think faster.<br />
          <span className="grad">Work smarter.</span>
        </h1>
        <p>
          NovaMind is the AI workspace that learns your work, connects your tools,
          and amplifies your team's collective intelligence — without the complexity.
        </p>
        <div className="hero-buttons">
          <button className="btn-primary">Start for free</button>
          <button className="btn-secondary">See a demo →</button>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-value">12K+</div>
            <div className="hero-stat-label">Active teams</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">4.9★</div>
            <div className="hero-stat-label">Average rating</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">200+</div>
            <div className="hero-stat-label">Integrations</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">99.9%</div>
            <div className="hero-stat-label">Uptime SLA</div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features" id="features">
        <p className="section-label">Features</p>
        <h2 className="section-title">Everything your team needs</h2>
        <p className="section-subtitle">
          From solo researchers to enterprise teams — NovaMind adapts to
          how you work, not the other way around.
        </p>
        <div className="features-grid">
          {features.map((f) => (
            <BorderGlow
              key={f.title}
              className="feature-card"
              colors={f.colors}
              glowColor={f.glow}
              backgroundColor="#07001a"
              borderRadius={20}
              glowRadius={36}
            >
              <div className={`feature-icon ${f.iconClass}`}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </BorderGlow>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials" id="testimonials">
        <p className="section-label">Stories</p>
        <h2 className="section-title">Loved by builders</h2>
        <p className="section-subtitle">
          Teams across engineering, research, and strategy trust NovaMind
          to handle the cognitive heavy lifting.
        </p>
        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <BorderGlow
              key={t.name}
              className="testimonial-card"
              colors={t.colors}
              glowColor={t.glow}
              backgroundColor="#060014"
              borderRadius={20}
              glowRadius={36}
            >
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <div
                  className="testimonial-avatar"
                  style={{ background: t.avatarBg }}
                >
                  {t.initial}
                </div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </BorderGlow>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing" id="pricing">
        <p className="section-label">Pricing</p>
        <h2 className="section-title">Simple, honest pricing</h2>
        <p className="section-subtitle">
          Start free, upgrade when you're ready. No hidden fees, no surprise bills.
        </p>
        <div className="pricing-grid">
          {plans.map((plan) => (
            <BorderGlow
              key={plan.name}
              className="pricing-card"
              colors={plan.colors}
              glowColor={plan.glow}
              backgroundColor="#07001a"
              borderRadius={24}
              glowRadius={40}
              glowIntensity={plan.featured ? 1.2 : 0.9}
            >
              {plan.badge && <div className="pricing-badge">{plan.badge}</div>}
              <div className="pricing-plan">{plan.name}</div>
              <div className="pricing-price">
                <span className="pricing-currency">$</span>
                <span className="pricing-amount">{plan.price}</span>
                {plan.price !== '0' && <span className="pricing-period">/mo</span>}
              </div>
              <p className="pricing-desc">{plan.desc}</p>
              <div className="pricing-divider" />
              <ul className="pricing-features">
                {plan.features.map((feat) => (
                  <li key={feat}>
                    <span className="pricing-check">✦</span>
                    {feat}
                  </li>
                ))}
              </ul>
              <button className={`btn-plan ${plan.btnClass}`}>
                {plan.price === '0' ? 'Get started free' : `Get ${plan.name}`}
              </button>
            </BorderGlow>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <BorderGlow
          className="cta-card"
          colors={['#c084fc', '#f472b6', '#38bdf8']}
          glowColor="270 75 78"
          backgroundColor="#08001c"
          borderRadius={28}
          glowRadius={50}
          glowIntensity={1.1}
          animated
        >
          <h2>Your second brain<br />awaits.</h2>
          <p>
            Join 12,000+ teams already working smarter. Set up takes under
            two minutes — no credit card required.
          </p>
          <button className="btn-primary">Start for free today</button>
        </BorderGlow>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">NovaMind</div>
        <div className="footer-copy">© 2026 NovaMind, Inc. All rights reserved.</div>
      </footer>
    </>
  )
}
