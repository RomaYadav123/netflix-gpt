export const checkValidateData = (email, password, name) => {
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );

  const isPasswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/.test(password);

  const isNameValid = /^[A-Za-z]{3,16}( [A-Za-z]{3,16}){0,3}$/.test(name);

  if (!isEmailValid) return "Email Id not valid";
  if (!isPasswordValid) return "Password not valid";
  if (!isNameValid) return "Plaese provide valid characters";

  //if both email, password & fullname are valid then return null that means if we get null then that means there is no error & if there is some string inside that means we have errors
  return null;
};
