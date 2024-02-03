export default function Loader({
  text,
  error,
}: {
  text: string;
  error?: boolean;
}) {
  const Err_Class = error ? "text-orange-700" : "text-slate-50 animate-pulse";
  return (
    <div
      className={`text-3xl  absolute h-full w-full flex items-center justify-center ${Err_Class}`}
    >
      {text}
    </div>
  );
}
