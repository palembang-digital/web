import Image from '@/packages/components/base/Images/Image';

function Footer() {
  return (
    <footer className="bg-black w-full">
      <div className="grid grid-cols-2 px-20 py-4">
        <div className="flex">
          <Image
            src="logo-white-bg.svg"
            size={32}
            alt="Palembang Digital Logo"
          />
        </div>
        <div>
          <a
            href="https://instagram.com/palembang_digital"
            className="text-white"
          >
            @palembang_digital
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
