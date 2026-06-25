'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

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
          <li><Link href="/projects">Projects</Link></li>
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
                <Link href="/projects" className="btn primary">View Projects</Link>
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
              <div className="timeline-date">2025 — 2026</div>
              <h3>Abstract Machines &amp; Ultraviolet</h3>
              <div className="role">Embedded Systems Engineer</div>
              <p>
                Designing IoT hardware and firmware for smart metering and connected
                devices. Building IoT gateways that run on Linux and Zephyr RTOS for smart
                meter applications. Leading the A0 gateway project through multiple board
                revisions, integrating cellular and LPWAN connectivity on RISC-V platforms.
              </p>
            </div>

            <div className="timeline-item reveal">
              <div className="timeline-date">2024</div>
              <h3>BIDCO Africa</h3>
              <div className="role">Electronics &amp; Instrumentation Technician</div>
              <p>
                Assembly of the Bidco Mariandazi Plant in Ruiru, Kenya. Calculated power
                needs for various plant sections and installed the appropriate electrical
                equipment such as circuit breakers and contactors. Routed power cables and
                set up distribution panels for the plant. Troubleshooting and maintenance
                of electrical equipment including motors and power generators.
              </p>
            </div>

            <div className="timeline-item reveal">
              <div className="timeline-date">2023</div>
              <h3>Nakuja Project, JKUAT</h3>
              <div className="role">Avionics System Engineer</div>
              <p>
                Design of the Flight Computer used for a Rocket using the ESP32 as the
                main microcontroller. Design of the Power Distribution Board and Ejection
                Board to support the Pyroejection Mechanism.
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
              <span className="blog-date">2026</span>
              <div>
                <h3>
                  <a href="https://medium.com/abstract-machines-blog/building-the-s0-the-iot-gateway-of-the-future-blog-d708aa1d1c87" target="_blank" rel="noopener noreferrer">
                    Building the S0 — The IoT Gateway of the Future
                  </a>
                </h3>
                <p className="blog-excerpt">
                  The design story behind the S0: rethinking the smart meter gateway from
                  the ground up for a connected, edge-driven IoT future.
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
