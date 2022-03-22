import "./FilterCheckbox.css";

function FilterCheckbox(props) {
  return (
    <section className="filter-checkbox">
      <label className="filter-checkbox__container">
        <input
          onChange={props.onFilter}
          checked={props.isChecked}
          type="checkbox"
          name="short-movies"
          id="short-movies"
          className="filter-checkbox__input"
        ></input>
        Short films
        <span className="filter-checkbox__toggle"></span>
      </label>
    </section>
  );
}

export default FilterCheckbox;
