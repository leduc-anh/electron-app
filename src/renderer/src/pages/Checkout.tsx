"use client";

import { ArrowLeft, QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import { Card, CardContent } from "../components/card";
import { Separator } from "../components/separator";

const Checkout = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 text-gray-900">
      {/* LEFT – instructions */}
      <div className="flex-1 flex flex-col p-4 space-y-4 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full h-7 w-7"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Thanh toán
          </h1>
        </div>

        {/* Steps */}
        <Card className="shadow-md bg-white/80 backdrop-blur-md text-xs md:text-sm max-w-md">
          <CardContent className="p-4 space-y-3">
            <h2 className="font-semibold">Hướng dẫn quét mã</h2>
            <ol className="list-decimal ml-4 space-y-1">
              <li>Mở ứng dụng ngân hàng / ví điện tử.</li>
              <li>
                Chọn chức năng <b>Quét mã QR</b>.
              </li>
              <li>Đưa camera tới mã QR bên phải.</li>
              <li>Xác nhận số tiền &amp; hoàn tất.</li>
            </ol>
            <Separator />
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/")}
            >
              Quay lại giỏ hàng
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* RIGHT – QR sidebar */}
      <aside className="w-48 bg-white/90 backdrop-blur-md border-l border-pink-100 shadow-inner flex flex-col items-center justify-center p-4 space-y-4 overflow-y-auto scrollbar-hidden">
        <div className="rounded-xl shadow-lg p-2 bg-gradient-to-br from-purple-100 to-pink-100">
          <QRCodeSVG
            value="https://example.com/checkout?id=123"
            size={160}
            includeMargin
          />
        </div>
        <div className="text-center text-xs">
          <p className="font-medium mb-1">Quét mã để thanh toán</p>
          <div className="inline-flex items-center gap-1 font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            <QrCode className="h-3 w-3" />
            An toàn &amp; bảo mật
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Checkout;
