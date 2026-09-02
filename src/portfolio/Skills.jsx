import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import SectionWatermarkLogo from './SectionWatermarkLogo'

// Import icons
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

export default function Skills() {
  const { t } = useLanguage()

  const tools = [
    { name: 'JavaScript', icon: javascriptIcon, mediumIcon: true },
    { name: 'React', icon: reactIcon, mediumIcon: true },
    { name: 'Node', icon: nodeIcon, fillIcon: true },
    { name: 'PostgreSQL', icon: postgresqlIcon, mediumIcon: true },
    { name: 'MongoDB', icon: mongodbIcon, mediumIcon: true },
    { name: 'REST APIs', icon: restApiIcon, roundedIcon: true },
    { name: 'Wordpress', icon: wordpressIcon, fillIcon: true },
  ]

  const creativeTools = [
    { name: 'Photoshop', icon: photoshopIcon, roundedIcon: true, cropIcon: true },
    { name: 'Première Pro', icon: premiereProIcon, roundedIcon: true },
    { name: 'Logic Pro X', icon: logicProIcon, mediumIcon: true },
    { name: 'Selenium', icon: seleniumIcon, fillIcon: true, fillScale: 1.25 },
  ]

  const allTools = [...tools, ...creativeTools]
  const splitIndex = Math.ceil(allTools.length / 2)
  const leftColumnTools = allTools.slice(0, splitIndex)
  const rightColumnTools = allTools.slice(splitIndex)

  /*
  const iconClassName = (tool) => {
    if (tool.smallIcon) {
      return 'w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain'
    }
    return 'w-16 h-16 md:w-[4.5rem] md:h-[4.5rem] lg:w-20 lg:h-20 object-contain'
  }

  const renderBubbles = (items, delayOffset = 0) =>
    items.map((tool, index) => (
      <div
        key={tool.name}
        title={tool.name}
        className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-white/70 backdrop-blur-sm border border-stone-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center animate-float"
        style={{
          animationDelay: `${(index + delayOffset) * 0.5}s`
        }}
      >
        {tool.roundedIcon ? (
          <span className="w-14 h-14 md:w-16 md:h-16 lg:w-[4.5rem] lg:h-[4.5rem] overflow-hidden rounded-full border-2 border-white shrink-0">
            <img
              src={tool.icon}
              alt={tool.name}
              className={`h-full w-full object-cover ${tool.cropIcon ? 'scale-125' : ''}`}
            />
          </span>
        ) : tool.fillIcon ? (
          <span className="w-16 h-16 md:w-[4.5rem] md:h-[4.5rem] lg:w-20 lg:h-20 overflow-hidden rounded-full shrink-0">
            <img
              src={tool.icon}
              alt={tool.name}
              className="h-full w-full object-cover scale-[1.45]"
            />
          </span>
        ) : (
          <img
            src={tool.icon}
            alt={tool.name}
            className={iconClassName(tool)}
          />
        )}
      </div>
    ))
  */

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
        className={`absolute inset-0 m-auto object-contain ${tool.mediumIcon ? 'h-6 w-6' : tool.smallIcon ? 'h-4 w-4' : 'h-5 w-5'}`}
      />
    )
  }

  const countLetters = (name) => [...name.replace(/ /g, '')].length

  const animationOrder = React.useMemo(() => {
    const ordered = []
    const maxLen = Math.max(leftColumnTools.length, rightColumnTools.length)

    for (let i = 0; i < maxLen; i += 1) {
      if (leftColumnTools[i]) ordered.push(leftColumnTools[i])
      if (rightColumnTools[i]) ordered.push(rightColumnTools[i])
    }

    return ordered
  }, [leftColumnTools, rightColumnTools])

  const toolStartIndex = React.useMemo(() => {
    const map = new Map()
    let offset = 0

    animationOrder.forEach((tool) => {
      map.set(tool.name, offset)
      offset += countLetters(tool.name)
    })

    return map
  }, [animationOrder])

  const totalLetters = animationOrder.reduce((sum, tool) => sum + countLetters(tool.name), 0)
  const staggerSec = 0.11
  const cycleDuration = Math.max(totalLetters * staggerSec, 2.5)

  const letterJumpKeyframes = React.useMemo(() => {
    const slot = 100 / totalLetters

    return Array.from({ length: totalLetters }, (_, index) => {
      const start = index * slot
      const peak = start + slot * 0.28
      const end = start + slot * 0.52

      return `
        @keyframes skill-jump-${index} {
          0%, ${start.toFixed(4)}%, ${end.toFixed(4)}%, 100% {
            transform: translateY(0);
          }
          ${peak.toFixed(4)}% {
            transform: translateY(-7px);
          }
        }
      `
    }).join('\n')
  }, [totalLetters])

  const toolDotIndex = React.useMemo(() => {
    const map = new Map()
    animationOrder.forEach((tool, index) => map.set(tool.name, index))
    return map
  }, [animationOrder])

  const skillDotKeyframes = React.useMemo(() => {
    const letterSlotPercent = 100 / totalLetters

    return animationOrder.map((tool, index) => {
      const startIndex = toolStartIndex.get(tool.name) ?? 0
      const letterCount = countLetters(tool.name)
      const start = startIndex * letterSlotPercent
      const end = (startIndex + letterCount) * letterSlotPercent
      const popIn = start + letterSlotPercent * 0.35
      const popSettle = start + letterSlotPercent * 0.75
      const fadeOut = Math.max(popSettle, end - letterSlotPercent * 0.35)

      return `
        @keyframes skill-dot-${index} {
          0%,
          ${Math.max(0, start - 0.001).toFixed(4)}%,
          ${end.toFixed(4)}%,
          100% {
            opacity: 0;
            transform: translateY(-50%) scale(0);
          }
          ${popIn.toFixed(4)}% {
            opacity: 1;
            transform: translateY(-50%) scale(1.3);
          }
          ${popSettle.toFixed(4)}%,
          ${fadeOut.toFixed(4)}% {
            opacity: 1;
            transform: translateY(-50%) scale(1);
          }
        }
      `
    }).join('\n')
  }, [animationOrder, toolStartIndex, totalLetters])

  const renderAnimatedName = (name) => {
    let letterIndex = toolStartIndex.get(name) ?? 0

    return [...name].map((char, charIndex) => {
      if (char === ' ') {
        return (
          <span key={`${name}-space-${charIndex}`} className="inline-block w-[0.35em]" aria-hidden="true">
            {' '}
          </span>
        )
      }

      const currentIndex = letterIndex
      letterIndex += 1

      return (
        <span
          key={`${name}-char-${charIndex}`}
          className="skill-letter-bounce inline-block"
          style={{
            animation: `skill-jump-${currentIndex} ${cycleDuration}s ease-in-out infinite`,
          }}
        >
          {char}
        </span>
      )
    })
  }

  const renderSkillList = (items) => (
    <ul className="mx-auto w-fit space-y-3 sm:space-y-4 md:mx-0 md:w-full">
      {items.map((tool) => (
        <li
          key={tool.name}
          className="flex items-center justify-center gap-3 sm:gap-4 md:justify-start"
        >
          <span className="relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full border border-stone-200/70 bg-white/80 shadow-sm">
            {renderMiniIcon(tool)}
          </span>
          <span
            className="skill-title-dot font-pixel text-xs sm:text-sm text-stone-700 leading-tight pr-3.5"
            aria-label={tool.name}
            style={{ '--skill-dot-animation': `skill-dot-${toolDotIndex.get(tool.name) ?? 0}` }}
          >
            {renderAnimatedName(tool.name)}
          </span>
        </li>
      ))}
    </ul>
  )

  return (
    <section id="skills" className="relative overflow-visible py-24">
      <SectionWatermarkLogo align="left" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative mx-auto w-full overflow-visible md:mx-0 md:w-fit md:pr-8">
            <h2 className="relative z-10 text-5xl lg:text-6xl font-bold text-[#fffaec] text-center md:text-left leading-tight title-stroke-dark">
              {t.skills.titleLines.map((line, index) => (
                <span key={index} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 md:gap-x-12 justify-items-center md:justify-items-stretch">
            {renderSkillList(leftColumnTools)}
            {renderSkillList(rightColumnTools)}
          </div>
        </div>

        <style>{`
          .skill-title-dot {
            position: relative;
          }

          .skill-title-dot::before {
            content: '';
            position: absolute;
            right: 0;
            left: auto;
            top: 50%;
            width: 0.4rem;
            height: 0.4rem;
            border-radius: 9999px;
            background-color: #8B5CF6;
            transform: translateY(-50%) scale(0);
            opacity: 0;
            animation-name: var(--skill-dot-animation);
            animation-duration: ${cycleDuration}s;
            animation-timing-function: ease;
            animation-iteration-count: infinite;
          }

          ${skillDotKeyframes}

          ${letterJumpKeyframes}

          @media (prefers-reduced-motion: reduce) {
            .skill-letter-bounce,
            .skill-title-dot::before {
              animation: none !important;
            }

            .skill-title-dot::before {
              opacity: 0;
            }
          }
        `}</style>

        {/*
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
          {renderBubbles(tools)}
        </div>

        <div className="mt-8 flex flex-wrap justify-center items-center gap-6 md:gap-8">
          {renderBubbles(creativeTools, tools.length)}
        </div>
        */}

      </div>
    </section>
  )
}
