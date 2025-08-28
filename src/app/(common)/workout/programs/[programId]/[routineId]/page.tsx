import Excercise from "@/components/common/Excercise";
import Timer from "@/components/common/Timer";
// export default function RoutinePage() {
//   return <div>Workout Record Page for program </div>;
// }
export default function RoutinePage({
  params,
}: {
  params: { routineId: number };
}) {
  return (
    <div>
      <div className="flex flex-col gap-[10px]">
        <Excercise />
        <Excercise />
        <Excercise />
      </div>
      <Timer />
    </div>
  );
}
