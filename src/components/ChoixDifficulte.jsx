import { NIVEAUX } from "../niveaux";

export default function ChoixDifficulte({ meilleurs, onChoisir }) {
  return (
    <section>
      <p className="intro">
        J'ai choisi un nombre entre 1 et 100. Trouvez-le en un minimum de
        tentatives.
      </p>
      <div className="niveaux">
        {Object.entries(NIVEAUX).map(([cle, { label, tentatives }]) => (
          <button key={cle} className="carte-niveau" onClick={() => onChoisir(cle)}>
            <span className="carte-titre">{label}</span>
            <span>{tentatives} tentatives</span>
            <span className="carte-record">
              {meilleurs[cle] !== undefined
                ? `Record : ${meilleurs[cle]} ${meilleurs[cle] > 1 ? "essais" : "essai"}`
                : "Pas encore de record"}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
