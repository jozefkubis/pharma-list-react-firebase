import "./OneMed.css"
import { useParams, Link } from "react-router-dom"
import { projectFirestore } from "../firebase/config"
import { useState, useEffect } from "react"

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
      <div>
        <h4>Skupina:</h4> <p>{data.skupina}</p>
      </div>
      <div>
        <h4>Indikacie:</h4> <p>{data.indikacie}</p>
      </div>
      <div>
        <h4>Sposob podania:</h4> <p>{data.sposobPodania}</p>
      </div>
      <div>
        <h4>Davkovanie:</h4> <p>{data.davkovanie}</p>
      </div>
      <div>
        <h4>Nastup a odoznenie ucinku:</h4> <p>{data.nastupAodoznenieUcinku}</p>
      </div>
      <div>
        <h4>Mechanizmus ucinku:</h4> <p>{data.MU}</p>
      </div>
      <div>
        <h4>Neziaduce ucinky:</h4> <p>{data.NU}</p>
      </div>
      <div>
        <h4>Kontraindikacie:</h4> <p>{data.KI}</p>
      </div>
      <Link to="/">Spat do ampularia</Link>
    </section>
  )
}

export default OneMed
