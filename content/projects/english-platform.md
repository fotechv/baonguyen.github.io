# English Platform SaaS — Quản lý trung tâm tiếng Anh và học trực tuyến

English Platform kết nối công việc quản lý trung tâm với hoạt động giảng dạy và học tập trong cùng một hệ thống. Dự án được tổ chức theo mô hình SaaS đa đơn vị, với các ứng dụng riêng cho người vận hành nền tảng, quản trị trung tâm, giáo viên và học viên.

Nền tảng hướng tới việc tập trung thông tin khóa học, lớp học và người dùng, đồng thời cung cấp các thành phần kỹ thuật cho hoạt động học trực tuyến.

## Chức năng chính

**Quản trị nền tảng:** Super Admin phục vụ quản lý đơn vị sử dụng, gói dịch vụ, mức sử dụng, yêu cầu hỗ trợ và cấu hình tính năng. Đây là lớp quản lý chung khi cung cấp hệ thống cho nhiều trung tâm.

**Quản lý trung tâm:** Center Admin tập trung vào khóa học, lớp học, giáo viên, học viên, báo cáo và thiết lập của từng trung tâm. Giao diện quản trị được tổ chức theo công việc vận hành đào tạo.

**Ứng dụng học tập:** Learning App cung cấp không gian riêng cho các quy trình học tập và giảng dạy của học viên, giáo viên. Ứng dụng dùng chung các dịch vụ nghiệp vụ với phần quản trị, đồng thời tách biệt trải nghiệm theo nhóm người dùng.

**Dịch vụ lớp trực tuyến:** Live Service phụ trách phiên học, cấp token kết nối LiveKit, ghi hình và callback điểm danh. Dự án có thêm giao diện Live Class prototype cho giáo viên, học viên, người quan sát và xem lại, làm cơ sở phát triển trải nghiệm lớp học.

**Tài khoản và phân quyền:** các thành phần dùng chung phụ trách xác thực, phiên đăng nhập, MFA và phân quyền theo vai trò. Kiến trúc tổ chức dữ liệu theo đơn vị sử dụng để phục vụ mô hình nhiều trung tâm trên cùng nền tảng.

## Công nghệ sử dụng

| Công nghệ | Vai trò |
| --- | --- |
| Next.js, React, TypeScript | Xây dựng các ứng dụng web quản trị và học tập |
| Tailwind CSS, thư viện UI dùng chung | Tổ chức giao diện nhất quán giữa các ứng dụng |
| Node.js | Môi trường chạy ứng dụng và dịch vụ JavaScript/TypeScript |
| PostgreSQL, Prisma | Lưu trữ dữ liệu, mô hình hóa cấu trúc và quản lý migration |
| Redis | Thành phần hạ tầng dùng chung của nền tảng |
| MinIO | Lưu trữ tệp theo mô hình object storage |
| LiveKit, LiveKit Egress | Truyền thông thời gian thực và ghi hình lớp học |
| Turborepo, pnpm | Quản lý monorepo với nhiều ứng dụng và package |
| Docker Compose | Tổ chức dịch vụ hạ tầng trong môi trường phát triển |

## Điểm nổi bật về kiến trúc

Giao diện, nghiệp vụ, dữ liệu, xác thực và phân quyền được tách thành các package dùng chung. Cách tổ chức này giúp các ứng dụng tái sử dụng thành phần và tập trung các thay đổi nghiệp vụ.

Phần lớp trực tuyến có dịch vụ và lớp dữ liệu riêng, tạo ranh giới rõ giữa quản lý đào tạo và truyền thông trực tuyến. Đây là cơ sở để phát triển từng phần theo nhu cầu của đơn vị sử dụng.

## Hướng ứng dụng

English Platform phù hợp để trao đổi về hệ thống quản lý trung tâm tiếng Anh, ứng dụng học tập mang thương hiệu riêng hoặc nền tảng phục vụ nhiều đơn vị đào tạo. Quy trình, giao diện và tích hợp có thể được xác định theo mô hình vận hành của khách hàng.

**Liên hệ để trao đổi về nhu cầu quản lý đào tạo và phạm vi triển khai phù hợp.**
