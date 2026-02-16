import { Link } from "react-router";
import { useTranslations } from '@/utils/translations';

export default function NotFound() {
  const t = useTranslations();

  return (
    <div className="container text-center py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="mt-5">
            <h1 className="display-1 fw-bold text-primary">404</h1>
            <h2 className="mb-4">{t.notFound.title}</h2>
            <p className="lead text-muted mb-5">
              {t.notFound.desc}
            </p>
            <Link to="/" className="btn btn-primary me-3">
              {t.notFound.backHome}
            </Link>
            <Link to="/courses" className="btn btn-outline-secondary">
              {t.notFound.browseCourses}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}