export const validateProduct =
  (name: string) => {
    return (
      name.trim().length > 0
    );
  };