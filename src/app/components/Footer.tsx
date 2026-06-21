export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 px-5 py-8 sm:px-8 sm:py-10 md:px-12 lg:px-24">
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-xs text-white/30">
          &copy; {new Date().getFullYear()} Billy Riley
        </p>
        <p className="text-xs text-white/20">
          Design &amp; Development
        </p>
      </div>
    </footer>
  );
}
