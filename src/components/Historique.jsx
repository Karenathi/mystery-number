export default function Historique({ historique, mystere }) {
  if (historique.length === 0) return null;

  return (
    <section className="historique">
      <h2>Vos propositions</h2>
      <ul>
        {historique.map((n, index) => (
          <li
            key={index}
            className={n === mystere ? "ok" : n > mystere ? "grand" : "petit"}
          >
            {n}
            <span className="fleche" aria-hidden="true">
              {n === mystere ? " ✓" : n > mystere ? " ↓" : " ↑"}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
