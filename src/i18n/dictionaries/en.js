const en = {
  nav: {
    services: 'Services',
    work: 'What we build',
    process: 'How we work',
    contact: 'Contact',
    cta: "Let's talk about your project",
  },
  hero: {
    eyebrow: 'Digital infrastructure studio',
    titleA: 'Software, AI and infrastructure',
    titleB: "for companies that don't want to",
    titleC: 'run on manual mode anymore.',
    subtitle:
      'We build web apps, mobile apps, dashboards, AI automations, ecommerce, internal systems and backend infrastructure for businesses that need to organize, sell, measure and scale.',
    note:
      'From a strategic landing to a complete platform with backend, database, admin panel, AI, security and integrations.',
    ctaPrimary: "Let's talk about your project",
    ctaSecondary: 'See what we build',
    osTitle: 'Era Digital · OS',
    osMeta: 'Digital operating system',
    osStatus: 'Operational',
    modules: [
      { name: 'Web Apps', meta: 'SaaS platforms · Internal portals', state: 'active', tag: 'ACTIVE' },
      { name: 'AI Agents', meta: 'Assistants with rules and memory', state: 'run',    tag: 'RUNNING' },
      { name: 'Backend APIs', meta: 'Microservices · Databases',     state: 'live',   tag: 'STABLE' },
      { name: 'Dashboards', meta: 'Data to decide, not to decorate', state: 'live',   tag: 'LIVE' },
      { name: 'Security', meta: 'Audit · Permissions · Auth',         state: 'warn',   tag: 'MONITORING' },
      { name: 'Fintech Layer', meta: 'Payments · Tracing · Auth',     state: 'active', tag: 'CONNECTED' },
      { name: 'Messaging', meta: 'Realtime · Notifications',           state: 'run',    tag: 'STREAMING' },
      { name: 'Ecommerce / POS', meta: 'Inventory · Sales · Reports', state: 'live',   tag: 'LIVE' },
    ],
  },
  problem: {
    eyebrow: 'The real diagnosis',
    titleA: "The problem isn't that your business lacks technology.",
    titleB: "It's that, very often,",
    titleC: "the technology doesn't work together",
    body1:
      'There are companies selling on WhatsApp, tracking inventory on spreadsheets, reviewing reports by hand, serving customers across a thousand channels and making decisions with incomplete information.',
    body2: "That works… until it doesn't.",
    body3:
      'When a business starts to grow, manual processes become slow, expensive and hard to control. That is where Era Digital Solutions comes in: we design tailor-made software to turn scattered operations into clear, connected and measurable systems.',
    beforeLabel: 'Scattered operation',
    afterLabel: 'Connected platform',
    beforeItems: [
      { label: 'WhatsApp', meta: 'Loose orders' },
      { label: 'Excel', meta: 'Manual inventory' },
      { label: 'Reports', meta: 'Done by hand' },
      { label: 'Payments', meta: 'No traceability' },
      { label: 'Team', meta: 'Each one on their island' },
    ],
    afterItems: [
      { label: 'Central platform', meta: 'A single source of truth' },
      { label: 'Realtime data', meta: 'Connected to the business' },
      { label: 'Automation', meta: 'AI with supervision' },
      { label: 'Security and audit', meta: 'By design, not by luck' },
      { label: 'Decisions with metrics', meta: 'Not with hunches' },
    ],
  },
  value: {
    eyebrow: 'Our proposition',
    titleA: "We don't make pretty pages.",
    titleB: 'We build technology that',
    titleC: 'moves real operations.',
    body1: 'A website can present your business.',
    body2: 'A digital system can run it, automate it, measure it and grow it.',
    body3:
      'We work from strategy to development: we understand your process, design the solution, build the platform, connect your data and leave a base ready to evolve.',
    listTitle: 'We build:',
    list: [
      'Custom web applications',
      'iOS and Android mobile apps',
      'Enterprise dashboards',
      'Ecommerce, POS and inventory',
      'AI automation',
      'AI agents for companies',
      'Backend infrastructure and APIs',
      'Fintech and banking systems',
      'Messaging and realtime notifications',
      'Information security and technical audit',
    ],
  },
  services: {
    eyebrow: 'Capabilities',
    title: 'Core services',
    subtitle: 'Ten fronts we cover when we build the digital infrastructure of a company.',
    items: [
      {
        slug: 'web-apps',
        name: 'Custom web applications',
        tagline: 'SaaS platforms, CRMs, portals and internal tools.',
        description:
          'Modern web platforms to manage sales, customers, inventory, reports, internal operations and critical processes from a single place.',
        bullets: ['Admin portals', 'Custom CRMs', 'SaaS platforms', 'Marketplaces'],
        size: 'lg',
      },
      {
        slug: 'ai',
        name: 'AI automation',
        tagline: 'AI with context, rules and supervision. No magic, no smoke.',
        description:
          'Assistants, automated flows and agents connected to your processes so the team responds faster, documents better, and leaves fewer mechanical tasks behind.',
        bullets: ['Agents with memory', 'Document processing', 'Classification and summary', 'Human-in-the-loop workflows'],
        size: 'lg',
      },
      {
        slug: 'mobile',
        name: 'iOS & Android mobile apps',
        tagline: 'For customers, teams and field operations.',
        description:
          'Mobile applications connected to your processes, your users and your data. Auth, payments, notifications, biometrics and integrations.',
        bullets: ['iOS · Android', 'Offline sync', 'Push notifications', 'Biometrics'],
        size: 'md',
      },
      {
        slug: 'backend',
        name: 'Backend & infrastructure',
        tagline: 'Where the idea stops being a mockup and becomes a product.',
        description:
          'APIs, databases, microservices and cloud infrastructure to connect users, data, permissions, integrations, payments, files and processes.',
        bullets: ['REST · GraphQL', 'Postgres · Mongo · Redis', 'Cloud · Docker', 'Queues and events'],
        size: 'md',
      },
      {
        slug: 'dashboards',
        name: 'Dashboards & BI',
        tagline: "A business can't improve what it doesn't measure.",
        description:
          'Control panels to visualize sales, costs, inventory, customers, operational performance and key metrics.',
        bullets: ['Realtime KPIs', 'Exportable reports', 'Automatic alerts'],
        size: 'md',
      },
      {
        slug: 'ecommerce',
        name: 'Ecommerce, POS & inventory',
        tagline: 'Sell, control, report. Connected.',
        description:
          'Online stores, POS, catalogs, inventories, sales reports and systems to manage commercial businesses.',
        bullets: ['Cart and payments', 'Multi-store', 'Inventory and suppliers', 'Reports and margins'],
        size: 'md',
      },
      {
        slug: 'fintech',
        name: 'Fintech & critical systems',
        tagline: 'Transfers, cards, back office, secure messaging.',
        description:
          'Components for financial operations and critical environments. We think about security, consistency, audit and stability from the first commit.',
        bullets: ['Auth and permissions', 'Traceability', 'Logs and audit', 'Bank integrations'],
        size: 'md',
      },
      {
        slug: 'security',
        name: 'Information security',
        tagline: "Not added at the end like a good-luck sticker.",
        description:
          'We review and harden applications, APIs, authentication, permissions, data exposure and technical configuration to reduce real risk.',
        bullets: ['App pentesting', 'API review', 'Auth hardening', 'Exposure audit'],
        size: 'md',
      },
      {
        slug: 'messaging',
        name: 'Messaging & realtime',
        tagline: 'Chats, inbox, notifications, events.',
        description:
          'Communication systems between users, customers, admins or internal teams, connected to the real product flow.',
        bullets: ['WebSockets', 'Push and email', 'Unified inbox'],
        size: 'sm',
      },
      {
        slug: 'logistics',
        name: 'Logistics & routes',
        tagline: 'Field operations, digitized.',
        description:
          'Platforms for companies that need to control packages, routes, delivery states, drivers, clients and reports from a centralized system.',
        bullets: ['Live tracking', 'Optimized routes', 'Driver app'],
        size: 'sm',
      },
    ],
  },
  systemMap: {
    eyebrow: 'How we connect everything',
    title: "We don't design pages. We design systems.",
    subtitle:
      'A serious platform connects users, data, AI and operations into a single flow. This is what we build when we work with you.',
    nodes: [
      { label: 'Customers', meta: 'Web · Mobile · Whatsapp' },
      { label: 'Application', meta: 'Web app · Mobile app' },
      { label: 'API Gateway', meta: 'REST · GraphQL · Auth' },
      { label: 'Database', meta: 'Postgres · Mongo · Cache' },
      { label: 'AI Layer', meta: 'Agents · Workflows · LLMs' },
      { label: 'Dashboards', meta: 'Metrics · Reports' },
      { label: 'Automation', meta: 'Events · Integrations' },
    ],
  },
  ai: {
    eyebrow: 'AI with judgement',
    title: 'AI with context, rules and supervision.',
    titleAccent: 'No magic. No smoke. Better-designed processes.',
    body:
      "An AI agent is not a chatbot with a nice name. It's a system with instructions, memory, tools and goals. We design it to help with concrete tasks without losing control, traceability or human judgement.",
    flow: [
      { label: 'Documents', meta: 'Inputs · APIs · uploads' },
      { label: 'AI Analysis', meta: 'LLM · rules · context' },
      { label: 'Human Review', meta: 'Approval · supervision' },
      { label: 'Report / Action', meta: 'Report · trigger · ticket' },
    ],
    pillars: [
      { title: 'Human control', body: 'Approvals, limits and supervision where it matters.' },
      { title: 'Memory and context', body: 'Knowing what happened before to respond better now.' },
      { title: 'Traceability', body: 'Every decision is logged and auditable.' },
      { title: 'Connected to the system', body: "Not living in a tab: it triggers real actions." },
    ],
  },
  trust: {
    eyebrow: 'Why trust us',
    title: 'We build with product, engineering and security mindset.',
    subtitle: 'More modern bank than hackathon with cold coffee.',
    items: [
      { title: 'Scalable architecture', body: 'We think how your system will look in two years, not just on Monday.' },
      { title: 'Security by design', body: 'Auth, permissions, data exposure and audit from the first commit.' },
      { title: 'Clear data to decide', body: 'Metrics that matter, not decorative charts.' },
      { title: 'Automation with control', body: 'AI that helps the team, not AI that owns processes.' },
      { title: 'Real integrations', body: "Payments, ERP, CRMs, messaging, logistics: what you already use." },
      { title: 'Critical systems', body: 'Experience building components for environments where failing is expensive.' },
    ],
  },
  useCases: {
    eyebrow: 'Use cases',
    title: 'Where are you right now?',
    subtitle: 'Some typical starting points when a company contacts us.',
    items: [
      { title: 'I want to sell online and control inventory', meta: 'Ecommerce · POS · Inventory' },
      { title: 'I want to automate support and reports', meta: 'AI · Workflows · Dashboards' },
      { title: 'I want a mobile app for my customers', meta: 'iOS · Android · Backend' },
      { title: 'I want a financial dashboard', meta: 'BI · KPIs · Reports' },
      { title: "I want to review my system's security", meta: 'Pentesting · Audit · Hardening' },
      { title: 'I want to digitize routes and deliveries', meta: 'Tracking · Drivers · Reports' },
    ],
  },
  finalCta: {
    eyebrow: 'Final stop',
    quote: "If everything depends on WhatsApp, Excel and human memory, you don't have an operation: you have faith.",
    body:
      'We can help you turn manual processes, disconnected tools and scattered data into a digital platform designed to operate better.',
    closing: 'If your business has grown, your technology should too.',
    cta: 'Book a consultation',
    ctaSecondary: 'Email us',
  },
  brand: {
    quotes: [
      'A page presents you. A system lets you operate.',
      "We don't make technology to show off. We make it so your business works better.",
      'Digitizing is not uploading a PDF to the internet. It is redesigning how your company works.',
      "AI doesn't replace your business. Used well, it removes friction.",
      "Not everything needs AI. But many processes do need to stop being done by hand.",
      "Your company doesn't need more tools. It needs better systems.",
      'We build software to sell, measure, automate and scale.',
    ],
  },
  footer: {
    tagline: "Digital infrastructure studio. We build software, AI and systems for companies that don't want to run on manual mode anymore.",
    sectionsTitle: 'Services',
    companyTitle: 'Company',
    contactTitle: 'Contact',
    company: [
      { label: 'How we work', href: '#process' },
      { label: 'What we build', href: '#services' },
      { label: 'Use cases', href: '#use-cases' },
    ],
    rights: 'All rights reserved.',
    builtWith: 'Built with judgement.',
  },
}

export default en
