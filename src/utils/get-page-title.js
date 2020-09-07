import defaultSettings from '@/settings'

const title = defaultSettings.title || 'SpringBoot Easy'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
