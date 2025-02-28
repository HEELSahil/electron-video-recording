"use client";

// Render a dropdown to select a resolution
export default function ResolutionSelector({
  label,
  currentValue,
  onChange,
  id,
}) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mr-2 font-semibold">
        {label}
      </label>
      <select
        id={id}
        onChange={(e) => {
          const [w, h] = e.target.value.split("x");
          onChange({ width: Number(w), height: Number(h) });
        }}
        className="border rounded p-1"
        defaultValue={currentValue.width + "x" + currentValue.height}
      >
        <option value="640x480">640x480</option>
        <option value="1280x720">1280x720</option>
        <option value="1920x1080">1920x1080</option>
      </select>
    </div>
  );
}
