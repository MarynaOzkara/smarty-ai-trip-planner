import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Menu, Plus, User2 } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/react";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  // console.log(user);
  const { openSignIn } = useClerk();
  return (
    <header className="bg-background flex-between px-4 md:px-8 lg:px-35 w-full h-20 border-b absolute top-0 right-0 z-50">
      <Link to={"/"}>
        <div className=" flex-center gap-4.5">
          <img
            src="/logo.svg"
            alt="Smarty Travels"
            className="w-[38px] h-[38px]"
          />
          <h6 className="hidden md:block">Smarty Travels</h6>
        </div>
      </Link>
      {/* Navigation */}
      <nav className="hidden md:block">
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
      <div className="flex-center gap-2">
        <Button
          onClick={() => navigate("/create-trip")}
          variant="outline"
          size="lg"
          className="cursor-pointer px-5 text-sm"
        >
          <Plus className="w-4 h-4" />
          Mаршрут
        </Button>
        <div className="flex">
          {!user ? (
            <Button
              onClick={() => openSignIn()}
              className="cursor-pointer hover:bg-secondary w-10 h-10 rounded-full"
            >
              <User2 />
            </Button>
          ) : (
            <UserButton />
          )}
        </div>
        <button className="flex md:hidden cursor-pointer hover:bg-secondary p-2 rounded-md">
          <Menu />
        </button>
      </div>
    </header>
  );
};

export default Header;
