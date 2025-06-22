import { FC } from "react";

interface SpendLimitProps {
  limit: number | null;
  onChange: (value: number | null) => void;
}

const SpendLimit: FC<SpendLimitProps> = ({ limit, onChange }) => {
  return (
    <div>
      <p className="font-medium">Giới hạn chi tiêu (VND)</p>

      <input
        type="number"
        value={limit ?? ""}
        onChange={(e) =>
          onChange(e.target.value ? Number(e.target.value) : null)
        }
        className="mt-2 w-full rounded-md border px-2 py-1"
        placeholder="Nhập số tiền"
      />

      {/* Nút xoá nhanh */}
      {limit !== null && (
        <button
          onClick={() => onChange(null)}
          className="mt-2 rounded-md border px-2 py-1 text-sm"
        >
          Xoá giới hạn
        </button>
      )}
    </div>
  );
};

export default SpendLimit;
