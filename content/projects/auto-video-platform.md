# Auto Video Platform — Xử lý, dịch và lồng tiếng video

Auto Video Platform tổ chức việc xử lý video thành một quy trình gồm nhiều công đoạn: trích xuất âm thanh, nhận dạng giọng nói, tạo phụ đề, dịch nội dung, tổng hợp giọng nói và kết xuất video. Dự án hướng tới nhu cầu chuyển đổi nội dung video sang ngôn ngữ khác và quản lý quá trình xử lý từ dashboard tập trung.

## Chức năng chính

**Tạo và quản lý tác vụ:** dịch vụ điều phối cung cấp REST API để tạo và quản lý công việc. Tác vụ được chuyển vào hàng đợi và phân phối tới các worker chuyên trách.

**Xử lý âm thanh:** trích xuất âm thanh bằng FFmpeg, với công đoạn tùy chọn tách giọng nói và nhạc nền bằng Demucs để phục vụ các bước tiếp theo.

**Nhận dạng giọng nói và phụ đề:** chuyển lời nói thành văn bản qua công đoạn ASR, sau đó tạo phụ đề định dạng SRT làm đầu vào cho quá trình dịch và dựng lại nội dung.

**Dịch và tạo giọng nói:** xử lý bản dịch và chuyển văn bản thành âm thanh qua các engine được cấu hình. Tài liệu mô tả các lựa chọn như MarianMT cho dịch máy và gTTS cho tổng hợp giọng nói.

**Kết xuất video:** ghép video, âm thanh và phụ đề bằng FFmpeg, bao gồm phần phối trộn giọng đọc TTS với nhạc nền.

**Theo dõi tiến trình:** dashboard nhận sự kiện qua Socket.IO để cập nhật trạng thái công việc. Người vận hành theo dõi các bước xử lý trong một giao diện chung.

**Quản lý engine:** phần Settings tổ chức cấu hình mô hình, thứ tự ưu tiên và lựa chọn dự phòng, hỗ trợ điều chỉnh cách xử lý theo cấu hình hệ thống.

## Công nghệ sử dụng

| Công nghệ | Vai trò |
| --- | --- |
| Go | API và dịch vụ điều phối công việc |
| Python | Worker xử lý âm thanh, ngôn ngữ và video |
| FFmpeg | Trích xuất âm thanh, phối trộn và kết xuất video |
| Whisper, Demucs, MarianMT, gTTS | Các engine được tài liệu mô tả cho nhận dạng, tách âm, dịch và tạo giọng nói |
| Next.js, React | Giao diện dashboard |
| Node.js, Express | Server dashboard và API đi kèm |
| Socket.IO | Cập nhật thời gian thực tới giao diện |
| PostgreSQL | Lưu trữ dữ liệu và phát sự kiện cập nhật |
| Redis | Hàng đợi phục vụ điều phối tác vụ |
| MinIO SDK | Tích hợp lưu trữ object |
| Docker Compose | Tổ chức hạ tầng và cấu hình dịch vụ |

## Điểm nổi bật về kiến trúc

Mỗi worker đảm nhận một công đoạn rõ ràng, giúp việc thay đổi engine hoặc bổ sung bước xử lý có phạm vi cụ thể. Go phụ trách điều phối, Python xử lý AI và media, còn Next.js cung cấp giao diện vận hành.

Sự phân chia này kết nối ba lớp: tiếp nhận công việc, xử lý nội dung và theo dõi kết quả. Cấu hình mô hình được tổ chức riêng để phục vụ nhu cầu sử dụng nhiều engine trong quy trình.

## Hướng ứng dụng

Dự án là cơ sở để trao đổi về công cụ nội bộ cho đội sản xuất nội dung, quy trình tạo phụ đề hoặc giải pháp bản địa hóa video. Phạm vi triển khai có thể xác định theo ngôn ngữ, engine và cách quản lý nội dung mà khách hàng cần.

**Liên hệ để trao đổi về quy trình xử lý video và nhu cầu tích hợp của bạn.**
