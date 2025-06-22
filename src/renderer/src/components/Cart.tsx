import { FC } from "react";
import { Product } from "../types";

interface CartProps {
  cart: Product[];
  addToCart: (p: Product) => void;
}

// Dữ liệu mẫu
const sample: Product[] = [
  { id: "1", name: "Trà sữa", price: 30000 },
  { id: "2", name: "Bánh mì", price: 20000 },
];

const Cart: FC<CartProps> = ({ cart, addToCart }) => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold">Danh sách sản phẩm</h2>
    <div className="grid grid-cols-2 gap-4">
      {sample.map((p) => (
        <div
          key={p.id}
          className="border rounded-xl p-4 flex flex-col items-center"
        >
          <p className="mt-2">{p.name}</p>
          <p className="text-sm text-gray-500">{p.price.toLocaleString()} đ</p>
          <button
            onClick={() => addToCart(p)}
            className="mt-2 text-white bg-green-600 px-3 py-1 rounded-md"
          >
            Thêm
          </button>
        </div>
      ))}
    </div>

    <h2 className="text-xl font-semibold mt-8">Giỏ hàng</h2>
    {cart.length === 0 && <p className="text-gray-500">Chưa có sản phẩm.</p>}
    <ul className="space-y-2">
      {cart.map((item, idx) => (
        <li key={idx} className="flex justify-between">
          <span>{item.name}</span>
          <span>{item.price.toLocaleString()} đ</span>
        </li>
      ))}
    </ul>
  </div>
);

export default Cart;
