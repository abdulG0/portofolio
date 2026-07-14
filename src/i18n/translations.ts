const translations: Record<string, any> = {
  en: {
    nav: { home: "Home", about: "About", experience: "Experience", projects: "Projects", cv: "CV", contact: "Contact" },
    hero: { navigationHub: "Navigation Hub", explore: "Explore the site through a continuous circular menu." },
    cv: {
      eyebrow: "CV",
      title: "A separate resume page with a PDF download.",
      description: "This page keeps the resume function focused. Visitors can read a concise summary here or download the generated PDF.",
      download: "Download CV PDF",
      preparing: "Preparing PDF...",
      profile: "Profile",
      summary: "Professional Summary",
      email: "Email",
      phone: "Phone",
      location: "Location",
      included: "Included in the PDF",
      experience: "Experience",
      projects: "Selected Projects",
      skills: "Skills",
      links: "Links",
      stack: "Stack",
      results: "Results",
    },
    footer: { copyright: "Structured portfolio with separate pages" },
    about: { title: "Profile, strengths and skills", description: "This page focuses on background and capabilities for readable content.", skillsLabel: "Skills", skillsTitle: "Core capability groups." },
    profile: { name: "Abdullah Sokhona", title: "Technology Solutions Engineer • Full-Stack Software Engineer • AI Developer", bio: "Technology Solutions Engineer, Full-Stack Software Engineer & AI Developer with experience designing and delivering end-to-end digital solutions for startups, businesses, and public organizations. Skilled in building scalable web applications, AI-powered systems, SaaS platforms, marketplaces, business management software, enterprise dashboards, and secure payment integrations.\n\nPassionate about solving real-world challenges through technology by transforming ideas into reliable, production-ready solutions. Comfortable contributing across the entire project lifecycle—from solution design and software development to technical consulting, system integration, and project delivery. Open to multidisciplinary projects that combine software, automation, digital transformation, and technology-driven innovation.", stats: ["Launched Projects", "Industries Served", "Technologies", "Countries Reached"] },
    experience: {
      title: "Professional experience",
      description: "This section separates timeline and outcomes for focused reading.",
      items: {
        1: { company: "Independent Technology Solutions", position: "Founder & Full-Stack Developer", period: "2024 — Present", description: "Building end-to-end technology solutions—from web platforms and AI applications to connected hardware and network infrastructure—for government, healthcare, education, and private organizations.", achievements: ["Launched Darhum, a full-stack property rental marketplace", "Developed BlogLaunch, a self-service blogging platform", "Built AI PreCheck, an AI-powered healthcare pre-assessment tool"] },
        2: { company: "Le Wagon Coding Bootcamp", position: "Student", period: "2023 — 2024", description: "Intensive full-time bootcamp where I mastered full-stack web development and artificial intelligence, building real-world projects from day one.", achievements: ["Learned full-stack web development", "Mastered artificial intelligence and machine learning", "Built multiple production-ready applications"] },
        3: { company: "Flight Training School", position: "Student Pilot", period: "2022 — 2024", description: "Trained as a student pilot, developing skills in precision, decision-making, systems thinking, and project management that I bring to my work in technology.", achievements: ["Completed flight training hours", "Mastered aviation systems and procedures", "Developed strong safety and risk management skills"] },
      },
    },
    projects: {
      title: "Projects",
      description: "Work and case studies organized for easy reading.",
      itemPrefix: "Project",
      github: "GitHub",
      liveDemo: "Live Demo",
      items: {
        darhum: { title: "Darhum", description: "A full-stack property rental marketplace where property owners can list accommodations, users can discover and book properties, and individuals can manage listings and payments.", technologies: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"], results: ["Built complete authentication system", "Integrated payment processing", "Developed responsive property search interface"] },
        bloglaunch: { title: "BlogLaunch", description: "A self-service blogging platform that enables users to create, manage, and publish their own blogs without requiring technical expertise.", technologies: ["Next.js", "React", "Node.js", "MongoDB"], results: ["Created intuitive blog management dashboard", "Implemented rich text editor", "Built SEO optimization features"] },
        "ai-precheck": { title: "AI PreCheck", description: "An AI-powered healthcare pre-assessment platform that allows patients to describe their symptoms before seeing a clinician, assisting medical professionals with triage.", technologies: ["Next.js", "TypeScript", "OpenAI API", "PostgreSQL"], results: ["Integrated LLM for symptom analysis", "Built patient workflow system", "Created clinician dashboard"] },
      },
    },
    skills: {
      categories: [
        {
          name: "Software Engineering",
          skills: [
            "Next.js",
            "TypeScript",
            "React",
            "Node.js",
            "Database Design",
          ],
        },
        {
          name: "Artificial Intelligence",
          skills: [
            "AI/ML",
            "Conversational AI",
            "Workflow Automation",
            "LLMs",
          ],
        },
        {
          name: "Systems Integration",
          skills: [
            "IoT",
            "Hardware-Software Integration",
            "Networking",
            "Payment Systems",
          ],
        },
        {
          name: "Cloud & DevOps",
          skills: [
            "Cloud Deployment",
            "Docker",
            "CI/CD",
            "Security",
          ],
        },
        {
          name: "Business & Consulting",
          skills: [
            "Digital Strategy",
            "Process Automation",
            "Technology Assessment",
            "Project Management",
          ],
        },
      ],
    },
    contact: { title: "Contact", description: "Contact details to reach out quickly.", email: "Email", phone: "Phone", location: "Location", links: "Links", socials: { LinkedIn: "LinkedIn", GitHub: "GitHub", X: "X", WhatsApp: "WhatsApp" } },
  },
  fr: {
    nav: { home: "Accueil", about: "À propos", experience: "Expérience", projects: "Projets", cv: "CV", contact: "Contact" },
    hero: { navigationHub: "Centre de navigation", explore: "Explorez le site via un menu circulaire continu." },
    cv: { eyebrow: "CV", title: "Une page CV séparée avec téléchargement PDF.", description: "Cette page garde la fonction CV focalisée. Les visiteurs peuvent lire un résumé ou télécharger le PDF généré.", download: "Télécharger le CV en PDF", preparing: "Préparation du PDF...", profile: "Profil", summary: "Résumé professionnel", email: "E-mail", phone: "Téléphone", location: "Localisation", included: "Inclus dans le PDF", experience: "Expérience", projects: "Projets sélectionnés", skills: "Compétences", links: "Liens", stack: "Pile technologique", results: "Résultats" },
    footer: { copyright: "Portfolio structuré avec pages séparées" },
    profile: { name: "Abdullah Sokhona", title: "Ingénieur en solutions technologiques • Ingénieur logiciel complet • Développeur IA", bio: "Ingénieur en solutions technologiques, ingénieur logiciel complet et développeur IA avec expérience dans la conception et la fourniture de solutions numériques de bout en bout pour les startups, les entreprises et les organisations publiques.", stats: ["Projets lancés", "Secteurs servis", "Technologies", "Pays atteints"] },
    experience: { title: "Expérience professionnelle", description: "Cette section sépare la chronologie et les résultats pour une lecture concentrée.", items: { 1: { company: "Solutions technologiques indépendantes", position: "Fondateur et développeur complet", period: "2024 — Présent", description: "Construction de solutions technologiques de bout en bout...", achievements: ["Lancement de Darhum, une marketplace de location de propriétés", "Développement de BlogLaunch, une plateforme de blogging en libre-service", "Construction d'AI PreCheck, un outil de pré-évaluation sanitaire alimenté par l'IA"] }, 2: { company: "Bootcamp de codage Le Wagon", position: "Étudiant", period: "2023 — 2024", description: "Bootcamp à temps plein intensif...", achievements: ["Apprentissage du développement web complet", "Maîtrise de l'IA et de l'apprentissage automatique", "Construction de plusieurs applications prêtes pour la production"] }, 3: { company: "École de formation au pilotage", position: "Pilote étudiant", period: "2022 — 2024", description: "Formation de pilote étudiant...", achievements: ["Accomplissement des heures de formation au vol", "Maîtrise des systèmes et procédures d'aviation", "Développement de fortes compétences en gestion de la sécurité et des risques"] } } },
    projects: { title: "Projets", description: "Travail et études de cas organisés pour une lecture conviviale.", itemPrefix: "Projet", github: "GitHub", liveDemo: "Démo en direct", items: { darhum: { title: "Darhum", description: "Une marketplace de location de propriétés complète...", technologies: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"], results: ["Système d'authentification complet", "Intégration du traitement des paiements", "Interface de recherche de propriété réactive"] }, bloglaunch: { title: "BlogLaunch", description: "Une plateforme de blogging en libre-service...", technologies: ["Next.js", "React", "Node.js", "MongoDB"], results: ["Tableau de bord de gestion de blog intuitif", "Éditeur de texte enrichi", "Fonctionnalités d'optimisation SEO"] }, "ai-precheck": { title: "AI PreCheck", description: "Une plateforme de pré-évaluation sanitaire alimentée par l'IA...", technologies: ["Next.js", "TypeScript", "OpenAI API", "PostgreSQL"], results: ["Intégration du LLM pour l'analyse des symptômes", "Système de flux de travail des patients", "Tableau de bord des cliniciens"] } } },
    skills: { categories: [ { name: "Ingénierie logicielle", skills: ["Next.js", "TypeScript", "React", "Node.js", "Conception de bases de données"] }, { name: "Intelligence artificielle", skills: ["IA/ML", "IA conversationnelle", "Automatisation des flux de travail", "LLMs"] }, { name: "Intégration de systèmes", skills: ["IoT", "Intégration matériel-logiciel", "Réseautique", "Systèmes de paiement"] }, { name: "Cloud et DevOps", skills: ["Déploiement cloud", "Docker", "CI/CD", "Sécurité"] }, { name: "Affaires et consultation", skills: ["Stratégie numérique", "Automatisation des processus", "Évaluation technologique", "Gestion de projet"] } ] },
    contact: { title: "Contact", description: "Informations de contact pour se connecter rapidement.", email: "E-mail", phone: "Téléphone", location: "Localisation", links: "Liens", socials: { LinkedIn: "LinkedIn", GitHub: "GitHub", X: "X", WhatsApp: "WhatsApp" } },
  },
  ar: {
    nav: { home: "الرئيسية", about: "من أنا", experience: "الخبرة", projects: "المشاريع", cv: "السيرة الذاتية", contact: "تواصل" },
    hero: { navigationHub: "مركز التنقل", explore: "استكشف الموقع عبر قائمة دائرية مستمرة." },
    cv: { eyebrow: "السيرة الذاتية", title: "صفحة سيرة ذاتية منفصلة مع تحميل PDF.", description: "تحافظ هذه الصفحة على تركيز وظيفة السيرة الذاتية. يمكن للزوار قراءة ملخص أو تحميل ملف PDF المُنشأ.", download: "تحميل ملف السيرة الذاتية بصيغة PDF", preparing: "جاري تحضير ملف PDF...", profile: "الملف الشخصي", summary: "الملخص المهني", email: "البريد الإلكتروني", phone: "الهاتف", location: "الموقع", included: "المضمن في ملف PDF", experience: "الخبرة", projects: "المشاريع المختارة", skills: "المهارات", links: "الروابط", stack: "المكدس التقني", results: "النتائج" },
    footer: { copyright: "محفظة منظمة مع صفحات منفصلة" },
    profile: { name: "عبد الله سوخونا", title: "مهندس حلول تكنولوجية • مهندس برمجيات كامل المكدس • مطور ذكاء اصطناعي", bio: "مهندس حلو�� تكنولوجية ومهندس برمجيات كامل المكدس ومطور ذكاء اصطناعي بخبرة في تصميم وتقديم حلول رقمية شاملة للشركات الناشئة والمؤسسات والمنظمات العامة.", stats: ["المشاريع المنجزة", "الصناعات المخدومة", "التقنيات", "الدول الموصلة"] },
    experience: { title: "الخبرة المهنية", description: "يفصل هذا القسم بين الجدول الزمني والنتائج للقراءة المركزة.", items: { 1: { company: "حلول تكنولوجية مستقلة", position: "مؤسس ومطور برمجيات كامل المكدس", period: "2024 — الآن", description: "بناء حلول تكنولوجية شاملة...", achievements: ["إطلاق Darhum، سوق تأجير العقارات الكامل المكدس", "تطوير BlogLaunch، منصة تدوين ذاتية الخدمة", "بناء AI PreCheck، أداة التقييم المسبق الصحي التي تعمل بالذكاء الاصطناعي"] }, 2: { company: "معسكر Le Wagon للترميز", position: "طالب", period: "2023 — 2024", description: "معسكر مكثف بدوام كامل...", achievements: ["تعلم تطوير الويب كامل المكدس", "إتقان الذكاء الاصطناعي والتعلم الآلي", "بناء عدة تطبيقات جاهزة للإنتاج"] }, 3: { company: "مدرسة تدريب الطيران", position: "طالب طيار", period: "2022 — 2024", description: "التدريب كطالب طيار...", achievements: ["إكمال ساعات التدريب على الطيران", "إتقان أنظمة وإجراءات الطيران", "تطوير مهارات قوية في إدارة السلامة والمخاطر"] } } },
    projects: { title: "المشاريع", description: "الأعمال ودراسات الحالة منظمة لقراءة سهلة.", itemPrefix: "مشروع", github: "جيت هاب", liveDemo: "عرض توضيحي مباشر", items: { darhum: { title: "Darhum", description: "سوق تأجير العقارات كامل المكدس...", technologies: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"], results: ["نظام مصادقة كامل", "دمج معالجة الدفع", "واجهة بحث العقارات سريعة الاستجابة"] }, bloglaunch: { title: "BlogLaunch", description: "منصة تدوين ذاتية الخدمة...", technologies: ["Next.js", "React", "Node.js", "MongoDB"], results: ["لوحة معلومات إدارة المدونة البديهية", "محرر النصوص الغنية", "ميزات تحسين محرك البحث"] }, "ai-precheck": { title: "AI PreCheck", description: "منصة التقييم المسبق الصحي التي تعمل بالذكاء الاصطناعي...", technologies: ["Next.js", "TypeScript", "OpenAI API", "PostgreSQL"], results: ["دمج LLM لتحليل الأعراض", "نظام سير العمل للمرضى", "لوحة معلومات الممارسين الطبيين"] } } },
    skills: { categories: [ { name: "الهندسة البرمجية", skills: ["Next.js", "TypeScript", "React", "Node.js", "تصميم قواعد البيانات"] }, { name: "الذكاء الاصطناعي", skills: ["الذكاء الاصطناعي والتعلم الآلي", "الذكاء الاصطناعي المحادثي", "أتمتة سير العمل", "نماذج اللغات الكبيرة"] }, { name: "تكامل الأنظمة", skills: ["إنترنت الأشياء", "تكامل الأجهزة والبرمجيات", "الشبكات", "أنظمة الدفع"] }, { name: "السحابة و DevOps", skills: ["نشر السحابة", "Docker", "CI/CD", "الأمان"] }, { name: "الأعمال والاستشارات", skills: ["الاستراتيجية الرقمية", "أتمتة العمليات", "تقييم التكنولوجيا", "إدارة المشاريع"] } ] },
    contact: { title: "تواصل معنا", description: "معلومات الاتصال للوصول بسرعة.", email: "البريد الإلكتروني", phone: "الهاتف", location: "الموقع", links: "الروابط", socials: { LinkedIn: "LinkedIn", GitHub: "GitHub", X: "X", WhatsApp: "WhatsApp" } },
  },
};

export default translations;
