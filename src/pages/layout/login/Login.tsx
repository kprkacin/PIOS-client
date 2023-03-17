import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Divider,
  Group,
  Paper,
  PaperProps,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { upperFirst, useToggle } from '@mantine/hooks';
import { notifications, showNotification } from '@mantine/notifications';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { auth } from '../../../services/firebase';
import { setAccessToken } from '../../../services/helpers';

const Login = (props: PaperProps) => {
  const [type, toggle] = useToggle(['login', 'register']);
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) =>
        val.length <= 6 ? 'Password should include at least 6 characters' : null,
    },
  });

  const navigate = useNavigate();

  const handleAuth = () => {
    if (type === 'login') {
      signInWithEmailAndPassword(auth, form.values.email, form.values.password)
        .then((userCredential) => {
          const user = userCredential.user;
          // setAccessToken(user.email || '');
          console.log('logined');
          navigate('/dashboard', { replace: true });
          showNotification({
            message: `Welcome ${user.email}`,
            color: 'green',
          });
        })
        .catch((error) => {
          console.log('error', error.message);
          const errorCode = error.code;
          const errorMessage = error.message;
          showNotification({
            message: `${errorCode} ${errorMessage || 'Error. Please try again'}`,
            color: 'red',
          });
        });
      return;
    }

    createUserWithEmailAndPassword(auth, form.values.email, form.values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        // setAccessToken(user.email || '');
        console.log('logined');
        navigate('/dashboard', { replace: true });
        showNotification({
          message: `Welcome ${user.email}`,
          color: 'green',
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        showNotification({
          message: `${errorCode} ${errorMessage || 'Error. Please try again'}`,
          color: 'red',
        });
      });
  };

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 600,
        })}
      >
        Welcome to TF Webshop, {type} with
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleAuth)}>
          <Stack>
            {type === 'register' && (
              <TextInput
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event) =>
                  form.setFieldValue('name', event.currentTarget.value)
                }
                radius="md"
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email && 'Invalid email'}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue('password', event.currentTarget.value)
              }
              error={
                form.errors.password && 'Password should include at least 6 characters'
              }
              radius="md"
            />

            {type === 'register' && (
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) =>
                  form.setFieldValue('terms', event.currentTarget.checked)
                }
              />
            )}
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === 'register'
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;

// <Text size="lg" weight={500}>
// </Text>

// <Group grow mb="md" mt="md">
//   {/* <GoogleButton radius="xl">Google</GoogleButton>
//   <TwitterButton radius="xl">Twitter</TwitterButton> */}
// </Group>

// <Divider label="Or continue with email" labelPosition="center" my="lg" />
