const en = {
  nav: {
    home: 'Home',
    services: 'Services',
    about: 'About',
    contact: 'Contact',
    cta: "Let's talk",
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
        { code: '08', tag: 'KEYS',        title: 'Encryption · TPK · ZPK',   meta: 'Keys · hash · in-transit' },
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

    bpc: {
      eyebrow: '// 07 · switch()',
      title: 'We connect processing platforms',
      titleAccent: 'like BPC SmartVista to the rest of your operation.',
      body:
        'BPC SmartVista sits at the center of critical financial operations: payments, cards, switching, acquiring, digital channels, and fraud management. We build the layer that connects that infrastructure to mobile apps, back office, dashboards, and internal APIs.',
      bodyClose:
        "It's not about \"connecting to the provider\". It's about building a clear architecture around that connection: validations, security, monitoring, traceability, error handling, and operational visibility.",
      modules: [
        { code: '01', title: 'Card issuing',           meta: 'Debit · credit · prepaid · virtual' },
        { code: '02', title: 'Card management',         meta: 'States · cycles · sync' },
        { code: '03', title: 'Transaction processing',  meta: 'Authorization · capture · clearing' },
        { code: '04', title: 'Switching',                meta: 'ATM · POS · smart routing' },
        { code: '05', title: 'Merchant acquiring',      meta: 'POS · e-commerce · SoftPOS' },
        { code: '06', title: 'Digital banking',         meta: 'Channels · wallets · self-service' },
        { code: '07', title: 'Fraud management',        meta: 'Rules · scoring · alerts' },
        { code: '08', title: 'Operational reporting',   meta: 'Metrics · audit · dashboards' },
      ],
      flowTitle: 'Integration layer',
      flowSteps: [
        { label: 'Mobile · Web banking',             meta: 'Frontend' },
        { label: 'API Gateway · Financial backend',  meta: 'Auth · routing' },
        { label: 'Business rules',                    meta: 'Validation · state' },
        { label: 'BPC · SmartVista',                  meta: 'Processing · cards · switching' },
        { label: 'Back office · dashboards · audit', meta: 'Operational visibility' },
      ],
      witty:
        "Connecting financial systems shouldn't feel like assembling Swedish furniture without instructions. With real money on the line. And yet, here we are.",
    },

    salesforce: {
      eyebrow: '// 08 · sync()',
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
      eyebrow: '// 09 · observe()',
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
      eyebrow: '// 10 · operate()',
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
      eyebrow: '// 11 · secure()',
      title: 'Security from the architecture,',
      titleAccent: 'not as a patch at the end.',
      body:
        'In fintech, security cannot be a patch at the end of the project. It must be present from the design of data, permissions, APIs, service-to-service communication, key handling, logs, and information exposure.',
      tpkTitle: 'Key handling · TPK · ZPK',
      tpkBody:
        'We have experience with flows where secure key handling is part of the architecture: TPK (Terminal Pin Key) to protect PINs at terminals, ZPK (Zone Pin Key) to wrap keys between secure zones, and the rest of the key hierarchy that holds a serious banking operation together.',
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
      eyebrow: '// 12 · comply()',
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
      explainerTitle: 'What PCI compliance is',
      explainerLead:
        'PCI DSS (Payment Card Industry Data Security Standard) is the global security standard for any system that processes, transmits, or stores payment card data.',
      explainerBody:
        'Defined by the major card networks (Visa, Mastercard, American Express, Discover, and JCB) through the PCI Security Standards Council. It applies to banks, fintechs, ecommerce, processors, and any company that touches card data — regardless of volume.',
      explainerPillars: [
        { code: '01', title: 'Secure network',      meta: 'Firewalls, segmentation, hardened configuration' },
        { code: '02', title: 'Protected data',      meta: 'Encryption in transit and at rest, no unencrypted PAN storage' },
        { code: '03', title: 'Vulnerabilities',     meta: 'Antivirus, patching, secure development' },
        { code: '04', title: 'Access control',      meta: 'Role-based permissions, strong authentication, physical access' },
        { code: '05', title: 'Monitoring',          meta: 'Logs, traceability, regular security testing' },
        { code: '06', title: 'Policy',              meta: 'Documentation, processes, security culture' },
      ],
      explainerCloser:
        'We build infrastructure that respects these principles from the first commit: network segmentation, applied encryption, access control, traceability, and careful handling of sensitive data. Formal certification is granted by a QSA (Qualified Security Assessor) after an audit — we build so that audit becomes possible.',
    },

    architecture: {
      eyebrow: '// 13 · architect()',
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
      eyebrow: '// 14 · cases()',
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
      eyebrow: '// 15 · why()',
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
      eyebrow: '// 16 · build()',
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
      eyebrow: '// 17 · faq()',
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
          q: 'Can you integrate with BPC / SmartVista?',
          a: 'Yes. We design integration layers to connect internal systems, mobile apps, back office, dashboards, and APIs with BPC / SmartVista ecosystems — especially for payments, cards, switching, acquiring, processing, and financial operations.',
        },
        {
          q: 'Does BPC replace the core banking system?',
          a: 'Not necessarily. BPC can be part of the payments, cards, channels, or processing ecosystem depending on each institution\'s architecture. Our job is to understand the role it plays in the flow and build the right connection layer.',
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
          q: 'Do you handle TPK and ZPK encryption?',
          a: 'Yes. We have experience with financial flows where secure key handling is part of the architecture: TPK (Terminal Pin Key) to protect PINs at terminals, ZPK (Zone Pin Key) to wrap keys between secure zones, and the key hierarchy that supports payments, switching, and processing operations.',
        },
        {
          q: 'Can you build a banking back office?',
          a: 'Yes. We build back offices for querying users, accounts, cards, transactions, requests, states, messages, reports, and operational actions with roles and permissions.',
        },
      ],
    },

    finalCta: {
      eyebrow: '// 18 · ship()',
      title: "Let's build the financial infrastructure",
      titleAccent: 'your operation needs to grow.',
      body:
        'If your company needs to connect banks, providers, payments, cards, Salesforce, i2c, dashboards, back office, and security in a clear ecosystem, we can help you design and build it.',
      cta: 'Book a fintech consultation',
      ctaSecondary: 'Back to home',
    },
  },

  mobile: {
    meta: {
      title: 'iOS & Android mobile app development',
      description:
        'We build iOS and Android mobile apps connected to backend, dashboards, APIs, payments, notifications, biometrics, ecommerce, fintech, logistics, and internal operations.',
    },
    breadcrumb: { services: 'Services', current: 'Mobile apps' },

    hero: {
      eyebrow: '// MOBILE · 01 · ship()',
      titleA: 'Mobile apps',
      titleB: 'where your customer',
      titleC: 'already lives.',
      titleAccent: 'On the phone.',
      subtitle:
        "We build iOS and Android apps connected to backend, dashboards, payments, notifications, and your real business flows. We don't ship pretty demos that nobody uses afterward.",
      hudPlatform: 'iOS · Android',
      hudInteract: 'hover · scatter',
      ctaPrimary: 'Talk about your app',
      ctaSecondary: 'See capabilities',
    },

    problem: {
      eyebrow: '// 02 · diagnose()',
      title: 'Having an app does nothing',
      titleAccent: 'unless it solves a real process.',
      body:
        'Many companies want an app because "we should have an app." That is not strategy. That is digital anxiety with a budget.',
      reasons: [
        { tag: 'CLIENT',  text: 'Get closer to customers' },
        { tag: 'FRICT',   text: 'Reduce friction in a process' },
        { tag: 'SALES',   text: 'Increase sales' },
        { tag: 'OPS',     text: 'Improve internal operations' },
        { tag: 'DATA',    text: 'Capture critical data' },
        { tag: 'AUTO',    text: 'Automate repetitive tasks' },
        { tag: 'LIVE',    text: 'Realtime tracking' },
        { tag: 'CONNECT', text: 'Connect users to services' },
      ],
      closing:
        'At Era Digital Solutions we design apps from the problem, not from the screen. First we understand what the app must achieve. Then we build the experience, the backend, and the system that holds it up.',
    },

    value: {
      eyebrow: '// 03 · build()',
      title: 'An app is not just an interface on a phone.',
      titleAccent: "It's the gateway to your digital ecosystem.",
      body:
        'That is why we build apps that connect to backend, APIs, dashboards, payment systems, ecommerce, inventory, CRMs, messaging, analytics, and AI automation.',
      closing:
        "The goal is not shipping an app. It is building a tool your customer, team, or community actually wants to use because it makes their life easier.",
      capabilities: [
        { code: '01', tag: 'AUTH',     title: 'Auth · biometrics',           meta: 'Tokens · sessions · roles' },
        { code: '02', tag: 'PUSH',     title: 'Push notifications',           meta: 'Alerts · reminders · events' },
        { code: '03', tag: 'PAYMENTS', title: 'Integrated payments',          meta: 'Flows · states · providers' },
        { code: '04', tag: 'API',      title: 'Connected backend',            meta: 'REST · GraphQL · cloud' },
        { code: '05', tag: 'UX',       title: 'Mobile-first experience',      meta: 'Flows · states · accessibility' },
        { code: '06', tag: 'SEC',      title: 'Security by design',           meta: 'OWASP Mobile · encryption · permissions' },
        { code: '07', tag: 'BI',       title: 'Analytics · events',            meta: 'Usage · retention · conversion' },
        { code: '08', tag: 'AI',       title: 'Contextual AI',                  meta: 'Assistants · summaries · classification' },
      ],
    },

    types: {
      eyebrow: '// 04 · types()',
      title: 'Apps that get used,',
      titleAccent: 'not apps that only get downloaded.',
      body:
        'We design mobile apps for different audiences and operations. Five categories that cover most of the cases that come through our door.',
      categories: [
        {
          code: '01',
          title: 'Customer apps',
          tagline: 'Shopping, booking, queries, loyalty.',
          examples: ['Ecommerce', 'Booking', 'Memberships', 'Services', 'Community', 'Education'],
        },
        {
          code: '02',
          title: 'Internal apps',
          tagline: 'For teams, sales, operators, and field workers.',
          examples: ['Sales', 'Inventory', 'Reports', 'Approvals', 'Tasks', 'Comms'],
        },
        {
          code: '03',
          title: 'Fintech apps',
          tagline: 'Accounts, cards, transfers, secure messaging.',
          examples: ['Biometric login', 'Statements', 'History', 'Card activation', 'Transfers', 'Alerts'],
        },
        {
          code: '04',
          title: 'Logistics apps',
          tagline: 'Drivers, routes, packages, proof of delivery.',
          examples: ['Route assignment', 'Delivery states', 'Scanning', 'Geolocation', 'Reports', 'Comms'],
        },
        {
          code: '05',
          title: 'Apps with dashboard + AI',
          tagline: 'Mobile frontend + control center + intelligent assistance.',
          examples: ['App + back office', 'Recommendations', 'Summaries', 'Classification', 'Assistants', 'Live reports'],
        },
      ],
    },

    fintechCallout: {
      eyebrow: '// 05 · trust()',
      title: 'In fintech, a pretty screen without security',
      titleAccent: 'is basically a piñata full of problems.',
      body:
        'That is why we build mobile apps for financial flows with biometric auth, secure token handling, permission validation, encrypted API communication, environment separation, and OWASP Mobile best practices from the first commit.',
      pillars: [
        { title: 'Secure login · biometrics',     meta: 'Face ID · Touch ID · MFA' },
        { title: 'Tokens · sessions',              meta: 'SecureStore · refresh · expiration' },
        { title: 'Encryption · sensitive data',    meta: 'In-transit · at-rest · zero-knowledge' },
        { title: 'OWASP Mobile · hardening',       meta: 'API · permissions · jailbreak detection' },
      ],
    },

    approach: {
      eyebrow: '// 06 · think()',
      title: 'A good app does not start in the code.',
      titleAccent: "It starts by understanding the user's habit.",
      body:
        "The phone is personal space. An app competes against messages, social, banks, maps, and the average existential anxiety of checking notifications every three minutes. So we design around three questions:",
      questions: [
        {
          n: '01',
          q: 'Why would someone open this app?',
          a: 'If there is no clear reason, the app is born dead. Pretty, probably. But dead.',
        },
        {
          n: '02',
          q: 'What does it solve faster than any other channel?',
          a: 'Buying, checking, registering, paying, booking, communicating — but faster than web or phone.',
        },
        {
          n: '03',
          q: 'What does the company behind it need to see?',
          a: 'Users, sales, deliveries, payments, errors, progress. An app without a dashboard is driving at night with the headlights off.',
        },
      ],
    },

    architecture: {
      eyebrow: '// 07 · architect()',
      title: 'We do not just build the app.',
      titleAccent: 'We build the ecosystem that makes it work.',
      body:
        'A serious mobile app rarely lives alone. It needs backend, data, auth, integrations, dashboards, and monitoring. This is the typical architecture.',
      layers: [
        { code: 'L1', name: 'iOS · Android app',          meta: 'React Native · Expo · TypeScript' },
        { code: 'L2', name: 'Auth · sessions',             meta: 'Biometrics · tokens · roles' },
        { code: 'L3', name: 'API · Backend',                meta: 'Node.js · NestJS · LoopBack' },
        { code: 'L4', name: 'Database · storage',           meta: 'Postgres · MySQL · Mongo · S3' },
        { code: 'L5', name: 'External integrations',        meta: 'Payments · CRMs · providers' },
        { code: 'L6', name: 'Dashboard · reports · AI',     meta: 'Back office · analytics · automation' },
      ],
    },

    stack: {
      eyebrow: '// 08 · stack()',
      title: 'Modern stack.',
      titleAccent: 'Without picking tech to show off.',
      body:
        'We pick the stack so the product can be maintained, grow, and adapt without becoming a mythological creature nobody wants to touch six months later.',
      groups: [
        {
          label: 'Mobile',
          items: ['React Native', 'Expo', 'TypeScript', 'SecureStore', 'Push notifications', 'Deep linking', 'Biometrics'],
        },
        {
          label: 'Backend',
          items: ['Node.js', 'NestJS', 'LoopBack', 'REST · GraphQL', 'API Gateway', 'Microservices'],
        },
        {
          label: 'Data · Cloud',
          items: ['PostgreSQL', 'MySQL', 'MongoDB', 'AWS', 'Docker', 'Serverless', 'S3'],
        },
      ],
    },

    useCases: {
      eyebrow: '// 09 · cases()',
      title: 'What we can build with you',
      items: [
        { num: '01', title: 'Customer app',           meta: 'Shop · book · pay · account' },
        { num: '02', title: 'Sales rep app',           meta: 'Sales · clients · inventory · reports' },
        { num: '03', title: 'Driver app',              meta: 'Routes · deliveries · scan · proof' },
        { num: '04', title: 'Fintech app',             meta: 'Accounts · cards · transfers · secure' },
        { num: '05', title: 'Education app',           meta: 'Courses · progress · content · community' },
        { num: '06', title: 'Community app',           meta: 'Members · events · booking · posts' },
        { num: '07', title: 'Ecommerce app',            meta: 'Catalog · cart · payments · orders' },
        { num: '08', title: 'Inventory app',            meta: 'Scan · stock · movements · dashboards' },
        { num: '09', title: 'Habit / tracking app',     meta: 'Logging · progress · reports · analysis' },
        { num: '10', title: 'Internal enterprise app',  meta: 'Approvals · requests · tasks' },
      ],
    },

    differentiators: {
      eyebrow: '// 10 · why()',
      title: 'Why build your app with Era Digital Solutions',
      items: [
        { title: 'We think product',           body: 'Before the screen, we understand the problem, the user, the flow, and the business goal.' },
        { title: 'Frontend + backend',          body: 'We build the app, the API, the database, the dashboard, integrations, and infrastructure.' },
        { title: 'Sensitive flows',             body: 'Experience with payments, auth, personal data, cards, and critical operations.' },
        { title: 'We integrate what you have',  body: 'CRMs, ERPs, payments, internal systems, dashboards, and external platforms.' },
        { title: 'Designed to grow',            body: 'Architecture that evolves: more users, more modules, more data without rewriting.' },
        { title: 'We care about UX',             body: "A slow, confusing app with unnecessary steps gets uninstalled without ceremony." },
      ],
    },

    process: {
      eyebrow: '// 11 · build()',
      title: 'How we build a mobile app',
      steps: [
        { num: '01', title: 'Diagnostic',     body: 'Business, users, goal, current processes, and systems to connect.' },
        { num: '02', title: 'Scope · MVP',     body: 'Key functionality, flows, roles, integrations, and initial version.' },
        { num: '03', title: 'UX · UI',          body: 'Navigation, screens, states, forms, errors, and actions.' },
        { num: '04', title: 'Architecture',    body: 'Backend, APIs, DB, auth, security, notifications, dashboards.' },
        { num: '05', title: 'Development',     body: 'iOS · Android + backend + integrations on a maintainable base.' },
        { num: '06', title: 'Testing',          body: 'Critical flows, errors, sessions, permissions, devices.' },
        { num: '07', title: 'Launch',           body: 'Publication, configuration, deployment, documentation.' },
        { num: '08', title: 'Evolution',        body: 'Metrics, feedback, improvements, new capabilities.' },
      ],
    },

    midCta: {
      title: 'Got an app idea or an operation that should live on the phone?',
      body: 'We can help you turn it into a clear, useful mobile app connected to your business.',
      cta: 'Design your mobile app',
    },

    aiCallout: {
      eyebrow: '// 12 · intelligence()',
      title: 'Apps with AI used right',
      titleAccent: 'feel invisible.',
      body:
        'We embed AI inside mobile apps when it helps reduce friction, improve decisions, or create a more useful experience — not because it looks cool in the pitch.',
      closing:
        'Misused AI looks like a clown with an API key. Used well it just makes the app respond better.',
      uses: [
        'Contextual assistants',
        'Personalized recommendations',
        'Document analysis',
        'Auto summaries',
        'Request classification',
        'Smart chat',
        'Report generation',
        'Behavior analysis',
      ],
    },

    faq: {
      eyebrow: '// 13 · faq()',
      title: 'Frequently asked questions',
      items: [
        { q: 'Do you build apps for iOS and Android?',
          a: 'Yes. We build iOS and Android apps using React Native and Expo, allowing a solid base for both platforms without duplicating effort.' },
        { q: 'Can the app have an admin panel?',
          a: 'Yes. We build dashboards or back office to manage users, sales, orders, inventory, reports, notifications, states, and metrics.' },
        { q: 'Can you connect the app to my existing system?',
          a: 'Yes. We integrate with existing APIs, CRMs, ERPs, payment providers, internal systems, databases, and external services.' },
        { q: 'Can you add payments?',
          a: 'Yes. We integrate payment flows, history, confirmations, transaction states, and external provider connections as needed.' },
        { q: 'Can you add push notifications?',
          a: 'Yes. We implement push for reminders, orders, messages, alerts, promotions, states, or important events.' },
        { q: 'Can you add biometrics?',
          a: 'Yes. We integrate biometric auth with Face ID or fingerprint when the device supports it.' },
        { q: 'Can you build fintech apps?',
          a: 'Yes. We build mobile apps for financial flows: accounts, cards, transaction history, statements, transfers, secure auth, and messaging.' },
        { q: 'Can you publish to App Store and Google Play?',
          a: 'Yes. We support preparation, configuration, and publication, depending on the project scope and the client accounts.' },
        { q: 'Can you build a first MVP version?',
          a: 'Yes. We define an initial version with the most important functions to validate fast, ship sooner, and evolve with real data.' },
        { q: 'How long does it take to build an app?',
          a: 'Depends on scope, integrations, design, backend, security, and features. A simple app does not require the same effort as a fintech with auth, payments, dashboard, and infrastructure. Mysteriously, the physics of software still apply.' },
      ],
    },

    finalCta: {
      eyebrow: '// 14 · ship()',
      title: "Let's build a mobile app",
      titleAccent: 'your customer actually wants to open.',
      body:
        'If you need an app for customers, teams, sales, ecommerce, fintech, education, logistics, or community, we can design, develop, and connect it to your digital ecosystem.',
      cta: 'Book a mobile consultation',
      ctaSecondary: 'Back to home',
    },
  },

  backend: {
    meta: {
      title: 'Backend, APIs & cloud infrastructure',
      description:
        'We design and develop backend, APIs, microservices, databases, cloud infrastructure, authentication, integrations, and scalable systems for companies.',
    },
    breadcrumb: { services: 'Services', current: 'Backend & infrastructure' },

    hero: {
      eyebrow: '// BACKEND · 01 · run()',
      titleA: 'The invisible engine',
      titleB: 'that makes your product',
      titleC: 'actually work.',
      titleAccent: 'APIs, data, infrastructure.',
      subtitle:
        'We design the technical layer that holds web apps, mobile apps, dashboards, ecommerce, fintech, AI, and enterprise integrations together. Backend that operates, scales, and stays maintainable.',
      hudUptime: 'uptime · 99.94%',
      hudInteract: 'hover · scatter',
      ctaPrimary: 'Design your architecture',
      ctaSecondary: 'See technical capabilities',
    },

    problem: {
      eyebrow: '// 02 · diagnose()',
      title: 'A great interface does not save',
      titleAccent: 'a badly designed backend.',
      body:
        "The screens look good in the demo. The problem shows up later — when the system starts to grow and the truth comes out of the backend.",
      symptoms: [
        { tag: 'SLOW',     text: 'The app gets slow' },
        { tag: 'SYNC',     text: "Data does not sync" },
        { tag: 'PERMS',    text: 'Wrong permissions' },
        { tag: 'REPORTS',  text: 'Reports take minutes' },
        { tag: 'INTEGR',   text: 'Integrations fail' },
        { tag: 'TRACE',    text: "Errors that can't be traced" },
        { tag: 'SCALE',    text: "Won't handle more users" },
        { tag: 'FRAGILE',  text: 'Every change breaks something old' },
      ],
      closing:
        "The backend is the invisible engine of a digital product. When it's well designed, no one notices. When it's poorly designed, everyone suffers.",
    },

    value: {
      eyebrow: '// 03 · build()',
      title: 'Not just an API that returns data.',
      titleAccent: "It's the logical center of your operation.",
      body:
        'Business rules, permissions, validations, users, integrations, payments, reports, events, files, and inter-system communication all live there.',
      closing:
        'Clear, maintainable architecture, ready to evolve without every change becoming a negotiation with chaos.',
      capabilities: [
        { code: '01', tag: 'API',       title: 'REST · GraphQL APIs',          meta: 'Endpoints · validation · errors' },
        { code: '02', tag: 'MICRO',     title: 'Microservices',                  meta: 'When it fits, not for fashion' },
        { code: '03', tag: 'DATA',      title: 'Data modeling',                  meta: 'Postgres · Mongo · Prisma' },
        { code: '04', tag: 'AUTH',      title: 'Auth · roles · permissions',     meta: 'JWT · RBAC · refresh tokens' },
        { code: '05', tag: 'CLOUD',     title: 'Cloud infrastructure',           meta: 'AWS · Docker · serverless' },
        { code: '06', tag: 'INTEGR',    title: 'External integrations',          meta: 'i2c · BPC · Salesforce · payments' },
        { code: '07', tag: 'EVENTS',    title: 'Events · queues · webhooks',     meta: 'Async processing' },
        { code: '08', tag: 'OBS',       title: 'Logs · monitoring · audit',      meta: 'Traceability by default' },
      ],
    },

    apis: {
      eyebrow: '// 04 · connect()',
      title: 'APIs designed to connect products,',
      titleAccent: 'not to improvise endpoints.',
      body:
        'We build clear, documented, secure APIs to connect web apps, mobile apps, dashboards, CRMs, payment providers, financial systems, and internal tools.',
      bestPractices: [
        'Clear endpoint structure',
        'Data validation',
        'Error handling',
        'Authentication',
        'Role-based permissions',
        'Logs',
        'Versioning when it applies',
        'Technical documentation',
        'Consistent responses',
        'Security by design',
      ],
      closing:
        'We build APIs that let your systems talk to each other without turning every integration into a small technical tragedy.',
      sampleLogs: [
        { method: 'GET',    path: '/v1/users/me',       status: 200, ms: 38 },
        { method: 'POST',   path: '/v1/auth/login',      status: 200, ms: 122 },
        { method: 'POST',   path: '/v1/transfers',       status: 201, ms: 184 },
        { method: 'GET',    path: '/v1/accounts/4291',   status: 200, ms: 42 },
        { method: 'PUT',    path: '/v1/cards/4291',      status: 200, ms: 110 },
        { method: 'POST',   path: '/v1/webhooks/stripe', status: 200, ms: 76 },
        { method: 'DELETE', path: '/v1/sessions/x4f2',   status: 204, ms: 28 },
        { method: 'POST',   path: '/v1/notifications',   status: 202, ms: 94 },
        { method: 'GET',    path: '/v1/orders?limit=50', status: 200, ms: 156 },
        { method: 'POST',   path: '/v1/payments/charge', status: 402, ms: 88 },
      ],
    },

    microservices: {
      eyebrow: '// 05 · modular()',
      title: 'Modular architecture',
      titleAccent: 'to grow without breaking.',
      body:
        'Not every project needs microservices. And anyone who says otherwise probably also wants to put Kubernetes on a landing page.',
      bodyClose:
        'When a system has multiple domains, integrations, critical flows, or teams working in parallel, modular architecture is the difference between growing in order or building a ball of mud with endpoints.',
      services: [
        { code: 'usr',   name: 'users',         meta: 'Auth · profiles · sessions' },
        { code: 'pay',   name: 'payments',      meta: 'Payments · states · providers' },
        { code: 'card',  name: 'cards',          meta: 'Activation · renewal · sync' },
        { code: 'inv',   name: 'inventory',      meta: 'Stock · movements · alerts' },
        { code: 'rpt',   name: 'reports',        meta: 'Aggregations · exports' },
        { code: 'msg',   name: 'messaging',      meta: 'Inbox · notifications · push' },
        { code: 'file',  name: 'files',          meta: 'Upload · storage · CDN' },
        { code: 'aud',   name: 'audit',          meta: 'Events · traceability' },
        { code: 'int',   name: 'integrations',   meta: 'CRMs · ERPs · providers' },
        { code: 'ai',    name: 'ai',             meta: 'Agents · workflows · LLM' },
      ],
    },

    databases: {
      eyebrow: '// 06 · model()',
      title: 'Data well modeled,',
      titleAccent: "so you don't depend on eternal spreadsheets.",
      body:
        "A database isn't just where 'we save things'. It's where the operational memory of the business lives. We design models for users, customers, products, transactions, inventory, permissions, and any critical entity.",
      closing:
        'A bad database goes unnoticed at first. It shows up once the system has users, money, and operations on top. A magnificent moment to discover errors, naturally.',
      stacks: [
        { label: 'Relational',    items: ['PostgreSQL', 'MySQL', 'Prisma', 'SQL', 'Migrations', 'Indexes'] },
        { label: 'Document',      items: ['MongoDB', 'DocumentDB', 'Flexible structures', 'Aggregations'] },
        { label: 'Operations',    items: ['Backups', 'Replicas', 'Optimization', 'Reports', 'Audit', 'Caching'] },
      ],
    },

    auth: {
      eyebrow: '// 07 · gate()',
      title: 'Who enters. What they see. What they can do.',
      titleAccent: 'Three questions that define a secure system.',
      body:
        'We design authentication and authorization systems to protect routes, data, modules, and sensitive operations. Because "everyone is admin" is not a security policy — it is an invitation to disaster.',
      capabilities: [
        { title: 'Authentication',     meta: 'Sign-up · login · MFA · biometrics' },
        { title: 'Sessions · tokens',  meta: 'JWT · refresh · expiration · revoke' },
        { title: 'Roles · RBAC',       meta: 'Admin · manager · operator · client' },
        { title: 'Multi-tenant',        meta: 'Org-level or team-level access' },
        { title: 'Guards · middleware', meta: 'Route protection · validation' },
        { title: 'Audit',                meta: 'Every sensitive action recorded' },
      ],
    },

    cloud: {
      eyebrow: '// 08 · deploy()',
      title: 'Your product lives outside',
      titleAccent: "the developer's laptop.",
      body:
        'That magical place where everything worked and nobody knew why. We design deployments, cloud services, environments, configurations, domains, APIs, databases, and operational processes.',
      services: [
        { name: 'AWS',                meta: 'EC2 · Lambda · API Gateway' },
        { name: 'Docker',              meta: 'Containers · images · orchestration' },
        { name: 'Serverless',          meta: 'Functions · scaling · pay-per-use' },
        { name: 'Elastic Beanstalk',   meta: 'Managed deploys' },
        { name: 'Nginx · PM2',         meta: 'Reverse proxy · process manager' },
        { name: 'CI/CD',                meta: 'GitHub Actions · automation' },
        { name: 'Environments',        meta: 'Dev · staging · production' },
        { name: 'Domains · TLS',       meta: 'DNS · certificates · CDN' },
      ],
    },

    integrations: {
      eyebrow: '// 09 · bridge()',
      title: 'We connect your systems',
      titleAccent: 'to the rest of the world.',
      body:
        'A modern company rarely uses a single system. It needs to connect payments, CRMs, ERPs, financial providers, card platforms, messaging, ecommerce, AI, banks, logistics, and internal tools.',
      closing:
        'An integration does not end when "it connects". It has to handle errors, states, retries, validations, and weird cases. Because external providers always fail right when someone important is watching. They are considerate that way.',
      providers: [
        { name: 'i2c',           kind: 'Cards' },
        { name: 'BPC SmartVista',kind: 'Processing' },
        { name: 'Salesforce',     kind: 'CRM' },
        { name: 'Stripe',         kind: 'Payments' },
        { name: 'PayPal',         kind: 'Payments' },
        { name: 'Twilio',         kind: 'SMS · WhatsApp' },
        { name: 'SendGrid',       kind: 'Email' },
        { name: 'OpenAI',         kind: 'AI · LLM' },
        { name: 'Anthropic',      kind: 'AI · LLM' },
        { name: 'AWS S3',         kind: 'Storage' },
        { name: 'Slack',          kind: 'Comms' },
        { name: 'HubSpot',        kind: 'CRM' },
      ],
    },

    architecture: {
      eyebrow: '// 10 · architect()',
      title: 'This is what well-thought-out',
      titleAccent: 'infrastructure looks like.',
      body:
        'A complete backend architecture connects frontend, business logic, data, integrations, automation, and monitoring in clear layers.',
      layers: [
        { code: 'L1', name: 'Web · Mobile · Dashboard',   meta: 'Frontend · UX' },
        { code: 'L2', name: 'API Gateway',                 meta: 'Routing · rate-limit · auth' },
        { code: 'L3', name: 'Auth · Authorization',        meta: 'JWT · RBAC · sessions' },
        { code: 'L4', name: 'Business Logic',              meta: 'Rules · validation · state' },
        { code: 'L5', name: 'Database · Files · Events',   meta: 'Postgres · Mongo · S3 · queues' },
        { code: 'L6', name: 'External Integrations',       meta: 'i2c · BPC · Salesforce · payments' },
        { code: 'L7', name: 'Reports · Notifications · AI',meta: 'BI · push · automation' },
        { code: 'L8', name: 'Logs · Monitoring · Audit',   meta: 'Observability · traceability' },
      ],
    },

    useCases: {
      eyebrow: '// 11 · cases()',
      title: 'What we can build',
      items: [
        { num: '01', title: 'Backend for mobile app',          meta: 'Users · payments · push · sync' },
        { num: '02', title: 'API for ecommerce',                meta: 'Products · orders · payments' },
        { num: '03', title: 'Fintech backend',                   meta: 'Transfers · cards · state' },
        { num: '04', title: 'Financial dashboard',              meta: 'Endpoints · aggregations · KPIs' },
        { num: '05', title: 'Roles & permissions system',       meta: 'RBAC · multi-tenant · audit' },
        { num: '06', title: 'Salesforce integration',           meta: 'CRM ↔ ops · sync' },
        { num: '07', title: 'Payment processor integration',    meta: 'Webhooks · retries · states' },
        { num: '08', title: 'Messaging system',                  meta: 'Inbox · push · events' },
        { num: '09', title: 'SaaS platform',                     meta: 'Orgs · subscriptions · modules' },
        { num: '10', title: 'AI agent infrastructure',           meta: 'Tools · permissions · context' },
      ],
    },

    differentiators: {
      eyebrow: '// 12 · why()',
      title: 'Why build your backend with Era Digital Solutions',
      items: [
        { title: 'We think architecture',     body: "We design the structure before writing code as if running from something." },
        { title: 'Product + operation',        body: 'We do not build random endpoints. We understand what process the system solves.' },
        { title: 'Real fullstack',             body: 'We connect backend with web, mobile, dashboards, AI, ecommerce, and fintech.' },
        { title: 'Sensitive systems',          body: 'Experience with financial flows, sensitive data, cards, transfers, and external providers.' },
        { title: 'Built to maintain',          body: 'A good backend works today. It also has to be understood and extended tomorrow.' },
        { title: 'Security & traceability',    body: 'We control access, validate data, log events, and reduce unnecessary exposure.' },
      ],
    },

    process: {
      eyebrow: '// 13 · build()',
      title: 'How we build backend & infrastructure',
      steps: [
        { num: '01', title: 'Diagnostic',     body: 'Business, users, processes, data, systems, integrations, current problems.' },
        { num: '02', title: 'Architecture',   body: 'Modules, services, APIs, database, permissions, infrastructure, integrations.' },
        { num: '03', title: 'Data modeling',  body: 'Entities, relations, migrations, indexes, report structures.' },
        { num: '04', title: 'APIs',            body: 'Endpoints, validations, rules, auth, authorization, consistent responses.' },
        { num: '05', title: 'Integrations',    body: 'External providers, CRMs, payments, AI, notifications, internal systems.' },
        { num: '06', title: 'Deployment',      body: 'Cloud, Docker, environments, domains, variables, logs, automation.' },
        { num: '07', title: 'Security',        body: 'Permissions, sensitive data, exposure, access, performance.' },
        { num: '08', title: 'Documentation',   body: 'We deliver technical docs and a base ready to grow with new modules.' },
      ],
    },

    stack: {
      eyebrow: '// 14 · stack()',
      title: 'Modern stack.',
      titleAccent: 'No tech picked to show off.',
      body:
        'We pick the stack so the product can be maintained, grow, and adapt — not to fill slides with logos.',
      groups: [
        { label: 'Backend',         items: ['Node.js', 'NestJS', 'LoopBack', 'Express', 'Go', 'TypeScript'] },
        { label: 'APIs',             items: ['REST', 'GraphQL', 'Webhooks', 'Event-driven', 'API Gateway'] },
        { label: 'Databases',        items: ['PostgreSQL', 'MySQL', 'MongoDB', 'DocumentDB', 'Prisma', 'Redis'] },
        { label: 'Cloud · Infra',    items: ['AWS', 'Lambda', 'Docker', 'Nginx', 'PM2', 'Serverless', 'CI/CD'] },
        { label: 'Security',          items: ['JWT', 'RBAC', 'OWASP', 'Encryption', 'Secret mgmt', 'Audit logs'] },
        { label: 'Integrations',     items: ['i2c', 'BPC', 'Salesforce', 'Stripe', 'OpenAI', 'CRMs · ERPs'] },
      ],
    },

    midCta: {
      title: 'Does your product need a more serious technical base?',
      body:
        'We can design the backend, APIs, database, infrastructure, and integrations your company needs.',
      cta: "Let's talk about your architecture",
    },

    security: {
      eyebrow: '// 15 · secure()',
      title: 'Security from design,',
      titleAccent: 'not as a plugin at the end.',
      body:
        'A secure backend is not the one that promises to be invincible. It is the one that reduces risk surface, controls access, protects data, and leaves enough traceability to understand what is happening.',
      practices: [
        'Input validation',
        'Data sanitization',
        'Secure token handling',
        'Role separation',
        'Route protection',
        'Rate limiting',
        'Secret management',
        'Per-environment config',
        'Encryption when applicable',
        'Logs without leaking sensitive data',
        'Controlled error responses',
        'Principle of least privilege',
      ],
    },

    faq: {
      eyebrow: '// 16 · faq()',
      title: 'Frequently asked questions',
      items: [
        { q: 'Do you build backend from scratch?',
          a: 'Yes. We design and develop backend from scratch for web apps, mobile apps, dashboards, ecommerce, fintech, internal systems, and automations.' },
        { q: 'Can you work with an existing backend?',
          a: 'Yes. We can review, extend, refactor, or integrate existing systems, depending on the state of the code and current architecture.' },
        { q: 'Do you build REST APIs?',
          a: 'Yes. We build REST APIs to connect applications, dashboards, internal systems, external providers, and mobile apps.' },
        { q: 'Do you build GraphQL?',
          a: 'Yes. We build or consume GraphQL APIs when the project needs it.' },
        { q: 'Can you build microservices?',
          a: 'Yes, when architecture justifies it. We do not use microservices for fashion — we use them when they help separate domains, scale modules, or integrate complex systems.' },
        { q: 'Can you set up cloud infrastructure?',
          a: 'Yes. We configure AWS, serverless, Docker, environments, deployments, and databases.' },
        { q: 'Can you connect my app with external providers?',
          a: 'Yes. We integrate payments, CRMs, financial systems, messaging, logistics, AI, and enterprise tools.' },
        { q: 'Can you build backend for mobile apps?',
          a: 'Yes. We build backend for login, users, profiles, notifications, payments, dashboards, permissions, history, messages, and sync.' },
        { q: 'Can you build backend for fintech?',
          a: 'Yes. We have experience with financial flows, cards, transfers, back office, secure messaging, sensitive data, and bank integrations.' },
        { q: 'Do you include security?',
          a: 'Yes. We design backend with auth, authorization, validations, secure data handling, exposure control, logs, and security best practices.' },
      ],
    },

    finalCta: {
      eyebrow: '// 17 · ship()',
      title: "Let's build the technical engine",
      titleAccent: 'your product needs to grow.',
      body:
        'If your company needs APIs, backend, databases, cloud infrastructure, integrations, dashboards, security, or automation, we can design and develop a solid base for you to operate with more clarity.',
      cta: 'Book a backend consultation',
      ctaSecondary: 'Back to home',
    },
  },

  commerce: {
    meta: {
      title: 'Custom ecommerce, POS & inventory',
      description:
        'We build ecommerce, POS, inventory, digital catalogs, sales dashboards, customer management, suppliers, and connected commerce platforms.',
    },
    breadcrumb: { services: 'Services', current: 'Ecommerce, POS & inventory' },

    hero: {
      eyebrow: '// COMMERCE · 01 · sell()',
      titleA: 'Selling is easy.',
      titleB: 'Holding the operation',
      titleC: 'behind the sale, not so much.',
      titleAccent: 'Connected ecommerce, POS & inventory.',
      subtitle:
        "We build full commerce systems: online store, point of sale, inventory, customers, suppliers, and dashboards. So selling stops depending on Excel, WhatsApp, and human memory.",
      hudOmni: 'omnichannel · 24/7',
      hudInteract: 'hover · scatter',
      ctaPrimary: "Let's build your system",
      ctaSecondary: 'See capabilities',
    },

    problem: {
      eyebrow: '// 02 · diagnose()',
      title: 'Selling more does little',
      titleAccent: "if your operation can't hold it up.",
      body:
        'An online store without a connected operation creates more problems than it solves. The classics start showing up:',
      symptoms: [
        { tag: 'STOCK',    text: 'Items sold with no real stock' },
        { tag: 'EXCEL',    text: 'Inventory updated by hand' },
        { tag: 'CHAT',     text: 'Orders tracked through WhatsApp' },
        { tag: 'COSTS',    text: 'Costs guessed by feel' },
        { tag: 'CLIENTS',  text: 'Customers with no history' },
        { tag: 'BLIND',    text: 'Branches running without visibility' },
        { tag: 'LATE',     text: 'Reports that arrive too late' },
        { tag: 'MARGIN',   text: 'Margin calculated "more or less"' },
      ],
      closing:
        "A store shouldn't be an island. It should be part of a connected commerce system — sell, record, measure, buy, and decide from a single operation.",
    },

    value: {
      eyebrow: '// 03 · build()',
      title: 'Behind every sale there is inventory, cost,',
      titleAccent: 'payment, customer, delivery, decision.',
      body:
        'That is why we build platforms that connect the whole commerce operation — not just the cart.',
      closing:
        'A platform that does more than sell: helps you manage, measure, and improve the business.',
      capabilities: [
        { code: '01', tag: 'STORE',     title: 'Online store',                meta: 'Catalog · cart · checkout' },
        { code: '02', tag: 'POS',       title: 'Web · mobile POS',            meta: 'Counter · tablet · branch' },
        { code: '03', tag: 'STOCK',     title: 'Centralized inventory',       meta: 'SKU · variants · branches' },
        { code: '04', tag: 'CLIENTS',   title: 'Customers · CRM',              meta: 'History · segmentation · tickets' },
        { code: '05', tag: 'SUPPLY',    title: 'Suppliers · costs',           meta: 'Purchases · margins · profitability' },
        { code: '06', tag: 'PAY',       title: 'Integrated payments',          meta: 'Card · transfer · COD' },
        { code: '07', tag: 'BI',        title: 'Commerce dashboards',         meta: 'Sales · profit · alerts' },
        { code: '08', tag: 'AI',        title: 'AI where it adds value',       meta: 'Demand · recs · alerts' },
      ],
    },

    ecommerce: {
      eyebrow: '// 04 · ship()',
      title: 'Stores designed around your business,',
      titleAccent: 'not around a generic template.',
      body:
        'From a simple shop to a full commerce platform with inventory, customers, payments, promotions, and admin panel.',
      features: [
        'Catalog · categories · filters',
        'Search · featured products',
        'Cart · checkout',
        'Online payments',
        'User account · history',
        'Promotions · coupons',
        'Product variants',
        'Connected stock control',
        'Customer notifications',
        'Admin panel',
        'Sales reports',
        'SEO for products & categories',
      ],
    },

    pos: {
      eyebrow: '// 05 · checkout()',
      title: 'A POS is not a cash register',
      titleAccent: 'with a complex about Excel.',
      body:
        'POS systems built to sell fast, record well, and understand what is happening — from counter, phone, tablet, or branch.',
      kinds: [
        { tag: 'WEB',     name: 'Web POS',          meta: 'Counter · admin' },
        { tag: 'MOBILE',  name: 'Mobile POS',        meta: 'Sales reps · field' },
        { tag: 'TABLET',  name: 'Tablet POS',         meta: 'Restaurant · retail' },
        { tag: 'BRANCH',  name: 'Multi-branch POS',  meta: 'Centralized inventory' },
        { tag: 'OMNI',    name: 'POS + ecommerce',    meta: 'Same stock · same client' },
      ],
      capabilities: [
        'Sales recording',
        'Search · barcode scan',
        'Discounts · coupons',
        'Payment methods',
        'Customer association',
        'Tickets · receipts',
        'Cash close',
        'Sales by rep',
        'Live inventory',
        'Returns · cancellations',
        'Daily reports',
        'Admin dashboard',
      ],
    },

    inventory: {
      eyebrow: '// 06 · stock()',
      title: 'Your inventory stops being',
      titleAccent: 'an "optimistic estimate".',
      body:
        'Bad inventory makes everything else lie: sales, profit, purchases, orders, availability. We build modules to control products, stock, movements, suppliers, and alerts.',
      features: [
        'Products · categories · variants',
        'SKU · barcode',
        'Available stock · low-stock thresholds',
        'In/out movements · adjustments',
        'Low-stock alerts',
        'Best sellers',
        'Stalled products',
        'Per-branch inventory',
        'Per-warehouse inventory',
        'Change history',
        'Exportable reports',
        'Movement audit',
      ],
      closing:
        'Your inventory becomes a real source of information for selling and buying better — not an act of optimistic faith.',
    },

    catalog: {
      eyebrow: '// 07 · catalog()',
      title: 'Digital catalogs',
      titleAccent: 'clear, ordered, easy to manage.',
      body:
        'So your team can manage products, prices, images, categories, variants, promotions, and availability without fighting the platform.',
      features: [
        'Add · edit products',
        'Image · description upload',
        'Categories · tags',
        'Variants (size · color · format)',
        'Prices · costs · margins',
        'Featured · related products',
        'Public · private catalogs',
        'WhatsApp · social catalog',
      ],
    },

    clients: {
      eyebrow: '// 08 · know()',
      title: 'Selling once is fine.',
      titleAccent: "Selling again without chasing the customer, better.",
      body:
        'Each purchase can feed a smarter commercial relationship. We build modules to manage customers, history, behavior, and follow-up.',
      features: [
        { title: 'Purchase history',           meta: 'Products · ticket · frequency' },
        { title: 'Segmentation',                meta: 'Frequent · inactive · new' },
        { title: 'Average ticket',              meta: 'Per customer · per category' },
        { title: 'Personalized promotions',     meta: 'By segment · by behavior' },
        { title: 'Notifications',               meta: 'Email · push · WhatsApp' },
        { title: 'CRM integration',             meta: 'Salesforce · HubSpot · in-house' },
      ],
    },

    suppliers: {
      eyebrow: '// 09 · margin()',
      title: 'Knowing how much you sell is fine.',
      titleAccent: 'Knowing how much you actually earn, better.',
      body:
        "Many businesses sell but don't really know how much they earn. That is an elegant way to walk smiling toward financial trouble.",
      features: [
        'Supplier registry',
        'Products per supplier',
        'Purchase costs · history',
        'Purchase orders',
        'Inventory entries',
        'Per-product margins',
        'Supplier comparison',
        'Cost-change alerts',
        'Profit reports',
        'Profitable · low-margin products',
      ],
    },

    dashboards: {
      eyebrow: '// 10 · observe()',
      title: 'A system without a dashboard',
      titleAccent: 'is just a box where things happen.',
      body:
        'Very modern, sure — and just as blind. We turn your commerce data into clear panels so you can decide better, buy better, sell better.',
      tickers: [
        { label: '24h sales',         value: '$48.2K',  delta: '+8.4%',  up: true },
        { label: 'Avg ticket',         value: '$420',    delta: '+2.1%',  up: true },
        { label: 'Conversion',         value: '3.8%',    delta: '+0.6%',  up: true },
        { label: 'Low stock',          value: '24',      delta: '+6',     up: false },
        { label: 'Avg margin',         value: '38%',     delta: '+1.2%',  up: true },
        { label: 'Returns',            value: '0.7%',    delta: '-0.3%',  up: false },
      ],
      closing:
        'Sales, profit, best sellers, customers, inventory, reps, branches, suppliers. All measurable, all actionable.',
    },

    omnichannel: {
      eyebrow: '// 11 · connect()',
      title: 'The store, the ecommerce, and the POS',
      titleAccent: 'should speak the same language.',
      body:
        "If you sell at the store, inventory should update. If you sell online, stock should change. If new merchandise arrives, the catalog should reflect it. If a sale happens, the dashboard should measure it.",
      flow: [
        { code: 'L1', name: 'Ecommerce',                    meta: 'Online store' },
        { code: 'L2', name: 'Web · mobile POS',              meta: 'Physical store · sales reps' },
        { code: 'L3', name: 'Centralized inventory',         meta: 'Stock · variants · branches' },
        { code: 'L4', name: 'Customers · suppliers',         meta: 'History · costs · margins' },
        { code: 'L5', name: 'Payments · orders',              meta: 'Processors · states' },
        { code: 'L6', name: 'Commerce dashboard',            meta: 'Sales · profit · alerts' },
        { code: 'L7', name: 'Automation · AI',                meta: 'Reports · demand · alerts' },
      ],
    },

    aiCallout: {
      eyebrow: '// 12 · intelligence()',
      title: 'Well-used AI predicts demand',
      titleAccent: 'and warns you before you run out of stock.',
      body:
        'We do not add AI as hot sauce. We integrate it when it helps you sell better, buy better, or save your team time.',
      uses: [
        'Product recommendations',
        'Demand prediction',
        'Auto product classification',
        'Description generation',
        'Stalled-product detection',
        'Customer segmentation',
        'Ticket and comment analysis',
        'Auto executive summaries',
        'Internal assistant for metrics',
        'Auto reports',
      ],
      closing:
        "That is useful AI. Not a chatbot stuck in the corner saying \"hi, I'm your virtual assistant\" while nobody can find the buy button.",
    },

    architecture: {
      eyebrow: '// 13 · architect()',
      title: 'This is what a well-connected',
      titleAccent: 'commerce platform looks like.',
      body:
        'Each layer talks to the next. Sales trigger stock, stock feeds dashboards, dashboards inform purchases. No Excel acting as middleman.',
      layers: [
        { code: 'L1', name: 'Ecommerce · POS · App',         meta: 'Frontend · channels' },
        { code: 'L2', name: 'API Gateway · Backend',          meta: 'Auth · routing · validation' },
        { code: 'L3', name: 'Products · Inventory',           meta: 'Catalog · stock · variants' },
        { code: 'L4', name: 'Customers · Suppliers',          meta: 'CRM · costs · orders' },
        { code: 'L5', name: 'Payments · Orders',               meta: 'Processors · states · webhooks' },
        { code: 'L6', name: 'Dashboards · Reports · AI',      meta: 'Sales · profit · automation' },
      ],
    },

    useCases: {
      eyebrow: '// 14 · cases()',
      title: 'What we can build',
      items: [
        { num: '01', title: 'Online store',                      meta: 'Catalog · payments · inventory · orders' },
        { num: '02', title: 'POS for physical store',            meta: 'Counter · clients · discounts' },
        { num: '03', title: 'Mobile POS',                         meta: 'Sales reps · scan · reports' },
        { num: '04', title: 'Inventory system',                   meta: 'SKU · branches · alerts' },
        { num: '05', title: 'Commerce dashboard',                 meta: 'Sales · profit · clients' },
        { num: '06', title: 'Supplier system',                    meta: 'Costs · orders · margins' },
        { num: '07', title: 'Digital catalog',                    meta: 'Web · mobile · WhatsApp' },
        { num: '08', title: 'Omnichannel platform',               meta: 'Physical + online + social + branches' },
        { num: '09', title: 'Ecommerce with AI',                  meta: 'Demand · recs · alerts' },
        { num: '10', title: 'Full commerce system',                meta: 'Everything connected on one platform' },
      ],
    },

    differentiators: {
      eyebrow: '// 15 · why()',
      title: 'Why build your system with Era Digital Solutions',
      items: [
        { title: 'We do not build isolated stores',     body: 'Systems connected to inventory, payments, customers, suppliers, and dashboards.' },
        { title: 'We understand real operations',        body: 'Selling is controlling stock, costs, orders, payments, customers, reports — not just showing products.' },
        { title: 'Web · mobile · backend',                body: 'Store, POS, mobile app, backend, database, dashboard, and integrations.' },
        { title: 'Built to grow',                         body: 'Start with the essentials. Add modules, branches, channels, or automation when you need them.' },
        { title: 'AI where it adds value',                body: 'Sales analysis, demand prediction, product classification, recommendations.' },
        { title: 'Real financial visibility',             body: 'Not just sales — also costs, margins, profit, and profitable products.' },
      ],
    },

    process: {
      eyebrow: '// 16 · build()',
      title: 'How we build a commerce platform',
      steps: [
        { num: '01', title: 'Diagnostic',     body: 'How you sell, where you sell, what products, how you control inventory, what reports you need.' },
        { num: '02', title: 'Design',          body: 'Whether you need ecommerce, POS, inventory, dashboard, mobile app, payment integration, or full system.' },
        { num: '03', title: 'Modeling',        body: 'Products, categories, variants, stock, costs, suppliers, movements.' },
        { num: '04', title: 'UX · UI',          body: 'Experience for clients, reps, admins, operators.' },
        { num: '05', title: 'Backend',          body: 'APIs, database, rules, permissions, payments, orders, inventory, reports.' },
        { num: '06', title: 'Frontend',         body: 'Store, POS, admin panel, dashboard, or mobile app per scope.' },
        { num: '07', title: 'Integrations',    body: 'Payments, notifications, analytics, external providers, CRM, or existing tools.' },
        { num: '08', title: 'Launch',           body: 'Deploy, training, documentation, evolution with new modules.' },
      ],
    },

    stack: {
      eyebrow: '// 17 · stack()',
      title: 'Tech for modern digital commerce',
      titleAccent: 'Not for filling slides with logos.',
      body:
        'Stack picked so the platform can grow, stay maintainable, and connect with what you already use.',
      groups: [
        { label: 'Frontend',         items: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Responsive', 'SEO'] },
        { label: 'Mobile',           items: ['React Native', 'Expo', 'Push notifications', 'Barcode scanning'] },
        { label: 'Backend',           items: ['Node.js', 'NestJS', 'LoopBack', 'REST · GraphQL', 'Microservices'] },
        { label: 'Databases',        items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Prisma', 'Redis · cache'] },
        { label: 'Cloud · Infra',     items: ['AWS', 'Docker', 'Serverless', 'API Gateway', 'CI/CD'] },
        { label: 'Integrations',     items: ['Stripe', 'PayPal', 'Twilio · WhatsApp', 'Salesforce', 'OpenAI'] },
      ],
    },

    midCta: {
      title: 'Does your business sell, but the operation is still patched with Excel and human memory?',
      body:
        'We can build a commerce platform that connects sales, inventory, customers, suppliers, payments, and dashboards.',
      cta: "Let's design your commerce system",
    },

    faq: {
      eyebrow: '// 18 · faq()',
      title: 'Frequently asked questions',
      items: [
        { q: 'Do you build online stores?',
          a: 'Yes. We build custom ecommerce with catalog, cart, checkout, payments, orders, users, admin panel, and inventory integration.' },
        { q: 'Can you build a POS system?',
          a: 'Yes. Web, mobile, or tablet POS, connected to inventory, customers, sales reps, branches, and reports.' },
        { q: 'Can inventory connect to the online store?',
          a: 'Yes. We design centralized inventory so ecommerce and POS sales update stock automatically.' },
        { q: 'Can you add barcode scanning?',
          a: 'Yes. We integrate barcode or QR scanning in web or mobile apps depending on the device and flow.' },
        { q: 'Can you build sales dashboards?',
          a: 'Yes. Dashboards for sales, profit, inventory, customers, products, suppliers, sales reps, and branches.' },
        { q: 'Can you handle suppliers and costs?',
          a: 'Yes. Modules to register suppliers, purchase costs, inventory entries, margins, and profitability reports.' },
        { q: 'Can you integrate payments?',
          a: 'Yes. We integrate payment methods in ecommerce or POS based on country, provider, and project needs.' },
        { q: 'Can you build a mobile app for sales reps?',
          a: 'Yes. Mobile apps for sales, inventory, deliveries, catalog, reports, or commerce management.' },
        { q: 'Can you add AI to ecommerce?',
          a: 'Yes. AI for recommendations, sales analysis, demand prediction, description generation, product classification, and smart reports.' },
        { q: 'Can you migrate from Excel?',
          a: 'Yes. We help structure products, customers, inventory, and sales from existing files into a more orderly platform.' },
        { q: 'Does this work for small businesses?',
          a: 'Yes. We build a first version focused on the essentials and leave the architecture ready to grow.' },
        { q: 'Does this work for businesses with multiple branches?',
          a: 'Yes. We design inventory, sales, users, permissions, and reports per branch or business unit.' },
      ],
    },

    finalCta: {
      eyebrow: '// 19 · ship()',
      title: "Let's build a commerce platform",
      titleAccent: 'that sells, measures, and orders your operation.',
      body:
        'If your business needs ecommerce, POS, inventory, clients, suppliers, payments, dashboards, or automation, we can design a system to sell better and operate with more control.',
      cta: 'Book a commerce consultation',
      ctaSecondary: 'Back to home',
    },
  },

  about: {
    meta: {
      title: 'About',
      description:
        'Era Digital Solutions was founded in 2019 to bring high-end technology to SMBs, micro-businesses, and entrepreneurs. Software, AI, cybersecurity, and infrastructure for companies that are growing.',
    },
    breadcrumb: { home: 'Home', current: 'About' },

    hero: {
      eyebrow: '// ABOUT · since 2019',
      titleA: 'High-end technology',
      titleB: 'for the companies',
      titleC: 'building from the bottom up.',
      titleAccent: 'We bring closer what felt out of reach.',
      subtitle:
        'Era Digital Solutions was founded in 2019 to help SMBs, micro-businesses, and entrepreneurs enter, grow, and compete in the digital world with tools that used to be reserved for large enterprises.',
      bodyExtra:
        "We don't believe high-end technology should live far from small businesses. We believe it should be better explained, better built, and closer to the people who actually need it.",
      ctaPrimary: 'See what we build',
      ctaSecondary: "Let's talk about your project",
    },

    market: {
      eyebrow: '// 02 · context()',
      title: 'The real market',
      titleAccent: "isn't enterprise. It's small business.",
      body:
        "In Mexico, micro and small businesses are practically the entire business fabric. The Ministry of Economy describes them as more than 99.8% of all companies. And almost none of them have real access to modern technology.",
      stats: [
        { value: '99.8%', label: 'of companies in Mexico are SMBs',                source: 'Ministry of Economy' },
        { value: '95.5%', label: 'are micro-businesses (under 10 employees)',      source: 'INEGI · 2023' },
        { value: '41.5%', label: 'of the workforce works at a micro-business',     source: 'INEGI · 2023' },
        { value: '25.3%', label: 'of economic units use computer equipment',       source: 'INEGI · 2023' },
      ],
      closing:
        "That's the gap. There's no shortage of talent or hunger to grow — what's missing is useful, secure, modern technology reaching the people building from the bottom up.",
    },

    story: {
      eyebrow: '// 03 · origin()',
      title: 'Era Digital Solutions was born in 2019',
      titleAccent: 'with one clear idea: democratize access to technology.',
      body:
        "From day one we started as a tech firm for SMBs. We saw a clear gap: thousands of businesses want to grow, sell better, organize their processes, and compete in a more digital market — but they don't always know where to start.",
      bodyMid:
        "Some have great ideas but no tech team. Others have working processes but still depend on spreadsheets, WhatsApp, and manual reports. Many want to innovate, but the technology feels expensive, confusing, or built only for huge corporations.",
      bodyClose:
        "Era was born to close that gap. To translate real business needs into clear digital solutions. To turn ideas into products. To help growing companies take the next step without getting lost between vendors, buzzwords, and tools that promise a lot and solve little.",
      tagline:
        "An SMB doesn't need someone selling them \"digital transformation\" as a pretty concept. It needs technology that helps them sell, operate, protect themselves, measure, and grow.",
    },

    missionVision: {
      eyebrow: '// 04 · purpose()',
      title: 'Mission & vision.',
      titleAccent: 'Plain, no corporate dressing.',
      mission: {
        label: 'Mission',
        title: 'Bring useful, secure, and innovative technology to SMBs, micro-businesses, and entrepreneurs.',
        body:
          "Make technology stop feeling distant. Let a company have its own system, understand its numbers, sell online, control its inventory, automate tasks, or turn a wild idea into a real app. Make digital security a baseline, not a luxury.",
      },
      vision: {
        label: 'Vision',
        title: 'Be the bridge between companies with potential and technology that feels out of reach.',
        body:
          "Many small and mid-sized companies have vision, talent, and hunger to grow but hit a wall with technology — not because they can't use it, but because no one explains it well or grounds it to their reality. Era wants to be that bridge between an idea and a product, between a manual operation and a digital system.",
      },
    },

    represent: {
      eyebrow: '// 05 · who()',
      title: 'Innovation for those who need it,',
      titleAccent: 'not just for those who can afford giant consultancies.',
      body:
        'We love working with entrepreneurs, family businesses, growing companies, and people with ambitious ideas — even when they are still messy. The best stuff usually lives there.',
      tags: [
        'Strange ideas',
        'New models',
        'Undigitized processes',
        'Traditional businesses',
        'Growing companies',
        'Opportunities without a map',
      ],
      closing:
        'Innovation does not always come from a fancy room with glass whiteboards. Sometimes it comes from a chaotic conversation, a notebook, a store, a kitchen, a warehouse, or a family business that already understands it needs to evolve.',
    },

    stance: {
      eyebrow: '// 06 · approach()',
      title: 'Technology should not',
      titleAccent: 'complicate companies more. It should give them clarity.',
      body:
        "The problem isn't a lack of tools. It's that many tools are not built for the reality of SMBs. They're expensive, generic, hard to implement, don't connect to the real operation, require processes the company doesn't have yet, or get abandoned because nobody understands them.",
      questions: [
        'What are you trying to solve?',
        'What process is slowing you down?',
        'What operation depends too much on manual work?',
        'What data do you need to see and currently cannot?',
        "What part of the business has outgrown its tools?",
      ],
      closing:
        "Then we pick the technology. Not the other way around. Building first and thinking later is a popular human tradition, but a costly one.",
    },

    security: {
      eyebrow: '// 07 · secure()',
      title: 'We were also born under another premise:',
      titleAccent: 'democratize security in the digital world.',
      body:
        'Entering the digital world without understanding security is like opening a new store and leaving the door without a lock because "no one knows us yet." Many SMBs think cybersecurity is only for banks and corporations. In practice, any business handling customers, payments, passwords, inventory, or personal data needs to think about security.',
      pillars: [
        'Authentication',
        'Permissions',
        'Sensitive data',
        'Backups',
        'Access control',
        'Infrastructure',
        'APIs',
        'Best practices',
        'Training',
        'Prevention',
      ],
      closing:
        "We don't see cybersecurity as an extra. We see it as part of building well — from a landing page to a financial platform, it should be in the conversation from the start.",
    },

    beliefs: {
      eyebrow: '// 08 · believe()',
      title: 'We believe in software',
      titleAccent: 'that solves real problems.',
      against: [
        "Pretty pages that don't convert",
        "Dashboards full of charts no one uses",
        "Expensive systems more complex than the original problem",
        'AI used as decoration to call something "innovative"',
      ],
      forItems: [
        'Sell better',
        'Organize processes',
        'Reduce manual work',
        'Understand the numbers',
        'Protect information',
        'Automate tasks',
        'Serve customers better',
        'Launch new products',
        'Decide with data',
        'Compete with modern tools',
      ],
    },

    pillars: {
      eyebrow: '// 09 · pillars()',
      title: 'Five pillars.',
      titleAccent: 'What holds up everything we build.',
      items: [
        {
          num: '01',
          title: 'Democratize technology',
          body: "Let more SMBs, micro-businesses, and entrepreneurs access software, automation, AI, dashboards, and infrastructure without feeling like it belongs to another world. Tech should adapt to the business, not intimidate it.",
        },
        {
          num: '02',
          title: 'Digitize with purpose',
          body: "Not everything needs an app. Not everything needs AI. But many businesses do need to stop running on manual processes, scattered data, and disconnected tools. We build what actually moves the operation.",
        },
        {
          num: '03',
          title: 'Turn wild ideas into real products',
          body: "We take that ambitious, weird, hard-to-explain idea, organize it, design it, break it down into features, and turn it into something that can be used, sold, measured, and evolved.",
        },
        {
          num: '04',
          title: 'Build security from the start',
          body: 'Security is not added at the end. It is designed from the beginning. We think about access, permissions, sensitive data, exposure, and infrastructure from the architecture.',
        },
        {
          num: '05',
          title: 'Explain, teach, accompany',
          body: "We don't believe in hiding everything behind technical words so the client depends on us forever. We want them to understand what we're building and why it matters.",
        },
      ],
    },

    whatWeDo: {
      eyebrow: '// 10 · build()',
      title: 'What we do, concretely.',
      titleAccent: 'No "digital transformation" as a pretty concept.',
      body:
        'Beyond the service list, what we do is simpler: we help a company use technology to work better.',
      services: [
        { tag: 'WEB',     title: 'Custom software' },
        { tag: 'WEB',     title: 'Enterprise web apps' },
        { tag: 'MOBILE',  title: 'iOS & Android mobile apps' },
        { tag: 'BACKEND', title: 'APIs & cloud infrastructure' },
        { tag: 'AI',      title: 'AI automation' },
        { tag: 'AI',      title: 'AI agents for businesses' },
        { tag: 'BI',      title: 'Dashboards & analytics' },
        { tag: 'COMMERCE',title: 'Ecommerce, POS & inventory' },
        { tag: 'FINTECH', title: 'Fintech & banking infrastructure' },
        { tag: 'SEC',     title: 'Cybersecurity & audit' },
        { tag: 'REALTIME',title: 'Realtime messaging' },
        { tag: 'OPS',     title: 'Logistics, delivery, field ops' },
      ],
    },

    forWhom: {
      eyebrow: '// 11 · clients()',
      title: 'For companies that know',
      titleAccent: "they can't keep operating the same way.",
      body:
        "We work with growing businesses that need a stronger digital base. It doesn't matter if the first step is a page, an app, a dashboard, or a full platform. What matters is that the step makes sense.",
      audiences: [
        'SMBs that want to organize their operation',
        'Micro-businesses that want to sell more and control better',
        'Entrepreneurs with an idea to launch',
        'Stores that need ecommerce, POS, and inventory',
        'Service businesses with internal systems',
        'Teams that need dashboards and reports',
        'Businesses that want to automate processes',
        'Companies that want to protect their information',
        'Projects that need to go from idea to product',
      ],
    },

    process: {
      eyebrow: '// 12 · how()',
      title: 'First we understand the business.',
      titleAccent: 'Then we build technology.',
      body:
        "Our process starts with questions, not templates. We want to understand how the company operates, where time is lost, which processes are manual, which data isn't visible, what tools already exist, and what objective the business wants to reach.",
      steps: [
        { num: '01', title: 'Understand the problem',     body: 'Before talking about screens, we talk about the business.' },
        { num: '02', title: 'Define the digital goal',     body: "What the solution must achieve, not what tech we'll use." },
        { num: '03', title: 'Design the solution',          body: 'UX, flows, modules, priorities, scalability.' },
        { num: '04', title: 'Build the product',             body: 'Frontend, backend, integrations, infrastructure.' },
        { num: '05', title: 'Wire data & security',          body: 'Permissions, auth, exposure, monitoring.' },
        { num: '06', title: 'Measure results',               body: 'Dashboards, reports, actionable metrics.' },
        { num: '07', title: 'Evolve with the business',      body: 'New modules, integrations, capabilities.' },
      ],
    },

    different: {
      eyebrow: '// 13 · why()',
      title: 'We do not come to sell technology.',
      titleAccent: 'We come to translate it.',
      body:
        "Many companies don't need someone impressing them with technical terms. They need someone helping them understand what's possible, what should be done first, and how technology can become a real advantage.",
      translations: [
        { from: 'Ideas',         to: 'Products' },
        { from: 'Processes',     to: 'Systems' },
        { from: 'Data',          to: 'Decisions' },
        { from: 'Risks',         to: 'Security' },
        { from: 'Growth',        to: 'Infrastructure' },
      ],
      closing:
        "We're not just a company that builds web pages. We're a tech firm built to help growing companies enter the digital era with clarity, security, and innovation.",
    },

    manifesto: {
      eyebrow: '// 14 · manifesto()',
      title: 'High-end technology',
      titleAccent: 'should also belong to small businesses.',
      body:
        'Innovation should not stay locked inside corporations, banks, giant startups, or companies with impossible budgets. SMBs and micro-businesses also deserve modern tools, security, automation, dashboards, and well-built software.',
      lines: [
        'To bring technology closer to those building from the bottom up.',
        'To help real businesses take the next step.',
        'To turn wild ideas into functional products.',
        'To democratize information, security, and access to the digital world.',
      ],
      closing:
        "We don't want technology to be a barrier. We want it to be a platform.",
    },

    finalCta: {
      eyebrow: '// 15 · ship()',
      title: "If your company is growing,",
      titleAccent: 'your technology should be growing with it.',
      body:
        'We can help you turn your processes, ideas, and challenges into clear, secure digital solutions ready to evolve.',
      cta: "Let's talk about your project",
      ctaSecondary: 'See our services',
    },
  },

  footer: {
    tagline: "Technology firm for SMEs, micro-businesses and founders. Software, AI, infrastructure and security for companies building from the ground up.",
    sectionsTitle: 'Services',
    companyTitle: 'Company',
    contactTitle: 'Contact',
    legalTitle: 'Legal',
    company: [
      { label: 'About',          href: '/about' },
      { label: 'How we work',    href: '/about#process' },
      { label: 'Manifesto',      href: '/about#manifesto' },
      { label: 'Contact',        href: '/#contact' },
    ],
    legal: [
      { label: 'Privacy notice', href: '#privacy' },
      { label: 'Terms',          href: '#terms' },
    ],
    location: 'Remote · Mexico · LATAM',
    rights: 'All rights reserved.',
    builtWith: 'Built with judgement in CDMX.',
  },
}

export default en
