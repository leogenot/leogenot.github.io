export const internalLink = groq`{
  _key,
  "slug": reference->slug,
  "type": reference->_type,
  "url": "https://yourdomain.com/" + reference->_type + "/" + reference->slug.current,
}`
export const link = groq`
_type == "reference" => {
  'title': @->title, // REMOVE 
  "title": coalesce(label, page->title),
  '_id': @->_id,
  'type': @->_type,
  'url': select(
    @->_type == 'frontpage' => "/",
    '/' + @->slug.current
  ),
}
`

export const callToAction = groq`{
  linkType,
  url,
  "title": label,
  "title": coalesce(label, page->title), // UPDATE TO THIS 
  "target": select(target == true => "_blank", "_self"),
  'page': page{${link},
  }
}
`

export const textLink = groq`*[_id == $ref][0] {
  title,
  'slug': slug.current,
}`

export const mediaLight = groq`
 {
  ...,
  image {
    ...,
    ...asset-> {
      altText,
      ...metadata {
        lqip, // the lqip can be used for blurHashUrl or other low-quality placeholders
        ...dimensions {
          width,
          height
        },
      },
    },
    "palette": asset->metadata.palette,
  },
    
    video {
      _type,
      asset-> {
        playbackId,
        assetId,
        filename,
        "duration": data.duration,
        thumbTime,
      },
    },
  }
`
export const media = groq`
 media {
  ...,
  image {
    ...,
    ...asset-> {
    altText,
    ...metadata {
      lqip, // the lqip can be used for blurHashUrl or other low-quality placeholders
      ...dimensions {
        width,
        height
      },
    },
  },
    "palette": asset->metadata.palette,
  },
    
    video {
      asset-> {
        playbackId,
        assetId,
        filename,
        "duration": data.duration,
        thumbTime,
      },
    },
  }
`

export const portableText = groq`{
  ...,
  markDefs[]{
    ...,
    _type == "internalLink" => ${internalLink},
  },
}`

export const portableTextSimple = groq`{
  ...,
  markDefs[]{
    ...,
    _type == "internalLink" => ${internalLink},
  },
}`
export const page = groq`
 {
    "title": @->title,
    'publishedAt': @->publishedAt,
    'seo': @->seo,
    'media': @->{
      ...${media},
    },
    'slug':  "/" + @->_type + "/" + @->slug.current,
}`

export const pageDefaults = groq`
{ 
  _type,
  _createdAt,
  _updatedAt,
  title,
  'media':${media},
  'seo': {
    'title': coalesce(seo.title, title),
    'description': seo.description,
    'canonical': seo.canonical,
    'noindex': seo.noindex,
    'image': seo.image {
      _type,
      'asset': asset->{
        _ref,
        _type,
        url,
        metadata {
          dimensions {
            width,
            height
          },
        },
      },
    },
  },
  "slug": select(
    defined(parent) => '/' + parent->slug.current + '/' + slug.current,
    _type == "frontpage" => "/",
    '/' + slug.current,
  ),
  publishedAt,
}`

export const seoImage = groq`
  {_type,
  ...asset->{
    _ref,
    _type,
    url,
    ...metadata {
      ...dimensions {
        width,
        height,
      },
    },
  },}
`

export const seo = groq`
  {
    'title': coalesce(seo.title, title),
    'description': seo.description,
    'canonical': seo.canonical,
    'noindex': seo.noindex,
    'image': seo.image->${seoImage},
  }
`
