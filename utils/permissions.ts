export const checkPermission = async (
  getPermission: () => Promise<any>,
  requestPermission: () => Promise<any>,
  name: string
) => {
  const current = await getPermission();

  if (current.status === 'granted') {
    return true;
  }

  if (current.status === 'undetermined') {
    const request = await requestPermission();

    if (request.status === 'granted') {
      return true;
    }

    alert(`Permiso ${name} rechazado`);
    return false;
  }

  if (current.status === 'denied') {
    alert(
      `Permiso ${name} denegado. Activalo desde configuración del dispositivo`
    );
    return false;
  }

  return false;
};