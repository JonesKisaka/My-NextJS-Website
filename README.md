# My-NextJS-Website

A modern NextJS portfolio website built with TypeScript and JSX, featuring a beautiful About page showcasing hardware and software projects.

## Features

- NextJS 14.1.0 with App Router
- TypeScript support
- Modern JSX components
- Responsive design
- Beautiful gradient styling
- Dark/Light theme toggle
- ESLint configuration
- Core Web Vitals optimization
- About page with Z-format project layout
- Image carousel support
- Timeline display for projects
- GitHub and LinkedIn link integration

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
app/
├── about/         # About page with project showcase
│   └── page.tsx
├── components/    # Reusable JSX components
│   ├── Description.tsx
│   ├── Footer.tsx
│   ├── Name.tsx
│   ├── Navigation.tsx
│   ├── ProfilePhoto.tsx
│   ├── ThemeToggle.tsx
│   ├── Titles.tsx
│   └── WorkSection.tsx
├── globals.css    # Global styles
├── layout.tsx     # Root layout component
└── page.tsx       # Homepage component

public/
├── jones-kisaka-photo.png
└── placeholder-generator.html  # Tool for generating project images
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint


## Technologies Used

- NextJS 14.1.0
- React 18
- TypeScript 5
- ESLint with Next.js rules
- Google Fonts (Inter)
- CSS Modules
