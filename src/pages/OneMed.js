import "./OneMed.css"
import { useParams, Link } from "react-router-dom"
import { projectFirestore } from "../firebase/config"
import { useState, useEffect } from "react"
import { BiInjection } from "react-icons/bi"

const OneMed = () => {
  const [data, setData] = useState({})
  const [error, setError] = useState("")

  const { medId } = useParams()

  useEffect(() => {
    projectFirestore
      .collection("ampularium")
      .doc(medId)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          setError("Medicine not found")
        } else {
          setData(doc.data())
        }
      })
  }, [medId])

  return (
    <section className="one-med-section">
      {error && <p>{error}</p>}
      <h1>{data.nazov}</h1>
      <div className="oneMed-data">
        <h4>Skupina:</h4> <p>{data.skupina}</p>
      </div>
      <div className="oneMed-data">
        <h4>Indikacie:</h4> <p>{data.indikacie}</p>
      </div>
      <div className="oneMed-data">
        <h4>Sposob podania:</h4> <p>{data.sposobPodania}</p>
      </div>
      <div className="oneMed-data">
        <h4>Davkovanie:</h4> <p>{data.davkovanie}</p>
      </div>
      <div className="oneMed-data">
        <h4>Nastup a odoznenie ucinku:</h4> <p>{data.nastupAodoznenieUcinku}</p>
      </div>
      <div className="oneMed-data">
        <h4>Mechanizmus ucinku:</h4> <p>{data.MU}</p>
      </div>
      <div className="oneMed-data">
        <h4>Neziaduce ucinky:</h4> <p>{data.NU}</p>
      </div>
      <div className="oneMed-data">
        <h4>Kontraindikacie:</h4> <p>{data.KI}</p>
      </div>

      <div className="oneMed-link">
        <Link to="/">
          Spat do ampularia <BiInjection />
        </Link>
      </div>
    </section>
  )
}

export default OneMed
