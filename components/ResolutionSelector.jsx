"use client";
// Render a dropdown to select a resolution
export default function ResolutionSelector({
  label,
  currentValue,
  onChange,
  id,
}) {
  const resolutions = [
    { label: "640x480 (SD)", value: "640x480" },
    { label: "1280x720 (HD)", value: "1280x720" },
    { label: "1920x1080 (Full HD)", value: "1920x1080" },
  ];

  return (
    <div className="mb-4">
      <label htmlFor={id} className="mr-2 font-semibold text-gray-300">
        {label}
      </label>
      <select
        id={id}
        onChange={(e) => {
          const [w, h] = e.target.value.split("x");
          onChange({ width: Number(w), height: Number(h) });
        }}
        className="bg-gray-800 text-white border border-gray-600 rounded p-1"
        value={`${currentValue.width}x${currentValue.height}`}
      >
        {resolutions.map((res) => (
          <option key={res.value} value={res.value}>
            {res.label}
          </option>
        ))}
      </select>
    </div>
  );
}
