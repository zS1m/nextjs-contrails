type Meta = {
  id: string,
  title: string,
  description: string,
  date: string,
  abbrlink: string,
  tags: string[]
}

type BlogPost = {
  meta: Meta,
  content: ReactElement<any, string | JSXElementConstructor<any>>
}
