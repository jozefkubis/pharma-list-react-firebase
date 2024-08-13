import "./Delete.css"
import { projectFirestore } from "../firebase/config"
import { Link } from "react-router-dom"
import { GoSearch } from "react-icons/go"
import { RiDeleteBin2Fill } from "react-icons/ri"
import { BiInjection } from "react-icons/bi"
import { usePharma } from "../contexts/PharmaContext"

const Delete = () => {
  const { dispatch, data, searchTerm, error, sortFilteredData } = usePharma()

  const deleteMedicine = (id) => {
    projectFirestore.collection("ampularium").doc(id).delete()
    dispatch({
      type: "setData",
      payload: data.filter((item) => item.id !== id),
    })
  }

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
          onChange={(e) =>
            dispatch({ type: "setSearchTerm", payload: e.target.value })
          }
          placeholder="Hladat"
        />
      </form>

      {error && <p>{error}</p>}
      {sortFilteredData.length > 0 ? (
        sortFilteredData.map(({ id, nazov }) => (
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

      <Link className="delete-back-link" to="/">
        Spat do ampularia <BiInjection />
      </Link>
    </section>
  )
}

export default Delete
