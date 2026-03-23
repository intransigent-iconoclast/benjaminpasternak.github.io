// =====================
// THEME
// =====================
const html = document.documentElement
const themeBtn = document.getElementById('theme-toggle')

const saved = localStorage.getItem('theme') || 'dark'
html.className = saved

themeBtn?.addEventListener('click', () => {
  const isDark = html.classList.contains('dark')
  html.className = isDark ? 'light' : 'dark'
  localStorage.setItem('theme', isDark ? 'light' : 'dark')
})

// =====================
// NAV
// =====================
const nav = document.getElementById('nav')
const hamburger = document.getElementById('nav-hamburger')
const mobileMenu = document.getElementById('nav-mobile')
const iconMenu = hamburger?.querySelector('.icon-menu')
const iconX = hamburger?.querySelector('.icon-x')

window.addEventListener('scroll', () => {
  nav?.classList.toggle('scrolled', window.scrollY > 20)
  updateActiveNav()
}, { passive: true })

hamburger?.addEventListener('click', () => {
  const open = mobileMenu?.classList.toggle('open')
  if (iconMenu) iconMenu.style.display = open ? 'none' : 'block'
  if (iconX)    iconX.style.display    = open ? 'block' : 'none'
})

function closeMenu() {
  mobileMenu?.classList.remove('open')
  if (iconMenu) iconMenu.style.display = 'block'
  if (iconX)    iconX.style.display    = 'none'
}

document.querySelectorAll('[data-href]').forEach(el => {
  el.addEventListener('click', () => {
    const target = document.querySelector(el.dataset.href)
    target?.scrollIntoView({ behavior: 'smooth' })
    closeMenu()
  })
})

document.getElementById('nav-logo-btn')?.addEventListener('click', e => {
  e.preventDefault()
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

const navLinkEls = document.querySelectorAll('.nav-links .nav-link')
function updateActiveNav() {
  const ids = ['about', 'experience', 'projects', 'skills', 'contact']
  let active = ''
  for (const id of [...ids].reverse()) {
    const el = document.getElementById(id)
    if (el && window.scrollY >= el.offsetTop - 120) { active = id; break }
  }
  navLinkEls.forEach(link => {
    link.classList.toggle('active', link.dataset.href === `#${active}`)
  })
}

// =====================
// TYPING ANIMATION
// =====================
const titles = [
  'Cloud Software Developer',
  'AI Systems Engineer',
  'RAG & LLM Systems Builder',
  'Backend Engineer',
]
let titleIdx = 0, charIdx = 0, isTyping = true
const typingEl = document.getElementById('hero-typing')

function tick() {
  if (!typingEl) return
  const target = titles[titleIdx]
  if (isTyping) {
    if (charIdx < target.length) {
      typingEl.textContent = target.slice(0, ++charIdx)
      setTimeout(tick, 60)
    } else {
      setTimeout(() => { isTyping = false; tick() }, 2000)
    }
  } else {
    if (charIdx > 0) {
      typingEl.textContent = target.slice(0, --charIdx)
      setTimeout(tick, 35)
    } else {
      titleIdx = (titleIdx + 1) % titles.length
      isTyping = true
      setTimeout(tick, 200)
    }
  }
}
tick()

// =====================
// SCROLL REVEAL
// =====================
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
      revealObserver.unobserve(entry.target)
    }
  })
}, { threshold: 0.08 })

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el))

// =====================
// EMAIL + COPY BUTTON
// =====================
;(function () {
  const addr = 'benjamin.pasternak' + '@' + 'rutgers.edu'

  const display = document.getElementById('email-display')
  if (display) display.textContent = addr

  const copyBtn = document.getElementById('copy-btn')
  const tooltip = document.getElementById('copy-tooltip')
  const iconCopy  = copyBtn?.querySelector('.icon-copy')
  const iconCheck = copyBtn?.querySelector('.icon-check')

  copyBtn?.addEventListener('click', () => {
    navigator.clipboard.writeText(addr).then(() => {
      if (iconCopy)  iconCopy.style.display  = 'none'
      if (iconCheck) iconCheck.style.display = 'block'
      tooltip?.classList.add('show')
      setTimeout(() => {
        if (iconCopy)  iconCopy.style.display  = 'block'
        if (iconCheck) iconCheck.style.display = 'none'
        tooltip?.classList.remove('show')
      }, 2000)
    })
  })
})()
