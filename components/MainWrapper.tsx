import { Session } from "next-auth";
import { useState } from "react";
import { Range, TypeItem } from "@/types/spotifyTypes";
import TracksWrapper from "@/components/TracksWrapper";
import ArtistsWrapper from "@/components/ArtistsWrapper";
import NavTerm from "./NavTerm";

type WrapperProps = {
    session: Session;
};

const MainWrapper = ({ session }: WrapperProps) => {
    const [range, setRange] = useState<Range>("medium_term");
    const [typeItem, setTypeItem] = useState<TypeItem>("tracks");

    return (
        <>
            <NavTerm setRange={setRange} setTypeItem={setTypeItem} />

            {typeItem === "artists" ? (
                <ArtistsWrapper session={session} range={range} />
            ) : (
                <TracksWrapper session={session} range={range} />
            )}
        </>
    );
};

export default MainWrapper;
