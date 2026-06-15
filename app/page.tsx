'use client'

import { useEffect } from 'react'
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
                A custom-designed smart meter gateway board featuring ESP32-C6, LoRa,
                NB-IoT, and wireless M-Bus modules. Pin-compatible with the BeagleV-Fire
                development board. Iterated through multiple revisions solving SPI bus
                contention, bootstrap pin conflicts, and overvoltage protection. Includes
                a companion baseboard providing power regulation, debug interfaces, and
                connectivity expansion for seamless development and testing workflows.
              </p>
              <div className="tech-tags">
                <span className="tech-tag">ESP32-C6</span>
                <span className="tech-tag">LoRa</span>
                <span className="tech-tag">NB-IoT</span>
                <span className="tech-tag">wM-Bus</span>
                <span className="tech-tag">KiCad</span>
                <span className="tech-tag">BeagleV-Fire</span>
                <span className="tech-tag">PCB Design</span>
                <span className="tech-tag">Power Management</span>
                <span className="tech-tag">RISC-V</span>
              </div>
            </div>

            <div className="project-card reveal">
              <span className="project-status status-complete">Complete</span>
              <h3>SIM7080G Cellular Integration</h3>
              <p>
                Bringing up the SIM7080G NB-IoT/Cat-M cellular module across multiple Linux
                platforms. Includes custom kernel driver development (option.ko), USB
                enumeration debugging, UART interfacing, and AT command scripting.
              </p>
              <div className="tech-tags">
                <span className="tech-tag">SIM7080G</span>
                <span className="tech-tag">Linux Kernel</span>
                <span className="tech-tag">UART</span>
                <span className="tech-tag">Python</span>
                <span className="tech-tag">AT Commands</span>
              </div>
            </div>

            <div className="project-card reveal">
              <span className="project-status status-complete">Complete</span>
              <h3>Rocket Flight Computer — Avionics System</h3>
              <p>
                Designed and built a flight computer for a rocket project using ESP32.
                Integrated GPS, BMP180 barometric pressure, and MPU6050 IMU sensors.
                Developed real-time data logging and telemetry over LoRa.
              </p>
              <div className="tech-tags">
                <span className="tech-tag">ESP32</span>
                <span className="tech-tag">GPS</span>
                <span className="tech-tag">IMU</span>
                <span className="tech-tag">LoRa</span>
                <span className="tech-tag">KiCad</span>
              </div>
            </div>

            <div className="project-card reveal">
              <span className="project-status status-complete">Complete</span>
              <h3>ESP-Hosted SPI Bridge</h3>
              <p>
                Integrated ESP32 as a wireless coprocessor to a BeagleV-Fire host over SPI
                using the ESP-Hosted framework. Also developed a WiFi-to-SLIP bridge
                firmware for ESP32-C6, later ported to a structured Zephyr RTOS project.
              </p>
              <div className="tech-tags">
                <span className="tech-tag">ESP-Hosted</span>
                <span className="tech-tag">SPI</span>
                <span className="tech-tag">Zephyr RTOS</span>
                <span className="tech-tag">SLIP</span>
                <span className="tech-tag">WiFi</span>
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
