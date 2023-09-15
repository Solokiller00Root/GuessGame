import { useRouter } from "next/navigation";
import CustomButton from "../CustomButton";

export default function GameStatusFinished() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center gap-4 my-6 md:w-2/3">
      <h1 className="text-2xl font-bold md:text-4xl">Game is finished!</h1>
      <div>
        <CustomButton
          handleClick={() => {
            router.push("/#games");
          }}
        >
          PLAY AGAIN!
        </CustomButton>
      </div>
    </div>
  );
}
