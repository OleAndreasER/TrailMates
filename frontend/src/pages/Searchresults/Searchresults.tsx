import { useSearchParams } from "react-router-dom";

/** TODO: This is just a stub for further development*/
const Searchresults = () => {
    let [searchParams, setSearchParams] = useSearchParams();

    return (
        <h2>{`Søkeord: ${searchParams.get("query")}`}</h2>
    );
}

export default Searchresults;