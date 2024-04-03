import "./Home.css"
import { projectFirestore } from "../firebase/config"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

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
    <section>
      <form onSubmit={handleSearch}>
        <input
          className="search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Hladat"
        />
        <button type="submit">Vyhľadať</button>
      </form>

      {error && <p>{error}</p>}
      {filteredData.length > 0 ? (
        filteredData.map(({ id, nazov, skupina }) => (
          <div className="medicine" key={id}>
            <h3>{nazov}</h3>
            <p>{skupina}</p>
            <Link to={`/onemed/${id}`}>Detail</Link>
          </div>
        ))
      ) : (
        <p>Nenašli sa žiadne výsledky</p>
      )}
    </section>
  )
}

export default Home
