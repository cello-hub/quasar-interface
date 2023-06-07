import { ReactNode } from 'react'

type UniExpandRowProps = { children: ReactNode }

export default function UniExpandRow(props: UniExpandRowProps) {
  return <div>{props.children}</div>
}
