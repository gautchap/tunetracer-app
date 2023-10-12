import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export const ArtistLoader = () => {
  return (
    <article>
      <Skeleton className="w-[100px] h-[25px] ml-1 mb-1" />
      <Skeleton className="w-[160px] h-[155px] rounded-2xl" />
    </article>
  );
};

export const TrackLoader = ({ index }: { index: number }) => {
  return (
    <TableRow>
      <TableCell className="font-medium flex items-center gap-3">
        #{index + 1}
        <Skeleton className="w-[50px] h-[50px] rounded-lg" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-[100px] h-[20px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-[100px] h-[20px]" />
      </TableCell>
    </TableRow>
  );
};
