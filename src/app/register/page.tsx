'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { register } from '../actions/auth';

const formSchema = z
  .object({
    email: z.string().email(),
    fullName: z.string().min(3),
    password: z.string().min(8),
    verifyPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.verifyPassword, {
    path: ['verifyPassword'],
    message: 'Las contraseñas no coinciden',
  });

const SignUpPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
      verifyPassword: '',
    },
  });

  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { verifyPassword, ...data } = values;

    const result = await register(data.fullName, data.email, data.password);

    if (result.success) {
      toast({ variant: 'success', description: 'Registro exitoso' });
      router.push('/dashboard/work-orders');
    } else {
      toast({ variant: 'destructive', description: result.message });
    }
    router.push('/dashboard/work-orders');
  };

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle className='text-2xl text-center'>Sign Up</CardTitle>
          <CardDescription>
            Ingresa tu nombre completo, correo y contraseña para crear una
            cuenta
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <CardContent className='flex flex-col gap-2'>
              <FormField
                control={form.control}
                name='fullName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre Completo</FormLabel>
                    <FormControl>
                      <Input placeholder='John Doe' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input placeholder='example@correo.com' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Ingresa tu contraseña'
                        {...field}
                        type='password'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='verifyPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Confirma tu contraseña'
                        {...field}
                        type='password'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className='flex flex-col gap-4'>
              <Button type='submit' className='w-full'>
                Registrarse
              </Button>
              <div>
                <span className='text-sm font-light'>
                  ¿Ya tienes una cuenta?
                </span>
                <Link href='/auth/login'>
                  <Button variant='link'>Iniciar sesión</Button>
                </Link>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default SignUpPage;
