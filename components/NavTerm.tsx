import { Range, TypeItem } from "@/types/spotifyTypes";
import { Dispatch, SetStateAction } from "react";

type NavTermProps = {
    setRange: Dispatch<SetStateAction<Range>>;
    setTypeItem: Dispatch<SetStateAction<TypeItem>>;
};

const NavTerm = ({ setRange, setTypeItem }: NavTermProps) => (
    <nav>
        <ul style={{ listStyleType: "none", display: "flex", gap: "3em" }}>
            <li>
                <button onClick={() => setRange("short_term")}>1 month</button>
            </li>
            <li>
                <button onClick={() => setRange("medium_term")}>6 months</button>
            </li>
            <li>
                <button onClick={() => setRange("long_term")}>All time</button>
            </li>
        </ul>

        <ul style={{ listStyleType: "none", display: "flex", gap: "3em" }}>
            <li>
                <button onClick={() => setTypeItem("artists")}>Artists</button>
            </li>
            <li>
                <button onClick={() => setTypeItem("tracks")}>Tracks</button>
            </li>
        </ul>
    </nav>
);

export default NavTerm;
