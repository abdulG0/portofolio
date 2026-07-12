# Portfolio Customization Guide

This file contains all the places you need to update to personalize this portfolio with your own information!

---

## 1. Update Profile Information
**File:** `src/data/profile.ts`

```typescript
export const profileData = {
  name: "Your Name", // Replace with your real name!
  title: "Full-Stack Developer • AI Engineer • Systems Integrator", // Update this to your role
  bio: "From student pilot to full-stack developer and AI engineer...", // Update this bio to your story
  stats: [
    { label: "Launched Projects", value: 3 }, // Change these stats to your own!
    { label: "Industries Served", value: 4 },
    { label: "Technologies", value: 20 },
    { label: "Countries Reached", value: 1 },
  ],
};
```

---

## 2. Update Projects
**File:** `src/data/projects.ts`

Each project in the array should have:
- `id`: Unique identifier for the project (used for translations too!)
- `title`: Project name
- `description`: Detailed description
- `technologies`: Array of tech used
- `github`: Link to GitHub repository
- `liveDemo`: Link to live demo
- `image`: Image URL for project preview
- `results`: Array of results/achievements for this project

```typescript
export const projectsData = [
  {
    id: "darhum",
    title: "Darhum",
    description: "A full-stack property rental marketplace...",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "..."],
    github: "https://github.com/your-username/darhum", // Replace with your GitHub URL!
    liveDemo: "https://darhum.com", // Replace with your real live demo URL!
    image: "https://example.com/your-project-image.jpg", // Replace with your project image!
    results: [
      "Built complete authentication system",
      "...",
    ],
  },
  // ... add/remove projects as needed
];
```

---

## 3. Update Experience
**File:** `src/data/experience.ts`

```typescript
export const experienceData = [
  {
    id: 1,
    period: "2024 — Present",
    position: "Founder & Full-Stack Developer",
    company: "Your Company Name", // Replace with your real company!
    description: "Building end-to-end technology solutions...",
    achievements: [
      "Launched Darhum, a full-stack property rental marketplace",
      // ... add your own achievements!
    ],
  },
  // ... add your other experience entries!
];
```

---

## 4. Update Contact Info
**File:** `src/data/contact.ts`

```typescript
export const contactData = {
  email: "contact@example.com", // Replace with your real email!
  phone: "+1 (555) 123-4567", // Replace with your real phone number!
  location: "San Francisco, CA", // Replace with your real location!
  socials: [
    { name: "LinkedIn", url: "https://linkedin.com/in/your-username", icon: "🔗" }, // Update your social URLs!
    { name: "GitHub", url: "https://github.com/your-username", icon: "💻" },
    // ... add/remove socials as needed!
  ],
};
```

---

## 5. Update Skills
**File:** `src/data/skills.ts`

Add/remove skill categories and skills as needed!

```typescript
export const skillsData = {
  categories: [
    {
      name: "Software Engineering",
      skills: [
        { name: "Next.js", proficiency: 95 },
        // ... add your own skills and proficiency levels!
      ],
    },
    // ... add more skill categories!
  ],
};
```

---

## 6. Update Translations (Optional)
**File:** `src/i18n/translations.ts`

If you want to customize the translations (or add new ones), edit this file! The current languages are:
- English (`en`)
- French (`fr`)
- Arabic (`ar`)

---

## 7. Update Testimonials (Optional)
**File:** `src/data/testimonials.ts` (if it exists)

Add real testimonials from clients, colleagues, etc. here!

---

## 8. Quick Summary of All Files to Modify
| File | Purpose |
|------|---------|
| `src/data/profile.ts` | Personal info, bio, stats |
| `src/data/projects.ts` | Projects portfolio |
| `src/data/experience.ts` | Work experience |
| `src/data/contact.ts` | Contact information & social links |
| `src/data/skills.ts` | Skills & proficiencies |
| `src/i18n/translations.ts` | Translations (if needed) |
| `CUSTOMIZATION.md` | This file! 📄 |

That's all! Happy customizing! 🎉
