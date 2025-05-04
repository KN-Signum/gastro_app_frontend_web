import { Button, Icon } from 'uiw';
import { User } from '@uiw/icons';
import { useTranslation } from 'react-i18next';
import './LandingPage.css';
import { Link } from 'react-router-dom';

export default function LandingPage() {
    const { t } = useTranslation();

    return (
        <section className="hero">
            <div className="hero__txt">
                <h1>{t('landing-page.title')}</h1>
                <p>{t('landing-page.subtitle')}</p>

                <Link to="/login">
                    <Button
                        type="primary"
                        size="large"
                        className="custom-primary"
                        icon="login"

                    >
                        {t('landing-page.cta')}
                    </Button>
                </Link>
            </div>

            <img src="logo.svg" alt="Ilustracja GastroApp" />
        </section>
    );
}
