import Link from 'next/link'

const Navbar = () => {
  return (
    <header className="site-nav">
      <div className="site-nav__inner">
        <Link className="site-nav__brand" href="/">
          Payload
        </Link>
        <nav aria-label="Primary">
          <ul className="site-nav__links">
            <li>
              <Link href="/destinations">Destinations</Link>
            </li>
            <li>
              <Link href="/sky-events">Sky Events</Link>
            </li>
            <li>
              <Link href="/guides">Guides</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
