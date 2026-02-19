import { createFileRoute } from '@tanstack/react-router'
import { Logo } from '../components/Logo'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div>
      <Logo />
      <h1>Great Software</h1>
    </div>
  )
}
