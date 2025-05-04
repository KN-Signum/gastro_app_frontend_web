import { useState } from 'react';
import { Form, Input, Row, Col, Notify, Button } from 'uiw';
import { useTranslation } from 'react-i18next';
import { useApi } from '../../Providers/ApiProvider';
import { LoginRequestDto } from '../../dto/AuthDto';
import { useNavigate } from 'react-router-dom';
import "./LoginInput.css"
export default function LoginInput() {
  const { t } = useTranslation();
  const [, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});
  const apiClient = useApi();
  const navigate = useNavigate();

  return (
    <div className='loginForm'>
      <Form
        onSubmit={async ({ initial, current }) => {
          const errorObj: { username?: string; password?: string } = {};
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const passwordRegex =
            /^(?=.*[A-Z])(?=.*[.!@#$%^&*])(?=.*[0-9])(?=.{6,})/;

          if (!current.username) {
            errorObj.username = t('login.email_not_empty');
          } else if (!emailRegex.test(current.username)) {
            errorObj.username = t('login.email_help');
          }

          if (!current.password) {
            errorObj.password = t('login.password_not_empty');
          } else if (!passwordRegex.test(current.password)) {
            errorObj.password = t('login.password_help');
          }

          if (Object.keys(errorObj).length > 0) {
            setErrors(errorObj);
            const err = new Error();
            err.message = JSON.stringify(errorObj);
            Notify.error({
              title: t('notify.error'),
              description: Object.values(errorObj).join(' '),
            });
            throw err;
          }
          setErrors({});


          try {
            const loginData: LoginRequestDto = {
              email: current.username,
              password: current.password,
            };
            const response = await apiClient.login(loginData);

            if (response.success) {
              navigate('/dashboard');
            } else {
              Notify.error({
                title: t('notify.error'),
                description: response.data || t('login.failed'),
              });
            }
          } catch {
            Notify.error({
              title: t('notify.error'),
              description: t('login.failed'),
            });
          }
        }}
        onSubmitError={(error) => {
          if (error.filed) {
            return { ...error.filed };
          }
          return null;
        }}
        fields={{
          username: {
            labelClassName: 'fieldLabel',
            labelFor: 'username-inline',
            children: (
              <Input
                preIcon="user"
                id="username-inline"
                placeholder={t('login.email_placeholder')}
                type="email"
                className='input'
              />
            ),
          },
          password: {
            labelClassName: 'fieldLabel',
            labelFor: 'password-inline',
            children: (
              <Input
                preIcon="lock"
                id="password-inline"
                placeholder={t('login.password_placeholder')}
                type="password"
                className='input'
              />
            ),
          },
        }}
      >
        {({ fields, state, canSubmit, resetForm }) => {
          return (
            <div className='login'>
              <h1 className='header'>Zaloguj się</h1>
              <Row gutter={10} className='inputs'>
                {fields && (
                  <>
                    <Col fixed>{fields.username}</Col>
                    <Col fixed>{fields.password}</Col>
                  </>
                )}
              </Row>
              <Button
                className='button'
                disabled={canSubmit ? !canSubmit() : true}
                type="primary"
                htmlType="submit"
              >
                {t('login.login')}
              </Button>
              {/* <Row className='buttons'gutter={10}>
                <Col>
                  <Button
                    className='button'
                    disabled={canSubmit ? !canSubmit() : true}
                    type="primary"
                    htmlType="submit"
                  >
                    {t('login.login')}
                  </Button>
                  <Button className='button' type="danger" onClick={resetForm}>
                    {t('login.reset')}
                  </Button>
                </Col>
              </Row> */}
            </div>
          );
        }}
      </Form>
    </div>
  );
}
