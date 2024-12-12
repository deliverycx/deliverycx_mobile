import axios, {AxiosError, HttpStatusCode} from 'axios';
import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useCheckGuest} from '../../queries/checkGuestQueries';
import {useCreateUser} from '../../queries/userQueries';
import {useUserStore} from '../../stores/useUserStore';

export const CreateUserManager = () => {
  const user = useUserStore(state => state.user);
  const setUser = useUserStore(state => state.setUser);

  const {mutateAsync: createUser} = useCreateUser();
  const {mutateAsync: checkGuest} = useCheckGuest();

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsubscribe = useUserStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user || !hydrated) {
      return;
    }

    (async function () {
      try {
        const userResponse = await createUser();
        setUser(userResponse);
      } catch (err) {
        console.log(err);
        Alert.alert(
          'Не удалось создать пользователя',
          'Приложение продолжает работать, но могут возникнуть ошибки при оформлении заказа',
          [{text: 'Хорошо'}],
        );
      }
    })();
  }, [user, setUser, createUser, hydrated]);

  useEffect(() => {
    if (!hydrated || !user) {
      return;
    }

    (async function () {
      try {
        await checkGuest(user);
      } catch (err) {
        const errors = err as Error | AxiosError;

        if (axios.isAxiosError(errors)) {
          if (errors.response?.status === HttpStatusCode.Unauthorized) {
            setUser(null);
          }
        }
      }
    })();
  }, [hydrated, user, setUser, checkGuest]);

  return null;
};
