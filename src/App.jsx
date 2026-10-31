import { useState } from "react";
import { NIVEAUX, MIN, MAX } from "./niveaux";
import ChoixDifficulte from "./components/ChoixDifficulte";
import Regle from "./components/Regle";
import Saisie from "./components/Saisie";
import Indice from "./components/Indice";
import Historique from "./components/Historique";
import Resultat from "./components/Resultat";

const CLE_SCORES = "nombre-mystere-meilleurs-scores";

function lireScores() {
  try {
    return JSON.parse(localStorage.getItem(CLE_SCORES)) ?? {};
  } catch {
    return {};
  }
}

function sauverScores(scores) {
  try {
    localStorage.setItem(CLE_SCORES, JSON.stringify(scores));
  } catch {
    /* stockage indisponible : le jeu continue sans sauvegarde */
  }
}

function tirerNombre() {
  return Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
}

export default function App() {
  const [niveau, setNiveau] = useState(null);
  const [mystere, setMystere] = useState(tirerNombre);
  const [historique, setHistorique] = useState([]);
  const [meilleurs, setMeilleurs] = useState(lireScores);

  // ---- Valeurs dérivées de l'état ----
  const maxTentatives = niveau ? NIVEAUX[niveau].tentatives : 0;
  const restantes = maxTentatives - historique.length;
  const dernier = historique[historique.length - 1];
  const gagne = dernier === mystere;
  const perdu = !gagne && niveau !== null && restantes === 0;
  const termine = gagne || perdu;

  // Bornes encore possibles, déduites des propositions déjà faites
  const bas = historique.filter((n) => n < mystere);
  const haut = historique.filter((n) => n > mystere);
  const borneMin = bas.length ? Math.max(...bas) + 1 : MIN;
  const borneMax = haut.length ? Math.min(...haut) - 1 : MAX;

  function demarrer(nouveauNiveau) {
    setNiveau(nouveauNiveau);
    setMystere(tirerNombre());
    setHistorique([]);
  }

  function verifierNombre(valeur) {
    const nouvelHistorique = [...historique, valeur];
    setHistorique(nouvelHistorique);

    if (valeur === mystere) {
      const essais = nouvelHistorique.length;
      const record = meilleurs[niveau];
      if (record === undefined || essais < record) {
        const maj = { ...meilleurs, [niveau]: essais };
        setMeilleurs(maj);
        sauverScores(maj);
      }
    }
  }

  function rejouer() {
    demarrer(niveau);
  }

  function changerNiveau() {
    setNiveau(null);
    setHistorique([]);
  }

  return (
    <main className="app">
      <h1>Nombre mystère</h1>

      {niveau === null ? (
        <ChoixDifficulte meilleurs={meilleurs} onChoisir={demarrer} />
      ) : (
        <>
          <p className="niveau">
            Niveau {NIVEAUX[niveau].label.toLowerCase()} · {maxTentatives}{" "}
            tentatives
          </p>

          <Regle min={borneMin} max={borneMax} />

          {!termine && (
            <>
              <Indice dernier={dernier} mystere={mystere} />
              <p className="restantes">
                <strong>{restantes}</strong>{" "}
                {restantes > 1 ? "tentatives restantes" : "tentative restante"}
              </p>
              <Saisie historique={historique} onValider={verifierNombre} />
            </>
          )}

          {termine && (
            <Resultat
              gagne={gagne}
              mystere={mystere}
              essais={historique.length}
              record={meilleurs[niveau]}
              onRejouer={rejouer}
              onChangerNiveau={changerNiveau}
            />
          )}

          <Historique historique={historique} mystere={mystere} />
        </>
      )}
    </main>
  );
}
