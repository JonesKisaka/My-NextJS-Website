# About Page - My Works

This About page showcases your hardware and software projects in a beautiful Z-format layout with timelines and image carousels.

## Features

### 🎯 Z-Format Layout
- Projects are arranged in a Z-pattern (left-right-left-right)
- Each project card alternates between left and right alignment
- Responsive design that stacks vertically on mobile devices

### 🖼️ Image Carousel
- Multiple images per project with smooth transitions
- Navigation arrows and indicator dots
- Auto-fit images with proper aspect ratio
- Touch-friendly controls

### ⏰ Timeline Display
- Each project shows its timeline in a prominent badge
- Timeline is positioned opposite to the project content
- Color-coded with your theme colors

### 🔗 Project Links
- GitHub links for each project
- Styled buttons with hover effects
- Opens in new tab for better UX

### 📱 Responsive Design
- Mobile-first approach
- Adapts to different screen sizes
- Touch-friendly interface

## How to Customize

### 1. Update Project Data
Edit the project arrays in `app/about/page.tsx`:

```typescript
const hardwareProjects = [
  {
    id: 1,
    title: "Your Project Title",
    description: "Your project description...",
    images: ["/your-image-1.jpg", "/your-image-2.jpg"],
    githubLink: "https://github.com/yourusername/your-repo",
    timeline: "2023 - Present"
  }
]
```

### 2. Add Your Images
1. Place your project images in the `public/` folder
2. Update the `images` array in the project data
3. Use descriptive filenames (e.g., `arduino-project-1.jpg`)

### 3. Generate Placeholder Images
If you don't have images yet:
1. Open `public/placeholder-generator.html` in your browser
2. Click the download buttons to generate placeholder images
3. Save the images to your `public/` folder

### 4. Customize Styling
Edit the CSS in `app/globals.css`:
- Colors: Update CSS variables in the `:root` section
- Layout: Modify the `.project-card` classes
- Animations: Adjust transition properties

## File Structure

```
app/
├── about/
│   └── page.tsx          # About page component
├── components/
│   └── WorkSection.tsx   # Work section with Z-layout
└── globals.css           # Styles for About page

public/
├── placeholder-generator.html  # Image generator tool
└── [your-project-images].jpg   # Your project images
```

## Navigation

The About page is accessible via:
- Navigation menu: "About" link
- Direct URL: `/about`

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers
- Progressive enhancement for older browsers

## Performance

- Images are optimized with Next.js Image component
- Lazy loading for better performance
- Minimal JavaScript for smooth interactions 