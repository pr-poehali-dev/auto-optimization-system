import { useState, useEffect } from "react"
import Icon from "@/components/ui/icon"
import { Button } from "@/components/ui/button"

const HERO_IMG = "https://cdn.poehali.dev/projects/1063da63-766d-4f25-a28c-a90d34e4f741/files/60f41ae1-4c0f-4860-9a8c-1c59f5a158b4.jpg"
const FAMILY_IMG = "https://cdn.poehali.dev/projects/1063da63-766d-4f25-a28c-a90d34e4f741/files/914bd7da-019e-44b0-9a32-cc47414b2d78.jpg"
const ALPACA_FACE = "https://cdn.poehali.dev/projects/1063da63-766d-4f25-a28c-a90d34e4f741/files/b4fa9e27-cd4a-4541-8632-996b7a68bad2.jpg"

const GALLERY_IMGS = [
  "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1548199569-3e1c6aa8f469?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?w=600&h=400&fit=crop",
  ALPACA_FACE,
  HERO_IMG,
  FAMILY_IMG,
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1592806088932-05058af0ad8d?w=600&h=400&fit=crop",
]

const reviews = [
  { name: "Анна Соколова", date: "Апрель 2024", text: "Были с двумя дочками 7 и 10 лет — они в полном восторге! Альпаки такие ласковые и добродушные. Обязательно вернёмся летом.", stars: 5, avatar: "https://i.pravatar.cc/80?img=5" },
  { name: "Дмитрий Орлов", date: "Май 2024", text: "Брали школьную группу 25 человек. Всё организовано чётко, дети были счастливы. Особенно понравилось кормление из рук. Рекомендую!", stars: 5, avatar: "https://i.pravatar.cc/80?img=12" },
  { name: "Мария Петрова", date: "Март 2024", text: "Приехали на фотосессию с мужем — получили потрясающие кадры. Животные очень фотогеничные, персонал помогал выбрать ракурсы.", stars: 5, avatar: "https://i.pravatar.cc/80?img=9" },
  { name: "Семья Кузнецовых", date: "Июнь 2024", text: "Провели здесь целый день! Козочки и кролики тоже очень умилительные. Спокойная обстановка, зелёная ферма — отличный отдых от города.", stars: 5, avatar: "https://i.pravatar.cc/80?img=20" },
]

const animals = [
  { name: "Альпаки", emoji: "🦙", desc: "Мягкие, добрые и невероятно обаятельные. Их можно кормить с ладони, гладить и обнимать. Альпаки прекрасно ладят с детьми.", img: HERO_IMG },
  { name: "Нубийские козы", emoji: "🐐", desc: "Игривые и умные, с длинными ушками. Очень общительные — сами подходят знакомиться и с удовольствием берут угощение.", img: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=400&h=300&fit=crop" },
  { name: "Декоративные кролики", emoji: "🐇", desc: "Пушистые малыши для самых юных гостей. Мягкие и нежные, их можно взять на руки и потискать под присмотром смотрителя.", img: "https://images.unsplash.com/photo-1548199569-3e1c6aa8f469?w=400&h=300&fit=crop" },
]

const prices = [
  { title: "Входной билет", icon: "Ticket", price: "400 ₽", desc: "Взрослый", note: "Прогулка по парку, знакомство с животными" },
  { title: "Детский билет", icon: "Baby", price: "300 ₽", desc: "Дети до 12 лет", note: "Дети до 3 лет — бесплатно" },
  { title: "Семейный", icon: "Heart", price: "1 200 ₽", desc: "2 взрослых + 2 детей", note: "Выгода 200 ₽ при покупке комплектом" },
  { title: "Школьная группа", icon: "GraduationCap", price: "250 ₽/чел", desc: "От 10 человек", note: "Экскурсовод в подарок при группе от 20 чел" },
  { title: "Фотосессия", icon: "Camera", price: "1 500 ₽", desc: "30 минут с альпакой", note: "Профессиональный фотограф — от 3 000 ₽" },
  { title: "VIP-визит", icon: "Star", price: "5 000 ₽", desc: "До 4 человек, 2 часа", note: "Кормление, прогулка, фото, чай с пирогами" },
]

const steps = [
  { n: "01", title: "Бронирование", desc: "Выберите дату и время онлайн или позвоните нам. Подтвердим в течение часа.", icon: "CalendarCheck" },
  { n: "02", title: "Встреча на ферме", desc: "Смотритель встретит вас у ворот, расскажет о правилах и познакомит с обитателями.", icon: "MapPin" },
  { n: "03", title: "Кормление и общение", desc: "Угощайте альпак из рук, гладьте козочек и держите кроликов — незабываемые эмоции!", icon: "HandHeart" },
  { n: "04", title: "Отдых и впечатления", desc: "Чай на веранде, фото на память и тёплые воспоминания на долгие годы.", icon: "Coffee" },
]

export default function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [reviewIdx, setReviewIdx] = useState(0)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(2)
  const [bookForm, setBookForm] = useState({ date: "", time: "", name: "", phone: "" })
  const [contactForm, setContactForm] = useState({ name: "", phone: "", message: "" })
  const [bookSent, setBookSent] = useState(false)
  const [contactSent, setContactSent] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const totalPrice = adults * 400 + children * 300

  const showNotification = (msg: string) => {
    setNotification(msg)
    setTimeout(() => setNotification(null), 4000)
  }

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault()
    setBookSent(true)
    showNotification("🎉 Заявка принята! Мы свяжемся с вами в течение часа.")
  }

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault()
    setContactSent(true)
    showNotification("✅ Сообщение отправлено! Ответим в ближайшее время.")
  }

  const faqs = [
    { q: "Можно ли прийти без записи?", a: "Да, мы принимаем гостей без предварительного бронирования, если есть свободные места. Но рекомендуем записаться заранее, особенно на выходных и праздниках." },
    { q: "С какого возраста можно посещать парк?", a: "Парк открыт для гостей любого возраста! Дети до 3 лет проходят бесплатно. Малышей до 6 лет просим держать за руку рядом с животными." },
    { q: "Есть ли у вас парковка?", a: "Да, рядом с фермой есть бесплатная парковка на 30 мест. Для автобусов — отдельная площадка, просим уведомить заранее." },
    { q: "Как проводится школьная экскурсия?", a: "Для школьных групп от 10 человек мы предлагаем специальную программу: интерактивный рассказ о животных, кормление, мини-квест и сувениры. Длительность — 1,5–2 часа." },
    { q: "Работаете ли вы зимой?", a: "Да! Парк работает круглый год. Альпаки прекрасно переносят зиму, а зимние визиты — особенно трогательные и атмосферные." },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setReviewIdx(i => (i + 1) % reviews.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox === null) return
      if (e.key === "Escape") setLightbox(null)
      if (e.key === "ArrowRight") setLightbox(i => i !== null ? (i + 1) % GALLERY_IMGS.length : null)
      if (e.key === "ArrowLeft") setLightbox(i => i !== null ? (i - 1 + GALLERY_IMGS.length) % GALLERY_IMGS.length : null)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [lightbox])

  const navLinks = [
    { label: "О парке", href: "#about" },
    { label: "Животные", href: "#animals" },
    { label: "Цены", href: "#prices" },
    { label: "Галерея", href: "#gallery" },
    { label: "Контакты", href: "#contacts" },
  ]

  return (
    <div className="min-h-screen bg-[#faf6f0] text-[#3a2c1e]" style={{ fontFamily: "'Nunito', sans-serif" }}>

      {/* Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-[100] bg-[#4a7c59] text-white px-6 py-4 rounded-2xl shadow-2xl text-sm font-semibold animate-in slide-in-from-right max-w-xs">
          {notification}
        </div>
      )}

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[90] bg-black/90 flex items-center justify-center" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-white text-3xl" onClick={() => setLightbox(null)}>✕</button>
          <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl px-4" onClick={e => { e.stopPropagation(); setLightbox(i => i !== null ? (i - 1 + GALLERY_IMGS.length) % GALLERY_IMGS.length : null) }}>‹</button>
          <img src={GALLERY_IMGS[lightbox]} alt="" className="max-w-[90vw] max-h-[85vh] rounded-2xl object-contain" onClick={e => e.stopPropagation()} />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl px-4" onClick={e => { e.stopPropagation(); setLightbox(i => i !== null ? (i + 1) % GALLERY_IMGS.length : null) }}>›</button>
        </div>
      )}

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#e8ddd0] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2">
            <span className="text-2xl">🦙</span>
            <span className="font-bold text-lg text-[#4a7c59]" style={{ fontFamily: "'Playfair Display', serif" }}>АльпакаПарк</span>
          </a>
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(l => (
              <a key={l.label} href={l.href} className="px-4 py-2 rounded-full text-sm font-semibold text-[#3a2c1e] hover:bg-[#f0e8da] transition-colors">
                {l.label}
              </a>
            ))}
          </div>
          <a href="#booking" className="hidden md:inline-flex items-center gap-2 bg-[#4a7c59] text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-[#3d6a4a] transition-colors">
            <Icon name="CalendarCheck" size={16} />
            Забронировать
          </a>
          <button className="md:hidden p-2 rounded-lg" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-[#e8ddd0] px-4 py-4 flex flex-col gap-2">
            {navLinks.map(l => (
              <a key={l.label} href={l.href} className="py-2 font-semibold text-[#3a2c1e]" onClick={() => setMenuOpen(false)}>{l.label}</a>
            ))}
            <a href="#booking" className="mt-2 bg-[#4a7c59] text-white py-3 rounded-full text-center font-bold" onClick={() => setMenuOpen(false)}>Забронировать</a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Альпаки на ферме" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-5 py-2 text-sm font-semibold mb-6">
            <span>🌿</span> Открыты каждый день с 10:00 до 19:00
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight drop-shadow-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
            Познакомьтесь<br />с альпаками!
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Уютная ферма с пушистыми альпаками, игривыми козочками и кроликами. Незабываемые впечатления для всей семьи.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#booking">
              <Button size="lg" className="bg-[#4a7c59] hover:bg-[#3d6a4a] text-white rounded-full px-8 py-4 text-lg font-bold shadow-lg">
                <Icon name="CalendarCheck" size={20} className="mr-2" />
                Забронировать визит
              </Button>
            </a>
            <a href="#about">
              <Button size="lg" variant="outline" className="bg-white/20 backdrop-blur border-white/50 text-white hover:bg-white/30 rounded-full px-8 py-4 text-lg font-bold">
                Узнать больше
              </Button>
            </a>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm font-semibold">
            {["🦙 Более 20 альпак", "👨‍👩‍👧‍👦 Для всей семьи", "📸 Фотосессии", "🏫 Школьные группы"].map(t => (
              <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">{t}</span>
            ))}
          </div>
        </div>
        <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce">
          <Icon name="ChevronDown" size={32} />
        </a>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-4 bg-[#faf6f0]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#e8f4ed] text-[#4a7c59] rounded-full px-4 py-2 text-sm font-bold mb-6">
                <Icon name="Leaf" size={16} /> О нашем парке
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#3a2c1e]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Место, где<br />рождается радость
              </h2>
              <p className="text-lg text-[#6b5c4e] leading-relaxed mb-6">
                АльпакаПарк — это уютная экоферма в окружении природы, где каждый гость может пообщаться с удивительными животными. Мы создали это место, чтобы горожане могли отдохнуть от суеты и почувствовать настоящую теплоту живой природы.
              </p>
              <p className="text-lg text-[#6b5c4e] leading-relaxed mb-8">
                Наши альпаки выращены с любовью и привыкли к гостям. Они мягкие, добродушные и абсолютно безопасны для детей. Мы придерживаемся принципов гуманного отношения к животным и бережем каждого питомца.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[{ v: "20+", l: "Альпак" }, { v: "5 000+", l: "Гостей в год" }, { v: "4.9 ★", l: "Рейтинг" }].map(s => (
                  <div key={s.l} className="bg-white rounded-2xl p-4 text-center shadow-sm border border-[#e8ddd0]">
                    <div className="text-2xl font-bold text-[#4a7c59]">{s.v}</div>
                    <div className="text-sm text-[#6b5c4e] font-medium">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img src={FAMILY_IMG} alt="Семья на ферме" className="rounded-3xl w-full object-cover shadow-xl" style={{ height: 480 }} />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl border border-[#e8ddd0]">
                <div className="text-3xl mb-1">🌱</div>
                <div className="font-bold text-[#3a2c1e]">Экофилософия</div>
                <div className="text-sm text-[#6b5c4e]">Мы любим и уважаем природу</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ANIMALS */}
      <section id="animals" className="py-24 px-4 bg-[#f0ebe2]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#e8f4ed] text-[#4a7c59] rounded-full px-4 py-2 text-sm font-bold mb-4">
              <Icon name="Heart" size={16} /> Наши обитатели
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#3a2c1e]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Познакомьтесь с жителями фермы
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {animals.map(a => (
              <div key={a.name} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#e8ddd0] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className="overflow-hidden h-56">
                  <img src={a.img} alt={a.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="text-3xl mb-3">{a.emoji}</div>
                  <h3 className="text-xl font-bold text-[#3a2c1e] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{a.name}</h3>
                  <p className="text-[#6b5c4e] leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICES */}
      <section id="prices" className="py-24 px-4 bg-[#faf6f0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#e8f4ed] text-[#4a7c59] rounded-full px-4 py-2 text-sm font-bold mb-4">
              <Icon name="Tag" size={16} /> Стоимость посещения
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#3a2c1e] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Услуги и цены
            </h2>
            <p className="text-[#6b5c4e] text-lg max-w-xl mx-auto">Выберите формат, который подойдёт именно вам</p>
          </div>

          {/* Calculator */}
          <div className="bg-[#4a7c59] rounded-3xl p-8 mb-12 text-white">
            <h3 className="text-xl font-bold mb-6 text-center">🧮 Калькулятор стоимости</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-white/20 rounded-2xl p-4">
                  <span className="font-semibold">Взрослые (400 ₽)</span>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setAdults(Math.max(0, adults - 1))} className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center hover:bg-white/40 transition-colors font-bold text-lg">−</button>
                    <span className="text-xl font-bold w-6 text-center">{adults}</span>
                    <button onClick={() => setAdults(adults + 1)} className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center hover:bg-white/40 transition-colors font-bold text-lg">+</button>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-white/20 rounded-2xl p-4">
                  <span className="font-semibold">Дети до 12 лет (300 ₽)</span>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center hover:bg-white/40 transition-colors font-bold text-lg">−</button>
                    <span className="text-xl font-bold w-6 text-center">{children}</span>
                    <button onClick={() => setChildren(children + 1)} className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center hover:bg-white/40 transition-colors font-bold text-lg">+</button>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold">{totalPrice} ₽</div>
                <div className="text-white/80 mt-2">итого за группу</div>
                <div className="text-sm text-white/60 mt-1">дети до 3 лет — бесплатно</div>
              </div>
              <div className="text-center">
                <a href="#booking">
                  <Button className="bg-white text-[#4a7c59] hover:bg-white/90 rounded-full px-8 py-3 font-bold text-base w-full">
                    Забронировать
                  </Button>
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {prices.map(p => (
              <div key={p.title} className="bg-white rounded-3xl p-6 border border-[#e8ddd0] hover:border-[#4a7c59] hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-[#e8f4ed] rounded-2xl flex items-center justify-center mb-4">
                  <Icon name={p.icon} size={22} className="text-[#4a7c59]" />
                </div>
                <h3 className="font-bold text-[#3a2c1e] text-lg mb-1">{p.title}</h3>
                <div className="text-2xl font-bold text-[#4a7c59] mb-1">{p.price}</div>
                <div className="text-sm font-semibold text-[#6b5c4e] mb-2">{p.desc}</div>
                <div className="text-sm text-[#9c8b7e]">{p.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="py-24 px-4 bg-[#f0ebe2]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#e8f4ed] text-[#4a7c59] rounded-full px-4 py-2 text-sm font-bold mb-4">
              <Icon name="MapPin" size={16} /> Как проходит визит
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#3a2c1e]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Программа посещения
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={s.n} className="bg-white rounded-3xl p-8 border border-[#e8ddd0] relative hover:shadow-md transition-all duration-300">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 right-0 translate-x-1/2 z-10">
                    <Icon name="ChevronRight" size={20} className="text-[#c4b5a5]" />
                  </div>
                )}
                <div className="text-4xl font-bold text-[#e8ddd0] mb-4">{s.n}</div>
                <div className="w-12 h-12 bg-[#e8f4ed] rounded-2xl flex items-center justify-center mb-4">
                  <Icon name={s.icon} size={22} className="text-[#4a7c59]" />
                </div>
                <h3 className="font-bold text-[#3a2c1e] text-lg mb-3">{s.title}</h3>
                <p className="text-[#6b5c4e] text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-24 px-4 bg-[#faf6f0]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#e8f4ed] text-[#4a7c59] rounded-full px-4 py-2 text-sm font-bold mb-4">
              <Icon name="Star" size={16} /> Отзывы гостей
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#3a2c1e]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Что говорят наши гости
            </h2>
          </div>
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-[#e8ddd0] min-h-[280px] relative">
            <div className="flex gap-1 mb-6">
              {Array.from({ length: reviews[reviewIdx].stars }).map((_, i) => (
                <Icon key={i} name="Star" size={20} className="text-[#f59e0b] fill-[#f59e0b]" />
              ))}
            </div>
            <p className="text-xl text-[#3a2c1e] leading-relaxed mb-8 italic">"{reviews[reviewIdx].text}"</p>
            <div className="flex items-center gap-4">
              <img src={reviews[reviewIdx].avatar} alt={reviews[reviewIdx].name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <div className="font-bold text-[#3a2c1e]">{reviews[reviewIdx].name}</div>
                <div className="text-sm text-[#9c8b7e]">{reviews[reviewIdx].date}</div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, i) => (
              <button key={i} onClick={() => setReviewIdx(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === reviewIdx ? "bg-[#4a7c59] w-6" : "bg-[#c4b5a5]"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 px-4 bg-[#f0ebe2]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#e8f4ed] text-[#4a7c59] rounded-full px-4 py-2 text-sm font-bold mb-4">
              <Icon name="Camera" size={16} /> Фотогалерея
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#3a2c1e]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Жизнь на ферме
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {GALLERY_IMGS.map((src, i) => (
              <div key={i} onClick={() => setLightbox(i)} className={`rounded-2xl overflow-hidden cursor-pointer hover:opacity-90 hover:scale-[1.02] transition-all duration-300 ${i === 0 ? "col-span-2 row-span-2" : ""}`} style={{ height: i === 0 ? 360 : 170 }}>
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="py-24 px-4 bg-[#4a7c59]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Забронировать визит
            </h2>
            <p className="text-white/80 text-lg">Выберите удобное время — и мы вас ждём!</p>
          </div>
          {bookSent ? (
            <div className="bg-white rounded-3xl p-12 text-center shadow-xl">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-[#3a2c1e] mb-2">Заявка принята!</h3>
              <p className="text-[#6b5c4e]">Мы перезвоним вам в течение часа для подтверждения.</p>
            </div>
          ) : (
            <form onSubmit={handleBook} className="bg-white rounded-3xl p-8 md:p-10 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold text-[#3a2c1e] mb-2">Ваше имя</label>
                  <input required value={bookForm.name} onChange={e => setBookForm({ ...bookForm, name: e.target.value })} type="text" placeholder="Как к вам обращаться?" className="w-full px-4 py-3 rounded-xl border-2 border-[#e8ddd0] focus:border-[#4a7c59] outline-none text-[#3a2c1e] transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#3a2c1e] mb-2">Телефон</label>
                  <input required value={bookForm.phone} onChange={e => setBookForm({ ...bookForm, phone: e.target.value })} type="tel" placeholder="+7 (___) ___-__-__" className="w-full px-4 py-3 rounded-xl border-2 border-[#e8ddd0] focus:border-[#4a7c59] outline-none text-[#3a2c1e] transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#3a2c1e] mb-2">Дата посещения</label>
                  <input required value={bookForm.date} onChange={e => setBookForm({ ...bookForm, date: e.target.value })} type="date" className="w-full px-4 py-3 rounded-xl border-2 border-[#e8ddd0] focus:border-[#4a7c59] outline-none text-[#3a2c1e] transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#3a2c1e] mb-2">Время</label>
                  <select required value={bookForm.time} onChange={e => setBookForm({ ...bookForm, time: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 border-[#e8ddd0] focus:border-[#4a7c59] outline-none text-[#3a2c1e] transition-colors bg-white">
                    <option value="">Выберите время</option>
                    {["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-6 mb-6 bg-[#f0ebe2] rounded-2xl p-4">
                <div className="flex-1">
                  <div className="text-sm font-bold text-[#3a2c1e] mb-2">Взрослые</div>
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={() => setAdults(Math.max(0, adults - 1))} className="w-8 h-8 bg-white rounded-full border border-[#e8ddd0] flex items-center justify-center font-bold hover:bg-[#e8f4ed] transition-colors">−</button>
                    <span className="text-xl font-bold text-[#4a7c59]">{adults}</span>
                    <button type="button" onClick={() => setAdults(adults + 1)} className="w-8 h-8 bg-white rounded-full border border-[#e8ddd0] flex items-center justify-center font-bold hover:bg-[#e8f4ed] transition-colors">+</button>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-[#3a2c1e] mb-2">Дети</div>
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={() => setChildren(Math.max(0, children - 1))} className="w-8 h-8 bg-white rounded-full border border-[#e8ddd0] flex items-center justify-center font-bold hover:bg-[#e8f4ed] transition-colors">−</button>
                    <span className="text-xl font-bold text-[#4a7c59]">{children}</span>
                    <button type="button" onClick={() => setChildren(children + 1)} className="w-8 h-8 bg-white rounded-full border border-[#e8ddd0] flex items-center justify-center font-bold hover:bg-[#e8f4ed] transition-colors">+</button>
                  </div>
                </div>
                <div className="flex-1 text-right">
                  <div className="text-sm font-bold text-[#3a2c1e] mb-2">Итого</div>
                  <div className="text-2xl font-bold text-[#4a7c59]">{totalPrice} ₽</div>
                </div>
              </div>
              <Button type="submit" size="lg" className="w-full bg-[#4a7c59] hover:bg-[#3d6a4a] text-white rounded-xl py-4 font-bold text-lg">
                <Icon name="CalendarCheck" size={20} className="mr-2" />
                Отправить заявку
              </Button>
              <p className="text-xs text-[#9c8b7e] text-center mt-4">Мы перезвоним в течение часа для подтверждения</p>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 bg-[#faf6f0]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#e8f4ed] text-[#4a7c59] rounded-full px-4 py-2 text-sm font-bold mb-4">
              <Icon name="HelpCircle" size={16} /> Частые вопросы
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#3a2c1e]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Ответы на вопросы
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#e8ddd0] overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#faf6f0] transition-colors">
                  <span className="font-bold text-[#3a2c1e] pr-4">{f.q}</span>
                  <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={20} className="text-[#4a7c59] flex-shrink-0" />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-[#6b5c4e] leading-relaxed">{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-4 bg-[#f0ebe2]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#e8f4ed] text-[#4a7c59] rounded-full px-4 py-2 text-sm font-bold mb-4">
              <Icon name="MapPin" size={16} /> Как добраться
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#3a2c1e]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Мы вас ждём!
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Map */}
            <div className="rounded-3xl overflow-hidden shadow-sm border border-[#e8ddd0] h-80 bg-[#ddd8d0] flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl mb-3">🗺️</div>
                <div className="font-bold text-[#6b5c4e]">Карта загружается…</div>
                <div className="text-sm text-[#9c8b7e] mt-1">Московская обл., Сергиево-Посадский р-н</div>
              </div>
            </div>

            {/* Info + Contact form */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-[#e8ddd0]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: "MapPin", title: "Адрес", val: "Московская обл., Сергиево-Посадский р-н, с. Радонеж" },
                    { icon: "Phone", title: "Телефон", val: "+7 (916) 123-45-67" },
                    { icon: "Clock", title: "Режим работы", val: "Пн–Вс: 10:00–19:00\nБез выходных" },
                    { icon: "Mail", title: "Email", val: "hello@alpakapark.ru" },
                  ].map(c => (
                    <div key={c.title} className="flex gap-3">
                      <div className="w-10 h-10 bg-[#e8f4ed] rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon name={c.icon} size={18} className="text-[#4a7c59]" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#9c8b7e] uppercase tracking-wide">{c.title}</div>
                        <div className="text-sm font-semibold text-[#3a2c1e] whitespace-pre-line">{c.val}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {contactSent ? (
                <div className="bg-white rounded-3xl p-8 text-center border border-[#e8ddd0]">
                  <div className="text-4xl mb-3">✅</div>
                  <h3 className="font-bold text-[#3a2c1e]">Сообщение отправлено!</h3>
                  <p className="text-sm text-[#6b5c4e] mt-1">Ответим в ближайшее время</p>
                </div>
              ) : (
                <form onSubmit={handleContact} className="bg-white rounded-3xl p-6 border border-[#e8ddd0] space-y-4">
                  <h3 className="font-bold text-[#3a2c1e] text-lg">Напишите нам</h3>
                  <input required value={contactForm.name} onChange={e => setContactForm({ ...contactForm, name: e.target.value })} type="text" placeholder="Ваше имя" className="w-full px-4 py-3 rounded-xl border-2 border-[#e8ddd0] focus:border-[#4a7c59] outline-none text-[#3a2c1e] transition-colors text-sm" />
                  <input required value={contactForm.phone} onChange={e => setContactForm({ ...contactForm, phone: e.target.value })} type="tel" placeholder="Телефон" className="w-full px-4 py-3 rounded-xl border-2 border-[#e8ddd0] focus:border-[#4a7c59] outline-none text-[#3a2c1e] transition-colors text-sm" />
                  <textarea required value={contactForm.message} onChange={e => setContactForm({ ...contactForm, message: e.target.value })} rows={3} placeholder="Ваш вопрос или сообщение..." className="w-full px-4 py-3 rounded-xl border-2 border-[#e8ddd0] focus:border-[#4a7c59] outline-none text-[#3a2c1e] transition-colors resize-none text-sm" />
                  <Button type="submit" className="w-full bg-[#4a7c59] hover:bg-[#3d6a4a] text-white rounded-xl py-3 font-bold">
                    Отправить сообщение
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#2d4a35] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">🦙</span>
                <span className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>АльпакаПарк</span>
              </div>
              <p className="text-white/70 leading-relaxed mb-6 max-w-xs">
                Уютная экоферма с альпаками, козочками и кроликами. Открыты для семей с детьми, туристов и школьных групп каждый день.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: "MessageCircle", label: "ВКонтакте" },
                  { icon: "Send", label: "Telegram" },
                  { icon: "Instagram", label: "Instagram" },
                ].map(s => (
                  <a key={s.label} href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors" title={s.label}>
                    <Icon name={s.icon} size={18} fallback="Link" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white/90">Навигация</h4>
              <ul className="space-y-2 text-white/60">
                {navLinks.map(l => <li key={l.label}><a href={l.href} className="hover:text-white transition-colors">{l.label}</a></li>)}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white/90">Контакты</h4>
              <div className="space-y-2 text-white/60 text-sm">
                <div>📍 Московская обл., Сергиево-Посадский р-н</div>
                <div>📞 +7 (916) 123-45-67</div>
                <div>✉️ hello@alpakapark.ru</div>
                <div>🕙 10:00–19:00 · без выходных</div>
              </div>
              <a href="tel:+79161234567" className="mt-4 inline-flex items-center gap-2 bg-[#4a7c59] hover:bg-[#3d6a4a] text-white px-5 py-2 rounded-full text-sm font-bold transition-colors">
                <Icon name="PhoneCall" size={16} />
                Заказать звонок
              </a>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-white/40 text-sm">© 2024 АльпакаПарк. Все права защищены.</div>
            <div className="flex gap-4 text-white/40 text-sm">
              <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-white transition-colors">Правила посещения</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}