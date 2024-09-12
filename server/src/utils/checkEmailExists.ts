import emailExistence from 'email-existence';
//email existence is synchronous so we can return a promise by make it forcefully async
export const checkEmailExistence = (email:string) => {
    return new Promise((resolve, reject) => {
      emailExistence.check(email, (err, exists) => {
        if (err) {
          reject(err);
        } else {
          resolve(exists);
        }
      });
    });
  };