# mod-galleryshortcode

**mod-galleryshortcode** là một module shortcode cho theme Hinode, cung cấp gallery hình ảnh với tính năng lazy-loading và modal hiển thị hình ảnh lớn.

## Cấu trúc

- **JavaScript**: `assets/js/modules/galleryshortcode/gallery-lazyload.js`. Xử lý lazy loading và modal hiển thị hình ảnh.
- **SCSS**: `assets/scss/galleryshortcode.scss`. Chứa các style cho gallery.
- **Partial Template**: `layouts/partials/gallery-item.html`. Định nghĩa cấu trúc cho từng item trong gallery.
- **Shortcode Template**: `layouts/shortcodes/gallery.html`. Định nghĩa cấu trúc HTML cho gallery.

## Cài đặt

1. **Sao chép module**: 
   - Clone hoặc tải xuống repository này và đặt thư mục `mod-galleryshortcode` vào thư mục `themes/hinode/modules/` của dự án Hugo của bạn.

2. **Cài đặt phụ thuộc**:
   ```bash
   cd themes/hinode/modules/mod-galleryshortcode
   npm install
