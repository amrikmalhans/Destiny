import { MapPin, Search } from 'lucide-react'

const Hero = () => {
  return (
    <section className="hero">
      <h1 className="hero__title">Northern lights forecast</h1>
      <p className="hero__description">
        Discover when and where to see the northern lights with a 3-day forecast for your location in
        Norway, or be inspired by top aurora destinations.
      </p>
      <form className="hero-search" role="search">
        <label className="hero-search__field" htmlFor="destination-search">
          <Search aria-hidden="true" className="hero-search__icon" size={28} strokeWidth={2} />
          <input
            className="hero-search__input"
            id="destination-search"
            name="destination-search"
            placeholder="Search for destination .."
            type="text"
          />
        </label>
        <button className="hero-search__near" type="button">
          <MapPin aria-hidden="true" className="hero-search__near-icon" size={24} strokeWidth={2} />
          Near me
        </button>
      </form>
    </section>
  )
}

export default Hero
