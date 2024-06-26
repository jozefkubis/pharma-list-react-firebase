import "./Delete.css"
import { projectFirestore } from "../firebase/config"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { GoSearch } from "react-icons/go"
import { RiDeleteBin2Fill } from "react-icons/ri"
import { BiInjection } from "react-icons/bi";

const Delete = () => {
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

  const deleteMedicine = (id) => {
    projectFirestore.collection("ampularium").doc(id).delete()
    // Aktualizácia dát po zmazaní
    setData(data.filter((item) => item.id !== id))
  }

  const filteredData = searchTerm
    ? data.filter((oneMed) =>
        oneMed.nazov.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : data

  return (
    <section className="delete-section">
      <form className="delete-form">
        <button className="delete-btn" type="submit">
          <GoSearch />
        </button>
        <input
          className="delete-search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Hladat"
        />
      </form>

      {error && <p>{error}</p>}
      {filteredData.length > 0 ? (
        filteredData.map(({ id, nazov }) => (
          <div className="medicine" key={id}>
            <h4>{nazov}</h4>
            <div className="kos" onClick={() => deleteMedicine(id)}>
              <RiDeleteBin2Fill />
            </div>
          </div>
        ))
      ) : (
        <p>Nenašli sa žiadne výsledky</p>
      )}

      <Link className="delete-back-link" to="/">Spat do ampularia <BiInjection /></Link>
    </section>
  )
}

export default Delete
