import "./Delete.css"
import { projectFirestore } from "../firebase/config"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Delete = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    let unsubscribe = projectFirestore.collection("ampularium").onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setError("No data available")
        } else {
          let dataArray = []
          snapshot.forEach((oneMed) => {
            dataArray.push({
              id: oneMed.id,
              ...oneMed.data(),
            })
          })
          setData(dataArray)
        }
      },
      (err) => setError(err.message)
    )

    return () => {
      unsubscribe()
    }
  }, [])

  const deleteMovie = (id) => {
    projectFirestore.collection("ampularium").doc(id).delete()
    setSearchTerm("")
  }

  return (
    <section>
      <form>
        <input
          className="search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Hladat"
        />
      </form>

      {error && <p>{error}</p>}
      {!searchTerm
        ? data.map((oneMed) => {
            const { id, nazov } = oneMed

            return (
              <div className="medicine" key={id}>
                <h4>{nazov}</h4>
              </div>
            )
          })
        : data
            .filter((oneMed) => {
              return oneMed.nazov
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            })
            .map((filteredMed) => {
              const { id, nazov } = filteredMed

              return (
                <div className="medicine" key={id}>
                  <h4>{nazov}</h4>
                  <button type="button" onClick={() => deleteMovie(id)}>
                    Zmazat
                  </button>
                </div>
              )
            })}

      <Link to="/">Spat do ampularia</Link>

      {searchTerm !==
      data.filter((oneMed) => {
        return oneMed.nazov.toLowerCase().includes(searchTerm.toLowerCase())
      }) ? (
        <p>Nenašli sa žiadne výsledky</p>
      ) : null}
    </section>
  )
}

export default Delete
