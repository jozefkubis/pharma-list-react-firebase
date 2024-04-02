import "./Form.css"
import { useState } from "react"
import { projectFirestore } from "../firebase/config"

const Form = () => {
  const [skupina, setSkupina] = useState("")
  const [nazov, setNazov] = useState("")
  const [indikacie, setIndikacie] = useState("")
  const [sposobPodania, setSposobPodania] = useState("")
  const [davkovanie, setDavkovanie] = useState("")
  const [nastupAodoznenieUcinku, setNastupAodoznenieUcinku] = useState("")
  const [MU, setMU] = useState("")
  const [NU, setNU] = useState("")
  const [KI, setKI] = useState("")

  const submitForm = async (e) => {
    e.preventDefault()

    const newMedicine = {
      skupina,
      nazov,
      indikacie,
      sposobPodania,
      davkovanie,
      nastupAodoznenieUcinku,
      MU,
      NU,
      KI,
    }

    try {
      await projectFirestore.collection("ampularium").add(newMedicine)
      setNazov("")
      setSkupina("")
      setIndikacie("")
      setSposobPodania("")
      setDavkovanie("")
      setNastupAodoznenieUcinku("")
      setMU("")
      setNU("")
      setKI("")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="form-section">
      <form onSubmit={submitForm}>
        <input
          type="text"
          placeholder="Nazov lieku"
          onChange={(e) => setNazov(e.target.value)}
          value={nazov}
          className="input-input"
        />
        <br />

        <input
          type="text"
          placeholder="Skupina liekov"
          onChange={(e) => setSkupina(e.target.value)}
          value={skupina}
          className="input-input"
        />
        <br />

        <textarea
          type="text"
          placeholder="Indikacie"
          onChange={(e) => setIndikacie(e.target.value)}
          value={indikacie}
          className="textarea"
        />
        <br />

        <textarea
          type="text"
          placeholder="Sposob podania"
          onChange={(e) => setSposobPodania(e.target.value)}
          value={sposobPodania}
          className="textarea"
        />
        <br />

        <textarea
          type="text"
          placeholder="Davkovanie"
          onChange={(e) => setDavkovanie(e.target.value)}
          value={davkovanie}
          className="input-input"
        />
        <br />

        <textarea
          type="text"
          placeholder="Nastup a odoznenie ucinku"
          onChange={(e) => setNastupAodoznenieUcinku(e.target.value)}
          value={nastupAodoznenieUcinku}
          className="input-input"
        />
        <br />

        <textarea
          type="text"
          placeholder="Mechanizmus ucinku"
          onChange={(e) => setMU(e.target.value)}
          value={MU}
          className="textarea"
        />
        <br />

        <textarea
          type="text"
          placeholder="Neziaduce ucinky"
          onChange={(e) => setNU(e.target.value)}
          value={NU}
          className="textarea"
        />
        <br />

        <textarea
          type="text"
          placeholder="Kontraindikacie"
          onChange={(e) => setKI(e.target.value)}
          value={KI}
          className="textarea"
        />
        <br />

        <input type="submit" value="Vlozit" />
      </form>
    </section>
  )
}

export default Form
