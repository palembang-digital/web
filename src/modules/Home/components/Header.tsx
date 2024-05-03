import AuthenticationButton from '@/packages/components/base/AuthenticationButton/AuthenticationButton';
import Image from '@/packages/components/base/Images/Image';

function Header() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-20 py-4">
        <Image src="logo-black-bg.svg" size={32} alt="Palembang Digital Logo" />
        <div className="ml-auto flex items-center space-x-2">
          <AuthenticationButton />
        </div>
      </div>
    </header>
  );
}

export default Header;
