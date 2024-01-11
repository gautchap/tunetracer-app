import { Skeleton } from "./ui/skeleton";

type PlayerSkeletonProps = {
    size?: "sm" | "md";
};

export default function PlayerSkeleton({ size = "md" }: PlayerSkeletonProps) {
    const width = size === "sm" ? "h-16 w-16" : "w-[300px] h-[300px]";

    return (
        <div
            role="status"
            className={`flex ${size === "md" && "flex-col"} space-y-4 animate-pulse rtl:space-x-reverse items-center`}
        >
            <div
                className={`flex items-center justify-center ${width}  bg-primary/10 rounded-md shadow-xl dark:bg-gray-700`}
            >
                <svg
                    className="w-32 h-32 text-primary/10"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                >
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
            </div>

            <Skeleton className="w-1/2 h-4" />
            <Skeleton className="w-1/2 h-4" />
        </div>
    );
}
