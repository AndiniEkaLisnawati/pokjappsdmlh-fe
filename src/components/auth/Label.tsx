export default function Label({
  text,
  htmlFor,
}: {
  text: string;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {text}
    </label>
  );
}