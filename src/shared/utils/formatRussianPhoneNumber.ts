export const formatRussianPhoneNumber = (phoneNumber: string) => {
  // Удаляем все символы, кроме цифр
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');

  // Проверяем длину номера телефона
  const match = cleaned.match(/^7(\d{3})(\d{3})(\d{2})(\d{2})$/);

  if (match) {
    return `+7 (${match[1]}) ${match[2]}-${match[3]}-${match[4]}`;
  }

  return null;
};
