'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function ProjectsPage() {
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
          <li><Link href="/">Home</Link></li>
          <li><Link href="/projects">Projects</Link></li>
          <li><Link href="/#skills">Skills</Link></li>
          <li><Link href="/#experience">Experience</Link></li>
          <li><Link href="/#writing">Writing</Link></li>
          <li><Link href="/#contact">Contact</Link></li>
        </ul>
      </nav>

      {/* PROJECTS */}
      <section id="projects">
        <div className="section-inner">
          <div className="section-label">{'// Featured Work'}</div>
          <h2 className="section-title">Projects</h2>
          <p className="projects-intro">
            A selection of systems work spanning the Linux device-driver stack, RISC-V board
            bring-up, RTOS firmware, and protocol decoding. The write-ups below focus on the
            kernel-level engineering — device tree, the GPIO and SPI subsystems, interrupt
            routing, and driver instrumentation — rather than the end product.
          </p>

          <div className="projects-grid">
            {/* ── A1 — kernel-heavy showcase ── */}
            <div className="project-card reveal project-card--wide">
              <div className="project-card-inner">
                <div className="project-card-text">
                  <span className="project-status status-active">Active</span>
                  <h3>A1 — Linux-Based Smart Meter Gateway (RISC-V Driver Bring-Up)</h3>
                  <p>
                    Brought a Wi-Fi/BLE network device driver up on a non-reference RISC-V
                    platform: the BeagleV-Fire (Microchip PolarFire SoC). Ported Espressif&apos;s
                    ESP-Hosted driver — which treats an ESP32-C6 as the Linux host&apos;s radio
                    over SPI — from its Raspberry Pi origins to a board with an FPGA-routed SPI
                    bus, landing a real <code>wlan0</code> interface backed by the kernel&apos;s
                    cfg80211 subsystem. Separately patched the in-tree <code>option.ko</code> USB
                    serial driver to bind the SIM7080G cellular modem for NB-IoT.
                  </p>
                  <div className="tech-tags">
                    <span className="tech-tag">Linux Kernel</span>
                    <span className="tech-tag">Device Drivers</span>
                    <span className="tech-tag">Device Tree</span>
                    <span className="tech-tag">SPI Subsystem</span>
                    <span className="tech-tag">GPIO / gpiolib</span>
                    <span className="tech-tag">IRQ Handling</span>
                    <span className="tech-tag">cfg80211</span>
                    <span className="tech-tag">USB Serial (option.ko)</span>
                    <span className="tech-tag">RISC-V</span>
                    <span className="tech-tag">BeagleV-Fire</span>
                    <span className="tech-tag">PolarFire SoC</span>
                  </div>

                  <details className="project-deepdive">
                    <summary>Full Technical Breakdown</summary>
                    <div className="deepdive-body">
                      <h4>Objective</h4>
                      <p>
                        ESP-Hosted lets a Linux host offload its wireless stack to an ESP32,
                        carrying 802.11 frames over SPI with two out-of-band GPIO signals
                        (handshake and data-ready). The driver was written, tested, and
                        documented exclusively against the Raspberry Pi. The goal was a working{' '}
                        <code>wlan0</code> on the BeagleV-Fire that could scan, associate, and
                        route traffic — which meant debugging every layer of the Linux device
                        model on a board the driver had never seen.
                      </p>

                      <h4>Device tree: resolving a chip-select conflict</h4>
                      <p>
                        The first <code>insmod</code> failed with{' '}
                        <code>spi spi0.0: chipselect 0 already in use</code>. The base DTS
                        instantiated a placeholder SPI device (<code>compatible = &quot;rohm,dh2228fv&quot;</code>,
                        the well-known spidev stand-in) that claimed CS0 before the driver&apos;s{' '}
                        <code>spi_new_device()</code> could register its own. The fix was to
                        remove the offending child node from the SPI controller, recompile the
                        DTS with <code>dtc</code>, and install the new DTB — keeping a golden copy
                        aside after one in-place edit dropped the board to a bare U-Boot prompt.
                      </p>
                      <pre className="deepdive-code">{`spi@20108000 {
    compatible = "microchip,mpfs-spi";
    esp32_spi@0 {                      /* ← removed: it squats on CS0 */
        compatible = "rohm,dh2228fv";
        reg = <0>;
    };
};`}</pre>

                      <h4>GPIO subsystem: per-controller line numbering</h4>
                      <p>
                        The driver hard-coded Raspberry Pi BCM numbers (e.g. GPIO 22). On the
                        BeagleV-Fire, gpiolib allocates line numbers dynamically — the six
                        gpiochips start at 512, so GPIO 22 simply does not exist (the request
                        returned <code>-EPROBE_DEFER</code>). I read the live mapping from{' '}
                        <code>/sys/kernel/debug/gpio</code> and remapped the handshake and
                        data-ready signals to the actual line numbers behind the physical header
                        pins.
                      </p>

                      <h4>Interrupt routing: not every gpiochip is IRQ-capable</h4>
                      <p>
                        With valid line numbers the GPIO request succeeded, but requesting an
                        interrupt returned <code>-EINVAL</code>. Cross-referencing{' '}
                        <code>/proc/interrupts</code> showed only the SoC&apos;s MPFS GPIO
                        controller (<code>gpiochip2</code>) registers an interrupt parent; the
                        FPGA-fabric COREGPIO controllers can do level I/O but expose no irqchip.
                        Moving the handshake/data-ready lines onto <code>gpiochip2</code> let{' '}
                        <code>request_irq()</code> succeed — the IRQs then incremented on every
                        ESP transaction.
                      </p>

                      <h4>Driver instrumentation &amp; signal-integrity debugging</h4>
                      <p>
                        The IRQs fired but no netdev registered — the protocol handshake never
                        completed. I instrumented <code>esp_spi_work()</code> with a{' '}
                        <code>print_hex_dump()</code> of the RX buffer right after{' '}
                        <code>spi_sync_transfer()</code>, gated at <code>KERN_ERR</code> so it
                        surfaced regardless of the driver&apos;s verbosity. The dump turned a
                        guessing game into a decision tree: all-<code>0xFF</code> meant MISO was
                        floating; structured-but-corrupted bytes meant a signal-integrity / clock
                        problem rather than a SPI mode mismatch.
                      </p>
                      <pre className="deepdive-code">{`rx: 00000000: ff ff ff ff ff ff ff ff ...   /* MISO floating  */
rx: 00000000: 01 80 00 00 0f 80 06 00 ...   /* framed but corrupt → SI/clock */`}</pre>

                      <h4>SPI clock negotiation in the driver</h4>
                      <p>
                        At the ESP-Hosted default of 10 MHz the flying-lead wiring mis-sampled
                        bits; worse, the ESP firmware renegotiates the bus up to 26 MHz mid-boot,
                        which the wiring could not sustain — the interface-init command timed out
                        every time. I patched <code>adjust_spi_clock()</code> to clamp any
                        requested rate to a value the link could actually hold, refusing the
                        renegotiation rather than complying with it.
                      </p>
                      <pre className="deepdive-code">{`static void adjust_spi_clock(u8 spi_clk_mhz)
{
    if (spi_clk_mhz > SPI_INITIAL_CLK_MHZ)   /* refuse the 26 MHz bump */
        spi_clk_mhz = SPI_INITIAL_CLK_MHZ;
    ...
    spi_context.esp_spi_dev->max_speed_hz = spi_clk_mhz * NUMBER_1M;
}`}</pre>

                      <h4>USB serial: patching option.ko for the SIM7080G</h4>
                      <p>
                        For the cellular side I built the in-tree <code>option</code> USB serial
                        driver from source and modified it to claim the SIM7080G modem&apos;s
                        interfaces, exposing the AT-command <code>ttyUSB</code> ports so NB-IoT
                        sessions could be driven from Python on the host.
                      </p>

                      <h4>Result</h4>
                      <p>
                        After capping the clock the boot sequence completed and <code>wlan0</code>{' '}
                        registered with the ESP32-C6&apos;s MAC. With <code>eth0</code> forced
                        down, <code>ping</code> returned steady replies — every packet travelling
                        host → SPI → ESP32-C6 → Wi-Fi. The full path was exercised end to end,
                        from the cfg80211 wireless subsystem down to bit timing on the physical
                        wire.
                      </p>
                    </div>
                  </details>

                  <div className="card-links">
                    <a href="https://github.com/absmach/a1" target="_blank" rel="noopener noreferrer" className="card-link-btn" aria-label="View on GitHub">
                      <GitHubIcon />
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>
                <ImageCarousel images={[
                  { src: '/a0.png',     alt: 'A0 Cape' },
                  { src: '/beagle.png', alt: 'BeagleV-Fire' },
                ]} />
              </div>
            </div>

            {/* ── A0 ── */}
            <div className="project-card reveal project-card--wide">
              <div className="project-card-inner">
                <div className="project-card-text">
                  <span className="project-status status-active">Active</span>
                  <h3>A0 — ZephyrOS-based Smart Meter Gateway</h3>
                  <p>
                    A custom-designed Zephyr RTOS-based smart meter gateway built around the
                    ESP32-C6, with onboard NB-IoT and wireless M-Bus modules for meter data
                    collection, pin-compatible with the BeagleV-Fire so it can also act as the
                    A1 cape. Paired with the A0 Baseboard, which supplies regulated power, adds
                    Ethernet and an SD-card interface for local logging, and integrates the
                    TSS721ADR wired M-Bus transceiver.
                  </p>
                  <div className="tech-tags">
                    <span className="tech-tag">Zephyr RTOS</span>
                    <span className="tech-tag">Devicetree</span>
                    <span className="tech-tag">Kconfig</span>
                    <span className="tech-tag">Driver Bindings</span>
                    <span className="tech-tag">ESP32-C6</span>
                    <span className="tech-tag">NB-IoT</span>
                    <span className="tech-tag">wM-Bus</span>
                    <span className="tech-tag">TSS721ADR</span>
                    <span className="tech-tag">KiCad</span>
                    <span className="tech-tag">PCB Design</span>
                  </div>

                  <details className="project-deepdive">
                    <summary>Full Technical Breakdown</summary>
                    <div className="deepdive-body">
                      <h4>Why it matters for kernel work</h4>
                      <p>
                        Zephyr shares the same configuration idioms as the upstream Linux kernel —
                        a devicetree describes the hardware, Kconfig gates the build, and
                        peripherals are reached through subsystem driver APIs. A0 was a ground-up
                        board where I owned both the schematic and the firmware, which meant
                        writing the devicetree overlays and binding the on-board peripherals to
                        their drivers rather than inheriting a working board definition.
                      </p>
                      <h4>Hardware &amp; integration</h4>
                      <p>
                        Designed the main board and companion baseboard in KiCad: regulated power
                        rails, an ESP32-C6 host, NB-IoT and wireless M-Bus radios, the TSS721ADR
                        wired M-Bus front end, Ethernet, and an SD-card slot for local logging.
                        The board is deliberately pin-compatible with the BeagleV-Fire so the
                        same hardware doubles as the A1 Linux cape — one PCB feeding two software
                        stacks (Zephyr on A0, Linux on A1).
                      </p>
                      <h4>Firmware</h4>
                      <p>
                        Brought up the peripherals under Zephyr: configuring buses in devicetree,
                        enabling the relevant subsystems through Kconfig, and wiring the metering
                        radios into the data path so collected readings could be forwarded
                        upstream over NB-IoT.
                      </p>
                    </div>
                  </details>

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
                <ImageCarousel images={[
                  { src: '/a0_anim.png',   alt: 'A0 Main Board — 3D Render' },
                  { src: '/a0.png',        alt: 'A0 Main Board' },
                  { src: '/baseboard.png', alt: 'A0 Baseboard' },
                ]} />
              </div>
            </div>

            {/* ── Flight Computer ── */}
            <div className="project-card reveal project-card--wide">
              <div className="project-card-inner">
                <div className="project-card-text">
                  <span className="project-status status-complete">Complete</span>
                  <h3>Rocket Flight Computer — Nakuja Project</h3>
                  <p>
                    Designed and built two custom flight computers for the Nakuja rocketry
                    project. Both feature the ESP32 with a BMP180 barometer, MPU6050 IMU, GPS,
                    pyrotechnic ejection channels, and LiPo power management. The first variant
                    transmits real-time telemetry over WiFi, the second over LoRa at 433 MHz —
                    for which I also designed a 433 MHz Yagi-Uda antenna for the ground station.
                  </p>
                  <div className="tech-tags">
                    <span className="tech-tag">Embedded C/C++</span>
                    <span className="tech-tag">I²C / SPI Sensors</span>
                    <span className="tech-tag">Real-Time Telemetry</span>
                    <span className="tech-tag">ESP32</span>
                    <span className="tech-tag">LoRa 433MHz</span>
                    <span className="tech-tag">Yagi-Uda Antenna</span>
                    <span className="tech-tag">KiCad</span>
                    <span className="tech-tag">Pyrotechnics</span>
                  </div>

                  <details className="project-deepdive">
                    <summary>Full Technical Breakdown</summary>
                    <div className="deepdive-body">
                      <h4>Low-level systems relevance</h4>
                      <p>
                        The flight computer is bare-metal-adjacent embedded work: integrating
                        multiple sensors over I²C and SPI, servicing them within a real-time
                        budget, and moving sampled data off-board reliably under vibration and
                        power transients. It is where I first worked directly against peripheral
                        registers and timing constraints — the same instincts that later carried
                        into driver debugging.
                      </p>
                      <h4>What I built</h4>
                      <p>
                        Two PCB revisions in KiCad carrying an ESP32, BMP180 barometric sensor,
                        MPU6050 IMU, and GPS, plus a power-distribution and ejection board driving
                        the pyrotechnic recovery channels off LiPo power. One build streamed
                        telemetry over WiFi; the other over a 433 MHz LoRa link, paired with a
                        directional Yagi-Uda antenna I designed for long-range reception at the
                        ground base station.
                      </p>
                    </div>
                  </details>

                  <div className="card-links">
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

            {/* ── Lua parser ── */}
            <div className="project-card reveal">
              <span className="project-status status-complete">Complete</span>
              <h3>Smart Water Meter Data Parser</h3>
              <p>
                A Lua parser that decrypts and decodes encrypted wireless M-Bus frames from smart
                water meters using AES-128, extracting meter readings and consumption data.
                Validated against the Sharky 774, Axioma, Sontex 566, Supercal 539, and Euris 2.
              </p>
              <div className="tech-tags">
                <span className="tech-tag">Binary Protocol Decode</span>
                <span className="tech-tag">AES-128</span>
                <span className="tech-tag">wM-Bus</span>
                <span className="tech-tag">Lua</span>
              </div>

              <details className="project-deepdive">
                <summary>Full Technical Breakdown</summary>
                <div className="deepdive-body">
                  <h4>Relevance</h4>
                  <p>
                    Decoding wireless M-Bus is exactly the kind of byte-exact, spec-driven binary
                    parsing that the receive path of a device driver demands: walking a framed
                    wire format field by field, decrypting the payload with AES-128, and rejecting
                    malformed frames rather than trusting their length headers. The driver work on
                    A1 — where corrupted SPI frames had to be told apart from valid ones by their
                    byte signature — drew on the same discipline.
                  </p>
                  <h4>What it does</h4>
                  <p>
                    Parses encrypted wM-Bus telegrams from a range of commercial meters, performs
                    AES-128 decryption, and extracts consumption readings into a normalised form.
                    Tested across five meter families with differing frame layouts.
                  </p>
                </div>
              </details>

              <div className="card-links">
                <a href="https://github.com/absmach/wmbus" target="_blank" rel="noopener noreferrer" className="card-link-btn" aria-label="View on GitHub">
                  <GitHubIcon />
                  <span>GitHub</span>
                </a>
              </div>
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
