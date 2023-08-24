export default function checkBirthday(dateOfBirth: Date): string {
  const today = new Date();
  if (dateOfBirth.getDate() === today.getDate() && dateOfBirth.getMonth() === today.getMonth()) {
    return '🎂';
  } else {
    return '';
  }
}
