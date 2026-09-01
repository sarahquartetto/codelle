import idhImg from './assets/idh.png'
import leCarrosseImg from './assets/le-carrosse.png'

const projects = [
  {
    slug: 'idh-suisse',
    title: {
      en: 'IDH Suisse',
      fr: 'IDH Suisse'
    },
    description: {
      en: 'Website for a Swiss charity supporting local communities in Bolivia.',
      fr: 'Site web pour une association caritative suisse qui soutient la population locale en Bolivie.'
    },
    tags: ['Design', 'Integration', 'Deploiement'],
    demo: 'https://staging-idh.sarah-tech-lab.ch',
    image: idhImg
  },
  {
    slug: 'le-carrosse',
    title: {
      en: 'Le Carrosse',
      fr: 'Le Carrosse'
    },
    description: {
      en: 'Website for a Swiss e-commerce specializing in curated tableware and dining decor.',
      fr: 'Site web pour une boutique en ligne suisse de revente dans l\'art de la table.'
    },
    tags: ['Design', 'Integration', 'Deploiement'],
    demo: 'https://le-carrosse.sarah-tech-lab.ch',
    image: leCarrosseImg
  }
]

export default projects
