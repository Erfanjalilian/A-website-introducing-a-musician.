import Person from "@/app/Components/person";
import FilmMusic from "@/app/Components/FilmMusic"

export default function HomePage(){
  return (
    <div className="bg-[#1d1919] min-h-screen">
      <Person />
      <FilmMusic />
    </div>
  );
}