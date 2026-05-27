import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Menu, Plus, User2 } from "lucide-react";
import { AiOutlineClose } from "react-icons/ai";
import { useClerk, UserButton, useUser } from "@clerk/react";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const { openSignUp } = useClerk();
  const createTrip = () => {
    if (!user) {
      navigate("/sign-up");
      return;
    }
    navigate("/create-trip");
  };
  return (
    <header className="relative bg-background z-50">
      <div className="flex-between w-full max-padd-container h-20">
        {/* Logo */}
        <Link to={"/"}>
          <div className="flex-center md:gap-4 lg:gap-4.5">
            <img
              src="/logo.svg"
              alt="Smarty Travels"
              className="w-[38px] h-[38px]"
            />
            <h6 className="hidden md:block whitespace-nowrap">
              Smarty Travels
            </h6>
          </div>
        </Link>
        {/* Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex items-center justify-center flex-wrap lg:gap-4 xl:gap-6">
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
              <Link to={"/price"}>
                <h5>Наші ціни</h5>
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
        {/* Login buttons */}
        <div className="flex-center gap-2">
          {!user ? (
            <Button
              onClick={() => createTrip()}
              variant="outline"
              size="lg"
              className="cursor-pointer px-5 text-sm"
            >
              <Plus className="w-4 h-4" />
              Подорож
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/my-trips")}
              variant="outline"
              size="lg"
              className="cursor-pointer px-5 text-sm"
            >
              Мої Подорожі
            </Button>
          )}

          <div className="flex">
            {!user ? (
              <Button
                onClick={() => openSignUp()}
                className="cursor-pointer hover:bg-secondary w-10 h-10 rounded-full"
              >
                <User2 />
              </Button>
            ) : (
              <UserButton />
            )}
          </div>
          {/* Mob button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex lg:hidden cursor-pointer hover:bg-secondary p-2 rounded-md"
          >
            {isOpen ? <AiOutlineClose className="w-6 h-6" /> : <Menu />}
          </button>
        </div>
        {/* Mob navigation */}
        <nav
          className={`${isOpen ? "block" : "hidden"}  lg:hidden absolute top-20 left-0`}
        >
          <ul className="w-svw h-screen bg-secondary px-8 py-16 flex flex-col gap-6">
            <li>
              <Link to={"/"} className="">
                <h5 className="text-white">Головна</h5>
              </Link>
            </li>
            <li>
              <Link to={"https://smarty-travels.com/pro-nas/"}>
                <h5 className="text-white">Про Hас</h5>
              </Link>
            </li>
            <li>
              <Link to={"/price"}>
                <h5 className="text-white">Наші ціни</h5>
              </Link>
            </li>
            <li>
              <Link to={"https://smarty-travels.com/napryamki/"}>
                <h5 className="text-white">Напрямки</h5>
              </Link>
            </li>
            <li>
              <Link to={"https://smarty-travels.com/turystychni-porady/"}>
                <h5 className="text-white">Туристичні Поради</h5>
              </Link>
            </li>
            <li>
              <Link to={"https://smarty-travels.com/blog/"}>
                <h5 className="text-white">Блог</h5>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
