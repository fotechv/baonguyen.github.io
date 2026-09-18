# OxyIoT — Kết nối và giám sát thiết bị oxygen

OxyIoT xây dựng luồng dữ liệu từ thiết bị oxygen đến giao diện giám sát. Hệ thống giao tiếp với gateway W610 qua MQTT, xử lý phản hồi Modbus và cung cấp thông số mới nhất cùng lịch sử đo cho ứng dụng.

## Chức năng chính

**Thu thập dữ liệu thiết bị:** dịch vụ polling gửi yêu cầu Modbus qua MQTT, tiếp nhận phản hồi và chuyển dữ liệu nhị phân thành các thông số như nồng độ oxygen, nhiệt độ và áp suất.

**Quản lý polling động:** theo dõi thay đổi danh sách thiết bị qua MongoDB Change Stream, điều chỉnh đăng ký topic và tác vụ polling theo từng thiết bị.

**Cập nhật thời gian thực:** truyền dữ liệu đã xử lý đến giao diện qua MQTT over WebSockets để theo dõi biến động của thiết bị.

**Lịch sử và biểu đồ:** lưu dữ liệu đo trong MongoDB, cache trạng thái mới nhất và lịch sử gần đây trong Redis. Mobile API cung cấp dữ liệu mới nhất, lịch sử và dữ liệu biểu đồ theo trường đo, hỗ trợ truy vấn nhiều thiết bị.

## Công nghệ sử dụng

| Công nghệ | Vai trò |
| --- | --- |
| Go | Dịch vụ polling đồng thời và REST API phục vụ ứng dụng |
| MQTT, Mosquitto | Truyền thông publish/subscribe giữa thiết bị và hệ thống |
| Modbus RTU, gateway W610 | Gửi lệnh đọc và tiếp nhận thông số thiết bị |
| MongoDB | Lưu danh sách thiết bị và lịch sử dữ liệu đo |
| Redis | Cache trạng thái mới nhất và dữ liệu lịch sử gần đây |
| MQTT over WebSockets | Cập nhật dữ liệu cho giao diện theo thời gian thực |

## Điểm nổi bật về kiến trúc

Hệ thống tách lớp giao tiếp thiết bị, polling, lưu trữ và API. Dịch vụ Go tổ chức tác vụ theo thiết bị bằng goroutine, hỗ trợ kết nối lại và dừng tác vụ khi dịch vụ kết thúc.

MongoDB lưu dữ liệu đo, còn Redis phục vụ các truy vấn trạng thái và lịch sử gần đây. Cách phân chia này hỗ trợ cả nhu cầu lưu trữ lâu dài và truy cập dữ liệu cho giao diện giám sát.

## Hướng ứng dụng

Dự án là nền tảng cho bài toán giám sát thiết bị oxygen từ xa, theo dõi thông số vận hành và xây dựng dashboard dữ liệu thiết bị. Phạm vi tích hợp có thể phát triển theo giao thức, thông số đo và quy trình vận hành thực tế.
