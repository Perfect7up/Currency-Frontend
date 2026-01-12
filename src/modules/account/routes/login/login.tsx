import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Button, Typography, message, Modal } from 'antd';
import {
  MailOutlined,
  LockOutlined,
  ArrowRightOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../../hooks/use-auth';
import { useAuthStore } from '../../store/auth.store';
import { loginSchema, type LoginFormValues } from '../../schema/auth.schema';

const { Title, Text } = Typography;

export const LoginPage = () => {
  const navigate = useNavigate();
  const loginMutation = useLogin();
  const { setTokens, setUser } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const data = await loginMutation.mutateAsync(values);

      setTokens(data.tokens);
      setUser(data.user);
      message.success('Institutional Terminal Access Granted');
      navigate('/dashboard');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';

      // CHECK IF EMAIL IS UNCONFIRMED
      // This matches the string thrown by your C# AuthService.cs
      if (errorMessage.toLowerCase().includes('verify your email')) {
        Modal.warning({
          title: 'Verification Required',
          icon: <InfoCircleOutlined className="text-amber-500" />,
          content:
            'Your account is active but your email has not been verified. Please check your inbox for the activation link.',
          okText: 'Understood',
          okButtonProps: {
            className: 'bg-amber-500 hover:bg-amber-600! border-none rounded-full font-bold',
          },
          centered: true,
          maskClosable: true,
        });
      } else {
        message.error(errorMessage);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 transition-colors dark:bg-[#000513]">
      <div className="pointer-events-none absolute h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px] dark:bg-indigo-500/15" />

      <section className="relative z-10 w-full max-w-md rounded-[2.5rem] border border-slate-200/50 bg-white p-8 shadow-2xl backdrop-blur-xl md:p-10 dark:border-white/10 dark:bg-[#000513]/80">
        <header className="mb-8 text-center">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/10 dark:bg-indigo-400/10">
            <LockOutlined className="text-2xl text-blue-600 dark:text-indigo-400" />
          </div>
          <Title
            level={2}
            className="m-0! bg-linear-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text font-black! tracking-tighter text-transparent! dark:from-white! dark:via-indigo-300! dark:to-white!"
          >
            Trader Login
          </Title>
          <Text className="text-slate-500 dark:text-slate-400">Initialize terminal session</Text>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <section>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  size="large"
                  prefix={<MailOutlined className="mr-2 text-slate-400" />}
                  placeholder="Email Address"
                  status={errors.email ? 'error' : ''}
                  className="rounded-2xl! border-slate-200! bg-slate-50! hover:border-blue-500! dark:border-white/10! dark:bg-white/5! dark:text-white!"
                />
              )}
            />
            {errors.email && (
              <Text className="mt-1 ml-2 text-[10px] font-bold text-red-500 uppercase">
                {errors.email.message}
              </Text>
            )}
          </section>

          <section>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  size="large"
                  prefix={<LockOutlined className="mr-2 text-slate-400" />}
                  placeholder="Password"
                  status={errors.password ? 'error' : ''}
                  className="rounded-2xl! border-slate-200! bg-slate-50! hover:border-blue-500! dark:border-white/10! dark:bg-white/5! dark:text-white!"
                />
              )}
            />
            <div className="mt-2 flex items-center justify-between px-1">
              {errors.password ? (
                <Text className="text-[10px] font-bold text-red-500 uppercase">
                  {errors.password.message}
                </Text>
              ) : (
                <div />
              )}
              <Link
                to="/forgot-password"
                className="text-[11px] font-bold tracking-widest text-slate-400 uppercase transition-colors hover:text-blue-600 dark:hover:text-indigo-400"
              >
                Forgot Password?
              </Link>
            </div>
          </section>

          <Button
            type="primary"
            htmlType="submit"
            loading={loginMutation.isPending}
            className="mt-4 h-14 rounded-full border-none bg-[#00d1ff] font-bold tracking-widest text-black shadow-[0_5px_15px_rgba(0,209,255,0.3)] transition-all hover:scale-[1.02]! active:scale-95"
          >
            SIGN IN <ArrowRightOutlined className="ml-2" />
          </Button>
        </form>

        <footer className="mt-8 text-center">
          <Text className="text-slate-500 dark:text-slate-400">
            New Trader?{' '}
            <Link to="/signup" className="font-bold text-blue-600 dark:text-indigo-400">
              Create Account
            </Link>
          </Text>
        </footer>
      </section>
    </div>
  );
};
