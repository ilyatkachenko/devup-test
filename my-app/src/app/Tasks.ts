export class Tasks{
    id : number;
    title : string;
    description : string;
    status : string;

    constructor(id: number, title: string, description: string, status: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
      }
}