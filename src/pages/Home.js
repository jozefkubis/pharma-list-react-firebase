import "./Home.css"
import { Link } from "react-router-dom"
import { GoSearch } from "react-icons/go"
import { MdOutlineDoubleArrow } from "react-icons/md"
import { usePharma } from "../contexts/PharmaContext"

const Home = () => {
  const {
    addSearch,
    searchTerm,
    handleSearchChange,
    error,
    removeSearch,
    sortFilteredData,
  } = usePharma()

  return (
    <section className="home-section">
      <div className="home-div">
        <h1 className="home-h1">Farmakologia pre RZP posadky</h1>
        <form className="home-form" onClick={addSearch}>
          <button className="home-btn">
            <GoSearch />
          </button>
          <input
            className="search-input"
            type="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Hladat"
          />
        </form>
      </div>
      <div className="home-data">
        {error && <p>{error}</p>}
        {sortFilteredData.length ? (
          sortFilteredData.map(({ id, nazov, skupina }) => (
            <div className="medicine" key={id}>
              <div className="separator">
                <h4>{nazov}</h4>
                <p>{skupina}</p>
              </div>

              <Link to={`/onemed/${id}`} onClick={removeSearch}>
                <MdOutlineDoubleArrow />
              </Link>
            </div>
          ))
        ) : (
          <p>Nenašli sa žiadne výsledky</p>
        )}
      </div>
    </section>
  )
}

export default Home
