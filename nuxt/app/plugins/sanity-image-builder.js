import imageUrlBuilder from '@sanity/image-url';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useSanity().config; // Assuming you have `useSanity` in place to provide the config
  const builder = imageUrlBuilder(config);

  function urlFor(source) {
    return builder.image(source).auto('format');
  }

  // Make sure to inject the function globally for access
  nuxtApp.provide('urlFor', urlFor);
});
