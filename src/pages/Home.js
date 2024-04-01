import "./Home.css"
import { projectFirestore } from "../firebase/config"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Home = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState("")

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

  return (
    <section>
      {error && <p>{error}</p>}
      {data.map((oneMed) => {
        const { id, nazov, skupina } = oneMed

        return (
          <div className="medicine" key={id}>
            <h3>{nazov}</h3>
            <p>{skupina}</p>
            <Link to={`/onemed/${id}`}>Detail</Link>
          </div>
        )
      })}
    </section>
  )
}

export default Home
