import "./OneMed.css"
import { useParams, Link } from "react-router-dom"
import { projectFirestore } from "../firebase/config"
import { useEffect } from "react"
import { BiInjection } from "react-icons/bi"
import { usePharma } from "../contexts/PharmaContext"

const OneMed = () => {
  const { dispatch, dataOneMed, error } = usePharma()

  const { medId } = useParams()

  useEffect(() => {
    projectFirestore
      .collection("ampularium")
      .doc(medId)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          dispatch({ type: "setError", payload: "Medicine not found" })
        } else {
          dispatch({ type: "setDataOneMed", payload: doc.data() })
        }
        // console.log(dataOneMed)
      })
  }, [medId, dispatch])

  return (
    <section className="one-med-section">
      {error && <p>{error}</p>}
      <h1>{dataOneMed.nazov}</h1>
      <div className="oneMed-data">
        <h4>Skupina:</h4> <p>{dataOneMed.skupina}</p>
      </div>
      <div className="oneMed-data">
        <h4>Indikacie:</h4> <p>{dataOneMed.indikacie}</p>
      </div>
      <div className="oneMed-data">
        <h4>Sposob podania:</h4> <p>{dataOneMed.sposobPodania}</p>
      </div>
      <div className="oneMed-data">
        <h4>Davkovanie:</h4> <p>{dataOneMed.davkovanie}</p>
      </div>
      <div className="oneMed-data">
        <h4>Nastup a odoznenie ucinku:</h4>{" "}
        <p>{dataOneMed.nastupAodoznenieUcinku}</p>
      </div>
      <div className="oneMed-data">
        <h4>Mechanizmus ucinku:</h4> <p>{dataOneMed.MU}</p>
      </div>
      <div className="oneMed-data">
        <h4>Neziaduce ucinky:</h4> <p>{dataOneMed.NU}</p>
      </div>
      <div className="oneMed-data">
        <h4>Kontraindikacie:</h4> <p>{dataOneMed.KI}</p>
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
