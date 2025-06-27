import * as fragments from './fragments'
import * as sections from './section-queries'

//QUERIES
export const getSettings = groq`
    * [_type == "settings"][0] {
      errorPage {
        text,
        ${fragments.media},
      },
}
`

export const getPages = groq`
  * [_type == "page"] {
    ...,
  "slug": '/' + slug.current,
  }
`

export const getFrontpage = groq`*[_type == "frontpage"][0] {
  ...${fragments.pageDefaults},
  
 "seo": ${seo},
 ${sections.builder},
}`

export const getPage = groq`* [slug.current == $slug][0] {
  ...,
  ...${fragments.pageDefaults},
  "seo": ${seo},
  ${sections.builder},
}`
