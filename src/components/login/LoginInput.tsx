import { useState } from 'react';
import { Form, Input, Row, Col, Notify, Button } from 'uiw';
import { useTranslation } from 'react-i18next';
import { useApi } from '../../api/ApiProvider';
import { LoginRequestDto } from '../../dto/AuthDto';
import { useNavigate } from 'react-router-dom';

/**
 * support user login form 
 * validates input data (email and password) and passes it to the API for authentication
 * after validation redirects to the main page
 */

export default function LoginInput() {
  const { t } = useTranslation();
  const [, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});
  const apiClient = useApi();
  const navigate = useNavigate();

  return (
    <div>
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
          console.log('-->>', initial, current);

          try {
            const loginData: LoginRequestDto = {
              email: current.username,
              password: current.password,
            };
            const response = await apiClient.login(loginData);

            if (response.success) {
              navigate('/home');
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
              />
            ),
          },
        }}
      >
        {({ fields, state, canSubmit, resetForm }) => {
          return (
            <div>
              <Row gutter={10}>
                {fields && (
                  <>
                    <Col fixed>{fields.username}</Col>
                    <Col fixed>{fields.password}</Col>
                  </>
                )}
              </Row>
              <Row gutter={10}>
                <Col>
                  <Button
                    disabled={canSubmit ? !canSubmit() : true}
                    type="primary"
                    htmlType="submit"
                  >
                    {t('login.login')}
                  </Button>
                  <Button type="danger" onClick={resetForm}>
                    {t('login.reset')}
                  </Button>
                </Col>
              </Row>
            </div>
          );
        }}
      </Form>
    </div>
  );
}
