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

## About Page Features

The About page showcases your projects in a beautiful Z-format layout:

### 🎯 Z-Format Layout
- Projects alternate between left and right alignment
- Timeline badges positioned opposite to project content
- Responsive design that stacks vertically on mobile

### 🖼️ Image Carousel
- Multiple images per project with smooth transitions
- Navigation arrows and indicator dots
- Auto-fit images with proper aspect ratio
- Touch-friendly controls

### ⏰ Timeline Display
- Each project shows its timeline in a prominent badge
- Color-coded with theme colors
- Professional presentation of project dates

### 🔗 Project Links
- GitHub repository links with GitHub icon
- LinkedIn post links with LinkedIn icon
- Conditional display (no links shown for projects without them)
- Opens in new tab for better UX

### 📱 Responsive Design
- Mobile-first approach
- Adapts to different screen sizes
- Touch-friendly interface

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Customization

### Adding Project Images
1. Place your project images in the `public/` folder
2. Update the `images` array in the project data
3. Use descriptive filenames (e.g., `arduino-project-1.jpg`)

### Generating Placeholder Images
If you don't have images yet:
1. Open `public/placeholder-generator.html` in your browser
2. Click the download buttons to generate placeholder images
3. Save the images to your `public/` folder

### Updating Project Data
Edit the project arrays in `app/about/page.tsx`:
```typescript
{
  id: 1,
  title: "Your Project Title",
  description: "Your project description...",
  images: ["/your-image-1.jpg", "/your-image-2.jpg"],
  githubLink: "https://github.com/yourusername/your-repo",
  linkType: "github", // or "linkedin" or "none"
  timeline: "2023"
}
```

## Technologies Used

- NextJS 14.1.0
- React 18
- TypeScript 5
- ESLint with Next.js rules
- Google Fonts (Inter)
- CSS Modules

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome! 
