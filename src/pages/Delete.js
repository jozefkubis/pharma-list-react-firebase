import "./Delete.css";
import { projectFirestore } from "../firebase/config";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Delete = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const unsubscribe = projectFirestore.collection("ampularium").onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setError("No data available");
        } else {
          const dataArray = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setData(dataArray);
        }
      },
      (err) => setError(err.message)
    );

    return unsubscribe;
  }, []);

  const deleteMedicine = (id) => {
    projectFirestore.collection("ampularium").doc(id).delete();
    // Aktualizácia dát po zmazaní
    setData(data.filter((item) => item.id !== id));
  };

  const filteredData = searchTerm
    ? data.filter((oneMed) =>
        oneMed.nazov.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : data;

  return (
    <section>
      <form>
        <input
          className="search-input"
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
            <button type="button" onClick={() => deleteMedicine(id)}>
              Zmazat
            </button>
          </div>
        ))
      ) : (
        <p>Nenašli sa žiadne výsledky</p>
      )}

      <Link to="/">Spat do ampularia</Link>
    </section>
  );
};

export default Delete;
