interface IFromFirestore {
  email: string,
  nombre: string,
  uid: string,
  descripcion: string;
}

export class Usuario {

  static fromFirestore({email, nombre, uid, descripcion}: IFromFirestore) {
    return new Usuario(uid, nombre, email, descripcion);
  }

  constructor(
    public uid: string,
    public nombre: string,
    public email: string,
    public descripcion: string,
  ){}
}
