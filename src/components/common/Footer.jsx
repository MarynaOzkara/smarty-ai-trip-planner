import { IoLogoFacebook } from "react-icons/io5";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";

const SOSIAL_ICONS = [
  {
    id: 1,
    icon: <IoLogoFacebook className="w-5 h-5" />,
    href: "https://www.facebook.com/smartytravels2026",
  },
  {
    id: 2,
    icon: <FaXTwitter className="w-6 h-6" />,
    href: "https://x.com/SmartyTravels",
  },
  {
    id: 3,
    icon: <FaInstagram className="w-5 h-5" />,
    href: "https://www.instagram.com/smartytravels2026",
  },
];
const MENU_LINKS = [
  {
    id: 1,
    title: "Блог",
    href: "https://smarty-travels.com/blog/",
  },
  {
    id: 2,
    title: "Напрямки",
    href: "https://smarty-travels.com/napryamki/",
  },
  {
    id: 3,
    title: "Туристичні сервіси",
    href: "https://smarty-travels.com/turystychni-servisy/",
  },
  {
    id: 4,
    title: "Про нас",
    href: "https://smarty-travels.com/pro-nas/",
  },
  {
    id: 5,
    title: "Політика конфіденційності",
    href: "https://smarty-travels.com/polityka-konfidentsijnosti/",
  },
];

const Footer = () => {
  return (
    <footer className="py-8 bg-sidebar-foreground">
      <div className="max-padd-container mx-auto pb-8 lg:pb-16 px-6 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div>
            <p className="text-white">
              <b>SmartyTravels</b> — це сучасна платформа для планування
              подорожей онлайн. Ми допомагаємо знайти дешеві авіаквитки,
              забронювати готелі та створити ідеальний маршрут подорожі по
              Європі та світу.
            </p>
          </div>
          <div>
            <ul className="flex flex-row gap-2">
              {SOSIAL_ICONS.map((item) => (
                <li key={item.id}>
                  <a href={item.href}>
                    <div className="w-9 h-9 bg-white flex-center rounded-[3px] hover:bg-accent">
                      <p className="text-sidebar-foreground hover:text-background">
                        {item.icon}
                      </p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul className="flex flex-wrap items-center justify-center md:justify-start lg:justify-center gap-4">
              {MENU_LINKS.map((item) => (
                <li key={item.id}>
                  <a href={item.href}>
                    <p className="text-white hover:text-accent">{item.title}</p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-background/10 lg:mt-10 pt-6">
        <p className="text-center text-white">
          Copyright © {new Date().getFullYear()} SmartyTravels
        </p>
      </div>
    </footer>
  );
};

export default Footer;
