import Logo from "../Logo/Logo";
import NavigationMenu from "../Navigation/NavigationMenu";
import UserButton from "../UserButton/UserButton";

const Header = async () => {
  return (
    <div className="flex justify-between items-center max-w-[1280px] mx-auto gap-2 mt-5">
      <Logo />
      <NavigationMenu />
      <UserButton />
    </div>
  );
};

export default Header;
