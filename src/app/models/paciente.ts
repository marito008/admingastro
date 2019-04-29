export class Paciente {
    constructor(
        public nombre: string,
        public apellido: string,
        public dni: number,
        public fechaNac: Date,
        public sexo: string,
        public obraSociales?: string,
        public _id?: string,
    ){}
}