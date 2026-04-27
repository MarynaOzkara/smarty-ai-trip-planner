import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Plus, User2 } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-background flex-between px-35 py-3 w-full h-20 border-b absolute top-0 right-0 z-50">
      <Link to={"/"}>
        <div className="flex-center gap-4.5">
          <img
            src="/logo.svg"
            alt="Smarty Travels"
            className="w-[38px] h-[38px]"
          />
          <h6>Smarty Travels</h6>
        </div>
      </Link>
      {/* Navigation */}
      <nav>
        <ul className="flex-center gap-6">
          <li>
            <Link to={"/"}>
              <h5>Головна</h5>
            </Link>
          </li>
          <li>
            <Link to={"https://smarty-travels.com/pro-nas/"}>
              <h5>Про Hас</h5>
            </Link>
          </li>
          <li>
            <Link to={"https://smarty-travels.com/turystychni-servisy/"}>
              <h5>Туристичні Сервіси</h5>
            </Link>
          </li>
          <li>
            <Link to={"https://smarty-travels.com/napryamki/"}>
              <h5>Напрямки</h5>
            </Link>
          </li>
          <li>
            <Link to={"https://smarty-travels.com/turystychni-porady/"}>
              <h5>Туристичні Поради</h5>
            </Link>
          </li>
          <li>
            <Link to={"https://smarty-travels.com/blog/"}>
              <h5>Блог</h5>
            </Link>
          </li>
        </ul>
      </nav>
      <Button size="lg" className="cursor-pointer hover:bg-secondary px-5">
        Mаршрут
      </Button>
      <Button className="cursor-pointer hover:bg-secondary w-10 h-10 rounded-full">
        <User2 />
      </Button>
    </header>
  );
};

export default Header;
