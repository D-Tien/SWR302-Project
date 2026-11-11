// ============================================================
// GHP – Gia Hoà Phát | Main JavaScript
// Shared utilities for all pages
// DEMO DATA – Dữ liệu minh họa cho prototype OSBIS
// ============================================================

'use strict';

// ============================================================
// SAMPLE USERS (DEMO ONLY)
// ============================================================
const SAMPLE_USERS = [
  {
    id: 1,
    name: "Nguyễn Thị Lan",
    email: "lan@example.com",
    phone: "0901234567",
    password: "Demo@123",
    role: "customer",
    addresses: [
      {
        id: 1,
        name: "Nguyễn Thị Lan",
        phone: "0901234567",
        address: "123 Nguyễn Trãi, Phường 2",
        ward: "Phường 2",
        district: "Quận 1",
        city: "TP. Hồ Chí Minh",
        isDefault: true
      }
    ]
  },
  {
    id: 2,
    name: "Nguyễn Văn An",
    email: "an.sales@ghp.vn",
    phone: "0912345678",
    password: "Admin@123",
    role: "sales_staff"
  },
  {
    id: 3,
    name: "Lê Thị Hoa",
    email: "hoa.inventory@ghp.vn",
    phone: "0923456789",
    password: "Admin@123",
    role: "inventory_staff"
  },
  {
    id: 4,
    name: "Phạm Văn Đức",
    email: "duc.manager@ghp.vn",
    phone: "0934567890",
    password: "Admin@123",
    role: "manager"
  },
  {
    id: 5,
    name: "Admin GHP",
    email: "admin@ghp.vn",
    phone: "0945678901",
    password: "Admin@123",
    role: "administrator"
  }
];

// ============================================================
// PRODUCTS ARRAY (DEMO DATA with realistic bakery photography)
// ============================================================
const PRODUCTS = [
  {
    id: 1,
    code: "GHP-001",
    name: "Bột mì đa dụng Baker's Choice",
    category: "bot",
    catName: "Bột làm bánh",
    price: 42000,
    unit: "Túi 1 kg",
    brand: "Baker's Choice",
    origin: "Việt Nam",
    stock: 38,
    reserved: 5,
    isFeatured: true,
    isNew: false,
    image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?q=80&w=800&auto=format&fit=crop",
    description: "Bột mì đa dụng Baker's Choice số 11 chuyên dùng cho bánh mì mềm, bông lan, bánh quy và các loại bánh nướng gia đình.",
    allergen: "Chứa gluten (lúa mì).",
    storage: "Nơi khô ráo, thoáng mát, đậy kín sau khi mở bao bì.",
    shelf: "12 tháng"
  },
  {
    id: 2,
    code: "GHP-002",
    name: "Chocolate đen couverture 70%",
    category: "chocolate",
    catName: "Chocolate",
    price: 189000,
    unit: "Gói 500 g",
    brand: "Valrhona",
    origin: "Pháp",
    stock: 12,
    reserved: 2,
    isFeatured: true,
    isNew: true,
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=800&auto=format&fit=crop",
    description: "Socola đen Couverture nguyên chất 70% cacao từ Pháp, vị đắng dịu, hậu vị trái cây, độ bóng mượt hoàn hảo cho phủ bóng ganache và mousse.",
    allergen: "Có thể chứa vết sữa và đậu nành.",
    storage: "Nơi thoáng mát 16 - 20°C, tránh ánh nắng trực tiếp.",
    shelf: "18 tháng"
  },
  {
    id: 3,
    code: "GHP-003",
    name: "Bơ lạt lên men cao cấp",
    category: "bo-sua",
    catName: "Bơ & Sữa",
    price: 128000,
    unit: "Khối 500 g",
    brand: "Elle & Vire",
    origin: "Pháp",
    stock: 7,
    reserved: 1,
    isFeatured: true,
    isNew: false,
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?q=80&w=800&auto=format&fit=crop",
    description: "Bơ lạt lên men tự nhiên với 82% chất béo, thơm ngậy nồng nàn vị hạt dẻ, chuyên dụng cho croissant ngàn lớp và bánh quy bơ béo ngậy.",
    allergen: "Chứa sữa tươi nguyên chất.",
    storage: "Bảo quản ngăn mát 2 - 6°C hoặc ngăn đông tủ lạnh.",
    shelf: "6 tháng"
  },
  {
    id: 4,
    code: "GHP-004",
    name: "Phới lồng inox chuyên dụng",
    category: "dung-cu",
    catName: "Dụng cụ làm bánh",
    price: 76000,
    unit: "Cái",
    brand: "GHP Pro",
    origin: "Việt Nam",
    stock: 24,
    reserved: 3,
    isFeatured: true,
    isNew: false,
    image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=800&auto=format&fit=crop",
    description: "Phới lồng đánh trứng inox 304 không gỉ 12 nan đan dày, tay cầm trợ lực chống mỏi, giúp bông kem và đánh lòng trắng trứng nhanh chóng.",
    usage: "Rửa sạch bằng nước ấm xà phòng và lau khô sau khi sử dụng.",
    warranty: "Bảo hành 12 tháng lỗi mối hàn từ nhà sản xuất."
  },
  {
    id: 5,
    code: "GHP-005",
    name: "Đường cát trắng Biên Hòa 1kg",
    category: "duong",
    catName: "Đường & Chất tạo ngọt",
    price: 22000,
    unit: "Túi 1 kg",
    brand: "Biên Hòa",
    origin: "Việt Nam",
    stock: 140,
    reserved: 10,
    isFeatured: false,
    isNew: false,
    image: "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?q=80&w=800&auto=format&fit=crop",
    description: "Đường tinh luyện cao cấp từ mía tự nhiên, hạt nhỏ mịn dễ hòa tan, đem lại vị ngọt thanh khiết cho cốt bánh.",
    allergen: "Không chứa chất gây dị ứng.",
    storage: "Nơi khô ráo, tránh ẩm ướt.",
    shelf: "24 tháng"
  },
  {
    id: 6,
    code: "GHP-006",
    name: "Bột mì số 13 Bread Flour Meizan",
    category: "bot",
    catName: "Bột làm bánh",
    price: 32000,
    unit: "Túi 1 kg",
    brand: "Meizan",
    origin: "Việt Nam",
    stock: 90,
    reserved: 4,
    isFeatured: false,
    isNew: true,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop",
    description: "Bột mì hàm lượng gluten cao (13%), tạo độ dai và nở phồng lý tưởng cho bánh mì gối, baguette và pizza.",
    allergen: "Chứa gluten (lúa mì).",
    storage: "Nơi khô mát, đậy kín.",
    shelf: "12 tháng"
  },
  {
    id: 7,
    code: "GHP-007",
    name: "Màu thực phẩm gel cao cấp Wilton",
    category: "trang-tri",
    catName: "Trang trí bánh",
    price: 95000,
    unit: "Bộ 12 màu",
    brand: "Wilton",
    origin: "Mỹ",
    stock: 18,
    reserved: 2,
    isFeatured: false,
    isNew: true,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop",
    description: "Bộ màu gel đậm đặc tiêu chuẩn quốc tế, không làm loãng kem whipping, giữ màu tươi sáng tự nhiên cho kem bơ và fondant.",
    allergen: "Không có.",
    storage: "Nhiệt độ phòng, tránh ánh sáng.",
    shelf: "36 tháng"
  },
  {
    id: 8,
    code: "GHP-008",
    name: "Lò nướng đối lưu mini 38L",
    category: "thiet-bi",
    catName: "Thiết bị làm bánh",
    price: 1850000,
    unit: "Cái",
    brand: "Electrolux",
    origin: "Thụy Điển",
    stock: 8,
    reserved: 1,
    isFeatured: false,
    isNew: false,
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop",
    description: "Lò nướng đối lưu đa chế độ, nhiệt độ ổn định 100 - 250°C, quạt đối lưu giúp bánh chín vàng đều từ trong ra ngoài.",
    usage: "Làm nóng lò 10 phút trước khi nướng. Đọc kỹ sổ tay hướng dẫn an toàn kèm theo máy.",
    warranty: "Bảo hành 24 tháng chính hãng."
  },
  {
    id: 9,
    code: "GHP-009",
    name: "Đường bột mịn làm kem bơ Icing Sugar",
    category: "duong",
    catName: "Đường & Chất tạo ngọt",
    price: 28000,
    unit: "Túi 500 g",
    brand: "Biên Hòa",
    origin: "Việt Nam",
    stock: 65,
    reserved: 2,
    isFeatured: false,
    isNew: false,
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800&auto=format&fit=crop",
    description: "Đường bột siêu mịn bổ sung tinh bột bắp chống vón cục, dễ hòa tan nhanh trong bơ để tạo kem trang trí mềm mịn.",
    allergen: "Không chứa gluten.",
    storage: "Nơi khô mát, tránh hơi ẩm.",
    shelf: "18 tháng"
  },
  {
    id: 10,
    code: "GHP-010",
    name: "Bột nở Double Acting Baking Powder",
    category: "bot",
    catName: "Bột làm bánh",
    price: 24000,
    unit: "Hộp 100 g",
    brand: "Alsa",
    origin: "Pháp",
    stock: 85,
    reserved: 3,
    isFeatured: false,
    isNew: false,
    image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?q=80&w=800&auto=format&fit=crop",
    description: "Bột nở tác động kép nở 2 giai đoạn: khi trộn bột và khi vào lò nướng, đảm bảo bánh bông xốp đều đặn.",
    allergen: "Không chứa gluten.",
    storage: "Nơi khô ráo, đậy kín nắp.",
    shelf: "24 tháng"
  },
  {
    id: 11,
    code: "GHP-011",
    name: "Bột cacao nguyên chất Hà Lan",
    category: "chocolate",
    catName: "Chocolate",
    price: 75000,
    unit: "Hộp 250 g",
    brand: "Dutchess",
    origin: "Hà Lan",
    stock: 45,
    reserved: 2,
    isFeatured: false,
    isNew: false,
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=800&auto=format&fit=crop",
    description: "Bột cacao kiềm hóa thơm lừng, màu nâu đỏ sang trọng, tan đều trong sữa và bơ, chuyên dùng làm brownie và tiramisu.",
    allergen: "Có thể chứa vết sữa.",
    storage: "Nơi khô ráo, thoáng mát.",
    shelf: "24 tháng"
  },
  {
    id: 12,
    code: "GHP-012",
    name: "Khuôn bánh chống dính đáy rời 20cm",
    category: "dung-cu",
    catName: "Dụng cụ làm bánh",
    price: 85000,
    unit: "Cái",
    brand: "GHP Pro",
    origin: "Việt Nam",
    stock: 30,
    reserved: 1,
    isFeatured: false,
    isNew: false,
    image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=800&auto=format&fit=crop",
    description: "Khuôn bánh tròn đáy rời phủ lớp chống dính Teflon an toàn thực phẩm, lấy bánh ra dễ dàng mà không nứt vỡ.",
    usage: "Không dùng vật sắc nhọn chà xát bề mặt chống dính.",
    warranty: "Bảo hành 12 tháng."
  }
];

// ============================================================
// FORMAT CURRENCY VND
// ============================================================
function formatVND(amount) {
  if (typeof amount !== 'number') {
    amount = parseFloat(amount) || 0;
  }
  return amount.toLocaleString('vi-VN') + ' đ';
}

// ============================================================
// CART MANAGEMENT (localStorage)
// ============================================================
const CART_STORAGE_KEY = 'ghp_cart';

function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartCount();
  } catch (e) {
    console.error("Lỗi lưu giỏ hàng:", e);
  }
}

function addToCart(productId, quantity = 1) {
  const product = PRODUCTS.find(p => p.id === parseInt(productId));
  if (!product) {
    showToast("Không tìm thấy sản phẩm!", "error");
    return false;
  }

  if (product.stock <= 0) {
    showToast("Sản phẩm đã hết hàng!", "warning");
    return false;
  }

  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    const newQty = existing.quantity + quantity;
    if (newQty > product.stock) {
      showToast(`Chỉ còn ${product.stock} sản phẩm trong kho!`, "warning");
      return false;
    }
    existing.quantity = newQty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      unit: product.unit,
      image: product.image,
      category: product.catName,
      quantity: quantity
    });
  }

  saveCart(cart);
  showToast(`Đã thêm "${product.name}" vào giỏ hàng!`, "success");
  return true;
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== parseInt(productId));
  saveCart(cart);
  showToast("Đã xóa sản phẩm khỏi giỏ hàng", "info");
}

function updateCartQuantity(productId, newQty) {
  const cart = getCart();
  const item = cart.find(i => i.id === parseInt(productId));
  if (!item) return;

  const product = PRODUCTS.find(p => p.id === parseInt(productId));
  const maxStock = product ? product.stock : 999;

  if (newQty <= 0) {
    removeFromCart(productId);
    return;
  }

  if (newQty > maxStock) {
    showToast(`Kho chỉ còn ${maxStock} sản phẩm!`, "warning");
    item.quantity = maxStock;
  } else {
    item.quantity = newQty;
  }

  saveCart(cart);
}

function updateCartCount() {
  const cart = getCart();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badges = document.querySelectorAll('.cart-badge, [data-cart-count]');
  badges.forEach(b => {
    b.textContent = `${totalCount} sản phẩm`;
    if (b.classList.contains('badge-pill-only')) {
      b.textContent = totalCount;
    }
  });
}

// ============================================================
// AUTH SIMULATION (sessionStorage)
// ============================================================
const USER_STORAGE_KEY = 'ghp_user';

function getCurrentUser() {
  try {
    const raw = sessionStorage.getItem(USER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function isLoggedIn() {
  return getCurrentUser() !== null;
}

function login(emailOrPhone, password) {
  const user = SAMPLE_USERS.find(
    u => (u.email.toLowerCase() === emailOrPhone.toLowerCase() || u.phone === emailOrPhone) && u.password === password
  );

  if (!user) {
    return { success: false, message: "Email/SĐT hoặc mật khẩu không chính xác." };
  }

  sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  return { success: true, user: user };
}

function logout() {
  sessionStorage.removeItem(USER_STORAGE_KEY);
  showToast("Đã đăng xuất tài khoản", "info");
  setTimeout(() => {
    window.location.href = window.location.pathname.includes('/admin/') ? '../login.html' : 'login.html';
  }, 500);
}

// Update Header User State
function updateHeaderAuth() {
  const user = getCurrentUser();
  const userDisplay = document.querySelector('.header-user-display');
  if (!userDisplay) return;

  if (user) {
    userDisplay.innerHTML = `
      <div class="user-info-text">
        <span class="user-greeting">Xin chào,</span>
        <span class="user-name"><strong>${user.name}</strong></span>
      </div>
    `;
    userDisplay.closest('a')?.setAttribute('href', user.role === 'customer' ? 'account/profile.html' : 'admin/orders.html');
  }
}

// ============================================================
// TOAST NOTIFICATIONS
// ============================================================
function showToast(message, type = 'info', duration = 3000) {
  let container = document.getElementById('ghp-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'ghp-toast-container';
    container.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 99999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: none;
    `;
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  const bgColors = {
    success: '#2E7D32',
    error: '#D32F2F',
    warning: '#D97745',
    info: '#2C221E'
  };

  toast.style.cssText = `
    background: ${bgColors[type] || '#2C221E'};
    color: #FFFFFF;
    padding: 12px 20px;
    border-radius: 24px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.2);
    font-size: 14px;
    font-weight: 500;
    pointer-events: auto;
    opacity: 0;
    transform: translateY(12px);
    transition: all 0.25s ease;
    display: flex;
    align-items: center;
    gap: 10px;
    max-width: 380px;
  `;

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };

  toast.innerHTML = `<span style="font-weight:700;">${icons[type] || '•'}</span> <span>${message}</span>`;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(12px)';
    setTimeout(() => toast.remove(), 250);
  }, duration);
}

// ============================================================
// AUTO INIT ON DOM LOAD
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  updateHeaderAuth();
});
