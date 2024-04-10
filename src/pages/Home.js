import "./Home.css"
import { projectFirestore } from "../firebase/config"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { GoSearch } from "react-icons/go"
import { MdOutlineDoubleArrow } from "react-icons/md"

const Home = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    return projectFirestore.collection("ampularium").onSnapshot(
      (snapshot) => {
        setError(snapshot.empty ? "No data available" : "")
        setData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      },
      (err) => setError(err.message)
    )
  }, [])

  const toggleSearch = () => {
    document.querySelector(".home-h1").classList.toggle("hidden")
    document.querySelector(".home-data").classList.toggle("data-toggle")
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    toggleSearch()
  }

  const filteredData = data.filter((oneMed) =>
    oneMed.nazov.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <section className="home-section">
      <div className="home-div">
        <h1 className="home-h1">Farmakologia pre RZP posadky</h1>
        <form className="home-form" onClick={toggleSearch}>
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
        {filteredData.length ? (
          filteredData.map(({ id, nazov, skupina }) => (
            <div className="medicine" key={id}>
              <div className="separator">
                <h4>{nazov}</h4>
                <p>{skupina}</p>
              </div>

              <Link to={`/onemed/${id}`}>
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
