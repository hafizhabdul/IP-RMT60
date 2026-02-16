import { useTranslations } from '@/utils/translations';

export default function MinimalPrivacy() {
  const t = useTranslations();

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-semibold text-gray-900">{t.privacy.title}</h1>
      <p className="mt-2 text-gray-600">{t.privacy.subtitle}</p>
      <div className="mt-6 space-y-4 text-sm text-gray-700">
        {t.privacy.items.map((item, i) => (
          <p key={i}>{i + 1}. {item}</p>
        ))}
      </div>
    </div>
  );
}

