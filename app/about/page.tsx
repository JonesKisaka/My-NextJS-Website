'use client'

import { useState, useEffect } from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import WorkSection from '../components/WorkSection'

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState<'hardware' | 'software'>('hardware')
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Sync with the theme system
    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark')
      setIsDark(isDarkMode)
    }

    // Check initial theme
    checkTheme()

    // Listen for theme changes
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }, [])

  const hardwareProjects = [
    {
      id: 1,
      title: "Yagi-Uda Antenna Design for LoRA Telemetry System",
      description: "Final year project (2023) focused on designing and implementing a Yagi-Uda antenna specifically optimized for LoRA (Long Range) telemetry systems. This project involved antenna theory, RF design principles, and practical implementation for long-range wireless communication applications.",
      images: [],
      githubLink: "https://github.com/JonesKisaka/Yagi-Designs",
      linkType: "none" as const,
      timeline: "2023"
    },
            {
          id: 2,
          title: "Rocket Flight Computer - Avionics System",
          description: "Designed and implemented a comprehensive flight computer for a rocket project using ESP32 microcontroller. Integrated multiple sensors including GPS module, BMP180 barometric pressure sensor, and MPU6050 accelerometer/gyroscope. Enhanced skills in embedded systems, sensor integration, and real-time data processing for aerospace applications.",
          images: [
            "/RoutesWiFiFC.png",
            "/FrontWiFi FC.png", 
            "/BackWiFi FC.png"
          ],
          githubLink: "https://www.linkedin.com/posts/jones-kisaka_from-the-archives-i-had-the-incredible-opportunity-activity-7221229741117173761-e0X7?utm_source=share&utm_medium=member_android&rcm=ACoAADYSsncBpDkFmTw0qxqXWAmT_1sK9960V48",
          linkType: "linkedin" as const,
          timeline: "2023"
        }
  ]

  const softwareProjects = [
    {
      id: 1,
      title: "Smart Water Meter Data Parser",
      description: "Developed a sophisticated parser in Lua capable of decrypting and decoding data from smart water meters. Implemented AES-128 decryption algorithms to securely extract meter readings and consumption data. This project demonstrates expertise in embedded systems programming, cryptographic protocols, and data parsing for IoT devices.",
      images: [],
      githubLink: "",
      linkType: "none" as const,
      timeline: "2025"
    },
    {
      id: 2,
      title: "Personal Portfolio Website",
      description: "Built a modern, responsive portfolio website using Next.js and TypeScript. Features include dynamic content, smooth animations, dark/light theme toggle, and optimal performance. Successfully deployed and hosted on Vercel with continuous integration and automatic deployments.",
      images: [],
      githubLink: "https://github.com/JonesKisaka/My-NextJS-Website",
      linkType: "github" as const,
      timeline: "2025"
    }
  ]

  return (
    <div className="about-page">
      <Navigation />
      <main className="about-main">
        <div className="about-header">
          <h1 className="about-title">My Works</h1>
          <p className="about-subtitle">Exploring the intersection of hardware and software engineering</p>
          
          <div className="section-tabs">
            <button 
              className={`tab-button ${activeSection === 'hardware' ? 'active' : ''}`}
              onClick={() => setActiveSection('hardware')}
            >
              Hardware Projects
            </button>
            <button 
              className={`tab-button ${activeSection === 'software' ? 'active' : ''}`}
              onClick={() => setActiveSection('software')}
            >
              Software Projects
            </button>
          </div>
        </div>

        <div className="works-container">
          {activeSection === 'hardware' && (
            <WorkSection 
              projects={hardwareProjects}
              sectionType="hardware"
            />
          )}
          {activeSection === 'software' && (
            <WorkSection 
              projects={softwareProjects}
              sectionType="software"
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
} 