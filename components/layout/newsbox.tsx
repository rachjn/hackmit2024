import format from "date-fns/format";
import { LuAlertTriangle, LuSquirrel } from "react-icons/lu";

export default function NewsBox({ alert }: any) {
  const BadEvent = alert.alert_type !== "";
  const EventTime = format(alert.ping_time, "MMM d, yyyy, h:mm a");

  return (
    <>
      {BadEvent ? (
        <div className="border rounded p-4 bg-red-800 bg-opacity-20 border-red-800 text-red-800">
          <div>
            <div className="uppercase flex items-center gap-2 font-bold">
              <LuAlertTriangle />
              {alert.alert_type}
            </div>
            {alert.num_animal} {alert.animal}
            {alert.num_animal > 1 ? "s" : ""} spotted on {EventTime}.
          </div>
        </div>
      ) : (
        <div className="border rounded p-4 flex items-center gap-2 bg-green-800 bg-opacity-20 border-green-800 text-green-800">
          <LuSquirrel />
          {alert.num_animal} {alert.animal}
          {alert.num_animal > 1 ? "s" : ""} seen on {EventTime}.
        </div>
      )}
    </>
  );
}
