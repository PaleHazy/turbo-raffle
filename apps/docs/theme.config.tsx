import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'

const config: DocsThemeConfig = {
  logo: <span>Invent</span>,
  footer: {
    text: 'Invent Documentation',
  },
  search: {
    placeholder: 'Search...',

  },
  
  // banner: {
  // text: 'Invent',
  // },
  darkMode: true,
  primaryHue: 200,
  useNextSeoProps() {
    const { route } = useRouter()
    if (route !== '/') {
      return {
        titleTemplate: '%s – Invent'
      }
    }
  },
}

export default config
