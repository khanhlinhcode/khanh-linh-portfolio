# Khanh Linh To Portfolio

Personal developer portfolio for **Khanh Linh To**, a Computer Science student focused on full-stack development, blockchain certificate verification, AI applications, and AI-IoT monitoring workflows.

The portfolio is designed for recruiter review and highlights practical engineering projects, technical skills, education, certifications, and contact information.

## Overview

- Role positioning: Junior Software Engineer / Full-stack Developer
- Main focus areas: React, full-stack web development, blockchain verification, AI applications, AI-IoT workflows
- Featured project: CertChain
- Location: Can Tho, Vietnam
- GitHub: https://github.com/khanhlinhcode
- Live portfolio / CertChain demo: https://n-xi-pink.vercel.app/

## Features

- Responsive portfolio layout for desktop, tablet, and mobile
- Sticky premium header with navigation and quick actions
- Dark/light mode with localStorage persistence
- EN/VI language switching with localStorage persistence
- Recruiter-friendly project, skills, education, certification, and contact sections
- CertChain highlighted as the flagship project
- Certificate evidence linked through Google Drive
- CV button is intentionally disabled until a real CV file is available

## Tech Stack

- React
- TypeScript
- Vite
- CSS custom properties
- lucide-react

## Featured Projects

### CertChain

Blockchain certificate verification system for issuing, managing, revoking, and verifying digital certificates by Certificate ID, PDF upload, and QR verification.

- Tech: Solidity, Hardhat, Node.js, Express.js, MongoDB, ethers.js, JWT, IPFS, Next.js, TypeScript, Docker Compose
- GitHub: https://github.com/khanhlinhcode/BlockChain
- Demo: https://n-xi-pink.vercel.app/

### Other Projects

- Farta Market Frontend: https://github.com/khanhlinhcode/Farta_Market
- AI Currency Recognition Backend: https://github.com/khanhlinhcode/Currency_Backend
- Currency Recognition Frontend: https://github.com/khanhlinhcode/Currency_Frontend
- PERN Stack Product Store: https://github.com/khanhlinhcode/PERT-STACK

## Project Structure

```text
src/
  data/
    experience.ts
    profile.ts
    projects.ts
    skills.ts
  hooks/
    useLanguage.ts
    useTheme.ts
  i18n/
    translations.ts
  main.tsx
  styles.css
public/
  favicon.svg
```

## Local Development

```bash
npm install
npm run dev
```

The local development server runs with Vite.

## Production Build

```bash
npm run build
npm run preview
```

Build output is generated in the `dist/` directory.

## Deployment

This project is ready to deploy on Vercel, Netlify, or GitHub Pages after pushing to a GitHub repository.

Recommended build settings:

- Build command: `npm run build`
- Output directory: `dist`
- Framework: Vite

## Git Setup

If this folder is not a git repository yet:

```bash
git init
git add .
git commit -m "Prepare portfolio for production deployment"
git branch -M main
git remote add origin https://github.com/khanhlinhcode/YOUR_REPO_NAME.git
git push -u origin main
```

## Notes

- Do not enable CV download until a real CV PDF is added.
- Certificates are linked through the Google Drive folder shown in the portfolio.
- No fake metrics, company claims, or unverified achievements are included.
