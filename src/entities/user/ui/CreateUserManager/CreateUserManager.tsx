import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useCreateUser} from '../../queries/userQueries';
import {useUserStore} from '../../stores/useUserStore';

export const CreateUserManager = () => {
  const user = useUserStore(state => state.user);
  const setUser = useUserStore(state => state.setUser);
  const {mutateAsync} = useCreateUser();

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
        const userResponse = await mutateAsync();
        setUser(userResponse);
      } catch (err) {
        Alert.alert(
          'Не удалось создать пользователя',
          'Приложение продолжает работать, но могут возникнуть ошибки при оформлении заказа',
          [{text: 'Хорошо'}],
        );
      }
    })();
  }, [user, setUser, mutateAsync, hydrated]);

  return null;
};
