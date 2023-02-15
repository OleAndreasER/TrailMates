import "./Header.css";
import img from"../assets/cover.svg"
import { ReactComponent as SearchIcon } from '../assets/search_icon.svg';


export const Header = () => {
  return (
    <header className="cover" style={{ backgroundImage: `url(${img})` }}>
      <h1>Hva er ditt<br/> neste reisemål?</h1>
      <form className="search-cover">
        <input
          type="text"
          placeholder="Mitt neste reisemål er..."
          name="search"
          className="search-bar-cover"
        />
        <button type="submit" className="search-button">
          <SearchIcon/>
        </button>
      </form>
    </header>
  );
};
