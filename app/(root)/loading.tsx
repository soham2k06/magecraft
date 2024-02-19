import { Loader2 } from "lucide-react";
import Image from "next/image";

function loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Loader2 className="animate-spin size-12" />
    </div>
  );
}

export default loading;
