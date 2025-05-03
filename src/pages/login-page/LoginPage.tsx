import LoginInput from '../../components/login/LoginInput';
import './LoginPage.css';

export default function LoginPage() {
  return (
    <section className="login-hero">
      <div className="login-hero__form">
        <LoginInput />
      </div>

      <div className="login-hero__image">
        <img src="/logo.svg" alt="GastroApp logo" />
      </div>
    </section>
  );
}
