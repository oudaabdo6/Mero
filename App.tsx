import { useState, useEffect, useRef } from 'react';

// ==================== TYPES ====================
interface Car {
  id: string;
  name: string;
  brand: string;
  year: number;
  seats: number;
  luggage: number;
  fuel: string;
  transmission: string;
  pricePerDay: number;
  images: string[];
  popular: boolean;
  available: boolean;
  description: string;
}

interface Booking {
  id: string;
  carId: string;
  carName: string;
  customerName: string;
  phone: string;
  startDate: string;
  endDate: string;
  location: string;
  notes: string;
  totalPrice: number;
  days: number;
  createdAt: string;
}

interface AppSettings {
  whatsappNumber: string;
  adminCode: string;
  logoUrl: string;
  language: 'ar' | 'en';
}

// ==================== TRANSLATIONS ====================
const translations = {
  ar: {
    home: 'الرئيسية', cars: 'السيارات', about: 'من نحن', contact: 'اتصل بنا',
    admin: 'لوحة التحكم', language: 'English',
    heroTitle: 'استأجر سيارتك المثالية',
    heroSubtitle: 'نوفر لك أفضل السيارات بأسعار تنافسية مع خدمة عملاء متميزة على مدار الساعة',
    browseCars: 'تصفح السيارات', contactUs: 'اتصل بنا',
    availableCars: 'سيارة متوفرة', happyClients: 'عميل سعيد',
    support: 'دعم متواصل', yearsExperience: 'سنوات خبرة',
    ourFleet: 'أسطولنا',
    ourFleetSubtitle: 'اختر من بين مجموعة واسعة من السيارات الفاخرة والاقتصادية',
    popular: 'شائع', available: 'متوفر', unavailable: 'غير متوفر',
    seats: 'مقاعد', luggage: 'أمتعة', fuel: 'وقود',
    transmission: 'ناقل الحركة', pricePerDay: 'درهم/يوم',
    bookNow: 'احجز الآن', details: 'التفاصيل', perDay: '/ يوم', currency: 'درهم',
    carDetails: 'تفاصيل السيارة', specifications: 'المواصفات',
    gasoline: 'بنزين', diesel: 'ديزل', electric: 'كهربائية', hybrid: 'هجينة',
    manual: 'يدوي', automatic: 'أوتوماتيك',
    bookThisCar: 'احجز هذه السيارة', yourName: 'اسمك الكامل',
    yourPhone: 'رقم الهاتف', pickupDate: 'تاريخ الاستلام',
    returnDate: 'تاريخ الإرجاع', pickupLocation: 'مكان الاستلام',
    notes: 'ملاحظات إضافية', numberOfDays: 'عدد الأيام',
    totalPrice: 'السعر الإجمالي', sendWhatsApp: 'إرسال عبر واتساب',
    bookingSuccess: 'تم إرسال طلب الحجز بنجاح!',
    fillAllFields: 'يرجى ملء جميع الحقول المطلوبة',
    invalidDates: 'يرجى اختيار تواريخ صحيحة',
    whyChooseUs: 'لماذا تختارنا؟',
    bestPrices: 'أفضل الأسعار', bestPricesDesc: 'نقدم أسعاراً تنافسية مع ضمان الجودة',
    wideSelection: 'تشكيلة واسعة', wideSelectionDesc: 'أكثر من 50 سيارة من مختلف الفئات',
    support247: 'دعم 24/7', support247Desc: 'فريق دعم متاح على مدار الساعة',
    freeCancellation: 'إلغاء مجاني', freeCancellationDesc: 'إلغاء مجاني حتى 24 ساعة قبل الموعد',
    easyBooking: 'حجز سهل', easyBookingDesc: 'احجز في دقائق عبر واتساب أو الموقع',
    noHiddenFees: 'بدون رسوم خفية', noHiddenFeesDesc: 'السعر النهائي بدون تكاليف إضافية',
    getInTouch: 'تواصل معنا',
    getInTouchDesc: 'لا تتردد في الاتصال بنا لأي استفسار أو حجز',
    phone: 'الهاتف', email: 'البريد الإلكتروني', address: 'العنوان',
    whatsapp: 'واتساب', location: 'المغرب',
    allRights: 'جميع الحقوق محفوظة',
    adminLogin: 'تسجيل الدخول', enterCode: 'أدخل كود الدخول',
    login: 'دخول', wrongCode: 'كود الدخول غير صحيح', logout: 'تسجيل الخروج',
    carsManagement: 'إدارة السيارات', bookingsManagement: 'إدارة الحجوزات',
    settings: 'الإعدادات', addCar: 'إضافة سيارة', editCar: 'تعديل السيارة',
    deleteCar: 'حذف السيارة', deleteConfirm: 'هل أنت متأكد من حذف هذه السيارة؟',
    save: 'حفظ', cancel: 'إلغاء', carName: 'اسم السيارة', brand: 'العلامة التجارية',
    year: 'السنة', price: 'السعر اليومي', addImage: 'إضافة صورة',
    imageUrl: 'رابط الصورة', uploadImages: 'رفع صور',
    noBookings: 'لا توجد حجوزات حالياً', customerName: 'اسم العميل',
    bookingDate: 'تاريخ الحجز', whatsappNumber: 'رقم واتساب',
    adminAccessCode: 'كود دخول لوحة التحكم', logoUrl: 'رابط شعار الموقع',
    changeLogo: 'تغيير الشعار', preview: 'معاينة',
    saved: 'تم الحفظ بنجاح!', toggleAvailability: 'تغيير حالة التوفر',
    totalBookings: 'إجمالي الحجوزات', totalCars: 'إجمالي السيارات',
    availableCarsCount: 'السيارات المتوفرة',
    airport: 'المطار', trainStation: 'محطة القطار',
    cityCenter: 'مركز المدينة', hotel: 'الفندق',
    description: 'الوصف', close: 'إغلاق', dashboard: 'لوحة التحكم',
    overview: 'نظرة عامة', manageCars: 'إدارة السيارات',
    manageBookings: 'إدارة الحجوزات', siteSettings: 'إعدادات الموقع',
    currentCode: 'الكود الحالي', newCode: 'الكود الجديد',
    updateCode: 'تحديث الكود', updateLogo: 'تحديث الشعار',
    uploadLogo: 'رفع شعار', logoPreview: 'معاينة الشعار', remove: 'إزالة',
    day: 'يوم',
  },
  en: {
    home: 'Home', cars: 'Cars', about: 'About', contact: 'Contact',
    admin: 'Dashboard', language: 'عربي',
    heroTitle: 'Rent Your Perfect Car',
    heroSubtitle: 'We provide the best cars at competitive prices with 24/7 customer service',
    browseCars: 'Browse Cars', contactUs: 'Contact Us',
    availableCars: 'Available Cars', happyClients: 'Happy Clients',
    support: '24/7 Support', yearsExperience: 'Years Experience',
    ourFleet: 'Our Fleet',
    ourFleetSubtitle: 'Choose from a wide range of luxury and economy vehicles',
    popular: 'Popular', available: 'Available', unavailable: 'Unavailable',
    seats: 'Seats', luggage: 'Luggage', fuel: 'Fuel',
    transmission: 'Transmission', pricePerDay: 'MAD/day',
    bookNow: 'Book Now', details: 'Details', perDay: '/ day', currency: 'MAD',
    carDetails: 'Car Details', specifications: 'Specifications',
    gasoline: 'Gasoline', diesel: 'Diesel', electric: 'Electric', hybrid: 'Hybrid',
    manual: 'Manual', automatic: 'Automatic',
    bookThisCar: 'Book This Car', yourName: 'Your Full Name',
    yourPhone: 'Phone Number', pickupDate: 'Pickup Date',
    returnDate: 'Return Date', pickupLocation: 'Pickup Location',
    notes: 'Additional Notes', numberOfDays: 'Number of Days',
    totalPrice: 'Total Price', sendWhatsApp: 'Send via WhatsApp',
    bookingSuccess: 'Booking request sent successfully!',
    fillAllFields: 'Please fill in all required fields',
    invalidDates: 'Please select valid dates',
    whyChooseUs: 'Why Choose Us?',
    bestPrices: 'Best Prices', bestPricesDesc: 'Competitive prices with quality guarantee',
    wideSelection: 'Wide Selection', wideSelectionDesc: 'Over 50 cars from different categories',
    support247: '24/7 Support', support247Desc: 'Support team available around the clock',
    freeCancellation: 'Free Cancellation', freeCancellationDesc: 'Free cancellation up to 24 hours before',
    easyBooking: 'Easy Booking', easyBookingDesc: 'Book in minutes via WhatsApp or website',
    noHiddenFees: 'No Hidden Fees', noHiddenFeesDesc: 'Final price with no extra costs',
    getInTouch: 'Get In Touch',
    getInTouchDesc: "Don't hesitate to contact us for any inquiry or booking",
    phone: 'Phone', email: 'Email', address: 'Address',
    whatsapp: 'WhatsApp', location: 'Morocco',
    allRights: 'All Rights Reserved',
    adminLogin: 'Login', enterCode: 'Enter access code',
    login: 'Login', wrongCode: 'Incorrect access code', logout: 'Logout',
    carsManagement: 'Cars Management', bookingsManagement: 'Bookings Management',
    settings: 'Settings', addCar: 'Add Car', editCar: 'Edit Car',
    deleteCar: 'Delete Car', deleteConfirm: 'Are you sure you want to delete this car?',
    save: 'Save', cancel: 'Cancel', carName: 'Car Name', brand: 'Brand',
    year: 'Year', price: 'Daily Price', addImage: 'Add Image',
    imageUrl: 'Image URL', uploadImages: 'Upload Images',
    noBookings: 'No bookings yet', customerName: 'Customer Name',
    bookingDate: 'Booking Date', whatsappNumber: 'WhatsApp Number',
    adminAccessCode: 'Admin Access Code', logoUrl: 'Logo URL',
    changeLogo: 'Change Logo', preview: 'Preview',
    saved: 'Saved successfully!', toggleAvailability: 'Toggle Availability',
    totalBookings: 'Total Bookings', totalCars: 'Total Cars',
    availableCarsCount: 'Available Cars',
    airport: 'Airport', trainStation: 'Train Station',
    cityCenter: 'City Center', hotel: 'Hotel',
    description: 'Description', close: 'Close', dashboard: 'Dashboard',
    overview: 'Overview', manageCars: 'Manage Cars',
    manageBookings: 'Manage Bookings', siteSettings: 'Site Settings',
    currentCode: 'Current Code', newCode: 'New Code',
    updateCode: 'Update Code', updateLogo: 'Update Logo',
    uploadLogo: 'Upload Logo', logoPreview: 'Logo Preview', remove: 'Remove',
    day: 'day',
  }
};

type T = typeof translations.ar;

// ==================== DEFAULT DATA ====================
const defaultCars: Car[] = [
  {
    id: '1', name: 'Dacia Duster', brand: 'Dacia', year: 2024, seats: 5, luggage: 3,
    fuel: 'diesel', transmission: 'manual', pricePerDay: 400,
    images: [
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80',
    ],
    popular: true, available: true,
    description: 'سيارة دفع رباعي اقتصادية مثالية للمغامرات والرحلات العائلية',
  },
  {
    id: '2', name: 'Renault Clio', brand: 'Renault', year: 2023, seats: 5, luggage: 2,
    fuel: 'gasoline', transmission: 'manual', pricePerDay: 250,
    images: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
    ],
    popular: false, available: true,
    description: 'سيارة صغيرة أنيقة وموفرة للوقود مثالية للتنقل في المدينة',
  },
  {
    id: '3', name: 'Peugeot 3008', brand: 'Peugeot', year: 2024, seats: 5, luggage: 3,
    fuel: 'diesel', transmission: 'automatic', pricePerDay: 600,
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
      'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&q=80',
    ],
    popular: true, available: true,
    description: 'سيارة SUV أنيقة ومريحة مع أحدث تقنيات الأمان والترفيه',
  },
  {
    id: '4', name: 'Volkswagen Golf', brand: 'Volkswagen', year: 2023, seats: 5, luggage: 2,
    fuel: 'gasoline', transmission: 'automatic', pricePerDay: 350,
    images: [
      'https://images.unsplash.com/photo-1471444928139-48c5bf5173f8?w=800&q=80',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80',
    ],
    popular: false, available: true,
    description: 'سيارة عائلية عملية تجمع بين الأداء والراحة والاقتصاد',
  },
  {
    id: '5', name: 'Mercedes C-Class', brand: 'Mercedes-Benz', year: 2024, seats: 5, luggage: 3,
    fuel: 'diesel', transmission: 'automatic', pricePerDay: 800,
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80',
    ],
    popular: true, available: true,
    description: 'تجربة القيادة الفاخرة مع مستوى عالٍ من الراحة والتكنولوجيا',
  },
  {
    id: '6', name: 'BMW 5 Series', brand: 'BMW', year: 2024, seats: 5, luggage: 3,
    fuel: 'diesel', transmission: 'automatic', pricePerDay: 900,
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=800&q=80',
    ],
    popular: false, available: true,
    description: 'سيارة سيدان فاخرة تجمع بين الأداء الرياضي والأناقة المطلقة',
  },
];

const defaultSettings: AppSettings = {
  whatsappNumber: '212600000000',
  adminCode: 'LP2024',
  logoUrl: '',
  language: 'ar',
};

// ==================== UTILITIES ====================
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function loadState<T>(key: string, defaultValue: T): T {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function saveState(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch { /* ignore */ }
}

function calcDays(start: string, end: string): number {
  if (!start || !end) return 0;
  const d1 = new Date(start);
  const d2 = new Date(end);
  const diff = d2.getTime() - d1.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days > 0 ? days : 0;
}

const PLACEHOLDER_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23374151'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='40'%3E🚗%3C/text%3E%3C/svg%3E";

// ==================== COMPONENTS ====================

function LogoComp({ logoUrl, className = 'h-10' }: { logoUrl: string; className?: string }) {
  if (logoUrl) {
    return <img src={logoUrl} alt="Logo" className={`animate-pulseLogo object-contain ${className}`} />;
  }
  return (
    <div className={`flex items-center gap-2 animate-pulseLogo ${className}`}>
      <span className="text-3xl">🚗</span>
      <span className="text-2xl font-extrabold text-gradient">DriveX</span>
    </div>
  );
}

function Notification({ message, onClose }: { message: string; onClose: () => void }) {
  if (!message) return null;
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] animate-slideDown">
      <div className="bg-green-600 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3">
        <span>✅</span>
        <span className="font-semibold">{message}</span>
        <button onClick={onClose} className="hover:bg-green-700 rounded-full w-6 h-6 flex items-center justify-center text-sm">✕</button>
      </div>
    </div>
  );
}

function ImageViewer3D({ images, alt }: { images: string[]; alt: string }) {
  const [idx, setIdx] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isDrag, setIsDrag] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartR, setDragStartR] = useState(0);
  const [rotY, setRotY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (images.length <= 1) return;
    const t = setInterval(() => setIdx(p => (p + 1) % images.length), 4000);
    return () => clearInterval(t);
  }, [images.length]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    if (isDrag) {
      setRotY(dragStartR + (e.clientX - dragStartX) * 0.3);
    } else {
      const r = ref.current.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      setTilt({ x: (y - 0.5) * -12, y: (x - 0.5) * 12 });
    }
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDrag(true);
    setDragStartX(e.clientX);
    setDragStartR(rotY);
  };

  const onMouseUp = () => setIsDrag(false);
  const onMouseLeave = () => { setTilt({ x: 0, y: 0 }); setIsDrag(false); };

  const onTouchStart = (e: React.TouchEvent) => {
    setIsDrag(true);
    setDragStartX(e.touches[0].clientX);
    setDragStartR(rotY);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDrag) return;
    setRotY(dragStartR + (e.touches[0].clientX - dragStartX) * 0.3);
  };
  const onTouchEnd = () => setIsDrag(false);

  return (
    <div ref={ref} className="relative overflow-hidden rounded-2xl select-none cursor-grab active:cursor-grabbing group"
      style={{ perspective: '1200px' }}
      onMouseMove={onMouseMove} onMouseDown={onMouseDown}
      onMouseUp={onMouseUp} onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      <div style={{
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y + rotY}deg)`,
        transition: isDrag ? 'none' : 'transform 0.15s ease-out',
        transformStyle: 'preserve-3d',
      }}>
        <img src={images[idx] || PLACEHOLDER_IMG} alt={alt}
          className="w-full h-72 md:h-96 object-cover rounded-2xl"
          onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER_IMG; }} />
      </div>
      {images.length > 1 && (
        <>
          <button onClick={(e) => { e.stopPropagation(); setIdx(p => (p - 1 + images.length) % images.length); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-red-600/80 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 text-xl font-bold">‹</button>
          <button onClick={(e) => { e.stopPropagation(); setIdx(p => (p + 1) % images.length); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-red-600/80 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 text-xl font-bold">›</button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button key={i} onClick={(e) => { e.stopPropagation(); setIdx(i); }}
                className={`w-3 h-3 rounded-full transition-all ${i === idx ? 'bg-red-500 scale-125' : 'bg-white/60 hover:bg-white'}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function Modal({ children, onClose, wide }: { children: React.ReactNode; onClose: () => void; wide?: boolean }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className={`relative bg-white rounded-2xl shadow-2xl w-full ${wide ? 'max-w-4xl' : 'max-w-lg'} max-h-[90vh] overflow-y-auto animate-scaleIn`}
        onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 w-9 h-9 rounded-full flex items-center justify-center transition-all text-lg font-bold">✕</button>
        {children}
      </div>
    </div>
  );
}

// ==================== MAIN APP ====================
export default function App() {
  const [settings, setSettings] = useState<AppSettings>(() => loadState('drivex_settings', defaultSettings));
  const [cars, setCars] = useState<Car[]>(() => loadState('drivex_cars', defaultCars));
  const [bookings, setBookings] = useState<Booking[]>(() => loadState('drivex_bookings', []));
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminInput, setAdminInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [bookingCar, setBookingCar] = useState<Car | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [adminTab, setAdminTab] = useState<'cars' | 'bookings' | 'settings'>('cars');
  const [showCarForm, setShowCarForm] = useState(false);
  const [editCar, setEditCar] = useState<Car | null>(null);
  const [notification, setNotification] = useState('');
  const [navbarSolid, setNavbarSolid] = useState(false);

  const lang = settings.language;
  const t = translations[lang];
  const isRTL = lang === 'ar';

  // Persist
  useEffect(() => { saveState('drivex_cars', cars); }, [cars]);
  useEffect(() => { saveState('drivex_bookings', bookings); }, [bookings]);
  useEffect(() => { saveState('drivex_settings', settings); }, [settings]);

  // Direction & Font
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.body.style.fontFamily = isRTL ? "'Cairo', sans-serif" : "'Inter', 'Cairo', sans-serif";
  }, [lang, isRTL]);

  // Scroll navbar
  useEffect(() => {
    const onScroll = () => setNavbarSolid(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const notify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const toggleLang = () => {
    setSettings(p => ({ ...p, language: p.language === 'ar' ? 'en' : 'ar' }));
  };

  const handleAdminLogin = () => {
    if (adminInput === settings.adminCode) {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setAdminInput('');
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleDeleteCar = (id: string) => {
    if (window.confirm(t.deleteConfirm)) {
      setCars(p => p.filter(c => c.id !== id));
      notify(t.saved);
    }
  };

  const handleToggleAvailability = (id: string) => {
    setCars(p => p.map(c => c.id === id ? { ...c, available: !c.available } : c));
    notify(t.saved);
  };

  const handleBookingSubmit = (data: { name: string; phone: string; startDate: string; endDate: string; location: string; notes: string }) => {
    if (!data.name || !data.phone || !data.startDate || !data.endDate || !data.location) {
      notify(t.fillAllFields);
      return;
    }
    const days = calcDays(data.startDate, data.endDate);
    if (days <= 0) { notify(t.invalidDates); return; }
    const car = bookingCar;
    if (!car) return;
    const total = days * car.pricePerDay;

    const booking: Booking = {
      id: generateId(), carId: car.id, carName: car.name,
      customerName: data.name, phone: data.phone,
      startDate: data.startDate, endDate: data.endDate,
      location: data.location, notes: data.notes,
      totalPrice: total, days, createdAt: new Date().toISOString(),
    };
    setBookings(p => [...p, booking]);

    const msg = isRTL
      ? `🚗 *طلب حجز سيارة*\n\n📋 *معلومات السيارة:*\nالسيارة: ${car.name}\nالسعر اليومي: ${car.pricePerDay} درهم\n\n👤 *معلومات العميل:*\nالاسم: ${data.name}\nالهاتف: ${data.phone}\n\n📅 *تفاصيل الحجز:*\nتاريخ الاستلام: ${data.startDate}\nتاريخ الإرجاع: ${data.endDate}\nمكان الاستلام: ${data.location}\nعدد الأيام: ${days}\nالسعر الإجمالي: ${total} درهم\n\n📝 *ملاحظات:*\n${data.notes || 'لا توجد'}`
      : `🚗 *Car Rental Booking*\n\n📋 *Car Info:*\nCar: ${car.name}\nDaily Price: ${car.pricePerDay} MAD\n\n👤 *Customer Info:*\nName: ${data.name}\nPhone: ${data.phone}\n\n📅 *Booking Details:*\nPickup: ${data.startDate}\nReturn: ${data.endDate}\nLocation: ${data.location}\nDays: ${days}\nTotal: ${total} MAD\n\n📝 *Notes:*\n${data.notes || 'None'}`;

    window.open(`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    setBookingCar(null);
    notify(t.bookingSuccess);
  };

  const updateSettings = (updates: Partial<AppSettings>) => {
    setSettings(p => ({ ...p, ...updates }));
    notify(t.saved);
  };

  // ==================== RENDER ====================
  return (
    <div className={`min-h-screen ${isRTL ? 'font-ar' : 'font-en'}`} style={{ fontFamily: isRTL ? "'Cairo', sans-serif" : "'Inter', sans-serif" }}>
      <Notification message={notification} onClose={() => setNotification('')} />

      {/* ===== NAVBAR ===== */}
      {!isAdmin && (
        <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${navbarSolid ? 'glass-dark shadow-xl' : 'bg-transparent'}`}>
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex items-center justify-between h-16 md:h-20">
              <div className="cursor-pointer" onClick={() => scrollTo('home')}>
                <LogoComp logoUrl={settings.logoUrl} />
              </div>
              <div className="hidden md:flex items-center gap-8">
                {[{ key: 'home', label: t.home }, { key: 'cars', label: t.cars }, { key: 'about', label: t.about }, { key: 'contact', label: t.contact }].map(item => (
                  <button key={item.key} onClick={() => scrollTo(item.key)}
                    className="text-white/80 hover:text-red-400 transition-colors font-medium text-sm tracking-wide">{item.label}</button>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <button onClick={toggleLang}
                  className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-sm font-semibold transition-all border border-white/10">
                  🌐 {t.language}
                </button>
                <button onClick={() => setShowAdminLogin(true)}
                  className="bg-red-600/80 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold transition-all">
                  ⚙️
                </button>
                <button onClick={() => setMobileOpen(!mobileOpen)}
                  className="md:hidden text-white text-2xl">☰</button>
              </div>
            </div>
          </div>
          {mobileOpen && (
            <div className="md:hidden bg-gray-900/95 backdrop-blur-lg border-t border-white/10 animate-slideDown">
              <div className="container mx-auto px-6 py-4 flex flex-col gap-3">
                {[{ key: 'home', label: t.home }, { key: 'cars', label: t.cars }, { key: 'about', label: t.about }, { key: 'contact', label: t.contact }].map(item => (
                  <button key={item.key} onClick={() => scrollTo(item.key)}
                    className="text-white/80 hover:text-red-400 py-2 text-start font-medium">{item.label}</button>
                ))}
                <button onClick={() => { setShowAdminLogin(true); setMobileOpen(false); }}
                  className="text-red-400 hover:text-red-300 py-2 text-start font-medium">⚙️ {t.admin}</button>
              </div>
            </div>
          )}
        </nav>
      )}

      {isAdmin ? (
        // ===== ADMIN DASHBOARD =====
        <AdminDashboard
          t={t} lang={lang} cars={cars} bookings={bookings} settings={settings}
          adminTab={adminTab} setAdminTab={setAdminTab}
          onDeleteCar={handleDeleteCar} onToggleAvail={handleToggleAvailability}
          onEditCar={(car) => { setEditCar(car); setShowCarForm(true); }}
          onAddCar={() => { setEditCar(null); setShowCarForm(true); }}
          onUpdateSettings={updateSettings}
          onLogout={() => setIsAdmin(false)}
        />
      ) : (
        // ===== MAIN SITE =====
        <>
          {/* HERO */}
          <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-hero-pattern overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-20 left-10 w-72 h-72 bg-red-600/10 rounded-full blur-3xl animate-float" />
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-800/10 rounded-full blur-3xl animate-float delay-500" />
            </div>
            <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
              <div className="animate-fadeUp">
                <div className="flex justify-center mb-8">
                  <LogoComp logoUrl={settings.logoUrl} className="h-20" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 animate-fadeUp delay-200 leading-tight">
                {t.heroTitle.split(' ').map((word, i) => (
                  <span key={i} className={i === t.heroTitle.split(' ').length - 1 ? 'text-gradient' : ''}>{word} </span>
                ))}
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto animate-fadeUp delay-400 leading-relaxed">
                {t.heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeUp delay-600">
                <button onClick={() => scrollTo('cars')} className="btn-primary text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-red-600/30">
                  🚗 {t.browseCars}
                </button>
                <button onClick={() => scrollTo('contact')} className="border-2 border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all">
                  📞 {t.contactUs}
                </button>
              </div>
            </div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
              <button onClick={() => scrollTo('cars')} className="text-white/50 hover:text-white transition-colors text-3xl">↓</button>
            </div>
          </section>

          {/* STATS */}
          <section className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 py-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%221%22%20cy%3D%221%22%20r%3D%221%22%20fill%3D%22rgba(255%2C255%2C255%2C0.05)%22%2F%3E%3C%2Fsvg%3E')] opacity-50" />
            <div className="container mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center relative z-10">
              {[
                { val: '50+', label: t.availableCars },
                { val: '1000+', label: t.happyClients },
                { val: '24/7', label: t.support },
                { val: '15+', label: t.yearsExperience },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl md:text-4xl font-extrabold mb-1">{stat.val}</div>
                  <div className="text-red-100 text-sm md:text-base font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* CARS */}
          <section id="cars" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 md:px-8">
              <div className="text-center mb-14">
                <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
                  🚗 <span className="text-gradient">{t.ourFleet}</span>
                </h2>
                <p className="text-gray-500 text-lg max-w-xl mx-auto">{t.ourFleetSubtitle}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cars.map((car, i) => (
                  <CarCard key={car.id} car={car} t={t}
                    onView={() => setSelectedCar(car)}
                    onBook={() => setBookingCar(car)}
                    delay={i * 100} />
                ))}
              </div>
            </div>
          </section>

          {/* WHY CHOOSE US */}
          <section id="about" className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-8">
              <div className="text-center mb-14">
                <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
                  ⭐ <span className="text-gradient">{t.whyChooseUs}</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { icon: '💰', title: t.bestPrices, desc: t.bestPricesDesc },
                  { icon: '🚙', title: t.wideSelection, desc: t.wideSelectionDesc },
                  { icon: '📞', title: t.support247, desc: t.support247Desc },
                  { icon: '✅', title: t.freeCancellation, desc: t.freeCancellationDesc },
                  { icon: '📱', title: t.easyBooking, desc: t.easyBookingDesc },
                  { icon: '🔒', title: t.noHiddenFees, desc: t.noHiddenFeesDesc },
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 rounded-2xl p-8 card-hover border border-gray-100">
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <div className="container mx-auto px-4 md:px-8">
              <div className="text-center mb-14">
                <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
                  📬 <span className="text-gradient">{t.getInTouch}</span>
                </h2>
                <p className="text-gray-400 text-lg max-w-xl mx-auto">{t.getInTouchDesc}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {[
                  { icon: '📞', label: t.phone, value: `+${settings.whatsappNumber}` },
                  { icon: '📧', label: t.email, value: 'info@drivex.ma' },
                  { icon: '📍', label: t.address, value: t.location },
                  { icon: '💬', label: t.whatsapp, value: t.contactUs },
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 rounded-2xl p-6 text-center card-hover border border-white/5 hover:border-red-500/30">
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <div className="text-sm text-gray-400 mb-1">{item.label}</div>
                    <div className="font-semibold">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="bg-gray-950 text-gray-400 py-10">
            <div className="container mx-auto px-4 md:px-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <LogoComp logoUrl={settings.logoUrl} className="h-8" />
                </div>
                <p className="text-sm">© {new Date().getFullYear()} DriveX. {t.allRights}.</p>
                <div className="flex gap-4">
                  <a href={`https://wa.me/${settings.whatsappNumber}`} target="_blank" rel="noopener noreferrer"
                    className="hover:text-green-400 transition-colors text-xl">💬</a>
                  <a href="#" className="hover:text-blue-400 transition-colors text-xl">📘</a>
                  <a href="#" className="hover:text-pink-400 transition-colors text-xl">📸</a>
                </div>
              </div>
            </div>
          </footer>
        </>
      )}

      {/* ===== MODALS ===== */}

      {/* Admin Login */}
      {showAdminLogin && (
        <Modal onClose={() => { setShowAdminLogin(false); setLoginError(false); }}>
          <div className="p-8 text-center">
            <div className="text-5xl mb-4">🔐</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.adminLogin}</h2>
            <p className="text-gray-500 mb-6">{t.enterCode}</p>
            <input type="password" value={adminInput} onChange={(e) => { setAdminInput(e.target.value); setLoginError(false); }}
              onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-center text-lg font-mono tracking-widest focus:border-red-500 transition-colors"
              placeholder="••••••" maxLength={20} />
            {loginError && <p className="text-red-500 mt-2 text-sm font-medium">❌ {t.wrongCode}</p>}
            <button onClick={handleAdminLogin}
              className="btn-primary w-full text-white py-3 rounded-xl font-bold mt-4 text-lg">
              {t.login}
            </button>
          </div>
        </Modal>
      )}

      {/* Car Detail */}
      {selectedCar && (
        <Modal onClose={() => setSelectedCar(null)} wide>
          <div className="md:flex">
            <div className="md:w-1/2 p-4">
              <ImageViewer3D images={selectedCar.images} alt={selectedCar.name} />
            </div>
            <div className="md:w-1/2 p-6 md:p-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedCar.popular && (
                  <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">⭐ {t.popular}</span>
                )}
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${selectedCar.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {selectedCar.available ? `✅ ${t.available}` : `❌ ${t.unavailable}`}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-1">{selectedCar.name}</h2>
              <p className="text-gray-500 mb-4">{selectedCar.brand} • {selectedCar.year}</p>
              <p className="text-gray-600 mb-6 leading-relaxed">{selectedCar.description}</p>
              <h3 className="font-bold text-gray-800 mb-3">{t.specifications}</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { icon: '👥', label: t.seats, val: selectedCar.seats },
                  { icon: '🧳', label: t.luggage, val: selectedCar.luggage },
                  { icon: '⛽', label: t.fuel, val: (t as Record<string, string>)[selectedCar.fuel] || selectedCar.fuel },
                  { icon: '⚙️', label: t.transmission, val: (t as Record<string, string>)[selectedCar.transmission] || selectedCar.transmission },
                ].map((spec, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-3 flex items-center gap-2">
                    <span className="text-lg">{spec.icon}</span>
                    <div>
                      <div className="text-xs text-gray-400">{spec.label}</div>
                      <div className="font-semibold text-gray-800 text-sm">{spec.val}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-red-50 rounded-xl p-4 flex items-center justify-between mb-6">
                <div>
                  <div className="text-sm text-gray-500">{t.pricePerDay}</div>
                  <div className="text-3xl font-extrabold text-red-600">{selectedCar.pricePerDay} <span className="text-lg">{t.currency}</span></div>
                </div>
              </div>
              {selectedCar.available && (
                <button onClick={() => { setBookingCar(selectedCar); setSelectedCar(null); }}
                  className="btn-primary w-full text-white py-4 rounded-xl font-bold text-lg">
                  🚗 {t.bookThisCar}
                </button>
              )}
            </div>
          </div>
        </Modal>
      )}

      {/* Booking */}
      {bookingCar && (
        <BookingModal car={bookingCar} t={t}
          onClose={() => setBookingCar(null)} onSubmit={handleBookingSubmit} />
      )}

      {/* Car Form (Add/Edit) */}
      {showCarForm && (
        <CarFormModal t={t} editCar={editCar}
          onClose={() => { setShowCarForm(false); setEditCar(null); }}
          onSave={(carData) => {
            if (editCar) {
              setCars(p => p.map(c => c.id === editCar.id ? { ...carData, id: editCar.id } : c));
            } else {
              setCars(p => [...p, { ...carData, id: generateId() }]);
            }
            setShowCarForm(false);
            setEditCar(null);
            notify(t.saved);
          }} />
      )}
    </div>
  );
}

// ==================== CAR CARD ====================
function CarCard({ car, t, onView, onBook, delay }: {
  car: Car; t: T; onView: () => void; onBook: () => void; delay: number;
}) {
  const [imgIdx, setImgIdx] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!hovered || car.images.length <= 1) return;
    const timer = setInterval(() => setImgIdx(p => (p + 1) % car.images.length), 2000);
    return () => clearInterval(timer);
  }, [hovered, car.images.length]);

  return (
    <div className="bg-white rounded-2xl overflow-hidden card-hover border border-gray-100 shadow-sm"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => { setHovered(false); setImgIdx(0); }}
      style={{ animationDelay: `${delay}ms` }}>
      <div className="relative overflow-hidden h-56">
        <img src={car.images[imgIdx] || PLACEHOLDER_IMG} alt={car.name}
          className="w-full h-full object-cover img-zoom"
          onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER_IMG; }} />
        {car.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {car.images.map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === imgIdx ? 'bg-red-500 w-4' : 'bg-white/60'}`} />
            ))}
          </div>
        )}
        {car.popular && (
          <span className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            ⭐ {t.popular}
          </span>
        )}
        <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
          car.available ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          {car.available ? '✅' : '❌'}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{car.name}</h3>
            <p className="text-gray-400 text-sm">{car.brand} • {car.year}</p>
          </div>
          <div className="text-end">
            <div className="text-xl font-extrabold text-red-600">{car.pricePerDay}</div>
            <div className="text-xs text-gray-400">{t.pricePerDay}</div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[
            { icon: '👥', val: car.seats },
            { icon: '🧳', val: car.luggage },
            { icon: '⛽', val: (t as Record<string, string>)[car.fuel] || car.fuel },
            { icon: '⚙️', val: (t as Record<string, string>)[car.transmission] || car.transmission },
          ].map((spec, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-2 text-center">
              <div className="text-xs">{spec.icon}</div>
              <div className="text-xs font-semibold text-gray-700 mt-0.5">{spec.val}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={onView} className="flex-1 border-2 border-gray-200 hover:border-red-300 text-gray-700 hover:text-red-600 py-2.5 rounded-xl font-semibold text-sm transition-all">
            {t.details}
          </button>
          {car.available && (
            <button onClick={onBook} className="flex-1 btn-primary text-white py-2.5 rounded-xl font-semibold text-sm">
              {t.bookNow}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ==================== BOOKING MODAL ====================
function BookingModal({ car, t, onClose, onSubmit }: {
  car: Car; t: T; onClose: () => void;
  onSubmit: (data: { name: string; phone: string; startDate: string; endDate: string; location: string; notes: string }) => void;
}) {
  const [form, setForm] = useState({ name: '', phone: '', startDate: '', endDate: '', location: '', notes: '' });
  const days = calcDays(form.startDate, form.endDate);
  const total = days * car.pricePerDay;

  const today = new Date().toISOString().split('T')[0];

  return (
    <Modal onClose={onClose}>
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <img src={car.images[0] || PLACEHOLDER_IMG} alt={car.name} className="w-16 h-16 rounded-xl object-cover" />
          <div>
            <h2 className="text-xl font-bold text-gray-900">{t.bookThisCar}</h2>
            <p className="text-gray-500 text-sm">{car.name} • {car.pricePerDay} {t.currency}{t.perDay}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.yourName} *</label>
            <input type="text" value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 transition-colors bg-gray-50 focus:bg-white" placeholder={t.yourName} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.yourPhone} *</label>
            <input type="tel" value={form.phone} onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 transition-colors bg-gray-50 focus:bg-white" placeholder="+212 6XX XXX XXX" dir="ltr" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{t.pickupDate} *</label>
              <input type="date" value={form.startDate} min={today}
                onChange={(e) => setForm(p => ({ ...p, startDate: e.target.value }))}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 transition-colors bg-gray-50 focus:bg-white" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{t.returnDate} *</label>
              <input type="date" value={form.endDate} min={form.startDate || today}
                onChange={(e) => setForm(p => ({ ...p, endDate: e.target.value }))}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 transition-colors bg-gray-50 focus:bg-white" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.pickupLocation} *</label>
            <select value={form.location} onChange={(e) => setForm(p => ({ ...p, location: e.target.value }))}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 transition-colors bg-gray-50 focus:bg-white">
              <option value="">{t.pickupLocation}</option>
              <option value={t.airport}>✈️ {t.airport}</option>
              <option value={t.trainStation}>🚉 {t.trainStation}</option>
              <option value={t.cityCenter}>🏙️ {t.cityCenter}</option>
              <option value={t.hotel}>🏨 {t.hotel}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.notes}</label>
            <textarea value={form.notes} onChange={(e) => setForm(p => ({ ...p, notes: e.target.value }))}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 transition-colors bg-gray-50 focus:bg-white h-20 resize-none" placeholder={t.notes} />
          </div>
        </div>

        {days > 0 && (
          <div className="bg-red-50 rounded-xl p-4 mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">{t.numberOfDays}</span>
              <span className="font-bold text-gray-900">{days} {t.day}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{t.totalPrice}</span>
              <span className="text-2xl font-extrabold text-red-600">{total} {t.currency}</span>
            </div>
          </div>
        )}

        <button onClick={() => onSubmit(form)}
          className="btn-primary w-full text-white py-4 rounded-xl font-bold text-lg mt-6 flex items-center justify-center gap-2">
          💬 {t.sendWhatsApp}
        </button>
      </div>
    </Modal>
  );
}

// ==================== CAR FORM MODAL ====================
function CarFormModal({ t, editCar, onClose, onSave }: {
  t: T; editCar: Car | null; onClose: () => void; onSave: (car: Car) => void;
}) {
  const [form, setForm] = useState({
    name: editCar?.name || '', brand: editCar?.brand || '',
    year: editCar?.year?.toString() || '2024', seats: editCar?.seats?.toString() || '5',
    luggage: editCar?.luggage?.toString() || '2', fuel: editCar?.fuel || 'gasoline',
    transmission: editCar?.transmission || 'manual', pricePerDay: editCar?.pricePerDay?.toString() || '0',
    images: editCar?.images || [] as string[], popular: editCar?.popular || false,
    available: editCar?.available !== undefined ? editCar.available : true,
    description: editCar?.description || '',
  });
  const [newImgUrl, setNewImgUrl] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        setForm(p => ({ ...p, images: [...p.images, reader.result as string] }));
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const handleSave = () => {
    const car: Car = {
      id: editCar?.id || '', name: form.name, brand: form.brand,
      year: parseInt(form.year) || 2024, seats: parseInt(form.seats) || 5,
      luggage: parseInt(form.luggage) || 2, fuel: form.fuel,
      transmission: form.transmission, pricePerDay: parseInt(form.pricePerDay) || 0,
      images: form.images.filter(Boolean), popular: form.popular,
      available: form.available, description: form.description,
    };
    onSave(car);
  };

  const inputClass = "w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 transition-colors bg-gray-50 focus:bg-white text-sm";

  return (
    <Modal onClose={onClose} wide>
      <div className="p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {editCar ? `✏️ ${t.editCar}` : `➕ ${t.addCar}`}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.carName} *</label>
            <input type="text" value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
              className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.brand} *</label>
            <input type="text" value={form.brand} onChange={(e) => setForm(p => ({ ...p, brand: e.target.value }))}
              className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.year}</label>
            <input type="number" value={form.year} onChange={(e) => setForm(p => ({ ...p, year: e.target.value }))}
              className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.price} *</label>
            <input type="number" value={form.pricePerDay} onChange={(e) => setForm(p => ({ ...p, pricePerDay: e.target.value }))}
              className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.seats}</label>
            <input type="number" value={form.seats} onChange={(e) => setForm(p => ({ ...p, seats: e.target.value }))}
              className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.luggage}</label>
            <input type="number" value={form.luggage} onChange={(e) => setForm(p => ({ ...p, luggage: e.target.value }))}
              className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.fuel}</label>
            <select value={form.fuel} onChange={(e) => setForm(p => ({ ...p, fuel: e.target.value }))}
              className={inputClass}>
              <option value="gasoline">{t.gasoline}</option>
              <option value="diesel">{t.diesel}</option>
              <option value="electric">{t.electric}</option>
              <option value="hybrid">{t.hybrid}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.transmission}</label>
            <select value={form.transmission} onChange={(e) => setForm(p => ({ ...p, transmission: e.target.value }))}
              className={inputClass}>
              <option value="manual">{t.manual}</option>
              <option value="automatic">{t.automatic}</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.description}</label>
            <textarea value={form.description} onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))}
              className={`${inputClass} h-20 resize-none`} />
          </div>
          <div className="flex items-center gap-6 md:col-span-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.popular} onChange={(e) => setForm(p => ({ ...p, popular: e.target.checked }))}
                className="w-5 h-5 rounded accent-amber-500" />
              <span className="text-sm font-semibold text-gray-700">⭐ {t.popular}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.available} onChange={(e) => setForm(p => ({ ...p, available: e.target.checked }))}
                className="w-5 h-5 rounded accent-green-500" />
              <span className="text-sm font-semibold text-gray-700">✅ {t.available}</span>
            </label>
          </div>
        </div>

        {/* Images */}
        <div className="mt-6">
          <h3 className="font-bold text-gray-800 mb-3">🖼️ {t.uploadImages}</h3>
          <div className="flex flex-wrap gap-3 mb-4">
            {form.images.map((img, i) => (
              <div key={i} className="relative group">
                <img src={img} alt="" className="w-24 h-24 object-cover rounded-xl border-2 border-gray-200" />
                <button onClick={() => setForm(p => ({ ...p, images: p.images.filter((_, j) => j !== i) }))}
                  className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mb-3">
            <input type="url" value={newImgUrl} onChange={(e) => setNewImgUrl(e.target.value)}
              className={`${inputClass} flex-1`} placeholder={t.imageUrl}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && newImgUrl.trim()) {
                  setForm(p => ({ ...p, images: [...p.images, newImgUrl.trim()] }));
                  setNewImgUrl('');
                }
              }} />
            <button onClick={() => {
              if (newImgUrl.trim()) {
                setForm(p => ({ ...p, images: [...p.images, newImgUrl.trim()] }));
                setNewImgUrl('');
              }
            }} className="bg-gray-800 text-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-gray-700 transition-colors whitespace-nowrap">
              ➕ {t.addImage}
            </button>
          </div>
          <label className="inline-flex items-center gap-2 cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-700 transition-colors">
            📤 {t.uploadImages}
            <input type="file" accept="image/*" multiple onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        <div className="flex gap-3 mt-8">
          <button onClick={handleSave}
            className="btn-primary flex-1 text-white py-3 rounded-xl font-bold text-lg">
            💾 {t.save}
          </button>
          <button onClick={onClose}
            className="flex-1 border-2 border-gray-200 text-gray-600 py-3 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors">
            {t.cancel}
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ==================== ADMIN DASHBOARD ====================
function AdminDashboard({ t, lang, cars, bookings, settings, adminTab, setAdminTab,
  onDeleteCar, onToggleAvail, onEditCar, onAddCar, onUpdateSettings, onLogout }: {
  t: T; lang: string; cars: Car[]; bookings: Booking[]; settings: AppSettings;
  adminTab: 'cars' | 'bookings' | 'settings';
  setAdminTab: (tab: 'cars' | 'bookings' | 'settings') => void;
  onDeleteCar: (id: string) => void;
  onToggleAvail: (id: string) => void;
  onEditCar: (car: Car) => void;
  onAddCar: () => void;
  onUpdateSettings: (updates: Partial<AppSettings>) => void;
  onLogout: () => void;
}) {
  const [settingsForm, setSettingsForm] = useState({
    whatsappNumber: settings.whatsappNumber,
    adminCode: settings.adminCode,
    logoUrl: settings.logoUrl,
  });

  const tabs = [
    { key: 'cars' as const, label: `🚗 ${t.carsManagement}`, icon: '🚗' },
    { key: 'bookings' as const, label: `📋 ${t.bookingsManagement}`, icon: '📋' },
    { key: 'settings' as const, label: `⚙️ ${t.siteSettings}`, icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white shadow-xl">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <LogoComp logoUrl={settings.logoUrl} className="h-8" />
              <span className="font-bold text-lg hidden sm:inline">{t.dashboard}</span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => onUpdateSettings({ language: lang === 'ar' ? 'en' : 'ar' })}
                className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all">
                🌐 {lang === 'ar' ? 'English' : 'عربي'}
              </button>
              <button onClick={onLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all">
                🚪 {t.logout}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="container mx-auto px-4 md:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {[
            { label: t.totalCars, value: cars.length, icon: '🚗', color: 'from-blue-500 to-blue-700' },
            { label: t.availableCarsCount, value: cars.filter(c => c.available).length, icon: '✅', color: 'from-green-500 to-green-700' },
            { label: t.totalBookings, value: bookings.length, icon: '📋', color: 'from-red-500 to-red-700' },
          ].map((stat, i) => (
            <div key={i} className={`bg-gradient-to-r ${stat.color} rounded-2xl p-5 text-white shadow-lg`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-extrabold">{stat.value}</div>
                  <div className="text-sm opacity-80 font-medium">{stat.label}</div>
                </div>
                <span className="text-4xl opacity-50">{stat.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => setAdminTab(tab.key)}
              className={`px-5 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
                adminTab === tab.key
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                  : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm'
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {adminTab === 'cars' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">🚗 {t.carsManagement}</h3>
                <button onClick={onAddCar}
                  className="btn-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm">
                  ➕ {t.addCar}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cars.map(car => (
                  <div key={car.id} className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-red-200 transition-colors">
                    <div className="flex gap-3 mb-3">
                      <img src={car.images[0] || PLACEHOLDER_IMG} alt={car.name}
                        className="w-20 h-16 rounded-lg object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER_IMG; }} />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 truncate">{car.name}</h4>
                        <p className="text-gray-400 text-xs">{car.brand} • {car.year}</p>
                        <p className="text-red-600 font-bold text-sm">{car.pricePerDay} {t.currency}{t.perDay}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        car.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {car.available ? `✅ ${t.available}` : `❌ ${t.unavailable}`}
                      </span>
                      {car.popular && <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700">⭐</span>}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => onToggleAvail(car.id)}
                        className="flex-1 text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold transition-colors">
                        {t.toggleAvailability}
                      </button>
                      <button onClick={() => onEditCar(car)}
                        className="flex-1 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 rounded-lg font-semibold transition-colors">
                        ✏️ {t.editCar}
                      </button>
                      <button onClick={() => onDeleteCar(car.id)}
                        className="text-xs bg-red-100 hover:bg-red-200 text-red-700 py-2 px-3 rounded-lg font-semibold transition-colors">
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {cars.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <div className="text-5xl mb-3">🚗</div>
                  <p className="font-semibold">{t.noBookings}</p>
                </div>
              )}
            </div>
          )}

          {adminTab === 'bookings' && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">📋 {t.bookingsManagement}</h3>
              {bookings.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <div className="text-5xl mb-3">📋</div>
                  <p className="font-semibold">{t.noBookings}</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-start p-3 font-bold text-gray-700">{t.customerName}</th>
                        <th className="text-start p-3 font-bold text-gray-700">🚗</th>
                        <th className="text-start p-3 font-bold text-gray-700">{t.yourPhone}</th>
                        <th className="text-start p-3 font-bold text-gray-700">{t.pickupDate}</th>
                        <th className="text-start p-3 font-bold text-gray-700">{t.returnDate}</th>
                        <th className="text-start p-3 font-bold text-gray-700">{t.pickupLocation}</th>
                        <th className="text-start p-3 font-bold text-gray-700">{t.numberOfDays}</th>
                        <th className="text-start p-3 font-bold text-gray-700">{t.totalPrice}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map(b => (
                        <tr key={b.id} className="border-t border-gray-100 hover:bg-gray-50">
                          <td className="p-3 font-semibold">{b.customerName}</td>
                          <td className="p-3">{b.carName}</td>
                          <td className="p-3" dir="ltr">{b.phone}</td>
                          <td className="p-3">{b.startDate}</td>
                          <td className="p-3">{b.endDate}</td>
                          <td className="p-3">{b.location}</td>
                          <td className="p-3 font-bold">{b.days} {t.day}</td>
                          <td className="p-3 font-bold text-red-600">{b.totalPrice} {t.currency}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {adminTab === 'settings' && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">⚙️ {t.siteSettings}</h3>
              <div className="max-w-xl space-y-6">
                {/* WhatsApp */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">💬 {t.whatsappNumber}</label>
                  <input type="text" value={settingsForm.whatsappNumber}
                    onChange={(e) => setSettingsForm(p => ({ ...p, whatsappNumber: e.target.value }))}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 transition-colors bg-gray-50 focus:bg-white" dir="ltr" />
                </div>

                {/* Admin Code */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">🔐 {t.adminAccessCode}</label>
                  <div className="text-xs text-gray-400 mb-1">{t.currentCode}: {'•'.repeat(settings.adminCode.length)}</div>
                  <input type="text" value={settingsForm.adminCode}
                    onChange={(e) => setSettingsForm(p => ({ ...p, adminCode: e.target.value }))}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 transition-colors bg-gray-50 focus:bg-white font-mono" />
                </div>

                {/* Logo URL */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">🎨 {t.logoUrl}</label>
                  <input type="url" value={settingsForm.logoUrl}
                    onChange={(e) => setSettingsForm(p => ({ ...p, logoUrl: e.target.value }))}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 transition-colors bg-gray-50 focus:bg-white"
                    placeholder="https://example.com/logo.png" />
                  <div className="flex items-center gap-4 mt-3">
                    <label className="inline-flex items-center gap-2 cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 transition-colors">
                      📤 {t.uploadLogo}
                      <input type="file" accept="image/*" onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = () => setSettingsForm(p => ({ ...p, logoUrl: reader.result as string }));
                        reader.readAsDataURL(file);
                      }} className="hidden" />
                    </label>
                    {settingsForm.logoUrl && (
                      <div className="flex items-center gap-2">
                        <img src={settingsForm.logoUrl} alt="Logo preview" className="h-10 object-contain rounded" />
                        <button onClick={() => setSettingsForm(p => ({ ...p, logoUrl: '' }))}
                          className="text-red-500 hover:text-red-700 text-sm font-semibold">{t.remove}</button>
                      </div>
                    )}
                  </div>
                  {!settingsForm.logoUrl && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-xl">
                      <p className="text-xs text-gray-400 mb-2">{t.logoPreview} ({lang === 'ar' ? 'افتراضي' : 'Default'}):</p>
                      <LogoComp logoUrl="" className="h-8" />
                    </div>
                  )}
                </div>

                <button onClick={() => onUpdateSettings(settingsForm)}
                  className="btn-primary text-white px-8 py-3 rounded-xl font-bold text-lg w-full">
                  💾 {t.save}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
