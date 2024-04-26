import Image from '@/packages/components/base/Images/Image';
import { Button } from '@/packages/components/ui/button';

function Header() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-20 py-4">
        <Image src="logo-black-bg.svg" size={32} alt="Palembang Digital Logo" />
        <div className="ml-auto flex items-center space-x-2">
          <Button variant="outline">Masuk</Button>
          <Button>Daftar</Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
