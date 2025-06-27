export type SanityImagePaletteSwatch = {
  _type: 'sanity.imagePaletteSwatch'
  background: string
  foreground: string
  population: number
  title: string
}

export type SanityImagePalette = {
  _type: 'sanity.imagePalette'
  darkMuted: SanityImagePaletteSwatch
  darkVibrant: SanityImagePaletteSwatch
  dominant: SanityImagePaletteSwatch
  lightMuted: SanityImagePaletteSwatch
  lightVibrant: SanityImagePaletteSwatch
  muted: SanityImagePaletteSwatch
  vibrant: SanityImagePaletteSwatch
}

export type ImageProps = {
  _type: string
  altText?: string
  asset: {
    _ref: string
    _type: string
  }
  crop: {
    _type: string
    bottom: number
    left: number
    right: number
    top: number
  }
  height: number
  hotspot: {
    _type: string
    height: number
    width: number
    x: number
    y: number
  }
  lqip: string
  width: number
  palette?: SanityImagePalette
}

export type InternalLink = {
  _key: string
  slug?: {
    current: string
  }
  type: string
  url: string
}
export type PageLink = {
  _id: string
  title: string
  url: string
}

export type LinkProps = {
  linkType?: string
  url?: string
  title?: string
  target: '_blank' | '_self'
  page?: {
    title?: string
    slug?: string
    url: string
  }
}

export type TextLink = {
  title?: string
  slug?: string
}

export type PortableTextMarkDef =
  | {
    _type: 'internalLink'
    _key: string
    slug?: {
      current: string
    }
    type: string
    url: string
  }
  | {
    // fallback for other markDefs
    _type: string
    [key: string]: unknown
  }

export type PortableTextBlock = {
  _type: 'block'
  children: unknown[]
  markDefs?: PortableTextMarkDef[]
  [key: string]: unknown
}

export type VideoProps = {
  asset: {
    assetId: string
    duration: number
    filename?: string
    playbackId: string
    thumbTime: null
  }
}

export type MediaProps = {
  _key?: string
  _type: string
  image?: ImageProps
  video?: VideoProps
  svgIcon?: string
}

export type PageProps = Builder & {
  title?: string
  publishedAt?: string
  seo?: Seo
  media?: MediaProps
  slug: string
}

export type PageDefaults = {
  _type: string
  _createdAt: string
  _updatedAt: string
  title?: string
  media?: MediaProps
  seo?: Seo
  slug: string
  publishedAt?: string
}

export type SeoImage = {
  _type: string
  _ref?: string
  url?: string
  metadata?: {
    dimensions?: {
      width?: number
      height?: number
    }
  }
}

export type Seo = {
  title?: string
  description?: string
  canonical?: string
  noindex?: boolean
  image?: SeoImage
}

export type HeroProps = {
  title?: string
  text?: PortableTextBlock
  links?: LinkProps[]
}

export type PageSection =
  | { _type: 'Hero'; id: string; data: HeroProps }

export type Builder = {
  pageSections?: PageSection[]
}

export type SettingsProps = {
  errorPage: {
    text: string
    media: MediaProps
  }
}
export type Settings = {
  _id: string
  _type: 'settings'
  [key: string]: unknown
}
export type FrontpageResponse = PageDefaults & {
  seo?: Seo
  [key: string]: unknown
  pageSections: PageSection[]
}

export type PageWithSlug = PageDefaults & {
  seo?: Seo
  [key: string]: unknown
}

