import { useState } from "react";
import { MIN, MAX } from "../niveaux";

export default function Saisie({ historique, onValider }) {
  const [texte, setTexte] = useState("");
  const [erreur, setErreur] = useState("");

  function soumettre(e) {
    e.preventDefault();
    const valeur = Number(texte);

    if (texte.trim() === "" || !Number.isInteger(valeur) || valeur < MIN || valeur > MAX) {
      setErreur(`Saisissez un entier entre ${MIN} et ${MAX}.`);
      return;
    }
    if (historique.includes(valeur)) {
      setErreur(`Vous avez déjà essayé ${valeur}.`);
      return;
    }

    setErreur("");
    setTexte("");
    onValider(valeur);
  }

  return (
    <form className="saisie" onSubmit={soumettre}>
      <label htmlFor="nombre">Votre proposition</label>
      <div className="saisie-ligne">
        <input
          id="nombre"
          type="number"
          inputMode="numeric"
          min={MIN}
          max={MAX}
          value={texte}
          onChange={(e) => setTexte(e.target.value)}
          autoFocus
        />
        <button type="submit">Vérifier</button>
      </div>
      {erreur && <p className="erreur" role="alert">{erreur}</p>}
    </form>
  );
}
