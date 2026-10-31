export default function Resultat({
  gagne, mystere, essais, record, onRejouer, onChangerNiveau,
}) {
  return (
    <section className={`resultat ${gagne ? "victoire" : "defaite"}`} role="status">
      {gagne ? (
        <>
          <h2>Bravo !</h2>
          <p>
            Vous avez trouvé {mystere} en {essais}{" "}
            {essais > 1 ? "tentatives" : "tentative"}.
          </p>
          {record === essais && <p className="record">Nouveau record pour ce niveau.</p>}
        </>
      ) : (
        <>
          <h2>Perdu</h2>
          <p>Le nombre mystère était {mystere}.</p>
        </>
      )}
      <div className="actions">
        <button onClick={onRejouer}>Nouvelle partie</button>
        <button className="secondaire" onClick={onChangerNiveau}>
          Changer de niveau
        </button>
      </div>
    </section>
  );
}
