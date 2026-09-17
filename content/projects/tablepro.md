# TablePro — Công cụ desktop làm việc với cơ sở dữ liệu

TablePro là database client được phát triển bằng C++ và Qt, tập trung vào công việc thường gặp của lập trình viên và đội kỹ thuật: quản lý kết nối, viết SQL, xem dữ liệu và thao tác với cấu trúc bảng.

Dự án kết hợp giao diện desktop với kiến trúc connector dạng plugin, tạo không gian làm việc chung cho nhiều loại cơ sở dữ liệu.

## Chức năng chính

**Quản lý kết nối:** lưu và tổ chức kết nối để thuận tiện truy cập các cơ sở dữ liệu thường dùng. Tài liệu liệt kê MySQL, PostgreSQL, SQLite và MariaDB trong nhóm cơ sở dữ liệu quan hệ được hỗ trợ.

**Soạn thảo SQL:** trình soạn thảo có tô màu cú pháp, gợi ý hoàn thành, nhiều tab và định dạng câu lệnh. Lịch sử truy vấn có khả năng tìm kiếm để tra cứu lại công việc trước đó.

**Xem và chỉnh sửa dữ liệu:** data grid hiển thị dữ liệu theo bảng, hỗ trợ phân trang, cuộn ảo và chỉnh sửa trực tiếp. Các thao tác thêm, sửa, xóa được kết hợp với theo dõi thay đổi.

**Thao tác cấu trúc bảng:** nhóm chức năng DDL gồm tạo, thay đổi, đổi tên, làm rỗng và xóa bảng. Điều hướng khóa ngoại giúp theo dõi quan hệ giữa các bảng dữ liệu.

**Hỗ trợ phân tích:** phần EXPLAIN phục vụ xem kế hoạch thực thi truy vấn. Trình xem ER diagram biểu diễn quan hệ dữ liệu và có khả năng xuất sơ đồ theo mô tả trong tài liệu.

**Tùy chỉnh không gian làm việc:** theme sáng/tối, nhiều tab, panel bố trí linh hoạt và phím tắt. Trình chạy tệp SQL hỗ trợ theo dõi tiến trình thực hiện script.

## Công nghệ sử dụng

| Công nghệ | Vai trò |
| --- | --- |
| C++20 | Xây dựng ứng dụng và các thành phần xử lý |
| Qt 6 Widgets | Giao diện desktop |
| Qt SQL, Network, Concurrent, SVG | Thành phần hỗ trợ dữ liệu, mạng, xử lý đồng thời và đồ họa vector |
| CMake | Cấu hình và tổ chức quá trình build |
| Plugin động | Phân tách connector cơ sở dữ liệu khỏi lõi ứng dụng |
| SQLite FTS5 | Tìm kiếm toàn văn trong lịch sử truy vấn theo tài liệu dự án |
| QSS, JSON design tokens | Định nghĩa theme, màu sắc, khoảng cách và kiểu chữ |

Cấu hình build còn tích hợp hiredis, redis-plus-plus và MongoDB C++ Driver cho phần kết nối Redis/MongoDB. Đây là các thành phần kỹ thuật trong mã nguồn; phạm vi chức năng cụ thể phụ thuộc từng connector.

## TablePro UI Kit

UI Kit tổ chức theme sáng/tối, token màu sắc, khoảng cách, kiểu chữ và style theo component. Bộ kit tạo nền tảng chung để phát triển các màn hình theo cùng một ngôn ngữ thiết kế.

Phần này thể hiện năng lực xây dựng giao diện desktop và hệ thống thành phần tái sử dụng bên cạnh chức năng làm việc với dữ liệu của TablePro.

## Điểm nổi bật về kiến trúc

Kiến trúc plugin tách phần kết nối từng loại cơ sở dữ liệu khỏi không gian làm việc chung. Cách tổ chức này tạo cơ sở phát triển connector và chức năng chuyên biệt trong một giao diện thống nhất.

## Hướng ứng dụng

TablePro phù hợp để giới thiệu năng lực phát triển công cụ desktop cho đội kỹ thuật, giao diện thao tác dữ liệu và tiện ích nội bộ bằng C++/Qt. Yêu cầu về connector, quy trình hoặc giao diện chuyên biệt có thể được trao đổi thành phạm vi phát triển riêng.

**Liên hệ để trao đổi về công cụ dữ liệu hoặc ứng dụng desktop phù hợp với nhu cầu của bạn.**
