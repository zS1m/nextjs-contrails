import Pre from 'pliny/ui/Pre'
import type { MDXComponents } from 'mdx/types'
import Image from '@/components/Image'
import CustomLink from '@/components/Link'

export const components: MDXComponents = {
  Image,
  a: CustomLink,
  pre: Pre
}
