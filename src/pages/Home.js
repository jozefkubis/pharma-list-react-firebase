import "./Home.css"
import { projectFirestore } from "../firebase/config"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { GoSearch } from "react-icons/go"
import { MdOutlineDoubleArrow } from "react-icons/md";

const Home = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const unsubscribe = projectFirestore.collection("ampularium").onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setError("No data available")
        } else {
          const dataArray = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          setData(dataArray)
        }
      },
      (err) => setError(err.message)
    )

    return unsubscribe
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    // Vyhľadávanie sa vykoná tu
  }

  const filteredData = searchTerm
    ? data.filter((oneMed) =>
        oneMed.nazov.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : data

  return (
    <section className="home-section">
      <h1>Farmakologia pre RZP posadky</h1>
      <form onSubmit={handleSearch} className="home-form">
        <button className="home-btn" type="submit">
          <GoSearch />
        </button>
        <input
          className="search-input"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Hladat"
        />
      </form>

      {error && <p>{error}</p>}
      {filteredData.length > 0 ? (
        filteredData.map(({ id, nazov, skupina }) => (
          <div className="medicine" key={id}>
            <div className="separator">
              <h4>{nazov}</h4>
              <p>{skupina}</p>
            </div>

            <Link to={`/onemed/${id}`}><MdOutlineDoubleArrow /></Link>
          </div>
        ))
      ) : (
        <p>Nenašli sa žiadne výsledky</p>
      )}
    </section>
  )
}

export default Home
