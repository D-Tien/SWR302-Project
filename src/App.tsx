import { useMemo, useState, useEffect } from 'react'

type Page = 'home' | 'catalog' | 'product' | 'cart' | 'checkout' | 'success' | 'login' | 'account' | 'orders' | 'admin'

type Product = {
  id: number
  code: string
  name: string
  category: string
  price: number
  unit: string
  stock: number
  reserved?: number
  image: string
  brand: string
  origin: string
  isNew?: boolean
  description?: string
  allergen?: string
  storage?: string
  shelf?: string
  usage?: string
  warranty?: string
}

type CartLine = Product & { qty: number }

const photos = {
  hero: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1600&q=85',
  flour: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=700&q=85',
  chocolate: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=700&q=85',
  butter: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=700&q=85',
  cream: 'https://images.unsplash.com/photo-1574797668796-3c321fee0d01?auto=format&fit=crop&w=700&q=85',
  sugar: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&w=700&q=85',
  decor: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=85',
  tools: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=700&q=85',
  equipment: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=700&q=85',
  cake: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=700&q=85'
}

const categoryCards = [
  { id: '01', name: 'Bột làm bánh', image: photos.flour },
  { id: '02', name: 'Đường & Chất tạo ngọt', image: photos.sugar },
  { id: '03', name: 'Bơ & Sữa', image: photos.butter },
  { id: '04', name: 'Chocolate', image: photos.chocolate },
  { id: '05', name: 'Nguyên liệu trang trí', image: photos.decor },
  { id: '06', name: 'Dụng cụ làm bánh', image: photos.tools },
  { id: '07', name: 'Thiết bị làm bánh', image: photos.equipment }
]

const initialProducts: Product[] = [
  {
    id: 1,
    code: 'GHP-BOT-001',
    name: "Bột mì đa dụng Baker's Choice",
    category: 'Bột làm bánh',
    price: 42000,
    unit: 'Túi 1 kg',
    stock: 38,
    reserved: 4,
    image: photos.flour,
    brand: "Baker's Choice",
    origin: 'Việt Nam',
    isNew: false,
    description: "Bột mì đa dụng Baker's Choice số 11 chất lượng cao, hàm lượng protein cân bằng lý tưởng cho các món bánh gia đình như bánh mì mềm, muffin, bánh bông lan.",
    allergen: 'Chứa gluten (lúa mì).',
    storage: 'Bảo quản nơi khô ráo, thoáng mát, đậy kín sau khi sử dụng.',
    shelf: '12 tháng kể từ ngày sản xuất.'
  },
  {
    id: 2,
    code: 'GHP-CHO-002',
    name: 'Chocolate đen couverture 70%',
    category: 'Chocolate',
    price: 189000,
    unit: 'Gói 500 g',
    stock: 12,
    reserved: 2,
    image: photos.chocolate,
    brand: 'Valrhona',
    origin: 'Pháp',
    isNew: true,
    description: 'Couverture chocolate nguyên chất 70% cacao từ Pháp, hương vị đậm đà và độ tan mượt chuẩn bếp bánh chuyên nghiệp.',
    allergen: 'Có thể chứa vết sữa và đậu nành.',
    storage: 'Nơi khô thoáng 16 - 20°C, tránh ánh nắng trực tiếp.',
    shelf: '18 tháng.'
  },
  {
    id: 3,
    code: 'GHP-BOS-003',
    name: 'Bơ lạt lên men cao cấp',
    category: 'Bơ & Sữa',
    price: 128000,
    unit: 'Khối 500 g',
    stock: 7,
    reserved: 1,
    image: photos.butter,
    brand: 'Elle & Vire',
    origin: 'Pháp',
    isNew: false,
    description: 'Bơ lạt lên men tự nhiên 82% chất béo, thơm ngậy đặc trưng, hoàn hảo cho croissant ngàn lớp và cookies cao cấp.',
    allergen: 'Chứa sữa tươi.',
    storage: 'Ngăn mát tủ lạnh 2 - 6°C.',
    shelf: '6 tháng.'
  },
  {
    id: 4,
    code: 'GHP-DUN-004',
    name: 'Phới lồng inox chuyên dụng',
    category: 'Dụng cụ làm bánh',
    price: 76000,
    unit: 'Cái',
    stock: 24,
    reserved: 3,
    image: photos.tools,
    brand: 'GHP Pro',
    origin: 'Việt Nam',
    isNew: false,
    description: 'Phới lồng inox 304 không gỉ 12 nan dày dặn, trợ lực chống mỏi tay, giúp đánh bông kem tươi và lòng trắng trứng siêu nhanh.',
    usage: 'Rửa sạch bằng nước ấm và phơi khô sau mỗi lần dùng.',
    warranty: 'Bảo hành 12 tháng lỗi nhà sản xuất.'
  },
  {
    id: 5,
    code: 'GHP-DUO-005',
    name: 'Đường cát trắng Biên Hòa tinh luyện',
    category: 'Đường & Chất tạo ngọt',
    price: 22000,
    unit: 'Túi 1 kg',
    stock: 64,
    reserved: 5,
    image: photos.sugar,
    brand: 'Biên Hòa',
    origin: 'Việt Nam',
    isNew: false,
    description: 'Đường cát tinh luyện độ tinh khiết cao, hạt nhỏ đều dễ hòa tan trong bột bánh.',
    allergen: 'Không có.',
    storage: 'Nơi khô ráo.',
    shelf: '24 tháng.'
  },
  {
    id: 6,
    code: 'GHP-TRA-006',
    name: 'Bộ 12 màu thực phẩm gel Wilton',
    category: 'Nguyên liệu trang trí',
    price: 95000,
    unit: 'Bộ 12 màu',
    stock: 18,
    reserved: 2,
    image: photos.decor,
    brand: 'Wilton',
    origin: 'Mỹ',
    isNew: true,
    description: 'Màu thực phẩm dạng gel cô đặc chuẩn an toàn thực phẩm, lên màu tươi sáng và không làm nhão kem bơ.',
    allergen: 'Không có.',
    storage: 'Nhiệt độ phòng.',
    shelf: '36 tháng.'
  },
  {
    id: 7,
    code: 'GHP-THI-007',
    name: 'Lò nướng đối lưu mini 38L',
    category: 'Thiết bị làm bánh',
    price: 1850000,
    unit: 'Cái',
    stock: 5,
    reserved: 1,
    image: photos.equipment,
    brand: 'Electrolux',
    origin: 'Thụy Điển',
    isNew: false,
    description: 'Lò nướng nhiệt đối lưu ổn định từ 100 - 250°C, nướng bánh chín vàng đều từ trong ra ngoài.',
    usage: 'Làm nóng trước 10 phút. Đọc sổ tay an toàn.',
    warranty: 'Bảo hành chính hãng 24 tháng.'
  },
  {
    id: 8,
    code: 'GHP-DUN-008',
    name: 'Khuôn bánh tròn đế rời 20 cm',
    category: 'Dụng cụ làm bánh',
    price: 85000,
    unit: 'Cái',
    stock: 15,
    reserved: 2,
    image: photos.cake,
    brand: 'GHP Pro',
    origin: 'Việt Nam',
    isNew: false,
    description: 'Khuôn bánh chống dính đáy rời giúp tháo cốt bánh gato dễ dàng mà không nứt vỡ.',
    usage: 'Không dùng búi cọ kim loại.',
    warranty: 'Bảo hành 12 tháng.'
  }
]

const categories = [
  'Tất cả',
  'Bột làm bánh',
  'Đường & Chất tạo ngọt',
  'Bơ & Sữa',
  'Chocolate',
  'Nguyên liệu trang trí',
  'Dụng cụ làm bánh',
  'Thiết bị làm bánh'
]

const initialOrders = [
  { code: 'GHP-250524-0186', date: '24/05/2025', customer: 'Nguyễn Minh Anh', total: 447000, status: 'Chờ xác nhận', payment: 'Chưa thanh toán', cancelReq: false },
  { code: 'GHP-210524-0162', date: '21/05/2025', customer: 'Trần Hoàng Nam', total: 318000, status: 'Đang giao', payment: 'Chưa thanh toán', cancelReq: false },
  { code: 'GHP-140524-0128', date: '14/05/2025', customer: 'Lê Thảo Vy', total: 1298000, status: 'Hoàn tất', payment: 'Đã thanh toán', cancelReq: false },
  { code: 'GHP-080524-0099', date: '08/05/2025', customer: 'Phạm Mai Lan', total: 172000, status: 'Đã xác nhận', payment: 'Chưa thanh toán', cancelReq: true }
]

const initialUsers = [
  { name: 'Nguyễn Văn An', email: 'an.sales@ghp.vn', role: 'Nhân viên bán hàng', status: 'Đang hoạt động' },
  { name: 'Lê Thị Hoa', email: 'hoa.inventory@ghp.vn', role: 'Nhân viên kho', status: 'Đang hoạt động' },
  { name: 'Phạm Văn Đức', email: 'duc.manager@ghp.vn', role: 'Quản lý', status: 'Đang hoạt động' },
  { name: 'Admin GHP', email: 'admin@ghp.vn', role: 'Quản trị viên', status: 'Đang hoạt động' }
]

const initialDeliveryAreas = [
  { area: 'TP. Hồ Chí Minh', scope: 'Nội thành (Q1, 3, 5, 7, Phú Nhuận...)', fee: 30000, status: 'Đang áp dụng' },
  { area: 'TP. Hồ Chí Minh', scope: 'Ngoại thành (Thủ Đức, Q12, Bình Chánh...)', fee: 45000, status: 'Đang áp dụng' },
  { area: 'Bình Dương', scope: 'Thuận An, Dĩ An, Thủ Dầu Một', fee: 50000, status: 'Đang áp dụng' },
  { area: 'Đồng Nai', scope: 'Biên Hòa', fee: 55000, status: 'Đang áp dụng' }
]

const money = (n: number) => n.toLocaleString('vi-VN') + ' đ'

function Icon({ name, size = 18 }: { name: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    cart: <><path d="M3 4h2l2.2 10.5a2 2 0 0 0 2 1.5h7.8a2 2 0 0 0 2-1.6L20 7H6" /><circle cx="10" cy="20" r="1" /><circle cx="18" cy="20" r="1" /></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></>,
    check: <><path d="m5 12 4 4L19 6" /></>,
    box: <><path d="m4 7 8-4 8 4-8 4-8-4Z" /><path d="M4 7v10l8 4 8-4V7M12 11v10" /></>,
    home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10M9 20v-6h6v6" /></>,
    orders: <><path d="M6 3h12v18H6zM9 8h6M9 12h6M9 16h4" /></>,
    chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>,
    users: <><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0M17 11a3 3 0 0 0 0-6M17 14a5 5 0 0 1 4 5" /></>,
    inventory: <><path d="M3 7h18v14H3zM1 3h22v4H1zM9 11h6" /></>,
    chevron: <><path d="m9 18 6-6-6-6" /></>,
    eye: <><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></>,
    trash: <><path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14" /></>,
    x: <><path d="m6 6 12 12M18 6 6 18" /></>
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {paths[name]}
    </svg>
  )
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="logo">
      <span className="logo-mark">G</span>
      {!compact && (
        <span>
          <b>GIA HÒA PHÁT</b>
          <small>Nguyên liệu & Dụng cụ làm bánh</small>
        </span>
      )}
    </div>
  )
}

function Badge({ children, tone = 'green' }: { children: React.ReactNode; tone?: 'green' | 'orange' | 'red' | 'gray' | 'blue' }) {
  return <span className={`badge ${tone}`}>{children}</span>
}

function Button({ children, kind = 'primary', onClick, disabled, type = 'button', className = '', style }: { children: React.ReactNode; kind?: 'primary' | 'secondary' | 'ghost' | 'dark'; onClick?: () => void; disabled?: boolean; type?: 'button' | 'submit'; className?: string; style?: React.CSSProperties }) {
  return <button type={type} style={style} className={`btn ${kind} ${className}`} disabled={disabled} onClick={onClick}>{children}</button>
}

function Header({ navigate, cartCount }: { navigate: (p: Page) => void; cartCount: number }) {
  const [q, setQ] = useState('')
  return (
    <>
      <div className="promo">
        Dữ liệu sản phẩm và giá trong giao diện này chỉ dùng để minh họa &nbsp;•&nbsp; Hỗ trợ: (028) 7300 6868
      </div>
      <header>
        <div className="header-main shell">
          <button style={{ background: 'none', border: 0, padding: 0 }} onClick={() => navigate('home')}>
            <Logo />
          </button>
          <form className="search" onSubmit={e => { e.preventDefault(); navigate('catalog') }}>
            <Icon name="search" size={17} />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Tìm nguyên liệu, dụng cụ..." />
            <button type="submit">Tìm kiếm</button>
          </form>
          <button className="head-action" onClick={() => navigate('login')}>
            <Icon name="user" size={20} />
            <span>
              <small>Xin chào</small>
              <b>Tài khoản</b>
            </span>
          </button>
          <button className="head-action" onClick={() => navigate('cart')}>
            <span className="cart-icon">
              <Icon name="cart" size={20} />
              {cartCount > 0 && <i>{cartCount}</i>}
            </span>
            <span>
              <small>Giỏ hàng</small>
              <b>{cartCount} sản phẩm</b>
            </span>
          </button>
        </div>
        <nav>
          <div className="shell">
            <div className="nav-links">
              <button className="active" onClick={() => navigate('catalog')}>
                <Icon name="grid" size={15} /> Tất cả sản phẩm
              </button>
              <button onClick={() => navigate('catalog')}>Bột làm bánh</button>
              <button onClick={() => navigate('catalog')}>Bơ & Sữa</button>
              <button onClick={() => navigate('catalog')}>Chocolate</button>
              <button onClick={() => navigate('catalog')}>Trang trí bánh</button>
              <button onClick={() => navigate('catalog')}>Dụng cụ</button>
              <button onClick={() => navigate('catalog')}>Thiết bị</button>
            </div>
            <button className="nav-admin-link" onClick={() => navigate('admin')}>
              Cổng quản trị <Icon name="chevron" size={14} />
            </button>
          </div>
        </nav>
      </header>
    </>
  )
}

function ProductCard({ p, navigate, add, onSelect }: { p: Product; navigate: (p: Page) => void; add: (p: Product) => void; onSelect: (p: Product) => void }) {
  return (
    <article className="product-card">
      <div className="product-image" onClick={() => { onSelect(p); navigate('product') }}>
        <img src={p.image} alt={p.name} />
        <span className="photo-badge">Ảnh minh họa</span>
      </div>
      <div className="product-body">
        <small>{p.category}</small>
        <button className="product-name" onClick={() => { onSelect(p); navigate('product') }}>
          {p.name}
        </button>
        <span className="product-unit">{p.unit}</span>
        <div className="price-stock-row">
          <span className="product-price">{money(p.price)}</span>
          <span className={`stock-pill ${p.stock > 10 ? '' : p.stock > 0 ? 'low' : 'out'}`}>
            {p.stock > 0 ? `Còn ${p.stock}` : 'Hết hàng'}
          </span>
        </div>
        <div className="card-actions">
          <button className="btn-detail" onClick={() => { onSelect(p); navigate('product') }}>
            Chi tiết
          </button>
          <button className="btn-add" disabled={!p.stock} onClick={() => add(p)}>
            <Icon name="cart" size={14} /> Thêm
          </button>
        </div>
      </div>
    </article>
  )
}

function Home({ navigate, add, onSelect }: { navigate: (p: Page) => void; add: (p: Product) => void; onSelect: (p: Product) => void }) {
  return (
    <main>
      <section className="hero shell">
        <img src={photos.hero} alt="Baking with passion" />
        <div className="hero-shade" />
        <div className="hero-copy">
          <span className="eyebrow light">TỪ GIAN BẾP ĐẾN CHIẾC BÁNH HOÀN HẢO</span>
          <h1>
            Khám phá thế giới<br />
            <em>làm bánh</em>
          </h1>
          <p>Nguyên liệu tuyển chọn, dụng cụ chuyên dụng và những cảm hứng mới cho mọi gian bếp.</p>
          <div className="hero-badges">
            <span className="hero-pill">Mới mỗi tuần</span>
            <span className="hero-pill">Hơn 200 sản phẩm</span>
          </div>
          <Button onClick={() => navigate('catalog')}>
            Khám phá sản phẩm <Icon name="chevron" size={16} />
          </Button>
        </div>
        <div className="hero-note">
          <b>01</b>
          <span>
            <strong>Nguyên liệu đáng tin cậy</strong><br />
            Cho từng mẻ bánh
          </span>
        </div>
      </section>

      <section className="category-section shell">
        <div className="section-title">
          <div>
            <span>DANH MỤC</span>
            <h2>Bắt đầu từ điều bạn cần</h2>
          </div>
          <button onClick={() => navigate('catalog')}>
            Xem tất cả <Icon name="chevron" size={14} />
          </button>
        </div>
        <div className="category-grid">
          {categoryCards.map(c => (
            <button key={c.id} className="category-card" onClick={() => navigate('catalog')}>
              <img src={c.image} alt={c.name} className="cat-arch" />
              <div className="category-card-head">
                <span className="cat-num">{c.id}</span>
                <Icon name="chevron" size={15} />
              </div>
              <h3>{c.name}</h3>
            </button>
          ))}
        </div>
      </section>

      <section className="products-section">
        <div className="shell">
          <div className="section-title">
            <div>
              <span>ĐƯỢC QUAN TÂM</span>
              <h2>Sản phẩm nổi bật</h2>
              <small style={{ color: '#7a6f67', display: 'block', marginTop: 4 }}>
                Dữ liệu và giá bán minh họa cho trải nghiệm prototype.
              </small>
            </div>
            <button onClick={() => navigate('catalog')}>
              Khám phá cửa hàng <Icon name="chevron" size={14} />
            </button>
          </div>
          <div className="product-grid">
            {initialProducts.slice(0, 4).map(p => (
              <ProductCard key={p.id} p={p} navigate={navigate} add={add} onSelect={onSelect} />
            ))}
          </div>
        </div>
      </section>

      <section className="story shell">
        <div className="story-image-wrap">
          <img src={photos.cake} alt="Về Gia Hòa Phát" className="story-arch-img" />
          <div className="story-stamp">
            Gia Hòa Phát từ
            <span>2014</span>
          </div>
        </div>
        <div className="story-copy">
          <span className="eyebrow">VỀ CHÚNG TÔI</span>
          <h2>Mỗi nguyên liệu,<br />một câu chuyện vị giác.</h2>
          <p>
            Gia Hòa Phát mong muốn giúp người yêu bánh tiếp cận sản phẩm rõ nguồn gốc,
            thông tin dễ hiểu và trải nghiệm mua sắm thuận tiện.
          </p>
          <div className="values">
            <div>
              <b>200+</b>
              <small>Sản phẩm demo</small>
            </div>
            <div>
              <b>07</b>
              <small>Nhóm ngành hàng</small>
            </div>
            <div>
              <b>COD</b>
              <small>Phương thức duy nhất</small>
            </div>
          </div>
          <Button kind="secondary" onClick={() => navigate('catalog')}>
            Tìm hiểu sản phẩm <Icon name="chevron" size={15} />
          </Button>
        </div>
      </section>
    </main>
  )
}

function Catalog({ navigate, add, onSelect }: { navigate: (p: Page) => void; add: (p: Product) => void; onSelect: (p: Product) => void }) {
  const [cat, setCat] = useState('Bột làm bánh')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('new')

  const shown = useMemo(() => {
    return initialProducts
      .filter(p => (cat === 'Tất cả' || p.category === cat) && p.name.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => (sort === 'asc' ? a.price - b.price : sort === 'desc' ? b.price - a.price : b.id - a.id))
  }, [cat, query, sort])

  return (
    <main className="catalog shell">
      <div className="breadcrumbs">
        <button onClick={() => navigate('home')}>Trang chủ</button>
        <Icon name="chevron" size={12} />
        <span>Sản phẩm</span>
      </div>

      <div className="catalog-head">
        <div>
          <span className="eyebrow">CỬA HÀNG</span>
          <h1>Nguyên liệu & dụng cụ</h1>
          <p>{shown.length} sản phẩm minh họa được tìm thấy</p>
        </div>
      </div>

      <div className="catalog-layout">
        <aside>
          <div className="filter-head">
            <h3>Bộ lọc</h3>
            <button onClick={() => { setCat('Tất cả'); setQuery('') }}>Đặt lại</button>
          </div>

          <div className="filter-group">
            <h4>Tìm theo từ khóa</h4>
            <div className="filter-search-box">
              <Icon name="search" size={15} />
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Tên sản phẩm..." />
            </div>
          </div>

          <div className="filter-group">
            <h4>Danh mục</h4>
            <div className="filter-radio-list">
              {categories.map(c => (
                <label key={c} className="filter-radio-item">
                  <input
                    type="radio"
                    name="category"
                    checked={cat === c}
                    onChange={() => setCat(c)}
                  />
                  <span>{c}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4>Thương hiệu</h4>
            <select style={{ width: '100%', height: 40, padding: '0 10px', borderRadius: 8, border: '1px solid #EDE5DB' }}>
              <option>Tất cả</option>
              <option>Baker's Choice</option>
              <option>Valrhona</option>
              <option>Elle & Vire</option>
              <option>Wilton</option>
            </select>
          </div>

          <div className="filter-group">
            <h4>Khoảng giá</h4>
            <div className="filter-price-range">
              <input defaultValue="0 đ" />
              <span>–</span>
              <input defaultValue="3.000.000 đ" />
            </div>
          </div>
        </aside>

        <section className="catalog-results">
          <div className="result-bar">
            <span>Hiển thị 1 / 20 sản phẩm mỗi trang</span>
            <div>
              <span style={{ marginRight: 8 }}>Sắp xếp:</span>
              <select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid #EDE5DB' }}>
                <option value="new">Mới nhất</option>
                <option value="asc">Giá: Thấp đến cao</option>
                <option value="desc">Giá: Cao đến thấp</option>
              </select>
            </div>
          </div>

          <div className="product-grid">
            {shown.map(p => (
              <ProductCard key={p.id} p={p} navigate={navigate} add={add} onSelect={onSelect} />
            ))}
          </div>

          <div className="pagination">
            <button disabled>‹</button>
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>...</button>
            <button>8</button>
            <button>›</button>
          </div>
        </section>
      </div>
    </main>
  )
}

function ProductDetail({ p, navigate, add }: { p: Product; navigate: (p: Page) => void; add: (p: Product, qty?: number) => void }) {
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState<'info' | 'storage' | 'allergen'>('info')

  return (
    <main className="shell product-page">
      <div className="breadcrumbs">
        <button onClick={() => navigate('home')}>Trang chủ</button>
        <Icon name="chevron" size={12} />
        <button onClick={() => navigate('catalog')}>{p.category}</button>
        <Icon name="chevron" size={12} />
        <span>{p.name}</span>
      </div>

      <div className="product-detail">
        <div className="gallery">
          <div className="thumbs">
            {[p.image, photos.hero, photos.cake].map((x, i) => (
              <button className={i === 0 ? 'active' : ''} key={x}>
                <img src={x} alt="" />
              </button>
            ))}
          </div>
          <div className="main-photo">
            <img src={p.image} alt={p.name} />
            <span>Ảnh minh họa</span>
          </div>
        </div>

        <div className="detail-copy">
          <Badge tone={p.stock > 0 ? 'green' : 'red'}>{p.stock > 0 ? 'Còn hàng' : 'Hết hàng'}</Badge>
          <h1>{p.name}</h1>
          <p className="sku">Mã sản phẩm: {p.code} &nbsp;•&nbsp; {p.category}</p>
          <div className="detail-price">
            {money(p.price)} <small>/ {p.unit}</small>
          </div>
          <div className="detail-facts">
            <div>
              <small>ĐƠN VỊ BÁN</small>
              <b>{p.unit}</b>
            </div>
            <div>
              <small>THƯƠNG HIỆU</small>
              <b>{p.brand}</b>
            </div>
            <div>
              <small>TỒN KHO ONLINE</small>
              <b>{p.stock} sản phẩm</b>
            </div>
          </div>
          <p className="detail-desc">{p.description}</p>

          <div className="buy-row">
            <div className="stepper">
              <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <b>{qty}</b>
              <button onClick={() => setQty(Math.min(p.stock, qty + 1))}>+</button>
            </div>
            <Button onClick={() => { add(p, qty); navigate('cart') }}>
              <Icon name="cart" size={16} /> Thêm vào giỏ hàng
            </Button>
          </div>

          <div className="notice">
            <Icon name="box" size={20} />
            <div>
              <b>Tồn kho trực tuyến độc lập</b>
              <span>Được ghi nhận riêng biệt, không tự động đồng bộ với cửa hàng vật lý.</span>
            </div>
          </div>
        </div>
      </div>

      <section className="detail-tabs">
        <div className="tabs">
          <button className={tab === 'info' ? 'active' : ''} onClick={() => setTab('info')}>
            Thông tin sản phẩm
          </button>
          <button className={tab === 'storage' ? 'active' : ''} onClick={() => setTab('storage')}>
            Bảo quản & hạn dùng
          </button>
          <button className={tab === 'allergen' ? 'active' : ''} onClick={() => setTab('allergen')}>
            Thành phần & dị ứng
          </button>
        </div>
        <div className="tab-content">
          {tab === 'info' ? (
            <>
              <h3>Mô tả chi tiết</h3>
              <p>{p.description}</p>
              {p.usage && <p><strong>Hướng dẫn sử dụng:</strong> {p.usage}</p>}
              {p.warranty && <p><strong>Bảo hành:</strong> {p.warranty}</p>}
            </>
          ) : tab === 'storage' ? (
            <>
              <h3>Hướng dẫn bảo quản</h3>
              <p>{p.storage || 'Bảo quản nơi khô ráo, thoáng mát.'}</p>
              <p><strong>Hạn sử dụng:</strong> {p.shelf || 'Xem trên bao bì.'}</p>
            </>
          ) : (
            <>
              <h3>Cảnh báo dị ứng</h3>
              <p>{p.allergen || 'Không có ghi nhận dị ứng cụ thể.'}</p>
            </>
          )}
        </div>
      </section>
    </main>
  )
}

function Cart({ lines, setLines, navigate }: { lines: CartLine[]; setLines: React.Dispatch<React.SetStateAction<CartLine[]>>; navigate: (p: Page) => void }) {
  const total = lines.reduce((s, p) => s + p.price * p.qty, 0)
  const change = (id: number, d: number) =>
    setLines(ls => ls.map(l => (l.id === id ? { ...l, qty: Math.max(1, Math.min(l.stock, l.qty + d)) } : l)))

  return (
    <main className="shell cart-page">
      <div className="breadcrumbs">
        <button onClick={() => navigate('home')}>Trang chủ</button>
        <Icon name="chevron" size={12} />
        <span>Giỏ hàng</span>
      </div>
      <h1>Giỏ hàng của bạn <small>({lines.length} sản phẩm)</small></h1>

      {!lines.length ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <h2>Giỏ hàng đang trống</h2>
          <p style={{ color: '#7a6f67', margin: '12px 0 24px' }}>Hãy chọn những nguyên liệu làm bánh tươi ngon để bắt đầu mẻ bánh!</p>
          <Button onClick={() => navigate('catalog')}>Tiếp tục mua sắm</Button>
        </div>
      ) : (
        <div className="cart-layout">
          <section className="cart-list">
            <div className="revalidate">
              <Icon name="check" size={16} />
              <span>Giá và tồn kho đã được kiểm tra theo dữ liệu demo mới nhất.</span>
            </div>
            {lines.map(l => (
              <article className="cart-line" key={l.id}>
                <img src={l.image} alt={l.name} />
                <div className="line-info">
                  <small>{l.category}</small>
                  <h3>{l.name}</h3>
                  <span>{l.unit}</span>
                </div>
                <b>{money(l.price)}</b>
                <div className="stepper">
                  <button onClick={() => change(l.id, -1)}>−</button>
                  <b>{l.qty}</b>
                  <button onClick={() => change(l.id, 1)}>+</button>
                </div>
                <b>{money(l.price * l.qty)}</b>
                <button className="remove" onClick={() => setLines(ls => ls.filter(x => x.id !== l.id))}>
                  <Icon name="trash" size={16} />
                </button>
              </article>
            ))}
            <button className="continue" onClick={() => navigate('catalog')}>
              ← Tiếp tục mua sắm
            </button>
          </section>

          <aside className="summary">
            <h2>Tóm tắt đơn hàng</h2>
            <div>
              <span>Tạm tính</span>
              <b>{money(total)}</b>
            </div>
            <div>
              <span>Phí giao hàng</span>
              <span>Tính ở bước sau</span>
            </div>
            <hr />
            <div className="total">
              <span>Tổng tạm tính</span>
              <b>{money(total)}</b>
            </div>
            <small style={{ color: '#7a6f67', display: 'block', margin: '8px 0' }}>Giá đã bao gồm thuế (nếu áp dụng)</small>
            <Button onClick={() => navigate('checkout')}>
              Tiến hành đặt hàng <Icon name="arrow" size={16} />
            </Button>
            <p style={{ fontSize: 11, color: '#7a6f67', marginTop: 14, textAlign: 'center' }}>
              ✓ Chỉ thanh toán tiền mặt khi nhận hàng (COD)
            </p>
          </aside>
        </div>
      )}
    </main>
  )
}

function Checkout({ lines, navigate, clear }: { lines: CartLine[]; navigate: (p: Page) => void; clear: () => void }) {
  const [submitted, setSubmitted] = useState(false)
  const subtotal = lines.reduce((s, p) => s + p.price * p.qty, 0)
  const fee = 30000

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      clear()
      navigate('success')
    }, 500)
  }

  return (
    <main className="checkout-page shell">
      <div className="checkout-title">
        <button onClick={() => navigate('cart')}>← Quay lại giỏ hàng</button>
        <h1>Thông tin giao hàng</h1>
        <div className="steps">
          <span className="done">1</span>
          <i />
          <span className="active">2</span>
          <i />
          <span>3</span>
        </div>
      </div>

      <form className="checkout-layout" onSubmit={submit}>
        <section className="checkout-form">
          <div className="form-card">
            <div className="card-heading">
              <span>01</span>
              <div>
                <h2>Thông tin liên hệ</h2>
                <p>Thông tin người nhận đơn hàng</p>
              </div>
            </div>
            <div className="form-grid">
              <label>
                Họ và tên
                <input required defaultValue="Nguyễn Minh Anh" />
              </label>
              <label>
                Số điện thoại
                <input required defaultValue="0901 234 567" />
              </label>
            </div>
          </div>

          <div className="form-card">
            <div className="card-heading">
              <span>02</span>
              <div>
                <h2>Địa chỉ giao hàng</h2>
                <p>Chọn địa chỉ đã lưu hoặc nhập địa chỉ mới</p>
              </div>
            </div>
            <label className="address-select">
              <input type="radio" defaultChecked name="addr" />
              <div>
                <b>Nhà riêng <Badge>Mặc định</Badge></b>
                <span>25 Nguyễn Văn Trỗi, Phường 11, Quận Phú Nhuận, TP. Hồ Chí Minh</span>
              </div>
            </label>
            <label>
              Khu vực giao hàng
              <select required>
                <option>TP. Hồ Chí Minh — Nội thành (30.000 đ)</option>
                <option>TP. Hồ Chí Minh — Ngoại thành (45.000 đ)</option>
                <option>Bình Dương (50.000 đ)</option>
              </select>
            </label>
          </div>

          <div className="form-card">
            <div className="card-heading">
              <span>03</span>
              <div>
                <h2>Phương thức thanh toán</h2>
                <p>Phương thức duy nhất được hỗ trợ theo quy chuẩn OSBIS</p>
              </div>
            </div>
            <label className="payment">
              <input type="radio" defaultChecked readOnly />
              <span className="cash">₫</span>
              <div>
                <b>Thanh toán khi nhận hàng (COD)</b>
                <span>Thanh toán bằng tiền mặt trực tiếp cho nhân viên giao hàng sau khi kiểm tra kiện hàng.</span>
              </div>
              <Badge tone="green">Đã chọn</Badge>
            </label>
          </div>
        </section>

        <aside className="summary">
          <h2>Đơn hàng ({lines.length})</h2>
          {lines.map(l => (
            <div className="mini-line" key={l.id}>
              <img src={l.image} alt={l.name} />
              <span>
                {l.name}
                <small style={{ color: '#7a6f67' }}>{l.qty} × {l.unit}</small>
              </span>
              <b>{money(l.price * l.qty)}</b>
            </div>
          ))}
          <hr />
          <div>
            <span>Tạm tính</span>
            <b>{money(subtotal)}</b>
          </div>
          <div>
            <span>Phí giao hàng</span>
            <b>{money(fee)}</b>
          </div>
          <hr />
          <div className="total">
            <span>Tổng cộng</span>
            <b>{money(subtotal + fee)}</b>
          </div>
          <Button type="submit" disabled={submitted}>
            {submitted ? 'Đang xác nhận...' : 'Xác nhận đặt hàng'}
          </Button>
        </aside>
      </form>
    </main>
  )
}

function Success({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <main className="shell success">
      <div className="success-icon">
        <Icon name="check" size={38} />
      </div>
      <span className="eyebrow">ĐẶT HÀNG THÀNH CÔNG</span>
      <h1>Cảm ơn bạn đã đặt hàng!</h1>
      <p>Đơn hàng demo đã được ghi nhận trong phiên làm việc này. Bạn chỉ thanh toán tiền mặt khi nhận hàng.</p>
      <div className="order-code">
        <small>MÃ ĐƠN HÀNG</small>
        <b>GHP-250524-0186</b>
      </div>
      <div className="success-status">
        <div>
          <small>Trạng thái đơn</small>
          <Badge tone="orange">Chờ xác nhận</Badge>
        </div>
        <div>
          <small>Thanh toán</small>
          <Badge tone="gray">Chưa thanh toán</Badge>
        </div>
      </div>
      <div className="success-actions">
        <Button onClick={() => navigate('orders')}>Xem đơn hàng của tôi</Button>
        <Button kind="secondary" onClick={() => navigate('home')}>Về trang chủ</Button>
      </div>
    </main>
  )
}

function Login({ navigate }: { navigate: (p: Page) => void }) {
  const [isRegister, setIsRegister] = useState(false)

  return (
    <main className="auth-page">
      <div className="auth-art">
        <Logo />
        <div className="auth-art-middle">
          <span className="eyebrow light">GIA HÒA PHÁT</span>
          <h2>
            Chào mừng bạn<br />
            trở lại.
          </h2>
          <p>Đăng nhập để quản lý giỏ hàng, địa chỉ và đơn mua.</p>
        </div>
        <button className="auth-back-link" onClick={() => navigate('home')}>
          ← Trở về cửa hàng
        </button>
      </div>

      <div className="auth-form">
        <div className="auth-inner">
          <span className="eyebrow">TÀI KHOẢN KHÁCH HÀNG</span>
          <h1>{isRegister ? 'Đăng ký tài khoản' : 'Đăng nhập'}</h1>
          <p>Thông tin trong prototype không được lưu vào hệ thống thật.</p>

          <form onSubmit={e => { e.preventDefault(); navigate('account') }}>
            {isRegister && (
              <label>
                Họ và tên
                <input required placeholder="Nguyễn Minh Anh" />
              </label>
            )}
            <label>
              Email hoặc số điện thoại
              <input required defaultValue="name@email.com" />
            </label>
            <label>
              Mật khẩu
              <input required type="password" defaultValue="Password123" placeholder="Tối thiểu 8 ký tự" />
            </label>

            {!isRegister && (
              <div className="remember-row">
                <label>
                  <input type="checkbox" defaultChecked /> Ghi nhớ đăng nhập
                </label>
                <button type="button" className="forgot-btn" onClick={() => alert('Liên kết đặt lại mật khẩu đã được gửi đến email của bạn (Demo).')}>
                  Quên mật khẩu?
                </button>
              </div>
            )}

            <Button type="submit" className="auth-submit-btn">
              {isRegister ? 'Đăng ký ngay' : 'Đăng nhập'}
            </Button>
          </form>

          <div className="auth-switch">
            {isRegister ? (
              <>Đã có tài khoản? <button onClick={() => setIsRegister(false)}>Đăng nhập</button></>
            ) : (
              <>Chưa có tài khoản? <button onClick={() => setIsRegister(true)}>Đăng ký ngay</button></>
            )}
          </div>

          <div className="demo-hint">
            <strong>Gợi ý tài khoản demo:</strong> Khách hàng: lan@example.com / Demo@123 • NV Bán hàng: an.sales@ghp.vn / Admin@123
          </div>
        </div>
      </div>
    </main>
  )
}

function Account({ navigate }: { navigate: (p: Page) => void }) {
  const [tab, setTab] = useState<'profile' | 'addresses'>('profile')

  return (
    <main className="account shell">
      <div className="breadcrumbs">
        <button onClick={() => navigate('home')}>Trang chủ</button>
        <Icon name="chevron" size={12} />
        <span>Tài khoản</span>
      </div>

      <div className="account-layout">
        <aside>
          <div className="avatar">MA</div>
          <h3>Nguyễn Minh Anh</h3>
          <p>minhanh@email.com</p>
          <button className={tab === 'profile' ? 'active' : ''} onClick={() => setTab('profile')}>
            <Icon name="user" size={16} /> Thông tin cá nhân
          </button>
          <button className={tab === 'addresses' ? 'active' : ''} onClick={() => setTab('addresses')}>
            <Icon name="home" size={16} /> Địa chỉ giao hàng
          </button>
          <button onClick={() => navigate('orders')}>
            <Icon name="orders" size={16} /> Đơn hàng của tôi
          </button>
          <button onClick={() => navigate('login')} style={{ color: '#c84b42' }}>
            Đăng xuất
          </button>
        </aside>

        <section>
          {tab === 'profile' ? (
            <div className="form-card">
              <div className="panel-head">
                <div>
                  <h1>Hồ sơ của tôi</h1>
                  <p>Quản lý thông tin cá nhân và bảo mật tài khoản.</p>
                </div>
                <Badge tone="green">✓ Email đã xác minh</Badge>
              </div>
              <div className="form-grid">
                <label>
                  Họ và tên
                  <input defaultValue="Nguyễn Minh Anh" />
                </label>
                <label>
                  Email
                  <input disabled defaultValue="minhanh@email.com" />
                </label>
                <label>
                  Số điện thoại
                  <input defaultValue="0901 234 567" />
                </label>
              </div>
              <Button style={{ marginTop: 20 }} onClick={() => alert('Đã cập nhật thông tin thành công!')}>
                Lưu thay đổi
              </Button>
            </div>
          ) : (
            <div className="form-card">
              <div className="panel-head">
                <div>
                  <h1>Sổ địa chỉ</h1>
                  <p>Bạn có thể lưu tối đa 5 địa chỉ giao hàng.</p>
                </div>
                <Button>+ Thêm địa chỉ mới</Button>
              </div>
              <div className="address-card">
                <div>
                  <b>Nhà riêng <Badge>Mặc định</Badge></b>
                  <p style={{ margin: '8px 0', fontSize: 13 }}>Nguyễn Minh Anh • 0901 234 567</p>
                  <p style={{ color: '#7a6f67', fontSize: 13 }}>25 Nguyễn Văn Trỗi, Phường 11, Quận Phú Nhuận, TP. Hồ Chí Minh</p>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

function Orders({ navigate }: { navigate: (p: Page) => void }) {
  const [selected, setSelected] = useState<typeof initialOrders[0] | null>(null)

  if (selected) {
    return (
      <main className="shell orders-page">
        <button className="auth-back-link" style={{ margin: '24px 0' }} onClick={() => setSelected(null)}>
          ← Quay lại danh sách đơn
        </button>
        <div className="order-detail-head">
          <div>
            <span>ĐƠN HÀNG</span>
            <h1>{selected.code}</h1>
            <p>Đặt ngày {selected.date}</p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Badge tone={selected.status === 'Hoàn tất' ? 'green' : 'orange'}>{selected.status}</Badge>
            <Badge tone={selected.payment === 'Đã thanh toán' ? 'blue' : 'gray'}>{selected.payment}</Badge>
          </div>
        </div>

        <div className="order-detail-grid">
          <section className="form-card">
            <h2>Sản phẩm đã mua</h2>
            {initialProducts.slice(0, 2).map(p => (
              <div className="mini-line" key={p.id}>
                <img src={p.image} alt={p.name} />
                <span>
                  {p.name}
                  <small style={{ color: '#7a6f67' }}>1 × {p.unit}</small>
                </span>
                <b>{money(p.price)}</b>
              </div>
            ))}
          </section>

          <aside className="form-card">
            <h2>Địa chỉ nhận hàng (Snapshot)</h2>
            <p style={{ fontSize: 13, lineHeight: 1.6, marginTop: 8 }}>
              <strong>{selected.customer}</strong><br />
              0901 234 567<br />
              25 Nguyễn Văn Trỗi, Phường 11, Quận Phú Nhuận, TP.HCM
            </p>
            <hr style={{ border: 0, borderTop: '1px solid #EDE5DB', margin: '16px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
              <span>Tổng cộng:</span>
              <strong style={{ color: 'var(--orange)' }}>{money(selected.total)}</strong>
            </div>
            {['Chờ xác nhận', 'Đã xác nhận'].includes(selected.status) && (
              <Button kind="secondary" style={{ width: '100%', marginTop: 18 }} onClick={() => alert('Đã gửi yêu cầu hủy đơn hàng!')}>
                Yêu cầu hủy đơn
              </Button>
            )}
          </aside>
        </div>
      </main>
    )
  }

  return (
    <main className="shell orders-page">
      <div className="breadcrumbs">
        <button onClick={() => navigate('home')}>Trang chủ</button>
        <Icon name="chevron" size={12} />
        <span>Đơn hàng của tôi</span>
      </div>
      <div className="panel-head">
        <div>
          <h1>Lịch sử đơn hàng</h1>
          <p>Theo dõi quá trình xử lý đơn hàng và trạng thái thu tiền COD.</p>
        </div>
      </div>
      <div className="order-cards">
        {initialOrders.map(o => (
          <button className="order-card" key={o.code} onClick={() => setSelected(o)}>
            <div>
              <small>MÃ ĐƠN HÀNG</small>
              <b>{o.code}</b>
            </div>
            <div>
              <small>NGÀY ĐẶT</small>
              <span>{o.date}</span>
            </div>
            <div>
              <small>TỔNG TIỀN</small>
              <b>{money(o.total)}</b>
            </div>
            <Badge tone={o.status === 'Hoàn tất' ? 'green' : 'orange'}>{o.status}</Badge>
            <Badge tone={o.payment === 'Đã thanh toán' ? 'blue' : 'gray'}>{o.payment}</Badge>
            <Icon name="chevron" size={16} />
          </button>
        ))}
      </div>
    </main>
  )
}

/* ==========================================================
   ROLE-BASED ADMIN PORTAL (All SRS Use Cases UC-09 to UC-14)
   ========================================================== */

function OrdersAdmin({ orderList, setModalOrder }: { orderList: typeof initialOrders; setModalOrder: (o: typeof initialOrders[0]) => void }) {
  return (
    <>
      <div className="admin-title">
        <div>
          <span>BÁN HÀNG</span>
          <h1>Quản lý đơn hàng</h1>
          <p>Xác minh, xử lý trạng thái tuần tự và thu tiền COD.</p>
        </div>
      </div>

      <div className="stats">
        <div className="stat">
          <small>Đơn chờ xử lý</small>
          <b>12</b>
          <em>+3 hôm nay</em>
        </div>
        <div className="stat">
          <small>Đang chuẩn bị</small>
          <b>08</b>
          <em>Trong SLA</em>
        </div>
        <div className="stat">
          <small>Đang giao</small>
          <b>21</b>
          <em>COD chưa thu: 17</em>
        </div>
        <div className="stat">
          <small>Yêu cầu hủy</small>
          <b>02</b>
          <em>Cần quyết định</em>
        </div>
      </div>

      <div className="data-card">
        <div className="table-tools">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#F5F2EE', padding: '6px 14px', borderRadius: 20, flex: 1, maxWidth: 320 }}>
            <Icon name="search" size={15} />
            <input style={{ border: 0, background: 'transparent', outline: 0, fontSize: 12, width: '100%' }} placeholder="Mã đơn, khách hàng..." />
          </div>
          <select style={{ border: '1px solid #EDE5DB', borderRadius: 20, padding: '6px 14px', background: '#fff', fontSize: 12 }}>
            <option>Tất cả trạng thái</option>
            <option>Chờ xác nhận</option>
            <option>Đang chuẩn bị</option>
            <option>Đang giao</option>
            <option>Hoàn tất</option>
          </select>
        </div>

        <table>
          <thead>
            <tr>
              <th>MÃ ĐƠN</th>
              <th>KHÁCH HÀNG</th>
              <th>NGÀY ĐẶT</th>
              <th>TỔNG TIỀN</th>
              <th>TRẠNG THÁI ĐƠN</th>
              <th>THANH TOÁN</th>
              <th>YÊU CẦU HỦY</th>
              <th style={{ textAlign: 'center' }}>THAO TÁC</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map(o => (
              <tr key={o.code}>
                <td><strong>{o.code}</strong></td>
                <td>{o.customer}</td>
                <td>{o.date}</td>
                <td>{money(o.total)}</td>
                <td>
                  <Badge tone={o.status === 'Hoàn tất' ? 'green' : 'orange'}>
                    {o.status}
                  </Badge>
                </td>
                <td>
                  <Badge tone={o.payment === 'Đã thanh toán' ? 'blue' : 'gray'}>
                    {o.payment}
                  </Badge>
                </td>
                <td>
                  {o.cancelReq ? <Badge tone="red">Đang chờ</Badge> : '—'}
                </td>
                <td style={{ textAlign: 'center' }}>
                  <button className="action-eye-btn" onClick={() => setModalOrder(o)} title="Xem chi tiết & xử lý">
                    <Icon name="eye" size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

function ProductsAdmin({ setModal }: { setModal: (m: string) => void }) {
  return (
    <>
      <div className="admin-title">
        <div>
          <span>VẬN HÀNH DANH MỤC</span>
          <h1>Sản phẩm & Danh mục</h1>
          <p>Quản lý thông tin bán hàng; không xóa bản ghi đã có lịch sử đặt hàng (theo SRS).</p>
        </div>
        <Button onClick={() => setModal('product')}>+ Thêm sản phẩm</Button>
      </div>

      <div className="data-card">
        <div className="table-tools">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#F5F2EE', padding: '6px 14px', borderRadius: 20, flex: 1, maxWidth: 300 }}>
            <Icon name="search" size={15} />
            <input style={{ border: 0, background: 'transparent', outline: 0, fontSize: 12, width: '100%' }} placeholder="Tìm theo tên hoặc mã SP..." />
          </div>
          <select style={{ border: '1px solid #EDE5DB', borderRadius: 20, padding: '6px 14px', background: '#fff', fontSize: 12 }}>
            <option>Tất cả danh mục</option>
            {categories.slice(1).map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        <table>
          <thead>
            <tr>
              <th>SẢN PHẨM</th>
              <th>MÃ SP</th>
              <th>DANH MỤC</th>
              <th>GIÁ BÁN</th>
              <th>TRẠNG THÁI</th>
              <th>THAO TÁC</th>
            </tr>
          </thead>
          <tbody>
            {initialProducts.map(p => (
              <tr key={p.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <img src={p.image} alt={p.name} style={{ width: 36, height: 36, objectFit: 'cover', borderRadius: 8 }} />
                    <strong>{p.name}</strong>
                  </div>
                </td>
                <td>{p.code}</td>
                <td>{p.category}</td>
                <td><strong>{money(p.price)}</strong> / {p.unit}</td>
                <td>
                  <Badge tone={p.stock > 0 ? 'green' : 'gray'}>
                    {p.stock > 0 ? 'Đang hoạt động' : 'Tạm ngưng'}
                  </Badge>
                </td>
                <td>
                  <button style={{ border: 0, background: 'none', color: 'var(--orange)', fontWeight: 600, fontSize: 12 }} onClick={() => setModal('product')}>
                    Chỉnh sửa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

function InventoryAdmin({ setModal }: { setModal: (m: string) => void }) {
  return (
    <>
      <div className="admin-title">
        <div>
          <span>KHO TRỰC TUYẾN</span>
          <h1>Quản lý tồn kho online</h1>
          <p>Tồn kho trực tuyến độc lập, không tự động đồng bộ với cửa hàng vật lý.</p>
        </div>
        <Button onClick={() => setModal('stock')}>Điều chỉnh tồn kho</Button>
      </div>

      <div style={{ background: '#FFF8F0', border: '1px solid #F0D8BF', padding: '14px 20px', borderRadius: 14, marginBottom: 20, display: 'flex', gap: 12, alignItems: 'center' }}>
        <Icon name="inventory" size={20} />
        <div>
          <strong style={{ fontSize: 13, color: '#9F612E' }}>Lưu ý phạm vi tồn kho theo SRS:</strong>
          <p style={{ fontSize: 12, color: '#7A6560', margin: 0 }}>Mọi điều chỉnh chỉ áp dụng cho kho bán trực tuyến. Không được giảm dưới mức tồn đã giữ của đơn hàng.</p>
        </div>
      </div>

      <div className="data-card">
        <table>
          <thead>
            <tr>
              <th>SẢN PHẨM</th>
              <th>KHẢ DỤNG</th>
              <th>ĐÃ GIỮ</th>
              <th>TỔNG ONLINE</th>
              <th>CẢNH BÁO TỒN</th>
              <th>THAO TÁC</th>
            </tr>
          </thead>
          <tbody>
            {initialProducts.map(p => {
              const reserved = p.reserved || 2
              const available = p.stock - reserved
              return (
                <tr key={p.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <img src={p.image} alt={p.name} style={{ width: 36, height: 36, objectFit: 'cover', borderRadius: 8 }} />
                      <div>
                        <strong>{p.name}</strong>
                        <small style={{ display: 'block', color: 'var(--muted)' }}>{p.code}</small>
                      </div>
                    </div>
                  </td>
                  <td><strong style={{ color: available < 10 ? 'var(--orange)' : 'var(--brown)' }}>{available}</strong></td>
                  <td>{reserved}</td>
                  <td><strong>{p.stock}</strong></td>
                  <td>
                    {available <= 5 ? (
                      <Badge tone="red">Sắp hết hàng</Badge>
                    ) : (
                      <Badge tone="green">Ổn định</Badge>
                    )}
                  </td>
                  <td>
                    <button style={{ border: 0, background: 'none', color: 'var(--orange)', fontWeight: 600, fontSize: 12 }} onClick={() => setModal('stock')}>
                      Điều chỉnh
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

function ReportsAdmin() {
  return (
    <>
      <div className="admin-title">
        <div>
          <span>BÁO CÁO VẬN HÀNH</span>
          <h1>Tổng quan kinh doanh</h1>
          <p>Báo cáo tóm tắt vận hành demo. Doanh thu chỉ tính trên các đơn đồng thời <strong>Hoàn tất</strong> VÀ <strong>Đã thanh toán</strong>.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button kind="secondary" onClick={() => alert('Xuất báo cáo CSV thành công (Demo).')}>Xuất CSV</Button>
          <Button kind="secondary" onClick={() => alert('Xuất báo cáo PDF thành công (Demo).')}>Xuất PDF</Button>
        </div>
      </div>

      <div className="stats">
        <div className="stat">
          <small>Doanh thu ghi nhận (Hoàn tất & Đã TT)</small>
          <b>128,4 tr ₫</b>
          <em style={{ color: 'var(--sage)' }}>+12,5% kỳ trước</em>
        </div>
        <div className="stat">
          <small>Đơn hoàn tất & đã thu COD</small>
          <b>286</b>
          <em style={{ color: 'var(--sage)' }}>+8,2% kỳ trước</em>
        </div>
        <div className="stat">
          <small>Giá trị đơn trung bình</small>
          <b>448.950 ₫</b>
          <em style={{ color: 'var(--sage)' }}>+3,7% kỳ trước</em>
        </div>
      </div>

      {/* Revenue chart & Top products */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 20 }}>
        <div className="data-card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            <h3 style={{ font: "700 18px 'Playfair Display'", margin: 0 }}>Doanh thu theo ngày (7 ngày qua)</h3>
            <Badge tone="gray">Báo cáo vận hành</Badge>
          </div>
          <div style={{ height: 200, display: 'flex', alignItems: 'flex-end', gap: 14, padding: '10px 0', borderBottom: '1px solid #EDE5DB' }}>
            {[35, 48, 62, 54, 85, 72, 92].map((val, idx) => (
              <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ width: '100%', height: `${val}%`, background: 'linear-gradient(to top, var(--orange), #efb38f)', borderRadius: '6px 6px 0 0' }} />
                <span style={{ fontSize: 10, color: 'var(--muted)', marginTop: 8 }}>{`1${idx + 8}/05`}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="data-card" style={{ padding: 24 }}>
          <h3 style={{ font: "700 18px 'Playfair Display'", margin: '0 0 16px' }}>Sản phẩm bán chạy nhất</h3>
          {initialProducts.slice(0, 4).map((p, idx) => (
            <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid #EDE5DB' }}>
              <span style={{ font: "700 16px 'Playfair Display'", color: 'var(--orange)' }}>0{idx + 1}</span>
              <img src={p.image} alt={p.name} style={{ width: 36, height: 36, objectFit: 'cover', borderRadius: 8 }} />
              <div style={{ flex: 1 }}>
                <strong style={{ fontSize: 12, display: 'block' }}>{p.name}</strong>
                <small style={{ color: 'var(--muted)' }}>{120 - idx * 24} đơn vị</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

function UsersAdmin({ setModal }: { setModal: (m: string) => void }) {
  return (
    <>
      <div className="admin-title">
        <div>
          <span>QUẢN TRỊ HỆ THỐNG</span>
          <h1>Tài khoản người dùng & Phân quyền</h1>
          <p>Mỗi tài khoản chỉ được gán chính xác một vai trò. Không thể tự vô hiệu hóa tài khoản quản trị viên cuối cùng.</p>
        </div>
        <Button onClick={() => setModal('user')}>+ Tạo tài khoản nhân viên</Button>
      </div>

      <div className="data-card">
        <table>
          <thead>
            <tr>
              <th>HỌ TÊN</th>
              <th>EMAIL</th>
              <th>VAI TRÒ DUY NHẤT</th>
              <th>TRẠNG THÁI</th>
              <th>THAO TÁC</th>
            </tr>
          </thead>
          <tbody>
            {initialUsers.map(u => (
              <tr key={u.email}>
                <td><strong>{u.name}</strong></td>
                <td>{u.email}</td>
                <td><Badge tone="blue">{u.role}</Badge></td>
                <td><Badge tone="green">{u.status}</Badge></td>
                <td>
                  <button style={{ border: 0, background: 'none', color: 'var(--orange)', fontWeight: 600, fontSize: 12 }} onClick={() => setModal('user')}>
                    Chỉnh sửa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

function SettingsAdmin() {
  return (
    <>
      <div className="admin-title">
        <div>
          <span>CẤU HÌNH ĐÃ PHÊ DUYỆT</span>
          <h1>Khu vực & Phí giao hàng</h1>
          <p>Trang thanh toán COD chỉ áp dụng mức phí đang hoạt động tại cấu hình này.</p>
        </div>
        <Button onClick={() => alert('Thêm khu vực mới (Demo).')}>+ Thêm khu vực</Button>
      </div>

      <div className="data-card">
        <table>
          <thead>
            <tr>
              <th>KHU VỰC</th>
              <th>PHẠM VI ÁP DỤNG</th>
              <th>PHÍ GIAO HÀNG</th>
              <th>TRẠNG THÁI</th>
              <th>THAO TÁC</th>
            </tr>
          </thead>
          <tbody>
            {initialDeliveryAreas.map((d, i) => (
              <tr key={i}>
                <td><strong>{d.area}</strong></td>
                <td>{d.scope}</td>
                <td><strong>{money(d.fee)}</strong></td>
                <td><Badge tone="green">{d.status}</Badge></td>
                <td>
                  <button style={{ border: 0, background: 'none', color: 'var(--orange)', fontWeight: 600, fontSize: 12 }} onClick={() => alert('Chỉnh sửa phí giao hàng (Demo).')}>
                    Chỉnh sửa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="data-card" style={{ marginTop: 24, padding: 24 }}>
        <h3 style={{ font: "700 18px 'Playfair Display'", margin: '0 0 14px' }}>Nhật ký kiểm tra (Audit Log)</h3>
        <p style={{ fontSize: 13, borderBottom: '1px solid #EDE5DB', paddingBottom: 10 }}>
          <strong>Admin GHP</strong> cập nhật phí giao hàng Nội thành từ 25.000 đ thành 30.000 đ &nbsp;•&nbsp; <span style={{ color: 'var(--muted)' }}>Hôm nay 08:24</span>
        </p>
        <p style={{ fontSize: 13, borderBottom: '1px solid #EDE5DB', paddingBottom: 10 }}>
          <strong>Admin GHP</strong> kích hoạt khu vực Bình Dương &nbsp;•&nbsp; <span style={{ color: 'var(--muted)' }}>16/05/2025 14:02</span>
        </p>
      </div>
    </>
  )
}

function Admin({ navigate }: { navigate: (p: Page) => void }) {
  const [role, setRole] = useState('Nhân viên bán hàng')
  const [section, setSection] = useState('orders')
  const [modal, setModal] = useState<string | null>(null)
  const [modalOrder, setModalOrder] = useState<typeof initialOrders[0] | null>(null)
  const [orderList, setOrderList] = useState(initialOrders)

  const navItems = [
    { id: 'orders', label: 'Đơn hàng', icon: 'orders', roles: ['Nhân viên bán hàng'] },
    { id: 'products', label: 'Sản phẩm', icon: 'box', roles: ['Nhân viên kho'] },
    { id: 'inventory', label: 'Kho trực tuyến', icon: 'inventory', roles: ['Nhân viên kho'] },
    { id: 'reports', label: 'Báo cáo', icon: 'chart', roles: ['Quản lý'] },
    { id: 'users', label: 'Người dùng', icon: 'users', roles: ['Quản trị viên'] },
    { id: 'settings', label: 'Khu vực & phí giao', icon: 'home', roles: ['Quản trị viên'] }
  ]

  const chooseRole = (r: string) => {
    setRole(r)
    setSection(r === 'Nhân viên bán hàng' ? 'orders' : r === 'Nhân viên kho' ? 'products' : r === 'Quản lý' ? 'reports' : 'users')
  }

  const handleUpdateStatus = (code: string, newStatus: string) => {
    setOrderList(prev => prev.map(o => o.code === code ? { ...o, status: newStatus } : o))
    setModalOrder(null)
  }

  const handleRecordCOD = (code: string) => {
    setOrderList(prev => prev.map(o => o.code === code ? { ...o, payment: 'Đã thanh toán' } : o))
    setModalOrder(null)
  }

  return (
    <div className="admin">
      <aside>
        <Logo />
        <div className="admin-workspace-tag">KHÔNG GIAN LÀM VIỆC</div>
        <nav>
          {navItems.filter(item => item.roles.includes(role)).map(item => (
            <button
              key={item.id}
              className={section === item.id ? 'active' : ''}
              onClick={() => setSection(item.id)}
            >
              <Icon name={item.icon} size={17} /> {item.label}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-bottom">
          <button className="sidebar-storefront" onClick={() => navigate('home')}>
            <Icon name="arrow" size={15} /> Xem cửa hàng
          </button>
          <div className="sidebar-user">
            <div className="avatar-sm">
              {role === 'Nhân viên bán hàng' ? 'BH' : role === 'Nhân viên kho' ? 'KH' : role === 'Quản lý' ? 'QL' : 'AD'}
            </div>
            <div>
              <b>{role === 'Nhân viên bán hàng' ? 'Nguyễn Văn An' : role === 'Nhân viên kho' ? 'Lê Thị Hoa' : role === 'Quản lý' ? 'Phạm Văn Đức' : 'Admin GHP'}</b>
              <small>{role}</small>
            </div>
          </div>
        </div>
      </aside>

      <main>
        <header>
          <div className="admin-search-box">
            <Icon name="search" size={16} />
            <input placeholder="Tìm kiếm trong hệ thống..." />
          </div>
          <div className="admin-role-select">
            <span>Đang xem với vai trò:</span>
            <select value={role} onChange={e => chooseRole(e.target.value)}>
              <option>Nhân viên bán hàng</option>
              <option>Nhân viên kho</option>
              <option>Quản lý</option>
              <option>Quản trị viên</option>
            </select>
          </div>
        </header>

        <div className="admin-content">
          {section === 'orders' && <OrdersAdmin orderList={orderList} setModalOrder={setModalOrder} />}
          {section === 'products' && <ProductsAdmin setModal={setModal} />}
          {section === 'inventory' && <InventoryAdmin setModal={setModal} />}
          {section === 'reports' && <ReportsAdmin />}
          {section === 'users' && <UsersAdmin setModal={setModal} />}
          {section === 'settings' && <SettingsAdmin />}
        </div>
      </main>

      {/* Order Detail Modal */}
      {modalOrder && (
        <div className="modal-backdrop" onClick={e => { if (e.target === e.currentTarget) setModalOrder(null) }}>
          <div className="modal">
            <div className="modal-head">
              <h2>Chi tiết đơn hàng {modalOrder.code}</h2>
              <button style={{ border: 0, background: 'none' }} onClick={() => setModalOrder(null)}>
                <Icon name="x" size={20} />
              </button>
            </div>
            <p><strong>Khách hàng:</strong> {modalOrder.customer} • {modalOrder.date}</p>
            <p><strong>Tổng tiền COD:</strong> <span style={{ color: 'var(--orange)', fontWeight: 700 }}>{money(modalOrder.total)}</span></p>
            <p><strong>Trạng thái đơn:</strong> {modalOrder.status} &nbsp;|&nbsp; <strong>Thanh toán:</strong> {modalOrder.payment}</p>

            <div style={{ marginTop: 24, padding: 18, background: '#F8F6F3', borderRadius: 14 }}>
              <h4 style={{ margin: '0 0 12px' }}>Chuyển đổi trạng thái đơn (Tuần tự):</h4>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {modalOrder.status === 'Chờ xác nhận' && (
                  <Button onClick={() => handleUpdateStatus(modalOrder.code, 'Đã xác nhận')}>
                    ✓ Xác nhận đơn hàng
                  </Button>
                )}
                {modalOrder.status === 'Đã xác nhận' && (
                  <Button onClick={() => handleUpdateStatus(modalOrder.code, 'Đang chuẩn bị')}>
                    → Chuyển sang Đang chuẩn bị
                  </Button>
                )}
                {modalOrder.status === 'Đang chuẩn bị' && (
                  <Button onClick={() => handleUpdateStatus(modalOrder.code, 'Đang giao')}>
                    → Đánh dấu Đang giao
                  </Button>
                )}
                {modalOrder.status === 'Đang giao' && (
                  <Button onClick={() => handleUpdateStatus(modalOrder.code, 'Hoàn tất')}>
                    ✓ Xác nhận Hoàn tất
                  </Button>
                )}
                {modalOrder.payment === 'Chưa thanh toán' && (
                  <Button kind="secondary" onClick={() => handleRecordCOD(modalOrder.code)}>
                    💵 Ghi nhận đã thu COD ({money(modalOrder.total)})
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Generic Modal (Product, Stock, User) */}
      {modal && (
        <div className="modal-backdrop" onClick={e => { if (e.target === e.currentTarget) setModal(null) }}>
          <div className="modal">
            <div className="modal-head">
              <h2>{modal === 'product' ? 'Thông tin sản phẩm' : modal === 'stock' ? 'Điều chỉnh tồn kho online' : 'Tài khoản nhân viên'}</h2>
              <button style={{ border: 0, background: 'none' }} onClick={() => setModal(null)}>
                <Icon name="x" size={20} />
              </button>
            </div>
            {modal === 'product' ? (
              <form onSubmit={e => { e.preventDefault(); alert('Đã lưu sản phẩm thành công!'); setModal(null) }}>
                <label>Tên sản phẩm<input required defaultValue="Bột mì đa dụng Baker's Choice" /></label>
                <div className="form-grid" style={{ marginTop: 12 }}>
                  <label>Mã sản phẩm<input defaultValue="GHP-BOT-009" /></label>
                  <label>Giá bán (VND)<input type="number" defaultValue="42000" /></label>
                </div>
                <div className="form-grid" style={{ marginTop: 12 }}>
                  <label>Danh mục<select><option>Bột làm bánh</option></select></label>
                  <label>Đơn vị bán<input defaultValue="Túi 1 kg" /></label>
                </div>
                <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                  <Button kind="secondary" onClick={() => setModal(null)}>Hủy</Button>
                  <Button type="submit">Lưu thay đổi</Button>
                </div>
              </form>
            ) : modal === 'stock' ? (
              <form onSubmit={e => { e.preventDefault(); alert('Đã điều chỉnh tồn kho thành công!'); setModal(null) }}>
                <label>Sản phẩm<select><option>Bơ lạt lên men cao cấp (GHP-BOS-003)</option></select></label>
                <div className="form-grid" style={{ marginTop: 12 }}>
                  <label>Loại điều chỉnh<select><option>Nhập thêm hàng</option><option>Điều chỉnh giảm</option></select></label>
                  <label>Số lượng điều chỉnh<input type="number" defaultValue="10" min="1" /></label>
                </div>
                <label style={{ display: 'block', marginTop: 12 }}>
                  Lý do điều chỉnh (Bắt buộc theo SRS)
                  <textarea required style={{ width: '100%', height: 70, padding: 8, borderRadius: 8, border: '1px solid #EDE5DB' }} placeholder="Nhập lý do điều chỉnh tồn kho..." />
                </label>
                <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                  <Button kind="secondary" onClick={() => setModal(null)}>Hủy</Button>
                  <Button type="submit">Xác nhận điều chỉnh</Button>
                </div>
              </form>
            ) : (
              <form onSubmit={e => { e.preventDefault(); alert('Đã tạo tài khoản nhân viên thành công!'); setModal(null) }}>
                <label>Họ và tên nhân viên<input required placeholder="Trần Thu Hà" /></label>
                <label style={{ display: 'block', marginTop: 12 }}>Email công việc<input required type="email" placeholder="ha.tran@ghp.vn" /></label>
                <label style={{ display: 'block', marginTop: 12 }}>
                  Vai trò duy nhất
                  <select>
                    <option>Nhân viên bán hàng</option>
                    <option>Nhân viên kho</option>
                    <option>Quản lý</option>
                    <option>Quản trị viên</option>
                  </select>
                </label>
                <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                  <Button kind="secondary" onClick={() => setModal(null)}>Hủy</Button>
                  <Button type="submit">Lưu tài khoản</Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function Footer({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <footer>
      <div className="shell footer-grid">
        <div>
          <Logo />
          <p>
            Đồng hành cùng người làm bánh Việt với nguyên liệu, dụng cụ và thiết bị được trình bày minh bạch.
          </p>
        </div>
        <div>
          <h3>Mua sắm</h3>
          <button onClick={() => navigate('catalog')}>Tất cả sản phẩm</button>
          <button onClick={() => navigate('catalog')}>Chocolate</button>
          <button onClick={() => navigate('orders')}>Đơn hàng của tôi</button>
        </div>
        <div>
          <h3>Hỗ trợ</h3>
          <button onClick={() => alert('Hướng dẫn mua hàng và đặt hàng COD.')}>Hướng dẫn mua hàng</button>
          <button onClick={() => alert('Chính sách bảo mật dữ liệu khách hàng.')}>Chính sách bảo mật</button>
          <button onClick={() => alert('Hotline hỗ trợ: (028) 7300 6868')}>Liên hệ hỗ trợ</button>
        </div>
        <div>
          <h3>Gia Hòa Phát</h3>
          <p style={{ margin: 0 }}>
            Thứ 2 – Thứ 7: 08:00 – 17:30<br />
            support@ghp-demo.vn<br />
            (028) 7300 6868
          </p>
        </div>
      </div>
      <div className="footer-bottom shell">
        <span>© 2025 Gia Hòa Phát. Prototype minh họa OSBIS.</span>
        <span>Thanh toán duy nhất: Tiền mặt khi nhận hàng (COD)</span>
      </div>
    </footer>
  )
}

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [cart, setCart] = useState<CartLine[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product>(initialProducts[0])
  const [toast, setToast] = useState('')

  const navigate = (p: Page) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const add = (p: Product, qty = 1) => {
    setCart(ls => {
      const x = ls.find(l => l.id === p.id)
      return x
        ? ls.map(l => (l.id === p.id ? { ...l, qty: Math.min(l.stock, l.qty + qty) } : l))
        : [...ls, { ...p, qty }]
    })
    setToast(`Đã thêm “${p.name}” vào giỏ hàng!`)
    setTimeout(() => setToast(''), 2500)
  }

  if (page === 'admin') return <Admin navigate={navigate} />
  if (page === 'login') return <Login navigate={navigate} />

  return (
    <div>
      <Header navigate={navigate} cartCount={cart.reduce((s, l) => s + l.qty, 0)} />
      {page === 'home' && <Home navigate={navigate} add={add} onSelect={setSelectedProduct} />}
      {page === 'catalog' && <Catalog navigate={navigate} add={add} onSelect={setSelectedProduct} />}
      {page === 'product' && <ProductDetail p={selectedProduct} navigate={navigate} add={add} />}
      {page === 'cart' && <Cart lines={cart} setLines={setCart} navigate={navigate} />}
      {page === 'checkout' && <Checkout lines={cart} navigate={navigate} clear={() => setCart([])} />}
      {page === 'success' && <Success navigate={navigate} />}
      {page === 'account' && <Account navigate={navigate} />}
      {page === 'orders' && <Orders navigate={navigate} />}
      {!['checkout', 'success'].includes(page) && <Footer navigate={navigate} />}
      {toast && (
        <div className="toast">
          <Icon name="check" size={16} />
          <span>{toast}</span>
          <button style={{ border: 0, background: 'none', color: '#fff', marginLeft: 10 }} onClick={() => setToast('')}>
            <Icon name="x" size={14} />
          </button>
        </div>
      )}
    </div>
  )
}
