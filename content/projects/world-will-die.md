# World Will Die — Mô phỏng nền kinh tế thế giới

World Will Die hướng tới xây dựng bản sao số có nhân quả của nền kinh tế toàn cầu. Dự án kết hợp dữ liệu quốc gia, chỉ số kinh tế và các mối quan hệ giữa tài nguyên, con người, thể chế và thương mại để khám phá những kịch bản biến động.

## Chức năng chính

**Khám phá dữ liệu quốc gia:** nạp dữ liệu từ World Bank, tổ chức theo quốc gia và chỉ số, phục vụ tra cứu và xây dựng dữ liệu nền cho mô phỏng.

**Đồ thị nhân quả:** mô hình hóa các yếu tố và quan hệ tác động trong một thư viện dùng chung. Bộ mô phỏng lan truyền thay đổi qua đồ thị, có xử lý độ trễ, điều kiện và vòng lặp.

**Kịch bản what-if:** chọn quốc gia, áp dụng mẫu cú sốc như chiến tranh, đại dịch hoặc bùng nổ công nghệ, sau đó chạy mô phỏng và xem kết quả theo kịch bản.

**Phân tích độ nhạy:** thay đổi từng đầu vào từ dữ liệu nền của quốc gia để quan sát ảnh hưởng lên mục tiêu, thể hiện bằng biểu đồ tornado và xếp hạng yếu tố tác động.

## Công nghệ sử dụng

| Công nghệ | Vai trò |
| --- | --- |
| Python, FastAPI | Xây dựng API và các thành phần phân tích, mô phỏng |
| Next.js | Giao diện khám phá dữ liệu, tạo kịch bản và xem kết quả |
| PostgreSQL, SQLAlchemy | Lưu trữ quốc gia, chỉ số, quan sát và kịch bản |
| Alembic | Quản lý thay đổi cấu trúc cơ sở dữ liệu |
| Pydantic | Mô hình dữ liệu và cấu hình ứng dụng |
| World Bank API | Nguồn dữ liệu cho quy trình nhập chỉ số kinh tế |
| Docker Compose | Tổ chức dịch vụ cơ sở dữ liệu trong môi trường phát triển |

## Điểm nổi bật về kiến trúc

Pipeline nhập dữ liệu, lớp lưu trữ, thư viện nhân quả và bộ mô phỏng được tổ chức thành các thành phần riêng. Dữ liệu nền được chuẩn hóa theo quốc gia trước khi đưa vào mô phỏng, giúp kịch bản gắn với bối cảnh cụ thể.

Giao diện web kết nối các bước từ khám phá chỉ số đến xây dựng kịch bản và phân tích độ nhạy. Kết quả mô phỏng phản ánh giả định của mô hình, phục vụ nghiên cứu và khám phá thay vì khẳng định một dự báo chắc chắn.

## Hướng phát triển

Dự án đã có nền tảng dữ liệu và đang phát triển mô phỏng động. Các thành phần hiện có tạo cơ sở mở rộng thư viện quan hệ nhân quả, kịch bản và công cụ phân tích dữ liệu kinh tế.
