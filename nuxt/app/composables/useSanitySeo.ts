import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource, SanityProjectDetails } from '@sanity/image-url/lib/types/types'
// import type { UseSeoMetaInput } from '@unhead/schema'

export function useSanitySeo(seo?: Seo) {
  // console.log('SEO data received:', seo)
  if (!seo) return

  // Get the Nuxt runtime config for site settings
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl || 'https://nitex-com'
  const siteName = config.public.siteName || 'Nitex'

  // Get the Sanity configuration from the `useSanity` composable
  const { config: sanityConfig } = useSanity()

  // Create the URL builder using the provided config
  const builder = imageUrlBuilder(sanityConfig as SanityProjectDetails)

  // Helper function to generate image URLs
  function urlFor(source: SanityImageSource) {
    return builder.image(source).auto('format')
  }

  // Use the URL builder to create the Open Graph image URL
  // console.log('SEO image data:', seo?.image)
  // console.log('SEO image asset:', seo?.image?.asset)
  let ogImageUrl = null

  try {
    if (seo?.image?.asset) {
      const imageBuilder = urlFor(seo.image)
      if (imageBuilder) {
        ogImageUrl = imageBuilder.width(1200).height(630).fit('crop').crop('center').url()
      }
    }
  } catch (error) {
    console.error('Error generating OG image URL:', error)
  }

  // console.log('Generated OG image URL:', ogImageUrl)

  // Compute meta tags
  const metaTitle = seo?.title
  // Format the Open Graph title to include the site name, similar to the page title
  const ogTitle = seo?.title ? `${seo.title} | ${siteName}` : siteName
  const metaDescription = seo?.description

  // Get the current route path
  const route = useRoute()
  const path = route.path

  // Construct canonical URL using the site URL from config and current path
  // If a specific canonical URL is provided in the SEO data, use that instead
  const canonicalUrl = seo?.canonical || (path ? `${siteUrl}${path}` : siteUrl)

  // Helper to validate description
  const isValidDescription = (desc: string | null | undefined): boolean => {
    if (!desc) return false
    if (desc === '%site.description') return false
    if (desc === 'null') return false
    if (desc === 'undefined') return false
    if (desc.includes('%')) return false // Catch unknown other template variables
    if (desc.trim() === '') return false
    return true
  }

  // Log SEO validation
  // console.log('SEO description validation:', {
  //   description: metaDescription,
  //   isValid: metaDescription ? isValidDescription(metaDescription) : false
  // })

  const meta = [
    // Standard meta tags
    ...(isValidDescription(metaDescription)
      ? [{ name: 'description', content: metaDescription }]
      : [{ name: 'description', content: null }]), // Explicitly set to null to override defaults
    { name: 'robots', content: seo?.noindex ? 'noindex' : 'all' },

    // Open Graph meta tags
    { property: 'og:title', content: ogTitle },
    ...(isValidDescription(metaDescription)
      ? [{ property: 'og:description', content: metaDescription }]
      : [{ property: 'og:description', content: null }]), // Explicitly set to null to override defaults
    ...(ogImageUrl ? [{ property: 'og:image', content: ogImageUrl }] : []),
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: siteName },
    { property: 'og:locale', content: 'da' },

    // Twitter Card meta tags
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: ogTitle },
    ...(isValidDescription(metaDescription)
      ? [{ name: 'twitter:description', content: metaDescription }]
      : [{ name: 'twitter:description', content: null }]), // Explicitly set to null to override defaults
    ...(ogImageUrl ? [{ name: 'twitter:image', content: ogImageUrl }] : []),
  ]

  const link = [{ rel: 'canonical', href: canonicalUrl }]

  useHead({
    title: metaTitle,
    meta,
    link,
  })

  // Return computed values for use in your component
  return {
    metaTitle,
    metaDescription,
    ogImageUrl,
  }
}
