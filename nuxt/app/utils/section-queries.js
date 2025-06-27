import * as fragments from './fragments'
export const Hero = groq`_type == 'Hero' =>{
    title,
    text[]{
    ...${fragments.portableTextSimple},
  },
    links[] {
      _type == "link" => ${fragments.callToAction},
    },
  }
`

export const FeaturedProjects = groq`_type == 'FeaturedProjects' =>{
    title,
    projects[]{
      ...@->{
        ...${fragments.pageDefaults},
      }
    },
  }
`

// Page sections query
export const builder = groq`
  pageSections[] {
    _type,
    'id': _key,
    'data': {
      ${Hero},
      ${FeaturedProjects},
    },
  }
`
