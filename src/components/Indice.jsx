export default function Indice({ dernier, mystere }) {
  if (dernier === undefined) {
    return <p className="indice">Faites une première proposition.</p>;
  }

  const trop = dernier > mystere;
  return (
    <p className={`indice ${trop ? "indice-grand" : "indice-petit"}`} role="status">
      {trop ? "Trop grand !" : "Trop petit !"}
    </p>
  );
}
