import "./Form.css"
import { projectFirestore } from "../firebase/config"
import { FaSave } from "react-icons/fa"
import { usePharma } from "../contexts/PharmaContext"

const Form = () => {
  const {
    skupina,
    nazov,
    indikacie,
    sposobPodania,
    davkovanie,
    nastupAodoznenieUcinku,
    MU,
    NU,
    KI,
    dispatch,
  } = usePharma()

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

      const fieldsToReset = [
        "setNazov",
        "setSkupina",
        "setIndikacie",
        "setSposobPodania",
        "setDavkovanie",
        "setNastupAodoznenieUcinku",
        "setMU",
        "setNU",
        "setKI",
      ]

      fieldsToReset.forEach((field) => dispatch({ type: field, payload: "" }))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="form-section">
      <form onSubmit={submitForm} className="form-form">
        <input
          type="text"
          placeholder="Nazov lieku"
          onChange={(e) =>
            dispatch({ type: "setNazov", payload: e.target.value })
          }
          value={nazov}
          className="input-input"
        />

        <input
          type="text"
          placeholder="Skupina liekov"
          onChange={(e) =>
            dispatch({ type: "setSkupina", payload: e.target.value })
          }
          value={skupina}
          className="input-input"
        />

        <textarea
          type="text"
          placeholder="Indikacie"
          onChange={(e) =>
            dispatch({ type: "setIndikacie", payload: e.target.value })
          }
          value={indikacie}
          className="textarea"
        />

        <textarea
          type="text"
          placeholder="Sposob podania"
          onChange={(e) =>
            dispatch({ type: "setSposobPodania", payload: e.target.value })
          }
          value={sposobPodania}
          className="textarea"
        />

        <textarea
          type="text"
          placeholder="Davkovanie"
          onChange={(e) =>
            dispatch({ type: "setDavkovanie", payload: e.target.value })
          }
          value={davkovanie}
          className="textarea"
        />

        <textarea
          type="text"
          placeholder="Nastup a odoznenie ucinku"
          onChange={(e) =>
            dispatch({
              type: "setNastupAodoznenieUcinku",
              payload: e.target.value,
            })
          }
          value={nastupAodoznenieUcinku}
          className="textarea"
        />

        <textarea
          type="text"
          placeholder="Mechanizmus ucinku"
          onChange={(e) => dispatch({ type: "setMU", payload: e.target.value })}
          value={MU}
          className="textarea"
        />

        <textarea
          type="text"
          placeholder="Neziaduce ucinky"
          onChange={(e) => dispatch({ type: "setNU", payload: e.target.value })}
          value={NU}
          className="textarea"
        />

        <textarea
          type="text"
          placeholder="Kontraindikacie"
          onChange={(e) => dispatch({ type: "setKI", payload: e.target.value })}
          value={KI}
          className="textarea"
        />

        <button className="vlozit">
          Vlozit <FaSave />
        </button>
      </form>
    </section>
  )
}

export default Form
