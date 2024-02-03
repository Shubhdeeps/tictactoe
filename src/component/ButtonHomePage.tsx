import { useNavigate } from "react-router-dom";
export default function ButtonHomePage({ text = "Home" }: { text?: string }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="text-slate-50 font-bold mt-4 border rounded p-2 px-8"
    >
      {text}
    </button>
  );
}
