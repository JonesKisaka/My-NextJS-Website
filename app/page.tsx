'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Homepage() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    reveals.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* NAV */}
      <nav>
        <ul>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#writing">Writing</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-text">
              <h2 className="hero-name">Jones Kisaka</h2>
              <div className="hero-tag">Embedded Systems Engineer</div>
              <h1>
                I design the hardware <em>&amp;</em><br />
                write the software<br />
                that runs on it.
              </h1>
              <p className="hero-desc">
                From PCB schematics to kernel drivers — I build connected systems at the
                intersection of hardware and low-level software. Specialising in IoT,
                RISC-V, and wireless communication.
              </p>
              <div className="hero-links">
                <a href="#projects" className="btn primary">View Projects</a>
                <a href="#contact" className="btn">Get in Touch</a>
              </div>
            </div>
            <div className="hero-photo">
              <Image
                src="/jones-kisaka-photo.png"
                alt="Jones Kisaka"
                width={600}
                height={600}
                className="hero-photo-img"
                priority
              />
            </div>
          </div>
        </div>
        <div className="circuit-line" />
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="section-inner">
          <div className="section-label">{'// Featured Work'}</div>
          <h2 className="section-title">Projects</h2>

          <div className="projects-grid">
            <div className="project-card reveal">
              <span className="project-status status-active">Active</span>
              <h3>A0 — Smart Meter Gateway</h3>
              <p>
                A custom-designed Zephyr RTOS-based smart meter gateway built around the
                ESP32-C6, featuring onboard NB-IoT and wireless M-Bus modules for meter
                data collection. Pin-compatible with the BeagleV-Fire development board.
                Paired with the A0 Baseboard — a companion power and expansion board that
                supplies regulated power to the A0 main board, adds Ethernet connectivity,
                an SD card interface for local data logging, and integrates the TSS721ADR
                wired M-Bus module for direct wired meter communication.
              </p>
              <div className="tech-tags">
                <span className="tech-tag">ESP32-C6</span>
                <span className="tech-tag">Zephyr RTOS</span>
                <span className="tech-tag">NB-IoT</span>
                <span className="tech-tag">wM-Bus</span>
                <span className="tech-tag">TSS721ADR</span>
                <span className="tech-tag">Ethernet</span>
                <span className="tech-tag">SD Card</span>
                <span className="tech-tag">KiCad</span>
                <span className="tech-tag">PCB Design</span>
                <span className="tech-tag">Power Management</span>
              </div>
              <div className="card-links">
                <a href="https://github.com/absmach/a0" target="_blank" rel="noopener noreferrer" className="card-link-btn" aria-label="View on GitHub">
                  <GitHubIcon />
                  <span>GitHub</span>
                </a>
                <a href="https://www.linkedin.com/posts/jones-kisaka_iot-edgecomputing-risc-activity-7432077516082798593-1cl0?utm_source=share&utm_medium=member_desktop&rcm=ACoAADYSsncBpDkFmTw0qxqXWAmT_1sK9960V48" target="_blank" rel="noopener noreferrer" className="card-link-btn" aria-label="View on LinkedIn">
                  <LinkedInIcon />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            <div className="project-card reveal">
              <span className="project-status status-active">Active</span>
              <h3>A1 — Linux-Based Smart Meter Gateway</h3>
              <p>
                A1 combines the A0 hardware with the BeagleV-Fire RISC-V SBC, where A0
                acts as a cape — bringing NB-IoT and wireless M-Bus connectivity
                directly to a platform running full-blown Linux. Developed and modified the
                option.ko USB serial driver from source to interface with the SIM7080G
                cellular module on the A0, enabling AT command communication over Python.
                Also achieved WiFi connectivity on the BeagleV-Fire by leveraging the
                ESP-Hosted framework — using the onboard ESP32-C6 on A0 as a wireless
                network dongle to establish a wlan connection on the host.
              </p>
              <div className="tech-tags">
                <span className="tech-tag">BeagleV-Fire</span>
                <span className="tech-tag">RISC-V</span>
                <span className="tech-tag">Linux</span>
                <span className="tech-tag">SIM7080G</span>
                <span className="tech-tag">option.ko</span>
                <span className="tech-tag">ESP-Hosted</span>
                <span className="tech-tag">ESP32-C6</span>
                <span className="tech-tag">NB-IoT</span>
                <span className="tech-tag">wM-Bus</span>
              </div>
              <div className="card-links">
                <a href="https://github.com/absmach/a1" target="_blank" rel="noopener noreferrer" className="card-link-btn" aria-label="View on GitHub">
                  <GitHubIcon />
                  <span>GitHub</span>
                </a>
                <a href="#" className="card-link-btn" aria-label="View on LinkedIn">
                  <LinkedInIcon />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            <div className="project-card reveal project-card--wide">
              <div className="project-card-inner">
                <div className="project-card-text">
                  <span className="project-status status-complete">Complete</span>
                  <h3>Rocket Flight Computer — Nakuja Project</h3>
                  <p>
                    Designed and built two custom flight computers for the Nakuja rocketry
                    project. Both boards feature the ESP32, BMP180 barometric pressure sensor,
                    MPU6050 IMU, GPS, pyrotechnic ejection channels, and onboard power
                    management with LiPo support. The first variant transmits real-time
                    telemetry over WiFi; the second over LoRa at 433 MHz. For the LoRa build,
                    also designed a 433 MHz Yagi-Uda antenna deployed at the ground base
                    station as a directional receiving antenna for long-range telemetry
                    reception. PCB designed in KiCad through multiple revisions.
                  </p>
                  <div className="tech-tags">
                    <span className="tech-tag">ESP32</span>
                    <span className="tech-tag">KiCad</span>
                    <span className="tech-tag">GPS</span>
                    <span className="tech-tag">BMP180</span>
                    <span className="tech-tag">MPU6050</span>
                    <span className="tech-tag">WiFi Telemetry</span>
                    <span className="tech-tag">LoRa 433MHz</span>
                    <span className="tech-tag">Yagi-Uda Antenna</span>
                    <span className="tech-tag">Pyrotechnics</span>
                  </div>
                  <div className="card-links">
                    <a href="#" className="card-link-btn" aria-label="View on GitHub">
                      <GitHubIcon />
                      <span>GitHub</span>
                    </a>
                    <a href="#" className="card-link-btn" aria-label="View on LinkedIn">
                      <LinkedInIcon />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
                <ImageCarousel images={[
                  { src: '/FrontWiFi FC.png', alt: 'WiFi Flight Computer — Front' },
                  { src: '/BackWiFi FC.png',  alt: 'WiFi Flight Computer — Back'  },
                  { src: '/RoutesWiFiFC.png', alt: 'WiFi Flight Computer — PCB Routes' },
                ]} />
              </div>
            </div>

            <div className="project-card reveal">
              <span className="project-status status-complete">Complete</span>
              <h3>Smart Water Meter Data Parser</h3>
              <p>
                Developed a Lua parser capable of decrypting and decoding data from smart
                water meters using AES-128 decryption. Extracts meter readings and
                consumption data from encrypted wM-Bus frames. Meters used include the
                Sharky 774, Axioma, Sontex 566, Supercal 539, and Euris 2.
              </p>
              <div className="tech-tags">
                <span className="tech-tag">Lua</span>
                <span className="tech-tag">AES-128</span>
                <span className="tech-tag">wM-Bus</span>
                <span className="tech-tag">IoT</span>
              </div>
              <div className="card-links">
                <a href="#" className="card-link-btn" aria-label="View on GitHub">
                  <GitHubIcon />
                  <span>GitHub</span>
                </a>
                <a href="#" className="card-link-btn" aria-label="View on LinkedIn">
                  <LinkedInIcon />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ background: 'var(--surface)' }}>
        <div className="section-inner">
          <div className="section-label">{'// Capabilities'}</div>
          <h2 className="section-title">Skills &amp; Tools</h2>

          <div className="skills-grid">
            <div className="skill-group reveal">
              <h3>Hardware Design</h3>
              <SkillRow label="PCB Design (KiCad)" level={5} />
              <SkillRow label="Schematic Capture" level={5} />
              <SkillRow label="Power Supply Design" level={3} />
              <SkillRow label="Signal Integrity" level={3} />
            </div>

            <div className="skill-group reveal">
              <h3>Embedded Software</h3>
              <SkillRow label="C / C++" level={4} />
              <SkillRow label="Linux Kernel / Drivers" level={5} />
              <SkillRow label="Zephyr RTOS" level={5} />
              <SkillRow label="Python" level={4} />
            </div>

            <div className="skill-group reveal">
              <h3>Protocols &amp; Connectivity</h3>
              <SkillRow label="SPI / I²C / UART" level={4} />
              <SkillRow label="LoRa / NB-IoT" level={3} />
              <SkillRow label="WiFi / BLE" level={4} />
              <SkillRow label="wireless M-Bus" level={3} />
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience">
        <div className="section-inner">
          <div className="section-label">{'// Background'}</div>
          <h2 className="section-title">Experience</h2>

          <div className="timeline">
            <div className="timeline-item reveal">
              <div className="timeline-date">2024 — Present</div>
              <h3>Abstract Machines &amp; Ultraviolet</h3>
              <div className="role">Embedded Systems Engineer</div>
              <p>
                Designing IoT hardware and firmware for smart metering and connected
                devices. Leading the A0 gateway project through multiple board revisions,
                integrating cellular and LPWAN connectivity on RISC-V platforms.
              </p>
            </div>

            <div className="timeline-item reveal">
              <div className="timeline-date">2023</div>
              <h3>Final Year Project — University</h3>
              <div className="role">RF &amp; Antenna Design</div>
              <p>
                Designed and characterised a Yagi-Uda antenna optimised for LoRa telemetry.
                Applied antenna theory and RF principles to achieve target gain and
                radiation pattern for long-range wireless communication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WRITING */}
      <section id="writing" style={{ background: 'var(--surface)' }}>
        <div className="section-inner">
          <div className="section-label">{'// Technical Writing'}</div>
          <h2 className="section-title">Blog &amp; Articles</h2>

          <div className="blog-list">
            <div className="blog-entry reveal">
              <span className="blog-date">2025</span>
              <div>
                <h3>
                  <a href="https://www.linkedin.com/in/jones-kisaka" target="_blank" rel="noopener noreferrer">
                    Six Hardware Design Challenges Across A0 Board Revisions
                  </a>
                </h3>
                <p className="blog-excerpt">
                  SPI bus contention, ESP32-C6 bootstrap conflicts, overvoltage protection
                  redesign, and more — lessons from iterating on a production IoT gateway.
                </p>
              </div>
            </div>

            <div className="blog-entry reveal">
              <span className="blog-date">2025</span>
              <div>
                <h3>
                  <a href="https://www.linkedin.com/in/jones-kisaka" target="_blank" rel="noopener noreferrer">
                    Bringing Up a SIM7080G on RISC-V Linux
                  </a>
                </h3>
                <p className="blog-excerpt">
                  USB enumeration, custom kernel modules, and serial debugging across
                  Ubuntu and BeagleV-Fire platforms.
                </p>
              </div>
            </div>

            <div className="blog-entry reveal">
              <span className="blog-date">2025</span>
              <div>
                <h3>
                  <a href="https://www.linkedin.com/in/jones-kisaka" target="_blank" rel="noopener noreferrer">
                    WiFi-to-SLIP Bridge on ESP32-C6 with Zephyr
                  </a>
                </h3>
                <p className="blog-excerpt">
                  Building and porting a network bridge firmware from ESP-IDF to a
                  structured Zephyr RTOS project.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-section">
        <div className="section-inner">
          <div className="section-label">{"// Let's connect"}</div>
          <h2 className="section-title">Contact</h2>

          <div className="contact-grid">
            <div className="contact-item">
              <div className="contact-label">Email</div>
              <a href="mailto:kisakathejones@gmail.com">kisakathejones@gmail.com</a>
            </div>
            <div className="contact-item">
              <div className="contact-label">LinkedIn</div>
              <a
                href="https://www.linkedin.com/in/jones-kisaka"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/jones-kisaka
              </a>
            </div>
            <div className="contact-item">
              <div className="contact-label">GitHub</div>
              <a
                href="https://github.com/JonesKisaka"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/JonesKisaka
              </a>
            </div>
            <div className="contact-item">
              <div className="contact-label">Location</div>
              <span style={{ color: 'var(--text-dim)' }}>Nairobi, Kenya</span>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>&copy; 2026 Jones Kisaka — Built with precision.</p>
      </footer>
    </>
  )
}

function ImageCarousel({ images }: { images: { src: string; alt: string }[] }) {
  const [index, setIndex] = useState(0)
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length)
  const next = () => setIndex((i) => (i + 1) % images.length)
  return (
    <div className="carousel">
      <div className="carousel-img-wrap">
        <Image
          src={images[index].src}
          alt={images[index].alt}
          fill
          className="carousel-img"
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="carousel-controls">
        <button onClick={prev} className="carousel-btn" aria-label="Previous">&#8592;</button>
        <span className="carousel-counter">{index + 1} / {images.length}</span>
        <button onClick={next} className="carousel-btn" aria-label="Next">&#8594;</button>
      </div>
      <p className="carousel-caption">{images[index].alt}</p>
    </div>
  )
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function SkillRow({ label, level }: { label: string; level: number }) {
  return (
    <div className="skill-item">
      {label}
      <div className="skill-level">
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className={`skill-dot${n <= level ? ' filled' : ''}`} />
        ))}
      </div>
    </div>
  )
}
