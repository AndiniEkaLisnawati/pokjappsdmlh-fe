export default function AuthForm({
  children,
  btnType = "submit",
  btnText = "Submit",
  onsubmit,
}: {
  children: React.ReactNode;
  btnType?: "submit" | "button";
  btnText?: string;
  onsubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <div className="text-center mb-6">
        </div>
        <form onSubmit={onsubmit} className="space-y-4">
          {children}
          <button
            type={btnType}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            {btnText}
          </button>
        </form>
      </div>
    </div>
  );
}