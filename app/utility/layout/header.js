
import Link from 'next/link';

export default function Header() {

  return (
    <header className="pb-6 bg-white lg:pb-0">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex-shrink-0">
           <h3 className='font-bold text-xl'>Task</h3>
          </div>

    

          <Link href="https://rabins-walterraj-dev.vercel.app/" target='_blank' className="underline hover:text-green-500">
            My Portfolio
          </Link>
        </nav>

      </div>
    </header>
  );
}
