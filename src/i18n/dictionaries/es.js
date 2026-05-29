const es = {
  nav: {
    services: 'Servicios',
    work: 'Lo que construimos',
    process: 'Cómo trabajamos',
    contact: 'Contacto',
    cta: 'Hablemos de tu proyecto',
  },
  hero: {
    eyebrow: 'Estudio de infraestructura digital',
    titleLead: 'Llevamos tus ideas',
    titleAccent: 'a la nueva era digital.',
    subtitle:
      'Software, IA e infraestructura para empresas que ya no quieren operar en modo manual y quieren empezar a funcionar como un sistema.',
    note:
      'Aplicaciones web, apps móviles, dashboards, automatizaciones con IA, ecommerce, fintech e infraestructura backend — diseñadas para pensar, escalar y decidir.',
    ctaPrimary: 'Hablemos de tu proyecto',
    ctaSecondary: 'Explorar el sistema',
    hudTitle: 'NEURAL · CORE',
    hudMeta: 'capa de cognición',
    hudStatus: 'SINAPSANDO',
    hudActivity: 'Actividad sináptica',
    hudPathways: 'vías activas',
    hudNodes: 'neuronas',
    hudSignal: 'señal',
    hudFooterA: 'pulso · 0.94',
    hudFooterB: 'DESPIERTO',
    signals: [
      { k: '120+', l: 'Neuronas en la malla / active nodes' },
      { k: '24/7', l: 'Sinapsis en línea / firing pathways' },
      { k: 'IA', l: 'Cognición integrada / with judgement' },
    ],
    scrollHint: 'scroll · entra al sistema',
    modules: [
      { name: 'Web Apps', meta: 'Plataformas SaaS · Portales internos', state: 'active', tag: 'ACTIVE' },
      { name: 'AI Agents', meta: 'Asistentes con reglas y memoria',     state: 'run',    tag: 'RUNNING' },
      { name: 'Backend APIs', meta: 'Microservicios · Bases de datos',   state: 'live',   tag: 'STABLE' },
      { name: 'Dashboards', meta: 'Datos para decidir, no para decorar', state: 'live',   tag: 'LIVE' },
      { name: 'Security', meta: 'Auditoría · Permisos · Auth',           state: 'warn',   tag: 'MONITORING' },
      { name: 'Fintech Layer', meta: 'Pagos · Trazabilidad · Auth',      state: 'active', tag: 'CONNECTED' },
      { name: 'Messaging', meta: 'Tiempo real · Notificaciones',         state: 'run',    tag: 'STREAMING' },
      { name: 'Ecommerce / POS', meta: 'Inventario · Ventas · Reportes', state: 'live',   tag: 'LIVE' },
    ],
  },
  problem: {
    eyebrow: 'El diagnóstico real',
    titleA: 'El problema no es que tu negocio no tenga tecnología.',
    titleB: 'Es que muchas veces',
    titleC: 'la tecnología no trabaja junta',
    body1:
      'Hay empresas que venden por WhatsApp, controlan inventario en hojas de cálculo, revisan reportes a mano, atienden clientes desde mil canales y toman decisiones con información incompleta.',
    body2: 'Eso funciona… hasta que deja de funcionar.',
    body3:
      'Cuando un negocio empieza a crecer, los procesos manuales se vuelven lentos, caros y difíciles de controlar. Ahí es donde entra Era Digital Solutions: diseñamos software a la medida para convertir operaciones dispersas en sistemas claros, conectados y medibles.',
    beforeLabel: 'Operación dispersa',
    afterLabel: 'Plataforma conectada',
    beforeItems: [
      { label: 'WhatsApp', meta: 'Pedidos sueltos' },
      { label: 'Excel', meta: 'Inventario manual' },
      { label: 'Reportes', meta: 'Hechos a mano' },
      { label: 'Pagos', meta: 'Sin trazabilidad' },
      { label: 'Equipo', meta: 'Cada quien en su isla' },
    ],
    afterItems: [
      { label: 'Plataforma central', meta: 'Una fuente de verdad' },
      { label: 'Datos en tiempo real', meta: 'Conectados al negocio' },
      { label: 'Automatizaciones', meta: 'IA con supervisión' },
      { label: 'Seguridad y auditoría', meta: 'Por diseño, no por suerte' },
      { label: 'Decisiones con métricas', meta: 'No con corazonadas' },
    ],
  },
  value: {
    eyebrow: 'Capas que operan',
    titleA: 'Un sistema serio',
    titleB: 'no es una capa.',
    titleC: 'Son diez decisiones apiladas con criterio.',
    body1:
      'Cada parte resuelve un problema concreto. Juntas, sostienen la operación.',
    body2:
      'No vendemos diez productos sueltos. Construimos un solo sistema, hecho de capas que se apoyan unas en otras.',
    body3:
      'Una decisión equivocada en la base obliga a parchar todo lo de arriba. Por eso nos importa el orden — y por eso construimos así.',
    closing: 'Diez disciplinas. Un solo sistema.',
    stackLabel: 'system.stack',
    stackMeta: '10 capas · 1 sistema',
    layersTitle: 'Las diez capas',
    layers: [
      { code: '01', tag: 'WEB',       title: 'Aplicaciones web',           meta: 'SaaS · CRMs · portales internos' },
      { code: '02', tag: 'MOBILE',    title: 'Apps móviles',                meta: 'iOS · Android · sync offline' },
      { code: '03', tag: 'BACKEND',   title: 'Backend e infraestructura',   meta: 'APIs · Postgres · Cloud · colas' },
      { code: '04', tag: 'AI',        title: 'Automatización con IA',       meta: 'Agentes · workflows · contexto' },
      { code: '05', tag: 'BI',        title: 'Dashboards y BI',             meta: 'KPIs en vivo · reportes · alertas' },
      { code: '06', tag: 'COMMERCE',  title: 'Ecommerce, POS e inventario', meta: 'Ventas · stock · proveedores' },
      { code: '07', tag: 'FINTECH',   title: 'Fintech y sistemas críticos', meta: 'Pagos · trazabilidad · auditoría' },
      { code: '08', tag: 'SECURITY',  title: 'Seguridad informática',       meta: 'Pentesting · hardening · auth' },
      { code: '09', tag: 'REALTIME',  title: 'Mensajería y tiempo real',    meta: 'Chats · push · eventos' },
      { code: '10', tag: 'LOGISTICS', title: 'Paquetería y rutas',          meta: 'Tracking · operadores · reportes' },
    ],
  },
  services: {
    eyebrow: 'Capacidades',
    title: 'Servicios principales',
    subtitle: 'Diez frentes, cinco etapas. Así se ensambla la maquinaria de tu operación.',
    assemblyLabel: 'rocket.assembly',
    pairs: [
      {
        code: 'I',
        title: 'La base',
        caption: 'Donde la idea deja de ser maqueta.',
        body: 'Antes de subir cualquier interfaz, el cohete necesita estructura: backend confiable y seguridad por diseño. Sin esto, todo lo de arriba se cae.',
        slugs: ['backend', 'security'],
        stage: 'BASE · ESTRUCTURA',
      },
      {
        code: 'II',
        title: 'Las interfaces',
        caption: 'La superficie por donde entra el negocio.',
        body: 'Web y móvil son los puntos de contacto. Ahí ocurre todo: clientes, equipos, operaciones diarias. Conectados al mismo núcleo, no como islas.',
        slugs: ['web-apps', 'mobile'],
        stage: 'INTERFACES · CONTACTO',
      },
      {
        code: 'III',
        title: 'La inteligencia',
        caption: 'Lo que decide y lo que mide.',
        body: 'IA con criterio para automatizar tareas concretas. Dashboards que sí dicen algo. Para que el negocio piense, no solo registre.',
        slugs: ['ai', 'dashboards'],
        stage: 'COGNICIÓN · DECISIÓN',
      },
      {
        code: 'IV',
        title: 'La operación',
        caption: 'Donde el negocio realmente se mueve.',
        body: 'Ventas, inventario, logística, rutas, entregas. La capa que toca el mundo físico. Conectada a la inteligencia que la coordina.',
        slugs: ['ecommerce', 'logistics'],
        stage: 'OPERACIÓN · CAMPO',
      },
      {
        code: 'V',
        title: 'El alcance',
        caption: 'Hacia el exterior, con responsabilidad.',
        body: 'Pagos seguros, mensajería en tiempo real. Las capas críticas que conectan tu sistema con el dinero, los clientes y el resto del mundo.',
        slugs: ['fintech', 'messaging'],
        stage: 'ALCANCE · CRÍTICO',
      },
    ],
    items: [
      {
        slug: 'web-apps',
        name: 'Aplicaciones web a la medida',
        tagline: 'Plataformas SaaS, CRMs, portales y herramientas internas.',
        description:
          'Plataformas web modernas para administrar ventas, clientes, inventario, reportes, operaciones internas y procesos críticos desde un solo lugar.',
        bullets: ['Portales administrativos', 'CRMs personalizados', 'Plataformas SaaS', 'Marketplaces'],
        size: 'lg',
      },
      {
        slug: 'ai',
        name: 'Automatización con IA',
        tagline: 'IA con contexto, reglas y supervisión. No magia, no humo.',
        description:
          'Asistentes, flujos automatizados y agentes conectados a tus procesos para responder más rápido, documentar mejor y dejar menos tareas mecánicas al equipo.',
        bullets: ['Agentes con memoria', 'Procesamiento de documentos', 'Clasificación y resumen', 'Workflows con humano en el loop'],
        size: 'lg',
      },
      {
        slug: 'mobile',
        name: 'Apps móviles iOS y Android',
        tagline: 'Para clientes, equipos y operaciones de campo.',
        description:
          'Aplicaciones móviles conectadas a tus procesos, tus usuarios y tus datos. Autenticación, pagos, notificaciones, biometría e integraciones.',
        bullets: ['iOS · Android', 'Sincronización offline', 'Notificaciones push', 'Biometría'],
        size: 'md',
      },
      {
        slug: 'backend',
        name: 'Backend e infraestructura',
        tagline: 'Donde la idea deja de ser maqueta y se vuelve producto.',
        description:
          'APIs, bases de datos, microservicios e infraestructura cloud para conectar usuarios, datos, permisos, integraciones, pagos, archivos y procesos.',
        bullets: ['REST · GraphQL', 'Postgres · Mongo · Redis', 'Cloud · Docker', 'Colas y eventos'],
        size: 'md',
      },
      {
        slug: 'dashboards',
        name: 'Dashboards y BI',
        tagline: 'Un negocio no puede mejorar lo que no mide.',
        description:
          'Paneles de control para visualizar ventas, costos, inventario, clientes, rendimiento operativo y métricas clave.',
        bullets: ['KPIs en tiempo real', 'Reportes exportables', 'Alertas automáticas'],
        size: 'md',
      },
      {
        slug: 'ecommerce',
        name: 'Ecommerce, POS e inventario',
        tagline: 'Vender, controlar, reportar. Conectado.',
        description:
          'Tiendas en línea, POS, catálogos, inventarios, reportes de ventas y sistemas para administrar negocios comerciales.',
        bullets: ['Carrito y pagos', 'Multi-sucursal', 'Inventario y proveedores', 'Reportes y márgenes'],
        size: 'md',
      },
      {
        slug: 'fintech',
        name: 'Fintech y sistemas críticos',
        tagline: 'Transferencias, tarjetas, back office, mensajería segura.',
        description:
          'Componentes para operaciones financieras y entornos críticos. Pensamos en seguridad, consistencia, auditoría y estabilidad desde el primer commit.',
        bullets: ['Auth y permisos', 'Trazabilidad', 'Logs y auditoría', 'Integraciones bancarias'],
        size: 'md',
      },
      {
        slug: 'security',
        name: 'Seguridad informática',
        tagline: 'No se agrega al final como estampita de buena suerte.',
        description:
          'Revisamos y fortalecemos aplicaciones, APIs, autenticación, permisos, exposición de datos y configuración técnica para reducir riesgos reales.',
        bullets: ['Pentesting de apps', 'Revisión de APIs', 'Hardening de auth', 'Auditoría de exposición'],
        size: 'md',
      },
      {
        slug: 'messaging',
        name: 'Mensajería y tiempo real',
        tagline: 'Chats, inbox, notificaciones, eventos.',
        description:
          'Sistemas de comunicación entre usuarios, clientes, administradores o equipos internos, conectados al flujo real del producto.',
        bullets: ['WebSockets', 'Push y email', 'Inbox unificado'],
        size: 'sm',
      },
      {
        slug: 'logistics',
        name: 'Paquetería y rutas',
        tagline: 'Operación de campo digitalizada.',
        description:
          'Plataformas para empresas que necesitan controlar paquetes, rutas, estados de entrega, repartidores, clientes y reportes desde un sistema centralizado.',
        bullets: ['Tracking en vivo', 'Rutas optimizadas', 'App para repartidores'],
        size: 'sm',
      },
    ],
  },
  systemMap: {
    eyebrow: 'Conexiones',
    titleA: 'Aislado, son tareas.',
    titleB: 'Conectado, es un sistema.',
    subtitle:
      'La diferencia entre un negocio que crece y uno que solo trabaja más está en si sus datos se mueven solos.',
    body:
      'Un cliente compra, y el inventario lo sabe. Un pago se procesa, y el reporte ya lo refleja. Un agente de IA toma una decisión, y queda registrada. Sin correos, sin Excel, sin recordatorios.',
    bodyClose:
      'Eso es lo que diseñamos cuando construimos un sistema: las vías por donde viajan los datos, el orden en que se ejecutan las cosas, y la trazabilidad de cada paso.',
    accent: 'Un dato. Un viaje. Un registro.',
    hudFlow: 'flow',
    hudDrag: 'drag · rotate',
    nodes: [
      { label: 'Clientes',    meta: 'Web · Móvil · Whatsapp' },
      { label: 'Aplicación',  meta: 'Web App · App Móvil' },
      { label: 'API Gateway', meta: 'REST · GraphQL · Auth' },
      { label: 'Database',    meta: 'Postgres · Mongo · Cache' },
      { label: 'AI Layer',    meta: 'Agentes · Workflows · LLMs' },
      { label: 'Dashboards',  meta: 'Métricas · Reportes' },
      { label: 'Automation',  meta: 'Eventos · Integraciones' },
    ],
  },
  ai: {
    eyebrow: 'Inteligencia con cara',
    titleA: 'Te ve.',
    titleB: 'Te entiende.',
    titleC: 'Te asiste.',
    subtitle:
      'Una IA con criterio no es un chatbot con nombre bonito. Es un sistema que observa el contexto, sigue reglas claras, y deja trazabilidad de cada decisión.',
    body:
      'Lo diseñamos para que ayude — no para que reemplace. El humano sigue siendo el que mira, decide, supervisa.',
    bodyClose:
      'Memoria del negocio, herramientas conectadas, criterio humano en los puntos críticos. Eso es lo que hace que una IA realmente sirva.',
    accent: 'No magia. No humo. Sistemas con criterio.',
    hudHead: 'humanoid',
    hudHeadMeta: 'eyes track · live',
    hudHover: 'hover · scatter',
    pillars: [
      { title: 'Mira',     body: 'Lee el contexto antes de actuar.' },
      { title: 'Recuerda', body: 'Memoria del negocio, no de una sesión.' },
      { title: 'Decide',   body: 'Reglas claras, trazabilidad de cada paso.' },
      { title: 'Reporta',  body: 'El humano supervisa lo crítico.' },
    ],
  },
  trust: {
    eyebrow: 'Por qué confiar',
    title: 'Construimos con mentalidad de producto, ingeniería y seguridad.',
    subtitle: 'Más banco moderno que hackathon con café frío.',
    items: [
      { title: 'Arquitectura escalable', body: 'Pensamos en cómo va a verse tu sistema en dos años, no solo el lunes.' },
      { title: 'Seguridad desde el diseño', body: 'Auth, permisos, exposición de datos y auditoría desde el primer commit.' },
      { title: 'Datos claros para decidir', body: 'Métricas que importan, no gráficas decorativas.' },
      { title: 'Automatización con control', body: 'IA que ayuda al equipo, no que se adueña de procesos.' },
      { title: 'Integraciones reales', body: 'Pagos, ERP, CRMs, mensajería, paquetería: lo que ya usas.' },
      { title: 'Sistemas críticos', body: 'Experiencia construyendo componentes para entornos donde fallar es caro.' },
    ],
  },
  useCases: {
    eyebrow: 'Casos de uso',
    title: '¿En qué momento estás?',
    subtitle: 'Algunos puntos de partida típicos cuando una empresa nos contacta.',
    items: [
      { title: 'Quiero vender en línea y controlar inventario', meta: 'Ecommerce · POS · Inventario' },
      { title: 'Quiero automatizar atención y reportes', meta: 'IA · Workflows · Dashboards' },
      { title: 'Quiero una app móvil para mis clientes', meta: 'iOS · Android · Backend' },
      { title: 'Quiero un dashboard financiero', meta: 'BI · KPIs · Reportes' },
      { title: 'Quiero revisar la seguridad de mi sistema', meta: 'Pentesting · Auditoría · Hardening' },
      { title: 'Quiero digitalizar rutas y entregas', meta: 'Tracking · Operadores · Reportes' },
    ],
  },
  finalCta: {
    eyebrow: 'Última parada',
    quote: 'Si todo depende de WhatsApp, Excel y memoria humana, no tienes operación: tienes fe.',
    body:
      'Podemos ayudarte a convertir procesos manuales, herramientas desconectadas y datos dispersos en una plataforma digital diseñada para operar mejor.',
    closing: 'Si tu negocio ya creció, tu tecnología también debería hacerlo.',
    cta: 'Agenda una consultoría',
    ctaSecondary: 'Escríbenos por correo',
  },
  brand: {
    quotes: [
      'Una página te presenta. Un sistema te permite operar.',
      'No hacemos tecnología para presumirla. La hacemos para que tu negocio funcione mejor.',
      'Digitalizar no es subir un PDF a internet. Es rediseñar cómo trabaja tu empresa.',
      'La IA no reemplaza tu negocio. Bien usada, le quita fricción.',
      'No todo necesita IA. Pero muchos procesos sí necesitan dejar de hacerse a mano.',
      'Tu empresa no necesita más herramientas. Necesita mejores sistemas.',
      'Construimos software para vender, medir, automatizar y escalar.',
    ],
  },
  servicesNav: {
    label: 'Servicios',
    description: 'Diez frentes que cubrimos para construir la infraestructura digital de tu empresa.',
    items: [
      { slug: 'fintech',    name: 'Fintech',                        meta: 'APIs · pagos · tarjetas · PCI' },
      { slug: 'web-apps',   name: 'Aplicaciones web',               meta: 'SaaS · CRMs · portales' },
      { slug: 'mobile',     name: 'Apps móviles',                   meta: 'iOS · Android · offline' },
      { slug: 'ai',         name: 'Automatización con IA',          meta: 'Agentes · workflows · contexto' },
      { slug: 'backend',    name: 'Backend e infraestructura',      meta: 'APIs · DBs · cloud' },
      { slug: 'dashboards', name: 'Dashboards y BI',                meta: 'KPIs en vivo · reportes' },
      { slug: 'ecommerce',  name: 'Ecommerce, POS e inventario',    meta: 'Ventas · stock · multi-sucursal' },
      { slug: 'security',   name: 'Seguridad informática',          meta: 'Pentesting · hardening · auth' },
      { slug: 'messaging',  name: 'Mensajería y tiempo real',       meta: 'Chats · push · eventos' },
      { slug: 'logistics',  name: 'Paquetería y rutas',             meta: 'Tracking · operadores · reportes' },
    ],
  },
  fintech: {
    meta: {
      title: 'Soluciones fintech e infraestructura bancaria',
      description: 'Construimos la infraestructura que conecta bancos, procesadores de pago, i2c, Salesforce y dashboards financieros. APIs seguras, back office, integraciones y arquitectura orientada a PCI compliance.',
    },
    breadcrumb: { services: 'Servicios', current: 'Fintech' },

    hero: {
      eyebrow: '// FINTECH · 01 · connect()',
      titleA: 'Bancos. Procesadores.',
      titleB: 'Tarjetas. Datos.',
      titleC: 'Una sola infraestructura.',
      titleAccent: 'Conectada, segura, auditable.',
      subtitle:
        'Construimos la capa técnica que une core bancario, procesadores de pago, proveedores como i2c y Salesforce, dashboards financieros y back office en un solo ecosistema operativo.',
      hudLive: 'live · 24/7',
      hudPCI: 'PCI · aware',
      hudLatency: 'latency',
      hudVolume: 'volume',
      ctaPrimary: 'Hablemos de tu infraestructura',
      ctaSecondary: 'Ver capacidades',
    },

    problem: {
      eyebrow: '// 02 · diagnose()',
      title: 'El sistema financiero moderno no se cae por falta de herramientas.',
      titleAccent: 'Se cae porque las piezas no se hablan.',
      body:
        'Una operación financiera vive entre core bancario, procesadores, CRMs, dashboards, apps móviles, sistemas de cumplimiento, transferencias, mensajería segura y datos sensibles cruzando capas. Cuando esas capas no están bien conectadas, el costo no es técnico — es operativo.',
      symptoms: [
        { tag: 'OPS',    text: 'Procesos manuales' },
        { tag: 'DATA',   text: 'Información duplicada' },
        { tag: 'TIME',   text: 'Reportes lentos' },
        { tag: 'AUDIT',  text: 'Flujos imposibles de auditar' },
        { tag: 'RISK',   text: 'Dependencia ciega de proveedores' },
        { tag: 'BLIND',  text: 'Equipos operando sin visibilidad' },
      ],
      closing:
        'No construimos pantallas para bancos. Construimos infraestructura para que las piezas críticas puedan hablarse, validarse y evolucionar sin riesgo.',
    },

    capabilities: {
      eyebrow: '// 03 · build()',
      title: 'Conectamos el ecosistema financiero',
      titleAccent: 'para que sea claro, seguro y medible.',
      items: [
        { code: '01', tag: 'API',         title: 'APIs financieras',          meta: 'REST · GraphQL · auth' },
        { code: '02', tag: 'BI',          title: 'Dashboards en tiempo real', meta: 'KPIs · alertas · drill-down' },
        { code: '03', tag: 'BACKOFFICE',  title: 'Back office bancario',      meta: 'Roles · auditoría · soporte' },
        { code: '04', tag: 'PAYMENTS',    title: 'Procesadores de pago',      meta: 'Internacional · estados · fees' },
        { code: '05', tag: 'i2c',         title: 'Integración i2c',           meta: 'Tarjetas · activación · sync' },
        { code: '06', tag: 'SALESFORCE',  title: 'Integración Salesforce',    meta: 'CRM · operación · flujos' },
        { code: '07', tag: 'MESSAGING',   title: 'Mensajería segura',         meta: 'Trace · cifrado · inbox' },
        { code: '08', tag: 'KEYS',        title: 'Encriptación · TPK · ZPK',  meta: 'Llaves · hash · in-transit' },
        { code: '09', tag: 'PCI',         title: 'PCI compliance',            meta: 'Diseño · segmentación · logs' },
      ],
    },

    integration: {
      eyebrow: '// 04 · bridge()',
      title: 'Integramos bancos, proveedores y sistemas externos',
      titleAccent: 'sin convertir tu operación en un rompecabezas eterno.',
      body:
        'Las instituciones financieras hablan con muchos sistemas a la vez. Diseñamos la capa de integración para que esa conversación sea mantenible y segura.',
      nodes: [
        { id: 'client',    label: 'Cliente',         meta: 'Web · Móvil' },
        { id: 'app',       label: 'Aplicación',      meta: 'iOS · Android · Web' },
        { id: 'gateway',   label: 'API Gateway',     meta: 'Auth · routing · rate limit' },
        { id: 'core',      label: 'Core bancario',   meta: 'Cuentas · saldos' },
        { id: 'processor', label: 'Procesador',      meta: 'Pagos internacionales' },
        { id: 'i2c',       label: 'i2c',             meta: 'Tarjetas · activación' },
        { id: 'salesforce',label: 'Salesforce',      meta: 'CRM · casos' },
        { id: 'audit',     label: 'Audit trail',     meta: 'Logs · trazabilidad' },
      ],
      witty:
        'Porque sí, en pleno 2026 todavía hay empresas conciliando cosas críticas en Excel. La civilización aguanta mucho.',
    },

    payments: {
      eyebrow: '// 05 · process()',
      title: 'Pagos, transferencias y operaciones internacionales',
      titleAccent: 'con trazabilidad completa.',
      body:
        'No basta con mandar una transacción. Hay que saber qué pasó, cuándo, quién la ejecutó, qué proveedor respondió, qué error ocurrió y cómo auditarla después.',
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
        'Integración con procesadores de pago',
        'Flujos de transferencias internacionales',
        'Validación y normalización de datos',
        'Manejo de estados transaccionales',
        'Conciliación operativa',
        'Manejo de errores y reintentos',
        'APIs de consulta',
        'Dashboards de monitoreo',
      ],
      closing:
        'En sistemas financieros, lo que no se puede rastrear se vuelve un problema. Y los problemas tienen pésimo sentido del timing.',
    },

    i2c: {
      eyebrow: '// 06 · cards()',
      title: 'Tarjetas que conviven con tus productos digitales,',
      titleAccent: 'no que te obligan a cirugía mayor cada cambio.',
      body:
        'Capas de integración para que i2c funcione como parte de tu operación: usuarios, cuentas, activación, renovación, sincronización, back office, app móvil.',
      cardStates: ['ACTIVE', 'PENDING', 'RENEWED', 'BLOCKED'],
      flows: [
        'Consulta de tarjetas',
        'Activación de tarjetas',
        'Renovación de tarjetas',
        'Sincronización de información',
        'Tarjetas principales y suplementarias',
        'Estados y consultas',
        'Integración con apps móviles',
        'Back office para operaciones',
        'APIs intermedias',
        'Manejo seguro de datos sensibles',
      ],
    },

    bpc: {
      eyebrow: '// 07 · switch()',
      title: 'Conectamos plataformas de procesamiento',
      titleAccent: 'como BPC SmartVista al resto de tu operación.',
      body:
        'BPC SmartVista vive en el centro de operaciones financieras críticas: pagos, tarjetas, switching, adquirencia, canales digitales y fraud management. Diseñamos la capa que conecta esa infraestructura con apps móviles, back office, dashboards y APIs internas.',
      bodyClose:
        'No se trata de "conectarse al proveedor". Se trata de construir una arquitectura clara alrededor de esa conexión: validaciones, seguridad, monitoreo, trazabilidad, manejo de errores y visibilidad operativa.',
      modules: [
        { code: '01', title: 'Card issuing',           meta: 'Debit · credit · prepaid · virtual' },
        { code: '02', title: 'Card management',         meta: 'Estados · ciclos · sincronización' },
        { code: '03', title: 'Transaction processing',  meta: 'Autorización · captura · clearing' },
        { code: '04', title: 'Switching',                meta: 'ATM · POS · routing inteligente' },
        { code: '05', title: 'Merchant acquiring',      meta: 'POS · e-commerce · SoftPOS' },
        { code: '06', title: 'Digital banking',         meta: 'Canales · wallets · self-service' },
        { code: '07', title: 'Fraud management',        meta: 'Reglas · scoring · alertas' },
        { code: '08', title: 'Reporting operativo',     meta: 'Métricas · auditoría · dashboards' },
      ],
      flowTitle: 'Capa de integración',
      flowSteps: [
        { label: 'App móvil · Web banking',         meta: 'Frontend' },
        { label: 'API Gateway · Backend financiero',meta: 'Auth · routing' },
        { label: 'Reglas de negocio',                meta: 'Validación · estados' },
        { label: 'BPC · SmartVista',                  meta: 'Procesamiento · tarjetas · switching' },
        { label: 'Back office · dashboards · audit', meta: 'Visibilidad operativa' },
      ],
      witty:
        'Conectar sistemas financieros no debería sentirse como armar un mueble sueco sin instrucciones. Pero con dinero real de por medio. Y sin embargo, aquí estamos.',
    },

    salesforce: {
      eyebrow: '// 08 · sync()',
      title: 'Salesforce conectado a tu operación financiera,',
      titleAccent: 'no solo a tu equipo comercial.',
      body:
        'Bien conectado, Salesforce deja de ser una base de datos cara con botones bonitos y se vuelve pieza operativa real.',
      cases: [
        { title: 'Sincronización de clientes',     meta: 'CRM ↔ core bancario' },
        { title: 'Estados operativos',              meta: 'Updates en tiempo real' },
        { title: 'Registro de solicitudes',         meta: 'Trazabilidad end-to-end' },
        { title: 'Integración con back office',     meta: 'Acciones bidireccionales' },
        { title: 'Conexión con dashboards',         meta: 'Métricas comerciales + ops' },
        { title: 'Automatización de tareas',        meta: 'Workflows · triggers' },
      ],
    },

    dashboards: {
      eyebrow: '// 09 · observe()',
      title: 'Datos financieros dispersos',
      titleAccent: 'en paneles claros para decidir.',
      body:
        'Una operación financiera necesita visibilidad. No basta con que los procesos corran; los equipos necesitan entender qué está pasando.',
      tickers: [
        { label: 'Volumen 24h',     value: '$4.82M', delta: '+2.4%', up: true },
        { label: 'TXN exitosas',    value: '12,481', delta: '+1.8%', up: true },
        { label: 'TXN fallidas',    value: '184',    delta: '-12%',  up: false },
        { label: 'Latencia P95',    value: '142ms',  delta: '-8ms',  up: false },
        { label: 'Tarjetas activas',value: '38,204', delta: '+126',  up: true },
        { label: 'Errores/min',     value: '0.7',    delta: '-0.2',  up: false },
      ],
      closing:
        'Convertimos datos financieros dispersos en paneles claros para tomar decisiones, detectar problemas y operar con más control.',
    },

    backoffice: {
      eyebrow: '// 10 · operate()',
      title: 'Back office para que los equipos internos',
      titleAccent: 'no dependan de procesos manuales.',
      body:
        'Muchas operaciones no fallan en el frontend. Fallan detrás: aprobaciones, cambios de estado, reportes, auditoría.',
      tabs: [
        {
          id: 'users', label: 'Users', count: '12,481',
          rows: [
            { col1: 'María L.',   col2: 'maria@empresa.mx', col3: 'ACTIVE',  col4: '2026-05-12' },
            { col1: 'Juan P.',    col2: 'juan@empresa.mx',  col3: 'ACTIVE',  col4: '2026-05-11' },
            { col1: 'Ana G.',     col2: 'ana@empresa.mx',   col3: 'PENDING', col4: '2026-05-10' },
            { col1: 'Diego R.',   col2: 'diego@empresa.mx', col3: 'BLOCKED', col4: '2026-05-08' },
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
        'Un buen back office no solo muestra datos. Reduce fricción operativa, evita errores humanos y deja evidencia de lo que ocurre.',
    },

    security: {
      eyebrow: '// 11 · secure()',
      title: 'Seguridad desde la arquitectura,',
      titleAccent: 'no como parche al final.',
      body:
        'En fintech, la seguridad no puede ser un parche al final del proyecto. Debe estar presente desde el diseño de datos, permisos, APIs, comunicación entre servicios, manejo de llaves, logs y exposición de información.',
      tpkTitle: 'Manejo de llaves · TPK · ZPK',
      tpkBody:
        'Tenemos experiencia con flujos donde el manejo seguro de llaves de cifrado forma parte de la arquitectura: TPK (Terminal Pin Key) para proteger PINs en terminales, ZPK (Zone Pin Key) para envolver llaves entre zonas seguras, y el resto de la jerarquía de claves que sostiene una operación bancaria seria.',
      pillars: [
        { title: 'Manejo de datos sensibles',  meta: 'Cifrado · acceso · exposición mínima' },
        { title: 'Auth · permisos',            meta: 'OAuth2 · RBAC · MFA' },
        { title: 'Encriptación',                meta: 'In-transit · at-rest · key rotation' },
        { title: 'Auditoría · logs',           meta: 'Cada acción · cada cambio' },
        { title: 'Validación de entradas',     meta: 'Schemas · sanitización' },
        { title: 'Hardening',                  meta: 'Servicios · ambientes · CI/CD' },
      ],
      closing:
        'No tratamos la seguridad como decoración técnica. La usamos para definir cómo se mueve la información, quién puede verla y cómo se registra cada operación.',
    },

    pci: {
      eyebrow: '// 12 · comply()',
      title: 'Diseñamos infraestructura',
      titleAccent: 'orientada a PCI compliance.',
      body:
        'Cuando un sistema toca pagos, tarjetas o datos sensibles, la arquitectura se construye con otra mentalidad: segmentación, control de accesos, exposición mínima, trazabilidad.',
      capabilities: [
        'Diseño de arquitectura segura',
        'Segmentación de servicios',
        'Reducción de exposición de datos sensibles',
        'Flujos de autenticación robustos',
        'Control de accesos',
        'Logs y auditoría',
        'Encriptación aplicada',
        'Separación de ambientes',
        'Documentación técnica',
        'Preparación técnica para auditorías',
      ],
      explainerTitle: 'Qué es PCI compliance',
      explainerLead:
        'PCI DSS (Payment Card Industry Data Security Standard) es el estándar global de seguridad para cualquier sistema que procesa, transmite o almacena datos de tarjetas de pago.',
      explainerBody:
        'Lo definen las redes de tarjetas (Visa, Mastercard, American Express, Discover y JCB) a través del PCI Security Standards Council. Aplica a bancos, fintechs, ecommerce, procesadores y cualquier empresa que toque datos de tarjeta — sin importar el volumen.',
      explainerPillars: [
        { code: '01', title: 'Red segura',          meta: 'Firewalls, segmentación, configuración hardenizada' },
        { code: '02', title: 'Datos protegidos',    meta: 'Encriptación en tránsito y en reposo, no almacenar PAN sin cifrar' },
        { code: '03', title: 'Vulnerabilidades',     meta: 'Antivirus, parches, desarrollo seguro' },
        { code: '04', title: 'Control de acceso',   meta: 'Permisos por rol, autenticación fuerte, acceso físico restringido' },
        { code: '05', title: 'Monitoreo',            meta: 'Logs, trazabilidad, pruebas regulares de seguridad' },
        { code: '06', title: 'Política',             meta: 'Documentación, procesos, cultura de seguridad' },
      ],
      explainerCloser:
        'Diseñamos infraestructura que respeta estos principios desde el primer commit: segmentación de red, encriptación aplicada, control de accesos, trazabilidad y manejo cuidadoso de datos sensibles. La certificación formal la otorga un QSA (Qualified Security Assessor) tras una auditoría — nosotros construimos para que esa auditoría sea posible.',
    },

    architecture: {
      eyebrow: '// 13 · architect()',
      title: 'La capa que conecta producto, operación',
      titleAccent: 'y proveedores financieros.',
      body:
        'Una solución fintech bien diseñada necesita más que frontend. Necesita una arquitectura que pueda sostener reglas de negocio, proveedores externos, usuarios, permisos, reportes, seguridad y crecimiento.',
      layers: [
        { code: 'L1', name: 'Mobile · Web App',     meta: 'Frontend · UX' },
        { code: 'L2', name: 'API Gateway',           meta: 'Auth · routing · rate-limit' },
        { code: 'L3', name: 'Business Logic',        meta: 'Microservicios · reglas' },
        { code: 'L4', name: 'Banking Integrations',  meta: 'i2c · Salesforce · processors' },
        { code: 'L5', name: 'Data · Audit Trail',    meta: 'DB · logs · trazabilidad' },
        { code: 'L6', name: 'Dashboards · Back Office', meta: 'BI · operaciones internas' },
      ],
    },

    useCases: {
      eyebrow: '// 14 · cases()',
      title: 'Lo que podemos construir',
      items: [
        { num: '01', title: 'Plataforma de transferencias',     meta: 'Crear · validar · monitorear · auditar' },
        { num: '02', title: 'Procesador de pagos internacionales', meta: 'Multi-proveedor · estados · trazabilidad' },
        { num: '03', title: 'Dashboard financiero ejecutivo',   meta: 'Volumen · costos · errores · tendencias' },
        { num: '04', title: 'Back office bancario',             meta: 'Usuarios · cuentas · tarjetas · soporte' },
        { num: '05', title: 'Integración con i2c',              meta: 'Tarjetas · activación · renovación' },
        { num: '06', title: 'Integración con Salesforce',       meta: 'CRM · casos · sincronización' },
        { num: '07', title: 'Centro de mensajes seguro',        meta: 'Comunicación · trazabilidad' },
        { num: '08', title: 'Infraestructura para tarjetas',    meta: 'Activación · estados · administración' },
        { num: '09', title: 'Auditoría y logs',                  meta: 'Eventos · cambios · acciones' },
        { num: '10', title: 'APIs financieras',                  meta: 'Producto ↔ proveedores ↔ internos' },
      ],
    },

    differentiators: {
      eyebrow: '// 15 · why()',
      title: 'Por qué con Era Digital Solutions',
      items: [
        { title: 'Entendemos sistemas críticos',  body: 'Reglas, estados, seguridad, proveedores, auditoría — y muchas formas creativas de que algo se rompa si se diseña mal.' },
        { title: 'Construimos de punta a punta',  body: 'Desde la app móvil hasta el backend, las APIs, las integraciones, dashboards y back office.' },
        { title: 'Seguridad desde el inicio',     body: 'Permisos, datos sensibles, trazabilidad, encriptación, exposición y cumplimiento técnico.' },
        { title: 'Integramos proveedores reales', body: 'i2c, Salesforce, procesadores de pago, servicios financieros externos.' },
        { title: 'Operación en datos',             body: 'No solo procesamos eventos. Los volvemos visibles en dashboards, reportes y métricas.' },
        { title: 'Diseñamos para evolución',       body: 'La infraestructura debe crecer, cambiar proveedores y adaptarse sin rehacer todo.' },
      ],
    },

    process: {
      eyebrow: '// 16 · build()',
      title: 'Cómo construimos infraestructura fintech',
      steps: [
        { num: '01', title: 'Diagnóstico',     body: 'Flujo financiero, sistemas, proveedores, reglas, riesgos y puntos de fricción.' },
        { num: '02', title: 'Arquitectura',    body: 'Servicios, APIs, integraciones, permisos, seguridad, trazabilidad y dashboards.' },
        { num: '03', title: 'Integraciones',   body: 'i2c, Salesforce, procesadores, sistemas internos o entidades bancarias.' },
        { num: '04', title: 'Desarrollo',      body: 'Lógica, APIs, paneles, dashboards, back office, mensajería y experiencia.' },
        { num: '05', title: 'Seguridad',       body: 'Permisos, exposición, manejo sensible, logs, encriptación y flujos críticos.' },
        { num: '06', title: 'Lanzamiento',     body: 'Despliegue, monitoreo, documentación y base para crecer con nuevos módulos.' },
      ],
    },

    midCta: {
      title: '¿Tu operación financiera depende de demasiados sistemas desconectados?',
      body: 'Podemos ayudarte a diseñar la capa que los conecte: APIs, dashboards, back office, proveedores, seguridad y automatización.',
      cta: 'Diseñemos tu infraestructura fintech',
    },

    faq: {
      eyebrow: '// 17 · faq()',
      title: 'Preguntas frecuentes',
      items: [
        {
          q: '¿Era Digital Solutions desarrolla software para bancos y fintechs?',
          a: 'Sí. Creamos soluciones digitales para operaciones financieras, incluyendo APIs, back office, dashboards, integraciones, flujos de tarjetas, pagos, mensajería segura y sistemas internos.',
        },
        {
          q: '¿Pueden integrarse con proveedores como i2c?',
          a: 'Sí. Desarrollamos capas de integración para conectar proveedores de tarjetas como i2c con apps móviles, back office, APIs internas y flujos operativos.',
        },
        {
          q: '¿Pueden integrarse con BPC / SmartVista?',
          a: 'Sí. Diseñamos capas de integración para conectar sistemas internos, apps móviles, back office, dashboards y APIs con ecosistemas basados en BPC / SmartVista, especialmente en flujos de pagos, tarjetas, switching, adquirencia, procesamiento y operación financiera.',
        },
        {
          q: '¿BPC reemplaza al core bancario?',
          a: 'No necesariamente. BPC puede formar parte del ecosistema de pagos, tarjetas, canales o procesamiento, dependiendo de la arquitectura de cada institución. Nuestro trabajo es entender el rol que cumple dentro del flujo y construir la capa de conexión correcta.',
        },
        {
          q: '¿Pueden conectarse con Salesforce?',
          a: 'Sí. Integramos Salesforce con sistemas financieros, back office, dashboards y flujos operativos para sincronizar clientes, solicitudes, estados y datos relevantes.',
        },
        {
          q: '¿Hacen dashboards financieros?',
          a: 'Sí. Creamos dashboards para visualizar transacciones, pagos, tarjetas, usuarios, errores, conciliaciones, rendimiento operativo y métricas ejecutivas.',
        },
        {
          q: '¿Pueden construir procesadores de pago internacionales?',
          a: 'Podemos desarrollar infraestructura e integraciones para flujos de pago internacionales, incluyendo validaciones, estados, proveedores externos, trazabilidad, manejo de errores y dashboards de monitoreo.',
        },
        {
          q: '¿Trabajan con PCI compliance?',
          a: 'Diseñamos infraestructura orientada a PCI compliance y buenas prácticas de seguridad financiera. La certificación formal depende del alcance, auditoría y procesos internos correspondientes.',
        },
        {
          q: '¿Manejan encriptación TPK y ZPK?',
          a: 'Sí. Tenemos experiencia con flujos financieros donde el manejo seguro de llaves de cifrado es parte de la arquitectura: TPK (Terminal Pin Key) para PINs en terminales, ZPK (Zone Pin Key) para envolver llaves entre zonas seguras, y la jerarquía de claves asociada a operaciones de pagos, switching y procesamiento.',
        },
        {
          q: '¿Pueden construir un back office bancario?',
          a: 'Sí. Construimos back offices para consultar usuarios, cuentas, tarjetas, transacciones, solicitudes, estados, mensajes, reportes y acciones operativas con roles y permisos.',
        },
      ],
    },

    finalCta: {
      eyebrow: '// 18 · ship()',
      title: 'Construyamos la infraestructura financiera',
      titleAccent: 'que tu operación necesita para crecer.',
      body:
        'Si tu empresa necesita conectar bancos, proveedores, pagos, tarjetas, Salesforce, i2c, dashboards, back office y seguridad en un ecosistema claro, podemos ayudarte a diseñarlo y construirlo.',
      cta: 'Agenda una consultoría fintech',
      ctaSecondary: 'Volver al inicio',
    },
  },

  mobile: {
    meta: {
      title: 'Desarrollo de apps móviles iOS y Android',
      description:
        'Desarrollamos aplicaciones móviles iOS y Android conectadas a backend, dashboards, APIs, pagos, notificaciones, biometría, ecommerce, fintech, logística y operaciones internas.',
    },
    breadcrumb: { services: 'Servicios', current: 'Apps móviles' },

    hero: {
      eyebrow: '// MOBILE · 01 · ship()',
      titleA: 'Apps móviles',
      titleB: 'donde tu cliente',
      titleC: 'ya está viviendo.',
      titleAccent: 'En el celular.',
      subtitle:
        'Construimos apps iOS y Android conectadas a backend, dashboards, pagos, notificaciones y los flujos reales de tu negocio. No hacemos demos bonitas que nadie usa después.',
      hudPlatform: 'iOS · Android',
      hudInteract: 'hover · scatter',
      ctaPrimary: 'Hablemos de tu app',
      ctaSecondary: 'Ver capacidades',
    },

    problem: {
      eyebrow: '// 02 · diagnose()',
      title: 'Tener una app no sirve de nada',
      titleAccent: 'si no resuelve un proceso real.',
      body:
        'Muchas empresas quieren una app porque "hay que tener una app". Eso no es estrategia. Es ansiedad digital con presupuesto.',
      reasons: [
        { tag: 'CLIENT',  text: 'Acercarte a tus clientes' },
        { tag: 'FRICT',   text: 'Reducir fricción en un proceso' },
        { tag: 'SALES',   text: 'Aumentar ventas' },
        { tag: 'OPS',     text: 'Mejorar la operación interna' },
        { tag: 'DATA',    text: 'Capturar datos importantes' },
        { tag: 'AUTO',    text: 'Automatizar tareas repetitivas' },
        { tag: 'LIVE',    text: 'Seguimiento en tiempo real' },
        { tag: 'CONNECT', text: 'Conectar usuarios con servicios' },
      ],
      closing:
        'En Era Digital Solutions diseñamos apps desde el problema, no desde la pantalla. Primero entendemos qué debe lograr la aplicación. Después construimos la experiencia, el backend y el sistema completo que la sostiene.',
    },

    value: {
      eyebrow: '// 03 · build()',
      title: 'Una app no es solo una interfaz en un teléfono.',
      titleAccent: 'Es la puerta de entrada a tu ecosistema digital.',
      body:
        'Por eso desarrollamos aplicaciones móviles que se conectan con backend, APIs, dashboards, sistemas de pago, ecommerce, inventario, CRMs, mensajería, analítica y automatizaciones con IA.',
      closing:
        'El objetivo no es publicar una app. Es construir una herramienta que tu cliente, equipo o comunidad realmente quiera usar porque le hace la vida más fácil.',
      capabilities: [
        { code: '01', tag: 'AUTH',     title: 'Autenticación · biometría',    meta: 'Tokens · sesiones · roles' },
        { code: '02', tag: 'PUSH',     title: 'Notificaciones push',           meta: 'Alertas · recordatorios · eventos' },
        { code: '03', tag: 'PAYMENTS', title: 'Pagos integrados',              meta: 'Flujos · estados · proveedores' },
        { code: '04', tag: 'API',      title: 'Backend conectado',             meta: 'REST · GraphQL · cloud' },
        { code: '05', tag: 'UX',       title: 'Experiencia mobile-first',     meta: 'Flujos · estados · accesibilidad' },
        { code: '06', tag: 'SEC',      title: 'Seguridad por diseño',          meta: 'OWASP Mobile · cifrado · permisos' },
        { code: '07', tag: 'BI',       title: 'Analítica y eventos',           meta: 'Uso · retención · conversión' },
        { code: '08', tag: 'AI',       title: 'IA contextual',                  meta: 'Asistentes · resúmenes · clasificación' },
      ],
    },

    types: {
      eyebrow: '// 04 · types()',
      title: 'Apps que sí se usan,',
      titleAccent: 'no apps que solo se descargan.',
      body:
        'Diseñamos apps móviles para distintos públicos y operaciones. Cinco categorías que cubren la mayoría de los casos que llegan a nuestra puerta.',
      categories: [
        {
          code: '01',
          title: 'Apps para clientes',
          tagline: 'Compras, reservas, consultas, fidelización.',
          examples: ['Ecommerce', 'Reservas', 'Membresías', 'Servicios', 'Comunidad', 'Educación'],
        },
        {
          code: '02',
          title: 'Apps internas',
          tagline: 'Para equipos, vendedores, operadores y campo.',
          examples: ['Ventas', 'Inventario', 'Reportes', 'Aprobaciones', 'Tareas', 'Comunicación'],
        },
        {
          code: '03',
          title: 'Apps fintech',
          tagline: 'Cuentas, tarjetas, transferencias, mensajería segura.',
          examples: ['Login biométrico', 'Estados de cuenta', 'Historial', 'Activación de tarjetas', 'Transferencias', 'Notificaciones'],
        },
        {
          code: '04',
          title: 'Apps de logística',
          tagline: 'Repartidores, rutas, paquetes, evidencia.',
          examples: ['Asignación de rutas', 'Estados de entrega', 'Escaneo', 'Geolocalización', 'Reportes', 'Comunicación'],
        },
        {
          code: '05',
          title: 'Apps con dashboard + IA',
          tagline: 'Frontend móvil + centro de control + asistencia inteligente.',
          examples: ['App + back office', 'Recomendaciones', 'Resúmenes', 'Clasificación', 'Asistentes', 'Reportes en vivo'],
        },
      ],
    },

    fintechCallout: {
      eyebrow: '// 05 · trust()',
      title: 'En fintech, una pantalla bonita sin seguridad',
      titleAccent: 'es básicamente una piñata llena de problemas.',
      body:
        'Por eso construimos apps móviles para flujos financieros con autenticación biométrica, manejo seguro de tokens, validación de permisos, comunicación cifrada con APIs, separación de ambientes y buenas prácticas OWASP Mobile desde el primer commit.',
      pillars: [
        { title: 'Login seguro · biometría',     meta: 'Face ID · Touch ID · MFA' },
        { title: 'Tokens · sesiones',             meta: 'SecureStore · refresh · expiración' },
        { title: 'Cifrado · datos sensibles',     meta: 'In-transit · at-rest · zero-knowledge' },
        { title: 'OWASP Mobile · hardening',      meta: 'API · permisos · jailbreak detection' },
      ],
    },

    approach: {
      eyebrow: '// 06 · think()',
      title: 'Una buena app no empieza en el código.',
      titleAccent: 'Empieza en entender el hábito del usuario.',
      body:
        'El celular es un espacio personal. Una app compite contra mensajes, redes, bancos, mapas y la ansiedad existencial promedio de revisar notificaciones cada tres minutos. Por eso diseñamos pensando en tres preguntas:',
      questions: [
        {
          n: '01',
          q: '¿Por qué alguien abriría esta app?',
          a: 'Si no hay una razón clara, la app nace muerta. Bonita, probablemente. Pero muerta.',
        },
        {
          n: '02',
          q: '¿Qué resuelve más rápido que cualquier otro canal?',
          a: 'Comprar, consultar, registrar, pagar, reservar, comunicarse — pero más rápido que web o teléfono.',
        },
        {
          n: '03',
          q: '¿Qué necesita ver la empresa detrás?',
          a: 'Usuarios, ventas, entregas, pagos, errores, progreso. La app sin dashboard es manejar de noche con los faros apagados.',
        },
      ],
    },

    architecture: {
      eyebrow: '// 07 · architect()',
      title: 'No construimos solo la app.',
      titleAccent: 'Construimos el ecosistema que la hace funcionar.',
      body:
        'Una app móvil seria casi nunca vive sola. Necesita backend, datos, autenticación, integraciones, dashboards y monitoreo. Esta es la arquitectura típica.',
      layers: [
        { code: 'L1', name: 'App iOS · Android',          meta: 'React Native · Expo · TypeScript' },
        { code: 'L2', name: 'Auth · sesiones',             meta: 'Biometría · tokens · roles' },
        { code: 'L3', name: 'API · Backend',                meta: 'Node.js · NestJS · LoopBack' },
        { code: 'L4', name: 'Database · storage',           meta: 'Postgres · MySQL · Mongo · S3' },
        { code: 'L5', name: 'Integraciones externas',       meta: 'Pagos · CRMs · proveedores' },
        { code: 'L6', name: 'Dashboard · reportes · IA',    meta: 'Back office · analítica · automatización' },
      ],
    },

    stack: {
      eyebrow: '// 08 · stack()',
      title: 'Stack moderno.',
      titleAccent: 'Sin elegir tecnología para presumir.',
      body:
        'Elegimos el stack para que el producto pueda mantenerse, crecer y adaptarse sin convertirse en una criatura mitológica que nadie quiere tocar seis meses después.',
      groups: [
        {
          label: 'Mobile',
          items: ['React Native', 'Expo', 'TypeScript', 'SecureStore', 'Push notifications', 'Deep linking', 'Biometría'],
        },
        {
          label: 'Backend',
          items: ['Node.js', 'NestJS', 'LoopBack', 'REST · GraphQL', 'API Gateway', 'Microservicios'],
        },
        {
          label: 'Data · Cloud',
          items: ['PostgreSQL', 'MySQL', 'MongoDB', 'AWS', 'Docker', 'Serverless', 'S3'],
        },
      ],
    },

    useCases: {
      eyebrow: '// 09 · cases()',
      title: 'Lo que podemos construir contigo',
      items: [
        { num: '01', title: 'App para clientes',         meta: 'Compras · reservas · pagos · cuenta' },
        { num: '02', title: 'App para vendedores',        meta: 'Ventas · clientes · inventario · reportes' },
        { num: '03', title: 'App para repartidores',      meta: 'Rutas · entregas · escaneo · evidencia' },
        { num: '04', title: 'App fintech',                 meta: 'Cuentas · tarjetas · transferencias · seguro' },
        { num: '05', title: 'App educativa',               meta: 'Cursos · progreso · contenido · comunidad' },
        { num: '06', title: 'App para comunidades',        meta: 'Miembros · eventos · reservas · publicaciones' },
        { num: '07', title: 'App de ecommerce',             meta: 'Catálogo · carrito · pagos · pedidos' },
        { num: '08', title: 'App de inventario',            meta: 'Escaneo · stock · movimientos · dashboards' },
        { num: '09', title: 'App de hábitos',               meta: 'Registro · progreso · reportes · análisis' },
        { num: '10', title: 'App empresarial interna',      meta: 'Aprobaciones · solicitudes · tareas' },
      ],
    },

    differentiators: {
      eyebrow: '// 10 · why()',
      title: 'Por qué construir tu app con Era Digital Solutions',
      items: [
        { title: 'Pensamos en producto',          body: 'Antes de la pantalla, entendemos el problema, el usuario, el flujo y el objetivo de negocio.' },
        { title: 'Frontend + backend',            body: 'Desarrollamos app, API, base de datos, dashboard, integraciones e infraestructura.' },
        { title: 'Flujos sensibles',              body: 'Experiencia con pagos, autenticación, datos personales, tarjetas y operaciones críticas.' },
        { title: 'Integramos lo que ya tienes',   body: 'CRMs, ERPs, pagos, sistemas internos, dashboards y plataformas externas.' },
        { title: 'Diseñamos para crecer',         body: 'Arquitectura que evoluciona: más usuarios, más módulos, más datos sin reescribir.' },
        { title: 'Cuidamos la experiencia',       body: 'Una app lenta, confusa o con pasos innecesarios se desinstala sin ceremonia.' },
      ],
    },

    process: {
      eyebrow: '// 11 · build()',
      title: 'Cómo construimos una app móvil',
      steps: [
        { num: '01', title: 'Diagnóstico',     body: 'Negocio, usuarios, objetivo, procesos actuales y sistemas a conectar.' },
        { num: '02', title: 'Alcance · MVP',   body: 'Funcionalidades clave, flujos, roles, integraciones y versión inicial.' },
        { num: '03', title: 'UX · UI',          body: 'Navegación, pantallas, estados, formularios, errores y acciones.' },
        { num: '04', title: 'Arquitectura',    body: 'Backend, APIs, DB, auth, seguridad, notificaciones, dashboards.' },
        { num: '05', title: 'Desarrollo',       body: 'iOS · Android + backend + integraciones, base mantenible.' },
        { num: '06', title: 'Pruebas',          body: 'Flujos críticos, errores, sesiones, permisos, dispositivos.' },
        { num: '07', title: 'Lanzamiento',     body: 'Publicación, configuración, despliegue, documentación.' },
        { num: '08', title: 'Evolución',        body: 'Métricas, feedback, mejoras, nuevas capacidades.' },
      ],
    },

    midCta: {
      title: '¿Tienes una idea de app o una operación que debería vivir en el celular?',
      body: 'Podemos ayudarte a convertirla en una aplicación móvil clara, útil y conectada a tu negocio.',
      cta: 'Diseñemos tu app móvil',
    },

    aiCallout: {
      eyebrow: '// 12 · intelligence()',
      title: 'Apps con IA bien usada',
      titleAccent: 'se sienten invisibles.',
      body:
        'Integramos inteligencia artificial dentro de apps móviles cuando ayuda a reducir fricción, mejorar decisiones o crear una experiencia más útil — no porque se vea moderna en el pitch.',
      closing:
        'La IA mal usada parece un payaso con API key. La bien usada simplemente hace que la app responda mejor.',
      uses: [
        'Asistentes contextuales',
        'Recomendaciones personalizadas',
        'Análisis de documentos',
        'Resúmenes automáticos',
        'Clasificación de solicitudes',
        'Chat inteligente',
        'Generación de reportes',
        'Análisis de comportamiento',
      ],
    },

    faq: {
      eyebrow: '// 13 · faq()',
      title: 'Preguntas frecuentes',
      items: [
        { q: '¿Desarrollan apps para iOS y Android?',
          a: 'Sí. Creamos apps para iOS y Android usando React Native y Expo, lo que permite desarrollar una base sólida para ambas plataformas sin duplicar esfuerzos.' },
        { q: '¿La app puede tener panel administrativo?',
          a: 'Sí. Construimos dashboards o back office para administrar usuarios, ventas, pedidos, inventario, reportes, notificaciones, estados y métricas.' },
        { q: '¿Pueden conectar la app con mi sistema actual?',
          a: 'Sí. Integramos con APIs existentes, CRMs, ERPs, proveedores de pago, sistemas internos, bases de datos o servicios externos.' },
        { q: '¿Pueden agregar pagos?',
          a: 'Sí. Integramos flujos de pago, historial, confirmaciones, estados de transacción y conexión con proveedores externos según el caso.' },
        { q: '¿Pueden agregar notificaciones push?',
          a: 'Sí. Implementamos push para recordatorios, pedidos, mensajes, alertas, promociones, estados o eventos importantes.' },
        { q: '¿Pueden agregar biometría?',
          a: 'Sí. Integramos autenticación biométrica con Face ID o huella cuando el dispositivo lo permita.' },
        { q: '¿Pueden construir apps fintech?',
          a: 'Sí. Desarrollamos apps móviles para flujos financieros: cuentas, tarjetas, historial, transferencias, autenticación segura y mensajería.' },
        { q: '¿Pueden publicar la app en App Store y Google Play?',
          a: 'Sí. Acompañamos preparación, configuración y publicación, dependiendo del alcance del proyecto y las cuentas del cliente.' },
        { q: '¿Pueden crear una primera versión MVP?',
          a: 'Sí. Definimos una versión inicial con las funciones más importantes para validar rápido, lanzar antes y evolucionar con datos reales.' },
        { q: '¿Cuánto tarda desarrollar una app?',
          a: 'Depende del alcance, integraciones, diseño, backend, seguridad y funcionalidades. Una app sencilla no requiere el mismo esfuerzo que una fintech con autenticación, pagos, dashboard e infraestructura. Misteriosamente, la física del software sigue existiendo.' },
      ],
    },

    finalCta: {
      eyebrow: '// 14 · ship()',
      title: 'Construyamos una app móvil',
      titleAccent: 'que tu cliente realmente quiera abrir.',
      body:
        'Si necesitas una app para clientes, equipos, ventas, ecommerce, fintech, educación, logística o comunidad, podemos diseñarla, desarrollarla y conectarla con el ecosistema digital de tu empresa.',
      cta: 'Agenda una consultoría mobile',
      ctaSecondary: 'Volver al inicio',
    },
  },

  footer: {
    tagline: 'Estudio de infraestructura digital. Construimos software, IA y sistemas para empresas que ya no quieren operar en modo manual.',
    sectionsTitle: 'Servicios',
    companyTitle: 'Compañía',
    contactTitle: 'Contacto',
    company: [
      { label: 'Cómo trabajamos', href: '#process' },
      { label: 'Lo que construimos', href: '#services' },
      { label: 'Casos de uso', href: '#use-cases' },
    ],
    rights: 'Todos los derechos reservados.',
    builtWith: 'Construido con criterio.',
  },
}

export default es
