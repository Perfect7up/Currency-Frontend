import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Button, Typography, message } from 'antd';
import { LockOutlined, CheckCircleOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useResetPassword } from '../../hooks/use-auth';
import { resetPasswordSchema, type ResetPasswordValues } from '../../schema/auth.schema';

const { Title, Text } = Typography;

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resetMutation = useResetPassword();

  // Extract data from the URL link sent to Gmail
  const token = searchParams.get('token') || '';
  const email = searchParams.get('email') || '';

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const onSubmit = async (values: ResetPasswordValues) => {
    if (!token || !email) {
      message.error('Invalid recovery session. Please request a new link.');
      return;
    }

    try {
      // payload matches components['schemas']['ResetPasswordRequest']
      await resetMutation.mutateAsync({
        email,
        token,
        newPassword: values.password,
      });

      message.success('Institutional Access Key reset successfully');
      navigate('/login');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Reset failed';
      message.error(errorMessage);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 transition-colors dark:bg-[#000513]">
      <div className="pointer-events-none absolute h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px] dark:bg-indigo-500/15" />

      <section className="relative z-10 w-full max-w-md rounded-[2.5rem] border border-slate-200/50 bg-white p-8 shadow-2xl backdrop-blur-xl md:p-10 dark:border-white/10 dark:bg-[#000513]/80">
        <header className="mb-8 text-center">
          <section className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10">
            <SafetyCertificateOutlined className="text-2xl text-indigo-500" />
          </section>
          <Title
            level={2}
            className="m-0! bg-linear-to-r from-slate-900 via-indigo-900 to-slate-900 bg-clip-text font-black! tracking-tighter text-transparent! dark:from-white! dark:via-indigo-300! dark:to-white!"
          >
            Reset Credentials
          </Title>
          <Text className="mt-2 block leading-tight text-slate-500 dark:text-slate-400">
            Account recovery for <b className="text-slate-900 dark:text-white">{email}</b>
          </Text>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* New Password */}
          <section>
            <Text className="mb-2 block text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">
              New Security Key
            </Text>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  size="large"
                  prefix={<LockOutlined className="mr-2 text-slate-400" />}
                  placeholder="Minimum 8 characters"
                  status={errors.password ? 'error' : ''}
                  className="rounded-2xl! border-slate-200! bg-slate-50! hover:border-blue-500! dark:border-white/10! dark:bg-white/5! dark:text-white!"
                />
              )}
            />
            {errors.password && (
              <Text className="mt-1 ml-2 text-[10px] font-bold text-red-500 uppercase">
                {errors.password.message}
              </Text>
            )}
          </section>

          {/* Confirm Password */}
          <section>
            <Text className="mb-2 block text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">
              Confirm Security Key
            </Text>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  size="large"
                  prefix={<CheckCircleOutlined className="mr-2 text-slate-400" />}
                  placeholder="Re-enter new key"
                  status={errors.confirmPassword ? 'error' : ''}
                  className="rounded-2xl! border-slate-200! bg-slate-50! hover:border-blue-500! dark:border-white/10! dark:bg-white/5! dark:text-white!"
                />
              )}
            />
            {errors.confirmPassword && (
              <Text className="mt-1 ml-2 text-[10px] font-bold text-red-500 uppercase">
                {errors.confirmPassword.message}
              </Text>
            )}
          </section>

          <Button
            type="primary"
            htmlType="submit"
            loading={resetMutation.isPending}
            className="mt-2 flex h-14 items-center justify-center rounded-full border-none bg-[#00d1ff] text-[14px] font-bold tracking-widest text-black shadow-[0_5px_15px_rgba(0,209,255,0.3)] transition-all hover:scale-[1.02]! active:scale-95"
          >
            UPDATE TERMINAL ACCESS
          </Button>
        </form>
      </section>
    </div>
  );
};
