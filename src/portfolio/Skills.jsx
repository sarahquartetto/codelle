import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'

import javascriptIcon from '../assets/web dev icons/javascript-logo-javascript-icon-transparent-free-png.webp'
import wordpressIcon from '../assets/web dev icons/wordpress.png'
import reactIcon from '../assets/web dev icons/React-icon.svg.png'
import nodeIcon from '../assets/web dev icons/node.png'
import postgresqlIcon from '../assets/web dev icons/free-postgresql-icon-svg-download-png-1175120.webp'
import mongodbIcon from '../assets/web dev icons/mongodb.png'
import restApiIcon from '../assets/web dev icons/rest-api.jpg'
import premiereProIcon from '../assets/web dev icons/premiere-pro.svg'
import logicProIcon from '../assets/web dev icons/logic-pro-x.png'
import seleniumIcon from '../assets/web dev icons/selenium.png'
import photoshopIcon from '../assets/web dev icons/photoshop.png'
import seoIcon from '../assets/web dev icons/seo.svg'

const LEAF_PATH = 'M0,12 C-4,10 -12,8 -12,2 C-16,0 -14,-8 -8,-7 C-8,-13 -2,-15 0,-12 C2,-15 8,-13 8,-7 C14,-8 16,0 12,2 C12,8 4,10 0,12 Z'

function SkillLeaf({ id }) {
  return (
    <i className="skill-petal" aria-hidden="true">
      <svg viewBox="-17 -16 34 36" width="24" height="26">
        <defs>
          <clipPath id={id}>
            <path d={LEAF_PATH} />
          </clipPath>
        </defs>
        <path d={LEAF_PATH} fill="#f3a9b8" />
        <path d="M0 -16 L18 -16 L18 20 L2 20 C3 8 5 -4 0 -16 Z" fill="#f7c2cc" clipPath={`url(#${id})`} />
        <path d={LEAF_PATH} fill="none" stroke="#6e4a2c" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M0,-6 L0,10 M0,3 L-6,-2 M0,3 L6,-2 M0,10 L-3.5,16" fill="none" stroke="#6e4a2c" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </i>
  )
}

export default function Skills() {
  const { t } = useLanguage()
  const sectionRef = React.useRef(null)
  const [entered, setEntered] = React.useState(false)
  const [done, setDone] = React.useState(false)
  const [popIndex, setPopIndex] = React.useState(-1)

  const tools = [
    { name: 'JavaScript', icon: javascriptIcon, mediumIcon: true },
    { name: 'React', icon: reactIcon, mediumIcon: true },
    { name: 'Node', icon: nodeIcon, fillIcon: true },
    { name: 'PostgreSQL', icon: postgresqlIcon, mediumIcon: true },
    { name: 'MongoDB', icon: mongodbIcon, mediumIcon: true },
    { name: 'REST APIs', icon: restApiIcon, roundedIcon: true },
    { name: 'Wordpress', icon: wordpressIcon, fillIcon: true },
    { name: 'Photoshop', icon: photoshopIcon, roundedIcon: true, cropIcon: true },
    { name: 'Première Pro', icon: premiereProIcon, roundedIcon: true },
    { name: 'Logic Pro X', icon: logicProIcon, mediumIcon: true },
    { name: 'Selenium', icon: seleniumIcon, fillIcon: true, fillScale: 1.25 },
    { name: 'SEO', icon: seoIcon, mediumIcon: true },
  ]

  const renderMiniIcon = (tool) => {
    if (tool.roundedIcon || tool.fillIcon) {
      return (
        <img
          src={tool.icon}
          alt=""
          style={tool.fillScale ? { transform: `scale(${tool.fillScale})` } : undefined}
          className={`absolute inset-0 h-full w-full object-cover ${tool.cropIcon ? 'scale-125' : ''}`}
        />
      )
    }

    return (
      <img
        src={tool.icon}
        alt=""
        className={`absolute inset-0 m-auto object-contain ${tool.mediumIcon ? 'h-6 w-6' : 'h-5 w-5'}`}
      />
    )
  }

  React.useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const count = tools.length
    let last = -1
    let intervalId
    let startId
    let clearId

    const pop = () => {
      let next = last
      do {
        next = Math.floor(Math.random() * count)
      } while (next === last && count > 1)
      last = next
      setPopIndex(next)
      window.clearTimeout(clearId)
      clearId = window.setTimeout(() => setPopIndex(-1), 1700)
    }

    const start = () => {
      if (reduce) {
        setEntered(true)
        setDone(true)
        return
      }
      setEntered(true)
      startId = window.setTimeout(() => {
        setDone(true)
        pop()
        intervalId = window.setInterval(pop, 2200)
      }, count * 80 + 700)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        start()
        observer.disconnect()
      },
      { threshold: 0.3 }
    )

    observer.observe(section)
    return () => {
      observer.disconnect()
      window.clearTimeout(startId)
      window.clearTimeout(clearId)
      window.clearInterval(intervalId)
    }
  }, [tools.length])

  return (
    <section id="skills" ref={sectionRef} className="relative overflow-visible py-24">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative mx-auto w-full overflow-visible lg:mx-0 lg:w-fit lg:pr-8">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-honey opacity-[0.1] blur-3xl sm:h-[28rem] sm:w-[28rem] lg:left-0 lg:translate-x-[-10%]"
              aria-hidden="true"
            />
            <h2 className="relative z-10 text-5xl lg:text-6xl font-bold section-title text-center lg:text-left leading-tight">
              {t.skills.titleLines.map((line, index) => (
                <span key={index} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>

          <div className={`skill-board ${entered ? 'is-in' : ''} ${done ? 'is-done' : ''}`}>
            <ul className="skill-list">
              {tools.map((tool, index) => (
                <li
                  key={tool.name}
                  className={`skill-chip ${popIndex === index ? 'is-pop' : ''}`}
                  style={{ '--i': index }}
                >
                  <span className="skill-chip-icon">
                    {renderMiniIcon(tool)}
                  </span>
                  <span className="whitespace-nowrap">{tool.name}</span>
                  <SkillLeaf id={`skill-leaf-${index}`} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
