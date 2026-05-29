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
    titleLead: 'We take your ideas',
    titleAccent: 'into the new digital era.',
    subtitle:
      'Software, AI and infrastructure for companies that want to stop running on manual mode and start operating like a system.',
    note:
      'Web apps, mobile apps, dashboards, AI automations, ecommerce, fintech and backend infrastructure — designed to think, scale and decide.',
    ctaPrimary: "Let's talk about your project",
    ctaSecondary: 'Explore the system',
    hudTitle: 'NEURAL · CORE',
    hudMeta: 'cognition layer',
    hudStatus: 'SYNAPSING',
    hudActivity: 'Synaptic activity',
    hudPathways: 'live pathways',
    hudNodes: 'neurons',
    hudSignal: 'signal',
    hudFooterA: 'pulse · 0.94',
    hudFooterB: 'AWAKE',
    signals: [
      { k: '120+', l: 'Neurons in the mesh / nodos activos' },
      { k: '24/7', l: 'Synapses online / firing pathways' },
      { k: 'AI', l: 'Cognition embedded / con criterio' },
    ],
    scrollHint: 'scroll · into the system',
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
    eyebrow: 'Layers that run',
    titleA: 'A serious system',
    titleB: "isn't one layer.",
    titleC: "It's ten decisions stacked with judgement.",
    body1:
      'Each layer solves one concrete problem. Together, they hold the operation up.',
    body2:
      "We don't sell ten loose products. We build one system, made of layers that lean on each other.",
    body3:
      'A wrong call at the base forces patches everywhere above. That is why order matters — and why we build this way.',
    closing: 'Ten disciplines. One system.',
    stackLabel: 'system.stack',
    stackMeta: '10 layers · 1 system',
    layersTitle: 'The ten layers',
    layers: [
      { code: '01', tag: 'WEB',       title: 'Web applications',           meta: 'SaaS · CRMs · internal portals' },
      { code: '02', tag: 'MOBILE',    title: 'Mobile apps',                meta: 'iOS · Android · offline sync' },
      { code: '03', tag: 'BACKEND',   title: 'Backend & infrastructure',   meta: 'APIs · Postgres · Cloud · queues' },
      { code: '04', tag: 'AI',        title: 'AI automation',              meta: 'Agents · workflows · context' },
      { code: '05', tag: 'BI',        title: 'Dashboards & BI',            meta: 'Live KPIs · reports · alerts' },
      { code: '06', tag: 'COMMERCE',  title: 'Ecommerce, POS & inventory', meta: 'Sales · stock · suppliers' },
      { code: '07', tag: 'FINTECH',   title: 'Fintech & critical systems', meta: 'Payments · traceability · audit' },
      { code: '08', tag: 'SECURITY',  title: 'Information security',       meta: 'Pentesting · hardening · auth' },
      { code: '09', tag: 'REALTIME',  title: 'Messaging & realtime',       meta: 'Chats · push · events' },
      { code: '10', tag: 'LOGISTICS', title: 'Logistics & routes',         meta: 'Tracking · drivers · reports' },
    ],
  },
  services: {
    eyebrow: 'Capabilities',
    title: 'Core services',
    subtitle: 'Ten fronts, five stages. This is how the machinery of your operation gets assembled.',
    assemblyLabel: 'rocket.assembly',
    pairs: [
      {
        code: 'I',
        title: 'The base',
        caption: 'Where the idea stops being a mockup.',
        body: 'Before any interface goes up, the rocket needs structure: reliable backend and security by design. Without this, everything above collapses.',
        slugs: ['backend', 'security'],
        stage: 'BASE · STRUCTURE',
      },
      {
        code: 'II',
        title: 'The interfaces',
        caption: 'The surface where the business shows up.',
        body: 'Web and mobile are the contact points. That is where everything happens: customers, teams, daily operations. Connected to the same core, not as islands.',
        slugs: ['web-apps', 'mobile'],
        stage: 'INTERFACES · CONTACT',
      },
      {
        code: 'III',
        title: 'The intelligence',
        caption: 'What decides and what measures.',
        body: 'AI with judgement to automate concrete tasks. Dashboards that actually say something. So the business thinks, not just records.',
        slugs: ['ai', 'dashboards'],
        stage: 'COGNITION · DECISION',
      },
      {
        code: 'IV',
        title: 'The operation',
        caption: 'Where the business actually moves.',
        body: 'Sales, inventory, logistics, routes, deliveries. The layer that touches the physical world. Connected to the intelligence that coordinates it.',
        slugs: ['ecommerce', 'logistics'],
        stage: 'OPERATION · FIELD',
      },
      {
        code: 'V',
        title: 'The reach',
        caption: 'Outward, with responsibility.',
        body: 'Secure payments, realtime messaging. The critical layers that connect your system to money, customers, and the rest of the world.',
        slugs: ['fintech', 'messaging'],
        stage: 'REACH · CRITICAL',
      },
    ],
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
    eyebrow: 'Connections',
    titleA: 'Apart, they are tasks.',
    titleB: 'Connected, it is a system.',
    subtitle:
      'The difference between a business that grows and one that only works harder is whether its data moves on its own.',
    body:
      'A customer buys, and the inventory knows. A payment goes through, and the report already shows it. An AI agent makes a decision, and it goes on record. No emails, no spreadsheets, no reminders.',
    bodyClose:
      "That is what we design when we build a system: the routes the data travels, the order things run in, and the trace each step leaves behind.",
    accent: 'One datum. One journey. One record.',
    hudFlow: 'flow',
    hudDrag: 'drag · rotate',
    nodes: [
      { label: 'Customers',   meta: 'Web · Mobile · Whatsapp' },
      { label: 'Application', meta: 'Web app · Mobile app' },
      { label: 'API Gateway', meta: 'REST · GraphQL · Auth' },
      { label: 'Database',    meta: 'Postgres · Mongo · Cache' },
      { label: 'AI Layer',    meta: 'Agents · Workflows · LLMs' },
      { label: 'Dashboards',  meta: 'Metrics · Reports' },
      { label: 'Automation',  meta: 'Events · Integrations' },
    ],
  },
  ai: {
    eyebrow: 'Intelligence with a face',
    titleA: 'It sees you.',
    titleB: 'It understands you.',
    titleC: 'It assists you.',
    subtitle:
      'AI with judgement is not a chatbot with a nice name. It is a system that reads context, follows clear rules, and leaves a trail behind every decision.',
    body:
      'We design it to help — not to replace. The human is still the one who watches, decides, supervises.',
    bodyClose:
      'Business memory, connected tools, human judgement at the critical points. That is what makes an AI actually useful.',
    accent: 'No magic. No smoke. Systems with judgement.',
    hudHead: 'humanoid',
    hudHeadMeta: 'eyes track · live',
    hudHover: 'hover · scatter',
    pillars: [
      { title: 'Sees',       body: 'Reads context before acting.' },
      { title: 'Remembers',  body: 'Business memory, not session memory.' },
      { title: 'Decides',    body: 'Clear rules, traceable steps.' },
      { title: 'Reports',    body: 'Humans supervise what matters.' },
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
  servicesNav: {
    label: 'Services',
    description: 'Ten fronts we cover to build your digital infrastructure.',
    items: [
      { slug: 'fintech',    name: 'Fintech',                       meta: 'APIs · payments · cards · PCI' },
      { slug: 'web-apps',   name: 'Web applications',              meta: 'SaaS · CRMs · portals' },
      { slug: 'mobile',     name: 'Mobile apps',                   meta: 'iOS · Android · offline' },
      { slug: 'ai',         name: 'AI automation',                 meta: 'Agents · workflows · context' },
      { slug: 'backend',    name: 'Backend & infrastructure',      meta: 'APIs · DBs · cloud' },
      { slug: 'dashboards', name: 'Dashboards & BI',               meta: 'Live KPIs · reports' },
      { slug: 'ecommerce',  name: 'Ecommerce, POS & inventory',    meta: 'Sales · stock · multi-store' },
      { slug: 'security',   name: 'Information security',          meta: 'Pentesting · hardening · auth' },
      { slug: 'messaging',  name: 'Messaging & realtime',          meta: 'Chats · push · events' },
      { slug: 'logistics',  name: 'Logistics & routes',            meta: 'Tracking · drivers · reports' },
    ],
  },
  fintech: {
    meta: {
      title: 'Fintech solutions & banking infrastructure',
      description: 'We build the infrastructure that connects banks, payment processors, i2c, Salesforce, and financial dashboards. Secure APIs, back office, integrations, and architecture designed around PCI compliance.',
    },
    breadcrumb: { services: 'Services', current: 'Fintech' },

    hero: {
      eyebrow: '// FINTECH · 01 · connect()',
      titleA: 'Banks. Processors.',
      titleB: 'Cards. Data.',
      titleC: 'One infrastructure.',
      titleAccent: 'Connected, secure, auditable.',
      subtitle:
        'We build the technical layer that joins core banking, payment processors, providers like i2c and Salesforce, financial dashboards, and back office into a single operating ecosystem.',
      hudLive: 'live · 24/7',
      hudPCI: 'PCI · aware',
      hudLatency: 'latency',
      hudVolume: 'volume',
      ctaPrimary: 'Talk about your infrastructure',
      ctaSecondary: 'See capabilities',
    },

    problem: {
      eyebrow: '// 02 · diagnose()',
      title: 'Modern financial systems do not fail for lack of tools.',
      titleAccent: 'They fail because the pieces do not talk.',
      body:
        'A financial operation lives across core banking, processors, CRMs, dashboards, mobile apps, compliance systems, transfers, secure messaging, and sensitive data crossing layers. When those layers are not well connected, the cost is not technical — it is operational.',
      symptoms: [
        { tag: 'OPS',    text: 'Manual processes' },
        { tag: 'DATA',   text: 'Duplicated information' },
        { tag: 'TIME',   text: 'Slow reports' },
        { tag: 'AUDIT',  text: 'Flows that cannot be audited' },
        { tag: 'RISK',   text: 'Blind dependence on providers' },
        { tag: 'BLIND',  text: 'Teams operating without visibility' },
      ],
      closing:
        'We do not build screens for banks. We build infrastructure so the critical pieces can talk, validate, and evolve without risk.',
    },

    capabilities: {
      eyebrow: '// 03 · build()',
      title: 'We connect the financial ecosystem',
      titleAccent: 'so it is clear, secure, and measurable.',
      items: [
        { code: '01', tag: 'API',         title: 'Financial APIs',           meta: 'REST · GraphQL · auth' },
        { code: '02', tag: 'BI',          title: 'Realtime dashboards',      meta: 'KPIs · alerts · drill-down' },
        { code: '03', tag: 'BACKOFFICE',  title: 'Banking back office',      meta: 'Roles · audit · support' },
        { code: '04', tag: 'PAYMENTS',    title: 'Payment processors',       meta: 'International · states · fees' },
        { code: '05', tag: 'i2c',         title: 'i2c integration',          meta: 'Cards · activation · sync' },
        { code: '06', tag: 'SALESFORCE',  title: 'Salesforce integration',   meta: 'CRM · operations · flows' },
        { code: '07', tag: 'MESSAGING',   title: 'Secure messaging',         meta: 'Trace · encrypted · inbox' },
        { code: '08', tag: 'TPK',         title: 'Encryption · TPK',         meta: 'Keys · hash · in-transit' },
        { code: '09', tag: 'PCI',         title: 'PCI compliance',           meta: 'Design · segmentation · logs' },
      ],
    },

    integration: {
      eyebrow: '// 04 · bridge()',
      title: 'We integrate banks, providers, and external systems',
      titleAccent: 'without turning your operation into an endless puzzle.',
      body:
        'Financial institutions speak with many systems at once. We design the integration layer so that conversation stays maintainable and secure.',
      nodes: [
        { id: 'client',    label: 'Customer',        meta: 'Web · Mobile' },
        { id: 'app',       label: 'Application',     meta: 'iOS · Android · Web' },
        { id: 'gateway',   label: 'API Gateway',     meta: 'Auth · routing · rate limit' },
        { id: 'core',      label: 'Core banking',    meta: 'Accounts · balances' },
        { id: 'processor', label: 'Processor',       meta: 'International payments' },
        { id: 'i2c',       label: 'i2c',             meta: 'Cards · activation' },
        { id: 'salesforce',label: 'Salesforce',      meta: 'CRM · cases' },
        { id: 'audit',     label: 'Audit trail',     meta: 'Logs · traceability' },
      ],
      witty:
        "Yes, in 2026 there are still companies reconciling critical things in Excel. Civilization is patient.",
    },

    payments: {
      eyebrow: '// 05 · process()',
      title: 'Payments, transfers, and international operations',
      titleAccent: 'with full traceability.',
      body:
        'Sending a transaction is not enough. You need to know what happened, when, who executed it, which provider responded, what error occurred, and how to audit it later.',
      tickerOps: [
        { code: 'TXN', op: 'WIRE.OUT',   amount: '$48,200.00', currency: 'USD', status: 'OK',     ms: '142' },
        { code: 'TXN', op: 'CARD.AUTH',  amount: '$1,240.50',  currency: 'MXN', status: 'OK',     ms: '88' },
        { code: 'TXN', op: 'WIRE.IN',    amount: '$12,500.00', currency: 'USD', status: 'OK',     ms: '210' },
        { code: 'TXN', op: 'CARD.AUTH',  amount: '$78.30',     currency: 'EUR', status: 'DECLINE',ms: '64' },
        { code: 'TXN', op: 'TRANSFER',   amount: '$5,000.00',  currency: 'USD', status: 'OK',     ms: '180' },
        { code: 'TXN', op: 'REFUND',     amount: '$340.00',    currency: 'MXN', status: 'OK',     ms: '95' },
        { code: 'TXN', op: 'CARD.AUTH',  amount: '$2,100.00',  currency: 'USD', status: 'OK',     ms: '76' },
        { code: 'TXN', op: 'WIRE.OUT',   amount: '$98,750.00', currency: 'USD', status: 'PENDING',ms: '—' },
      ],
      capabilities: [
        'Payment processor integration',
        'International transfer flows',
        'Data validation & normalization',
        'Transactional state handling',
        'Operational reconciliation',
        'Error handling & retries',
        'Query APIs',
        'Monitoring dashboards',
      ],
      closing:
        'In financial systems, what cannot be traced becomes a problem. And problems have terrible timing.',
    },

    i2c: {
      eyebrow: '// 06 · cards()',
      title: 'Cards that live alongside your digital products,',
      titleAccent: 'not surgery every time something changes.',
      body:
        'Integration layers so i2c works as part of your operation: users, accounts, activation, renewal, sync, back office, mobile app.',
      cardStates: ['ACTIVE', 'PENDING', 'RENEWED', 'BLOCKED'],
      flows: [
        'Card lookup',
        'Card activation',
        'Card renewal',
        'Information sync',
        'Primary & supplementary cards',
        'States & queries',
        'Mobile app integration',
        'Back office for operations',
        'Intermediate APIs',
        'Secure handling of sensitive data',
      ],
    },

    salesforce: {
      eyebrow: '// 07 · sync()',
      title: 'Salesforce connected to your financial operation,',
      titleAccent: 'not just to your sales team.',
      body:
        "When wired well, Salesforce stops being an expensive database with pretty buttons and becomes a real operational piece.",
      cases: [
        { title: 'Customer sync',          meta: 'CRM ↔ core banking' },
        { title: 'Operational states',     meta: 'Realtime updates' },
        { title: 'Request tracking',       meta: 'End-to-end traceability' },
        { title: 'Back office integration',meta: 'Bidirectional actions' },
        { title: 'Dashboard connection',   meta: 'Sales metrics + ops' },
        { title: 'Task automation',        meta: 'Workflows · triggers' },
      ],
    },

    dashboards: {
      eyebrow: '// 08 · observe()',
      title: 'Scattered financial data',
      titleAccent: 'into clear panels for decisions.',
      body:
        'A financial operation needs visibility. It is not enough that processes run; teams need to understand what is happening.',
      tickers: [
        { label: '24h volume',     value: '$4.82M', delta: '+2.4%', up: true },
        { label: 'Successful TXN', value: '12,481', delta: '+1.8%', up: true },
        { label: 'Failed TXN',     value: '184',    delta: '-12%',  up: false },
        { label: 'P95 latency',    value: '142ms',  delta: '-8ms',  up: false },
        { label: 'Active cards',   value: '38,204', delta: '+126',  up: true },
        { label: 'Errors/min',     value: '0.7',    delta: '-0.2',  up: false },
      ],
      closing:
        'We turn scattered financial data into clear panels for decisions, problem detection, and operational control.',
    },

    backoffice: {
      eyebrow: '// 09 · operate()',
      title: 'Back office so internal teams',
      titleAccent: "don't depend on manual processes.",
      body:
        'Many financial operations do not fail in the frontend. They fail behind it: approvals, state changes, reports, audit.',
      tabs: [
        {
          id: 'users', label: 'Users', count: '12,481',
          rows: [
            { col1: 'Maria L.',  col2: 'maria@company.com', col3: 'ACTIVE',  col4: '2026-05-12' },
            { col1: 'John P.',   col2: 'john@company.com',  col3: 'ACTIVE',  col4: '2026-05-11' },
            { col1: 'Anna G.',   col2: 'anna@company.com',  col3: 'PENDING', col4: '2026-05-10' },
            { col1: 'Diego R.',  col2: 'diego@company.com', col3: 'BLOCKED', col4: '2026-05-08' },
          ],
        },
        {
          id: 'cards', label: 'Cards', count: '38,204',
          rows: [
            { col1: '•••• 4291', col2: 'Visa',       col3: 'ACTIVE',  col4: '12/28' },
            { col1: '•••• 8814', col2: 'Mastercard', col3: 'RENEWED', col4: '03/29' },
            { col1: '•••• 2207', col2: 'Visa',       col3: 'ACTIVE',  col4: '07/27' },
            { col1: '•••• 5523', col2: 'Mastercard', col3: 'BLOCKED', col4: '11/26' },
          ],
        },
        {
          id: 'transactions', label: 'Transactions', count: '124k',
          rows: [
            { col1: 'TXN 0042x', col2: '$12,500', col3: 'OK',     col4: '142ms' },
            { col1: 'TXN 0042y', col2: '$340',    col3: 'OK',     col4: '95ms' },
            { col1: 'TXN 0042z', col2: '$78',     col3: 'DECLINE',col4: '64ms' },
            { col1: 'TXN 00430', col2: '$5,000',  col3: 'OK',     col4: '180ms' },
          ],
        },
      ],
      closing:
        'A good back office does more than show data. It reduces operational friction, prevents human errors, and leaves evidence of what happens.',
    },

    security: {
      eyebrow: '// 10 · secure()',
      title: 'Security from the architecture,',
      titleAccent: 'not as a patch at the end.',
      body:
        'In fintech, security cannot be a patch at the end of the project. It must be present from the design of data, permissions, APIs, service-to-service communication, key handling, logs, and information exposure.',
      tpkTitle: 'Key handling · TPK',
      tpkBody:
        'We have experience with flows where secure key handling, sensitive data, and components like TPK are part of the architecture.',
      pillars: [
        { title: 'Sensitive data handling',   meta: 'Encryption · access · minimum exposure' },
        { title: 'Auth · permissions',         meta: 'OAuth2 · RBAC · MFA' },
        { title: 'Encryption',                  meta: 'In-transit · at-rest · key rotation' },
        { title: 'Audit · logs',               meta: 'Every action · every change' },
        { title: 'Input validation',            meta: 'Schemas · sanitization' },
        { title: 'Hardening',                   meta: 'Services · environments · CI/CD' },
      ],
      closing:
        'We do not treat security as technical decoration. We use it to define how information moves, who can see it, and how every operation is recorded.',
    },

    pci: {
      eyebrow: '// 11 · comply()',
      title: 'We design infrastructure',
      titleAccent: 'oriented to PCI compliance.',
      body:
        'When a system touches payments, cards, or sensitive data, the architecture is built with a different mindset: segmentation, access control, minimum exposure, traceability.',
      capabilities: [
        'Secure architecture design',
        'Service segmentation',
        'Minimum sensitive-data exposure',
        'Robust authentication flows',
        'Access control',
        'Logs & audit',
        'Applied encryption',
        'Environment separation',
        'Technical documentation',
        'Audit-ready preparation',
      ],
      sayThis: 'We design infrastructure oriented to PCI compliance.',
      notThis: 'We are PCI compliant.',
      sayLabel: 'We say:',
      notLabel: 'We do not say:',
      explanation: 'The first is honest. The second is a formal public certification.',
    },

    architecture: {
      eyebrow: '// 12 · architect()',
      title: 'The layer that connects product, operations,',
      titleAccent: 'and financial providers.',
      body:
        'A well-designed fintech solution needs more than frontend. It needs an architecture that can hold business rules, external providers, users, permissions, reports, security, and growth.',
      layers: [
        { code: 'L1', name: 'Mobile · Web App',          meta: 'Frontend · UX' },
        { code: 'L2', name: 'API Gateway',                meta: 'Auth · routing · rate-limit' },
        { code: 'L3', name: 'Business Logic',             meta: 'Microservices · rules' },
        { code: 'L4', name: 'Banking Integrations',       meta: 'i2c · Salesforce · processors' },
        { code: 'L5', name: 'Data · Audit Trail',         meta: 'DB · logs · traceability' },
        { code: 'L6', name: 'Dashboards · Back Office',   meta: 'BI · internal operations' },
      ],
    },

    useCases: {
      eyebrow: '// 13 · cases()',
      title: 'What we can build',
      items: [
        { num: '01', title: 'Transfer platform',           meta: 'Create · validate · monitor · audit' },
        { num: '02', title: 'International payment processor', meta: 'Multi-provider · states · traceability' },
        { num: '03', title: 'Executive financial dashboard',  meta: 'Volume · costs · errors · trends' },
        { num: '04', title: 'Banking back office',           meta: 'Users · accounts · cards · support' },
        { num: '05', title: 'i2c integration',                meta: 'Cards · activation · renewal' },
        { num: '06', title: 'Salesforce integration',         meta: 'CRM · cases · sync' },
        { num: '07', title: 'Secure message center',          meta: 'Communication · traceability' },
        { num: '08', title: 'Card infrastructure',            meta: 'Activation · states · admin' },
        { num: '09', title: 'Audit & logs',                   meta: 'Events · changes · actions' },
        { num: '10', title: 'Financial APIs',                 meta: 'Product ↔ providers ↔ internal' },
      ],
    },

    differentiators: {
      eyebrow: '// 14 · why()',
      title: 'Why work with Era Digital Solutions',
      items: [
        { title: 'We understand critical systems', body: 'Rules, states, security, providers, audit — and many creative ways something breaks if designed badly.' },
        { title: 'End-to-end build',                body: 'From the mobile app to the backend, APIs, integrations, dashboards, and back office.' },
        { title: 'Security from the start',         body: 'Permissions, sensitive data, traceability, encryption, exposure, and technical compliance.' },
        { title: 'Real provider integrations',      body: 'i2c, Salesforce, payment processors, external financial services.' },
        { title: 'Operations as data',              body: 'We do not just process events. We make them visible in dashboards, reports, and metrics.' },
        { title: 'Designed to evolve',              body: 'Infrastructure must grow, switch providers, and adapt without rebuilding from scratch.' },
      ],
    },

    process: {
      eyebrow: '// 15 · build()',
      title: 'How we build fintech infrastructure',
      steps: [
        { num: '01', title: 'Diagnostic',     body: 'Financial flow, systems, providers, rules, risks, and friction points.' },
        { num: '02', title: 'Architecture',   body: 'Services, APIs, integrations, permissions, security, traceability, and dashboards.' },
        { num: '03', title: 'Integrations',   body: 'i2c, Salesforce, processors, internal systems, or banking entities.' },
        { num: '04', title: 'Development',    body: 'Logic, APIs, panels, dashboards, back office, messaging, and experience.' },
        { num: '05', title: 'Security',       body: 'Permissions, exposure, sensitive handling, logs, encryption, and critical flows.' },
        { num: '06', title: 'Launch',         body: 'Deployment, monitoring, documentation, and a base ready to grow with new modules.' },
      ],
    },

    midCta: {
      title: 'Does your financial operation depend on too many disconnected systems?',
      body: 'We can help you design the layer that connects them: APIs, dashboards, back office, providers, security, and automation.',
      cta: 'Design your fintech infrastructure',
    },

    faq: {
      eyebrow: '// 16 · faq()',
      title: 'Frequently asked questions',
      items: [
        {
          q: 'Does Era Digital Solutions develop software for banks and fintechs?',
          a: 'Yes. We build digital solutions for financial operations — APIs, back office, dashboards, integrations, card flows, payments, secure messaging, and internal systems.',
        },
        {
          q: 'Can you integrate with providers like i2c?',
          a: 'Yes. We develop integration layers connecting card providers like i2c with mobile apps, back office, internal APIs, and operational flows.',
        },
        {
          q: 'Can you connect with Salesforce?',
          a: 'Yes. We integrate Salesforce with financial systems, back office, dashboards, and operational flows to sync customers, requests, states, and relevant data.',
        },
        {
          q: 'Do you build financial dashboards?',
          a: 'Yes. We build dashboards to visualize transactions, payments, cards, users, errors, reconciliations, operational performance, and executive metrics.',
        },
        {
          q: 'Can you build international payment processors?',
          a: 'We can develop infrastructure and integrations for international payment flows — validations, states, external providers, traceability, error handling, and monitoring dashboards.',
        },
        {
          q: 'Do you work with PCI compliance?',
          a: 'We design infrastructure oriented to PCI compliance and financial security best practices. Formal certification depends on the scope, audit, and internal processes involved.',
        },
        {
          q: 'Do you handle TPK encryption?',
          a: 'We have experience with financial flows where secure key handling, sensitive data, and components like TPK are part of the architecture.',
        },
        {
          q: 'Can you build a banking back office?',
          a: 'Yes. We build back offices for querying users, accounts, cards, transactions, requests, states, messages, reports, and operational actions with roles and permissions.',
        },
      ],
    },

    finalCta: {
      eyebrow: '// 17 · ship()',
      title: "Let's build the financial infrastructure",
      titleAccent: 'your operation needs to grow.',
      body:
        'If your company needs to connect banks, providers, payments, cards, Salesforce, i2c, dashboards, back office, and security in a clear ecosystem, we can help you design and build it.',
      cta: 'Book a fintech consultation',
      ctaSecondary: 'Back to home',
    },
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
