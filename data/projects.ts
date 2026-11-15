export type Project = { slug: string; title: string; category: string; description: string; cover: string; coverKind: 'screenshot' | 'illustration'; coverLabel: string; coverWidth: number; coverHeight: number; caption: string; role: string; context: string; technologies: string[]; sections: {title: string; body: string}[]; links: {label: string; href: string}[]; professional: boolean };

export const projects: Project[] = [
  {
    "slug": "at-workflow",
    "title": "ATworkflow",
    "category": "Agency operations & marketing analytics",
    "description": "ATworkflow is a full-stack platform for digital agency operations and client reporting. It brings project management, time tracking, HR, creative workflows, and campaign analytics into one workspace.",
    "cover": "/assets/at-workflow-black.png",
    "caption": "AI-generated illustrative employee leave dashboard. Fictional employees, balances, and requests; not a screenshot of the team’s platform.",
    "role": "Junior full-stack developer",
    "context": "Team project · Employee leave balances",
    "technologies": [
      "Vue 3",
      "Vuetify",
      "Vite",
      "PHP",
      "Laravel 10",
      "MySQL",
      "REST API"
    ],
    "sections": [
      {
        "title": "What the platform does",
        "body": "Agency teams can assign tasks, log time, coordinate creative requests, and manage HR and commercial activities. Campaign dashboards and report exports help teams monitor client performance."
      },
      {
        "title": "My contribution",
        "body": "I contributed to the platform as part of the team, focusing mainly on employee leave balances. I worked on calculating available leave and showing balances alongside requests and approvals so HR could track them in one place."
      }
    ],
    "links": [],
    "professional": true,
    "coverKind": "illustration",
    "coverLabel": "AI-generated mockup · Demo data",
    "coverWidth": 1536,
    "coverHeight": 1024
  },
  {
    "slug": "atirao-website",
    "title": "Atirao Website",
    "category": "Corporate website",
    "description": "Responsive frontend development for Atirao’s agency website, with reusable components and consistent page templates.",
    "cover": "/assets/atirao-website-screenshot.png",
    "caption": "Atirao website screenshot supplied by Najwa. Figures and claims visible within the website belong to the agency and are not measurements of my contribution.",
    "role": "Frontend developer",
    "context": "Team project",
    "technologies": [
      "Laravel Blade",
      "HTML",
      "CSS",
      "JavaScript",
      "GTM",
      "GA4",
      "Google Search Console"
    ],
    "sections": [
      {
        "title": "Frontend development",
        "body": "I contributed to Atirao’s corporate website by developing responsive pages and translating design ideas into working interfaces. My work covered page templates, navigation, and shared sections across the agency website."
      },
      {
        "title": "Reusable templates and components",
        "body": "I used Laravel Blade to structure shared layouts and reusable interface components. HTML, CSS, and JavaScript handled the responsive presentation and interactions. Shared templates gave pages a consistent visual structure and made changes to common elements easier to maintain."
      },
      {
        "title": "Tracking, indexing, and performance",
        "body": "I worked on data layer events and variables for GTM and GA4, as well as Search Console, the XML sitemap, robots.txt, and indexing checks. I also worked on deferring the chatbot until user interaction and investigated Largest Contentful Paint to understand the effect on page loading."
      }
    ],
    "links": [
      {
        "label": "Visit the public Atirao website",
        "href": "https://atirao.ma/fr"
      }
    ],
    "professional": true,
    "coverKind": "screenshot",
    "coverLabel": "Website screenshot · Supplied image",
    "coverWidth": 1482,
    "coverHeight": 880
  },
  {
    "slug": "at-boost",
    "title": "AT Boost Website",
    "category": "Website built from scratch",
    "description": "I designed and built the AT Boost website from scratch, from its visual direction and responsive pages to its Laravel backend and protected forms.",
    "cover": "/assets/at-boost-website-screenshot.png",
    "caption": "AT Boost website screenshot supplied by Najwa.",
    "role": "Full-stack developer",
    "context": "Design and development",
    "technologies": [
      "PHP",
      "Laravel",
      "Blade",
      "HTML",
      "CSS",
      "JavaScript",
      "Google reCAPTCHA"
    ],
    "sections": [
      {
        "title": "From concept to website",
        "body": "I defined the visual direction, page structure, and user journeys, then built the frontend and backend. The public website introduces the AT Boost group and its relationship with Atirao. Visitors can explore agency expertise, service pages, resources, and routes for project enquiries and recruitment."
      },
      {
        "title": "Laravel application structure",
        "body": "I created reusable Blade layouts and components to keep navigation, page structure, and common interface elements consistent. Laravel routes connect page and form requests to controllers. On the backend, I implemented validation and database storage for contact requests and job applications."
      },
      {
        "title": "Form processing and spam protection",
        "body": "I integrated Google reCAPTCHA into the form flow and verified its response server-side. The Laravel backend validates submissions before storing accepted requests. This gives the site a defined path from the public form to the stored enquiry or application."
      },
      {
        "title": "Measurement and technical SEO",
        "body": "I implemented tracking data layer events and variables for GTM and GA4, including separate signals for contact clicks and confirmed submissions. I also worked on Search Console, sitemap coverage, robots.txt, and indexing. For the local codebase, I added permanent redirects for legacy URLs and moved key service content into the initial Blade-rendered HTML."
      }
    ],
    "links": [
      {
        "label": "Visit the public AT Boost website",
        "href": "https://atboost.fr/"
      },
      {
        "label": "View the contact page",
        "href": "https://atboost.fr/contact"
      }
    ],
    "professional": true,
    "coverKind": "screenshot",
    "coverLabel": "Website screenshot · Supplied image",
    "coverWidth": 1582,
    "coverHeight": 915
  },
  {
    "slug": "seo-analytics-dashboard",
    "title": "SEO & Analytics Dashboard",
    "category": "Atirao and AT Boost",
    "description": "A shared dashboard that turns analytics, search, and performance data for two websites into KPI cards, charts, and an action plan.",
    "cover": "/assets/seo-analytics-black.png",
    "caption": "AI-generated illustrative SEO and analytics dashboard. All metrics, trends, and action statuses are fictional demo data, not verified project results.",
    "role": "Developer",
    "context": "Collaborative project",
    "technologies": [
      "Next.js",
      "React",
      "TypeScript",
      "MySQL",
      "GA4 Data API",
      "Google Search Console API",
      "PageSpeed Insights API"
    ],
    "sections": [
      {
        "title": "From measurement to reporting",
        "body": "I collaborated on a dashboard for Atirao and AT Boost. It draws on GA4 for site activity and tracked leads, Search Console for organic search visibility, and PageSpeed Insights for performance diagnostics. KPI cards and charts make those data sources easier to review together."
      },
      {
        "title": "Keeping each website’s data separate",
        "body": "I worked on the site switcher and site-specific reporting. I connected AT Boost to Search Console and GA4, helped isolate its reporting data and caches, and handled empty GA4 responses so the dashboard could render even when a report returned no rows. I checked that the selected website displayed its own data."
      },
      {
        "title": "Tracking across both websites",
        "body": "I implemented data layer events and variables for GTM and GA4. A click on a contact link and a successful form submission capture different actions, so I tracked them separately to give the reporting team a clearer view of confirmed leads."
      },
      {
        "title": "Turning findings into an action plan",
        "body": "I used dashboard findings to help prioritize technical SEO, generative engine optimization (GEO), and performance actions. I worked on indexing checks, redirects, sitemaps, and the rendering of key pages. The dashboard provides the evidence for choosing what to investigate and what to check again after a change."
      }
    ],
    "links": [],
    "professional": true,
    "coverKind": "illustration",
    "coverLabel": "AI-generated mockup · Demo data",
    "coverWidth": 1536,
    "coverHeight": 1024
  },
  {
    "slug": "stockflow",
    "title": "StockFlow",
    "category": "Inventory dashboard",
    "description": "An inventory and sales dashboard for managing products, filtering stock, and reviewing trends.",
    "cover": "/assets/stockflow.webp",
    "caption": "StockFlow dashboard screenshot. Portfolio demonstration; displayed figures are demo data.",
    "role": "Developer",
    "context": "Portfolio project",
    "technologies": [
      "Next.js",
      "Redux Toolkit",
      "Tailwind CSS",
      "JSON Server",
      "Chart.js"
    ],
    "sections": [
      {
        "title": "Product management",
        "body": "I built an interface to add, edit, delete, and filter products. The inventory and sales views give users a place to review records and see summary metrics."
      },
      {
        "title": "State and data visualization",
        "body": "I used Redux Toolkit to manage shared state, JSON Server as a mock API, and Chart.js to turn inventory and sales data into visual summaries. Next.js provides the application structure and Tailwind CSS handles the interface styling."
      }
    ],
    "links": [],
    "professional": false,
    "coverKind": "screenshot",
    "coverLabel": "Project screenshot · Demo data",
    "coverWidth": 1600,
    "coverHeight": 773
  },
  {
    "slug": "beautymatch",
    "title": "BeautyMatch",
    "category": "AI-assisted e-commerce",
    "description": "A cosmetics storefront with an interactive quiz that suggests a skincare routine based on the user’s answers.",
    "cover": "/assets/beautymatch.webp",
    "caption": "BeautyMatch storefront screenshot. Portfolio demonstration; displayed figures are demo data.",
    "role": "Developer",
    "context": "Portfolio project",
    "technologies": [
      "React",
      "Redux Toolkit",
      "Gemini",
      "n8n",
      "Vitest"
    ],
    "sections": [
      {
        "title": "The recommendation flow",
        "body": "I built a quiz that gathers information about the user’s skin and connects those answers to a Gemini recommendation workflow. The storefront presents the resulting routine alongside the product catalog."
      },
      {
        "title": "Fallback and application structure",
        "body": "I added rule-based matching as a fallback so the quiz can still return a recommendation when the AI workflow is unavailable. I used React and Redux Toolkit for the storefront and state, n8n for automation, and Vitest for tests."
      }
    ],
    "links": [
      {
        "label": "Open the BeautyMatch demo",
        "href": "https://beauty-mach.vercel.app/"
      }
    ],
    "professional": false,
    "coverKind": "screenshot",
    "coverLabel": "Project screenshot · Demo data",
    "coverWidth": 1300,
    "coverHeight": 870
  },
  {
    "slug": "aura-sadaqa",
    "title": "Aura-Sadaqa",
    "category": "Document-based AI assistant",
    "description": "A community-support prototype that lets people ask questions about uploaded PDF and Excel documents.",
    "cover": "/assets/aura-sadaqa.webp",
    "caption": "Illustrative demo with a sample document and chat response",
    "role": "Developer",
    "context": "Portfolio project",
    "technologies": [
      "Next.js",
      "Gemini",
      "Pinecone",
      "retrieval-augmented generation"
    ],
    "sections": [
      {
        "title": "Document upload and chat",
        "body": "I built a prototype that combines a document upload flow with a chat interface. Users can submit PDF and Excel files and ask questions about their contents in plain language."
      },
      {
        "title": "Retrieval and answer generation",
        "body": "The prototype uses Pinecone to retrieve relevant material from the uploaded documents and sends that context to Gemini to generate an answer. The Next.js interface connects the upload and chat steps so users can interact with the document collection from one place."
      }
    ],
    "links": [],
    "professional": false,
    "coverKind": "illustration",
    "coverLabel": "Illustrative demo · Sample data",
    "coverWidth": 1600,
    "coverHeight": 719
  }
];
