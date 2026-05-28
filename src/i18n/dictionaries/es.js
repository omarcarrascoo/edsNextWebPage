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
    titleA: 'Software, IA e infraestructura',
    titleB: 'para empresas que ya no quieren',
    titleC: 'operar en modo manual.',
    subtitle:
      'Creamos aplicaciones web, apps móviles, dashboards, automatizaciones con IA, ecommerce, sistemas internos e infraestructura backend para negocios que necesitan ordenar, vender, medir y escalar.',
    note:
      'Desde una landing estratégica hasta una plataforma completa con backend, base de datos, panel administrativo, IA, seguridad e integraciones.',
    ctaPrimary: 'Hablemos de tu proyecto',
    ctaSecondary: 'Ver lo que construimos',
    osTitle: 'Era Digital · OS',
    osMeta: 'Sistema operativo digital',
    osStatus: 'Operativo',
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
    eyebrow: 'Nuestra propuesta',
    titleA: 'No hacemos páginas bonitas.',
    titleB: 'Construimos tecnología que',
    titleC: 'mueve operaciones reales.',
    body1: 'Una página web puede presentar tu negocio.',
    body2: 'Un sistema digital puede administrarlo, automatizarlo, medirlo y hacerlo crecer.',
    body3:
      'Trabajamos desde la estrategia hasta el desarrollo: entendemos tu proceso, diseñamos la solución, construimos la plataforma, conectamos tus datos y dejamos una base lista para evolucionar.',
    listTitle: 'Construimos:',
    list: [
      'Aplicaciones web a la medida',
      'Apps móviles para iOS y Android',
      'Dashboards empresariales',
      'Ecommerce, POS e inventario',
      'Automatización con inteligencia artificial',
      'Agentes de IA para empresas',
      'Infraestructura backend y APIs',
      'Sistemas fintech y bancarios',
      'Mensajería y notificaciones en tiempo real',
      'Seguridad informática y auditoría técnica',
    ],
  },
  services: {
    eyebrow: 'Capacidades',
    title: 'Servicios principales',
    subtitle: 'Diez frentes que cubrimos cuando construimos la infraestructura digital de una empresa.',
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
    eyebrow: 'Cómo conectamos todo',
    title: 'No diseñamos páginas. Diseñamos sistemas.',
    subtitle:
      'Una plataforma seria conecta usuarios, datos, IA y operaciones en un solo flujo. Esto es lo que construimos cuando trabajamos contigo.',
    nodes: [
      { label: 'Clientes', meta: 'Web · Móvil · Whatsapp' },
      { label: 'Aplicación', meta: 'Web App · App Móvil' },
      { label: 'API Gateway', meta: 'REST · GraphQL · Auth' },
      { label: 'Database', meta: 'Postgres · Mongo · Cache' },
      { label: 'AI Layer', meta: 'Agentes · Workflows · LLMs' },
      { label: 'Dashboards', meta: 'Métricas · Reportes' },
      { label: 'Automation', meta: 'Eventos · Integraciones' },
    ],
  },
  ai: {
    eyebrow: 'IA con criterio',
    title: 'IA con contexto, reglas y supervisión.',
    titleAccent: 'No magia. No humo. Procesos mejor diseñados.',
    body:
      'Un agente de IA no es un chatbot con nombre bonito. Es un sistema con instrucciones, memoria, herramientas y objetivos. Lo diseñamos para que ayude en tareas concretas sin perder control, trazabilidad ni criterio humano.',
    flow: [
      { label: 'Documents', meta: 'Entradas · APIs · uploads' },
      { label: 'AI Analysis', meta: 'LLM · reglas · contexto' },
      { label: 'Human Review', meta: 'Aprobación · supervisión' },
      { label: 'Report / Action', meta: 'Informe · trigger · ticket' },
    ],
    pillars: [
      { title: 'Control humano', body: 'Aprobaciones, límites y supervisión donde importa.' },
      { title: 'Memoria y contexto', body: 'Saber qué pasó antes para responder mejor ahora.' },
      { title: 'Trazabilidad', body: 'Cada decisión queda registrada y es auditable.' },
      { title: 'Conectado al sistema', body: 'No vive en una pestaña: dispara acciones reales.' },
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
