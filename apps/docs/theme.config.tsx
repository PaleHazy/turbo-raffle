import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'

const config: DocsThemeConfig = {
  logo: <span>Turbo Raffle</span>,
  footer: {
    text: 'Turbo Raffle  Documentation',
  },
  search: {
    placeholder: 'Search...',

  },
  
  // banner: {
  // text: 'Turbo Raffle ',
  // },
  darkMode: true,
  primaryHue: 200,
  useNextSeoProps() {
    const { route } = useRouter()
    if (route !== '/') {
      return {
        titleTemplate: '%s – Turbo Raffle '
      }
    }
  },
}

export default config
