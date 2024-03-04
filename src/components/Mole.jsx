export default function Mole() {
  function handleQuantity(e) {
    //quantity = e.target.value;
    console.log(e.target);
  }

  return (
    <button className="mole" onClick={handleQuantity}>
      {" "}
    </button>
  );
}
