function Footer({ children }) {
  return (
    <footer className="bg-gray-200 dark:bg-slate-900 text-center lg:text-left w-full">
      <div className="text-gray-700 dark:text-slate-100 text-center p-4">
        This app is free for use and open-sourced, licensed under the
        {' '}
        <a className="text-gray-800 dark:text-sky-500 font-bold" href="https://opensource.org/licenses/MIT">MIT License</a>
            &nbsp;
        {children}
      </div>
    </footer>
  );
}

export default Footer;
