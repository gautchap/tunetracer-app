import { getServerSession } from "next-auth";
import { GetServerSideProps } from "next/types";
import { authOptions } from "./api/auth/[...nextauth]";
import PlayerSection from "@/components/PlayerSection";
import NextTrackList from "@/components/NextTrackList";

export default function Playing() {
    return (
        <div className="flex">
            <div className="w-1/3">
                <p>Discover New Music</p>
                <div>
                    <h2>Top chart</h2>
                    <div className="flex flex-wrap">
                        <div className="w-1/2">
                            <img
                                className="rounded"
                                src="https://i.scdn.co/image/ab67616d000048512bc92df808bf68e6610513b3"
                                alt="test"
                            />
                            <p>titre</p>
                            <p>artist</p>
                        </div>
                        <div className="w-1/2">
                            <img src="https://i.scdn.co/image/ab67616d000048512bc92df808bf68e6610513b3" alt="test" />
                            <p>titre</p>
                            <p>artist</p>
                        </div>
                        <div className="w-1/2">
                            <img src="https://i.scdn.co/image/ab67616d000048512bc92df808bf68e6610513b3" alt="test" />
                            <p>titre</p>
                            <p>artist</p>
                        </div>
                        <div className="w-1/2">
                            <img src="https://i.scdn.co/image/ab67616d000048512bc92df808bf68e6610513b3" alt="test" />
                            <p>titre</p>
                            <p>artist</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-x w-1/3 flex flex-col bg-secondary">
                <PlayerSection />
            </div>
            <div className="w-1/3">
                <h2>Track list</h2>
                <div>
                    <p>playing next</p>
                    <NextTrackList />
                </div>
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};
