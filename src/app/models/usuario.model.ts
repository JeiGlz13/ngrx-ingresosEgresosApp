interface IFromFirestore {
  email: string,
  nombre: string,
  uid: string,
}

export class Usuario {

  static fromFirestore({email, nombre, uid}: IFromFirestore) {
    return new Usuario(uid, nombre, email);
  }

  constructor(
    public uid: string,
    public nombre: string,
    public email: string,
  ){}
}
