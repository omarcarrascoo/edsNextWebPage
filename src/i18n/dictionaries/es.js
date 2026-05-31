const es = {
  nav: {
    home: 'Inicio',
    services: 'Servicios',
    about: 'Nosotros',
    contact: 'Contacto',
    cta: 'Hablemos',
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

  backend: {
    meta: {
      title: 'Backend, APIs e infraestructura cloud',
      description:
        'Diseñamos y desarrollamos backend, APIs, microservicios, bases de datos, infraestructura cloud, autenticación, integraciones y sistemas escalables para empresas.',
    },
    breadcrumb: { services: 'Servicios', current: 'Backend e infraestructura' },

    hero: {
      eyebrow: '// BACKEND · 01 · run()',
      titleA: 'El motor invisible',
      titleB: 'que hace que tu producto',
      titleC: 'funcione de verdad.',
      titleAccent: 'APIs, datos, infraestructura.',
      subtitle:
        'Diseñamos la capa técnica que sostiene aplicaciones web, apps móviles, dashboards, ecommerce, fintech, IA e integraciones empresariales. Backend que opera, escala y se mantiene.',
      hudUptime: 'uptime · 99.94%',
      hudInteract: 'hover · scatter',
      ctaPrimary: 'Diseñemos tu arquitectura',
      ctaSecondary: 'Ver capacidades técnicas',
    },

    problem: {
      eyebrow: '// 02 · diagnose()',
      title: 'Una buena interfaz no salva',
      titleAccent: 'a un backend mal diseñado.',
      body:
        'Las pantallas se ven bien en la demo. El problema aparece después: cuando el sistema empieza a crecer y la verdad sale del backend.',
      symptoms: [
        { tag: 'SLOW',     text: 'La app se vuelve lenta' },
        { tag: 'SYNC',     text: 'Los datos no sincronizan' },
        { tag: 'PERMS',    text: 'Permisos incorrectos' },
        { tag: 'REPORTS',  text: 'Reportes que tardan minutos' },
        { tag: 'INTEGR',   text: 'Integraciones que fallan' },
        { tag: 'TRACE',    text: 'Errores que no se rastrean' },
        { tag: 'SCALE',    text: 'No soporta más usuarios' },
        { tag: 'FRAGILE',  text: 'Cada cambio rompe algo viejo' },
      ],
      closing:
        'El backend es el motor invisible de un producto digital. Cuando está bien diseñado, nadie lo nota. Cuando está mal diseñado, todos lo sufren.',
    },

    value: {
      eyebrow: '// 03 · build()',
      title: 'No es una API que devuelve datos.',
      titleAccent: 'Es el centro lógico de tu operación.',
      body:
        'Ahí viven las reglas del negocio, los permisos, las validaciones, los usuarios, las integraciones, los pagos, los reportes, los eventos, los archivos y la comunicación entre sistemas.',
      closing:
        'Una arquitectura clara, mantenible y lista para evolucionar sin que cada cambio sea una negociación con el caos.',
      capabilities: [
        { code: '01', tag: 'API',       title: 'APIs REST · GraphQL',         meta: 'Endpoints · validación · errores' },
        { code: '02', tag: 'MICRO',     title: 'Microservicios',                meta: 'Cuando aplica, no por moda' },
        { code: '03', tag: 'DATA',      title: 'Modelado de datos',             meta: 'Postgres · Mongo · Prisma' },
        { code: '04', tag: 'AUTH',      title: 'Auth · roles · permisos',       meta: 'JWT · RBAC · refresh tokens' },
        { code: '05', tag: 'CLOUD',     title: 'Infraestructura cloud',         meta: 'AWS · Docker · serverless' },
        { code: '06', tag: 'INTEGR',    title: 'Integraciones externas',        meta: 'i2c · BPC · Salesforce · pagos' },
        { code: '07', tag: 'EVENTS',    title: 'Eventos · colas · webhooks',    meta: 'Procesamiento asíncrono' },
        { code: '08', tag: 'OBS',       title: 'Logs · monitoreo · auditoría',  meta: 'Trazabilidad por defecto' },
      ],
    },

    apis: {
      eyebrow: '// 04 · connect()',
      title: 'APIs diseñadas para conectar productos,',
      titleAccent: 'no para improvisar endpoints.',
      body:
        'Construimos APIs claras, documentadas y seguras para conectar aplicaciones web, apps móviles, dashboards, CRMs, proveedores de pago, sistemas financieros y herramientas internas.',
      bestPractices: [
        'Estructura clara de endpoints',
        'Validación de datos',
        'Manejo de errores',
        'Autenticación',
        'Permisos por rol',
        'Logs',
        'Versionado cuando aplica',
        'Documentación técnica',
        'Respuestas consistentes',
        'Seguridad desde el diseño',
      ],
      closing:
        'Construimos APIs que permiten que tus sistemas hablen entre sí sin convertir cada integración en una pequeña tragedia técnica.',
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
      title: 'Arquitectura modular',
      titleAccent: 'para crecer sin romperse.',
      body:
        'No todos los proyectos necesitan microservicios. Y quien diga lo contrario probablemente también quiere meter Kubernetes en una landing page.',
      bodyClose:
        'Cuando un sistema tiene múltiples dominios, integraciones, flujos críticos o equipos en paralelo, una arquitectura modular es la diferencia entre crecer con orden o construir una bola de lodo con endpoints.',
      services: [
        { code: 'usr',   name: 'users',         meta: 'Auth · perfiles · sesiones' },
        { code: 'pay',   name: 'payments',      meta: 'Pagos · estados · proveedores' },
        { code: 'card',  name: 'cards',          meta: 'Activación · renovación · sync' },
        { code: 'inv',   name: 'inventory',      meta: 'Stock · movimientos · alertas' },
        { code: 'rpt',   name: 'reports',        meta: 'Agregaciones · exportables' },
        { code: 'msg',   name: 'messaging',      meta: 'Inbox · notificaciones · push' },
        { code: 'file',  name: 'files',          meta: 'Upload · storage · CDN' },
        { code: 'aud',   name: 'audit',          meta: 'Eventos · trazabilidad' },
        { code: 'int',   name: 'integrations',   meta: 'CRMs · ERPs · proveedores' },
        { code: 'ai',    name: 'ai',             meta: 'Agentes · workflows · LLM' },
      ],
    },

    databases: {
      eyebrow: '// 06 · model()',
      title: 'Datos bien modelados',
      titleAccent: 'para que no dependas de hojas de cálculo eternas.',
      body:
        'Una base de datos no es solo donde "guardamos cosas". Es donde vive la memoria operativa del negocio. Diseñamos modelos para usuarios, clientes, productos, transacciones, inventario, permisos y cualquier entidad crítica.',
      closing:
        'Una mala base de datos no se nota al inicio. Se nota cuando el sistema ya tiene usuarios, dinero y operaciones encima. Magnífico momento para descubrir errores, naturalmente.',
      stacks: [
        { label: 'Relacional',   items: ['PostgreSQL', 'MySQL', 'Prisma', 'SQL', 'Migraciones', 'Índices'] },
        { label: 'Documental',   items: ['MongoDB', 'DocumentDB', 'Estructuras flexibles', 'Aggregations'] },
        { label: 'Operación',    items: ['Backups', 'Réplicas', 'Optimización', 'Reportes', 'Auditoría', 'Caching'] },
      ],
    },

    auth: {
      eyebrow: '// 07 · gate()',
      title: 'Quién entra. Qué ve. Qué puede hacer.',
      titleAccent: 'Tres preguntas que definen un sistema seguro.',
      body:
        'Diseñamos sistemas de autenticación y autorización para proteger rutas, datos, módulos y operaciones sensibles. Porque "todos son admin" no es una política de seguridad — es una invitación al desastre.',
      capabilities: [
        { title: 'Autenticación',     meta: 'Registro · login · MFA · biometría' },
        { title: 'Sesiones · tokens', meta: 'JWT · refresh · expiración · revocación' },
        { title: 'Roles · RBAC',      meta: 'Admin · gerente · operador · cliente' },
        { title: 'Multi-tenant',      meta: 'Acceso por organización o equipo' },
        { title: 'Guards · middleware',meta: 'Protección de rutas · validación' },
        { title: 'Auditoría',          meta: 'Cada acción sensible queda registrada' },
      ],
    },

    cloud: {
      eyebrow: '// 08 · deploy()',
      title: 'Tu producto vive fuera',
      titleAccent: 'de la laptop del desarrollador.',
      body:
        'Ese lugar mágico donde todo funcionaba y nadie sabe por qué. Diseñamos despliegues, servicios cloud, ambientes, configuraciones, dominios, APIs, bases de datos y procesos de operación.',
      services: [
        { name: 'AWS',                 meta: 'EC2 · Lambda · API Gateway' },
        { name: 'Docker',              meta: 'Contenedores · imágenes · orquestación' },
        { name: 'Serverless',          meta: 'Functions · escalado · pago por uso' },
        { name: 'Elastic Beanstalk',   meta: 'Deploy administrado' },
        { name: 'Nginx · PM2',         meta: 'Reverse proxy · process manager' },
        { name: 'CI/CD',               meta: 'GitHub Actions · automatización' },
        { name: 'Ambientes',           meta: 'Dev · staging · production' },
        { name: 'Dominios · TLS',      meta: 'DNS · certificados · CDN' },
      ],
    },

    integrations: {
      eyebrow: '// 09 · bridge()',
      title: 'Conectamos tus sistemas',
      titleAccent: 'con el resto del mundo.',
      body:
        'Una empresa moderna rara vez usa un solo sistema. Necesita conectar pagos, CRMs, ERPs, proveedores financieros, plataformas de tarjetas, servicios de mensajería, ecommerce, IA, bancos, logística y herramientas internas.',
      closing:
        'Una integración no termina cuando "ya conecta". Tiene que manejar errores, estados, retries, validaciones y casos raros. Porque los proveedores externos siempre fallan justo cuando alguien importante está mirando. Así de considerados son.',
      providers: [
        { name: 'i2c',           kind: 'Tarjetas' },
        { name: 'BPC SmartVista',kind: 'Procesamiento' },
        { name: 'Salesforce',     kind: 'CRM' },
        { name: 'Stripe',         kind: 'Pagos' },
        { name: 'PayPal',         kind: 'Pagos' },
        { name: 'Twilio',         kind: 'SMS · WhatsApp' },
        { name: 'SendGrid',       kind: 'Email' },
        { name: 'OpenAI',         kind: 'IA · LLM' },
        { name: 'Anthropic',      kind: 'IA · LLM' },
        { name: 'AWS S3',         kind: 'Storage' },
        { name: 'Slack',          kind: 'Comms' },
        { name: 'HubSpot',        kind: 'CRM' },
      ],
    },

    architecture: {
      eyebrow: '// 10 · architect()',
      title: 'Así se ve una infraestructura',
      titleAccent: 'bien pensada.',
      body:
        'Una arquitectura backend completa conecta frontend, lógica de negocio, datos, integraciones, automatización y monitoreo en capas claras.',
      layers: [
        { code: 'L1', name: 'Web · Mobile · Dashboard',   meta: 'Frontend · UX' },
        { code: 'L2', name: 'API Gateway',                 meta: 'Routing · rate-limit · auth' },
        { code: 'L3', name: 'Auth · Authorization',        meta: 'JWT · RBAC · sessions' },
        { code: 'L4', name: 'Business Logic',              meta: 'Reglas · validación · estados' },
        { code: 'L5', name: 'Database · Files · Events',   meta: 'Postgres · Mongo · S3 · queues' },
        { code: 'L6', name: 'External Integrations',       meta: 'i2c · BPC · Salesforce · pagos' },
        { code: 'L7', name: 'Reports · Notifications · AI',meta: 'BI · push · automatización' },
        { code: 'L8', name: 'Logs · Monitoring · Audit',   meta: 'Observabilidad · trazabilidad' },
      ],
    },

    useCases: {
      eyebrow: '// 11 · cases()',
      title: 'Lo que podemos construir',
      items: [
        { num: '01', title: 'Backend para app móvil',           meta: 'Usuarios · pagos · push · sync' },
        { num: '02', title: 'API para ecommerce',                meta: 'Productos · pedidos · pagos' },
        { num: '03', title: 'Backend fintech',                    meta: 'Transferencias · tarjetas · estado' },
        { num: '04', title: 'Dashboard financiero',               meta: 'Endpoints · agregaciones · KPIs' },
        { num: '05', title: 'Sistema de roles y permisos',        meta: 'RBAC · multi-tenant · auditoría' },
        { num: '06', title: 'Integración Salesforce',             meta: 'CRM ↔ operación · sync' },
        { num: '07', title: 'Integración con procesador de pago', meta: 'Webhooks · retries · estados' },
        { num: '08', title: 'Sistema de mensajería',              meta: 'Inbox · push · eventos' },
        { num: '09', title: 'Plataforma SaaS',                    meta: 'Orgs · suscripciones · módulos' },
        { num: '10', title: 'Infraestructura para agentes de IA', meta: 'Tools · permisos · contexto' },
      ],
    },

    differentiators: {
      eyebrow: '// 12 · why()',
      title: 'Por qué construir tu backend con Era Digital Solutions',
      items: [
        { title: 'Pensamos en arquitectura',     body: 'Diseñamos la estructura antes de escribir código como si estuviéramos huyendo de algo.' },
        { title: 'Producto + operación',          body: 'No construimos endpoints al azar. Entendemos qué proceso resuelve el sistema.' },
        { title: 'Fullstack real',                body: 'Conectamos backend con web, mobile, dashboards, IA, ecommerce y fintech.' },
        { title: 'Sistemas sensibles',            body: 'Experiencia con flujos financieros, datos sensibles, tarjetas, transferencias y proveedores externos.' },
        { title: 'Diseñamos para mantenimiento',  body: 'Un buen backend funciona hoy. Pero también debe entenderse y extenderse mañana.' },
        { title: 'Seguridad y trazabilidad',      body: 'Controlamos accesos, validamos datos, registramos eventos y reducimos exposición innecesaria.' },
      ],
    },

    process: {
      eyebrow: '// 13 · build()',
      title: 'Cómo construimos backend e infraestructura',
      steps: [
        { num: '01', title: 'Diagnóstico',     body: 'Negocio, usuarios, procesos, datos, sistemas, integraciones, problemas actuales.' },
        { num: '02', title: 'Arquitectura',    body: 'Módulos, servicios, APIs, base de datos, permisos, infraestructura, integraciones.' },
        { num: '03', title: 'Modelado de datos', body: 'Entidades, relaciones, migraciones, índices, estructuras de reporte.' },
        { num: '04', title: 'APIs',             body: 'Endpoints, validaciones, reglas, auth, autorización, respuestas consistentes.' },
        { num: '05', title: 'Integraciones',    body: 'Proveedores externos, CRMs, pagos, IA, notificaciones, sistemas internos.' },
        { num: '06', title: 'Despliegue',        body: 'Cloud, Docker, ambientes, dominios, variables, logs, automatización.' },
        { num: '07', title: 'Seguridad',         body: 'Permisos, datos sensibles, exposición, accesos, rendimiento.' },
        { num: '08', title: 'Documentación',    body: 'Entrega documentación técnica y base lista para crecer con nuevos módulos.' },
      ],
    },

    stack: {
      eyebrow: '// 14 · stack()',
      title: 'Stack moderno.',
      titleAccent: 'Sin elegir tecnología para presumir.',
      body:
        'Elegimos el stack para que el producto pueda mantenerse, crecer y adaptarse — no para llenar slides con logos.',
      groups: [
        { label: 'Backend',         items: ['Node.js', 'NestJS', 'LoopBack', 'Express', 'Go', 'TypeScript'] },
        { label: 'APIs',             items: ['REST', 'GraphQL', 'Webhooks', 'Event-driven', 'API Gateway'] },
        { label: 'Databases',        items: ['PostgreSQL', 'MySQL', 'MongoDB', 'DocumentDB', 'Prisma', 'Redis'] },
        { label: 'Cloud · Infra',    items: ['AWS', 'Lambda', 'Docker', 'Nginx', 'PM2', 'Serverless', 'CI/CD'] },
        { label: 'Seguridad',        items: ['JWT', 'RBAC', 'OWASP', 'Encryption', 'Secret mgmt', 'Audit logs'] },
        { label: 'Integraciones',    items: ['i2c', 'BPC', 'Salesforce', 'Stripe', 'OpenAI', 'CRMs · ERPs'] },
      ],
    },

    midCta: {
      title: '¿Tu producto necesita una base técnica más seria?',
      body:
        'Podemos diseñar el backend, las APIs, la base de datos, la infraestructura y las integraciones que tu empresa necesita.',
      cta: 'Hablemos de tu arquitectura',
    },

    security: {
      eyebrow: '// 15 · secure()',
      title: 'Seguridad desde el diseño,',
      titleAccent: 'no como plugin al final.',
      body:
        'Un backend seguro no es el que promete ser invencible. Es el que reduce superficie de riesgo, controla accesos, protege datos y deja trazabilidad suficiente para entender qué ocurre.',
      practices: [
        'Validación de entradas',
        'Sanitización de datos',
        'Manejo seguro de tokens',
        'Separación de roles',
        'Protección de rutas',
        'Rate limiting',
        'Manejo seguro de secretos',
        'Configuración por ambientes',
        'Encriptación cuando aplica',
        'Logs sin exponer datos sensibles',
        'Respuestas de error controladas',
        'Principio de menor privilegio',
      ],
    },

    faq: {
      eyebrow: '// 16 · faq()',
      title: 'Preguntas frecuentes',
      items: [
        { q: '¿Desarrollan backend desde cero?',
          a: 'Sí. Diseñamos y desarrollamos backend desde cero para aplicaciones web, apps móviles, dashboards, ecommerce, fintech, sistemas internos y automatizaciones.' },
        { q: '¿Pueden trabajar con un backend existente?',
          a: 'Sí. Podemos revisar, extender, refactorizar o integrar sistemas existentes, dependiendo del estado del código y la arquitectura actual.' },
        { q: '¿Desarrollan APIs REST?',
          a: 'Sí. Creamos APIs REST para conectar aplicaciones, dashboards, sistemas internos, proveedores externos y apps móviles.' },
        { q: '¿Desarrollan GraphQL?',
          a: 'Sí. Construimos o consumimos APIs GraphQL cuando el proyecto lo requiere.' },
        { q: '¿Pueden crear microservicios?',
          a: 'Sí, cuando la arquitectura lo justifica. No usamos microservicios por moda — los usamos cuando ayudan a separar dominios, escalar módulos o integrar sistemas complejos.' },
        { q: '¿Pueden configurar infraestructura cloud?',
          a: 'Sí. Configuramos infraestructura en AWS, serverless, Docker, ambientes, despliegues y bases de datos.' },
        { q: '¿Pueden conectar mi app con proveedores externos?',
          a: 'Sí. Integramos pagos, CRMs, sistemas financieros, mensajería, logística, IA y herramientas empresariales.' },
        { q: '¿Pueden construir backend para apps móviles?',
          a: 'Sí. Creamos backend para login, usuarios, perfiles, notificaciones, pagos, dashboards, permisos, historial, mensajes y sincronización.' },
        { q: '¿Pueden construir backend para fintech?',
          a: 'Sí. Tenemos experiencia con flujos financieros, tarjetas, transferencias, back office, mensajería segura, datos sensibles e integraciones bancarias.' },
        { q: '¿Incluyen seguridad?',
          a: 'Sí. Diseñamos backend con autenticación, autorización, validaciones, manejo seguro de datos, control de exposición, logs y buenas prácticas de seguridad.' },
      ],
    },

    finalCta: {
      eyebrow: '// 17 · ship()',
      title: 'Construyamos el motor técnico',
      titleAccent: 'que tu producto necesita para crecer.',
      body:
        'Si tu empresa necesita APIs, backend, bases de datos, infraestructura cloud, integraciones, dashboards, seguridad o automatización, podemos diseñar y desarrollar una base sólida para operar con más claridad.',
      cta: 'Agenda una consultoría backend',
      ctaSecondary: 'Volver al inicio',
    },
  },

  commerce: {
    meta: {
      title: 'Ecommerce, POS e inventario a la medida',
      description:
        'Desarrollamos ecommerce, POS, inventario, catálogos digitales, dashboards de ventas, gestión de clientes, proveedores y plataformas comerciales conectadas.',
    },
    breadcrumb: { services: 'Servicios', current: 'Ecommerce, POS e inventario' },

    hero: {
      eyebrow: '// COMMERCE · 01 · sell()',
      titleA: 'Vender es fácil.',
      titleB: 'Sostener la operación',
      titleC: 'detrás de la venta, no.',
      titleAccent: 'Ecommerce, POS e inventario conectado.',
      subtitle:
        'Construimos sistemas comerciales completos: tienda en línea, punto de venta, inventario, clientes, proveedores y dashboards. Para que vender deje de depender de Excel, WhatsApp y memoria humana.',
      hudOmni: 'omnichannel · 24/7',
      hudInteract: 'hover · scatter',
      ctaPrimary: 'Construyamos tu sistema',
      ctaSecondary: 'Ver capacidades',
    },

    problem: {
      eyebrow: '// 02 · diagnose()',
      title: 'Vender más no sirve de mucho',
      titleAccent: 'si tu operación no puede sostenerlo.',
      body:
        'Una tienda en línea sin operación conectada crea más problemas que soluciones. Empiezan los clásicos:',
      symptoms: [
        { tag: 'STOCK',    text: 'Productos vendidos sin stock real' },
        { tag: 'EXCEL',    text: 'Inventario actualizado a mano' },
        { tag: 'CHAT',     text: 'Pedidos revisados desde WhatsApp' },
        { tag: 'COSTS',    text: 'Costos calculados al tanteo' },
        { tag: 'CLIENTS',  text: 'Clientes sin historial' },
        { tag: 'BLIND',    text: 'Sucursales operando sin visibilidad' },
        { tag: 'LATE',     text: 'Reportes que llegan tarde' },
        { tag: 'MARGIN',   text: 'Margen calculado "más o menos"' },
      ],
      closing:
        'Una tienda no debería ser una isla. Debe ser parte de un sistema comercial conectado — vender, registrar, medir, comprar y decidir desde una sola operación.',
    },

    value: {
      eyebrow: '// 03 · build()',
      title: 'Detrás de cada venta hay inventario, costos,',
      titleAccent: 'pagos, clientes, entregas y decisiones.',
      body:
        'Por eso construimos plataformas que conectan toda la operación comercial — no solo el carrito.',
      closing:
        'Una plataforma que no solo vende, también te ayuda a administrar, medir y mejorar el negocio.',
      capabilities: [
        { code: '01', tag: 'STORE',     title: 'Tienda en línea',           meta: 'Catálogo · carrito · checkout' },
        { code: '02', tag: 'POS',       title: 'POS web · móvil',            meta: 'Mostrador · tablet · sucursal' },
        { code: '03', tag: 'STOCK',     title: 'Inventario centralizado',    meta: 'SKU · variantes · sucursales' },
        { code: '04', tag: 'CLIENTS',   title: 'Clientes · CRM',              meta: 'Historial · segmentación · ticket' },
        { code: '05', tag: 'SUPPLY',    title: 'Proveedores · costos',       meta: 'Compras · márgenes · rentabilidad' },
        { code: '06', tag: 'PAY',       title: 'Pagos integrados',            meta: 'Tarjeta · transferencia · COD' },
        { code: '07', tag: 'BI',        title: 'Dashboards comerciales',      meta: 'Ventas · utilidad · alertas' },
        { code: '08', tag: 'AI',        title: 'IA que aporta valor',         meta: 'Demanda · recomendaciones · alertas' },
      ],
    },

    ecommerce: {
      eyebrow: '// 04 · ship()',
      title: 'Tiendas diseñadas alrededor de tu negocio,',
      titleAccent: 'no de una plantilla genérica.',
      body:
        'Desde una tienda sencilla hasta una plataforma comercial completa con inventario, clientes, pagos, promociones y panel administrativo.',
      features: [
        'Catálogo · categorías · filtros',
        'Buscador · productos destacados',
        'Carrito · checkout',
        'Pagos en línea',
        'Cuenta de usuario · historial',
        'Promociones · cupones',
        'Variantes de producto',
        'Control de stock conectado',
        'Notificaciones al cliente',
        'Panel administrativo',
        'Reportes de ventas',
        'SEO para productos y categorías',
      ],
    },

    pos: {
      eyebrow: '// 05 · checkout()',
      title: 'Un POS no es una caja registradora',
      titleAccent: 'con complejo de Excel.',
      body:
        'Sistemas POS para vender rápido, registrar bien y entender qué está pasando — desde mostrador, celular, tablet o sucursal.',
      kinds: [
        { tag: 'WEB',     name: 'POS web',           meta: 'Mostrador · admin' },
        { tag: 'MOBILE',  name: 'POS móvil',          meta: 'Vendedores · campo' },
        { tag: 'TABLET',  name: 'POS tablet',         meta: 'Restaurante · retail' },
        { tag: 'BRANCH',  name: 'POS multi-sucursal', meta: 'Inventario centralizado' },
        { tag: 'OMNI',    name: 'POS + ecommerce',    meta: 'Mismo stock · mismo cliente' },
      ],
      capabilities: [
        'Registro de ventas',
        'Búsqueda · escaneo de códigos',
        'Descuentos · cupones',
        'Métodos de pago',
        'Clientes asociados',
        'Tickets · comprobantes',
        'Cierre de caja',
        'Ventas por vendedor',
        'Inventario en vivo',
        'Devoluciones · cancelaciones',
        'Reportes diarios',
        'Dashboard administrativo',
      ],
    },

    inventory: {
      eyebrow: '// 06 · stock()',
      title: 'Tu inventario deja de ser',
      titleAccent: 'una "estimación optimista".',
      body:
        'Si el inventario está mal, todo lo demás miente: ventas, utilidad, compras, pedidos, disponibilidad. Construimos módulos para controlar productos, stock, movimientos, proveedores y alertas.',
      features: [
        'Productos · categorías · variantes',
        'SKU · código de barras',
        'Stock disponible · stock mínimo',
        'Entradas · salidas · ajustes',
        'Alertas de bajo stock',
        'Productos más vendidos',
        'Productos detenidos',
        'Inventario por sucursal',
        'Inventario por almacén',
        'Historial de cambios',
        'Reportes exportables',
        'Auditoría de movimientos',
      ],
      closing:
        'Tu inventario se convierte en fuente real de información para vender y comprar mejor — no en un acto de fe optimista.',
    },

    catalog: {
      eyebrow: '// 07 · catalog()',
      title: 'Catálogos digitales',
      titleAccent: 'claros, ordenados y fáciles de administrar.',
      body:
        'Para que tu equipo pueda administrar productos, precios, imágenes, categorías, variantes, promociones y disponibilidad sin tener que pelear con la plataforma.',
      features: [
        'Alta · edición de productos',
        'Carga de imágenes · descripciones',
        'Categorías · etiquetas',
        'Variantes (talla · color · presentación)',
        'Precios · costos · márgenes',
        'Productos destacados · relacionados',
        'Catálogo público · privado',
        'Catálogo para WhatsApp · redes',
      ],
    },

    clients: {
      eyebrow: '// 08 · know()',
      title: 'Vender una vez está bien.',
      titleAccent: 'Vender otra vez sin perseguir al cliente, mejor.',
      body:
        'Cada compra puede alimentar una relación comercial más inteligente. Creamos módulos para administrar clientes, historial, comportamiento y seguimiento.',
      features: [
        { title: 'Historial de compras',     meta: 'Productos · ticket · frecuencia' },
        { title: 'Segmentación',              meta: 'Frecuentes · inactivos · nuevos' },
        { title: 'Ticket promedio',           meta: 'Por cliente · por categoría' },
        { title: 'Promociones personalizadas', meta: 'Por segmento · por comportamiento' },
        { title: 'Notificaciones',            meta: 'Email · push · WhatsApp' },
        { title: 'Integración CRM',           meta: 'Salesforce · HubSpot · interno' },
      ],
    },

    suppliers: {
      eyebrow: '// 09 · margin()',
      title: 'Saber cuánto vendes está bien.',
      titleAccent: 'Saber cuánto ganas, mejor.',
      body:
        'Muchos negocios venden, pero no siempre saben exactamente cuánto ganan. Y esa es una forma elegante de caminar hacia problemas financieros con una sonrisa.',
      features: [
        'Registro de proveedores',
        'Productos por proveedor',
        'Costos de compra · historial',
        'Órdenes de compra',
        'Entradas de inventario',
        'Márgenes por producto',
        'Comparación de proveedores',
        'Alertas de cambios de costo',
        'Reportes de utilidad',
        'Productos rentables · de bajo margen',
      ],
    },

    dashboards: {
      eyebrow: '// 10 · observe()',
      title: 'Un sistema sin dashboard',
      titleAccent: 'es solo una caja donde pasan cosas.',
      body:
        'Muy moderno, sí, pero igual de ciego. Convertimos tu información comercial en paneles claros para decidir mejor, comprar mejor y vender mejor.',
      tickers: [
        { label: 'Ventas 24h',       value: '$48.2K',  delta: '+8.4%',  up: true },
        { label: 'Ticket promedio',   value: '$420',    delta: '+2.1%',  up: true },
        { label: 'Conversión',        value: '3.8%',    delta: '+0.6%',  up: true },
        { label: 'Stock bajo',        value: '24',      delta: '+6',     up: false },
        { label: 'Margen promedio',   value: '38%',     delta: '+1.2%',  up: true },
        { label: 'Devoluciones',      value: '0.7%',    delta: '-0.3%',  up: false },
      ],
      closing:
        'Ventas, utilidad, productos más vendidos, clientes, inventario, vendedores, sucursales, proveedores. Todo medible, todo accionable.',
    },

    omnichannel: {
      eyebrow: '// 11 · connect()',
      title: 'La tienda física, el ecommerce y el POS',
      titleAccent: 'deben hablar el mismo idioma.',
      body:
        'Si vendes en tienda, el inventario debe actualizarse. Si vendes en línea, el stock debe cambiar. Si entra mercancía, el catálogo debe reflejarlo. Si una venta ocurre, el dashboard debe medirla.',
      flow: [
        { code: 'L1', name: 'Ecommerce',                    meta: 'Tienda en línea' },
        { code: 'L2', name: 'POS web · móvil',               meta: 'Tienda física · vendedores' },
        { code: 'L3', name: 'Inventario centralizado',       meta: 'Stock · variantes · sucursales' },
        { code: 'L4', name: 'Clientes · proveedores',        meta: 'Historial · costos · márgenes' },
        { code: 'L5', name: 'Pagos · pedidos',                meta: 'Procesadores · estados' },
        { code: 'L6', name: 'Dashboard comercial',           meta: 'Ventas · utilidad · alertas' },
        { code: 'L7', name: 'Automatización · IA',           meta: 'Reportes · demanda · alertas' },
      ],
    },

    aiCallout: {
      eyebrow: '// 12 · intelligence()',
      title: 'IA bien usada predice demanda',
      titleAccent: 'y te avisa antes de que falte stock.',
      body:
        'No metemos IA como salsa picante. La integramos cuando ayuda a vender mejor, comprar mejor o ahorrar tiempo del equipo.',
      uses: [
        'Recomendaciones de productos',
        'Predicción de demanda',
        'Clasificación automática de productos',
        'Generación de descripciones',
        'Identificación de productos lentos',
        'Segmentación de clientes',
        'Análisis de tickets y comentarios',
        'Resúmenes ejecutivos automáticos',
        'Asistente interno para consultar métricas',
        'Automatización de reportes',
      ],
      closing:
        'Eso es IA útil. No un chatbot pegado en la esquina diciendo "hola, soy tu asistente virtual" mientras nadie sabe ni dónde está el botón de comprar.',
    },

    architecture: {
      eyebrow: '// 13 · architect()',
      title: 'Así se ve una plataforma comercial',
      titleAccent: 'bien conectada.',
      body:
        'Cada capa habla con la siguiente. La venta dispara stock, el stock alimenta dashboards, los dashboards informan compras. Sin Excel intermediando.',
      layers: [
        { code: 'L1', name: 'Ecommerce · POS · App',         meta: 'Frontend · canales' },
        { code: 'L2', name: 'API Gateway · Backend',          meta: 'Auth · routing · validación' },
        { code: 'L3', name: 'Productos · Inventario',         meta: 'Catálogo · stock · variantes' },
        { code: 'L4', name: 'Clientes · Proveedores',         meta: 'CRM · costos · órdenes' },
        { code: 'L5', name: 'Pagos · Pedidos',                 meta: 'Procesadores · estados · webhooks' },
        { code: 'L6', name: 'Dashboards · Reportes · IA',     meta: 'Ventas · utilidad · automatización' },
      ],
    },

    useCases: {
      eyebrow: '// 14 · cases()',
      title: 'Lo que podemos construir',
      items: [
        { num: '01', title: 'Tienda en línea',                   meta: 'Catálogo · pagos · inventario · pedidos' },
        { num: '02', title: 'POS para tienda física',            meta: 'Mostrador · clientes · descuentos' },
        { num: '03', title: 'POS móvil',                          meta: 'Vendedores · escaneo · reportes' },
        { num: '04', title: 'Sistema de inventario',              meta: 'SKU · sucursales · alertas' },
        { num: '05', title: 'Dashboard comercial',                meta: 'Ventas · utilidad · clientes' },
        { num: '06', title: 'Sistema de proveedores',             meta: 'Costos · órdenes · márgenes' },
        { num: '07', title: 'Catálogo digital',                    meta: 'Web · móvil · WhatsApp' },
        { num: '08', title: 'Plataforma omnicanal',                meta: 'Físico + online + redes + sucursales' },
        { num: '09', title: 'Ecommerce con IA',                    meta: 'Demanda · recomendaciones · alertas' },
        { num: '10', title: 'Sistema comercial completo',          meta: 'Todo conectado en una plataforma' },
      ],
    },

    differentiators: {
      eyebrow: '// 15 · why()',
      title: 'Por qué construir tu sistema con Era Digital Solutions',
      items: [
        { title: 'No construimos tiendas aisladas',  body: 'Sistemas conectados a inventario, pagos, clientes, proveedores y dashboards.' },
        { title: 'Entendemos operación real',         body: 'Vender es controlar stock, costos, pedidos, pagos, clientes, reportes — no solo mostrar productos.' },
        { title: 'Web · mobile · backend',             body: 'Tienda, POS, app móvil, backend, base de datos, dashboard e integraciones.' },
        { title: 'Diseñado para crecer',               body: 'Empieza con lo esencial. Agrega módulos, sucursales, canales o automatizaciones cuando los necesites.' },
        { title: 'IA donde aporta valor',              body: 'Análisis de ventas, predicción de demanda, clasificación de productos, recomendaciones.' },
        { title: 'Visibilidad financiera real',        body: 'No solo ventas — también costos, márgenes, utilidad y productos rentables.' },
      ],
    },

    process: {
      eyebrow: '// 16 · build()',
      title: 'Cómo construimos una plataforma comercial',
      steps: [
        { num: '01', title: 'Diagnóstico',     body: 'Cómo vendes, dónde vendes, qué productos manejas, cómo controlas inventario, qué reportes necesitas.' },
        { num: '02', title: 'Diseño',          body: 'Si necesitas ecommerce, POS, inventario, dashboard, app móvil, integración de pagos o sistema completo.' },
        { num: '03', title: 'Modelado',        body: 'Productos, categorías, variantes, stock, costos, proveedores, movimientos.' },
        { num: '04', title: 'UX · UI',          body: 'Experiencia para clientes, vendedores, administradores y operadores.' },
        { num: '05', title: 'Backend',          body: 'APIs, base de datos, reglas, permisos, pagos, pedidos, inventario, reportes.' },
        { num: '06', title: 'Frontend',         body: 'Tienda, POS, panel administrativo, dashboard o app móvil según el alcance.' },
        { num: '07', title: 'Integraciones',   body: 'Pagos, notificaciones, analytics, proveedores externos, CRM o herramientas existentes.' },
        { num: '08', title: 'Lanzamiento',     body: 'Despliegue, capacitación, documentación, evolución con nuevos módulos.' },
      ],
    },

    stack: {
      eyebrow: '// 17 · stack()',
      title: 'Tecnología para comercio digital moderno',
      titleAccent: 'No para llenar slides con logos.',
      body:
        'Stack pensado para que la plataforma pueda crecer, mantenerse y conectarse con lo que ya usas.',
      groups: [
        { label: 'Frontend',         items: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Responsive', 'SEO'] },
        { label: 'Mobile',           items: ['React Native', 'Expo', 'Push notifications', 'Escaneo de códigos'] },
        { label: 'Backend',           items: ['Node.js', 'NestJS', 'LoopBack', 'REST · GraphQL', 'Microservicios'] },
        { label: 'Bases de datos',    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Prisma', 'Redis · cache'] },
        { label: 'Cloud · Infra',     items: ['AWS', 'Docker', 'Serverless', 'API Gateway', 'CI/CD'] },
        { label: 'Integraciones',     items: ['Stripe', 'PayPal', 'Twilio · WhatsApp', 'Salesforce', 'OpenAI'] },
      ],
    },

    midCta: {
      title: '¿Tu negocio vende, pero tu operación sigue parchada con Excel y memoria humana?',
      body:
        'Podemos construir una plataforma comercial que conecte ventas, inventario, clientes, proveedores, pagos y dashboards.',
      cta: 'Diseñemos tu sistema comercial',
    },

    faq: {
      eyebrow: '// 18 · faq()',
      title: 'Preguntas frecuentes',
      items: [
        { q: '¿Desarrollan tiendas en línea?',
          a: 'Sí. Creamos ecommerce a la medida con catálogo, carrito, checkout, pagos, pedidos, usuarios, panel administrativo e integración con inventario.' },
        { q: '¿Pueden crear un sistema POS?',
          a: 'Sí. Desarrollamos POS web, móvil o tablet, conectado a inventario, clientes, vendedores, sucursales y reportes.' },
        { q: '¿El inventario se conecta con la tienda en línea?',
          a: 'Sí. Diseñamos inventario centralizado para que las ventas en ecommerce y POS actualicen stock automáticamente.' },
        { q: '¿Pueden agregar escaneo de códigos de barras?',
          a: 'Sí. Integramos escaneo de códigos de barras o QR en sistemas web o apps móviles, según el dispositivo y flujo.' },
        { q: '¿Pueden crear dashboards de ventas?',
          a: 'Sí. Construimos dashboards para visualizar ventas, utilidad, inventario, clientes, productos, proveedores, vendedores y sucursales.' },
        { q: '¿Pueden manejar proveedores y costos?',
          a: 'Sí. Creamos módulos para registrar proveedores, costos de compra, entradas de inventario, márgenes y reportes de rentabilidad.' },
        { q: '¿Pueden integrar pagos?',
          a: 'Sí. Integramos métodos de pago en ecommerce o POS, según el país, proveedor y necesidades del proyecto.' },
        { q: '¿Pueden crear una app móvil para vendedores?',
          a: 'Sí. Desarrollamos apps móviles para ventas, inventario, entregas, catálogo, reportes o gestión comercial.' },
        { q: '¿Pueden agregar IA al ecommerce?',
          a: 'Sí. Integramos IA para recomendaciones, análisis de ventas, predicción de demanda, generación de descripciones, clasificación de productos y reportes inteligentes.' },
        { q: '¿Pueden migrar desde Excel?',
          a: 'Sí. Ayudamos a estructurar productos, clientes, inventario y ventas desde archivos existentes hacia una plataforma más ordenada.' },
        { q: '¿Esto sirve para negocios pequeños?',
          a: 'Sí. Creamos una primera versión enfocada en lo esencial y dejamos la arquitectura preparada para crecer.' },
        { q: '¿Esto sirve para empresas con varias sucursales?',
          a: 'Sí. Diseñamos inventario, ventas, usuarios, permisos y reportes por sucursal o unidad de negocio.' },
      ],
    },

    finalCta: {
      eyebrow: '// 19 · ship()',
      title: 'Construyamos una plataforma comercial',
      titleAccent: 'que venda, mida y ordene tu operación.',
      body:
        'Si tu negocio necesita ecommerce, POS, inventario, clientes, proveedores, pagos, dashboards o automatización, podemos diseñar un sistema a la medida para vender mejor y operar con más control.',
      cta: 'Agenda una consultoría comercial',
      ctaSecondary: 'Volver al inicio',
    },
  },

  messaging: {
    meta: {
      title: 'Mensajería en tiempo real, notificaciones y chat para plataformas',
      description:
        'Desarrollamos sistemas de mensajería en tiempo real, chats, inbox, notificaciones push, confirmaciones de lectura, centros de mensajes seguros, WebSockets, eventos y comunicación para plataformas digitales.',
    },
    breadcrumb: { services: 'Servicios', current: 'Mensajería · tiempo real' },

    hero: {
      eyebrow: '// MESSAGING · 09 · realtime()',
      titleA: 'Mensajería',
      titleB: 'y tiempo real',
      titleC: 'para plataformas que conectan personas.',
      titleAccent: 'Infraestructura de comunicación, no una caja con burbujitas.',
      subtitle:
        'Chats, inbox, centros de mensajes seguros, notificaciones push, confirmaciones de lectura y eventos en vivo para aplicaciones web, apps móviles, fintech, ecommerce, comunidades, marketplaces y logística.',
      hudLive: 'sockets · live',
      hudEvents: 'event-driven',
      hudLatency: 'latency · ms',
      hudInteract: 'mueve el cursor',
      ctaPrimary: 'Construyamos tu sistema de mensajería',
      ctaSecondary: 'Ver capacidades en tiempo real',
    },

    problem: {
      eyebrow: '// 02 · diagnose()',
      title: 'Cuando una plataforma crece,',
      titleAccent: 'la comunicación deja de caber en WhatsApp y correos sueltos.',
      body:
        'Muchas empresas empiezan comunicándose con clientes y equipos desde canales externos: WhatsApp, email, llamadas, hojas compartidas, capturas de pantalla. Funciona un rato. Después aparecen los problemas — y no son pequeños.',
      symptoms: [
        { tag: 'LOST',  text: 'Mensajes perdidos' },
        { tag: 'BLIND', text: 'Equipos sin contexto' },
        { tag: 'DUP',   text: 'Notificaciones duplicadas' },
        { tag: 'AUDIT', text: 'Conversaciones sin trazabilidad' },
        { tag: 'PERM',  text: 'Datos visibles para quien no debería' },
        { tag: 'OPS',   text: 'Soporte respondiendo desde 5 canales' },
        { tag: 'STATE', text: 'Mensajes sin estado real' },
        { tag: 'STALE', text: 'Datos que no actualizan en vivo' },
      ],
      closing:
        'Una plataforma seria necesita comunicación integrada. Construimos mensajería que vive dentro del producto, conectada con usuarios, datos, permisos, eventos y operación.',
    },

    value: {
      eyebrow: '// 03 · build()',
      title: 'La capa de comunicación',
      titleAccent: 'que conecta usuarios, eventos y decisiones.',
      body:
        'La mensajería en tiempo real no es solo enviar texto. Es saber quién mandó qué, quién puede leerlo, cuándo llegó, si fue leído, qué evento lo generó, qué acción detona y a qué usuario, pedido o transacción pertenece. Diseñamos comunicación con contexto, estado, permisos y trazabilidad.',
      capabilities: [
        { tag: 'CHAT',     title: 'Chats privados y grupales' },
        { tag: 'INBOX',    title: 'Inbox interno y centros de mensajes' },
        { tag: 'PUSH',     title: 'Notificaciones push e in-app' },
        { tag: 'READ',     title: 'Confirmaciones de lectura y estados' },
        { tag: 'EVENT',    title: 'Mensajes detonados por evento' },
        { tag: 'SECURE',   title: 'Comunicación segura para fintech' },
        { tag: 'SOCKETS',  title: 'WebSockets y suscripciones' },
        { tag: 'LIVE',     title: 'Dashboards y monitoreo en vivo' },
      ],
    },

    chat: {
      eyebrow: '// 04 · conversation()',
      title: 'Chats e inbox para operar,',
      titleAccent: 'no solo para conversar.',
      body:
        'Un sistema de mensajería dentro de una plataforma vive del contexto. No es lo mismo un chat social que un inbox financiero, un mensaje de soporte, una alerta de pedido o una conversación de comunidad.',
      types: [
        {
          label: 'CHAT',
          title: 'Chat entre usuarios',
          body: 'Para comunidades, marketplaces, apps sociales, membresías, clubes, educación o plataformas colaborativas.',
        },
        {
          label: 'B2C',
          title: 'Chat cliente · empresa',
          body: 'Para soporte, atención, ventas, seguimiento de solicitudes, pedidos, entregas o servicios.',
        },
        {
          label: 'INBOX',
          title: 'Inbox administrativo',
          body: 'Para que equipos internos reciban, clasifiquen, respondan y den seguimiento desde un panel centralizado.',
        },
        {
          label: 'SECURE',
          title: 'Centro de mensajes seguro',
          body: 'Para fintech, banca, salud o servicios sensibles que necesitan controlar acceso, historial y trazabilidad.',
        },
        {
          label: 'EVENT',
          title: 'Mensajes automáticos por evento',
          body: 'Para avisar cambios de estado, pagos, pedidos, entregas, aprobaciones, rechazos o documentos.',
        },
      ],
      closing:
        'Conectamos cada conversación con usuarios, permisos, eventos y procesos reales. No abrimos un chat: abrimos un canal con contexto.',
    },

    notifications: {
      eyebrow: '// 05 · notify()',
      title: 'Notificaciones que informan,',
      titleAccent: 'no que ruegan atención como app desesperada.',
      body:
        'Las notificaciones pueden ser una herramienta poderosa o la forma más rápida de que un usuario desinstale tu app y te odie en silencio. Diseñamos sistemas que envían mensajes útiles, oportunos y conectados con eventos importantes.',
      types: ['Push', 'In-app', 'Email', 'Administrativas', 'Transaccionales', 'Recordatorios', 'Confirmaciones', 'Cambios de estado', 'Seguridad', 'Pedidos', 'Pagos', 'Equipos internos'],
      examples: [
        'Tu pedido cambió de estado.',
        'Tienes un nuevo mensaje.',
        'Tu tarjeta fue activada.',
        'Tu transferencia está en proceso.',
        'Tu solicitud fue aprobada.',
        'Hay bajo stock de este producto.',
        'Un cliente respondió tu mensaje.',
        'Tu entrega fue confirmada.',
        'Hay una alerta operativa.',
        'Tu reporte está listo.',
      ],
      closing:
        'Mantén usuarios y equipos informados en el momento correcto, con el contexto correcto.',
    },

    realtime: {
      eyebrow: '// 06 · stream()',
      title: 'Actualizaciones instantáneas',
      titleAccent: 'para productos que no pueden vivir esperando refresh.',
      body:
        'Hay plataformas donde el usuario necesita ver cambios al momento — mensajes, pedidos, pagos, entregas, disponibilidad, alertas, actividad. Implementamos comunicación en tiempo real con WebSockets, suscripciones, eventos o polling inteligente, según el alcance del proyecto.',
      stack: [
        'Mensajes nuevos',
        'Estados de lectura',
        'Notificaciones',
        'Cambios de pedido',
        'Cambios de transacción',
        'Alertas operativas',
        'Disponibilidad de productos',
        'Seguimiento de entregas',
        'Actividad de usuarios',
        'Paneles administrativos',
        'Dashboards en vivo',
        'Sistemas colaborativos',
        'Actualizaciones de soporte',
        'Eventos críticos',
      ],
      closing:
        'No todo necesita realtime absoluto. A veces un buen polling resuelve el problema con menos complejidad. Meter WebSockets donde no hacen falta es como llevar un tráiler para comprar pan: impresionante, sí — ridículo también.',
    },

    states: {
      eyebrow: '// 07 · state()',
      title: 'Saber si un mensaje fue enviado,',
      titleAccent: 'recibido o leído cambia la operación.',
      body:
        'En muchas plataformas el estado importa tanto como el mensaje. Un usuario quiere saber si su solicitud fue vista. Soporte necesita saber si alguien respondió. Una fintech necesita trazabilidad de comunicaciones sensibles.',
      states: ['Enviando', 'Enviado', 'Entregado', 'Leído', 'No leído', 'Fallido', 'Reintentando', 'Archivado', 'Respondido', 'Pendiente', 'Cerrado', 'Escalado'],
      features: [
        'Confirmaciones de lectura',
        'Indicadores de no leído',
        'Contadores por conversación',
        'Contadores por usuario',
        'Estados por canal',
        'Marcar como leído (uno o todos)',
        'Historial de lectura',
        'Sincronización entre dispositivos',
        'Reintentos automáticos',
        'Manejo de mensajes propios',
      ],
      closing:
        'Estados que ayudan a usuarios y equipos a saber qué pasó, qué falta y qué necesita atención.',
    },

    secure: {
      eyebrow: '// 08 · secure()',
      title: 'Comunicación segura',
      titleAccent: 'para operaciones donde el mensaje también es riesgo.',
      body:
        'En fintech, banca, seguros, salud o plataformas con datos sensibles, los mensajes no pueden vivir en canales desordenados. Se necesita un centro de mensajes con control de acceso, historial, permisos, trazabilidad y reglas claras desde el inicio.',
      capabilities: [
        'Centro de mensajes seguro',
        'Mensajes institución · usuario',
        'Notificaciones de actividad financiera',
        'Comunicaciones de tarjetas',
        'Avisos de transferencia',
        'Alertas de seguridad',
        'Confirmaciones operativas',
        'Historial consultable',
        'Mensajes con permisos por rol',
        'Back office para equipos internos',
        'Auditoría de acciones',
        'Control de lectura',
        'Integración con apps móviles',
        'Integración con backend financiero',
      ],
      closing:
        'En sistemas sensibles un mensaje no es solo texto: es evidencia, contexto, operación y posible riesgo. Diseñamos con seguridad, trazabilidad y acceso controlado desde el día uno.',
    },

    ecommerce: {
      eyebrow: '// 09 · commerce()',
      title: 'Mensajes y alertas para',
      titleAccent: 'mantener ventas, pedidos y entregas bajo control.',
      body:
        'En ecommerce y logística, la comunicación es parte de la experiencia del cliente y de la eficiencia operativa. Conectamos mensajes con pedidos, pagos, inventario, entregas, soporte y equipos internos.',
      ecommerce: [
        'Confirmación de pedido',
        'Confirmación de pago',
        'Cambio de estado',
        'Pedido en preparación',
        'Pedido enviado',
        'Pedido entregado',
        'Producto agotado',
        'Promociones',
        'Recuperación de carrito',
        'Atención a cliente',
        'Mensajes vendedor · comprador',
        'Notificaciones de inventario',
      ],
      logistics: [
        'Asignación de ruta',
        'Paquete recibido',
        'Paquete en tránsito',
        'Paquete entregado',
        'Incidencia de entrega',
        'Mensaje al repartidor',
        'Alerta al administrador',
        'Confirmación con evidencia',
        'Notificación al cliente',
        'Cambio de estado en vivo',
      ],
      closing:
        'Para que la operación comercial no dependa de perseguir información a mano.',
    },

    community: {
      eyebrow: '// 10 · community()',
      title: 'Comunicación para',
      titleAccent: 'plataformas donde la participación importa.',
      body:
        'Las comunidades digitales necesitan interacción real: conversaciones, respuestas, anuncios, eventos, recordatorios, grupos y notificaciones de actividad. Construimos sistemas para apps de comunidad, cursos, clubes, membresías y plataformas educativas.',
      features: [
        'Mensajes directos',
        'Grupos',
        'Anuncios',
        'Comentarios',
        'Respuestas',
        'Reacciones',
        'Notificaciones de actividad',
        'Recordatorios de eventos',
        'Mensajes de moderadores',
        'Canales por tema',
        'Comunicación entre miembros',
        'Comunicación admin · usuario',
        'Control de permisos',
        'Moderación básica',
        'Reportes de actividad',
      ],
      closing:
        'Para que comunidades y plataformas educativas mantengan interacción, seguimiento y participación real.',
    },

    events: {
      eyebrow: '// 11 · events()',
      title: 'Mensajería event-driven',
      titleAccent: 'para conectar acciones, alertas y automatizaciones.',
      body:
        'Una arquitectura de comunicación moderna no solo responde cuando alguien escribe. También escucha eventos del sistema. Cada evento puede detonar una notificación, un mensaje, una alerta interna, una actualización de dashboard o una automatización.',
      triggers: [
        'Nuevos mensajes',
        'Nuevas solicitudes',
        'Cambios de estado',
        'Pagos',
        'Transferencias',
        'Entregas',
        'Alertas de inventario',
        'Registros de usuario',
        'Errores operativos',
        'Aprobaciones',
        'Rechazos',
        'Actividad interna',
        'Acciones administrativas',
        'Actualizaciones de dashboard',
        'Automatizaciones con IA',
      ],
      pipeline: [
        'User Action · System Event',
        'Event Layer',
        'Notification Service',
        'Realtime Channel',
        'Mobile · Web · Dashboard',
        'Logs · Audit · Analytics',
      ],
      closing:
        'Eventos importantes generan comunicación automática, trazable y conectada con la operación.',
    },

    backend: {
      eyebrow: '// 12 · backend()',
      title: 'El chat visible es la punta del iceberg.',
      titleAccent: 'El backend es donde vive la complejidad real.',
      body:
        'Un sistema de mensajería necesita mucho más que una pantalla con burbujas: usuarios, conversaciones, permisos, paginación, estados, sockets, almacenamiento, sincronización, seguridad, historial y manejo de errores.',
      modules: [
        'Modelo de conversaciones',
        'Modelo de mensajes',
        'Participantes',
        'Permisos',
        'Estados de lectura',
        'Unread counts',
        'Paginación',
        'Búsqueda',
        'Adjuntos',
        'Reacciones',
        'Respuestas',
        'Notificaciones',
        'Eventos',
        'WebSockets',
        'Logs',
        'Moderación',
        'Seguridad',
        'Auditoría',
        'Retención por reglas de negocio',
      ],
      closing:
        'Infraestructura para que una conversación se mantenga sincronizada, segura y útil entre usuarios, dispositivos y sistemas.',
    },

    sync: {
      eyebrow: '// 13 · sync()',
      title: 'Mensajería sincronizada entre',
      titleAccent: 'web, mobile y paneles administrativos.',
      body:
        'Tus usuarios pueden estar en una app móvil. Tu equipo puede estar en un dashboard. Tu cliente puede recibir un push. Tu admin puede responder desde back office. Todo debe mantenerse sincronizado.',
      surfaces: ['App móvil', 'Aplicación web', 'Dashboard administrativo', 'Back office', 'Push notifications', 'Email', 'WebSockets', 'API backend', 'Base de datos', 'Servicios externos', 'Automatizaciones', 'IA'],
      flows: [
        'Cliente escribe desde app móvil → soporte responde desde dashboard',
        'Usuario recibe push por nuevo mensaje',
        'Administrador ve conversaciones no respondidas',
        'Sistema marca leído entre dispositivos',
        'Pedido cambia de estado → notificación',
        'Dashboard muestra actividad en tiempo real',
        'Evento financiero genera mensaje seguro',
      ],
      closing:
        'Comunicación que funciona entre dispositivos, plataformas y equipos sin perder contexto.',
    },

    dashboards: {
      eyebrow: '// 14 · observe()',
      title: 'Visibilidad sobre conversaciones,',
      titleAccent: 'alertas y actividad.',
      body:
        'Cuando la comunicación es parte de la operación, necesitas medirla. Construimos dashboards para entender volumen, tiempos de respuesta, conversaciones abiertas, mensajes no leídos, alertas y actividad por equipo.',
      metrics: [
        'Mensajes enviados',
        'Mensajes recibidos',
        'Conversaciones abiertas',
        'Conversaciones cerradas',
        'Tiempo promedio de respuesta',
        'Mensajes no leídos',
        'Notificaciones enviadas',
        'Notificaciones abiertas',
        'Usuarios activos',
        'Actividad por canal',
        'Actividad por equipo',
        'Mensajes por estado',
        'Errores de entrega',
        'Alertas críticas',
        'Conversaciones por tipo',
        'Solicitudes pendientes',
      ],
      closing:
        'La comunicación de tu plataforma convertida en métricas claras para mejorar soporte, operación y experiencia.',
    },

    ai: {
      eyebrow: '// 15 · assist()',
      title: 'IA para responder mejor,',
      titleAccent: 'clasificar conversaciones y reducir carga operativa.',
      body:
        'No se trata de poner un bot que responda cualquier cosa con confianza sospechosa — eso ya lo hizo medio internet, y mira cómo vamos. Se trata de usar IA para asistir, clasificar, resumir, sugerir y automatizar tareas concretas.',
      useCases: [
        'Clasificación automática',
        'Resúmenes de conversación',
        'Sugerencias de respuesta',
        'Priorización de solicitudes',
        'Detección de temas frecuentes',
        'Asistente para soporte',
        'Respuestas automáticas controladas',
        'Análisis de sentimiento',
        'Escalamiento automático',
        'Extracción de datos desde mensajes',
        'Generación de reportes',
        'Seguimiento de pendientes',
      ],
      closing:
        'La IA debe ayudar al equipo, no reemplazar criterio donde hay riesgo. Diseñamos flujos donde la IA sugiere y un humano aprueba — especialmente en soporte, fintech y procesos sensibles.',
    },

    security: {
      eyebrow: '// 16 · permissions()',
      title: 'La comunicación debe respetar',
      titleAccent: 'permisos, contexto y datos sensibles.',
      body:
        'Un sistema de mensajería mal diseñado puede exponer conversaciones, datos personales, información financiera o actividad interna. Diseñamos comunicación pensando en seguridad desde el inicio.',
      practices: [
        'Autenticación',
        'Autorización por conversación',
        'Permisos por usuario',
        'Acceso por organización',
        'Protección de rutas',
        'Validación de participantes',
        'Control de lectura',
        'Manejo seguro de adjuntos',
        'Logs sin información sensible',
        'Auditoría de acciones',
        'Separación de ambientes',
        'Revisión de exposición de datos',
        'Encriptación cuando aplica',
        'Retención según reglas del negocio',
      ],
      closing:
        'Cada usuario ve solo lo que debe ver — con trazabilidad y control desde la arquitectura.',
    },

    architecture: {
      eyebrow: '// 17 · architecture()',
      title: 'Así se ve una infraestructura',
      titleAccent: 'de mensajería y tiempo real.',
      layers: [
        { tag: 'CLIENTS',  title: 'Mobile · Web · Dashboard',          tone: 'accent' },
        { tag: 'API',      title: 'Messaging API',                     tone: 'blue'   },
        { tag: 'AUTH',     title: 'Auth · Permissions',                tone: 'violet' },
        { tag: 'CORE',     title: 'Conversations · Messages · Reads',  tone: 'accent' },
        { tag: 'REALTIME', title: 'Realtime Layer',                    tone: 'blue'   },
        { tag: 'NOTIFY',   title: 'Push · In-app Alerts',              tone: 'amber'  },
        { tag: 'OBS',      title: 'Logs · Audit · Analytics',          tone: 'violet' },
        { tag: 'AI',       title: 'Automations · IA · Reports',        tone: 'accent' },
      ],
    },

    useCases: {
      eyebrow: '// 18 · useCases()',
      title: 'Lo que podemos construir',
      titleAccent: 'con mensajería y tiempo real.',
      items: [
        { num: '01', title: 'Chat interno para web o móvil',          body: 'Conversaciones entre usuarios, equipos o clientes dentro de la aplicación.' },
        { num: '02', title: 'Inbox empresarial',                       body: 'Panel centralizado para recibir, responder y dar seguimiento desde back office.' },
        { num: '03', title: 'Centro de mensajes seguro',               body: 'Mensajería para fintech, banca y plataformas con datos sensibles y trazabilidad.' },
        { num: '04', title: 'Notificaciones push',                     body: 'Alertas móviles para mensajes, pedidos, pagos, solicitudes, entregas o eventos.' },
        { num: '05', title: 'Mensajes por evento',                     body: 'Mensajes automáticos generados por cambios de estado, pagos, aprobaciones o entregas.' },
        { num: '06', title: 'Dashboard realtime',                      body: 'Panel que actualiza información en vivo para operación, soporte, logística o ventas.' },
        { num: '07', title: 'Chat para ecommerce',                     body: 'Comunicación cliente · vendedor · soporte conectada a pedidos y productos.' },
        { num: '08', title: 'Mensajería para logística',               body: 'Alertas y comunicación entre repartidores, clientes, operadores y administradores.' },
        { num: '09', title: 'Chat para comunidades',                   body: 'Mensajes directos, grupos, comentarios, respuestas, anuncios y notificaciones.' },
        { num: '10', title: 'Asistente de IA para soporte',            body: 'Resumir, sugerir, clasificar y priorizar conversaciones para mejorar tiempos de atención.' },
      ],
    },

    differentiators: {
      eyebrow: '// 19 · why()',
      title: 'Por qué construir con',
      titleAccent: 'Era Digital Solutions.',
      items: [
        { num: '01', title: 'No vemos el chat como una pantalla', body: 'Lo diseñamos como infraestructura conectada a usuarios, eventos, permisos y operación.' },
        { num: '02', title: 'Backend, frontend y mobile',         body: 'API, base de datos, realtime, app móvil, web, dashboard y notificaciones — sistema completo.' },
        { num: '03', title: 'Sistemas críticos',                  body: 'Mensajería para fintech, banca, ecommerce, logística y soporte donde la trazabilidad importa.' },
        { num: '04', title: 'Estados y sincronización',           body: 'Mensajes no leídos, confirmaciones, entrega, lectura, reintentos y consistencia entre dispositivos.' },
        { num: '05', title: 'IA con control',                     body: 'Resumir, clasificar y asistir conversaciones sin convertir la plataforma en un bot irresponsable con traje elegante.' },
        { num: '06', title: 'Diseño para crecer',                 body: 'La arquitectura empieza simple y evoluciona hacia eventos, dashboards, automatización y comunicación avanzada.' },
      ],
    },

    process: {
      eyebrow: '// 20 · how()',
      title: 'Cómo construimos mensajería',
      titleAccent: 'y comunicación en tiempo real.',
      steps: [
        { num: '01', title: 'Diagnóstico de comunicación',  body: 'Quién se comunica con quién, qué eventos importan, qué canales existen y qué problemas operativos hay.' },
        { num: '02', title: 'Diseño de flujos',              body: 'Conversaciones, participantes, permisos, estados, notificaciones, eventos y reglas.' },
        { num: '03', title: 'Arquitectura backend',          body: 'Modelos de mensajes, conversaciones, lectura, notificaciones, realtime, logs y seguridad.' },
        { num: '04', title: 'Diseño UX/UI',                  body: 'Chat, inbox, notificaciones, estados, filtros, conversaciones y paneles.' },
        { num: '05', title: 'Desarrollo realtime',           body: 'Comunicación en tiempo real con la tecnología adecuada al proyecto.' },
        { num: '06', title: 'Integración mobile · web',      body: 'App móvil, web, dashboard, push notifications y backend conectados.' },
        { num: '07', title: 'Seguridad y permisos',          body: 'Acceso, participantes, roles, datos sensibles y exposición revisados.' },
        { num: '08', title: 'Pruebas',                       body: 'Mensajes, estados, lectura, no leídos, notificaciones, reconexión, errores, sincronización.' },
        { num: '09', title: 'Lanzamiento',                   body: 'Despliegue, monitoreo y base lista para evolucionar.' },
        { num: '10', title: 'Evolución',                     body: 'IA, dashboards, automatizaciones, nuevos canales, reglas avanzadas y métricas.' },
      ],
    },

    stack: {
      eyebrow: '// 21 · stack()',
      title: 'Tecnología para',
      titleAccent: 'comunicación moderna.',
      groups: [
        {
          label: 'Frontend',
          items: ['React', 'Next.js', 'TypeScript', 'Componentes realtime', 'Dashboards', 'Inboxes'],
        },
        {
          label: 'Mobile',
          items: ['React Native', 'Expo', 'Push notifications', 'Secure storage', 'Deep linking', 'Estados offline'],
        },
        {
          label: 'Backend',
          items: ['Node.js', 'NestJS', 'LoopBack', 'APIs REST', 'GraphQL', 'Servicios modulares', 'Webhooks', 'Event-driven'],
        },
        {
          label: 'Realtime',
          items: ['WebSockets', 'GraphQL subscriptions', 'Server-sent events', 'Polling inteligente', 'Event-driven architecture'],
        },
        {
          label: 'Data',
          items: ['PostgreSQL', 'MySQL', 'MongoDB', 'DocumentDB', 'Modelos para conversaciones y lectura'],
        },
        {
          label: 'Infra',
          items: ['AWS', 'Docker', 'Serverless', 'API Gateway', 'Servicios de notificaciones', 'Logs y monitoreo'],
        },
        {
          label: 'IA',
          items: ['Resúmenes', 'Clasificación', 'Asistentes de soporte', 'Sugerencias', 'Análisis de intención', 'Automatización'],
        },
      ],
    },

    midCta: {
      eyebrow: '// 22 · ship()',
      title: '¿Tu plataforma necesita comunicación integrada,',
      titleAccent: 'no parches en WhatsApp?',
      body:
        'Podemos ayudarte a construir chats, inbox, notificaciones, centros de mensajes seguros y comunicación en tiempo real conectada a tu operación.',
      cta: 'Diseñemos tu sistema de mensajería',
    },

    faq: {
      eyebrow: '// 23 · faq()',
      title: 'Preguntas frecuentes.',
      titleAccent: 'Lo que la gente nos pregunta.',
      items: [
        { q: '¿Desarrollan chats para apps web y móviles?',          a: 'Sí. Para apps móviles, plataformas web, dashboards administrativos, comunidades, ecommerce, fintech y sistemas internos.' },
        { q: '¿Pueden implementar notificaciones push?',             a: 'Sí. Para mensajes, pedidos, pagos, entregas, solicitudes, alertas, recordatorios y eventos importantes.' },
        { q: '¿Pueden crear un inbox para equipos internos?',        a: 'Sí. Inbox administrativo para que soporte, ventas u operación reciban, respondan y den seguimiento.' },
        { q: '¿Pueden hacer comunicación en tiempo real?',           a: 'Sí. WebSockets, suscripciones, eventos o polling inteligente. Elegimos la arquitectura correcta para el problema.' },
        { q: '¿Pueden agregar confirmaciones de lectura?',           a: 'Sí. Estados como enviado, entregado, leído, no leído, fallido, pendiente o respondido — según el flujo.' },
        { q: '¿Pueden crear un centro de mensajes seguro para fintech?', a: 'Sí. Con autenticación, permisos, historial, trazabilidad, notificaciones y acceso controlado.' },
        { q: '¿Pueden conectar mensajería con pedidos, pagos o entregas?', a: 'Sí. Mensajes y notificaciones conectados con eventos de ecommerce, pagos, logística e inventario.' },
        { q: '¿Pueden agregar IA a la mensajería?',                  a: 'Sí. Resumir, clasificar, sugerir respuestas, priorizar y automatizar seguimiento — con supervisión humana.' },
        { q: '¿Pueden construir dashboards de comunicación?',         a: 'Sí. Mensajes, conversaciones abiertas, tiempos de respuesta, usuarios activos, notificaciones y actividad.' },
        { q: '¿Pueden migrar desde un proveedor externo?',            a: 'Sí, según el sistema actual, acceso a datos, APIs disponibles y reglas. Revisamos la arquitectura y proponemos migración gradual.' },
      ],
    },

    finalCta: {
      eyebrow: '// 24 · ship()',
      title: 'Construyamos la comunicación en tiempo real',
      titleAccent: 'que tu plataforma necesita para operar mejor.',
      body:
        'Si tu producto necesita chat, inbox, notificaciones, centro de mensajes seguro, dashboards en vivo o comunicación entre usuarios, podemos diseñar y desarrollar una solución conectada a tus procesos, datos y usuarios.',
      cta: 'Agenda una consultoría de mensajería y realtime',
      ctaSecondary: 'Volver al inicio',
    },
  },

  about: {
    meta: {
      title: 'Nosotros',
      description:
        'Era Digital Solutions nació en 2019 para acercar tecnología de punta a PyMEs, MiPyMEs y emprendedores. Software, IA, ciberseguridad e infraestructura para empresas que están creciendo.',
    },
    breadcrumb: { home: 'Inicio', current: 'Nosotros' },

    hero: {
      eyebrow: '// ABOUT · since 2019',
      titleA: 'Tecnología de punta',
      titleB: 'para empresas que',
      titleC: 'están construyendo desde abajo.',
      titleAccent: 'Acercamos lo que parecía inaccesible.',
      subtitle:
        'Era Digital Solutions nace en 2019 para ayudar a PyMEs, MiPyMEs y emprendedores a entrar, crecer y competir en el mundo digital con herramientas que antes parecían reservadas para grandes empresas.',
      bodyExtra:
        'No creemos que la tecnología de alto nivel deba estar lejos de las empresas pequeñas. Creemos que debe estar mejor explicada, mejor construida y más cerca de quienes realmente la necesitan.',
      ctaPrimary: 'Conoce lo que hacemos',
      ctaSecondary: 'Hablemos de tu proyecto',
    },

    market: {
      eyebrow: '// 02 · context()',
      title: 'El mercado real',
      titleAccent: 'no son los corporativos. Son las MiPyMEs.',
      body:
        'En México las MiPyMEs son prácticamente todo el tejido empresarial. La Secretaría de Economía las describe como más del 99.8% de las empresas. Y casi ninguna tiene acceso real a tecnología moderna.',
      stats: [
        { value: '99.8%', label: 'de las empresas en México son MiPyMEs',           source: 'Secretaría de Economía' },
        { value: '95.5%', label: 'son microempresas (menos de 10 empleados)',        source: 'INEGI · 2023' },
        { value: '41.5%', label: 'del personal ocupado vive en una microempresa',     source: 'INEGI · 2023' },
        { value: '25.3%', label: 'de las unidades económicas usa equipo de cómputo', source: 'INEGI · 2023' },
      ],
      closing:
        'Esa es la brecha. No falta talento ni hambre de crecer — falta tecnología útil, segura y moderna que llegue a quienes están construyendo desde abajo.',
    },

    story: {
      eyebrow: '// 03 · origin()',
      title: 'Era Digital Solutions nació en 2019',
      titleAccent: 'con una idea clara: democratizar el acceso a la tecnología.',
      body:
        'Desde el inicio nacimos como una firma de desarrollo tecnológico para PyMEs y MiPyMEs. Vimos una brecha: miles de negocios quieren crecer, vender mejor, ordenar procesos y competir en un mercado cada vez más digital, pero no siempre saben por dónde empezar.',
      bodyMid:
        'Algunas tienen buenas ideas, pero no equipo técnico. Otras tienen procesos funcionando, pero siguen dependiendo de hojas de cálculo, WhatsApp y reportes manuales. Muchas quieren innovar, pero la tecnología parece cara, confusa o pensada solo para grandes corporaciones.',
      bodyClose:
        'Era nace para cerrar ese gap. Para traducir necesidades de negocio en soluciones digitales claras. Para convertir ideas en productos. Para ayudar a empresas en crecimiento a dar el siguiente paso sin perderse entre proveedores, buzzwords y herramientas que prometen mucho pero resuelven poco.',
      tagline:
        'Una PyME no necesita que le vendan "transformación digital" como concepto bonito. Necesita tecnología que le ayude a vender, operar, protegerse, medir y crecer.',
    },

    missionVision: {
      eyebrow: '// 04 · purpose()',
      title: 'Misión y visión.',
      titleAccent: 'Llanas, sin floritura corporativa.',
      mission: {
        label: 'Misión',
        title: 'Llevar tecnología útil, segura e innovadora a PyMEs, MiPyMEs y emprendedores.',
        body:
          'Que la tecnología deje de sentirse como algo lejano. Que una empresa pueda tener un sistema propio, entender sus números, vender en línea, controlar su inventario, automatizar tareas o convertir una idea loca en una app real. Que la seguridad digital no sea un lujo, sino una base.',
      },
      vision: {
        label: 'Visión',
        title: 'Ser el puente entre empresas con potencial y tecnología que parece inaccesible.',
        body:
          'Muchas empresas pequeñas y medianas tienen visión, talento y hambre de crecer, pero chocan con la tecnología — no porque no puedan usarla, sino porque nadie se las explica bien ni la aterriza a su realidad. Era quiere ser ese puente entre una idea y un producto, entre una operación manual y un sistema digital.',
      },
    },

    represent: {
      eyebrow: '// 05 · who()',
      title: 'Innovación para quienes la necesitan,',
      titleAccent: 'no solo para quienes pueden pagar consultorías gigantes.',
      body:
        'Nos encanta trabajar con emprendedores, empresas familiares, negocios en crecimiento y personas que tienen ideas ambiciosas — incluso cuando todavía están desordenadas. De hecho, ahí suele estar lo mejor.',
      tags: [
        'Ideas raras',
        'Modelos nuevos',
        'Procesos sin digitalizar',
        'Negocios tradicionales',
        'Empresas en crecimiento',
        'Oportunidades sin mapa',
      ],
      closing:
        'La innovación no siempre nace en una sala elegante con pizarrones de vidrio. A veces nace en una conversación caótica, una libreta, una tienda, una cocina, una bodega o un negocio familiar que ya entendió que necesita evolucionar.',
    },

    stance: {
      eyebrow: '// 06 · approach()',
      title: 'La tecnología no debería',
      titleAccent: 'complicar más a las empresas. Debería darles claridad.',
      body:
        'El problema no es que falten herramientas. El problema es que muchas no están pensadas para la realidad de las PyMEs y MiPyMEs. Son caras, genéricas, difíciles de implementar, no se conectan con la operación real, requieren procesos que la empresa todavía no tiene, o terminan abandonadas porque nadie las entiende.',
      questions: [
        '¿Qué estás intentando resolver?',
        '¿Qué proceso te está frenando?',
        '¿Qué operación depende demasiado de trabajo manual?',
        '¿Qué dato necesitas ver y hoy no puedes ver?',
        '¿Qué parte del negocio ya creció más que tus herramientas?',
      ],
      closing:
        'Después elegimos la tecnología. No al revés. Porque construir primero y pensar después es una tradición humana muy popular, pero bastante cara.',
    },

    security: {
      eyebrow: '// 07 · secure()',
      title: 'Nacimos también bajo otra premisa:',
      titleAccent: 'democratizar la seguridad en el mundo digital.',
      body:
        'Entrar al mundo digital sin entender seguridad es como abrir una tienda nueva y dejar la puerta sin chapa porque "todavía nadie nos conoce". Muchas PyMEs creen que la ciberseguridad es solo para bancos y corporativos. En la práctica, cualquier negocio que maneja clientes, pagos, contraseñas, inventario o datos personales necesita pensar en seguridad.',
      pillars: [
        'Autenticación',
        'Permisos',
        'Datos sensibles',
        'Backups',
        'Accesos',
        'Infraestructura',
        'APIs',
        'Buenas prácticas',
        'Capacitación',
        'Prevención',
      ],
      closing:
        'No vemos la ciberseguridad como un extra. La vemos como parte de construir bien — desde una landing page hasta una plataforma financiera, debe estar en la conversación desde el inicio.',
    },

    beliefs: {
      eyebrow: '// 08 · believe()',
      title: 'Creemos en software',
      titleAccent: 'que resuelve problemas reales.',
      against: [
        'Páginas bonitas que no convierten',
        'Dashboards llenos de gráficas que nadie usa',
        'Sistemas carísimos más complejos que el problema original',
        'IA puesta como adorno para decir "innovador"',
      ],
      forItems: [
        'Vender mejor',
        'Ordenar procesos',
        'Reducir trabajo manual',
        'Entender los números',
        'Proteger información',
        'Automatizar tareas',
        'Atender mejor a clientes',
        'Lanzar nuevos productos',
        'Tomar decisiones con datos',
        'Competir con herramientas modernas',
      ],
    },

    pillars: {
      eyebrow: '// 09 · pillars()',
      title: 'Cinco pilares.',
      titleAccent: 'Lo que sostiene todo lo que construimos.',
      items: [
        {
          num: '01',
          title: 'Democratizar tecnología',
          body: 'Que más PyMEs, MiPyMEs y emprendedores tengan acceso a software, automatización, IA, dashboards e infraestructura sin sentir que pertenece a otro mundo. La tecnología debe adaptarse al negocio, no intimidarlo.',
        },
        {
          num: '02',
          title: 'Digitalizar con sentido',
          body: 'No todo necesita una app. No todo necesita IA. Pero muchos negocios sí necesitan dejar de operar con procesos manuales, datos dispersos y herramientas desconectadas. Construimos lo que realmente mueve la operación.',
        },
        {
          num: '03',
          title: 'Convertir ideas locas en productos reales',
          body: 'Tomamos esa idea ambiciosa, rara o difícil de explicar, la ordenamos, la diseñamos, la bajamos a funcionalidades y la convertimos en algo que pueda usarse, venderse, medirse y evolucionar.',
        },
        {
          num: '04',
          title: 'Construir seguridad desde el inicio',
          body: 'La seguridad no se agrega al final. Se diseña desde el principio. Por eso pensamos en accesos, permisos, datos sensibles, exposición e infraestructura desde la arquitectura.',
        },
        {
          num: '05',
          title: 'Explicar, enseñar, acompañar',
          body: 'No creemos en esconder todo detrás de palabras técnicas para que el cliente dependa eternamente de nosotros. Queremos que entienda qué se está construyendo y por qué importa.',
        },
      ],
    },

    whatWeDo: {
      eyebrow: '// 10 · build()',
      title: 'Lo que hacemos, en concreto.',
      titleAccent: 'Sin "transformación digital" como concepto bonito.',
      body:
        'Más allá de la lista de servicios, lo que hacemos es más simple: ayudamos a que una empresa use tecnología para trabajar mejor.',
      services: [
        { tag: 'WEB',     title: 'Software a la medida' },
        { tag: 'WEB',     title: 'Aplicaciones web empresariales' },
        { tag: 'MOBILE',  title: 'Apps móviles iOS · Android' },
        { tag: 'BACKEND', title: 'APIs e infraestructura cloud' },
        { tag: 'AI',      title: 'Automatización con IA' },
        { tag: 'AI',      title: 'Agentes de IA para empresas' },
        { tag: 'BI',      title: 'Dashboards y analítica' },
        { tag: 'COMMERCE',title: 'Ecommerce, POS e inventario' },
        { tag: 'FINTECH', title: 'Fintech e infraestructura bancaria' },
        { tag: 'SEC',     title: 'Seguridad informática · auditoría' },
        { tag: 'REALTIME',title: 'Mensajería en tiempo real' },
        { tag: 'OPS',     title: 'Logística, paquetería, campo' },
      ],
    },

    forWhom: {
      eyebrow: '// 11 · clients()',
      title: 'Para empresas que saben',
      titleAccent: 'que ya no pueden operar igual.',
      body:
        'Trabajamos con negocios que están creciendo y necesitan una base digital más fuerte. No importa si el primer paso es una página, una app, un dashboard o una plataforma completa. Lo importante es que ese paso tenga sentido.',
      audiences: [
        'PyMEs que quieren ordenar su operación',
        'MiPyMEs que quieren vender más y controlar mejor',
        'Emprendedores con una idea por lanzar',
        'Tiendas que necesitan ecommerce, POS e inventario',
        'Empresas de servicios con sistemas internos',
        'Equipos que necesitan dashboards y reportes',
        'Negocios que quieren automatizar procesos',
        'Empresas que quieren proteger su información',
        'Proyectos que necesitan pasar de idea a producto',
      ],
    },

    process: {
      eyebrow: '// 12 · how()',
      title: 'Primero entendemos el negocio.',
      titleAccent: 'Después construimos tecnología.',
      body:
        'Nuestro proceso empieza con preguntas, no con plantillas. Queremos entender cómo opera la empresa, dónde se pierde tiempo, qué procesos son manuales, qué datos no se ven, qué herramientas ya existen y qué objetivo quiere alcanzar.',
      steps: [
        { num: '01', title: 'Entendemos el problema',          body: 'Antes de hablar de pantallas, hablamos del negocio.' },
        { num: '02', title: 'Definimos el objetivo digital',    body: 'Qué tiene que lograr la solución, no qué tecnología usaremos.' },
        { num: '03', title: 'Diseñamos la solución',            body: 'UX, flujos, módulos, prioridades, escalabilidad.' },
        { num: '04', title: 'Construimos el producto',           body: 'Frontend, backend, integraciones, infraestructura.' },
        { num: '05', title: 'Integramos datos · seguridad',     body: 'Permisos, autenticación, exposición, monitoreo.' },
        { num: '06', title: 'Medimos resultados',                body: 'Dashboards, reportes, métricas accionables.' },
        { num: '07', title: 'Evolucionamos con el negocio',     body: 'Nuevos módulos, integraciones, capacidades.' },
      ],
    },

    different: {
      eyebrow: '// 13 · why()',
      title: 'No llegamos a vender tecnología.',
      titleAccent: 'Llegamos a traducirla.',
      body:
        'Muchas empresas no necesitan que alguien las impresione con términos técnicos. Necesitan que alguien les ayude a entender qué se puede hacer, qué conviene hacer primero y cómo la tecnología puede convertirse en una ventaja real.',
      translations: [
        { from: 'Ideas',         to: 'Productos' },
        { from: 'Procesos',      to: 'Sistemas' },
        { from: 'Datos',         to: 'Decisiones' },
        { from: 'Riesgos',       to: 'Seguridad' },
        { from: 'Crecimiento',   to: 'Infraestructura' },
      ],
      closing:
        'No somos una empresa que solo desarrolla páginas web. Somos una firma tecnológica creada para ayudar a empresas en crecimiento a entrar a la era digital con claridad, seguridad e innovación.',
    },

    manifesto: {
      eyebrow: '// 14 · manifesto()',
      title: 'La tecnología de punta',
      titleAccent: 'también debe pertenecerle a las empresas pequeñas.',
      body:
        'La innovación no debería quedarse encerrada en corporativos, bancos, startups gigantes o empresas con presupuestos imposibles. Las PyMEs y MiPyMEs también merecen herramientas modernas, seguridad, automatización, dashboards y software bien hecho.',
      lines: [
        'Para acercar tecnología a quienes están construyendo desde abajo.',
        'Para ayudar a negocios reales a dar el siguiente paso.',
        'Para convertir ideas locas en productos funcionales.',
        'Para democratizar la información, la seguridad y el acceso al mundo digital.',
      ],
      closing:
        'No queremos que la tecnología sea una barrera. Queremos que sea una plataforma.',
    },

    finalCta: {
      eyebrow: '// 15 · ship()',
      title: 'Si tu empresa está creciendo,',
      titleAccent: 'tu tecnología también debería crecer contigo.',
      body:
        'Podemos ayudarte a convertir tus procesos, ideas y retos en soluciones digitales claras, seguras y listas para evolucionar.',
      cta: 'Hablemos de tu proyecto',
      ctaSecondary: 'Ver nuestros servicios',
    },
  },

  footer: {
    tagline: 'Firma de tecnología para PyMEs, MiPyMEs y emprendedores. Software, IA, infraestructura y seguridad para empresas que están construyendo desde abajo.',
    sectionsTitle: 'Servicios',
    companyTitle: 'Compañía',
    contactTitle: 'Contacto',
    legalTitle: 'Legal',
    company: [
      { label: 'Nosotros',         href: '/about' },
      { label: 'Cómo trabajamos',   href: '/about#process' },
      { label: 'Manifiesto',        href: '/about#manifesto' },
      { label: 'Contacto',          href: '/#contact' },
    ],
    legal: [
      { label: 'Aviso de privacidad', href: '#privacy' },
      { label: 'Términos',            href: '#terms' },
    ],
    location: 'Remoto · México · LATAM',
    rights: 'Todos los derechos reservados.',
    builtWith: 'Construido con criterio en CDMX.',
  },
}

export default es
