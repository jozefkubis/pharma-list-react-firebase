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
    <section>
      {error && <p>{error}</p>}
      <h1>{data.nazov}</h1>
      <p>
        <span>Skupina:</span> {data.skupina}
      </p>
      <p>
        <span>Indikacie:</span> {data.indikacie}
      </p>
      <p>
        <span>Sposob podavania:</span> {data.sposobPodavania}
      </p>
      <p>
        <span>Davkovanie:</span> {data.davkovanie}
      </p>
      <p>
        <span>Nastup a odoznenie ucinku:</span> {data.nastupAodoznenieUcinku}
      </p>
      <p>
        <span>Mechanizmus ucinku:</span> {data.MU}
      </p>
      <p>
        <span>Neziaduce ucinky:</span> {data.NU}
      </p>
      <p>
        <span>Kontraindikacie:</span> {data.KI}
      </p>
      <Link to="/">Spat do ampularia</Link>
    </section>
  )
}

export default OneMed
