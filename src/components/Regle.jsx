import { MIN, MAX } from "../niveaux";

// Règle graduée de 1 à 100 : la zone colorée montre où se cache encore le nombre.
export default function Regle({ min, max }) {
  const etendue = MAX - MIN;
  const gauche = ((min - MIN) / etendue) * 100;
  const largeur = ((max - min) / etendue) * 100;

  return (
    <div className="regle" aria-label={`Le nombre est entre ${min} et ${max}`}>
      <div className="regle-piste">
        <div
          className="regle-zone"
          style={{ left: `${gauche}%`, width: `${Math.max(largeur, 1)}%` }}
        />
      </div>
      <div className="regle-bornes">
        <span>{MIN}</span>
        <span className="regle-plage">
          entre {min} et {max}
        </span>
        <span>{MAX}</span>
      </div>
    </div>
  );
}
