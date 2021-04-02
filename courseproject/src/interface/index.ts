export interface ICourse {
   name: string;
   exerciseCount: number;
   type: string;
}

export interface IContents {
    data: Array<ICourse>;
}
