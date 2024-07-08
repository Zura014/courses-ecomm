// export interface Courses {
//   id: number;
//   src: string;
//   title: string;
//   level: string;
//   description: string;
//   language: string;
//   duration: string;
//   lessons: number;
//   students: number;
//   rating: number;
//   price: number;
// }

export interface Courses {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  userId?: number;
  user?: {
    id: number;
    username: string;
    email: string;
    description: string;
    imageUrl: string;
  }
}