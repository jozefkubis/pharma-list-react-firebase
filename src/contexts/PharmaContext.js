import { createContext, useContext, useReducer, useEffect } from "react"
import { projectFirestore } from "../firebase/config"

const PharmaContext = createContext()

const initialState = {
  data: [],
  error: "",
  searchTerm: "",
  skupina: "",
  nazov: "",
  indikacie: "",
  sposobPodania: "",
  davkovanie: "",
  nastupAodoznenieUcinku: "",
  MU: "",
  NU: "",
  KI: "",
}

const reducer = (state, action) => {
  switch (action.type) {
    case "setData":
      return { ...state, data: action.payload }
    case "setError":
      return { ...state, error: action.payload }
    case "setSearchTerm":
      return { ...state, searchTerm: action.payload }
    case "setNazov":
      return { ...state, nazov: action.payload }
    case "setSkupina":
      return { ...state, skupina: action.payload }
    case "setIndikacie":
      return { ...state, indikacie: action.payload }
    case "setSposobPodania":
      return { ...state, sposobPodania: action.payload }
    case "setDavkovanie":
      return { ...state, davkovanie: action.payload }
    case "setNastupAodoznenieUcinku":
      return { ...state, nastupAodoznenieUcinku: action.payload }
    case "setMU":
      return { ...state, MU: action.payload }
    case "setNU":
      return { ...state, NU: action.payload }
    case "setKI":
      return { ...state, KI: action.payload }

    default:
      throw new Error("Unknown action")
  }
}

function PharmaProvider({ children }) {
  const [
    {
      data,
      error,
      searchTerm,
      skupina,
      indikacie,
      nazov,
      sposobPodania,
      davkovanie,
      nastupAodoznenieUcinku,
      MU,
      NU,
      KI,
    },
    dispatch,
  ] = useReducer(reducer, initialState)

  useEffect(() => {
    return projectFirestore.collection("ampularium").onSnapshot(
      (snapshot) => {
        dispatch({
          type: "setError",
          payload: snapshot.empty ? "No data available" : "",
        })
        dispatch({
          type: "setData",
          payload: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        })
      },
      (err) => dispatch({ type: "setError", payload: err.message })
    )
  }, [])

  const addSearch = () => {
    document.querySelector(".home-h1").classList.add("hidden")
    document.querySelector(".home-data").classList.add("data-toggle")
  }

  const removeSearch = () => {
    document.querySelector(".home-h1").classList.remove("hidden")
    document.querySelector(".home-data").classList.remove("data-toggle")
  }

  const handleSearchChange = (e) => {
    dispatch({ type: "setSearchTerm", payload: e.target.value })
  }

  const filteredData = Array.isArray(data)
    ? data.filter((oneMed) =>
        oneMed.nazov.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : data

  return (
    <PharmaContext.Provider
      value={{
        data,
        error,
        searchTerm,
        handleSearchChange,
        removeSearch,
        filteredData,
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
        addSearch,
      }}
    >
      {children}
    </PharmaContext.Provider>
  )
}

function usePharma() {
  const context = useContext(PharmaContext)
  if (context === undefined) {
    throw new Error("usePharma must be used within a PharmaProvider")
  }
  return context
}

export { PharmaProvider, usePharma }
