"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Minus,
  ShoppingBag,
  Wallet,
  CreditCard,
  X,
} from "lucide-react";

import { Button } from "../components/button";
import { Card, CardContent } from "../components/card";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { Separator } from "../components/separator";

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

const initialCart: Product[] = [
  { id: "1", name: "Trà sữa", price: 30_000, quantity: 2 },
  { id: "2", name: "Bánh mì", price: 20_000, quantity: 1 },
  { id: "3", name: "Cà phê", price: 25_000, quantity: 3 },
];

const Home = (): JSX.Element => {
  const [cartItems, setCartItems] = useState<Product[]>(initialCart);
  const [limit, setLimit] = useState<number | null>(null);
  const [limitInput, setLimitInput] = useState<string>("");
  const [showAlert, setShowAlert] = useState(false);
  const [isEditingLimit, setIsEditingLimit] = useState(true);
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const confirmLimit = (): void => {
    const val = Number(limitInput);
    if (!Number.isNaN(val) && val > 0) {
      setLimit(val);
      setIsEditingLimit(false);
    } else {
      // nếu nhập không hợp lệ, vẫn ở chế độ nhập
      setLimit(null);
    }
  };
  const isOverLimit = limit !== null && total > limit;
  const startEditing = (): void => {
    setLimitInput(limit !== null ? limit.toString() : "");
    setIsEditingLimit(true);
  };
  /* -------------------------------- Effects -------------------------------- */
  useEffect(() => {
    // Hiển thị / ẩn popup cảnh báo tuỳ theo trạng thái vượt giới hạn
    setShowAlert(isOverLimit);
  }, [isOverLimit]);

  /* --------------------------- Helper functions ---------------------------- */
  const updateQuantity = (id: string, newQty: number): void => {
    if (newQty <= 0) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item,
      ),
    );
  };

  const removeItem = (id: string): void => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  /* --------------------------------- Render -------------------------------- */
  return (
    <div className="relative flex h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* ========================= Main (Cart) column ========================= */}
      <div className="flex flex-1 flex-col">
        {/* ---------- Header ---------- */}
        <div className="bg-white/80 backdrop-blur-md border-b border-pink-100 p-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <div className="text-center">
              <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                S.T.E.A.R
              </h1>
              <p className="text-xs text-gray-500">Giỏ hàng của bạn</p>
            </div>

            <div className="relative">
              <ShoppingBag className="h-5 w-5 text-pink-600" />
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {cartItems.length}
              </span>
            </div>
          </div>
        </div>

        {/* ---------- Cart items ---------- */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.map((item, index) => (
            <Card
              key={item.id}
              className="overflow-hidden border-0 shadow bg-white/70 backdrop-blur-sm hover:shadow-md transition-all duration-300"
            >
              <CardContent className="p-3">
                <div className="flex items-center space-x-3">
                  {/* Emoji / image box */}
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-200 to-purple-200 rounded-xl flex items-center justify-center">
                    <span className="text-lg">
                      {index === 0 ? "🍵" : index === 1 ? "🥖" : "☕"}
                    </span>
                  </div>

                  {/* Name & price */}
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-pink-600 font-medium text-xs">
                      {item.price.toLocaleString()} đ
                    </p>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 rounded-full border-pink-200"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-5 text-center text-xs font-semibold">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 rounded-full border-pink-200"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Sub-total & remove */}
                <div className="mt-2 pt-2 border-t border-pink-100 flex justify-between items-center text-xs">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => removeItem(item.id)}
                  >
                    Xóa
                  </Button>
                  <span className="font-semibold text-gray-700">
                    {(item.price * item.quantity).toLocaleString()} đ
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* ========================= Sidebar (Checkout) ========================= */}
      <div className="text-base w-48 bg-white/90 backdrop-blur-md border-l border-pink-100 shadow-inner overflow-y-auto scrollbar-hidden">
        <div className="h-full flex flex-col p-4">
          {/* Title */}
          <div className="text-center mb-4">
            <h2 className="text-sm font-bold text-gray-800 mb-1">Thanh toán</h2>
            <p className="text-gray-500 text-xs">Hoàn tất đơn hàng</p>
          </div>

          {/* --------- Spending limit card --------- */}
          <Card className="mb-4 border-0 shadow-md bg-gradient-to-r from-purple-50 to-pink-50">
            <CardContent className="p-3">
              <div className="flex items-center space-x-2 mb-2">
                <div className="p-1 bg-purple-100 rounded-full">
                  <Wallet className="text-purple-600 h-4 w-4" />
                </div>
                <Label className="text-xs font-semibold text-gray-800">
                  Giới hạn chi tiêu
                </Label>
              </div>

              {/* --- Chế độ nhập / xem --- */}
              {isEditingLimit ? (
                /* ---- Input + OK ---- */
                <div className="flex items-center gap-1">
                  <Input
                    type="number"
                    placeholder="Số tiền"
                    value={limitInput}
                    onChange={(e) => setLimitInput(e.target.value)}
                    className="border-purple-200 h-8 text-xs flex-1"
                  />
                  <Button size="sm" className="h-8" onClick={confirmLimit}>
                    OK
                  </Button>
                </div>
              ) : (
                /* ---- Hiển thị số + Sửa ---- */
                <div className="flex items-center gap-1">
                  <span className="text-xs font-semibold flex-1">
                    {limit?.toLocaleString()} đ
                  </span>
                  <Button size="sm" className="h-8" onClick={startEditing}>
                    Sửa
                  </Button>
                </div>
              )}

              {/* Progress bar + warning (chỉ khi có limit) */}
              {limit !== null && (
                <>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
                    <div
                      className={`h-full ${
                        isOverLimit ? "bg-red-500" : "bg-green-500"
                      }`}
                      style={{
                        width: `${Math.min(
                          (total / (limit || 1)) * 100,
                          100,
                        )}%`,
                      }}
                    />
                  </div>

                  {isOverLimit && (
                    <p className="text-red-500 text-[10px]">
                      Vượt {(total - limit).toLocaleString()} đ
                    </p>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {/* --------- Order summary --------- */}
          <Card className="mb-4 border-0 shadow-md text-xs">
            <CardContent className="p-3 space-y-1">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <span className="font-medium">
                    {(item.price * item.quantity).toLocaleString()} đ
                  </span>
                </div>
              ))}
              <Separator className="my-1" />
              <div className="flex justify-between font-semibold">
                <span>Tổng:</span>
                <span>{total.toLocaleString()} đ</span>
              </div>
            </CardContent>
          </Card>

          {/* --------- Pay button --------- */}
          <Button
            onClick={() => navigate("/checkout")}
            className={`w-full h-10 rounded-xl text-sm font-semibold transition-all duration-300 ${
              isOverLimit
                ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
            }`}
            disabled={isOverLimit || cartItems.length === 0}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            {isOverLimit ? "Vượt quá giới hạn" : "Thanh toán"}
          </Button>
        </div>
      </div>

      {/* ========================= Overlay Alert ========================= */}
      {showAlert && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-4 w-64 text-center space-y-3 text-sm">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-semibold text-red-600 text-xs flex-1">
                Quá giới hạn!
              </h3>
              <button
                onClick={() => setShowAlert(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p>Bạn đã vượt chỉ tiêu mua sắm.</p>
            <p className="font-semibold">
              Vượt {(total - (limit || 0)).toLocaleString()} đ
            </p>

            <Button className="w-full" onClick={() => setShowAlert(false)}>
              Đã hiểu
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
