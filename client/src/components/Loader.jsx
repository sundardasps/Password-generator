
import { SyncLoader } from "react-spinners";

function Loder() {
  return (
    <div className="h-auto flex justify-center items-center animate-pulse zoomInOut">
      <div className="">
        <SyncLoader color="#FFFFFF" />
      </div>
    </div>
  );
}

export default Loder;
