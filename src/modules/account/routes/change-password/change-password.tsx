import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Button, Typography, message } from 'antd';
import { LockOutlined, SafetyOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useChangePassword } from '../../hooks/use-auth';
import { changePasswordSchema, type ChangePasswordFormValues } from '../../schema/auth.schema';

const { Title, Text } = Typography;

export const ChangePasswordPage = () => {
  const changeMutation = useChangePassword();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: ChangePasswordFormValues) => {
    try {
      await changeMutation.mutateAsync({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });

      message.success('Institutional Access Key updated successfully');
      reset();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update password';
      message.error(errorMessage);
    }
  };

  return (
    <div className="animate-in fade-in max-w-2xl duration-700">
      <header className="mb-10">
        <section className="mb-3 flex items-center gap-2">
          <section className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600/10 dark:bg-blue-400/10">
            <SafetyOutlined className="text-[10px] text-blue-600 dark:text-blue-400" />
          </section>
          <Text className="text-[10px]! font-bold! tracking-[0.2em] text-blue-600! uppercase dark:text-blue-400!">
            Security Terminal
          </Text>
        </section>
        <Title
          level={2}
          className="m-0! font-black! tracking-tight text-slate-900! dark:text-white!"
        >
          Credentials Management
        </Title>
        <Text className="text-slate-500! dark:text-slate-400!">
          Update your terminal access keys to maintain institutional-grade security.
        </Text>
      </header>

      <section className="rounded-[2.5rem] border border-slate-200/60 bg-white p-8 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#0a0f1d]/90">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Current Password */}
          <section>
            <Text className="mb-2 block text-[10px] font-bold tracking-[0.2em] text-slate-400! uppercase dark:text-slate-500!">
              Current Access Key
            </Text>
            <Controller
              name="oldPassword"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  size="large"
                  prefix={<LockOutlined className="mr-2 text-slate-400 dark:text-slate-300" />}
                  placeholder="Enter current password"
                  status={errors.oldPassword ? 'error' : ''}
                  className="h-12! rounded-2xl! border-slate-200! bg-slate-50! text-slate-900! placeholder:text-slate-400! hover:border-blue-500! dark:border-white/10! dark:bg-white/5! dark:text-white! dark:placeholder:text-white/40! [&_svg]:dark:text-slate-300"
                />
              )}
            />
            {errors.oldPassword && (
              <p className="mt-1 ml-2 text-[10px] font-bold text-red-500 uppercase">
                {errors.oldPassword.message}
              </p>
            )}
          </section>

          {/* New Password */}
          <section>
            <Text className="mb-2 block text-[10px] font-bold tracking-[0.2em] text-slate-400! uppercase dark:text-slate-500!">
              New Security Key
            </Text>
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  size="large"
                  prefix={<SafetyOutlined className="mr-2 text-slate-400 dark:text-slate-300" />}
                  placeholder="Minimum 8 characters"
                  status={errors.newPassword ? 'error' : ''}
                  className="h-12! rounded-2xl! border-slate-200! bg-slate-50! text-slate-900! placeholder:text-slate-400! hover:border-blue-500! dark:border-white/10! dark:bg-white/5! dark:text-white! dark:placeholder:text-white/40! [&_svg]:dark:text-slate-300"
                />
              )}
            />
            {errors.newPassword && (
              <p className="mt-1 ml-2 text-[10px] font-bold text-red-500 uppercase">
                {errors.newPassword.message}
              </p>
            )}
          </section>

          {/* Confirm Password */}
          <section>
            <Text className="mb-2 block text-[10px] font-bold tracking-[0.2em] text-slate-400! uppercase dark:text-slate-500!">
              Confirm New Key
            </Text>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  size="large"
                  prefix={
                    <CheckCircleOutlined className="mr-2 text-slate-400 dark:text-slate-300" />
                  }
                  placeholder="Repeat new key"
                  status={errors.confirmPassword ? 'error' : ''}
                  className="h-12! rounded-2xl! border-slate-200! bg-slate-50! text-slate-900! placeholder:text-slate-400! hover:border-blue-500! dark:border-white/10! dark:bg-white/5! dark:text-white! dark:placeholder:text-white/40! [&_svg]:dark:text-slate-300"
                />
              )}
            />
            {errors.confirmPassword && (
              <p className="mt-1 ml-2 text-[10px] font-bold text-red-500 uppercase">
                {errors.confirmPassword.message}
              </p>
            )}
          </section>

          <Button
            type="primary"
            htmlType="submit"
            loading={changeMutation.isPending}
            className="mt-4 h-14 rounded-xl! border-none! bg-blue-600! text-[14px] font-bold! tracking-widest text-white! shadow-xl shadow-blue-500/20 transition-all hover:bg-blue-500! active:scale-95"
          >
            UPDATE TERMINAL CREDENTIALS
          </Button>
        </form>
      </section>
    </div>
  );
};
