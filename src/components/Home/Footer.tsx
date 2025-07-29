export default function Footer() {
  return (
    <footer className="bg-[#232F3E] text-gray-200 text-sm">
      {/* Back to top */}
      <div className="text-center py-3 bg-[#37475A] hover:bg-[#485769] cursor-pointer">
        Back to top
      </div>

      {/* Top sections */}
      <div className="max-w-6xl mx-auto py-8 px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <h3 className="font-semibold mb-2">Get to Know Us</h3>
          <ul className="space-y-1">
            <li>About Amazon</li>
            <li>Careers</li>
            <li>Press Releases</li>
            <li>Amazon Science</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Connect with Us</h3>
          <ul className="space-y-1">
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Make Money with Us</h3>
          <ul className="space-y-1">
            <li>Sell on Amazon</li>
            <li>Sell under Amazon Accelerator</li>
            <li>Protect and Build Your Brand</li>
            <li>Amazon Global Selling</li>
            <li>Supply to Amazon</li>
            <li>Become an Affiliate</li>
            <li>Fulfilment by Amazon</li>
            <li>Advertise Your Products</li>
            <li>Amazon Pay on Merchants</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Let Us Help You</h3>
          <ul className="space-y-1">
            <li>Your Account</li>
            <li>Returns Centre</li>
            <li>Recalls and Product Safety Alerts</li>
            <li>100% Purchase Protection</li>
            <li>Amazon App Download</li>
            <li>Help</li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700"></div>

      {/* Logo & language */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-5">
        <img
          src="/merazon.png"
          alt="Amazon Logo"
          width={80}
          height={80}
        />
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 border border-gray-500 px-2 py-1 rounded text-xs">
            🌐 English
          </button>
          <button className="flex items-center gap-1 border border-gray-500 px-2 py-1 rounded text-xs">
            🇮🇳 India
          </button>
        </div>
      </div>

      {/* Bottom small links */}
      <div className="max-w-6xl mx-auto py-6 px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-gray-400">
        <div>
          <h4 className="font-medium text-gray-300">AbeBooks</h4>
          <p>Books, art & collectibles</p>
        </div>
        <div>
          <h4 className="font-medium text-gray-300">Amazon Web Services</h4>
          <p>Scalable Cloud Computing Services</p>
        </div>
        <div>
          <h4 className="font-medium text-gray-300">Audible</h4>
          <p>Download Audio Books</p>
        </div>
        <div>
          <h4 className="font-medium text-gray-300">IMDb</h4>
          <p>Movies, TV & Celebrities</p>
        </div>
        {/* Add more small links like Shopbop, Prime Now, etc. if you want */}
      </div>
    </footer>
  );
}
