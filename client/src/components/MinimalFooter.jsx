import { Link } from 'react-router-dom';
import { useTranslations } from '../utils/translations';

export default function MinimalFooter() {
  const t = useTranslations();

  const links = {
    [t.footer.company]: [
      { name: t.footer.aboutUs, path: '/about' },
      { name: t.footer.certSchedule, path: '/schedule' },
      { name: t.footer.contactUs, path: '/contact' },
    ],
    [t.footer.coursesLabel]: [
      { name: t.footer.allCourses, path: '/courses' },
      { name: t.footer.alumniLabel, path: '/alumni' },
    ],
    [t.footer.legal]: [
      { name: t.footer.privacyPolicy, path: '/privacy' },
      { name: t.footer.termsConditions, path: '/terms' },
    ],
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo.png" alt="SNS - SAR NDT Services" className="h-8 w-auto" />
              <span className="text-xl font-bold text-gray-900">SNS NDT</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">{t.footer.tagline}</p>
          </div>

          <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(links).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">{category}</h3>
                <ul className="mt-4 space-y-2">
                  {items.map((item) => (
                    <li key={item.name}>
                      <Link to={item.path} className="text-sm text-gray-600 hover:text-gray-900">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} SNS NDT. All rights reserved.</p>
          <p className="mt-4 sm:mt-0 text-sm text-gray-500">{t.footer.designedBy}</p>
        </div>
      </div>
    </footer>
  );
}

