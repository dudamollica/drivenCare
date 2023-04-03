export function validateAccount(type) {
  return (req, res, next) => {
    const specialty = res.locals.user.specialty;
    let accountType = "";
    if (!specialty) {
      accountType = "patient";
    } else {
      accountType = "doctor";
    }
    if(accountType != type) return res.status(401).send("Unauthorized account");
    next();
  };
}
