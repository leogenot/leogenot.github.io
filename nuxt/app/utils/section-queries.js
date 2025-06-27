import * as fragments from './fragments'
export const Hero = groq`_type == 'Hero' =>{
    theme,
    title,
    text[]{
    ...${fragments.portableTextSimple},
  },
    links[] {
      _type == "link" => ${fragments.callToAction},
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
    },
  }
`
