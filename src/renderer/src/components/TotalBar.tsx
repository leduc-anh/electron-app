import { FC } from "react";

interface TotalBarProps {
  total: number;
  limit: number | null;
}

const TotalBar: FC<TotalBarProps> = ({ total, limit }) => {
  const over = limit !== null && total > limit;

  return (
    <div className="p-4 border rounded-xl bg-white">
      <p className="text-sm text-gray-500">Tổng cộng</p>
      <p className="text-2xl font-bold">{total.toLocaleString()} đ</p>
      {over && (
        <p className="text-sm text-red-600 mt-2">
          Vượt quá giới hạn {limit.toLocaleString()} đ
        </p>
      )}
    </div>
  );
};

export default TotalBar;
